const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const db = require(rootPath + "/models");
const { serverError, successRespSync, errorRespSync } = require(rootPath +
  "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { cropStorageDataValidator } = require(rootPath +
  "/helpers/validators/cropStorage");
const checkIfEntityExistsForOffline = require(rootPath +
  "/middleware/checkForEntityOfflineMode");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const {
  validateFarmBelongsToUser,
  validateSegmentBelongsToUser,
  validateCropVariety,
  validateCropType,
} = require("../../irrigation/utils");
const {
  validateFarmsAndSegmentsPayloadData,
} = require("../../equipment/utils");
const {
  validateStorageMethod,
  validateCropStorageType,
  addCropStorageToSegment,
  addCropStorageToFarm,
  removeCropStorageFarmAndSegment,
  addCropVarietyToStorage,
} = require("./utils");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
/**
 * @swagger
 * /crop/storage:
 *   get:
 *     description: Returns all stored crops
 *     tags: [Crop Storage]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: getAllData
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{ "id": 136, "area": 200, "cropId": 94, "startDate": "2021-11-21T18:30:00.000Z", "endDate": "2021-12-20T18:30:00.000Z", "durationOfStorage": 120, "yieldStored": 22, "didYieldStoredInBags": true, "storageMethod": 1, "storageType": 1, "recordId": null, "createdAt": "2022-04-25T06:09:06.000Z", "updatedAt": "2022-04-25T06:09:06.000Z", "bags_stored": [ { "bagQty": 12, "bagCount": 12, "bag_uom": { "id": 133, "name": "Tonnes", "abbvr": "Tonnes", "factor": "2204.6200000000" } } ], "crop_storage_farm": [ { "id": 2, "farmName": "Corbet Farmers" } ], "crop_storage_segment": [], "storage_cropVariety": [ { "id": 87, "name": "BO 128 (Pramod)", "cropTypeOptId": 94 } ], "cropStorage_method": { "id": 1, "name": "Drying" }, "cropStorage_type": { "id": 1, "name": "Barn" }, "crop_storage_cropType": { "id": 94, "name": "sugarcane" } }]
 *
 */
