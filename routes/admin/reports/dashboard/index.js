const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, removeEmptyValuesFromObject } = require(rootPath +
  '/helpers/general');

const {
  regionInfo,
  farmerInfo,
  farmInfo,
  cropInfo,
  allFarmCoordinates,
} = require('../utils');

/**
 * @swagger
 * /admin/reports/dashboard:
 *   get:
 *     summary: update organization logo
 *     description: update organization logo
 *     tags: [Admin Reports]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *     requestBody:
 *       description: upload csv to import user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { "base64Logo": "data:image/png;base64" }
 *             properties:
 *               base64Logo:
 *                type: string
 *     responses:
 *       200:
 *         description: show success message
 *         content:
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
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "saved successfully.", "data": { "logo": "https://dimitra-public-images.s3.amazonaws.com/org/81kSGrroRRJ7nWBRKRaN2z" } }
 *       500:
 *         description: Server error
 *         content:
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
 *               example: { "success": false, "code": 500, "message": "Internal Error" }
 */
router.get(
  '/',
  auth,
  // organizationValidator.logoUpdate(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      const farmCoordinates = await allFarmCoordinates(req);

      const [regions, farmers, farms, crops] = await Promise.all([
        regionInfo(req, true),
        farmerInfo(req, true),
        farmInfo(req, true),
        cropInfo(req, true),
      ]);

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            farmCoordinates,
            regions,
            farmers,
            farms,
            crops,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
