const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { errorRespSync, serverError, successRespSync } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { HarvestDataValidation } = require(rootPath +
  "/helpers/validators/harvesting");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const {
  validateFarmBelongsToUser,
  validateSegmentBelongsToUser,
  addHarvestingToFarm,
  addHarvestingToSegment,
  deleteHarvestingFarmAndSegment,
  validateTypeOfMethodBelongsToHarvestMethod,
  validateHarvestMethodBelongsToUser,
  validateCropType,
  validateResonForLoss,
  updateHarvestingToReasonForLoss,
  validateVarietyBelongsToUser,
  addHarvestingToVariety,
  deleteHarvestingVariety,
  addHarvestingToReasonForLoss,
  deleteHarvestingToReasonForLoss,
} = require("./utils");
const { getWeightUnit, allAdmins, createNotification, convertToHectares, convertToAlertsUnit } = require("../notification/utils");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");

/**
 * @swagger
 * /harvesting:
 *   post:
 *     description: Add new harvesting data for a user
 *     tags: [Harvesting]
 *     requestBody:
 *       description: Request body for creting new harvesting data
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
 *            example: { "farmId": [ 1 ], "area": 5, "cropType": 49, "cropVariety": [ 2 ], "start_date_harvesting": "05/02/2022", "end_date_harvesting": "10/02/2022", "daysHarvesting": 5, "totalFreshYield": 5, "totalDryYield": 5, "total_planned_fresh_yield": 8, "total_planned_dry_yield": 1, "yieldForHouseholdConsumption": 5, "yieldForSale": 5, "methodForHarvesting": 1, "manualHarvesting": 1, "mechanicalHarvesting": 1, "yieldLosses": 10, "resonForLoss": 1, "cropResidueManagement": 10, "recordId": "111111111111111" }
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
 *                   message: You have successfully added  harvesting Information.
 *                   data: {"id":11,"userId":128,"area":"5","cropType":49,"start_date_harvesting":"2022-01-01T18:30:00.000Z", "end_date_harvesting": "2022-01-05T18:30:00.000Z","daysHarvesting":"8","totalFreshYield":"8","totalDryYield":"8","total_planned_fresh_yield": "8","total_planned_dry_yield": "1","yieldForHouseholdConsumption":8,"yieldForSale":8,"methodForHarvesting":"1","manualHarvesting":1,"yieldLosses":8,"resonForLoss":1,"cropResidueManagement":5,"updatedAt":"2022-02-07T12:09:14.955Z","createdAt":"2022-02-07T12:09:14.955Z"}
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
 *                    {"success": false,"code": 422,"message": "Harvesting method origin selected does not belong to this user and is not added by admin."}
 *
 */
