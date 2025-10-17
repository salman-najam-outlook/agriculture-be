const express = require('express');
const _ = require('lodash');
const { Op, DATE } = require('sequelize');
const { now } = require('lodash');
// const TrustedComms = require('twilio/lib/rest/preview/TrustedComms');
// const { deleteCropGoalValidation } = require('../../../helpers/validators/cropGoal');
const {
  getCropGoalValidation,
  deleteCropGoalValidation,
  addCropGoalValidation,
  updateCropGoalValidation,
} = require(rootPath + '/helpers/validators/cropGoal');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { logErrorOccurred, removeEmptyValuesFromObject } = require(rootPath +
  '/helpers/general');
const { success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
// validations
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

router.use('/season', require('./season'));
router.use('/final-value', require('./final-value'));
router.use('/analytic', require('./analytic'));
router.use('/crops', require('./crops'));

const includeAssociations = [
  {
    model: db.user_farm,
    through: { model: db.UserCropGoalFarmMap },
  },
  {
    model: db.Geofence,
    through: { model: db.UserCropGoalGeofenceMap },
  },
  {
    model: db.UserCropGoalSeason,
    as: 'cropGoalSeason',
    attributes: [
      'id',
      'seasonName',
      'seasonStartDate',
      'seasonEndDate',
    ],
    required: true,
    include: [
      {
        model: db.Crop,
        attributes: ['id', 'name'],
        as: 'cropVarieties',
        through: {
          attributes: [],
        },
        required: false,
      },
      {
        model: db.UserCropGoalOutcome,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'userId',
            'userCropGoalSeasonId',
          ],
        },
        as: 'outcome',
        required: true,
      },
      {
        model: db.Option,
        as: 'cropGoalType',
        attributes: ['id', 'name', 'optionCode'],
        through: { attributes: [] },
        required: true,
      },
      {
        model: db.UserCropGoalFarm,
        as: 'farm',
        attributes: [
          'farmId',
          'zoneId',
          'cropTypeId',
          'farmSize',
          'farmSizeUom',
          [
            db.Sequelize.literal(
              '`cropGoalSeason->farm->userFarm`.`farmName`'
            ),
            'farmName',
          ],
          [
            db.Sequelize.literal(
              '`cropGoalSeason->farm->userFarmZone`.`geofenceName`'
            ),
            'zoneName',
          ],
          [
            db.Sequelize.literal(
              '`cropGoalSeason->farm->crop_type`.`name`'
            ),
            'cropType',
          ],
        ],
        required: true,
        include: [
          {
            model: db.user_farm,
            as: 'userFarm',
            attributes: [],
          },
          {
            model: db.Geofence,
            as: 'userFarmZone',
            attributes: [],
          },
          {
            model: db.Option,
            as: 'crop_type',
            attributes: [],
          },
        ],
      },
      {
        model: db.UserCropGoalSeason,
        as: 'prevCropHistory',
        attributes: [
          'id',
          'seasonName',
          'seasonStartDate',
          'seasonEndDate',
        ],
        through: { attributes: [] },
        include: [
          {
            model: db.UserCropGoalOutcome,
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'userId',
                'userCropGoalSeasonId',
              ],
            },
            as: 'outcome',
            required: true,
          },
          {
            model: db.Option,
            as: 'cropGoalType',
            attributes: ['id', 'name', 'optionCode'],
            through: { attributes: [] },
            required: true,
          },
        ],
      },
    ],
  },
]

/**
 * @swagger
 * /user/crop-goal:
 *   post:
 *     summary: post user crop goals
 *     description: post user crop goals.
 *     tags: [User Crop Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *              example: { "recordId": "11111333235555555", "seasonName": "season 420", "seasonStartDate": "2022-12-22", "seasonEndDate": "2023-04-31", "farmId": "683", "zoneId": "256", "farmSize": 122, "farmSizeUom": { "id": 1, "name": "Acre" }, "cropTypeId": 336, "cropVarieties": [ "47" ], "note": "some  note", "harvestedYieldTarget": "111", "harvestedYieldTargetUom": { "id": "", "name": "kg" }, "incomeTarget": "111", "incomeTargetUom": { "id": "", "name": "USD" }, "syntheticFertilizerUsageTarget": "111", "syntheticFertilizerUsageTargetUom": { "id": "", "name": "kg" }, "cropGoalType": [ 893, 894, 895 ], "prevCropHistory": [ { "userCropGoalSeasonId": 93, "yieldHarvested": 222, "yieldHarvestedUom": { "id": "", "name": "sfsdf" }, "marketValue": 12, "marketValueUom": { "id": "", "name": "sfsdf" }, "syntheticFertilizerUsed": 111, "syntheticFertilizerUsedUom": { "id": "", "name": "sfsdf" }, "cropGoalType": [ 893, 894, 895 ] } ] }
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
 *                 example: {
 *                       "success": true,
 *                       "code": 200,
 *                       "message": "Saved successfully.",
 *                       "data": {}
 *                    }
 *
 *
 */
