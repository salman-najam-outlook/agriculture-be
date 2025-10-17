const express = require('express');
const router = express.Router();
const _ = require('lodash');
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const moment = require('moment');
const { RRule } = require('rrule');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred, removeEmptyValuesFromObject } = require(rootPath +
  '/helpers/general');
const reportSetting = require(rootPath + '/helpers/validators/reportSetting');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const { langObj } = require(rootPath + "/helpers/consts");

/**
 * @swagger
 * /settings/report:
 *   put:
 *     description: save user report settings
 *     tags: [Report Settings]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            example: { "enableOfflineReport": "1", "downloadingPreference": "with data", "scheduleType": "custom", "custom": "specific days in a week", "customWeeks": [ "mon" ], "customInterval": "weekly", "customPeriodQty": "", "customPeriodUom": "", "customStartDate": "", "cropReports": [ 39, 38 ] }
 *            schema:
 *              type: object
 *              required: [enableOfflineReport, downloadingPreference, scheduleType, cropReports]
 *              properties:
 *                enableOfflineReport:
 *                    type: string
 *                    enum: [0,1]
 *                    required: true
 *                downloadingPreference:
 *                    type: string
 *                    enum: [cellular data, with data, both]
 *                scheduleType:
 *                    type: string
 *                    enum: [when automatically connected, daily, weekly, bi-weekly, monthly, custom]
 *                custom:
 *                    type: string
 *                    enum: [specific days in a week, after a specific number of days, after a specific number of weeks, after a specific number of months]
 *                customInterval:
 *                    type: string
 *                    enum: [weekly, once every 2 weeks, once every 3 weeks, once every 1 month, once every 2 months, once every 3 months, once every 6 months]
 *                customPeriodQty:
 *                    type: string
 *                customPeriodUom:
 *                    type: string
 *                    enum: [days, weeks, months]
 *                customStartDate:
 *                    type: string
 *                customWeeks:
 *                    type: string
 *                    enum: [mon, tue, wed, thu, fri, sat, sun]
 *                cropReports:
 *                    type: array
 *                    items:
 *                        type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: { "success": true, "code": 200, "message": "Updated successfully.", "data": { "enableOfflineReport": true, "downloadingPreference": "with data", "scheduleType": "custom", "custom": "specific days in a week", "customWeeks": [ "mon" ], "customInterval": "weekly", "customPeriodQty": null, "customPeriodUom": null, "customStartDate": null, "cropReports": [ { "cropReportId": 39 }, { "cropReportId": 38 } ] } }
 *
 *
 */
