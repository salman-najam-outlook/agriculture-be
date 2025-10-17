const express = require("express")
const router = express.Router()
const auth = require(rootPath + "/middleware/auth")
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api")
const db = require(rootPath + "/models")
var path = require('path');
const fileUpload = require(rootPath + '/middleware/file_upload');
const S3 = require(rootPath + '/components/s3upload');
var aws = require('aws-sdk');
const multer = require('multer');
var multerS3 = require('multer-s3');
const {
  fileFilterGen,
  logErrorOccurred,
} = require(rootPath + '/helpers/general');
const axios = require('axios')
const { error, success } = require(rootPath + '/helpers/language'); // constant messages
const { deleteFileS3, uploadToS3, getSignedURL } = require(rootPath + '/helpers/aws_s3');
const sharp = require('sharp')

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});

// storage configuration
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

var params, whiteListMimeTypes, lang;
// allowed mime types
whiteListMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
// params
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
// allowed mimetypes
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function
// create upload
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});

const mupload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    cb(null, true);
  }
});

router.post('/processed-image', mupload.single('image'), auth, async (req, res, next) => {
  const inputImageBuffer = req.file.buffer;
  const transparentImageBuffer = await sharp(inputImageBuffer)
      .resize({
        width: 120,
        height: 110,
        fit: 'cover'
      })
      .flatten({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
  res.set('Content-Type', 'image/png');
  res.send(transparentImageBuffer);
})


router.post(
  '/',
  auth,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'label_preview', maxCount: 1 },
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
      const {
        title,
        label_format,
        // label_preview,
        background_color_code,
        text_color_code,
        is_active,
        
      } = req.body;

      const user_id = req.user?.id;

      const logoFile = req.files['logo'] ? req.files['logo'][0] : null;
      const logoPic = logoFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(logoFile)
        : logoFile;
      const labelPreviewFile = req.files['label_preview'] ? req.files['label_preview'][0] : null;
      const labelPreviewPic = labelPreviewFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(labelPreviewFile)
        : labelPreviewFile;

      const set = {
        title,
        label_format,
        label_preview: labelPreviewPic,
        background_color_code,
        text_color_code,
        logo: logoPic,
        is_active,
        organization_id: req.user.organization,
        user_id
      };


      const label = await db.TraceabilityLabels.create(set);

      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: label,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/all',
  auth,
  async (req, res) => {
    try {
      let { id: userId } = req.user;

      let label = await db.TraceabilityLabels.findAll({
        where: { user_id: userId },
      });


      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: label,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);
router.post(
  '/format',
  auth,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: 'image', maxCount: 1 },
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
      const {
        name,
      } = req.body;

      const user_id = req.user?.id;

      const logoFile = req.files['image'] ? req.files['image'][0] : null;
      const logoPic = logoFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(logoFile)
        : logoFile;

      const set = {
        name,
        image: logoPic,
        user_id
      };


      const labelFormat = await db.LabelFormat.create(set);

      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: labelFormat,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put(
  '/active-status/:id',
  auth,
  async (req, res) => {
    try {
      const {
        is_active,
      } = req.body;

      const { id } = req.params;

      const existingLabel = await db.TraceabilityLabels.findOne({
        attributes: ['logo'],
        where: { id }
      });

      if (!existingLabel) {
        throw new Error("Not found");
      }

      const set = {
        is_active
      };

      let updatedData = await db.TraceabilityLabels.update(set, {
        where: { id },
      });



      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: updatedData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put(
  '/',
  auth,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'label_preview', maxCount: 1 },
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
      const {
        title,
        label_format,
        // label_preview,
        background_color_code,
        text_color_code,
        is_active,
      } = req.body;

      const user_id = req.user?.id;
      const { id } = req.body;


      const existingLabel = await db.TraceabilityLabels.findOne({
        attributes: ['logo', 'label_preview'],
        where: { id }
      });

      if (!existingLabel) {
        throw new Error("Not found");
      }


      // check if file uploaded or not
      const logoFile = req.files['logo'] ? req.files['logo'][0] : null;
      const logoPic = logoFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(logoFile)
        : logoFile;

      const labelPreviewFile = req.files['label_preview'] ? req.files['label_preview'][0] : null;
      const labelPreviewPic = labelPreviewFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(labelPreviewFile)
        : labelPreviewFile;


      const { logo, label_preview } = existingLabel;

      const set = {
        title,
        label_format,
        background_color_code,
        text_color_code,
        is_active,
        user_id
      };

      if(labelPreviewPic) {
        set.label_preview = labelPreviewPic
      }
      if(logoPic) {
        set.logo = logoPic
      }


      let updatedData = await db.TraceabilityLabels.update(set, {
        where: { id },
      });

      if (logo?.key && logoPic && logoPic) {
        await deleteFileS3({
          Bucket: process.env.AWS_PUBLIC_BUCKET,
          Key: logo.key
        })

      }
      if (label_preview?.key && labelPreviewPic && labelPreviewPic) {
        await deleteFileS3({
          Bucket: process.env.AWS_PUBLIC_BUCKET,
          Key: label_preview.key
        })

      }

      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: updatedData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);



router.get(
  '/format',
  async (req, res) => {
    try {

      let label = []
      label = await db.LabelFormat.findAll();
      let promiseArr = []

      label.forEach(lab => {
        const params = {
          Bucket: process.env.AWS_PUBLIC_BUCKET,
          Key: lab.image.key,
          Expires: 43000,
          ResponseContentType: 'image/svg+xml'
        };
        // console.log(params);
  
        promiseArr.push(getSignedURL('getObject', params))
      })

      let promiseArrRes = []
      promiseArrRes =  await Promise.all(promiseArr)

      let resArr  = []
      resArr = label.map((lb, index) => {
        lb.image.location = promiseArrRes[index]
        return lb
      })

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: resArr,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/:id',
  async (req, res) => {
    try {
      let { id } = req.params;

      let label = await db.TraceabilityLabels.findOne({
        where: { id: id },
      });


      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: label,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/format/:id',
  async (req, res) => {
    try {
      let { id } = req.params;

      let label = await db.LabelFormat.findOne({
        where: { id: id },
      });


      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: label,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);



router.delete(
  '/:id',
  auth,
  async function (req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      await db.TraceabilityLabels.destroy({
        where: { id: id, user_id: userId },
      });

      return res.json(
        successRespSync({
          msg: 'Tracebility Label deleted.',
        })
      );

    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/logo-proxy/:id',
  auth,
  async function (req, res) {
    try {
      let label = await db.TraceabilityLabels.findOne({
        where: { id: req.params.id },
      });
      if(label && label.logo) {
        const logoLocation = label.logo.location

        const response = await axios.get(logoLocation, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=image.jpg');

        res.send(response.data);
      }
      
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
