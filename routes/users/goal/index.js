const express = require('express');
const moment = require('moment');
const router = express.Router();
const { Op } = require('sequelize');
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { logErrorOccurred, notEmpty, isObject } = require(rootPath +
  '/helpers/general');
const { error, success } = require(rootPath + '/helpers/language');
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  '/helpers/api');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const { isArray, difference } = require('lodash');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId')
/**
 * @swagger
 * /user/goal:
 *   post:
 *     summary: Create goal
 *     description: Create goal on certain segments
 *     tags: [Goals]
 *     requestBody:
 *       description: Goal details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geofenceIds:
 *                 type: array
 *               items:
 *                  type: integer
 *               farmIds:
 *                 type: array
 *                 items:
 *                  type: integer
 *               goalName:
 *                 type: string
 *               goalTarget:
 *                 type: enum('livestock','crop')
 *               cropTypeOptId:
 *                 type: integer
 *               cropIds:
 *                 type: integer
 *               sowingDate:
 *                 type: object
 *                 properties:
 *                  start:
 *                    type: date
 *                  end:
 *                    type: date
 *               note:
 *                 type: string
 *               cropHistory:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   harvestedOn:
 *                     type: object
 *                     properties:
 *                       start:
 *                         type: date
 *                       end:
 *                         type: date
 *                   farmingArea:
 *                     type: float
 *                   yieldHarvested:
 *                     type: float
 *               harvestingDate:
 *                 type: object
 *                 properties:
 *                  start:
 *                    type: date
 *                  end:
 *                    type: date
 *               expectedYield:
 *                 type: float
 *               recordId:
 *                 type: string
 *           example: { "geofenceIds": [ 2, 9 ], "farmIds": [ 1 ], "goalName": "this goals is after the testing 118", "goalTarget": "crop", "cropTypeOptId": 1, "cropId": 1, "sowingDate": { "start": "02/01/2021", "end": "02/01/2021" }, "note": "done alot of work", "cropHistory": [ { "harvestedOn": { "start": "02/01/2021" }, "farmingArea": 2, "yieldHarvested": 23 }, { "harvestedOn": { "start": "02/01/2021" }, "farmingArea": 2, "yieldHarvested": 23 } ], "harvestingDate": { "start": "02/01/2021", "end": "02/01/2021" }, "expectedYield": 100, "recordId": "2222222222222222222" }
 *     responses:
 *       200:
 *         description: Returns the Goal JSON
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('UserGoal'),
  validate.goal_post(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const ACCEPT_FORMAT = process.env.ACCEPT_DATE_FORMAT;
      const userId = req.user.id;

      let {
        farmIds,
        geofenceIds,
        goalName,
        goalTarget,
        cropTypeOptId,
        cropIds,
        // soilTypeId,
        // soilPhId,
        sowingDate,
        note,
        cropHistory,
        harvestingDate,
        recordId,
        expectedYield,
      } = req.body;

      // check if the sowingDate variable is empty or not
      if (isObject(sowingDate)) {
        sowingDate = {
          ...sowingDate,
          start: notEmpty(sowingDate.start)
            ? moment.utc(sowingDate.start, ACCEPT_FORMAT)
            : undefined,
          end: notEmpty(sowingDate.end)
            ? moment.utc(sowingDate.end, ACCEPT_FORMAT)
            : undefined,
        };
        // stringify obj
        sowingDate = JSON.stringify(sowingDate);
      }
      if (isObject(harvestingDate)) {
        harvestingDate = {
          start: notEmpty(harvestingDate.start)
            ? moment.utc(harvestingDate.start, ACCEPT_FORMAT)
            : undefined,
          end: notEmpty(harvestingDate.end)
            ? moment.utc(harvestingDate.end, ACCEPT_FORMAT)
            : undefined,
        };
        harvestingDate = JSON.stringify(harvestingDate);
      }
      if (cropIds && !isArray(cropIds)) {
        return res.status(error.code.SERVER_ERROR).json(
          errorRespSync({
            msg: 'cropIds should be an array!',
          })
        );
      }
      if (farmIds && !isArray(farmIds)) {
        return res.status(error.code.SERVER_ERROR).json(
          errorRespSync({
            msg: 'farmIds should be an array!',
          })
        );
      }
      if (geofenceIds && !isArray(geofenceIds)) {
        return res.status(error.code.SERVER_ERROR).json(
          errorRespSync({
            msg: 'geofenceIds should be an array!',
          })
        );
      }
      // generate data to be inserted
      let set = {
        userId,
        goalName,
        goalTarget,
        cropTypeOptId,
        //cropId,
        // soilTypeId,
        // soilPhId,
        sowingDate,
        note,
        harvestingDate,
        recordId,
        expectedYield,
      };
      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });

      // start transactions
      const transaction = await db.sequelize.transaction();
      try {
        // insert into user goal table
        const goal = await db.UserGoal.create(set, { transaction });

        if (cropIds && cropIds.length) {
          let varieties = [];
          cropIds.forEach(function (cropId) {
            varieties.push({
              cropId,
              userGoalId: goal.id,
            });
          });
          await db.MapUserGoalsCrop.bulkCreate(varieties, { transaction });
        }

        if (geofenceIds && geofenceIds.length) {
          let segmentData = [];
          geofenceIds.forEach(function (geofenceId) {
            segmentData.push({
              geofenceId,
              GeofenceId: geofenceId,
              userGoalId: goal.id,
            });
          });
          await db.MapUserGoalGeofences.bulkCreate(segmentData, {
            transaction,
          });
        }

        if (farmIds && farmIds.length) {
          let farmData = [];
          farmIds.forEach(function (userFarmId) {
            farmData.push({
              userFarmId,
              userGoalId: goal.id,
            });
          });
          await db.MapUserGoalFarms.bulkCreate(farmData, { transaction });
        }

        // insert into user crop history table if crophistory is sent by user
        if (notEmpty(cropHistory)) {
          let cropHistoryData = cropHistory.map((element) => {
            let { harvestedOn, farmingArea, yieldHarvested } = element;

            // convert date into UTC JS ACCEPT_FORMAT
            harvestedOn = {
              ...harvestedOn,
              start: notEmpty(harvestedOn.start)
                ? moment.utc(harvestedOn.start, ACCEPT_FORMAT)
                : undefined,
              end: notEmpty(harvestedOn.end)
                ? moment.utc(harvestedOn.end, ACCEPT_FORMAT)
                : undefined,
            };

            // set data to be inserted
            let set = {
              goalId: goal.id,
              userId,
              harvestedOn: JSON.stringify(harvestedOn),
              farmingArea,
              yieldHarvested,
            };

            // remove undefined values before inserting
            Object.keys(set).forEach((key) => {
              set[key] == undefined || set[key] == null ? delete set[key] : {};
            });
            return set;
          });

          // return res.json(cropHistoryData);
          // insert into user crop history table
          await db.UserCropsHistory.bulkCreate(cropHistoryData, {
            transaction,
          });
        }

        await transaction.commit();

        // response to the client
        return res.json(
          successRespSync({
            msg: success.GOAL_ADDED,
            data: goal,
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /user/goal:
 *   put:
 *     summary: Update goal
 *     description: Update goal on certain segments
 *     tags: [Goals]
 *     requestBody:
 *       description: Goal details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               geofenceIds:
 *                 type: array
 *                 items:
 *                  type: integer
 *               farmIds:
 *                 type: array
 *                 items:
 *                  type: integer
 *               goalName:
 *                 type: string
 *               goalTarget:
 *                 type: enum('livestock','crop')
 *               cropTypeOptId:
 *                 type: integer
 *               cropIds:
 *                 type: integer
 *               sowingDate:
 *                 type: object
 *                 properties:
 *                  start:
 *                    type: date
 *                  end:
 *                    type: date
 *               note:
 *                 type: string
 *               cropHistory:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   harvestedOn:
 *                     type: object
 *                     properties:
 *                       start:
 *                         type: date
 *                       end:
 *                         type: date
 *                   farmingArea:
 *                     type: float
 *                   yieldHarvested:
 *                     type: float
 *               harvestingDate:
 *                 type: object
 *                 properties:
 *                  start:
 *                    type: date
 *                  end:
 *                    type: date
 *               expectedYield:
 *                 type: float
 *               recordId:
 *                 type: string
 *           example: { "id":"161", "geofenceIds": [ 2, 9 ], "farmIds": [ 1 ], "goalName": "this goals is after the testing 118", "goalTarget": "crop", "cropTypeOptId": 1, "cropId": 1, "sowingDate": { "start": "02/01/2021", "end": "02/01/2021" }, "note": "done alot of work", "cropHistory": [ { "harvestedOn": { "start": "02/01/2021" }, "farmingArea": 2, "yieldHarvested": 23 }, { "harvestedOn": { "start": "02/01/2021" }, "farmingArea": 2, "yieldHarvested": 23 } ], "harvestingDate": { "start": "02/01/2021", "end": "02/01/2021" }, "expectedYield": 100, "recordId": "2222222222222222222" }
 *     responses:
 *       200:
 *         description: Returns the Goal JSON
 *       500:
 *         description: Server error
 */
