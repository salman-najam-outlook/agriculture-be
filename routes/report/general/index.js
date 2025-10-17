const express = require('express');
const soilInformation = require('../../../models/soilInformation/soilInformation');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

/**
 * @swagger
 * /report/general/farm:
 *   get:
 *     summary: Get general report of user - My Farm
 *     description: Returns all general report
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
 *                   data: {"farm": 2,"geoFence": 0,"location": 0,"farmAudit": 0,"equipment": 0,"crop": 0,"userGoals": 0,"document": 0}
 *
 *
 */
router.get('/farm', auth, async (req, res) => {
  const userId = req.user.id;
  let generalStats = {};

  try {
    const farm = db.user_farm
      .count({
        where: { userId, isDeleted: false },
      })
      .then((res) => (generalStats.farm = res));
    const farmCoordinates = db.user_farm
      .count({
        include: [
          {
            required: true,
            model: db.UserFarmCoordinate,
            as: 'farmCoordinates',
          },
        ],
        where: { userId, isDeleted: false },
        distinct: true,
      })
      .then((res) => {
        generalStats.geoFence = (generalStats.geoFence || 0) + res;
        generalStats.location = (generalStats.location || 0) + res;
      });
    const geoFence = db.Geofence.findAll({
      where: { userId },
      include: [
        {
        model: db.user_farm,
        as: "farms",
        where: { isDeleted: false }
        }
      ]
    }).then((res) => {     
      generalStats.geoFence = (generalStats.geoFence || 0) + res.length;
      generalStats.location = (generalStats.location || 0) + res.length;
    });
    const crop = db.UserfarmCrop.count({
      where: { userId },
    }).then((res) => {
      generalStats.crop = res;
    });
    const equipment = db.Equipment.count({
      where: { userId },
    }).then((res) => {
      generalStats.equipment = res;
    });
    const userGoals = db.UserGoal.count({
      where: { userId, deletedAt: null },
    }).then((res) => {
      generalStats.userGoals = res;
    });
    const farmAudit = db.SoilFertilityAudit.count({
      where: { userId },
    }).then((res) => {
      generalStats.farmAudit = res;
    });
    const document = db.Document.count({
      where: { userId },
    }).then((res) => {
      generalStats.document = res;
    });

    await Promise.all([
      farm,
      geoFence,
      crop,
      equipment,
      userGoals,
      farmAudit,
      document,
      farmCoordinates,
    ]).then(() =>
      res.json(
        successRespSync({
          msg: success.FETCH,
          statusCode: success.code.OK,
          data: generalStats,
        })
      )
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /report/general/crop:
 *   get:
 *     summary: Get general report of user - My Crop
 *     description: Returns all general report
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
 *                   data: {"soil": 0,"sowing": 0,"weeding": 0,"irrigation": 0,"harvesting": 0,"storage": 0}
 *
 *
 */
router.get('/crop', auth, async (req, res) => {
  const userId = req.user.id;
  let generalStats = {};

  try {
    const soilInformation = db.SoilInformation.count({
      where: { userId },
    }).then((res) => (generalStats.soilInformation = res));
    const nutrientManagement = db.NutrientManagement.count({
      where: { userId },
    }).then((res) => (generalStats.nutrientManagement = res));
    const sowing = db.Sowing.count({
      where: { userId },
    }).then((res) => (generalStats.sowing = res));
    const landPreparation = db.Soil_prep_practice.count({
      where: { userId },
    }).then((res) => (generalStats.landPreparation = res));
    const irrigation = db.Irrigation.count({
      where: { userId },
    }).then((res) => {
      generalStats.irrigation = res;
    });
    const weeding = db.Weed.count({
      where: { userId },
    }).then((res) => {
      generalStats.weeding = res;
    });
    const storage = db.CropStorage.count({
      where: { userId },
    }).then((res) => {
      generalStats.storage = res;
    });
    const harvesting = db.Harvest.count({
      where: { userId },
    }).then((res) => {
      generalStats.harvesting = res;
    });
    const cropObservation = db.CropObservation.count({
      where: { userId },
    }).then((res) => {
      generalStats.cropObservation = res;
    });
    const userGoal = db.UserGoal.count({
      where: { userId },
    }).then((res) => {
      generalStats.userGoal = res;
    });
    Promise.all([
      soilInformation,
      nutrientManagement,
      sowing,
      irrigation,
      weeding,
      storage,
      harvesting,
      landPreparation,
      cropObservation,
      userGoal,
    ]).then(() =>
      res.json(
        successRespSync({
          msg: success.FETCH,
          statusCode: success.code.OK,
          data: generalStats,
        })
      )
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