router.get("/", auth, translation, async (req, res) => {
  try {
    let { page, limit, order } = req.query;
    let query = {
      attributes: {
        exclude: ["userId"],
      },
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: db.CropStorageBagsStored,
          as: "bags_stored",
          attributes: ["bagQty", "bagCount"],
        },
        {
          model: db.user_farm,
          as: "crop_storage_farm",
          through: { model: db.CropStorageFarm, attributes: [] },
          attributes: ["id", "farmName"],
        },
        {
          model: db.Geofence,
          as: "crop_storage_segment",
          through: { model: db.CropStorageSegment, attributes: [] },
          attributes: ["id", "geofenceName", "farmId"],
        },
        {
          model: db.Crop,
          as: "storage_cropVariety",
          through: { model: db.StorageCropVariety, attributes: [] },
          attributes: ["id", "name", "cropTypeOptId"],
        },
        {
          model: db.CropStorageMethod,
          as: "cropStorage_method",
          attributes: ["id", "name"],
        },
        {
          model: db.CropStorageType,
          as: "cropStorage_type",
          attributes: ["id", "name"],
        },
        {
          model: db.Option,
          as: "crop_storage_cropType",
          attributes: ["id", "name"],
        },
        {
          model: db.CropStorageCost,
          as: "cost",
          attributes: [
            "totalNumberOfWorkers",
            "totalNumberOfHours",
            "totalCost",
            "currencyId",
          ],
          include: [
            {
              model: db.Currency,
              as: "currency",
            },
          ],
        },
      ],
    };
    if (notEmpty(page) && notEmpty(limit) && !req.query.getAllData) {
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    if (notEmpty(order) && order === "asc") {
      query.order = [["createdAt", "asc"]];
    } else {
      query.order = [["createdAt", "desc"]];
    }
    let cropStorageData = await db.CropStorage.findAll(query);
    cropStorageData = req.translateFunction(
      cropStorageData,
      globalTranslationCache,
      {
        lvl1: false,
        lvl2: true,
        moduleName: "crop/storage",
      }
    );
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: cropStorageData,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/storage:
 *   post:
 *     description: Add new crop storage data for a user
 *     tags: [Crop Storage]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for creting new crop storage data
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                yieldStored:
 *                  type: integer
 *                didYieldStoredInBags:
 *                  type: integer
 *                yieldStoredInBags:
 *                  type: array
 *                  items:
 *                     type: object
 *                     properties:
 *                      bagQty:
 *                       type: float
 *                      bagCount:
 *                       type: integer
 *                      bagUom:
 *                       type: integer
 *                farm:
 *                  type: integer
 *                area:
 *                  type: float
 *                cropId:
 *                  type: integer
 *                cropVariety:
 *                  type: array
 *                  items:
 *                   type: integer
 *                startDate:
 *                  type: date
 *                endDate:
 *                  type: date
 *                durationOfStorage:
 *                  type: integer
 *                storageMethod:
 *                  type: integer
 *                storageType:
 *                  type: integer
 *            example: { "yieldStored": 22, "didYieldStoredInBags": "1", "yieldStoredInBags": [ { "bagQty": 12, "bagCount": 12, "bagUom": 133 } ], "farm": [ 2 ], "area": 200, "cropId": 94, "cropVariety": [ 87 ], "startDate": "11/22/2021", "endDate": "12/21/2021", "durationOfStorage": 120, "storageMethod": 1, "storageType": 1 }
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
 *                   message: Crop storage data has been added successfully.
 *                   data: {"id": 2,"area": "200","cropId": 1, "cropVariety": 55,"startDate": "2021-11-10T18:15:00.000Z","endDate": "2021-11-10T18:15:00.000Z","durationOfStorage": "120","yieldStored": "22","storageMethod": 1,"storageType": 1,"userId": 17,"updatedAt": "2022-02-03T17:13:00.973Z","createdAt": "2022-02-03T17:13:00.973Z"}
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g farm id sent doesnot belong to the user)
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
 *                    {"success": false,"code": 422,"message": "Storage type selected doesnot belong to the user."}
 *
 */
router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("CropStorage"),
  cropStorageDataValidator(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const {
        farm,
        segment,
        cropVariety,
        didYieldStoredInBags,
        yieldStoredInBags,
        cost,
      } = req.body;
      // return res.json(req.body);
      const cropStorageData = ({
        area,
        cropId,
        startDate,
        endDate,
        durationOfStorage,
        yieldStored,
        storageMethod,
        storageType,
      } = req.body);

      cropStorageData.userId = userId;
      // if (farm?.length) await validateFarmBelongsToUser(farm, userId);
      if (segment?.length) {
        await validateSegmentBelongsToUser(segment, userId);
        await validateFarmsAndSegmentsPayloadData(segment, farm, res);
      }
      if (
        cropStorageData?.cropId &&
        cropStorageData?.cropId > 0 &&
        Math.sign(cropStorageData?.cropId)
      ) {
        await validateCropType(cropStorageData.cropId);
      } else {
        cropStorageData.cropId = null;
      }
      if (
        cropStorageData?.storageMethod &&
        cropStorageData?.storageMethod > 0 &&
        Math.sign(cropStorageData?.storageMethod)
      ) {
        await validateStorageMethod(cropStorageData.storageMethod, userId);
      } else {
        cropStorageData.storageMethod = null;
      }
      if (
        cropStorageData?.storageType &&
        cropStorageData?.storageType > 0 &&
        Math.sign(cropStorageData?.storageType)
      ) {
        await validateCropStorageType(cropStorageData.storageType, userId);
      } else {
        cropStorageData.storageType = null;
      }

      const cropStorage = await db.CropStorage.create(cropStorageData, {
        transaction: t,
      });
      if (cropVariety?.length)
        await addCropVarietyToStorage(cropVariety, cropStorage.id, t);
      if (farm?.length) await addCropStorageToFarm(farm, cropStorage.id, t);
      if (segment?.length)
        await addCropStorageToSegment(segment, cropStorage.id, t);

      if (didYieldStoredInBags == "1" && yieldStoredInBags?.length > 0) {
        const set = yieldStoredInBags.map((row) => ({
          ...row,
          cropStorageId: cropStorage.id,
        }));
        await db.CropStorageBagsStored.bulkCreate(set, {
          transaction: t,
        });
      }

      if (cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = cost;
        const cropStorageCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          cropStorage: cropStorage.id,
        };
        await db.CropStorageCost.create(cropStorageCost, {
          transaction: t,
        });
      }

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.CROP_STORAGE_CREATED,
          data: cropStorage,
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      if (err?.msg && err?.customValidationError) {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: err.msg,
          })
        );
      }
      return res.json(errorRespSync());
    }
  }
);

