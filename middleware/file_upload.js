const { errorRespSync } = require(rootPath + "/helpers/api");
const { error,success } = require(rootPath + "/helpers/language"); // constant messages
// multer configuration
var aws = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
const { v4: randomSting } = require("uuid");

// helpers
const { fileFilterGen } = require(rootPath + "/helpers/general"); // general helper functions

const REGION = "ap-south-1";
var s3 = new aws.S3({ region: REGION });

module.exports = function makeMulterUploadMiddleware(params) {
  // console.log("params.bucket", params.bucket);
  const { bucket, acl, whiteListMimeTypes, fields } = params;
  // storage configuration
  let config = {
    s3,
    bucket: bucket??process.env.AWS_PUBLIC_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // create custom key name on s3 cloud
      let fileNameArr = file.originalname.split(".");
      let extension = fileNameArr[fileNameArr.length - 1].trim().toLowerCase();
      cb(null, randomSting() + "." + Date.now().toString() + "." + extension);
    },
  };

  // check if acl is set or not
  if( acl != null && acl != undefined ){
    config.acl = acl;
  }
  const storage = multerS3(config);
  // get filter function
  const fileFilter = fileFilterGen(whiteListMimeTypes);
  // create upload
  var upload = multer({
    storage,
    fileFilter,
  });

  // create multerUploadFunction

  if (typeof fields == "string") {
    var multerUploadFunction = upload.single(fields);
  } else if (Array.isArray(fields)) {
    var multerUploadFunction = upload.fields(fields);
  } else {
    var multerUploadFunction = upload.any();
  }

  return (req, res, next) => {
    multerUploadFunction(req, res, (err) => {
      // handle Multer error
      if (err && err.name && err.name === "MulterError") {
        console.log("multer err *********here", err);
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: err.message,
          })
        );
      }
      // handle other errors
      if (err) {
        console.log("errro");
        console.log("multer err *********here", err);
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: err.message,
          })
        );
      }

      console.log("no errro");
      next();
    });
  };
};
