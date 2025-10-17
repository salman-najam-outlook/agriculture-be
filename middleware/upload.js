const multer = require("multer");
const { errorRespSync, validationErrorRespSync } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { v4: randomSting } = require("uuid");

// file fiter function generator
function fileFilterGen(whiteListMimeTypes) {
  return async function (req, file, cb) {
    let mimetype = file.mimetype.trim().toLowerCase(); // mimetype of the file
    // chekc if valid mimetype or not
    if (whiteListMimeTypes.includes(mimetype)) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid File Type"));
    }
  };
}

exports.uploadAny = (params) => {
  const { uploadpath, whiteListMimeTypes, maxFileSize, fields } = params;
  console.log(params);
  const maxSize = maxFileSize * 1024 * 1024; // converting into bytes
  // generating filename and uploaing flle to a specific path
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadpath);
    },
    filename: (req, file, cb) => {
      const { originalname } = file;
      const extension = originalname.split(".").pop();
      const filename = randomSting() + "." + extension;
      cb(null, filename);
    },
  });

  // return middleware
  return (req, res, next) => {
    let uploadFile = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: fileFilterGen(whiteListMimeTypes),
      preservePath: true,
    });

    // function according to the fields
    if (fields != null) {
      uploadFile = uploadFile.fields(fields);
    } else {
      uploadFile = uploadFile.any();
    }

    // handeling multer error manually
    uploadFile(req, res, (err) => {
      // If error return error to the client
      if (err instanceof multer.MulterError) {
        return validationErrorRespSync(res, { msg: err.message });
      } else if (err) {
        return validationErrorRespSync(res, { msg: err.message });
      } else {
        next();
      }
    });
  };
};

exports.uploadSingleBuffer = (params) => {
  // extract variables
  const { whiteListMimeTypes, maxFileSize, fieldName } = params;
  const maxSize = maxFileSize * 1024 * 1024; // converting into bytes

  // storing into memory in form of buffer only
  const storage = multer.memoryStorage();

  // return middleware
  return (req, res, next) => {
    let upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: fileFilterGen(whiteListMimeTypes),
    });

    // uploading a file
    const uploadFile = upload.single(fieldName);
    // handeling multer error manually
    uploadFile(req, res, (err) => {
      // If error return error to the client
      if (err instanceof multer.MulterError) {
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: err.message,
          })
        );
      }
      // If error return error to the client
      if (err) {
        return res.json(
          errorRespSync({
            code: success.code.OK,
            msg: error.INVALID_FILE,
          })
        );
      }
      next();
    });
  };
};

// upload single file only
exports.uploadSingle = (params) => {
  const { uploadpath, whiteListMimeTypes, maxFileSize, fieldName } = params;
  const maxSize = maxFileSize * 1024 * 1024; // recieving in mbs // converting into bytes

  console.log(params);

  // generating filename and uploaing flle to a specific path
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadpath);
    },
    filename: (req, file, cb) => {
      const { originalname } = file;
      const extension = originalname.split(".").pop();
      const filename = randomSting() + "." + extension;
      cb(null, filename);
    },
  });

  // return middleware
  return (req, res, next) => {
    let uploadFile = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: fileFilterGen(whiteListMimeTypes),
      preservePath: true,
    });

    uploadFile = uploadFile.single(fieldName);

    // handeling multer error manually
    uploadFile(req, res, (err) => {
      // If error return error to the client
      if (err instanceof multer.MulterError) {
        return validationErrorRespSync(res, { msg: err.message });
      } else if (err) {
        return validationErrorRespSync(res, { msg: err.message });
      } else {
        next();
      }
    });
  };
};