/**
 * @swagger
 * /crop/storage/:id:
 *   put:
 *     description: Update storage data for a user
 *     tags: [Crop Storage]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Request body for updating crop storage data
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                yieldStored:
 *                  type: integer
 *                didYieldStoredInBags:
 *                  type: integer
 *                yieldStoredInBags:
 *                  type: array
 *                  items:
 *                     type: object
 *                     properties:
 *                      bagQty:
 *                       type: float
 *                      bagCount:
 *                       type: integer
 *                      bagUom:
 *                       type: integer
 *                farm:
 *                  type: integer
 *                area:
 *                  type: float
 *                cropId:
 *                  type: integer
 *                cropVariety:
 *                  type: array
 *                  items:
 *                   type: integer
 *                startDate:
 *                  type: date
 *                endDate:
 *                  type: date
 *                durationOfStorage:
 *                  type: integer
 *                storageMethod:
 *                  type: integer
 *                storageType:
 *                  type: integer
 *            example: { "yieldStored": 22, "didYieldStoredInBags": "1", "yieldStoredInBags": [ { "bagQty": 12, "bagCount": 12, "bagUom": 133 } ], "farm": [ 2 ], "area": 200, "cropId": 94, "cropVariety": [ 87 ], "startDate": "11/22/2021", "endDate": "12/21/2021", "durationOfStorage": 120, "storageMethod": 1, "storageType": 1 }
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
 *                   message: Irrigation data has been added successfully.
 *                   data: {"id": 2,"area": "200","cropId":1, "cropVariety": 55,"startDate": "2021-11-10T18:15:00.000Z","endDate": "2021-11-10T18:15:00.000Z","durationOfStorage": "120","yieldStored": "22","storageMethod": 1,"storageType": 1,"userId": 17,"updatedAt": "2022-02-03T17:13:00.973Z","createdAt": "2022-02-03T17:13:00.973Z"}
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g farm id sent doesnot belong to the user)
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
 *                    {"success": false,"code": 422,"message": "Storage type selected doesnot belong to the user."}
 *
 */
