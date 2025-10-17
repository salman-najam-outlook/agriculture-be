const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { serverError, successResp } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const {
  updateReportsStatus,
  formatDatesDataAndGetSignedURL,
} = require('../utils');

// Api for Front end use

/**
 * @swagger
 * /report/pending/reportbyuser:
 *   get:
 *     summary: Get All Pending Reports (user specific) --- ( For Client-side )
 *     description: Returns all pending report
 *     tags: [Report]
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
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"numRows" : 1, "info": [ {"id": 1, "reportType":"NDVI","dateOfInterest":"2022-02-15 06:37:24","zoomLevel": 12, "cropType": "", "userId": 1, "centerLatitude": 12.222, "centerLongitude": 12.222,"sowingDate": {"start": "02/07/2022","end": "02/10/2022"},"harvestingDate": {"start": "02/07/2022","end": "02/10/2022"},"satelliteSource":"Santinel","inputImage":"S3 Path", "geoImagePath":"S3 Path", "shortImagePath":"S3 Path", "reportPDFPath":"S3 Path", "cropTypeName":"S3 Path", "reportS3Key":"S3 Path To Download the Report", "cropVariety": 12, "cropVarietyName":"Name of Crop Variety", "locationName":"Location Name Here", "Segment":"Segment Name Here", "reportName":"reportType + current Date", "status": "PENDING | IN-PROGRESS | COMPLETED", "coordinates":[{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232}]}]}
 *
 */

router.get('/reportbyuser', auth, async (req, res) => {
  try {
    // fetch data from the Reports table
    let repotrsData = await db.satellite_report.findAll({
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ['latitude', 'longitude'],
          as: 'coordinates',
          required: true,
        },
      ],
      where: {
        userId: req.user.id,
        status: 'PENDING',
        reportGroup: 'Satellite Report',
      },
    });

    let response = await formatDatesDataAndGetSignedURL(repotrsData, 'multi');

    // response to the client
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: {
          numRows: response.length,
          data: response,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

// Api's for Python Developer use

/**
 * @swagger
 * /report/pending:
 *   get:
 *     summary: Get All Pending Reports
 *     description: Returns all pending report
 *     tags: [Report]
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
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"numRows" : 1, "info": [ {"id": 1, "reportType":"NDVI","dateOfInterest":"2022-02-15 06:37:24","zoomLevel": 12, "cropType": "", "userId": 1, "centerLatitude": 12.222, "centerLongitude": 12.222,"sowingDate": {"start": "02/07/2022","end": "02/10/2022"},"harvestingDate": {"start": "02/07/2022","end": "02/10/2022"},"satelliteSource":"Santinel","inputImage":"S3 Path", "geoImagePath":"S3 Path", "shortImagePath":"S3 Path", "reportPDFPath":"S3 Path", "cropTypeName":"S3 Path", "reportS3Key":"S3 Path To Download the Report", "cropVariety": 12, "cropVarietyName":"Name of Crop Variety", "locationName":"Location Name Here", "Segment":"Segment Name Here", "reportName":"reportType + current Date", "status": "PENDING | IN-PROGRESS | COMPLETED", "coordinates":[{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232}]}]}
 *
 */

router.get('/', async (req, res) => {
  let reportIds = [];
  try {
    // fetch data from the Reports table
    let repotrsData = await db.satellite_report.findAll({
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ['latitude', 'longitude'],
          as: 'coordinates',
          required: true,
        },
      ],
      where: { status: 'PENDING', reportGroup: 'Satellite Report', },
    });

    if (repotrsData.length > 0) {
      //Formatting Dates
      repotrsData = await formatDatesDataAndGetSignedURL(repotrsData, 'multi');
      // Extracting the report Id's from data
      for (const report of repotrsData) {
        reportIds.push(report.id);
      }

      // //updating the status of reports in bulk
      await updateReportsStatus(reportIds);
    }

    //updating the status of reports in bulk
    await updateReportsStatus(reportIds);

    // response to the client
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: {
          numRows: repotrsData.length,
          data: repotrsData,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /report/pending/{userId}:
 *   get:
 *     summary: Get All Pending Reports (user specific)
 *     description: Returns all pending report
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: Add User Id Here
 *         schema:
 *           type: integer
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
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"numRows" : 1, "info": [ {"id": 1, "reportType":"NDVI","dateOfInterest":"2022-02-15 06:37:24","zoomLevel": 12, "cropType": "", "userId": 1, "centerLatitude": 12.222, "centerLongitude": 12.222,"sowingDate": {"start": "02/07/2022","end": "02/10/2022"},"harvestingDate": {"start": "02/07/2022","end": "02/10/2022"},"satelliteSource":"Santinel","inputImage":"S3 Path", "geoImagePath":"S3 Path", "shortImagePath":"S3 Path", "reportPDFPath":"S3 Path", "cropTypeName":"S3 Path", "reportS3Key":"S3 Path To Download the Report", "cropVariety": 12, "cropVarietyName":"Name of Crop Variety", "locationName":"Location Name Here", "Segment":"Segment Name Here", "reportName":"reportType + current Date", "status": "PENDING | IN-PROGRESS | COMPLETED", "coordinates":[{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232}]}]}
 *
 */

router.get('/:userId', async (req, res) => {
  let { userId } = req.params;
  let reportIds = [];
  try {
    // fetch data from the Reports table
    let repotrsData = await db.satellite_report.findAll({
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ['latitude', 'longitude'],
          as: 'coordinates',
          required: true,
        },
      ],
      where: {
        userId: userId,
        status: 'PENDING',
        reportGroup: 'Satellite Report',
      },
    });

    if (repotrsData.length > 0) {
      //Formatting Dates
      repotrsData = await formatDatesDataAndGetSignedURL(repotrsData, 'multi');
      // Extracting the report Id's from data
      for (const report of repotrsData) {
        reportIds.push(report.id);
      }

      // //updating the status of reports in bulk
      await updateReportsStatus(reportIds);
    }

    // response to the client
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: {
          numRows: repotrsData.length,
          data: repotrsData,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
