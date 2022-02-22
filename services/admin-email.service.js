//packages
const nodemailer = require("nodemailer");

const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "sajuengine@gmail.com",
    pass: process.env.PASS,
  },
  secure: true,
});

const sendEmail = (email, names) => {
  const maildata = {
    from: "sajuengine@gmail.com",
    to: `${email}`,
    subject: "Welcome✌️✌️.",
    html: `
        <h2>Hello admin! ${names}</h2><br>
        <b>Just wanted to welcome you!</b><br>
        <b>Hope you are good</b>
    `,
  };

  transporter.sendMail(maildata, (err, info) => {
    if (err) {
      console.log("error while sending an email");
      console.log(err.message);
    } else {
      console.log("email sent successfully");
    }
  });
};

module.exports = sendEmail;
