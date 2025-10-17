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
const { error, success } = require(rootPath + '/helpers/language'); // constant messages
const { deleteFileS3, uploadToS3, getSignedURL } = require(rootPath + '/helpers/aws_s3');
const sharp = require('sharp')
const { default: axios } = require('axios')

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
const FormData = require('form-data');


const {  getDiseaseDetection, getCropsData,  getDetectionListing, getDetectionDetails, postFeedbackData} = require('./detection.controller')


router.get('/get-crops-data',  auth, async  (req, res) => {
  try {
 
  let cropsDataRes = await getCropsData(req)
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: cropsDataRes
      })
    );

  } catch (error) {
    console.error('Error fetching disease detection data:', error);
    res.status(500).json({ message: 'Failed to fetch data', success: false });
  }
});

router.post(
    '/',
    auth,
    async (req, res, next) => {
      let fileUpload = upload.fields([
        { name: 'inputImages', maxCount: 5 },
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
        let inputFiles = req.files;
        const formData = new FormData();
        formData.append('app', 'diseases');
        formData.append('crop_id', req.body.cropTypeId);

        let bufferArr = [];
        let bufferPromiseArr  = [];
        let imageArr = []

        bufferPromiseArr =  inputFiles.inputImages.map( el => {
             imageArr.push({location: el.location, key: el.key})
            return   axios.get(el.location, { responseType: 'arraybuffer' });
        })

        bufferArr = await Promise.all(bufferPromiseArr);

        bufferArr.forEach ( bfr =>{
           formData.append('file', bfr.data, { filename:'sample.jpg', contentType: 'image/png' });
        })

  
        let detectionRes = await getDiseaseDetection(req, formData, imageArr)

        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: detectionRes,
          })
        );
      } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    }
  );

  router.get('/',   auth,async (req, res) => {
    try {
      
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

    let { rows: data, count: totalItems } = await getDetectionListing(req)
    
      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: {
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems,
            data,
          }
        })
      );
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Failed to fetch data' , success: false});
    }
  });

  router.get('/:id',  auth, async (req, res) => {
    try {
   
    let detailRes = await getDetectionDetails(req)
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: detailRes
        })
      );
  
    } catch (error) {
      console.error('Error fetching disease detection data:', error);
      res.status(500).json({ message: 'Failed to fetch data', success: false });
    }
  });


  router.post('/feedback',  auth, async (req, res) => {
    try {
      const {  diseaseDetectionId } = req.body;
      const formData = new FormData();
      formData.append('app', 'diseases');
      formData.append('crop_id', req.body.cropTypeId);
      let bufferArr = [];
      let bufferPromiseArr  = [];
      let imageArr = []

      let diseaseDetectionImages = await db.DiseaseDetectionImages.findAll({where: { disease_detect_id: diseaseDetectionId }});
    
      if(diseaseDetectionImages) {

        bufferPromiseArr =  diseaseDetectionImages.map( el => {
              imageArr.push(el.file_name)
            return   axios.get(el.file_name, { responseType: 'arraybuffer' });
        })

        bufferArr = await Promise.all(bufferPromiseArr);

        bufferArr.forEach ( bfr =>{
            formData.append('file', bfr.data, { filename:`feedback-img-${new Date().getTime()}.png`, contentType: 'image/png' });
        })

      }
      let feedBackRes = await postFeedbackData(req, formData)
  
      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: feedBackRes
        })
      );

    } catch (error) {
      res.status(500).json({
        message: 'Error creating data',
        error: error.message,
        success: false
      });
    }
  });


  module.exports = router;