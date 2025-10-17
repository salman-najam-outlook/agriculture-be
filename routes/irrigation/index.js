const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const handleEmptyValue = require(rootPath + "/middleware/handleEmptyValue");
const translation = require(rootPath + "/middleware/translation");
const db = require(rootPath + "/models");
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { irrigationDataValidator } = require(rootPath +
  "/helpers/validators/irrigation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const {
  validateFarmBelongsToUser,
  validateSegmentBelongsToUser,
  validateIrrigationWaterSource,
  validateIrrigationWaterSourceOrigin,
  validateIrrigationStage,
  validateOrCreateIrrigationTypeUpdated,
  validateIrrigationSchedule,
  addIrrigationToFarm,
  addIrrigationToSegment,
  removeIrrigationFarmAndSegmentAndCropVariety,
  removeIrrigationWaterSourcesAndOrigin,
  validateCropType,
  addCropVarietyToIrrigation,
  addIrrigationDates,
  addIrrigationWaterSources,
  addIrrigationWaterSourceOrigins,
  irrigationDefaultValues,
  transformIrrigationDataForListing,
  handleOtherIrrigationTypeUpdate,
} = require("./utils");
const { validateFarmsAndSegmentsPayloadData } = require("../equipment/utils");
const { ACTIVITY_TYPES } = require("../../constants/ACTIVITY_TYPES");
const { addIrrigationToTraceability, updateActivityToTraceability } = require(rootPath + "/helpers/autoTraceabilityHelper");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const { restructureResponseWithPlantations } = require(rootPath + "/helpers/restructurePlantationsResponse");