router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("Harvest"),
  HarvestDataValidation(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const { organization, id: userId, firstName, lastName } = req.user;
      const {
        farmId,
        segment,
        area,
        cropType,
        cropVariety,
        start_date_harvesting,
        end_date_harvesting,
        daysHarvesting,
        totalFreshYield,
        totalDryYield,
        total_planned_fresh_yield,
        total_planned_dry_yield,
        yieldForHouseholdConsumption,
        yieldForSale,
        methodForHarvesting,
        manualHarvesting,
        mechanicalHarvesting,
        yieldLosses,
        resonForLoss,
        cropResidueManagement,
        areaUnitId,
        totalFreshYieldUnitId,
        totalDryYieldUnitId,
        totalPlannedFreshYieldUnitId,
        totalPlannedDryYieldUnitId,
        yieldForSaleUnitId,
        cost,
        recordId,
      } = req.body;
      const set = {
        userId,
        area,
        cropType,
        start_date_harvesting,
        end_date_harvesting,
        daysHarvesting,
        totalFreshYield,
        totalDryYield,
        total_planned_fresh_yield,
        total_planned_dry_yield,
        yieldForHouseholdConsumption,
        yieldForSale,
        methodForHarvesting,
        manualHarvesting,
        mechanicalHarvesting,
        yieldLosses,
        cropResidueManagement,
        area_unit_id: areaUnitId,
        total_fresh_yield_unit_id: totalFreshYieldUnitId,
        total_dry_yield_unit_id: totalDryYieldUnitId,
        total_planned_fresh_yield_unit_id: totalPlannedFreshYieldUnitId,
        total_planned_dry_yield_unit_id: totalPlannedDryYieldUnitId,
        yield_for_sale_unit_id: yieldForSaleUnitId,
        recordId,
      };

      // if (farmId?.length) await validateFarmBelongsToUser(farmId, userId);
      // if (segment?.length) {
      //   await validateSegmentBelongsToUser(segment, userId);
      //   // await validateFarmsAndSegmentsPayloadData(segment, farmId, res);
      // }
      if (set?.cropType) {
        await validateCropType(set.cropType, userId);
      }
      if (cropVariety?.length)
        await validateVarietyBelongsToUser(cropVariety, userId);
      // if (set?.cropVariety) {
      //   await validateCropVariety(set.cropVariety, userId);
      // }
      if (resonForLoss?.length) {
        await validateResonForLoss(resonForLoss, userId);
      }
      await validateHarvestMethodBelongsToUser(methodForHarvesting, userId);
      if (set?.manualHarvesting || set?.mechanicalHarvesting)
        await validateTypeOfMethodBelongsToHarvestMethod(
          methodForHarvesting,
          manualHarvesting,
          mechanicalHarvesting,
          userId
        );

      const resultHarvest = await db.Harvest.create(set, {
        transaction: t,
      });
      if (farmId?.length)
        await addHarvestingToFarm(farmId, resultHarvest.id, t);
      if (segment?.length)
        await addHarvestingToSegment(segment, resultHarvest.id, t);
      if (cropVariety?.length)
        await addHarvestingToVariety(cropVariety, resultHarvest.id, t);
      if (cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = cost;
        const harvestCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          harvestId: resultHarvest.id,
        };
        await db.HarvestCost.create(harvestCost, {
          transaction: t,
        });
      }

      if (resonForLoss?.length) {
        await addHarvestingToReasonForLoss(resonForLoss, resultHarvest.id, t);
    }

      let harvestWhere = {
        organization
      }
      //  find crop
      const harvestCrop = await db.Option.findOne({
        attributes: ['id','region'],
        where: {
          id: cropType,
        }
      })
      if (harvestCrop) {
        harvestWhere.cropId = harvestCrop.id;
        harvestWhere.country = harvestCrop.region;
      }
      
      const alertCriteria = await db.HarvestAlert.findOne({
        where: harvestWhere,
        include: [
          {
            model: db.Option,
            as: 'crop',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: db.UnitsList,
            as: "unit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
        ],
      });

      if (alertCriteria) {
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

        // converts baseMaxAllowed to base weight / hector / year
        const maxAllowedPerKgHaYr = await getWeightUnit(+alertCriteria.maxAllowed, alertCriteria.unit)
        
        const harvestData = await db.Harvest.findAll({
          attributes: ['id', 'totalFreshYield', 'area'],
          where: {
            userId,
            cropType: alertCriteria.cropId,
            createdAt: {
              [Op.gte]: twelveMonthsAgo,
            },
          }
        })

        const totalHarvestPerKgHaYr = harvestData.reduce((ph, ch) => {
          // convert harvestYield to baseUnit
          const harvestYieldInKg = getWeightUnit(+ch.totalFreshYield, alertCriteria.unit)

          // convert area from acre to hector
          let areaInHector = ch.area;
          if(ch.area_unit_id == 10){ // 10 => unit in acre so convert into hectare;
            areaInHector = convertToHectares(ch.area)
          }
          return ph + harvestYieldInKg/areaInHector
        }, 0)

        let totalHarvest = await totalHarvestPerKgHaYr;


        //----- Newly added quantity kg/ha 
        let newHarvestQtyKgPerHA = 0;
        if(area){
          let newAreaInHectare = area;
          if(areaUnitId == 10){ // 10 => unit in acre so convert into hectare;
            newAreaInHectare = await convertToHectares(area);
          }
          newHarvestQtyKgPerHA = await parseFloat(totalFreshYield/newAreaInHectare);
        }

        totalHarvest +=await newHarvestQtyKgPerHA;

        if (maxAllowedPerKgHaYr < totalHarvest) {
          let totalReported = convertToAlertsUnit(totalHarvest, alertCriteria.unit) + ' ' + alertCriteria.unit.abbvr+'/ha/yr'
          let maxAllowedConverted = convertToAlertsUnit(maxAllowedPerKgHaYr, alertCriteria.unit) + ' ' + alertCriteria.unit.abbvr+'/ha/yr'
          const listRes = await allAdmins(organization);
          const farm = await db.user_farm.findOne({
            attributes: ['id', 'farmName'],
            where: { id: farmId[0] }
          })
          let title = "High production Alert!";
          let type = "crop_harvest";
          let message = `High production Alert! Farm: ${farm?.farmName}, Farmer: ${firstName} ${lastName}, Crop: ${alertCriteria.crop.name}, Total reported: ${totalReported}, Max allowed: ${maxAllowedConverted}`
          let notificationAdmin = {
            user: {
              id: userId,
            },
            body: {
              notify: 'admin',
              title,
              type,
              message,
              users: listRes,
            }
          }
          let notificationUser = {
            user: {
              id: userId,
            },
            body: {
              notify: 'user',
              title,
              type,
              message,
              users: [userId],
            }
          }
          if (alertCriteria.alertAdmin && alertCriteria.alertFarmer) {
            Promise.all([
              await createNotification(notificationAdmin),
              await createNotification(notificationUser)
            ])
          } else if (alertCriteria.alertAdmin) {
            await createNotification(notificationAdmin)
          } else if (alertCriteria.alertFarmer) {
            await createNotification(notificationUser)
          }
        }
      }
      await t.commit();
      return res.json(
        successRespSync({
          msg: success.HARVESTING_ADDED,
          data: resultHarvest,
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

/** @swagger
 * /harvesting/{id}:
 *   put:
 *     description: Update harvesting data for a user
 *     tags: [Harvesting]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *         type: string
 *     requestBody:
 *       description: Request body for updating harvesting data
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
 *            example: { "farmId": [ 1 ], "area": 5, "cropType": 49, "cropVariety": [ 2 ], "start_date_harvesting": "05/02/2022", "end_date_harvesting": "10/02/2022", "daysHarvesting": 5, "totalFreshYield": 5, "totalDryYield": 5, "total_planned_fresh_yield": 8, "total_planned_dry_yield": 1, "yieldForHouseholdConsumption": 5, "yieldForSale": 5, "methodForHarvesting": 1, "manualHarvesting": 1, "mechanicalHarvesting": 1, "yieldLosses": 10, "resonForLoss": 1, "cropResidueManagement": 10, "recordId": "111111111111111" }
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
 *                   message: Harvesting data has been updated successfully.
 *                   data: {"id":1,"userId":118,"area":"5","cropType":1,"start_date_harvesting":"2022-05-01T18:30:00.000Z","end_date_harvesting":"2022-05-01T18:30:00.000Z","daysHarvesting":"5","totalFreshYield":"5","totalDryYield":"5","total_planned_fresh_yield": "8","total_planned_dry_yield": "1","yieldForHouseholdConsumption":5,"yieldForSale":5,"methodForHarvesting":"1","manualHarvesting":1,"mechanicalHarvesting":null,"yieldLosses":10,"resonForLoss":1,"cropResidueManagement":10,"updatedAt":"2022-02-04T05:40:16.979Z","createdAt":"2022-02-04T05:40:16.979Z"}
 *        '404':
 *           description: Harvesting data does not exist
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
 *                    {"success": false,"code": 404,"message": "Harvesting data doesnot exist."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Farm Id selected does not belong to the user.)
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
 *                    {"success": false,"code": 422,"message": "Farm Id selected does not belong to the user."}
 *
 */
router.put(
  "/:id",
  auth,
  HarvestDataValidation(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const exists = await db.Harvest.findOne({
        where: {
          id: req.params.id,
          userId,
        },
      });
      if (exists === null) {
        return res.json(
          errorRespSync({
            code: error.code.NOT_FOUND,
            msg: error.HARVESTING_DATA_DOESNOT_EXISTS,
          })
        );
      }
      const {
        farmId,
        segment,
        area,
        cropType,
        cropVariety,
        start_date_harvesting,
        end_date_harvesting,
        daysHarvesting,
        totalFreshYield,
        totalDryYield,
        total_planned_fresh_yield,
        total_planned_dry_yield,
        yieldForHouseholdConsumption,
        yieldForSale,
        methodForHarvesting,
        manualHarvesting,
        mechanicalHarvesting,
        yieldLosses,
        resonForLoss,
        cropResidueManagement,
        areaUnitId,
        totalFreshYieldUnitId,
        totalDryYieldUnitId,
        totalPlannedFreshYieldUnitId,
        totalPlannedDryYieldUnitId,
        yieldForSaleUnitId,
        cost,
        recordId,
      } = req.body;
      const set = {
        userId,
        area,
        cropType,
        start_date_harvesting,
        end_date_harvesting,
        daysHarvesting,
        totalFreshYield,
        totalDryYield,
        total_planned_fresh_yield,
        total_planned_dry_yield,
        yieldForHouseholdConsumption,
        yieldForSale,
        methodForHarvesting,
        manualHarvesting,
        mechanicalHarvesting,
        yieldLosses,
        cropResidueManagement,
        area_unit_id: areaUnitId,
        total_fresh_yield_unit_id: totalFreshYieldUnitId,
        total_dry_yield_unit_id: totalDryYieldUnitId,
        total_planned_fresh_yield_unit_id: totalPlannedFreshYieldUnitId,
        total_planned_dry_yield_unit_id: totalPlannedDryYieldUnitId,
        yield_for_sale_unit_id: yieldForSaleUnitId,
        recordId,
      };
      // if (farmId?.length) await validateFarmBelongsToUser(farmId, userId);
      if (segment?.length) {
        await validateSegmentBelongsToUser(segment, userId);
      }

      await validateHarvestMethodBelongsToUser(methodForHarvesting, userId);
      if (set?.manualHarvesting || set?.mechanicalHarvesting)
        await validateTypeOfMethodBelongsToHarvestMethod(
          methodForHarvesting,
          manualHarvesting,
          mechanicalHarvesting,
          userId
        );

      if (set?.cropType) {
        await validateCropType(set.cropType, userId);
      }

      if (cropVariety?.length)
        await validateVarietyBelongsToUser(cropVariety, userId);

      if (resonForLoss?.length) {
        await validateResonForLoss(resonForLoss, userId);
      }

      if (!manualHarvesting) set.manualHarvesting = null;
      if (!mechanicalHarvesting) set.mechanicalHarvesting = null;
      if (!cropResidueManagement) set.cropResidueManagement = null;
      if (!yieldLosses) set.yieldLosses = null;
      if (!yieldForSale) set.yieldForSale = null;
      if (!yieldForHouseholdConsumption)
        set.yieldForHouseholdConsumption = null;
      if (!cropType) set.cropType = null;
      if (!cropVariety) set.cropVariety = null;

      const resultHarvest = await db.Harvest.update(
        set,
        {
          where: { id: req.params.id, userId: userId },
        },
        {
          transaction: t,
        }
      );

      await deleteHarvestingFarmAndSegment(req.params.id, t);
      await deleteHarvestingVariety(req.params.id, t);
      if (resonForLoss?.length) {
        await updateHarvestingToReasonForLoss(resonForLoss, req.params.id, t);
      }
      

      if (farmId?.length) await addHarvestingToFarm(farmId, req.params.id, t);
      if (segment?.length)
        await addHarvestingToSegment(segment, req.params.id, t);
      if (cropVariety?.length)
        await addHarvestingToVariety(cropVariety, req.params.id, t);

      await db.HarvestCost.destroy(
        { where: { harvestId: req.params.id } },
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
        const harvestCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          harvestId: req.params.id,
        };
        await db.HarvestCost.create(harvestCost, {
          transaction: t,
        });
      }

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.HARVERST_UPDATED,
          data: set,
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
 * /harvesting:
 *   get:
 *     description: Returns all harvesting data for a user
 *     tags: [Harvesting]
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
 *                   data: [{"id":1,"area":5,"cropType":49,"start_date_harvesting":"2022-01-01T18:30:00.000Z","end_date_harvesting":"2022-01-10T18:30:00.000Z","daysHarvesting":8,"totalFreshYield":8,"totalDryYield":8,"total_planned_fresh_yield": 8, "total_planned_dry_yield": 1,"yieldForHouseholdConsumption":8,"yieldForSale":8,"methodForHarvesting":1,"manualHarvesting":1,"mechanicalHarvesting":null,"yieldLosses":8,"resonForLoss":1,"cropResidueManagement":5,"createdAt":"2022-02-08T05:42:45.000Z","updatedAt":"2022-02-08T05:42:45.000Z","harvest_farm":[{"id":1,"farmName":"corbett farm"}],"harvest_segment":[],"harvesting_variety":[{"id":2,"name":"rice"}],"method_for_harvesting":{"id":1,"title":"Manual (hand) harvesting","harvest_method_type":[{"id":13,"name":"Blade cutter"},{"id":5,"name":"Axe"},{"id":14,"name":"Plucker"},{"id":6,"name":"Shears"},{"id":7,"name":"Rake"},{"id":8,"name":"Picker"},{"id":1,"name":"Knife"},{"id":9,"name":"Shovel"},{"id":2,"name":"Sickle"},{"id":10,"name":"Pitchfork"},{"id":3,"name":"Cutlass"},{"id":11,"name":"Hoe/digger"},{"id":12,"name":"Fruit harvesting net with blade"},{"id":4,"name":"Reaper"}]},"harvest_reason_for_loss":{"id":1,"name":"Pests"},"harvest_cropType":{"id":49,"name":"mangos"}}]
 *
 *
 */
router.get("/", auth, translation, validationErrorHandler, async (req, res) => {
  let { order } = req.query;
  try {
    let { page, limit, order } = req.query;
    let where = { userId: req.user.id };
    let query = {
      // raw: true,
      attributes: {
        exclude: [
          "userId",
          "area_unit_id",
          "total_fresh_yield_unit_id",
          "total_dry_yield_unit_id",
          "total_planned_fresh_yield_unit_id",
          "total_planned_dry_yield_unit_id",
          "yield_for_sale_unit_id",
        ],
      },
      include: [
        {
          model: db.user_farm,
          as: "harvest_farm",
          through: { model: db.HarvestingFarm, attributes: [] },
          attributes: ["id", "farmName"],
        },
        {
          model: db.Geofence,
          as: "harvest_segment",
          through: { model: db.HarvestingSegment, attributes: [] },
          attributes: ["id", "geofenceName", "farmId"],
        },
        {
          model: db.Crop,
          as: "harvesting_variety",
          through: { model: db.harvest_variety, attributes: [] },
          attributes: ["id", "name"],
        },
        {
          model: db.HarvestMethod,
          as: "method_for_harvesting",
          attributes: ["id", "title"],
          include: [
            {
              model: db.HarvestMethodType,
              as: "harvest_method_type",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: db.harvest_reason_for_loss,
          as: "harvest_reason_for_loss",
          through: { model: db.MapHarvestReasonForLoss, attributes: [] },
          attributes: ["id", "name"],
        },
        {
          model: db.Option,
          as: "harvest_cropType",
          attributes: ["id", "name"],
        },
        {
          model: db.UnitsList,
          as: "harvest_area_unit_id",
          attributes: ["id", "abbvr"],
        },
        {
          model: db.UnitsList,
          as: "harvest_total_fresh_yield_unit_id",
          attributes: ["id", "abbvr"],
        },
        {
          model: db.UnitsList,
          as: "harvest_total_dry_yield_unit_id",
          attributes: ["id", "abbvr"],
        },
        {
          model: db.UnitsList,
          as: "harvest_total_planned_fresh_yield_unit_id",
          attributes: ["id", "abbvr"],
        },
        {
          model: db.UnitsList,
          as: "harvest_total_planned_dry_yield_unit_id",
          attributes: ["id", "abbvr"],
        },
        {
          model: db.UnitsList,
          as: "harvest_yield_for_sale_unit_id",
          attributes: ["id", "abbvr"],
        },
        {
          model: db.HarvestCost,
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
      where,
    };
    if (req.query?.getAllData || req.query?.getAllData == 1) {
    } else if (notEmpty(page) && notEmpty(limit)) {
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    let orderBy = [["createdAt", "DESC"]];
    if (notEmpty(order)) {
      if (order === "asc") orderBy = [["harvest_farm", "farmName", "ASC"]];
      else if (order === "desc")
        orderBy = [["harvest_farm", "farmName", "DESC"]];
      else if (order === "date") orderBy = [["createdAt", "DESC"]];
    }
    query.order = orderBy;
    // fetch data from DB
    let result = await db.Harvest.findAll(query);
    result.map((a) => { 
      a.resonForLoss = a.resonForLoss ? [a.resonForLoss] : []
      return a
    })
    if (req.headers.lang && req.headers.lang != "en") {
      result = req.translateFunction(result, globalTranslationCache, {
        lvl1: false,
        lvl2: true,
        moduleName: "harvesting",
      });
    }

    return res.json(
      successRespSync({
        msg: result == null ? success.NO_RESPONSE : success.FETCH,
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
 * /harvesting/{id}:
 *   delete:
 *     description: Delete harvesting data for a user
 *     tags: [Harvesting]
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
 *                   message: Harvesting data has been deleted successfully.
 *                   data: {}
 *        '404':
 *           description: Harvest data does not exist
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
 *                    {"success": false,"code": 404,"message": "Harvest data does not exist."}
 *
 */
router.delete("/:id", auth, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const harvesting = await db.Harvest.findOne({
      where: {
        userId,
        id,
      },
    });

    await deleteHarvestingToReasonForLoss(id, t);
    await db.HarvestCost.destroy(
      { where: { harvestId: id } },
      {
        transaction: t,
      }
    );
    if (harvesting === null) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.HARVESTING_DATA_DOESNOT_EXISTS,
        })
      );
    }
    await db.Harvest.destroy(
      {
        where: {
          userId,
          id,
        },
      },
      { transaction: t }
    );

    await deleteHarvestingFarmAndSegment(id, t);

    await t.commit();
    return res.json(
      successRespSync({
        msg: success.HARVEST_DELETED,
        data: {},
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
module.exports = router;