router.put(
  '/',
  auth,
  reportSetting.save(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let userId = req.user.id;
      const {
        enableOfflineReport,
        downloadingPreference,
        scheduleType,
        custom,
        customWeeks,
        customInterval,
        customPeriodQty,
        customPeriodUom,
        customStartDate,
        cropReports,
      } = req.body;

      const setReportSetting = {
        userId,
        enableOfflineReport,
        downloadingPreference,
        scheduleType,
        custom,
        customWeeks,
        customInterval,
        customPeriodQty,
        customPeriodUom,
        customStartDate,
      };
      removeEmptyValuesFromObject(setReportSetting);

      var transaction = await db.sequelize.transaction();

      await db.ReportSettingMap.destroy({
        where: { userId },
        transaction,
        force: true,
      });
      await db.ReportSetting.destroy({
        where: { userId },
        transaction,
        force: true,
      });
      await db.ReportSetting.create(setReportSetting, {
        transaction,
      });

      const setReportSettingMap = cropReports.map((cropReportId) => ({
        cropReportId,
        reportType: 'crop',
        userId,
      }));
      if(setReportSettingMap) {
        await db.ReportSettingMap.bulkCreate(setReportSettingMap, {
          transaction,
        });
      }

      await transaction.commit();

      // const savedReportSettings = [];
      const savedReportSettings = await getUserReportSettings({ userId });

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: savedReportSettings,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /settings/report:
 *   get:
 *     description: Fetch user report settings
 *     tags: [Report Settings]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: { "success": true, "code": 200, "message": "Updated successfully.", "data": { "enableOfflineReport": true, "downloadingPreference": "with data", "scheduleType": "custom", "custom": "specific days in a week", "customWeeks": [ "mon" ], "customInterval": "weekly", "customPeriodQty": null, "customPeriodUom": null, "customStartDate": null, "cropReports": [ { "cropReportId": 39 }, { "cropReportId": 38 } ] } }
 *
 */
router.get('/', auth, validationErrorHandler, async (req, res) => {
  try {
    const userId = req.user.id;
    const where = { userId };

    const result = await getUserReportSettings(where);

    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /settings/report/download:
 *   get:
 *     description: download crop reports only if current date lies in schedules report download timing of user.
 *     tags: [Report Settings]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                       success:
 *                         type: boolean
 *                       code:
 *                         type: integer
 *                       message:
 *                         type: string
 *                       data:
 *                         type: array
 *                         items:
 *                          type: object
 *                          properties:
 *                           name:
 *                             type: string
 *                           location:
 *                             type: string
 *                   example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "name": "Cardamon", "location": "https://dimitra-public-images.s3.amazonaws.com/282d7223-e5d3-464e-b963-acaa659c09fc.1659592054426.pdf" }, { "name": "Olives", "location": "https://dimitra-public-images.s3.amazonaws.com/beecf3c6-a23e-4ced-94fb-eb8d35b38cd4.1659592053122.pdf" } ] }
 *                 - type: object
 *                   properties:
 *                       success:
 *                         type: boolean
 *                       code:
 *                         type: integer
 *                       message:
 *                         type: string
 *                       data:
 *                         type: array
 *                         items:
 *                   example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [] }
 *
 */
router.get('/download', auth, validationErrorHandler, async (req, res) => {
  try {
    const userId = req.user.id;

    const userSetting = await getUserReportSettings({ userId }, [
      {
        required: false,
        model: db.ComprehensnsiveAnalysisReport,
        as: 'reports',
        attributes: ['name', langObj[req.headers.lang]],
        through: {
          attributes: [],
          where: { reportType: 'crop' },
        },
      },
    ]);
    // check if current date is schedules for downloading report by user
    let status, data = []
    if(userSetting) {
       status = isCurrentDateScheduled(userSetting);
       data = [];
      if (status) data = userSetting.reports;
    } else {

      return res.json(
        successRespSync({
          msg: error.SETTINGS_DOESNT_EXIST,
          data,
        })
      )
  
    }

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
});

// check if the current date is schduled by the user for downloading reports
function isCurrentDateScheduled(userSetting) {
  const weeks = {
    mon: RRule.MO,
    tue: RRule.TU,
    wed: RRule.WE,
    thu: RRule.TH,
    fri: RRule.FR,
    sat: RRule.SA,
    sun: RRule.SU,
  };

  let rules = {};
  switch (true) {
    case userSetting.scheduleType == 'when automatically connected':
      // return 'when automatically connected';
      rules = {
        freq: RRule.DAILY,
        interval: 1,
      };
      break;
    case userSetting.scheduleType == 'daily':
      // return 'daily';
      rules = {
        freq: RRule.DAILY,
        interval: 1,
      };
      break;
    case userSetting.scheduleType == 'weekly':
      // return 'weekly';
      rules = {
        freq: RRule.WEEKLY,
        interval: 1,
        dtstart: moment.utc().startOf('date').toDate(),
      };
      break;
    case userSetting.scheduleType == 'bi-weekly':
      // return 'bi-weekly';
      rules = {
        freq: RRule.WEEKLY,
        interval: 2,
        dtstart: moment.utc().startOf('date').toDate(),
      };
      break;
    case userSetting.scheduleType == 'monthly':
      // return 'monthly';
      rules = {
        freq: RRule.MONTHLY,
        interval: 1,
        dtstart: moment.utc().startOf('date').toDate(),
      };
      break;
    case userSetting.scheduleType == 'custom' &&
      userSetting.custom == 'specific days in a week':
      // return 'specific days in a week';
      rules = {
        freq: RRule.WEEKLY,
        interval: 1,
        byweekday: userSetting.customWeeks?.map((weekday) => weeks[weekday]),
      };
      break;
    case userSetting.scheduleType == 'custom' &&
      userSetting.custom == 'after a specific number of days':
      // return 'after a specific number of days';
      rules = {
        freq: RRule.DAILY,
        dtstart: moment
          .utc(userSetting.customStartDate, 'YYYY-MM-DD')
          .startOf('date')
          .toDate(),
        interval: userSetting.customPeriodQty,
      };
      break;
    case userSetting.scheduleType == 'custom' &&
      userSetting.custom == 'after a specific number of weeks':
      // return 'after a specific number of weeks';
      rules = {
        freq: RRule.WEEKLY,
        dtstart: moment
          .utc(userSetting.customStartDate, 'YYYY-MM-DD')
          .startOf('date')
          .toDate(),
        interval: userSetting.customPeriodQty,
      };
      break;
    case userSetting.scheduleType == 'custom' &&
      userSetting.custom == 'after a specific number of months':
      // return 'after a specific number of months';
      rules = {
        freq: RRule.MONTHLY,
        dtstart: moment
          .utc(userSetting.customStartDate, 'YYYY-MM-DD')
          .startOf('date')
          .toDate(),
        interval: userSetting.customPeriodQty,
      };
      break;
  }

  const occurrences = new RRule(rules);
  const status = occurrences.between(
    moment.utc().startOf('date').toDate(),
    moment.utc().endOf('date').toDate()
  );

  if (status.length > 0) return true;
  return false;
}

// get user report settings
async function getUserReportSettings(where, include = null) {
  if (include == null) {
    include = [
      {
        required: false,
        model: db.ReportSettingMap,
        as: 'cropReports',
        attributes: ['cropReportId'],
      },
    ];
  }

  const reportSetting = await db.ReportSetting.findOne({
    where,
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'recordId', 'isdeleted', 'userId'],
    },
    include,
  });
  return await reportSetting?.toJSON();
}

module.exports = router;
