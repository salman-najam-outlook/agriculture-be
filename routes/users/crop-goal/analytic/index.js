const express = require('express');
const _ = require('lodash');
// const arraystat = require('arraystat');
// const { checkCropGoalAnalyticsValidation } = require(rootPath +
//   '/helpers/validation');
const router = express.Router();
const fs = require('fs');
const moment = require('moment');
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

const path = require('path');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');

/**
 * @swagger
 * /user/crop-goal/analytic:
 *   get:
 *     summary: Get crop goals analytics report
 *     description: Get crop goals analytics report.
 *     tags: [User Crop Goals Analytics]
 *     parameters:
 *          - in: query
 *            name: cropTypeId
 *            type: integer
 *            required: true
 *            description: Crop type ID to get analystics
 *          - in: query
 *            name: primaryGoalId
 *            type: integer
 *            required: true
 *            description: Primary goal ID
 *          - in: query
 *            name: seasonView
 *            type: integer
 *            required: true
 *            description: Season view number
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
 *                          {
 *                            "success": true,
 *                             "code": 200,
 *                             "message": "Fetched successfully.",
 *                             "data": {
 *                                 "stats": {
 *                                     "min": 33,
 *                                     "max": 44,
 *                                     "mean": 38.5,
 *                                     "median": 38.5
 *                                 },
 *                                 "seasons": [
 *                                     {
 *                                         "seasonName": "Season 12",
 *                                         "seasonStartDate": "2022-02-02",
 *                                         "seasonEndDate": "2022-02-02",
 *                                         "outcome": {
 *                                             "finalValue": 44,
 *                                             "previousValue": 33,
 *                                             "difference": 11
 *                                         }
 *                                     },
 *                                     {
 *                                         "seasonName": "Season 11",
 *                                         "seasonStartDate": "2022-02-02",
 *                                         "seasonEndDate": "2022-02-02",
 *                                         "outcome": {
 *                                             "finalValue": 33,
 *                                             "previousValue": 22,
 *                                             "difference": 11
 *                                         }
 *                                     },
 *                                ]
 *                             }
 *                         }
 */

// router.get(
//   '/',
//   checkCropGoalAnalyticsValidation(),
//   auth,
//   validationErrorHandler,
//   async (req, res) => {
//     try {
//       const { primaryGoalId, cropTypeId, seasonView = 2 } = req.query;
//       const { id: userId } = req.user;
//       const primaryGoal = await db.Option.findOne({
//         where: { id: primaryGoalId, groupName: 'PrimaryCropGoals' },
//       });
//       if (_.isEmpty(primaryGoal))
//         throw new Error('Invalid primary goal type id');
//       let cropOutcomeAttr = [['yieldHarvested', 'finalValue']];
//       let cropGoalAttr = [['harvestedYieldTarget', 'targetValue']];
//       switch (primaryGoal.name) {
//         case 'Increasing The Yields':
//           cropOutcomeAttr = [['yieldHarvested', 'finalValue']];
//           cropGoalAttr = [['harvestedYieldTarget', 'targetValue']];
//           break;
//         case 'Maximize Income':
//           cropOutcomeAttr = [['marketValue', 'finalValue']];
//           cropGoalAttr = [['incomeTarget', 'targetValue']];
//           break;
//         case 'Optimize The Use Of Synthetic Fertilizers':
//           cropOutcomeAttr = [['syntheticFertilizerUsed', 'finalValue']];
//           cropGoalAttr = [['syntheticFertilizerUsageTarget', 'targetValue']];
//           break;
//       }

//       const seasons = await db.UserCropGoalSeason.findAll({
//         attributes: ['seasonName', 'seasonStartDate', 'seasonEndDate'],
//         include: [
//           {
//             required: true,
//             attributes: cropGoalAttr,
//             model: db.UserCropGoal,
//             as: 'cropGoals',
//           },
//           {
//             required: true,
//             attributes: [],
//             model: db.UserCropGoalFarm,
//             as: 'farm',
//             where: { cropTypeId },
//           },
//           {
//             required: true,
//             attributes: cropOutcomeAttr,
//             model: db.UserCropGoalOutcome,
//             as: 'outcome',
//           },
//           {
//             required: true,
//             attributes: ['id', 'name'],
//             model: db.Option,
//             as: 'cropGoalType',
//             where: { id: primaryGoalId },
//             attributes: [],
//           },
//         ],
//         order: [
//           ['seasonStartDate', 'desc'],
//           ['seasonName', 'desc'],
//         ],
//         where: { userId },
//       });

//       let response = { seasons };
//       let i = 0;
//       response.seasons = response.seasons.map((obj) => {
//         let previousValue = 'N/A';
//         if (i < response.seasons.length - 1) {
//           previousValue = response.seasons[i + 1].outcome.dataValues.finalValue;
//         }
//         obj.outcome.dataValues.previousValue = previousValue;
//         obj.outcome.dataValues.difference =
//           typeof previousValue == 'number'
//             ? obj.outcome.dataValues.finalValue -
//               obj.outcome.dataValues.previousValue
//             : 'N/A';
//         i++;
//         return obj;
//       });
//       if (seasonView > 1) {
//         const data = await seasons
//           ?.slice(0, parseInt(seasonView))
//           ?.map((row) => {
//             row.outcome.previousValue =
//               row?.outcome?.getDataValue('finalValue');
//             return row?.outcome?.getDataValue('finalValue');
//           });
//         const { min, max, avg: mean, median } = arraystat(data);
//         response = {
//           stats: { min, max, mean, median },
//           ...response,
//         };
//       }