router.put(
  '/',
  auth,
  validate.goal_put(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const ACCEPT_FORMAT = process.env.ACCEPT_DATE_FORMAT;
      const userId = req.user.id;

      let {
        farmIds,
        geofenceIds,
        goalName,
        goalTarget,
        cropTypeOptId,
        cropIds,
        soilTypeId,
        soilPhId,
        sowingDate,
        note,
        id,
        harvestingDate,
        recordId,
        expectedYield,
      } = req.body;
      if (cropIds && !isArray(cropIds)) {
        return res.status(error.code.SERVER_ERROR).json(
          errorRespSync({
            msg: 'cropIds should be an array!',
          })
        );
      }

      if (farmIds && !isArray(farmIds)) {
        return res.status(error.code.SERVER_ERROR).json(
          errorRespSync({
            msg: 'farmIds should be an array!',
          })
        );
      }
      if (geofenceIds && !isArray(geofenceIds)) {
        return res.status(error.code.SERVER_ERROR).json(
          errorRespSync({
            msg: 'geofenceIds should be an array!',
          })
        );
      }

      // check if the sowingDate variable is empty or not
      if (isObject(sowingDate)) {
        // for setting sowing date value in DB
        sowingDate = {
          ...sowingDate,
          start: notEmpty(sowingDate.start)
            ? moment.utc(sowingDate.start, ACCEPT_FORMAT)
            : undefined,
          end: notEmpty(sowingDate.end)
            ? moment.utc(sowingDate.end, ACCEPT_FORMAT)
            : undefined,
        };
        // stringify obj
        sowingDate = JSON.stringify(sowingDate);
      }

      if (harvestingDate) {
        harvestingDate = {
          ...harvestingDate,
          start: notEmpty(harvestingDate.start)
            ? moment.utc(harvestingDate.start, ACCEPT_FORMAT)
            : undefined,
          end: notEmpty(harvestingDate.end)
            ? moment.utc(harvestingDate.end, ACCEPT_FORMAT)
            : undefined,
        };
        // stringify obj
        harvestingDate = JSON.stringify(harvestingDate);
      }

      // generate data to be inserted
      let set = {};
      if (userId) set.userId = userId;
      if (goalName) set.goalName = goalName;
      if (goalTarget) set.goalTarget = goalTarget;
      if (cropTypeOptId) set.cropTypeOptId = cropTypeOptId;
      //if(cropId) set.cropId = cropId;
      if (soilTypeId) set.soilTypeId = soilTypeId;
      if (soilPhId) set.soilPhId = soilPhId;
      if (sowingDate) set.sowingDate = sowingDate;
      if (note) set.note = note;
      if (harvestingDate) set.harvestingDate = harvestingDate;
      if (expectedYield) set.expectedYield = expectedYield;
      else set.expectedYield = null;
      if (recordId) set.recordId = recordId;

      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] === undefined ? delete set[key] : {};
      });

      // start transaction
      const transaction = await db.sequelize.transaction();

      try {
        // load helper controller
        const helper = require(rootPath + '/helpers/controller');
        if(!cropIds || (Array.isArray(cropIds) && cropIds.length ==0)) {
          let oldData = await db.MapUserGoalsCrop.findAll({
            where: {
              userGoalId: id,
            },
          });
          oldVarieties = oldData.map((crop) => crop.cropId);
          await db.MapUserGoalsCrop.destroy({
            where: {
              userGoalId: id,
              cropId: {
                [Op.in]: oldVarieties,
              },
            },
            transaction: transaction,
          })
        }

        // update user goal with the goal id
        await db.UserGoal.update(set, {
          where: { userId, id },
          transaction,
        });

        let allData = db.UserGoal.findOne({
          where: {
            id,
            userId,
          },
          include: [
            {
              model: db.Crop,
              as: 'cropVariety',
              attributes: ['id', 'name'],
            },
            db.user_farm,
            {
              model: db.Geofence,
              as: 'segments',
              include: [
                {
                  as: 'farm',
                  model: db.user_farm,
                },
              ],
            },
          ],
        });

        if (!allData) throw new Error('No user goal found with the id ' + id);

        if (farmIds) {
          let oldFarmIds = [];
          if (allData.user_farms && allData.user_farms.length)
            oldFarmIds = allData.user_farms.map((farm) => farm.id);

          let destroy = difference(oldFarmIds, farmIds);
          let create = difference(farmIds, oldFarmIds);
          if (destroy && destroy.length) {
            await db.MapUserGoalFarms.destroy({
              where: {
                userGoalId: id,
                userFarmId: {
                  [Op.in]: destroy,
                },
              },
              transaction: transaction,
            });
          }

          if (create && create.length) {
            let farmData = create.map(function (userFarmId) {
              return { userFarmId, userGoalId: id };
            });
            await db.MapUserGoalFarms.bulkCreate(farmData, { transaction });
          }
        }

        if (geofenceIds) {
          let oldGeofenceIds = [];
          if (allData.segments && allData.segments.length)
            oldGeofenceIds = allData.segments.map((segment) => segment.id);

          let destroy = difference(oldGeofenceIds, geofenceIds);
          let create = difference(geofenceIds, oldGeofenceIds);

          if (destroy && destroy.length) {
            await db.MapUserGoalGeofences.destroy({
              where: {
                userGoalId: id,
                geofenceId: {
                  [Op.in]: destroy,
                },
              },
              transaction: transaction,
            });
          }

          if (create && create.length) {
            let segmentData = create.map(function (geofenceId) {
              return { geofenceId, GeofenceId: geofenceId, userGoalId: id };
            });
            await db.MapUserGoalGeofences.bulkCreate(segmentData, {
              transaction,
            });
          }
        }

        if (cropIds && cropIds.length) {
          let oldData = await db.MapUserGoalsCrop.findAll({
            where: {
              userGoalId: id,
            },
          });
          let oldVarieties = [];
          if (oldData && oldData.length)
            oldVarieties = oldData.map((crop) => crop.cropId);
          let destroy = difference(oldVarieties, cropIds);
          let create = difference(cropIds, oldVarieties);
          if (destroy && destroy.length) {
            await db.MapUserGoalsCrop.destroy({
              where: {
                userGoalId: id,
                cropId: {
                  [Op.in]: destroy,
                },
              },
              transaction: transaction,
            });
          }

          if (create && create.length) {
            let varietyData = create.map(function (cropId) {
              return { cropId, userGoalId: id };
            });
            await db.MapUserGoalsCrop.bulkCreate(varietyData, { transaction });
          }
        }

        // update crop history
        await helper.updateCropHistory(req, transaction);

        // commit transaction
        await transaction.commit();

        // get the updated goals data
        const goalDetails = await helper.getGoalDetails(req, {
          cropHistory: true,
        });

        // response to the client
        return res.json(
          successRespSync({
            msg: success.GOAL_UPDATED,
            data: goalDetails,
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /user/goal:
 *   get:
 *     summary: Get goal list
 *     description: Get the list of goals
 *     tags: [Goals]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Number of records you want to fetch
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: goal name
 *     responses:
 *       200:
 *         description: Returns the list of goals
 *         content:
 *           application/json:
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "num_rows": 9, "info": [ { "id": 161, "goalType": "crop", "goalName": "this goals is after the testing 116", "note": "done alot of work", "sowingDate": { "start": "02/01/2021", "end": "02/01/2021" }, "harvestingDate": { "start": "02/01/2021", "end": "02/01/2021" }, "recordId": "1.1111111111111112e16", "expectedYield": 100, "createdAt": "04/27/2022 5:17 pm", "user_farms": [ { "id": 1, "farmName": "corbett farm", "MapUserGoalFarms": { "userGoalId": 161, "userFarmId": 1, "createdAt": "2022-04-27T11:36:31.000Z", "updatedAt": "2022-04-27T11:36:31.000Z" } } ], "segments": [ { "id": 2, "geofenceName": "Rice Segment", "farm": { "id": 1, "userId": 17, "address": "Nainital, Ramnagar, Uttarakhand", "district": 0, "farmingGoalOptId": 1, "zipCode": "", "farmName": "corbett farm", "registrationNo": "23423492343899883", "ownerName": "", "communityName": "", "lat": 30.0222, "log": 31.0222, "farmingActivity": "", "farmOwnershipType": "community", "parameter": 123, "area": 125.3, "isPrimaryFarm": false, "isDeleted": false, "createdAt": "2021-10-05T09:27:20.000Z", "updatedAt": "2022-04-15T11:52:48.000Z" }, "MapUserGoalGeofences": { "userGoalId": 161, "geoFenceId": 2, "createdAt": "2022-04-27T11:36:31.000Z", "updatedAt": "2022-04-27T11:36:31.000Z", "GeofenceId": 2 } } ], "soilPH": null, "cropVariety": [], "cropType": null, "cropHistory": [ { "id": 431, "harvestedOn": { "start": "02/01/2021", "end": null }, "farmingArea": "2", "yieldHarvested": "23", "configuration": [ { "name": "area", "unit": { "id": 5, "name": "acre", "abbreviation": "acre" } }, { "name": "yield", "unit": { "id": 9, "name": "Kg per acre", "abbreviation": "Kg/acre" } } ] } ] } ] } }
 *       500:
 *         description: Server error
 */
router.get(
  '/',
  auth,
  translation,
  validate.userGoalGet(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let { page, limit, name } = req.query;
      limit = parseInt(limit);
      let where = { userId, deletedAt: null };

      if (notEmpty(name)) {
        where.goalName = {
          [Op.like]: '%' + name + '%',
        };
      }

      let query = {
        include: [
          {
            model: db.user_farm,
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'segments',
            attributes: ['id', 'geofenceName'],
            include: [
              {
                model: db.user_farm,
                as: 'farm',
              },
            ],
          },
          {
            model: db.Soil_PH,
            as: 'soilPH',
            attributes: ['id', 'type'],
          },
          {
            model: db.Crop,
            as: 'cropVariety',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'cropType',
            attributes: ['id', 'name'],
          },
          {
            include: [
              {
                attributes: ['unit_subCategory_id'],
                model: db.UnitConfiguration,
                as: 'configuration',
                required: false,
                where: {
                  unit_subCategory_id: [3, 8],
                },
                include: [
                  {
                    model: db.Unit,
                    attributes: [['field', 'name']],
                    as: 'subCategory',
                  },
                  {
                    model: db.Unit,
                    attributes: ['id', ['field', 'name'], 'abbreviation'],
                    as: 'unit',
                  },
                ],
              },
            ],
            model: db.UserCropsHistory,
            as: 'cropHistory',
            attributes: ['id', 'harvestedOn', 'farmingArea', 'yieldHarvested'],
          },
        ],
        attributes: [
          'id',
          ['goalTarget', 'goalType'],
          'goalName',
          'note',
          'sowingDate',
          'harvestingDate',
          'recordId',
          'expectedYield',
          'createdAt',
        ],
        offset: (page - 1) * limit,
        limit: limit,
        where,
        order: [['createdAt', 'DESC']],
      };

      // run fetch query
      let result = await db.UserGoal.findAll(query);

      // sowingDate = {
      //   ...sowingDate,
      //   start: notEmpty(sowingDate.start)
      //     ? moment.utc(sowingDate.start, ACCEPT_FORMAT)
      //     : undefined,
      //   end: notEmpty(sowingDate.end)
      //     ? moment.utc(sowingDate.end, ACCEPT_FORMAT)
      //     : undefined,
      // };

      // format DB date into client date
      const response = [];
      const DISPLAY_DATE_FORMAT = process.env.DISPLAY_DATE_FORMAT;
      const DISPLAY_DATETIME_FORMAT = process.env.DISPLAY_DATETIME_FORMAT;

      // loop the result array
      for (let element of result) {
        element = await element.toJSON();

        // format swoing date
        try {
          const sowing_date = JSON.parse(element.sowingDate);
          const { start, end } = sowing_date;
          // update sowing date variable
          element.sowingDate = {
            ...sowing_date,
            start: notEmpty(start)
              ? moment(start).format(DISPLAY_DATE_FORMAT)
              : null,
            end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
          };
        } catch (err) {}

        try {
          const harvestingDate = JSON.parse(element.harvestingDate);
          const { start, end } = harvestingDate;
          // update sowing date variable
          element.harvestingDate = {
            ...harvestingDate,
            start: notEmpty(start)
              ? moment(start).format(DISPLAY_DATE_FORMAT)
              : null,
            end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
          };
        } catch (err) {}

        // format created date
        element.createdAt = moment(element.createdAt).format(
          DISPLAY_DATETIME_FORMAT
        );

        // check if cropHistory array is not empty
        if (notEmpty(element.cropHistory)) {
          // restructure crophistory array
          let cropHistory = element.cropHistory.map((el) => {
            let { harvestedOn, configuration } = el;

            // format harvested date
            try {
              const harvested_on = JSON.parse(harvestedOn);
              const { start, end } = harvested_on;
              // update sowing date variable
              el.harvestedOn = {
                ...harvested_on,
                start: notEmpty(start)
                  ? moment(start).format(DISPLAY_DATE_FORMAT)
                  : null,
                end: notEmpty(end)
                  ? moment(end).format(DISPLAY_DATE_FORMAT)
                  : null,
              };
            } catch (err) {}

            // reformat configuration Array
            configuration = configuration?.map((config) => {
              return { name: config.subCategory?.name, unit: config.unit };
            });
            return { ...el, configuration };
          });
          element.cropHistory = cropHistory;
        }
        response.push(element);
      }

      // response to the client
      result = {
        num_rows: response.length,
        data: response,
      };

      if (req.headers.lang && req.headers.lang != 'en') {
        result.data = req.translateFunction(
          result.data,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
            moduleName: 'user/goal',
          }
        );
      }
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc for deleting user goals
 */
/**
 * @swagger
 * /user/goal:
 *   delete:
 *     summary: For deleting user goals.
 *     description: For deleting user goals.
 *     tags: [Goals]
 *     requestBody:
 *       description: For deleting user goals.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              { "id": 23 }
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
 *                 example: { "success": true, "code": 200, "message": "goal has been deleted successfully.", "data": {} }
 */

router.delete(
  '/',
  auth,
  validate.goal_delete(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.body;

      // set deleted at date
      const set = { deletedAt: moment().utc() };

      // execute delete query
      const [deleted] = await db.UserGoal.update(set, {
        where: { userId, id },
      });

      // response to the client
      return res.json(
        successRespSync({
          msg: success.GOAL_DELETED,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
