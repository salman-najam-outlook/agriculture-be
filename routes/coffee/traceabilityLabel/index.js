const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const db = require(rootPath + "/models");
var path = require("path");
const fileUpload = require(rootPath + "/middleware/file_upload");
const S3 = require(rootPath + "/components/s3upload");
var aws = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
const { fileFilterGen, logErrorOccurred } = require(rootPath +
  "/helpers/general");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const sharp = require("sharp");
const axios = require("axios");
var stream = require("stream");
const probe = require("probe-image-size");
const QRCode = require("qrcode");
const { traceLabelQrcodeValidation } = require(rootPath +
  "/helpers/validation");

const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

router.get("/", auth, async (req, res) => {
  try {
   const { organization, subOrgId } = req.user;

    let labelsRes = await db.TraceabilityLabels.findAll({
      where: {    
        include: [
        {
          attributes: [],
          model: db.user,
          as: "user",
          where:  { 
            organization,
            ...(subOrgId ? {subOrganizationId: subOrgId } : {})
           },
          required: true,
        },
      ], },
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: labelsRes,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post(
  "/qr",
  auth,
  traceLabelQrcodeValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { labelUrl, parchmentId } = req.body;
      let parchment = await db.ParchmentCoffee.findOne({ where : { id: parchmentId }})

      let result = await probe(labelUrl);
      if (result.height > result.width) {
        //vertical label
        const input = (
          await axios({ url: labelUrl, responseType: "arraybuffer" })
        ).data;
        const composite = await QRCode.toBuffer(
          `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${parchment.external_id}`,
          {
            type: "png",
            errorCorrectionLevel: "H",
            height: 150,
            width: 150,
          }
        );

        const output = await sharp(input)
          .composite([{ input: composite, left: 330, top: 630 }])
          .png()
          .toBuffer();

        // Initiate the source
        var bufferStream = new stream.PassThrough();

        // Write your buffer
        bufferStream.end(output);

        // Pipe it to something else  (i.e. stdout)
        bufferStream.pipe(res);
        return;
      } else {
        //horizontal lable
        const input = (
          await axios({ url: labelUrl, responseType: "arraybuffer" })
        ).data;
        const composite = await QRCode.toBuffer(
          `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${parchment.external_id}`,
          {
            type: "png",
            errorCorrectionLevel: "H",
            height: 150,
            width: 150,
          }
        );

        const output = await sharp(input)
          .composite([{ input: composite, left: 150, top: 165 }])
          .png()
          .toBuffer();

        // Initiate the source
        var bufferStream = new stream.PassThrough();

        // Write your buffer
        bufferStream.end(output);

        // Pipe it to something else  (i.e. stdout)
        bufferStream.pipe(res);
        return;
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: labelsRes,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post(
  '/qr',
  auth,
  traceLabelQrcodeValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {

      let {labelUrl,parchmentId } = req.body
      let parchment = await db.ParchmentCoffee.findOne({ where : { id: parchmentId }})

      let result = await probe(labelUrl);
      if(result.height > result.width) { //vertical label
        const input = (await axios({ url: labelUrl, responseType: "arraybuffer" })).data;
        const composite = await QRCode.toBuffer(
          `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${parchment.external_id}`,
           {
            type: 'png',
            errorCorrectionLevel: 'H',
            height: 150,
            width: 150
        });
  
  
        const output = await sharp(input).composite([{ input: composite, left: 330, top: 630 }]).png().toBuffer();
  
        // Initiate the source
        var bufferStream = new stream.PassThrough();
  
        // Write your buffer
        bufferStream.end(output);
  
        // Pipe it to something else  (i.e. stdout)
        bufferStream.pipe(res)
        return
      } else { //horizontal lable
        const input = (await axios({ url: labelUrl, responseType: "arraybuffer" })).data;
        const composite = await QRCode.toBuffer(
          `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${parchment.external_id}`,
          {
            type: 'png',
            errorCorrectionLevel: 'H',
            height: 150,
            width: 150
        });
  
  
        const output = await sharp(input).composite([{ input: composite, left: 150, top: 165 }]).png().toBuffer();
  
        // Initiate the source
        var bufferStream = new stream.PassThrough();
  
        // Write your buffer
        // bufferStream.end(output);

        // // Pipe it to something else  (i.e. stdout)
        // bufferStream.pipe(res)
        // return
        res.setHeader('Content-Type','image/png');

        res.send(output);
      }
      // return res.json(
      //   successRespSync({
      //     msg: success.FETCH,
      //     data: labelsRes
      //   })
      // );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

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

module.exports = router;
