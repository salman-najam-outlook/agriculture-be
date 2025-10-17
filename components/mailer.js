'use strict';

const   ejs = require('ejs')
  ,     path = require('path')
  ,     debug = require('debug')('api:email')
  ,     viewPaths = './views/';

const fs = require("fs")
const simpleTranslate = require(rootPath + '/helpers/simpleTranslate')
const nodemailer = require('nodemailer');

// Create a transporter using Brevo's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'noreply@dimitra.io',
    pass: process.env.GOOGLE_SMTP_PASS,
  },
});

class Mailer {
  constructor(){}

  sendMail(to, subject, html, attachments) {
    return new Promise((resolve, reject)=>{

      const mailOptions = {
        from: '"Team Dimitra" <noreply@dimitra.io>',// Sender address
        to, // List of recipients
        subject, // Subject line
        html, // HTML body
        attachments: attachments ? Array.isArray(attachments) ? attachments : [attachments] : undefined,
      };
      if(process.env.MOCK_EMAIL){ //Dont send actual emails when mocking
        debug(subject + ' Email mocked to : ' + to);
        return resolve(true);
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error, "google smtp error");
          return reject(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        resolve(info);
      });
    });
  }

  renderAndSend (to, data, template, title){
    return new Promise((resolve, reject)=>{
      ejs.renderFile(path.join(__dirname, '..', 'views', template), data, (err, output)=>{
        if(err)  return reject(err);
        resolve(this.sendMail(to, title, output));
      });
    });
  }

  pullLanguageWiseTemplate(lang,templatePrefix, defaultTemplate){
     const fileName = `users/${templatePrefix}-${lang}.html`
     const isFileExist = fs.existsSync(path.join(__dirname, '..', 'views', fileName))
     if(isFileExist){
      return fileName
     }
     return defaultTemplate
  }

  sendSignupOtp(to, firstName, otp, lang='en'){
    const emailTemplate = this.pullLanguageWiseTemplate(lang, 'sign-up-otp', 'users/sign-up-otp.html')
    return this.renderAndSend(
      to,
      {
        firstName: firstName,
        otp: otp,
        otpOnly: false,
        lang:lang
      },
      emailTemplate,
      simpleTranslate(lang, 'Welcome to Dimitra - Email Verification')
    );
  }

  sendOtp(to, firstName, otp, lang='en') {
    const emailTemplate = this.pullLanguageWiseTemplate(lang, 'sign-up-otp', 'users/sign-up-otp.html')
    return this.renderAndSend(
      to,
      {
        firstName: firstName,
        otp: otp,
        otpOnly: true,
        lang:lang
      },
      emailTemplate,
      simpleTranslate(lang, 'Dimitra Email Verification')
    );
  }
}
module.exports =  new Mailer();