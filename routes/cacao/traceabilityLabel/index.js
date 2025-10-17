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
const sharp = require("sharp")
const axios = require("axios")
var stream = require('stream');
const probe = require('probe-image-size');
const QRCode = require('qrcode');
const {
  cacaoTraceLabelQrcodeValidation
} = require(rootPath + "/helpers/validation");

const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");



router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      let org_id = req.user.organization;

      let labelsRes = await db.CacaoTraceabilityLabels.findAll({
        where: { organization_id: org_id },
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: labelsRes
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
  cacaoTraceLabelQrcodeValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { labelUrl, dryProcessId } = req.body
      let dryProcess = await db.CacaoDryingProcess.findOne({ where: { id: dryProcessId }})
      let result = await probe(labelUrl);
      if (result.height > result.width) { //vertical label
        const input = (await axios({ url: labelUrl, responseType: "arraybuffer" })).data;
        const qrFinalLabel = `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${dryProcess.external_traceability_id}`
        const composite = await QRCode.toBuffer(`${qrFinalLabel}`, {
          type: 'png',
          errorCorrectionLevel: 'H',
          height: 150,
          width: 150
        });
        const svgBufferString = `
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <text x="2" y="10" font-size="10" fill="#423B3B">dimitra.io/ct</text>
          </svg>
          `
        const svgBuffer =  Buffer.from(svgBufferString)
        const bff = await sharp(svgBuffer)
        .withMetadata()
        .rotate(-90)
        .toBuffer()

        const output = await sharp(input).withMetadata().composite([
          { input: composite, left: 330, top: 630 },
          {input: bff, left:200, top:645}
        ]).png().toBuffer();
     
        // var bufferStream = new stream.PassThrough();
        // // Write your buffer
        // bufferStream.end(output);
        // // Pipe it to something else  (i.e. stdout)
    
        // bufferStream.pipe(res)

        res.setHeader('Content-Type','image/png');

        res.send(output);

        // return
      } else { //horizontal lable
        const input = (await axios({ url: labelUrl, responseType: "arraybuffer" })).data;
        const composite = await QRCode.toBuffer(`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${dryProcess.external_traceability_id}`, {
          type: 'png',
          errorCorrectionLevel: 'H',
          height: 150,
          width: 150
        });

        const svgBufferString = `
            <svg xmlns="http://www.w3.org/2000/svg" width="233" height="40" version="1.1">
            <rect x="0" y="0" width="100%" height="100%" fill="#cfcece"/>
            <text x="2" y="10" font-size="12" fill="red">https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability</text>
            <text x="1" y="22" font-size="12" fill="red">?id=${dryProcess.external_traceability_id}</text>
            </svg>
          `
        const svgBuffer =  Buffer.from(svgBufferString)
        const bff = await sharp(svgBuffer)
        .withMetadata()
        .toBuffer()
         
        const output = await sharp(input).composite([
          { input: composite, left: 150, top: 165 },
          {input: bff, left:291, top:380}
        ]).png().toBuffer();
        // Initiate the source
        // var bufferStream = new stream.PassThrough();

        // // Write your buffer
        // bufferStream.end(output);

        // // Pipe it to something else  (i.e. stdout)
       
        // bufferStream.pipe(res)

        res.setHeader('Content-Type','image/png');

        res.send(output);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
