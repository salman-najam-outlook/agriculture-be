const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
/********************   Custom Modules    *********************/
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { error, success } = require(rootPath + "/helpers/language");
const { successRespSync, serverError, errorRespSync } = require(rootPath +
  "/helpers/api");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
// validations
const validate = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

/**
 * @desc crop registration of the user[]
 */
/**
 * @swagger
 * /farm/crop:
 *   post:
 *     summary: Crop registration of the user
 *     description: Crop registration of the user
 *     tags: [Farm-Crop]
 *     requestBody:
 *       description: Create farm segment details
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"farmIds": [539, 600], "segmentIds": [148], "cropTypeOptId":54, "cropVariety":[1,2,3], "propagationType":"seed", "vegetativePropagationTypeOptId":35, "expectedYield":200, "cropSeasonOptId":41, "cropLifecycleOptId":44, "cropWaterMgmtOptId":48, "recordId":"123Abc" }
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
 *                 example: { "success": true, "code": 200, "message": "crop has been registered successfully.", "data": { "id": 35, "userId": 171, "cropRegId": 122, "description": "Crop Registration", "point": 20, "updatedAt": "2022-03-25T13:54:19.968Z", "createdAt": "2022-03-25T13:54:19.968Z" } }
 */

router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("UserfarmCrop"),
  validate.postFarmCropValidation(),
  validationErrorHandler,
  async (req, res) => {
    let cropVarietyArr = [], othercropVarietyArr= []
    try {
      const userId = req.user.id;
      const {
        farmId,
        farmIds,
        segmentId,
        segmentIds,
        cropTypeOptId,
        cropVariety,
        propagationType,
        vegetativePropagationTypeOptId,
        expectedYield,
        cropSeasonOptId,
        cropLifecycleOptId,
        cropWaterMgmtOptId,
        recordId,
      } = req.body;
      cropVarietyArr = cropVariety.filter(crop => typeof crop != "string")
      cropVarietyArr = [...new Set(cropVarietyArr)];
       othercropVarietyArr = cropVariety.filter(crop => typeof crop == "string")
      const set = {
        farmId,
        userId,
        segmentId,
        cropTypeOptId,
        propagationType,
        vegetativePropagationTypeOptId,
        expectedYield,
        cropSeasonOptId,
        cropLifecycleOptId,
        cropWaterMgmtOptId,
        recordId,
      };

      const cropVarietyData = [];
      let response = {};

      for (const item of farmIds) {
        const farm = await db.user_farm.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  { id: item}, 
                  { recordId: item }
                ]
              },
              {
                [Op.or]: [
                  { userId: userId }, 
                  { technicianId: userId }
                ]
              },
              { isDeleted: 0 }
            ]
          },
        });
        if (farm) {
          const farmCorp = await db.UserfarmCrop.create(
            { ...set, farmId: farm.id }
          );
          const userCropFarmsDataPromises = farmIds.map(async (_farmId) => {
            const _farm = await db.user_farm.findOne({
              where: {
                [Op.and]: [
                  {
                    [Op.or]: [
                      { id: _farmId}, 
                      { recordId: _farmId }
                    ]
                  },
                  {
                    [Op.or]: [
                      { userId: userId }, 
                      { technicianId: userId }
                    ]
                  },
                  { isDeleted: 0 }
                ]
              },
            });
            if (_farm) {
              return {
                farmId: _farm.id,
                userFarmCropId: farmCorp.id,
              };
            }
          });
          
          const userCropSegmentsDataPromises = segmentIds.map(async (segmentId) => {
            const segment = await db.Geofence.findOne({
              where: {
                [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
              }
            });
            if (segment) {
              return {
                segmentId: segment.id,
                userFarmCropId: farmCorp.id,
              };
            }
          });
          
          const userCropFarmsData = await Promise.all(userCropFarmsDataPromises);
          const userCropSegmentsData = await Promise.all(userCropSegmentsDataPromises);
          
          await db.UserCropFarm.bulkCreate(userCropFarmsData);
          
          await db.UserCropSegment.bulkCreate(userCropSegmentsData, );
  
          const points = {
            userId,
            cropRegId: farmCorp.id,
            description: "Crop Registration",
            point: 20,
          };
          const PointResult = await db.user_point.create(points);
  

        let cropVarIds =   await db.Crop.bulkCreate(othercropVarietyArr.map(cropV => {
            return {
              name: cropV,
              cropTypeOptId,
              userId
            }
          }), { 
            individualHooks: true 
          })
          cropVarietyArr = [...cropVarietyArr, ...cropVarIds.map(record => record.id)]
         await cropVarietyArr.forEach((varietyId) =>
            cropVarietyData.push({
              userFarmCropId: farmCorp.id,
              cropId: varietyId,
            })
          );
          await db.UserfarmCropVariety.bulkCreate(cropVarietyData);
         response= {
            id:PointResult.cropRegId,
            userId:PointResult.userId,
            description:PointResult.description,
            point:PointResult.point,
            createdAt:PointResult.createdAt,
            updatedAt:PointResult.updatedAt,
            recordId: farmCorp.recordId
          }
        }
       
      };


      return res.json(
        successRespSync({
          msg: success.CROP_REGISTERED,
          data: response,
        })
      );
    } catch (err) {
   
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc list all registered crop for a user
 */

/**
 * @swagger
 * /farm/crop:
 *   get:
 *     summary: Get list all registered crop for a user
 *     description: Get list all registered crop for a user
 *     tags: [Farm-Crop]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkyNDg2MDQsImV4cCI6MjI0OTI0ODYwNH0.brOYBw3kBbZJCvtdxDZFOUvi4uW6puug64s9ygZdrhE
 *       - in: query
 *         name: propagationType
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
 *       - in: query
 *         name: cropSeasonOptId
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
 *       - in: query
 *         name: farm
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
 *       - in: query
 *         name: segment
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
 *       - in: query
 *         name: cropLifecycleOptId
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
 *       - in: query
 *         name: cropWaterMgmtOptId
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: Integer
 *         description: asc | desc
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 122, "userId": 171, "segmentId": 148, "cropTypeOptId": 54, "propagationType": "seed", "vegetativePropagationTypeOptId": 35, "expectedYield": 200, "cropSeasonOptId": 41, "cropLifecycleOptId": 44, "cropWaterMgmtOptId": 48, "createdAt": "2022-03-25T13:54:19.000Z", "updatedAt": "2022-03-25T13:54:19.000Z", "userCropFarms": [{ "id": 4, "farm": { "id": 600, "farmName": "Seg Farm" }}], "userCropSegments": [{"id": 148, "geofenceName": "test", "farmId": 521, "farm": { "id": 521, "farmName": "cacac" }}], "user_farm_crop_name": { "info": null, "id": 54, "name": "rice", "groupName": "crop-type", "userId": null, "createdAt": "2021-11-03T06:34:17.000Z", "updatedAt": "2021-11-03T06:34:17.000Z" }, "vegetativePropagation": { "info": null, "id": 35, "name": "suckers", "groupName": "vegetative-propagation", "userId": null, "createdAt": "2021-09-13T06:53:15.000Z", "updatedAt": "2021-09-30T07:48:03.000Z" }, "cropSeason": { "info": null, "id": 41, "name": "spring", "groupName": "crop-season", "userId": null, "createdAt": "2021-09-13T06:53:15.000Z", "updatedAt": "2021-09-30T07:48:03.000Z" }, "cropLifecycle": { "info": null, "id": 44, "name": "biennial", "groupName": "crop-lifecycle", "userId": null, "createdAt": "2021-09-13T06:53:15.000Z", "updatedAt": "2021-09-30T07:48:03.000Z" }, "cropWaterMgmt": { "info": null, "id": 48, "name": "irrigated", "groupName": "crop-water-mgmt", "userId": null, "createdAt": "2021-09-13T06:53:15.000Z", "updatedAt": "2021-09-30T07:48:03.000Z" }, "user_farm_crop_variety": [ { "id": 320, "crop_variety": null }, { "id": 321, "crop_variety": { "id": 2, "name": "rice" } }, { "id": 322, "crop_variety": null } ] } ] }
 */

router.get("/", auth, translation, async (req, res) => {
  try {
    let {
      propagationType,
      cropSeasonOptId,
      farm,
      segment,
      cropLifecycleOptId,
      cropWaterMgmtOptId,
      order,
      page,
      limit,
    } = req.query;
    let where = { userId: req.user.id };
    if (notEmpty(propagationType)) {
      const propagationTypeList = propagationType.split("-");
      if (
        propagationTypeList.includes("0") ||
        propagationTypeList.includes("31")
      ) {
        where[Op.or] = [
          { propagationType: "seed" },
          { vegetativePropagationTypeOptId: propagationTypeList },
        ];
      } else {
        where.vegetativePropagationTypeOptId = propagationTypeList;
      }
    }
    if (notEmpty(cropSeasonOptId)) {
      where.cropSeasonOptId = cropSeasonOptId.split("-");
    }

    let cropWithFarmIds = [];
    let cropWithSegmentIds = [];

    if (notEmpty(farm)) {
      const cropWithFarm = await db.UserfarmCrop.findAll({
        where,
        raw: true,
        include: [
          {
            as: "userCropFarms",
            attributes: ["id", "farmName"],
            model: db.user_farm,
            required: true,
            through: {
              attributes: [],
              model: db.UserCropFarm,
              where: { farmId: farm.split("-") },
            },
          },
        ],
      });
      cropWithFarmIds = cropWithFarm.map((item) => item.id);
    }

    if (notEmpty(segment)) {
      const cropWithSegment = await db.UserfarmCrop.findAll({
        where,
        raw: true,
        include: [
          {
            as: "userCropSegments",
            attributes: ["id", "geofenceName"],
            model: db.Geofence,
            required: true,
            through: {
              attributes: [],
              model: db.UserCropSegment,
              where: { segmentId: segment.split("-") },
            },
          },
        ],
      });
      cropWithSegmentIds = cropWithSegment.map((item) => item.id);
    }

    if (notEmpty(farm) || notEmpty(segment)) {
      where.id = [...new Set(cropWithFarmIds.concat(cropWithSegmentIds))];
    }

    if (notEmpty(cropLifecycleOptId)) {
      where.cropLifecycleOptId = cropLifecycleOptId.split("-");
    }
    if (notEmpty(cropWaterMgmtOptId)) {
      where.cropWaterMgmtOptId = cropWaterMgmtOptId.split("-");
    }
    let orderBy = [["createdAt", "DESC"]];
    if (notEmpty(order)) {
      orderBy =
        order === "asc"
          ? [["user_farm_crop_name", "name", "ASC"]]
          : [["user_farm_crop_name", "name", "DESC"]];
    }
    let query = {
      where,
      order: orderBy,
      include: [
        {
          model: db.user_farm,
          as: "user_crop_farm",
          attributes: ["id", "farmName"],
        },
        {
          model: db.Geofence,
          as: "user_crop_segment",
          attributes: ["id", "geofenceName"],
        },
        {
          model: db.user_farm,
          as: "userCropFarms",
          through: { model: db.UserCropFarm, attributes: [] },
          attributes: ["id", "farmName"],
        },
        {
          model: db.Geofence,
          as: "userCropSegments",
          through: { model: db.UserCropSegment, attributes: [] },
          attributes: ["id", "geofenceName", "farmId"],
          include: [
            {
              model: db.user_farm,
              as: "farm",
              attributes: ["id", "farmName"],
            },
          ],
        },
        {
          model: db.Option,
          as: "user_farm_crop_name",
        },
        {
          model: db.Option,
          as: "vegetativePropagation",
        },
        {
          model: db.Option,
          as: "cropSeason",
        },
        {
          model: db.Option,
          as: "cropLifecycle",
        },
        {
          model: db.Option,
          as: "cropWaterMgmt",
        },
        {
          model: db.UserfarmCropVariety,
          as: "user_farm_crop_variety",
          attributes: ["id"],
          include: [
            {
              model: db.Crop,
              as: "crop_variety",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    };
    if (notEmpty(page) && notEmpty(limit)) {
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    const userFarmCrops = await db.UserfarmCrop.findAll(query);
    if (req.headers.lang && req.headers.lang != "en") {
      req.translateFunction(userFarmCrops, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
        moduleName: "farm/crop",
      });
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: userFarmCrops,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc list all registered crop for a user
 */
/**
 * @swagger
 * /farm/crop/{id}:
 *   put:
 *     summary: Update crop registration of the user
 *     description: Update crop registration of the user
 *     tags: [Farm-Crop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: User farm crop ID
 *     requestBody:
 *       description: Update crop registration of the user
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"farmIds": [539, 600], "segmentIds":[148], "cropTypeOptId":54, "cropVariety":[1,2,3], "propagationType":"seed", "vegetativePropagationTypeOptId":35, "expectedYield":200, "cropSeasonOptId":41, "cropLifecycleOptId":44, "cropWaterMgmtOptId":48, recordId:"123Ab" }
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
 *                 example: { "success": true, "code": 200, "message": "crop has been updated successfully.", "data": {} }
 */

router.put(
  "/:id",
  auth,
  validate.postFarmCropValidation(),
  validationErrorHandler,
  async (req, res) => {
    const userId = req.user.id;
    const registeredCrop = await db.UserfarmCrop.findOne({
      id: req.params.id,
      userId,
    });
    if (registeredCrop === null) {
      return res.json(
        errorRespSync({
          msg: error.NOT_FOUND,
          code: error.code.NOT_FOUND,
        })
      );
    }
    const {
      farmId,
      farmIds,
      segmentId,
      segmentIds,
      cropTypeOptId,
      cropVariety,
      propagationType,
      vegetativePropagationTypeOptId,
      expectedYield,
      cropSeasonOptId,
      cropLifecycleOptId,
      cropWaterMgmtOptId,
      recordId,
    } = req.body;
    cropVarietyArr = [...new Set(cropVariety)];
    const set = {
      userId,
      farmId,
      segmentId,
      cropTypeOptId,
      propagationType,
      vegetativePropagationTypeOptId,
      expectedYield,
      cropSeasonOptId,
      cropLifecycleOptId,
      cropWaterMgmtOptId,
      recordId,
    };
    const t = await db.sequelize.transaction();
    const cropVarietyData = [];
    cropVarietyArr.forEach((varietyId) =>
      cropVarietyData.push({
        userFarmCropId: req.params.id,
        cropId: varietyId,
      })
    );
    try {
      await db.UserfarmCrop.update(set, {
        where: {
          id: req.params.id,
        },
        transaction: t,
      });

      await db.UserCropFarm.destroy(
        { where: { userFarmCropId: req.params.id } },
        { transaction: t }
      );

      const userCropFarmsData = farmIds.map((_farmId) => {
        return {
          farmId: _farmId,
          userFarmCropId: req.params.id,
        };
      });

      await db.UserCropFarm.bulkCreate(userCropFarmsData, {
        transaction: t,
      });

      await db.UserCropSegment.destroy(
        { where: { userFarmCropId: req.params.id } },
        { transaction: t }
      );
      const userCropSegmentsData = segmentIds.map((segmentId) => {
        return {
          segmentId: segmentId,
          userFarmCropId: req.params.id,
        };
      });
      await db.UserCropSegment.bulkCreate(userCropSegmentsData, {
        transaction: t,
      });

      await db.UserfarmCropVariety.destroy(
        {
          where: {
            userFarmCropId: req.params.id,
          },
        },
        {
          transaction: t,
        }
      );

      await db.UserfarmCropVariety.bulkCreate(cropVarietyData, {
        transaction: t,
      });

      await t.commit();
      const userFarmCropData = await db.UserfarmCrop.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "recordId"],
      });

      return res.json(
        successRespSync({
          msg: success.CROP_REGISTERED_UPDATED,
          data: userFarmCropData,
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc delete registered crop for a user
 */
/**
 * @swagger
 * /farm/crop/{id}:
 *   delete:
 *     summary: Delete registered crop for a user
 *     description: Delete registered crop for a user
 *     tags: [Farm-Crop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: User farm crop ID
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
 *                 example: { "success": true, "code": 200, "message": "crop has been deleted successfully.", "data": {} }
 */

router.delete("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const registeredCrop = await db.UserfarmCrop.findOne({
    id: req.params.id,
    userId,
  });
  if (registeredCrop === null) {
    return res.json(
      errorRespSync({
        msg: error.NOT_FOUND,
        code: error.code.NOT_FOUND,
      })
    );
  }
  const t = await db.sequelize.transaction();
  try {
    await db.UserCropFarm.destroy(
      { where: { userFarmCropId: req.params.id } },
      { transaction: t }
    );
    await db.UserCropSegment.destroy(
      { where: { userFarmCropId: req.params.id } },
      { transaction: t }
    );
    await db.UserfarmCrop.destroy(
      {
        where: {
          id: req.params.id,
          userId,
        },
      },
      { transaction: t }
    );

    await db.UserfarmCropVariety.destroy(
      {
        where: {
          userFarmCropId: req.params.id,
        },
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    return res.json(
      successRespSync({
        msg: success.CROP_REGISTERED_DELETED,
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /farm/crop/hasGoal/{id}:
 *   get:
 *     summary: Delete registered crop for a user
 *     description: Delete registered crop for a user
 *     tags: [Farm-Crop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: User farm crop ID
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "hasGoal": false } }
 */

router.get("/hasGoal/:id", auth, async (req, res) => {
  try {
    const registeredFarm = await db.UserfarmCrop.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      include: [
        {
          model: db.UserfarmCropVariety,
          as: "user_farm_crop_variety",
          attributes: ["id"],
          include: [
            {
              model: db.Crop,
              as: "crop_variety",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    if (registeredFarm === null) {
      return res.json(
        errorRespSync({
          msg: error.NOT_FOUND,
          code: error.code.NOT_FOUND,
        })
      );
    }
    const cropTypeOptId = registeredFarm.cropTypeOptId;
    const cropVariety = [];
    registeredFarm?.user_farm_crop_variety?.map((item) =>
      cropVariety.push(item.crop_variety.id)
    );
    const goal = await db.UserGoal.findOne({
      where: {
        userId: req.user.id,
        [Op.or]: [
          { userFarmId: registeredFarm.farmId },
          { segmentId: registeredFarm.segmentId },
        ],
        cropTypeOptId,
      },
      include: [
        {
          model: db.Crop,
          as: "cropVariety",
          through: { model: db.MapUserGoalsCrop },
          where: { id: cropVariety },
        },
      ],
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { hasGoal: goal === null ? false : true },
      })
    );
  } catch (error) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
