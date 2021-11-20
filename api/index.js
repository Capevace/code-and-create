//@ts-check

const bodyParser = require('body-parser');
const app = require('express')();
const cron = require('cron');
const nodemailer = require('nodemailer');

/**
 * @typedef User
 * @type {object}
 * @property {string} mail
 * @property {string} password
 */

/**
 * @typedef Room
 * @type {object}
 * @property {number} id
 * @property {Table[]} tables
 */

/**
 * @typedef Booking
 * @type {object}
 * @property {number} id
 * @property {number} tableId
 * @property {number} roomId
 * @property {number} from
 * @property {number} to
 * @property {string} by
 * @property {boolean} checkedIn
 */

/**
 * @typedef Table
 * @type {object}
 * @property {number} id
 * @property {boolean} bookable
 * @property {boolean} disabled
 * @property {Booking[]} booked
 * @property {string[]} properties
 */

const job = new cron.CronJob('0 * * * * *', () => {
  const now = Date.now();
  for (const room of rooms.values()) {
    for (const table of room.tables) {
      if (table.booked.length === 0) continue;

      if (now - table.booked[0].from >= 900000) {
        const booking = table.booked[0];
        if (!booking.checkedIn) {
          const booking = table.booked.shift();
          bookings.delete(booking.id);

          const mailOptions = {
            from: "<testcodecreate@gmx.de>",
            to: `<${booking.by}>`,
            subject: "Buchung abgelaufen",
            text: "a"
          };

          transporter.sendMail(mailOptions, (error, info) => {
            // 
          });
        }
      }
    }
  }
}, null, true);
job.start();

const transporter = nodemailer.createTransport({
  host: "mail.gmx.net",
  port: 587,
  secure: false,
  auth: {
    user: "testcodecreate@gmx.de",
    pass: "C&CKöln2021"
  }
});

/** @type {Map<string, User>} */
const users = new Map();
/** @type {Map<number, Room>} */
const rooms = new Map();
/** @type {Map<number, Booking>} */
const bookings = new Map();
let bookingId = 0;

initData();

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  /** @type {string} */
  const mail = req.body.mail;
  /** @type {string} */
  const password = req.body.password;
  if (!mail || !password) return res.json({ data: false });

  if (users.has(mail)) return res.json({ data: "Mail already in use." });

  sendMail(mail, "Registrierung", "a");

  users.set(mail, { mail, password });

  res.json({ data: true });
});

app.post('/login', (req, res) => {
  /** @type {string} */
  const mail = req.body.mail;
  /** @type {string} */
  const password = req.body.password;
  if (!mail || !password) return res.json({ data: false });
  
  const user = users.get(mail);

  if (!user) return res.json({ data: "Mail not registered." });

  if (user.password === password) return res.json({ data: true });
  res.json({ data: false });
});

app.get('/roominfo', (req, res) => {
  res.json({ data: Array.from(rooms, ([id, room]) => ({ id, room })) });
});

app.get('/find', (req, res) => {
  //@ts-ignore
  const room = rooms.get(parseInt(req.query.room) || 0);
  /** @type {string[]} */
  //@ts-ignore
  const filters = req.query.filters;
  if (!room) return res.json({ data: false });

  /** @type {number} */
  //@ts-ignore
  const from = parseInt(req.query.from);
  /** @type {number} */
  //@ts-ignore
  const to = parseInt(req.query.to);
  const tables = room.tables.filter((table) => isBookable(table, from, to, filters)).map(t => t.id);

  res.json({ data: tables });
});

app.post('/book', (req, res) => {
  //@ts-ignore
  const room = rooms.get(req.query.room || 0);
  if (!room) return res.json({ data: false });

  const table = room.tables.find(t => t.id === req.body.tableId);
  if (!table) return res.json({ data: false });

  /** @type {number} */
  const from = req.body.from;
  /** @type {number} */
  const to = req.body.to;
  /** @type {string} */
  const by = req.body.user;

  if (!users.has(by)) return res.json({ data: false });

  if (!isBookable(table, from, to)) return res.json({ data: false });

  book(room, table, from, to, by);

  res.json({ data: true });
});

app.get('/check-in/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const booking = bookings.get(id);
  if (!booking) return res.json({ data: false });

  booking.checkedIn = true;

  res.json({ data: true });
});

app.post('/check-out', (req, res) => {
  const room = rooms.get(req.body.room || 0);
  if (!room) return res.json({ data: false });

  const table = room.tables.find(t => t.id === req.body.tableId);
  if (!table) return res.json({ data: false });

  /** @type {number} */
  const from = req.body.from;
  /** @type {number} */
  const to = req.body.to;

  const index = table.booked.findIndex(b => b.from === from && b.to === to);
  if (index === -1) return res.json({ data: false });

  bookings.delete(table.booked[index].id);
  table.booked.splice(index, 1);

  res.json({ data: true })
});

app.post('/renew/:id', (req, res) => {
  /** @type {number} */
  const to = req.body.to;
  const id = parseInt(req.params.id);

  const booking = bookings.get(id);
  if (!booking) return res.json({ data: false });

  const room = rooms.get(booking.roomId);
  const table = room?.tables[booking.tableId];

  if (!room || !table) return res.json({ data: false });

  if (!isBookable(table, booking.to, to)) return res.json({ data: false });

  booking.from = booking.to;
  booking.to = to;

  res.json({ data: true });
});

/**
 * @param {Table} table 
 * @param {number} from 
 * @param {number} to 
 * @param {string[]} [filters]
 */
const isBookable = (table, from, to, filters) => !table.disabled
  && (!filters?.length || !filters.filter(f => !table.properties.includes(f)).length)
  && !table.booked.some((booking) =>
    booking.from <= to && from <= booking.to
  )

/**
 * @param {Room} room 
 * @param {Table} table 
 * @param {number} from 
 * @param {number} to 
 * @param {string} by 
 */
function book(room, table, from, to, by) {
  let index = -1;
  for (let i = 0; i < table.booked.length; i++) {
    const booking = table.booked[i];
    if (booking.from >= from) {
      index = i;
      break;
    }
  }

  const booking = { from, to, by, checkedIn: false, id: bookingId++, tableId: table.id, roomId: room.id };
  table.booked.splice(index, 0, booking);
  bookings.set(booking.id, booking);

  sendMail(by, "Buchungsbestätigung", `Buchungs-ID: ${booking.id}`);
}

/**
 * @param {string} to 
 * @param {string} subject 
 * @param {string} text 
 */
const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: "<testcodecreate@gmx.de>",
    to: `<${to}>`,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    // 
  });
}

function initData() {
  const data = require('./data.json').reverse();
  data.forEach(t => t.id--);
  /** @type {Room} */
  const room = { id: 0, tables: [] };

  for (const table of data) room.tables.push(table);

  rooms.set(0, room);
}

module.exports = app;