/**
 * @swagger
 * /irrigation:
 *   get:
 *     description: Returns all irrigation data for a user
 *     tags: [Irrigation]
 *     parameters:
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
 *                   data: [{"id": 4,"area": 2001,"cropId": 1,"cropVariety": 55,"waterSource": "Rainfed","irrigationWaterSource": 1,"irrigationWaterSourceOrigin": 3,"irrigatedArea": 120,"irrigation_dates": [{"date": "2022-11-10T00:00:00.000Z"}],"irrigationStage": 2,"irrigationSchedule": 1,"totalDays": "22.00","irrigationType": 1,"waterVolumeUsed": null,"createdAt": "2022-02-01T15:22:54.000Z","updatedAt": "2022-02-01T15:22:54.000Z","irrigation_cropVariety": [{"id": 48,"name": "blue peach","cropTypeOptId": 78}],"irrigation_schedule": {"id": 1, "name": "annual"},"irrigation_farm": [{ "id": 1,"farmName": "corbett farm"}],"irrigation_segment": [{"id": 2,"geofenceName": "Rice Segment"}],"irrigation_waterSource": {"id": 1,"name": "Ground Water"},"irrigation_waterSourceOrigin": {"id": 3,"name": "Well"},"irrigation_stage": {"id": 2,"name": " Sowing"},"irrigation_type": {"id": 1,"name": "Surface irrigation"}, "irrigation_cropType": {"id": 49,"name": "mangos"},"irrigation_crop": {"id": 55,"name": "blue java banana"}}]
 *
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
          model: db.user_farm,
          as: "irrigation_farm",
          through: { model: db.IrrigationFarm, attributes: [] },
          attributes: ["id", "farmName"],
        },
        {
          model: db.Geofence,
          as: "irrigation_segment",
          through: { model: db.IrrigationSegment, attributes: [] },
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
          model: db.Crop,
          as: "irrigation_cropVariety",
          through: { model: db.IrrigationCropVariety, attributes: [] },
          attributes: ["id", "name", "cropTypeOptId"],
        },
        {
          model: db.IrrigationWaterSource,
          as: "irrigation_waterSource",
          attributes: ["id", "name"],
        },
        {
          model: db.IrrigationDate,
          as: "irrigation_dates",
          attributes: ["date"],
        },
        {
          model: db.IrrigationSchedule,
          as: "irrigation_schedule",
          attributes: ["id", "name"],
        },
        {
          model: db.IrrigationWaterSourceOrigin,
          as: "irrigation_waterSourceOrigin",
          attributes: ["id", "name"],
        },
        {
          model: db.IrrigationStage,
          as: "irrigation_stage",
          attributes: ["id", "name"],
        },
        {
          model: db.IrrigationType,
          as: "irrigation_type",
          attributes: ["id", "name"],
        },
        {
          model: db.IrrigationTypeUpdated,
          as: "irrigation_type_updated",
          attributes: ["id", "name"],
        },
        {
          model: db.Option,
          as: "irrigation_cropType",
          attributes: ["id", "name"],
        },
        {
          model: db.IrrigationCost,
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
        // {
        //   model: db.Option,
        //   as: 'water_source',
        //   attributes: ['id', 'name'],
        // },
        {
          model: db.PlantationTraceability,
          as: 'traceability',
          include: [
            {
              model: db.Sowing,
              as: 'sowing',
              include: [
                {
                  model: db.Crop,
                },
                {
                  model: db.Option,
                },
              ],
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
    if (notEmpty(order) && order === "asc") {
      query.order = [["createdAt", "asc"]];
    } else {
      query.order = [["createdAt", "desc"]];
    }
    let irrigationData = await db.Irrigation.findAll(query);
    irrigationData = req.translateFunction(
      irrigationData,
      globalTranslationCache,
      {
        lvl1: false,
        lvl2: true,
        moduleName: "irrigation",
      }
    );
    
    irrigationData = await transformIrrigationDataForListing(irrigationData, req.user.id);
    
    irrigationData = restructureResponseWithPlantations(irrigationData);
    
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: irrigationData,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /irrigation:
 *   post:
 *     description: Add new irrigation data for a user
 *     tags: [Irrigation]
 *     requestBody:
 *       description: Request body for creting new irrigation data
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                image:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              {"farm": [1], "segment": [4],"area": 2001,"waterSource": "Rainfed","irrigationWaterSource": 1,"irrigationDate": ["2022-11-10", "2022-11-10"],"irrigationStage": 2,"irrigationSchedule": 1,"totalDays": 22,"irrigationType": 1,"cropId": 55,"cropVariety": [55],"irrigationWaterSourceOrigin": 3,"irrigatedArea": 120, "waterVolumeUsed": 200, "recordId":"123Abc"}
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
 *                   data: {"id": 5,"area": "2001","waterSource": "Rainfed","irrigationWaterSources": [1],"irrigationDate": ["2022-11-10"],"irrigationStage": "2","irrigationSchedule": 1,"totalDays": "22","irrigationType": "1","cropId": 1,"cropVariety": 55,"irrigationWaterSourceOrigin": [3],"irrigatedArea": 120,"userId": 17,"updatedAt": "2022-02-01T15:33:55.808Z","createdAt": "2022-02-01T15:33:55.808Z"}
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
 *                    {"success": false,"code": 422,"message": "Irrigation water source origin selected doesnot belong to this user and is not added by admin."}
 *
 */
