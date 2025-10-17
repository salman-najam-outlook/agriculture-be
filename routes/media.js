const { Router } = require('express');
const auth = require('../middleware/auth');
const { checkSchema } = require('express-validator');
const validation_error_handler = require('../middleware/validation_error_handler');
const s3 = require('../components/s3');
const { successRespSync, serverError } = require('../helpers/api');
const { success } = require('../helpers/language');
const { logErrorOccurred } = require('../helpers/general');

const router = Router();

/**
 * @swagger
 * /media/presigned-url:
 *   post:
 *     summary: Get a presigned URL for uploading a file to S3
 *     tags:
 *       - Media
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 example: "example.jpg"
 *               mimeType:
 *                 type: string
 *                 example: "image/jpeg"
 *               isPublic:
 *                 type: boolean
 *                 example: true
 *               directory:
 *                 type: string
 *                 example: "esg"
 *     responses:
 *       200:
 *         description: Presigned URL generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Fetch successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: "https://example-bucket.s3.amazonaws.com/example.jpg?AWSAccessKeyId=..."
 *                     key:
 *                       type: string
 */
router.post(
  '/presigned-url',
  auth,
  checkSchema({
    filename: {
      isString: true,
      trim: true,
      notEmpty: true,
    },
    mimeType: {
      isString: true,
      trim: true,
      notEmpty: true,
    },
    isPublic: {
      isBoolean: true,
      notEmpty: true,
    },
    directory: {
      isString: true,
      trim: true,
      optional: true,
    },
  }),
  validation_error_handler,
  async (req, res) => {
    try {
      const { filename, mimeType, isPublic, directory } = req.body;
      const data = await s3.getPresignedURLForUpload(filename, mimeType, isPublic, directory);
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


/**
 * @swagger
 * /media/url:
 *   post:
 *     summary: Get a URL for downloading a file from S3
 *     tags:
 *       - Media
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: URL generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Fetch successful"
 *                 data:
 *                   type: string
 *                   example: "https://example-bucket.s3.amazonaws.com/example.jpg?AWSAccessKeyId=..."
 */
router.post(
  '/url',
  auth,
  checkSchema({
    key: {
      isString: true,
      trim: true,
      notEmpty: true,
    },
    isPublic: {
      isBoolean: true,
      notEmpty: true,
    },
  }),
  validation_error_handler,
  async (req, res) => {
    try {
      const { key, isPublic } = req.body;
      const url = await s3.getObjectURL(key, isPublic);
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: url,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
