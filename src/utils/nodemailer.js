/* eslint-disable no-undef */
const node = require("nodemailer");
require("dotenv").config();

module.exports = async (email, subject, text) => {
  try {
    const transporter = node.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.Password,
      },
    });

    let messagedetail = {
      from: process.env.email,
      to: email,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(messagedetail, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent Successfully");
        //   console.log(data);
      }
    });
  } catch (error) {
    console.log(`Error While Sending Mail ${error}`);
  }
};
