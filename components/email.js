"use strict";
const nodemailer = require("nodemailer");

try{
    // create reusable transporter object using the default SMTP transport
    exports.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    });
}catch(err){
    console.log('Problem: error-',err);
}