router.post(
  '/',
  auth,
  addCropGoalValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const {
        note,
        harvestedYieldTarget,
        harvestedYieldTargetUom,
        incomeTarget,
        incomeTargetUom,
        syntheticFertilizerUsageTarget,
        syntheticFertilizerUsageTargetUom,
        seasonName,
        seasonStartDate,
        seasonEndDate,
        cropGoalType,
        prevCropHistory,
        recordId,
      } = req.body;

      var transaction = await db.sequelize.transaction();

      // create season
      const setSeason = {
        userId,
        seasonName,
        seasonStartDate,
        seasonEndDate,
        recordId,
      };
      removeEmptyValuesFromObject(setSeason);
      const season = await db.UserCropGoalSeason.create(setSeason, {
        transaction,
      });
      // save user crop goal
      const setCropGoal = {
        userId,
        note,
        harvestedYieldTarget,
        harvestedYieldTargetUom,
        incomeTarget,
        incomeTargetUom,
        syntheticFertilizerUsageTarget,
        syntheticFertilizerUsageTargetUom,
        seasonId: season.id,
        recordId,
      };
      removeEmptyValuesFromObject(setCropGoal);
      const postCropGoal = await db.UserCropGoal.create(setCropGoal, {
        transaction,
      });

      // save crop goal data
      await saveCropGoalData({
        transaction,
        req,
        seasonId: season.id,
        cropGoalType,
        setUserCropGoalOutcome: { userId, userCropGoalSeasonId: season.id },
        seasonHistoryMap: null,
        userCropGoalId: postCropGoal.id,
      });

      // saving historic data
      if (!_.isEmpty(prevCropHistory)) {
        await Promise.all(
          prevCropHistory?.map(
            ({
              userCropGoalSeasonId,
              yieldHarvested,
              yieldHarvestedUom,
              marketValue,
              marketValueUom,
              syntheticFertilizerUsed,
              syntheticFertilizerUsedUom,
              cropGoalType,
            }) => {

              // save data
              return saveCropGoalData({
                transaction,
                req,
                seasonId: userCropGoalSeasonId === -1 ? season.id : userCropGoalSeasonId ,
                cropGoalType,
                setUserCropGoalOutcome: {
                  userId,
                  userCropGoalSeasonId: userCropGoalSeasonId === -1 ? season.id : userCropGoalSeasonId,
                  yieldHarvested,
                  yieldHarvestedUom,
                  marketValue,
                  marketValueUom,
                  syntheticFertilizerUsed,
                  syntheticFertilizerUsedUom,
                },
                seasonHistoryMap: {
                  seasonId: userCropGoalSeasonId,
                  parentSeasonId: season.id,
                },
                userCropGoalId: postCropGoal.id,
              });
            }
          )
        );
      }

      await transaction?.commit();

      const cropGoalData = await db.UserCropGoal.findOne({
        where: { id: postCropGoal.id },
        attributes: {
          exclude: [ 'userId', 'seasonId'],
        },
        include: includeAssociations,
      });

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: cropGoalData,
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
 * /user/crop-goal:
 *   put:
 *     summary: update user crop goals
 *     description: update user crop goals.
 *     tags: [User Crop Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *              example: { "id": 54, "recordId": "11111333235555555", "seasonName": "season 420", "seasonStartDate": "2022-12-22", "seasonEndDate": "2023-04-31", "farmId": "683", "zoneId": "256", "farmSize": 122, "farmSizeUom": { "id": 1, "name": "Acre" }, "cropTypeId": 336, "cropVarieties": [ "47" ], "note": "some  note", "harvestedYieldTarget": "111", "harvestedYieldTargetUom": { "id": "", "name": "kg" }, "incomeTarget": "111", "incomeTargetUom": { "id": "", "name": "USD" }, "syntheticFertilizerUsageTarget": "111", "syntheticFertilizerUsageTargetUom": { "id": "", "name": "kg" }, "cropGoalType": [ 893, 894, 895 ], "prevCropHistory": [ { "userCropGoalSeasonId": 93, "yieldHarvested": 222, "yieldHarvestedUom": { "id": "", "name": "sfsdf" }, "marketValue": 12, "marketValueUom": { "id": "", "name": "sfsdf" }, "syntheticFertilizerUsed": 111, "syntheticFertilizerUsedUom": { "id": "", "name": "sfsdf" }, "cropGoalType": [ 893, 894, 895 ] } ] }
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
 *                 example: {
 *                       "success": true,
 *                       "code": 200,
 *                       "message": "saved successfully.",
 *                       "data": {}
 *                    }
 *
 *
 */
router.put(
  '/',
  auth,
  updateCropGoalValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const {
        id,
        note,
        harvestedYieldTarget,
        harvestedYieldTargetUom,
        incomeTarget,
        incomeTargetUom,
        syntheticFertilizerUsageTarget,
        syntheticFertilizerUsageTargetUom,
        seasonName,
        seasonStartDate,
        seasonEndDate,
        cropGoalType,
        prevCropHistory,
        recordId,
      } = req.body;

      const cropGoal = await db.UserCropGoal.findOne({ where: { id } });
      if (cropGoal === null) throw new Error("Goal doesn't exist");

      var transaction = await db.sequelize.transaction();

      // update season details
      const setSeason = {
        userId,
        seasonName,
        seasonStartDate,
        seasonEndDate,
        recordId,
      };
      removeEmptyValuesFromObject(setSeason);
      const season = await db.UserCropGoalSeason.update(setSeason, {
        where: { id: cropGoal.seasonId },
        transaction,
      });

      // save user crop goal
      const setCropGoal = {
        userId,
        note,
        harvestedYieldTarget,
        harvestedYieldTargetUom,
        incomeTarget,
        incomeTargetUom,
        syntheticFertilizerUsageTarget,
        syntheticFertilizerUsageTargetUom,
        seasonId: season.id,
        recordId,
      };
      removeEmptyValuesFromObject(setCropGoal);
      await cropGoal.set(setCropGoal).save({ transaction });

      // delete old data
      await destroyCropGoalData({
        transaction,
        seasonId: cropGoal.seasonId,
        cropGoal
      });

      // re-insert updated data
      // save crop goal data
      await saveCropGoalData({
        transaction,
        req,
        seasonId: cropGoal.seasonId,
        cropGoalType,
        setUserCropGoalOutcome: {
          userId,
          userCropGoalSeasonId: cropGoal.seasonId,
        },
        userCropGoalId: cropGoal.id
      });

      // saving historic data
      if (!_.isEmpty(prevCropHistory)) {
        await Promise.all(
          prevCropHistory?.map(
            ({
              userCropGoalSeasonId,
              yieldHarvested,
              yieldHarvestedUom,
              marketValue,
              marketValueUom,
              syntheticFertilizerUsed,
              syntheticFertilizerUsedUom,
              cropGoalType,
            }) => {
              // save data
              return saveCropGoalData({
                transaction,
                req,
                seasonId: userCropGoalSeasonId,
                cropGoalType,
                setUserCropGoalOutcome: {
                  userId,
                  userCropGoalSeasonId,
                  yieldHarvested,
                  yieldHarvestedUom,
                  marketValue,
                  marketValueUom,
                  syntheticFertilizerUsed,
                  syntheticFertilizerUsedUom,
                },
                seasonHistoryMap: {
                  seasonId: userCropGoalSeasonId,
                  parentSeasonId: cropGoal.seasonId,
                },
                userCropGoalId: cropGoal.id
              });
            }
          )
        );
      }

      await transaction?.commit();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: { id },
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
 * /user/crop-goal/season:
 *   delete:
 *     summary: delete user crop goals.
 *     description: delete user crop goals.
 *     tags: [User Crop Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              { "id": "7"}
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
 *                 example: {
 *                           "success": true,
 *                           "code": 200,
 *                           "message": "Deleted successfully.",
 *                           "data": {}
 *                        }
 */

router.delete(
  '/',
  auth,
  deleteCropGoalValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { id } = req.body;

      const cropGoal = await db.UserCropGoal.findOne({ where: { id, userId } });
      if (cropGoal == null) throw new Error("crop goal doesn't exist");

      var transaction = await db.sequelize.transaction();

      // destroy all related data of a goal
      await destroyCropGoalData({ transaction, seasonId: cropGoal.seasonId });
      // delete crop goals data itself
      await cropGoal.destroy({ transaction });

      await transaction?.commit();

      return res.json(
        successRespSync({
          msg: success.DELETED,
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
 * /user/crop-goal:
 *   get:
 *     summary: Get user crop goals
 *     description: Get user crop goals.
 *     tags: [User Crop Goals]
 *     parameters:
 *          - in: query
 *            name: sortBy
 *            type: string
 *            required: true
 *            description: sortBy value is to define the sorting method
 *          - in: query
 *            name: order
 *            type: string
 *            required: true
 *            description: order values to get response in ASC/DESC order
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 56, "recordId": "11111333232999", "note": "amazing  note", "harvestedYieldTarget": 111, "harvestedYieldTargetUom": { "id": "", "name": "kg" }, "incomeTarget": 111, "incomeTargetUom": { "id": "", "name": "USD" }, "syntheticFertilizerUsageTarget": 111, "syntheticFertilizerUsageTargetUom": { "id": "", "name": "kg" }, "goalStatus": "ongoing", "cropGoalSeason": { "id": 98, "seasonName": "season 999", "seasonStartDate": "2024-04-22", "seasonEndDate": "2024-07-01", "cropVarieties": [ { "id": 47, "name": "red peach" } ], "outcome": { "id": 63, "recordId": null, "parentSeasonId": null, "yieldHarvested": null, "yieldHarvestedUom": null, "marketValue": null, "marketValueUom": null, "syntheticFertilizerUsed": null, "syntheticFertilizerUsedUom": null, "maximizingYieldNote": null, "maximizingIncomeNote": null, "syntheticFertilizerUsedNote": null }, "cropGoalType": [ { "id": 895, "name": "Optimize The Use Of Synthetic Fertilizers", "optionCode": "optimize_fertilizer" }, { "id": 894, "name": "Maximize Income", "optionCode": "maximize_income" }, { "id": 893, "name": "Increasing The Yields", "optionCode": "increase_yield" } ], "farm": { "farmId": 683, "zoneId": 256, "cropTypeId": 336, "farmSize": 122, "farmSizeUom": { "id": 1, "name": "Acre" }, "farmName": "New Heritage Town", "zoneName": "new area", "cropType": "Cardamom-Nepal" }, "prevCropHistory": [ { "id": 91, "seasonName": "some season63", "seasonStartDate": "2022-08-02", "seasonEndDate": "2022-10-02", "outcome": { "id": 64, "recordId": null, "parentSeasonId": null, "yieldHarvested": 222, "yieldHarvestedUom": { "id": "", "name": "sfsdf" }, "marketValue": 12, "marketValueUom": { "id": "", "name": "sfsdf" }, "syntheticFertilizerUsed": 111, "syntheticFertilizerUsedUom": { "id": "", "name": "sfsdf" }, "maximizingYieldNote": null, "maximizingIncomeNote": null, "syntheticFertilizerUsedNote": null }, "cropGoalType": [ { "id": 895, "name": "Optimize The Use Of Synthetic Fertilizers", "optionCode": "optimize_fertilizer" }, { "id": 894, "name": "Maximize Income", "optionCode": "maximize_income" }, { "id": 893, "name": "Increasing The Yields", "optionCode": "increase_yield" } ] } ] } } ] }
 */
router.get(
  '/',
  auth,
  getCropGoalValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const {
        sortBy = 'id',
        order = 'desc',
        searchPhrase: search = null,
        startDate = null,
        endDate = null,
        farms = null,
        cropTypes = null,
        season = null,
        cropGoalTypes = null,
      } = req.query;

      // filter conditions
      let userCropGoalWhere = {
        '$`cropGoalSeason`.`userId`$': userId,
        ...(cropTypes !== null
          ? { '$`cropGoalSeason->farm`.`cropTypeId`$': cropTypes }
          : null),
        ...(season !== null ? { '$`cropGoalSeason`.`id`$': season } : null),
        ...(farms !== null
          ? { '$`cropGoalSeason->farm`.`farmId`$': farms }
          : null),
        ...(cropGoalTypes !== null
          ? { '$`cropGoalSeason->cropGoalType`.`id`$': cropGoalTypes }
          : null),
        ...(startDate !== null && endDate !== null
          ? {
              '$`cropGoalSeason`.`seasonStartDate`$': {
                [db.Sequelize.Op.between]: [startDate, endDate],
              },
            }
          : null),
      };
      if(req.query.goalStatus) {
        userCropGoalWhere.goalStatus = req.query.goalStatus
      }

      // order/sorting
      let orderBy =
        sortBy == 'name'
          ? [
              ['cropGoalSeason', 'farm', 'crop_type', 'name', order],
              ['id', 'desc'],
            ]
          : [
              ['cropGoalSeason', 'seasonStartDate', order],
              ['id', 'desc'],
            ];

      // search
      if (!_.isEmpty(search)) {
        const fields = ['$`cropGoalSeason->farm->crop_type`.`name`$'];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        userCropGoalWhere = {
          ...userCropGoalWhere,
          [db.Sequelize.Op.or]: searchQuery,
        };
      }

      // get corp goal data
      const getCropGoals = await db.UserCropGoal.findAll({
        where: userCropGoalWhere,
        attributes: {
          exclude: [ 'userId', 'seasonId'],
        },
        order: orderBy,
        include: includeAssociations,
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: getCropGoals,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @description save season related data
 * @param {*} object
 */
async function saveCropGoalData({
  transaction,
  req,
  seasonId,
  cropGoalType,
  setUserCropGoalOutcome,
  seasonHistoryMap = null,
  userCropGoalId = null,
}) {
  const { farmIdArr, zoneIdArr, farmSize, farmSizeUom, cropTypeId, cropVarieties } =
    req.body;

  // set crop goal farm details
  const setCropGoalFarms = farmIdArr.map((farmId) => ({
    seasonId: seasonId,
    farmId,
    farmSize,
    farmSizeUom,
    cropTypeId,
  }));

  await db.UserCropGoalFarm.bulkCreate(setCropGoalFarms, {
    transaction,
  });

  // map crop variety and crop goals/season
  const setUserCropGoalCropVarietyMap = cropVarieties.map((cropVarietyId) => ({
    userCropGoalSeasonId: seasonId,
    cropVarietyId,
  }));
  await db.UserCropGoalCropVarietyMap.bulkCreate(
    setUserCropGoalCropVarietyMap,
    { transaction }
  );

  if(userCropGoalId) {
    // map crop variety and crop goals/season
    const setUserCropGoalFarmMap = farmIdArr.map((farmId) => ({
      user_crop_goal_id: userCropGoalId,
      user_farm_id: farmId,
    }));

    await db.UserCropGoalFarmMap.bulkCreate(
      setUserCropGoalFarmMap,
      { transaction }
    )

    
    // map crop variety and crop goals/season
    const setUserCropGoalGeofenceMap = zoneIdArr.map((geoId) => ({
      user_crop_goal_id: userCropGoalId,
      geofence_id: geoId,
    }));

    await db.UserCropGoalGeofenceMap.bulkCreate(
      setUserCropGoalGeofenceMap,
      { transaction }
    )

  }

  // create map between crop goal type and user crop goal
  const setCropGoalAndGoalTypeMap = cropGoalType.map((cropGoalTypeId) => ({
    userCropGoalSeasonId: seasonId,
    cropGoalTypeId,
  }));
  await db.UserCropGoalTypeMap.bulkCreate(setCropGoalAndGoalTypeMap, {
    transaction,
  });

  // save crop goal history
  await db.UserCropGoalOutcome.create(setUserCropGoalOutcome, {
    transaction,
  });

  // save map between season and historic season id's
  if (!_.isEmpty(seasonHistoryMap))
    await db.UserCropGoalSeasonHistoryMap.create(seasonHistoryMap, {
      transaction,
    });
}

/**
 * @description delete all the season related data with season id
 * @param {*} object
 */
async function destroyCropGoalData({ transaction, seasonId, cropGoal }) {
  let allSeasons = await db.UserCropGoalSeasonHistoryMap.findAll({
    raw: true,
    where: {
      parentSeasonId: seasonId,
    },
  });
  allSeasons = allSeasons?.map(({ seasonId }) => seasonId);
  allSeasons.push(seasonId);

  // delete farm and geofence maps
  await db.UserCropGoalFarmMap.destroy({
    where: { user_crop_goal_id: cropGoal.id },
    transaction,
  });


  await db.UserCropGoalGeofenceMap.destroy({
    where: { user_crop_goal_id: cropGoal.id  },
    transaction,
  });


  // delete farm data
  await db.UserCropGoalFarm.destroy({
    where: { seasonId: allSeasons },
    transaction,
  });

  // delete all crop variety map data
  await db.UserCropGoalCropVarietyMap.destroy({
    where: { userCropGoalSeasonId: allSeasons },
    transaction,
  });

  // delete type map data
  await db.UserCropGoalTypeMap.destroy({
    where: { userCropGoalSeasonId: allSeasons },
    transaction,
  });

  // delete history/outcome data
  await db.UserCropGoalOutcome.destroy({
    where: { userCropGoalSeasonId: allSeasons },
    transaction,
  });

  // delete season map data
  await db.UserCropGoalSeasonHistoryMap.destroy({
    where: { parentSeasonId: seasonId },
    transaction,
  });
}

module.exports = router;
