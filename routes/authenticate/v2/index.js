const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require(rootPath + '/models');
const { user, UserRegistrationToken } = require(rootPath + '/models');
const { loginValidation } = require(rootPath + '/helpers/validation');
const { getUserMemberships, getUserPermissions, getUserRoles, getUserPermissionsByMemberships } = require(rootPath + '/helpers/controller/user-permissions');
const { 
  createPassword,
  createOtpHash,
  verifyHash,
 } = require(rootPath + '/helpers/hash');
const { capitalizeFirstLetter } = require(rootPath + '/helpers/utils');
const axios = require("axios")
const mailer = require(rootPath + '/components/mailer');
const ejs = require('ejs');
const path = require("path");
const {
  serverError,
  successResp,
  errorResp,
  errorRespSync,
  successRespSync,
} = require(rootPath + '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language'); // constant messages
const { 
  createOTP,
  fileFilterGen,
  sendSMS,
  sendTwilioSMS,
  verifyTwilioSMS,
  logErrorOccurred,
  validateMobileNumber,
 } = require(rootPath + '/helpers/general'); // constant messages
// loading middleware
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + "/middleware/translation");
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const moment = require('moment');
const {langObj } = require(rootPath + '/helpers/consts');
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function
const { sendLoginError } = require(rootPath + '/helpers/report_login_error')
var params, whiteListMimeTypes, lang;
// allowed mime types
whiteListMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
// params
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
var multerS3 = require('multer-s3');
const {loginProcess, checkActivationKeyValidity, signupProcess,reqDemosignupProcess,validateProfileComplete, sendOTP, reqDemoAccess, authCodes, validateUserActivationStatus, signupProcessWithActivation} = require('./auth.controller')
const translationMiddleware = require(rootPath + '/middleware/translation');
var aws = require('aws-sdk');
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});
const storage = multerS3({
  s3,
  bucket: process.env.AWS_PUBLIC_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // create custom key name on s3 cloud
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});
const multer = require('multer');
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});


router.post(
    '/login',
    translation,
    loginValidation(),
    validationErrorHandler,
    async (req, res) => {
      try {
        await checkActivationKeyValidity(req)
       let loginRes = await loginProcess(req)

       res.json(
        await successResp({
          msg: success.LOGIN,
          data: loginRes
        })
      );
      } catch (err) {
        const error = {
          message: JSON.stringify(err.message),
          stack: err.stack ? JSON.stringify(err.stack) : '',
        }
        if(process.env.NODE_ENV != "development")
          await sendLoginError(JSON.stringify(error), req);
  
        logErrorOccurred(__filename, err);
        res.status(err.code || 500).json({
          success: false,
          customCode: err.message,
          message: authCodes[err.message] || 'Internal Server Error',
        });
      }
    }
  );

  router.post(
    '/signup/:type',
    validationErrorHandler,
    translationMiddleware,
    async (req, res, next) => {
      let fileUpload = upload.fields([
        { name: 'facilityPic', maxCount: 1 },
        { name: 'profilePic', maxCount: 1 },
      ]);
      fileUpload(req, res, function (err) {
        if (err instanceof multer.MulterError || err) {
          return res.json(errorRespSync({ code: 200, msg: err.message }));
        } else {
          next();
        }
      });
    },
    async (req, res) => {
      try {

        // signupProcess returns user obj if successful
        let signupRes = await signupProcess(req.body, req.params)
        req.body.credential = req.body.email || req.body.mobile;
        let loginRes = await loginProcess(req)
        // TODO: send otp if required
        // let sendOTPres =  await sendOTP(signupRes.userExists, signupRes.plainOtp, req.params.type, req.headers.lang)

        res.status(200).json({
          success: true,
          code: 200,
          message: "User signup successful",
          data: loginRes
        });

       
      } catch (err) {
        const error = {
          message: JSON.stringify(err.message),
          stack: err.stack ? JSON.stringify(err.stack) : '',
        }
        if(process.env.NODE_ENV != "development")
          await sendLoginError(JSON.stringify(error), req);
        res.status(err.code || 500).json({
          success: false,
          customCode: err.message,
          message: authCodes[err.message] || 'Internal Server Error',
        });
      }
    }
  );

  router.post(
    '/request-demo/signup',
    validationErrorHandler,
    translationMiddleware,
    async (req, res, next) => {
      let fileUpload = upload.fields([
        { name: 'facilityPic', maxCount: 1 },
        { name: 'profilePic', maxCount: 1 },
      ]);
      fileUpload(req, res, function (err) {
        if (err instanceof multer.MulterError || err) {
          return res.json(errorRespSync({ code: 200, msg: err.message }));
        } else {
          next();
        }
      });
    },
    async (req, res) => {
      try {

        // signupProcess returns user obj if successful
        let signupRes = await reqDemosignupProcess(req.body, req.params)
        // TODO: send otp if required
        // let sendOTPres =  await sendOTP(signupRes.userExists, signupRes.plainOtp, req.params.type, req.headers.lang)

        res.status(200).json({
          success: true,
          code: 200,
          message: "Demo user signup successful",
          userId: signupRes
        });

       
      } catch (err) {
        const error = {
          message: JSON.stringify(err.message),
          stack: err.stack ? JSON.stringify(err.stack) : '',
        }
        if(process.env.NODE_ENV != "development")
          await sendLoginError(JSON.stringify(error), req);
        res.status(err.code || 500).json({
          success: false,
          customCode: err.message,
          message: authCodes[err.message] || 'Internal Server Error',
        });
      }
    }
  );

  router.post(
    '/verify/activation-key/:type',
    translation,
    async (req, res) => {
  
      try {
        let signupProcessWithActivationRes = await signupProcessWithActivation(req)
        req.body.credential = req.body.email || req.body.mobile;
        let loginRes = await loginProcess(req)
   
        res.status(200).json({
         success: true,
         code: 200,
         message: "User signup successful",
         data: loginRes
       });
   
      } catch (e) {
  
        return res.json(
          {
            customCode: e.message,
            msg:  authCodes[e.message] || 'Internal Server Error',
          }
        );
      }
    }
  );

  router.post("/validate-user-activation", translation, async (req, res) => {
    try {
     let validationRes = await validateUserActivationStatus(req)

     res.status(200).json({
      success: true,
      code: 500,
      data: validationRes
    });
  
    } catch (error) {
      return serverError(res, error);
    }
  });

  
  router.get("/is-profile-complete/:userId", translation, async (req, res) => {
    try {
     let profileCompleteRes = await validateProfileComplete(req)

     res.status(200).json({
      success: true,
      customCode: "901",
      data: profileCompleteRes
    });
  
    } catch (error) {
      return serverError(res, error);
    }
  });

    
  router.get("/request-demo-access/:userId", translation, async (req, res) => {
    try {
     let reqDemoRes = await reqDemoAccess(req)

     res.status(200).json({
      success: true,
      customCode: "902",
      data: reqDemoRes
    });
  
    } catch (error) {
      return res.json(
         { customCode: error.message,
          msg:  authCodes[error.message] || 'Internal Server Error',}
      );
    }
  });


module.exports = router;