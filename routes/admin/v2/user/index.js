const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { logErrorOccurred, notEmpty, fileFilterGen } = require(rootPath + '/helpers/general');

const {getAllOptions, checkKeysAgainstUserBulkUpload} = require("./bulk-upload.controller")
const translation = require(rootPath + "/middleware/translation");
const {
    serverError,
    successResp,
    errorResp,
    errorRespSync,
    successRespSync,
  } = require(rootPath + '/helpers/api');
const auth = require(rootPath + '/middleware/auth');
var aws = require('aws-sdk');
const multer = require('multer');
var multerS3 = require('multer-s3');
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
var params, whiteListMimeTypes;
whiteListMimeTypes = ['text/csv'];
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
const fileFilter = fileFilterGen(whiteListMimeTypes);
var upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2000000 },
  });
  
router.get("/options", translation,auth, async (req, res) => {
    try {
     let optionsRes = await getAllOptions(req)

     res.status(200).json({
      success: true,
      data: optionsRes
    });
  
    } catch (error) {
      return serverError(res, error);
    }
  });


  router.post("/stage-user-bulk-upload", 
    translation,
    auth, 
    (req, res, next) => {
    let fileUpload = upload.single("userUploadStage");
    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else if (req.file == undefined) {
        return res.json(
          errorRespSync({ code: 200, msg: "Csv required" })
        );
      } else {
        next();
      }
    });
  },
  
  async (req, res) => {
    try {
     let stagingRes = await checkKeysAgainstUserBulkUpload(req)

     res.status(200).json({
      success: true,
      data: stagingRes
    });
  
    } catch (error) {
      return serverError(res, error);
    }
  });

module.exports = router;