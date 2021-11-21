//@ts-check

const bodyParser = require('body-parser');
const app = require('express')();
const cron = require('cron');

const { sendMail } = require('./mails');

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

          sendMail(booking.by, "Buchung abgelaufen", "a");
        }
      }
    }
  }
}, null, true);
job.start();

/** @type {Map<string, import('./types').User>} */
const users = new Map();
/** @type {Map<number, import('./types').Room>} */
const rooms = new Map();
/** @type {Map<number, import('./types').Booking>} */
const bookings = new Map();
let bookingId = 0;

initData();

app.use(bodyParser.json());

/**
 * POST /api/register
 * body: { mail: string, password: string }
 */
app.post('/register', (req, res) => {
  /** @type {string} */
  const mail = req.body.mail;
  /** @type {string} */
  const password = req.body.password;
  /** @type {string} */
  const name = req.body.name;
  /** @type {number} */
  const age = req.body.age;
  if (!mail || !password) return res.status(500).json({ data: "E-Mail and password are required." });

  if (users.has(mail)) return res.status(500).json({ data: "Mail already in use." });

  sendMail(mail, "Registrierung", "a");

  users.set(mail, { mail, password, name, age });

  res.json({ data: "Registered." });
});

/**
 * POST /api/login
 * body: { mail: string, password: string }
 */
app.post('/login', (req, res) => {
  /** @type {string} */
  const mail = req.body.mail;
  /** @type {string} */
  const password = req.body.password;
  if (!mail || !password) return res.status(401).json({ user: null });
  
  const user = users.get(mail);

  if (!user) return res.status(401).json({ user: null });

  if (user.password === password) return res.status(401).json({ user: null });
  return res.json({ user });
});

/**
 * GET /api/roominfo
 */
app.get('/roominfo', (req, res) => {
  res.json({ data: Array.from(rooms, ([id, room]) => ({ id, room })) });
});


/**
 * GET /api/find?room=0&from=123456789&to=123456789&filters[]=Drucker&filters[]=LAN
 */
app.get('/find', (req, res) => {
  //@ts-ignore
  const room = rooms.get(parseInt(req.query.room) || 0);
  /** @type {string[]} */
  //@ts-ignore
  const filters = req.query.filters;
  if (!room) return res.status(500).json({ data: "Invalid room ID" });

  /** @type {number} */
  //@ts-ignore
  const from = parseInt(req.query.from);
  /** @type {number} */
  //@ts-ignore
  const to = parseInt(req.query.to);
  const tables = room.tables.filter((table) => isBookable(table, from, to, filters)).map(t => t.id);

  res.json({ data: tables });
});

app.get('/book/:id', (req, res) => {
  const booking = bookings.get(parseInt(req.params.id));
  if (!booking) return res.status(500).json({ data: "Invalid booking ID" });

  res.json(booking);
});

/**
 * POST /api/book
 * body: { room: number, tableId: number, from: number, to: number, by: string}
 */
app.post('/book', (req, res) => {
  //@ts-ignore
  const room = rooms.get(req.body.room || 0);
  if (!room) return res.status(500).json({ data: "Invalid room ID" });

  const table = room.tables[req.body.tableId - 1];
  if (!table) return res.status(500).json({ data: "Invalid table ID" });

  /** @type {number} */
  const from = req.body.from;
  /** @type {number} */
  const to = req.body.to;
  /** @type {string} */
  const by = req.body.by;

  if (!users.has(by)) users.set(by, { age: null, mail: by, name: "Max Mustermann", password: null });

  if (!isBookable(table, from, to)) return res.status(500).json({ data: "Table can't be booked" });

  book(room, table, from, to, by);

  res.json({ bookingId });
});

/**
 * POST /api/check-in
 * body: { id: number }
 */
app.post('/check-in', (req, res) => {
  const id = parseInt(req.body.id);

  const booking = bookings.get(id);
  if (!booking) return res.status(500).json({ data: "Invalid booking ID" });

  booking.checkedIn = true;

  res.json({ data: true });
});

/**
 * POST /api/check-out
 * body: { id: number }
 */
app.post('/check-out', (req, res) => {
  const id = parseInt(req.body.id);

  const booking = bookings.get(id);
  if (!booking) return res.status(500).json({ data: "Invalid booking ID" });

  const room = rooms.get(booking.roomId);
  if (!room) return res.status(500).json({ data: "Invalid room ID" });

  const table = room.tables[booking.tableId - 1];
  if (!table) return res.status(500).json({ data: "Invalid table ID" });

  const index = table.booked.findIndex(b => b.id === booking.id);
  if (index === -1) return res.status(500).json({ data: "Invalid booking ID" });

  bookings.delete(booking.id);
  table.booked.splice(index, 1);

  res.json({ data: true });
});

/**
 * POST /api/renew
 * body: { id: number, to: number }
 */
app.post('/renew', (req, res) => {
  /** @type {number} */
  const to = req.body.to;
  const id = parseInt(req.body.id);

  const booking = bookings.get(id);
  if (!booking) return res.status(500).json({ data: "Invalid booking ID" });

  const room = rooms.get(booking.roomId);
  const table = room?.tables[booking.tableId];

  if (!room || !table) return res.status(500).json({ data: "Invalid room or table ID" });

  if (!isBookable(table, booking.to, to)) return res.status(500).json({ data: "Table can't be booked" });

  booking.from = booking.to;
  booking.to = to;

  sendMail(booking.by, "Buchung verlängert", "a");

  res.json({ data: true });
});

/**
 * @param {import('./types').Table} table 
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
 * @param {import('./types').Room} room 
 * @param {import('./types').Table} table 
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

function initData() {
  const tables = require('./data.json').reverse();
  /** @type {import('./types').Room} */
  const room = { id: 0, tables };

  rooms.set(0, room);
}

module.exports = app;