router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("Irrigation"),
  // irrigationDataValidator(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      let bodyObj = JSON.parse(JSON.stringify(req.body));
      req.body = handleEmptyValue(bodyObj);
      const userId = req.user.id;
      const { farm, segment, cropVariety } = req.body;
      const irrigationData = ({
        area,
        waterSource,
        waterSourceUpdated,
        irrigationWaterSource = null,
        irrigationWaterSources,
        irrigationStage,
        irrigationSchedule,
        irrigationDate,
        totalDays,
        irrigationType,
        irrigationTypeUpdated,
        otherIrrigationType,
        cropId,
        irrigationWaterSourceOrigin = null,
        irrigationWaterSourceOrigins,
        irrigatedArea,
        waterVolumeUsed,
        cost,
        recordId,
        plantationIds,
      } = req.body);
      // if(irrigationWaterSourceOrigin == '') {
      //   irrigationData.irrigationWaterSourceOrigin = null
      // }
      irrigationData.userId = userId;
      if (farm?.length) await validateFarmBelongsToUser(farm, userId);
      if (segment?.length) {
        await validateSegmentBelongsToUser(segment, userId);
        await validateFarmsAndSegmentsPayloadData(segment, farm, res);
      }
      if (irrigationData?.cropId) {
        await validateCropType(irrigationData.cropId, userId);
      }

      if (
        irrigationData.irrigationWaterSources &&
        irrigationData.irrigationWaterSources.length
      ) {
        await validateIrrigationWaterSource(
          irrigationData.irrigationWaterSources,
          userId
        );
      }
      // if (irrigationData.waterSource && irrigationData.waterSource.length) {
      //   await validateIrrigationWaterSource(
      //     irrigationData.waterSource,
      //     userId
      //   );
      // }
      if (
        irrigationData.irrigationWaterSourceOrigins &&
        irrigationData.irrigationWaterSourceOrigins.length
      ) {
        await validateIrrigationWaterSourceOrigin(
          irrigationData.irrigationWaterSourceOrigins,
          userId,
          irrigationData.irrigationWaterSources
        );
      }
      await validateIrrigationStage(irrigationData.irrigationStage);
      
      // Handle irrigation type - support both old and new systems
      // Fix Sequelize alias conflict by renaming the field
      let customIrrigationTypes = null;
      if (irrigationData.otherIrrigationType) {
        customIrrigationTypes = irrigationData.otherIrrigationType;
        delete irrigationData.otherIrrigationType; // Remove to avoid Sequelize alias conflict
      }
      
      if (irrigationData.irrigationTypeUpdated || customIrrigationTypes) {
        // Use new system with separate arrays for subcategory IDs and custom names
        const irrigationTypeIds = await validateOrCreateIrrigationTypeUpdated(
          irrigationData.irrigationTypeUpdated, 
          null, // Don't handle custom types here anymore
          userId
        );
        irrigationData.irrigationTypeUpdated = irrigationTypeIds;
        irrigationData.irrigationType = null; // Keep old field nullable
      } else if (irrigationData.irrigationType) {
        // Use old system
        irrigationData.irrigationTypeUpdated = null;
      }
      
      await validateIrrigationSchedule(
        irrigationData.irrigationSchedule,
        userId
      );
      const irrigation = await db.Irrigation.create(irrigationData, {
        transaction: t,
      });

      // Handle custom irrigation types
      if (customIrrigationTypes) {
        await handleOtherIrrigationTypeUpdate(customIrrigationTypes, userId, t);
      }

      // Add irrigation activity to plantation traceability
      await addIrrigationToTraceability(irrigation, plantationIds, t);

      if (
        irrigationData.irrigationWaterSources &&
        irrigationData.irrigationWaterSources.length
      ) {
        await addIrrigationWaterSources(
          irrigation.id,
          irrigationData.irrigationWaterSources,
          t
        );
        await addIrrigationWaterSourceOrigins(
          irrigation.id,
          irrigationData.irrigationWaterSourceOrigins,
          t
        );
      }
      await addIrrigationDates(irrigation.id, irrigationData.irrigationDate, t);
      if (cropVariety?.length)
        await addCropVarietyToIrrigation(irrigation.id, cropVariety, t);
      if (farm?.length) await addIrrigationToFarm(farm, irrigation.id, t);
      if (segment?.length)
        await addIrrigationToSegment(segment, irrigation.id, t);

      if (cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = cost;
        const irrigationCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          irrigationId: irrigation.id,
        };
        await db.IrrigationCost.create(irrigationCost, {
          transaction: t,
        });
      }

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.IRRIGATION_DATA_CREATED,
          data: irrigation,
        })
      );
    } catch (err) {
      console.log(err)
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
 * /irrigation/:id:
 *   put:
 *     description: Update irrigation data for a user
 *     tags: [Irrigation]
 *     requestBody:
 *       description: Request body for updating irrigation data
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                image:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              {"farm": [1, 2], "segment": [12],"area": 2001,"waterSource": "Rainfed","irrigationWaterSource": 1,"irrigationDate": ["2022-11-10"],"irrigationStage": 2,"irrigationSchedule": 1,"totalDays": 22,"irrigationType": 1,"cropId": 1,"cropVariety": [55],"irrigationWaterSourceOrigin": 3,"irrigatedArea": 120, "waterVolumeUsed": 200}
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
 *                   message: Irrigation data has been updated successfully.
 *                   data: {"area": "2001","waterSource": "Rainfed","irrigationWaterSource": "1","irrigationDate": ["2022-11-10"],"irrigationStage": "2","irrigationSchedule": 1,"totalDays": "22","irrigationType": "1","cropId": 2,"cropVariety": 55,"irrigationWaterSourceOrigin": 3,"irrigatedArea": 120,"userId": 17}
 *        '404':
 *           description: Irrigation data doesnot exist
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
 *                    {"success": false,"code": 404,"message": "Irrigation data doesnot exist."}
 *
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
 *                    {"success": false,"code": 422,"message": "Irrigation water source origin selected doesnot belong to this user and is not added by admin."}
 *
 */
router.put(
  "/:id",
  auth,
  // irrigationDataValidator(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const irrigationDataId = req.params.id;
      const exists = await db.Irrigation.findOne({
        where: {
          id: irrigationDataId,
          userId,
        },
      });
      if (exists === null) {
        return res.json(
          errorRespSync({
            code: error.code.NOT_FOUND,
            msg: error.IRRIGATION_DATA_DOESNOT_EXISTS,
          })
        );
      }
      const { farm, segment, cropVariety } = req.body;
      let irrigationData = ({
        area,
        waterSource,
        waterSourceUpdated,
        irrigationWaterSource = null,
        irrigationWaterSources,
        irrigationStage,
        irrigationSchedule,
        totalDays,
        irrigationType,
        irrigationTypeUpdated,
        options,
        irrigationDate,
        cropId,
        irrigationWaterSourceOrigin = null,
        irrigationWaterSourceOrigins,
        irrigatedArea,
        waterVolumeUsed,
        cost,
        recordId,
        plantationIds,
      } = req.body);
      irrigationData.userId = userId;

      if (!irrigationData.irrigationWaterSource) {
        irrigationData.irrigationWaterSource = null;
      }
      if (!irrigationData.irrigationWaterSourceOrigin) {
        irrigationData.irrigationWaterSourceOrigin = null;
      }
      if (farm?.length) await validateFarmBelongsToUser(farm, userId);
      if (segment?.length) {
        await validateSegmentBelongsToUser(segment, userId);
        await validateFarmsAndSegmentsPayloadData(segment, farm, res);
      }
      if (irrigationData?.cropId) {
        await validateCropType(irrigationData.cropId, userId);
      }

      if (
        irrigationData.irrigationWaterSources &&
        irrigationData.irrigationWaterSources.length
      ) {
        await validateIrrigationWaterSource(
          irrigationData.irrigationWaterSources,
          userId
        );
      }
      if (
        irrigationData.irrigationWaterSourceOrigins &&
        irrigationData.irrigationWaterSourceOrigins.length
      ) {
        await validateIrrigationWaterSourceOrigin(
          irrigationData.irrigationWaterSourceOrigins,
          userId,
          irrigationData.irrigationWaterSources
        );
      }

      await validateIrrigationStage(irrigationData.irrigationStage);
      
      // Handle irrigation type - support both old and new systems
      // Fix Sequelize alias conflict by renaming the field
      let customIrrigationTypes = null;
      if (irrigationData.otherIrrigationType) {
        customIrrigationTypes = irrigationData.otherIrrigationType;
        delete irrigationData.otherIrrigationType; // Remove to avoid Sequelize alias conflict
      }
      
      if (irrigationData.irrigationTypeUpdated || customIrrigationTypes) {
        // Use new system with separate arrays for subcategory IDs and custom names
        const irrigationTypeIds = await validateOrCreateIrrigationTypeUpdated(
          irrigationData.irrigationTypeUpdated, 
          null, // Don't handle custom types here anymore
          userId
        );
        irrigationData.irrigationTypeUpdated = irrigationTypeIds;
        irrigationData.irrigationType = null; // Keep old field nullable
      } else if (irrigationData.irrigationType) {
        // Use old system
        irrigationData.irrigationTypeUpdated = null;
      }
      
      await validateIrrigationSchedule(
        irrigationData.irrigationSchedule,
        userId
      );
      const irrigation = await db.Irrigation.update(
        irrigationData,
        {
          where: {
            id: irrigationDataId,
          },
        },
        { transaction: t }
      );

      // Handle custom irrigation types
      if (customIrrigationTypes) {
        await handleOtherIrrigationTypeUpdate(customIrrigationTypes, userId, t);
      }

      const activityData = {
        id: irrigationDataId,
        userId: userId,
        activity_type: ACTIVITY_TYPES.IRRIGATION,
        activity_date: irrigationData.irrigationDate || irrigationData.createdAt
      }

      // update nutrient management activity to plantation traceability
      await updateActivityToTraceability(activityData, plantationIds, t);


      await removeIrrigationFarmAndSegmentAndCropVariety(irrigationDataId, t);
      await removeIrrigationWaterSourcesAndOrigin(irrigationDataId, t);

      await addIrrigationDates(
        irrigationDataId,
        irrigationData.irrigationDate,
        t
      );
      if (cropVariety?.length)
        await addCropVarietyToIrrigation(irrigationDataId, cropVariety, t);
      if (farm?.length) await addIrrigationToFarm(farm, irrigationDataId, t);
      if (segment?.length)
        await addIrrigationToSegment(segment, irrigationDataId, t);

      if (
        irrigationData.irrigationWaterSources &&
        irrigationData.irrigationWaterSources.length
      ) {
        await addIrrigationWaterSources(
          irrigation.id,
          irrigationData.irrigationWaterSources,
          t
        );
        await addIrrigationWaterSourceOrigins(
          irrigation.id,
          irrigationData.irrigationWaterSourceOrigins,
          t
        );
      }

      await db.IrrigationCost.destroy(
        { where: { irrigationId: irrigationDataId } },
        {
          transaction: t,
        }
      );
      if (irrigationData.cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = irrigationData.cost;
        const irrigationCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          irrigationId: irrigationDataId,
        };
        await db.IrrigationCost.create(irrigationCost, {
          transaction: t,
        });
      }

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.IRRIGATION_DATA_UPDATED,
          data: irrigationData,
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
 * /irrigation/{id}:
 *   delete:
 *     description: Delete irrigation data for a user
 *     tags: [Irrigation]
 *     parameters:
 *       - in: path
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
 *                   message: Irrigation data has been deleted successfully.
 *                   data: {}
 *        '404':
 *           description: Irrigation data doesnot exist
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
 *                    {"success": false,"code": 404,"message": "Irrigation data doesnot exist."}
 *
 */
router.delete("/:id", auth, async (req, res) => {
  const irrigationDataId = req.params.id;
  const userId = req.user.id;
  const irrigation = await db.Irrigation.findOne({
    where: {
      userId,
      id: irrigationDataId,
    },
  });
  if (irrigation === null) {
    return res.json(
      errorRespSync({
        code: error.code.NOT_FOUND,
        msg: error.IRRIGATION_DATA_DOESNOT_EXISTS,
      })
    );
  }
  const t = await db.sequelize.transaction();
  try {
    await removeIrrigationFarmAndSegmentAndCropVariety(irrigationDataId, t);
    await removeIrrigationWaterSourcesAndOrigin(irrigationDataId, t);
    await db.IrrigationCost.destroy(
      { where: { irrigationId: irrigationDataId } },
      {
        transaction: t,
      }
    );
    await db.Irrigation.destroy(
      {
        where: {
          id: irrigationDataId,
        },
      },
      { transaction: t }
    );
    await t.commit();
    return res.json(
      successRespSync({
        msg: success.IRRIGATION_DATA_DELETED,
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
module.exports = router;
