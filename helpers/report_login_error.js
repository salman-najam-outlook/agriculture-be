const ejs = require('ejs');
const mailer = require(rootPath + '/components/mailer');
const path = require("path");

exports.sendLoginError = async (errorMessage, req) => {
  try {
    const env = req.headers.origin || 'local';
    const credential = req.body.credential;
    const title = credential ? `Login error for ${credential}` : 'Login error';
    const data = {
      errorMessage,
      env
    };
    const template = await ejs.renderFile(
      path.join(rootPath, 'views', 'users/login-error.html'),
      data
    );
  
    await Promise.all([
      mailer.sendMail('amit@dimitra.io', title, template),
      mailer.sendMail('srijan@dimitra.io', title, template),
      mailer.sendMail('raunak@dimitra.io', title, template),
      mailer.sendMail('saphal@dimitra.io', title, template),
      mailer.sendMail('aashish@dimitra.io', title, template),
      mailer.sendMail('anup@dimitra.io', title, template),
    ]);
    console.log("hits")
  } catch (error) {
    return error
  }
    
  }