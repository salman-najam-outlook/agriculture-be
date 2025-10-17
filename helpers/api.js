const { error } = require('./language');
const path = require('path');
const ejs = require('ejs');
const mailer = require(rootPath + '/components/mailer');
let moduleToCode = {
  login: error.code.USER_NOT_VERIFIED,
  general: error.code.SERVER_ERROR
}

// send success response
exports.successResp = async (args) => {
  let { msg, data } = args;
  // renaming `data` key inside data variable
  if (data != null && data != undefined && data.hasOwnProperty('data')) {
    data = { ...data, info: data.data };
    delete data.data;
  }
  return {
    success: true,
    code: 200,
    message: msg,
    data: data == null || data == undefined ? {} : data,
  };
};
// send error response
exports.errorResp = async (args = {}) => {
  const { msg, code, module } = args;

  const template = await ejs.renderFile(
    path.join(rootPath, 'views', '/timeout_error.html'),
    
  );

  return {
    success: false,
    code: moduleToCode[module] || code || 500,
    // code: code == undefined ? 500 : code, 
    message: msg == undefined ? error.SERVER : msg,
  };
};

// send success response
exports.successRespSync = (args) => {
  let { msg, data, statusCode } = args;

  // renaming `data` key inside data variable
  if (data != null && data != undefined && data.hasOwnProperty('data')) {
    data = { ...data, info: data.data };
    delete data.data;
  }
  return {
    success: true,
    code: statusCode ? statusCode : 200,
    message: msg,
    data: data == null || data == undefined ? {} : data,
  };
};
// send error response
exports.errorRespSync = (args = {}) => {
  const { msg, code, data } = args;

  const handleTemplateAndSendMail = () => {
    const templatePath = path.join(rootPath, 'views', '/timeout_error.html');
    return ejs.renderFile(templatePath)
      .then((template) => {
        return Promise.all([
          mailer.sendMail('amit@dimitra.io', `${msg} - errorRespSync - ${endPoint} - ${httpMethod}`, template),
          // mailer.sendMail('srijan@dimitra.io', title, template),
          // mailer.sendMail('raunak@dimitra.io', title, template),
          // mailer.sendMail('saphal@dimitra.io', title, template),
          // mailer.sendMail('peterthor@dimitra.io', title, template),
          // mailer.sendMail('jon@dimitra.io', title, template),
          // mailer.sendMail('raunak@dimitra.io', title, template),
          // mailer.sendMail('aashish@dimitra.io', title, template),
          // mailer.sendMail('anup@dimitra.io', title, template),
        ]);
      });
  };

  let promise = Promise.resolve();
  if(process.env.NODE_ENV == 'production'){
    if (typeof msg === 'string' && !(msg?.includes("deep") || msg?.includes("PDF") || msg?.includes("token") || msg?.includes("Token"))) {
      promise = handleTemplateAndSendMail();
    }
  }

  promise.then(() => console.log("errorRespSync log"))

  const res = {
    success: false,
    code: code || 200,
    message: msg == undefined ? error.SERVER : msg,
  };
  if (data) {
    res.data = data;
  }
  return res;
};


// send error response
exports.serverError = async (res, err = null) => {
  console.log(err)


  console.log({
    success: false,
    code: error.code.SERVER_ERROR,
    message: err?.message ?? error.SERVER,
  });
  // Changed due to the timeout issue was stucked in here
  return res.status(error.code.SERVER_ERROR).json({
    success: false,
    code: error.code.SERVER_ERROR,
    message: err?.message ?? error.SERVER,
  });
  // return {
  //   success: false,
  //   code: error.code.SERVER_ERROR,
  //   message: err?.message ?? error.SERVER,
  // };
};