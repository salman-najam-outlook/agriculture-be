const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validatorProduction = require(rootPath +
  '/helpers/validators/productionAnalysis');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId');
const moment = require('moment');
const { isEmpty } = require('lodash');

/**
 * @swagger
 * /coffee/buying-station/production/target:
 *   post:
 *     description: save production target for a year
 *     tags: [Coffee Buying Station Production]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                targetVal:
 *                  type: float
 *                year:
 *                  type: integer
 *                recordId:
 *                  type: string
 *            example: { "targetVal": 2000, "year": 2025, "recordId": "" }
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
 *                 example: { "success": true, "code": 200, "message": "Inserted successfully.", "data": { "production": { "id": 10, "buyingStationId": 17, "targetVal": "5002", "year": "2026", "recordId": "", "updatedAt": "2022-07-01T12:13:30.261Z", "createdAt": "2022-07-01T12:13:30.261Z" } } }
 *
 */
router.post(
  '/target',
  auth,
  duplicateRecordId.handleDuplicateRecordId('BuyingStationOrder'),
  validatorProduction.addProductionTarget(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      const { targetVal, year, recordId } = req.body;

      const set = { buyingStationId, targetVal, year, recordId };

      const production = await db.BuyingStationProduction.create(set);

      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: production ,
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
 * /coffee/buying-station/production/target:
 *   get:
 *     description: list saved production targets for year
 *     tags: [Coffee Buying Station Production]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *        example:
 *          10
 *      - in: query
 *        name: col
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: order
 *        schema:
 *          type: string
 *          enum: ['desc','asc']
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "productionTarget": { "totalRows": 4, "numRows": 4, "rows": [ { "id": 8, "buyingStationId": 17, "targetVal": 2000, "year": 2025, "recordId": "", "createdAt": "2022-07-01T07:19:32.000Z" }, { "id": 6, "buyingStationId": 17, "targetVal": 2000, "year": 2024, "recordId": "", "createdAt": "2022-06-30T11:17:15.000Z" }, { "id": 4, "buyingStationId": 17, "targetVal": 5666, "year": 2023, "recordId": "", "createdAt": "2022-06-30T10:54:02.000Z" }, { "id": 2, "buyingStationId": 17, "targetVal": 5666, "year": 2022, "recordId": "", "createdAt": "2022-06-30T10:53:45.000Z" } ] } } }
 */