router.put(
  "/:id",
  auth,
  cropStorageDataValidator(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const cropStorageId = req.params.id;
      const exists = await db.CropStorage.findOne({
        where: {
          userId,
          id: cropStorageId,
        },
      });
      if (exists === null) {
        return res.json(
          errorRespSync({
            code: error.code.NOT_FOUND,
            msg: error.CROP_STORAGE_DOESNOT_EXISTS,
          })
        );
      }
      const {
        farm,
        segment,
        cropVariety,
        didYieldStoredInBags,
        yieldStoredInBags,
        cost,
      } = req.body;
      const cropStorageData = ({
        area,
        cropId,
        startDate,
        endDate,
        durationOfStorage,
        yieldStored,
        storageMethod,
        storageType,
      } = req.body);
      cropStorageData.userId = userId;
      // if (farm?.length) await validateFarmBelongsToUser(farm, userId);
      if (segment?.length) {
        await validateSegmentBelongsToUser(segment, userId);
        await validateFarmsAndSegmentsPayloadData(segment, farm, res);
      }
      if (cropStorageData?.cropId) {
        await validateCropType(cropStorageData.cropId);
      }
      if (cropStorageData?.storageMethod) {
        await validateStorageMethod(cropStorageData.storageMethod, userId);
      }
      if (cropStorageData?.storageType) {
        await validateCropStorageType(cropStorageData.storageType, userId);
      }
      if (
        !req.body.cropVariety ||
        (Array.isArray(req.body.cropVariety) &&
          req.body.cropVariety.length == 0)
      ) {
        await db.StorageCropVariety.destroy({
          where: {
            id: req.params.id,
          },
          transaction: t,
        });
      }
      const cropStorage = await db.CropStorage.update(
        cropStorageData,
        {
          where: {
            id: cropStorageId,
          },
        },
        { transaction: t }
      );
      await removeCropStorageFarmAndSegment(cropStorageId, t);
      if (cropVariety?.length)
        await addCropVarietyToStorage(cropVariety, cropStorageId, t);
      if (farm?.length) await addCropStorageToFarm(farm, cropStorageId, t);
      if (segment?.length)
        await addCropStorageToSegment(segment, cropStorageId, t);

      // update yield stored in bags details
      if (didYieldStoredInBags == "1" && yieldStoredInBags?.length > 0) {
        const set = yieldStoredInBags.map((row) => ({
          ...row,
          cropStorageId,
        }));
        await db.CropStorageBagsStored.destroy({
          where: { cropStorageId },
          transaction: t,
        });
        await db.CropStorageBagsStored.bulkCreate(set, {
          transaction: t,
        });
      } else {
        await db.CropStorageBagsStored.destroy({
          where: { cropStorageId },
          transaction: t,
        });
      }

      await db.CropStorageCost.destroy(
        { where: { cropStorage: cropStorageId } },
        {
          transaction: t,
        }
      );
      if (cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = cost;
        const cropStorageCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          cropStorage: cropStorageId,
        };
        await db.CropStorageCost.create(cropStorageCost, {
          transaction: t,
        });
      }

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.CROP_STORAGE_UPDATED,
          data: cropStorageData,
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      if (err?.msg && err?.customValidationError) {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: err.msg,
          })
        );
      }
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /crop/storage/:id:
 *   delete:
 *     description: Delete crop storage data for a user
 *     tags: [Crop Storage]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: id
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
 *                   message: Crop storage data has been deleted successfully.
 *                   data: {}
 *        '404':
 *           description: Crop Storage data doesnot exist
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
 *                    {"success": false,"code": 404,"message": "Crop storage data doesnot exist."}
 *
 */
router.delete("/:id", auth, async (req, res) => {
  const cropStorageId = req.params.id;
  const userId = req.user.id;
  const cropStorageExists = await db.CropStorage.findOne({
    where: {
      userId,
      id: cropStorageId,
    },
  });
  if (cropStorageExists === null) {
    return res.json(
      errorRespSync({
        code: error.code.NOT_FOUND,
        msg: error.CROP_STORAGE_DOESNOT_EXISTS,
      })
    );
  }
  const t = await db.sequelize.transaction();
  try {
    await removeCropStorageFarmAndSegment(cropStorageId, t);
    await db.CropStorageCost.destroy(
      { where: { cropStorage: cropStorageId } },
      {
        transaction: t,
      }
    );
    await db.CropStorage.destroy(
      {
        where: {
          id: cropStorageId,
        },
      },
      { transaction: t }
    );
    await t.commit();
    return res.json(
      successRespSync({
        msg: success.CROP_STORAGE_DATA_DELETED,
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
