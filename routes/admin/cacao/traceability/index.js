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
const { deleteFileS3 } = require("../../../../helpers/aws_s3")

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
whiteListMimeTypes = ['image/jpeg', 'image/png'];
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
/**
 * @swagger
 * /cacao/tracebility:
 *   post:
 *     description: Create tracebility 
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for submitting new tracebility
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                slogan:
 *                  type: string
 *                additional_logos:
 *                  type: array
 *                  items:
 *                    type: string
 *                origin_title:
 *                  type: string
 *                origin_description:
 *                  type: string
 *                map_link:
 *                  type: string
 *                origin_image:
 *                  type: string
 *                cooperative_title:
 *                  type: string
 *                cooperative_description:
 *                  type: string
 *                website_link:
 *                  type: string
 *                cooperative_image:
 *                  type: string
 *                traceability_title:
 *                  type: string
 *                traceability_description:
 *                  type: string
 *                traceability_image:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              {
 *                "parchmentId": 1,
 *                "parchmentBarcode": "barcodeStr",
 *                "product": "product123",
 *                "amount": 100,
 *                "quantity": 10,
 *                "inboundUnitValue": 110,
 *                "recordId": "test123"
 *              }
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Data successfully created.
 *
 */
router.post(
  "/",
  auth,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: 'additional_logos', maxCount: 3 },
      { name: 'origin_image', maxCount: 1 },
      { name: 'cooperative_image', maxCount: 1 },
      { name: 'traceability_image', maxCount: 1 },
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
        slogan,
        origin_title,
        origin_description,
        map_link,
        cooperative_title,
        cooperative_description,
        website_link,
        traceability_title,
        traceability_description,
      } = req.body;
      const user_id = req.user?.id;
      const additionalLogosFiles = req.files['additional_logos'] ? req.files['additional_logos'] : [];
      const originFile = req.files['origin_image'] ? req.files['origin_image'][0] : null;
      const cooperativeFile = req.files['cooperative_image'] ? req.files['cooperative_image'][0] : null;
      const traceabilityFile = req.files['traceability_image'] ? req.files['traceability_image'][0] : null;

      const additinalLogosToSave = await additionalLogosFiles?.map((a) => {
        const { key, originalname, location } = a;
        return { key, originalname, location };
      });

      const originPic = originFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(originFile)
        : originFile;
      const tracabilityPic = traceabilityFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(traceabilityFile)
        : traceabilityFile;
      const cooperativePic = cooperativeFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(cooperativeFile)
        : cooperativeFile;

      const dataToSave = {
        slogan,
        additional_logos: additinalLogosToSave,
        origin_title,
        origin_description,
        map_link,
        origin_image: originPic,
        cooperative_title,
        cooperative_description,
        website_link,
        cooperative_image: cooperativePic,
        traceability_title,
        traceability_description,
        traceability_image: tracabilityPic,
        organization_id: req.user.organization,
        user_id
      }

      const cacaoTraceability = await db.CacaoTraceability.create(dataToSave);

      res.json(
        await successRespSync({
          msg: success.INSERTED,
          data: cacaoTraceability
        })
      );

    } catch (err) {
      logErrorOccurred(__filename, err);
      console.log("error occured in catch*************", err.message);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);

router.put(
  '/',
  auth,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: 'additional_logos', maxCount: 3 },
      { name: 'origin_image', maxCount: 1 },
      { name: 'cooperative_image', maxCount: 1 },
      { name: 'traceability_image', maxCount: 1 },
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
        id,
        slogan,
        origin_title,
        origin_description,
        map_link,
        cooperative_title,
        cooperative_description,
        website_link,
        traceability_title,
        traceability_description,
        logosToRemove: jsonLogosToRemove,
        // organization_id
      } = req.body;

      const user_id = req.user?.id;

      const traceability = await db.CacaoTraceability.findOne({
        attributes: ['additional_logos', 'origin_image', 'cooperative_image', 'traceability_image'],
        where: { id }
      });

      if (!traceability) {
        throw new Error("Not found");
      }

      const logosToRemove = JSON.parse(jsonLogosToRemove);
      // check if file uploaded or not
      const additionalLogosFiles = req.files['additional_logos'] ? [...req.files['additional_logos'], ...(traceability.additional_logos ?? [])] : traceability.additional_logos;
      const originFile = req.files['origin_image'] ? req.files['origin_image'][0] : traceability.origin_image;
      const cooperativeFile = req.files['cooperative_image'] ? req.files['cooperative_image'][0] : traceability.cooperative_image;
      const traceabilityFile = req.files['traceability_image'] ? req.files['traceability_image'][0] : traceability.traceability_image;

      const additionalLogos = await additionalLogosFiles?.map((a) => {
        const { key, originalname, location } = a;
        return { key, originalname, location };
      });

      const originPic = originFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(originFile)
        : originFile;
      const tracabilityPic = traceabilityFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(traceabilityFile)
        : traceabilityFile;
      const cooperativePic = cooperativeFile ?
        (({ key, originalname, location }) => ({ key, originalname, location }))(cooperativeFile)
        : cooperativeFile;

      await Promise.all(logosToRemove.map(async (logo) => {
        await deleteFileS3({
          Bucket: process.env.AWS_PUBLIC_BUCKET,
          Key: logo.key
        })
      }));

      const filterFilesToRemove = (filesOrFile) => {
        if(!filesOrFile) return '';
        const files = Array.isArray(filesOrFile) ? filesOrFile : [filesOrFile];
        const filteredFiles = files.filter(file => {
          return logosToRemove.findIndex(logo => logo.key === file.key) === -1;
        });

        if(!Array.isArray(filesOrFile)) return filteredFiles.length > 0 ? filteredFiles[0] : '';
        return filteredFiles;
      }

      const set = {
        slogan,
        additional_logos: filterFilesToRemove(additionalLogos),
        origin_title,
        origin_description,
        map_link,
        origin_image: filterFilesToRemove(originPic),
        cooperative_title,
        cooperative_description,
        website_link,
        cooperative_image: filterFilesToRemove(cooperativePic),
        traceability_title,
        traceability_description,
        traceability_image: filterFilesToRemove(tracabilityPic),
        organization_id: req.user.organization,
        user_id
      };

      let updatedData = await db.CacaoTraceability.update(set, {
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



router.get(
  '/:id',
  async (req, res) => {
    try {
      let { id } = req.params;

      let traceability = await db.CacaoTraceability.findOne({
        where: { id: id },
      });


      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: traceability,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      let { organization: organization_id } = req.user;

      let traceability = await db.CacaoTraceability.findAll({
        where: { organization_id },
      });


      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: traceability,
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

      await db.CacaoTraceability.destroy({
        where: { id: id, user_id: userId },
      });

      return res.json(
        successRespSync({
          msg: 'Tracebility deleted.',
        })
      );

    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router