router.get(
  '/target',
  auth,
  validatorProduction.list(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      let { page = 1, limit = 1000, col = 'id', order = 'desc' } = req.query;
      limit = parseInt(limit);

      let where = { buyingStationId };

      let { count: totalRows, rows } =
        await db.BuyingStationProduction.findAndCountAll({
          where,
          offset: (page - 1) * limit,
          limit: limit,
          order: [[col, order]],
          distinct: true,
          attributes: { exclude: ['updatedAt', 'isdeleted'] },
        });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            productionTarget: { totalRows, numRows: rows?.length ?? 0, rows },
          },
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
 * /coffee/buying-station/production/target/{id}:
 *   put:
 *     description: Update Production Target For Buying Station
 *     tags: [Coffee Buying Station Production]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: path
 *        name: id
 *        description: Target id
 *        schema:
 *          type: integer
 *     requestBody:
 *       description: Request body for Updating Target
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                targetVal:
 *                  type: float
 *              required:
 *                - targetVal
 *            example:
 *              {
 *                "targetVal": 2000
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
 *                   message: Target updated successfully.
 *
 */

 router.put('/target/:id', auth, validatorProduction.editProductionTarget(), validationErrorHandler, async (req, res) => {
  try {  
      const buyingStationId = req.user.id, currentYear = moment().format("YYYY");;
      let id = req.params.id;
      let { targetVal } = req.body;

      // Check If target Already set for this year
      const targetRecord = await db.BuyingStationProduction.findOne({
          where: {
          id, buyingStationId
          }
      })
      
      if(isEmpty(targetRecord)){
          return res.json(
              errorRespSync({
                  code: error.code.NOT_FOUND,
                  msg: error.TARGET_NOT_FOUND,
              })
          );
      }
      if(targetRecord.year < currentYear){
      return res.status(error.code.SERVER_ERROR).json(
          errorRespSync({
              msg: "You cannot Edit Target from Past"
          })
      )
      }
      
      let set = {targetVal};

      const transaction = await db.sequelize.transaction();
      try {
          // Updating the Target
          await db.BuyingStationProduction.update(set, {
              where: {
                  id
              }
          }, { transaction });

          await transaction.commit();
          return res.json(
              successRespSync({
              msg: success.TARGET_UPDATED
              })
          )
      } catch (err) {
          await transaction.rollback()
          logErrorOccurred(__filename, err);
          return serverError(res, err);
      }
  } catch (err) {
   logErrorOccurred(__filename, err);
   return serverError(res, err);
  }
})

/**
 * @swagger
 * /coffee/buying-station/production/analysis:
 *   get:
 *     description: list anual production analysis data
 *     tags: [Coffee Buying Station Production]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *        example:
 *          10
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
 *               example: { "success": true, "code": 200, "message": "Inserted successfully.", "data": { "anualAnalysis": { "numRows": 4, "rows": [ { "target": 2000, "final": 0, "year": 2025, "variable": -2000 }, { "target": 2000, "final": 0, "year": 2024, "variable": -2000 }, { "target": 5666, "final": 0, "year": 2023, "variable": -5666 }, { "target": 5666, "final": 12554, "year": 2022, "variable": 1222 } ] } } }
 */
router.get(
  '/analysis',
  auth,
  validatorProduction.list(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      let { page = 1, limit = 1000 } = req.query;
      limit = parseInt(limit);
      const offset = (page - 1) * limit;

      const sql =
        "SELECT COALESCE(MAX(bsp.targetVal), 0) target,SUM(COALESCE(bspb.parchmentOut, 0 )) final, bsp.year ,(SUM(COALESCE(bspb.parchmentOut, 0 )) - SUM(COALESCE(bsp.targetVal, 0 ))) variable FROM BuyingStationProductions bsp LEFT JOIN BuyingStationProcessingBatches bspb on bsp.year=DATE_FORMAT(bspb.createdAt, '%Y') where bsp.buyingStationId=:buyingStationId GROUP BY bsp.year order by bsp.year desc limit :limit offset :offset";

      const rows = await db.sequelize.query(sql, {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: { buyingStationId, offset, limit },
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { anualAnalysis: { numRows: rows?.length ?? 0, rows } },
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
 * /coffee/buying-station/production/chart:
 *   get:
 *     description: get production details of specific month or year
 *     tags: [Coffee Buying Station Production]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *          enum: ['month','year']
 *      - in: query
 *        name: val
 *        schema:
 *          type: string
 *        description: for year pass year like 2022 for month pass month like 2022-06
 *        example:
 *          2020-06
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "chartData": { "target": 5666, "final": 12554, "year": 2022, "variable": 1222 } } }
 */
router.get(
  '/chart',
  auth,
  validatorProduction.chart(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      let { type, val } = req.query;
      const replacements = { buyingStationId };

      let sql = `SELECT COALESCE(MAX(bsp.targetVal), 0) target,SUM(COALESCE(bspb.parchmentOut, 0 )) final, bsp.year ,(SUM(COALESCE(bspb.parchmentOut, 0 )) - SUM(COALESCE(bsp.targetVal, 0 ))) variable FROM BuyingStationProductions bsp LEFT JOIN BuyingStationProcessingBatches bspb on bsp.year=DATE_FORMAT(bspb.createdAt, '%Y') where bsp.buyingStationId=:buyingStationId`;

      switch (type) {
        case 'year':
          sql += ` and bsp.year=:year`;
          replacements.year = val;
          break;
        case 'month':
          sql += ` and DATE_FORMAT(bspb.createdAt, '%Y-%m')=:month`;
          replacements.month = val;
          break;
      }

      sql += ` GROUP BY bsp.year`;

      const chartData = await db.sequelize.query(sql, {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements,
        plain: true,
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { chartData },
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
 * /coffee/buying-station/production/offline:
 *   get:
 *     description: Get Buying Station Production Offline Data
 *     tags: [Coffee Buying Station Production]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
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
 */
 router.get(
  '/offline',
  auth,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      let productionChartData = [];
       // Getting targeted Value set by dry milling
       const targetData = await db.BuyingStationProduction.findAll({
        where: {
          buyingStationId
        },
        attributes: ['targetVal','year'],
        raw: true,
        order: [['year', 'desc']]
      })
    console.log(targetData);
    // Getting final Score of dry milling at stage of grean beans
    const buyingStationParchmentOut = await db.BuyingStationProcessingBatch.findAll({
        where: {
            buyingStationId,
            isdeleted: null,
            endDate : {
              [db.Sequelize.Op.lt]: moment
              .utc()
              .format(process.env.DB_ONLYDATE_FORMAT)
            } 
        },
        attributes: [
            [ db.Sequelize.fn('date_format', db.Sequelize.col('endDate'), '%Y'), 'year'],
            [ db.Sequelize.fn('date_format', db.Sequelize.col('endDate'), '%c'), 'month'],
            [ db.Sequelize.fn('sum', db.Sequelize.col('parchmentOut')), 'final'],
        ],
        group: ['year', 'month'],
        raw: true
    })
    
    console.log(buyingStationParchmentOut);
    for (const data of targetData) {
      let finalScoreSum = 0;
      let monthsDataArray = [];
      for (const innerData of buyingStationParchmentOut) {
          if(innerData.year == data.year){
              finalScoreSum += innerData.final;
              monthsDataArray.push({
                  targetedValue: data.targetVal/12,
                  finalScore: innerData.final,
                  month: innerData.month
              })
          }
      }
      let finalData = {year: data.year, targetedValue: data.targetVal, finalScore: finalScoreSum, monthsData: monthsDataArray};
      productionChartData.push(finalData);
    } 

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: productionChartData
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