//       return res.json(
//         successRespSync({
//           msg: success.FETCH,
//           data: response,
//         })
//       );
//     } catch (err) {
//       logErrorOccurred(__filename, err);
//       return serverError(res, err);
//     }
//   }
// );

/**
 * @swagger
 * /user/crop-goal/analytic/pdf-report:
 *   get:
 *     summary: download general crop goal analytical information report
 *     description: download general crop goal analytical information report by crop type and primary goal
 *     tags: [User Crop Goals]
 *     parameters:
 *      - in: query
 *        name: cropTypeId
 *        schema:
 *         type: string
 *      - in: query
 *        name: primaryGoalId
 *        schema:
 *         type: string
 *     responses:
 *        '200':
 *           description: file will be downloaded automatically
 *           content:
 *             application/octet-stream:
 *               schema:
 *                type: string
 *                format: binary
 */
router.get('/pdf-report', auth, validationErrorHandler, async (req, res) => {
  try {
    const { primaryGoalId, cropTypeId, seasonView } = req.query;
    const { id: userId } = req.user;
    const primaryGoal = await db.Option.findOne({
      where: { id: primaryGoalId, groupName: 'PrimaryCropGoals' },
    });
    if (_.isEmpty(primaryGoal)) throw new Error('Invalid primary goal type id');
    let cropOutcomeAttr = [['yieldHarvested', 'finalValue']];
    let cropGoalAttr = [['harvestedYieldTarget', 'targetValue']];
    switch (primaryGoal.name) {
      case 'Increasing The Yields':
        cropOutcomeAttr = [['yieldHarvested', 'finalValue']];
        cropGoalAttr = [['harvestedYieldTarget', 'targetValue']];
        break;
      case 'Maximize Income':
        cropOutcomeAttr = [['marketValue', 'finalValue']];
        cropGoalAttr = [['incomeTarget', 'targetValue']];
        break;
      case 'Optimize The Use Of Synthetic Fertilizers':
        cropOutcomeAttr = [['syntheticFertilizerUsed', 'finalValue']];
        cropGoalAttr = [['syntheticFertilizerUsageTarget', 'targetValue']];
        break;
    }

    const seasons = await db.UserCropGoalSeason.findAll({
      attributes: ['seasonName', 'seasonStartDate', 'seasonEndDate'],

      include: [
        {
          required: true,
          attributes: cropGoalAttr,
          model: db.UserCropGoal,
          as: 'cropGoals',
          include: [
            {
              required: true,
              attributes: ['firstName', 'lastName','middleName'],
              model: db.user,
              as: 'user',
            },
          ],
        },
        {
          required: true,
          attributes: [
            'cropTypeId',
            [db.Sequelize.literal('`farm->crop_type`.`name`'), 'cropType'],
          ],
          model: db.UserCropGoalFarm,
          as: 'farm',
          where: { cropTypeId },
          include: [{ attributes: [], model: db.Option, as: 'crop_type' }],
        },
        {
          required: true,
          attributes: cropOutcomeAttr,
          model: db.UserCropGoalOutcome,
          as: 'outcome',
        },
        {
          required: true,
          attributes: ['id', 'name'],
          model: db.Option,
          as: 'cropGoalType',
          where: { id: primaryGoalId },
          attributes: [],
        },
      ],
      order: [
        ['seasonStartDate', 'desc'],
        ['seasonName', 'desc'],
      ],
      where: { userId },
    });

    if (_.isEmpty(seasons)) throw new Error('No data found');

    let response = { seasons };
    let i = 0;
    response.seasons = response.seasons.map((obj) => {
      let previousValue = 'N/A';
      if (i < response.seasons.length - 1) {
        previousValue = response.seasons[i + 1].outcome.dataValues.finalValue;
      }
      obj.outcome.dataValues.previousValue = previousValue;
      obj.outcome.dataValues.difference =
        typeof previousValue == 'number'
          ? obj.outcome.dataValues.finalValue -
            obj.outcome.dataValues.previousValue
          : 'N/A';
      i++;
      return obj;
    });

    response.seasons = await Promise.all(
      response.seasons?.map(async (row) => {
        return row.toJSON();
      })
    );

    const data = {
      title: 'Farmer Crop Goal Report',
      subHeader: {
        user_name: _.isEmpty(response.seasons[0]?.cropGoals.user.firstName)
          ? '---'
          : _.isEmpty(response.seasons[0]?.cropGoals.user.lastName)
          ? response.seasons[0]?.cropGoals.user.firstName
          : response.seasons[0]?.cropGoals.user.firstName +
            ' ' +
            response.seasons[0]?.cropGoals.user.lastName,
        crop_type: response.seasons[0]?.farm.cropType,
        goal: primaryGoal.name,
        date: moment().format(process.env.ACCEPT_DATE_FORMAT),
      },
      tableData: response.seasons?.map(
        ({
          seasonName: season,
          seasonStartDate: starting_date,
          seasonEndDate: ending_date,
          outcome,
        }) => {
          const { finalValue: final_value, difference } = outcome;
          return {
            season,
            starting_date,
            ending_date,
            final_value,
            difference,
          };
        }
      ),
    };

    const template = fs.readFileSync(
      path.resolve(rootPath, 'views/crop-goal-analytic/template/index.html'),
      'utf8'
    );

    let html = await ejs.render(template, { data });

    let fileName = Date.now() + '.pdf';
    fileName = fileName.replace(/\//g, '-');
    const fileDestination = path.resolve(
      rootPath,
      `views/crop-goal-analytic/reports/${fileName}`
    );
    const options = {
      path: fileDestination,
      printBackground: true,
    };
    let file = { content: html };
    await html_to_pdf.generatePdf(file, options);

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + fileName,
    });
    return fs.createReadStream(fileDestination).pipe(res);
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
