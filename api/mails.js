//@ts-check

const nodemailer = require('nodemailer');

const mailAuth = {
  user: "testcodecreate@gmx.de",
  pass: "C&CKöln2021"
}

const transporter = nodemailer.createTransport({
  host: "mail.gmx.net",
  port: 587,
  secure: false,
  auth: mailAuth
});

/**
 * @param {string} to 
 * @param {string} subject 
 * @param {string} text 
 */
const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: mailAuth.user,
    to: `<${to}>`,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    // 
  });
}

module.exports = { sendMail };