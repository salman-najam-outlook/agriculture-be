const express = require('express');
const moment = require('moment');
const _ = require('lodash');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const {
  getLandPreprationReport,
  getSowingReport,
  getSoilManagementReports,
  getIrrigationReport,
  getWeedingReports,
  harvestingReport,
  storageReport,
  pestAndDeseasManagement,
  getGeneralInformation,
} = require('./utils');
const cropReportRec = require(rootPath + '/helpers/validators/cropReportRec');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const translation = require(rootPath + '/middleware/translation');

/**
 * @swagger
 * /report/recommendation/crop-history:
 *   get:
 *     summary: get user's crop history
 *     description: get crop history of user according to the selected module
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: moduleId
 *        schema:
 *         type: string
 *        example: 1
 *      - in: query
 *        name: cropTypeId
 *        schema:
 *         type: string
 *        example: 1
 *      - in: query
 *        name: page
 *        schema:
 *         type: string
 *        example: 1
 *      - in: query
 *        name: pageSize
 *        schema:
 *         type: string
 *        example: 10
 *      - in: query
 *        name: sortBy
 *        schema:
 *         type: string
 *         enum: [asc,desc]
 *        example: asc,
 *      - in: query
 *        name: daysFilter
 *        schema:
 *         type: string
 *         enum: [last31Days,currentMonth,previousMonth,currentQuarter,last12Months]
 *      - in: query
 *        name: startDate
 *        description: format MM/DD/YYYY
 *        schema:
 *         type: string
 *      - in: query
 *        name: endDate
 *        description: format MM/DD/YYYY
 *        schema:
 *         type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "moduleName": "Land Preparation Report", "cropTypeName": "onion", "history": [ { "id": 657, "startDate": "2022-04-07", "endDate": "2022-04-27", "cropId": 100, "createdAt": "2022-04-08T08:31:20.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 348, "startDate": "2022-03-27", "endDate": "2022-03-29", "cropId": 100, "createdAt": "2022-04-05T01:59:33.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 291, "startDate": "2022-08-03", "endDate": "2022-09-03", "cropId": 100, "createdAt": "2022-03-29T00:07:09.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 290, "startDate": "2024-05-02", "endDate": "2024-06-02", "cropId": 100, "createdAt": "2022-03-28T09:52:07.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 287, "startDate": "2024-05-02", "endDate": "2024-07-02", "cropId": 100, "createdAt": "2022-03-28T06:12:33.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 283, "startDate": "2024-02-02", "endDate": "2024-07-02", "cropId": 100, "createdAt": "2022-03-24T12:39:31.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 282, "startDate": "2024-01-02", "endDate": "2024-07-02", "cropId": 100, "createdAt": "2022-03-24T00:34:27.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 281, "startDate": "2024-02-02", "endDate": "2024-04-02", "cropId": 100, "createdAt": "2022-03-24T00:32:29.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 280, "startDate": "2024-02-02", "endDate": "2024-07-02", "cropId": 100, "createdAt": "2022-03-24T00:26:20.000Z", "Option": { "id": 100, "name": "onion" } }, { "id": 279, "startDate": "2024-01-02", "endDate": "2024-07-02", "cropId": 100, "createdAt": "2022-03-24T00:23:54.000Z", "Option": { "id": 100, "name": "onion" } } ] } }
 */
router.get(
  '/',
  auth,
  translation,
  // cropReportRec.cropHistory(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { moduleId, cropTypeId } = req.query;
      const userId = req.user.id;
      let location = req.user.country;
      let {
        page = 1,
        pageSize = 10,
        sortBy,
        daysFilter,
        startDate,
        endDate,
      } = req.query;
      page = parseInt(page);
      pageSize = parseInt(pageSize);

      const { name: moduleName } = await db.CropRecommendationModule.findOne({
        attributes: ['name', 'id'],
        where: { id: moduleId },
        raw: true,
      });
      const { name: cropTypeName } = await db.Option.findOne({
        attributes: ['name', 'id'],
        where: { id: cropTypeId, groupName: 'crop-type' },
        raw: true,
      });

      if (daysFilter) {
        switch (daysFilter) {
          case 'last31Days':
            startDate = moment.utc().subtract(31, 'd').startOf('day');
            endDate = moment.utc().endOf('day');
            break;
          case 'currentMonth':
            startDate = moment().startOf('month').utc().startOf('day');
            endDate = moment().endOf('month').utc().endOf('day');
            break;
          case 'previousMonth':
            startDate = moment().subtract(1, 'month').startOf('month').utc().startOf('day');
            endDate = moment().subtract(1, 'month').endOf('month').utc().endOf('day');
            break;
          case 'currentQuarter':
            startDate = moment()
              .quarter(moment().quarter())
              .startOf('quarter')
              .utc().startOf('day');
            endDate = moment()
              .quarter(moment().quarter())
              .endOf('quarter')
              .utc().endOf('day');
            break;
          case 'last12Months':
            startDate = moment().subtract(12, 'month').utc().startOf('day');
            endDate = moment().utc().endOf('day');
            break;
          default:
            break;
        }
      }

      const params = {
        userId,
        ...(startDate
          ? { startDate: moment.utc(startDate, process.env.ACCEPT_DATE_FORMAT).startOf('day') }
          : null),
        ...(endDate
          ? { endDate: moment.utc(endDate, process.env.ACCEPT_DATE_FORMAT).endOf('day') }
          : null),
        sortBy,
        page,
        pageSize,
        cropTypeId,
      };

      switch (moduleName) {
        case 'Land Preparation Report':
          history = await getLandPreprationReport(params);
          break;
        case 'Sowing/Planting Report':
          history = await getSowingReport(params);
          break;
        case 'Soil Management Report':
          history = await getSoilManagementReports(params);
          break;
        case 'Irrigation Report':
          history = await getIrrigationReport(params);
          break;
        case 'Weeding Report':
          history = await getWeedingReports(params);
          break;
        case 'Harvesting Report':
          history = await harvestingReport(params);
          break;
        case 'Storage Report':
          history = await storageReport(params);
          break;
        default:
          history = [];
          break;
      }

      if (req.headers.lang && req.headers.lang != "en") {
        location = req.translateFunction(
          {name: location},
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
          }
        );
        location = location?.name
      }

      let resData = { location, moduleName, cropTypeName, history }

      if (req.headers.lang && req.headers.lang != 'en') {
        resData = req.translateFunction(resData, globalTranslationCache, {
          lvl1: true,
          lvl2: true
  
        })
  
      }
  

      return res.json(
        await successRespSync({
          msg: success.FETCH,
          data: resData
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
