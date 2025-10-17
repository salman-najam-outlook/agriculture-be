const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successResp, successRespSync } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const validate = require(rootPath + "/helpers/validation.js");
const { Op } = require("sequelize");

const {
  CreateUserNotification,
  SendNotificationToMultipleDevices,
} = require(rootPath + "/helpers/systemNotifications");
const moment = require("moment");
const { ACTIVITY_TYPES } = require("../../../constants/ACTIVITY_TYPES");
const { updateActivityToTraceability, addPestManagementToTraceability } = require(rootPath + "/helpers/autoTraceabilityHelper");
const { restructureResponseWithPlantations } = require(rootPath + "/helpers/restructurePlantationsResponse");


const includeAssociations = [
  // with multiple option table start
  {
    model: db.CropStage,
    as: "cropStage",
    attributes: ["id", "name"],
  },
  {
    model: db.Crop,
    as: "cropVarieties",
    attributes: ["id", "name"],
    through: { attributes: [] },
  },
  {
    model: db.PlantPart,
    as: "pestManagementAffectedPlantParts",
    attributes: ["id", "name"],
    through: {
      attributes: [],
      model: db.PestManagementAffectedPlantPart,
    },
  },
  {
    model: db.PestType,
    as: "pestTypes",
    attributes: ["id", "name"],
    through: {
      attributes: [],
      model: db.PestManagementPestType,
    },
  },
  {
    model: db.PestInfestationSymptom,
    as: "pestManagementInfestationSymptoms",
    attributes: ["id", "name", "pestTypeId"],
    through: {
      attributes: [],
      model: db.PestManagementInfestationSymptom,
    },
  },
  {
    model: db.PestControlType,
    as: "pestControlType",
    attributes: ["id", "name", "hasOptions"],
  },
  {
    model: db.PestControlTypeOptions,
    as: "PestControlTypeOption",
    attributes: ["id", "name"],
  },
  {
    model: db.user_farm,
    as: "pestManagementFarms",
    through: { model: db.PestManagementFarm, attributes: [] },
    attributes: ["id", "farmName", "registrationNo"],
  },
  {
    model: db.Geofence,
    as: "pestManagementSegments",
    through: { model: db.PestManagementSegment, attributes: [] },
    attributes: ["id", "geofenceName", "farmId"],
    include: [
      {
        model: db.user_farm,
        as: "farm",
        attributes: ["id", "farmName"],
      },
    ],
  },
  // with option table ends
  {
    model: db.Option,
    as: "cropType",
    attributes: ["id", "name"],
  },
  {
    model: db.UnitsList,
    as: "areaUnit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.PestCulturalManualMethod,
    as: "culturalManualMethod",
    attributes: ["id", "name"],
  },
  {
    model: db.PestManagementOtherControlDate,
    as: "otherDatesOfPestControl",
    attributes: ["date"],
  },
  {
    model: db.PestManagementChemicalPesticidesType,
    as: "pestChemicalPesticidesTypes",
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: db.Currency,
        as: "currency",
      },
      {
        model: db.UnitsList,
        as: "pesticideQuantityUnit",
        attributes: ["id", "name", "abbvr", "unitType", "factor"],
      },
      {
        model: db.UnitsList,
        as: "pesticideDoseRateUnit",
        attributes: ["id", "name", "abbvr", "unitType", "factor"],
      },
      {
        model: db.Option,
        as: "applicationMethod",
        attributes: ["id", "name"],
      },
      {
        model: db.PestManagementChemicalMixture,
        as: "mixtures",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
          {
            model: db.UnitsList,
            as: "quantityUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
        ],
      },
    ],
  },
  {
    model: db.PestManagementCost,
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
  {
    model: db.PlantationTraceability,
    as: 'traceability',
    attributes: ['id', 'plantation_id', 'activity_type', 'activity_id', 'activity_date'],
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
];

/**
 * @swagger
 * /pest/management/list:
 *   get:
 *     description: List all registered pest management
 *     tags: [Pest Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *     responses:
 *       200:
 *         description: On success response if data is present related to pest management.
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
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                   count: 1
 *                   rows: [
 *                      {
 *                        actualDaysAfterPestDetection: 5,
 *                        area: 100,
 *                        areaUnitId: 11,
 *                        cropStageId: 1,
 *                        cropTypeId: 10,
 *                        cropVarietyId: 4,
 *                        dateOfFirstPestDetection: "2022-03-10T00:00:00.000Z",
 *                        id: 9,
 *                        numberOfPlantsAffected: 10,
 *                        pestControlTypeId: null,
 *                        pestTypeId: 1,
 *                        createdAt: "2022-06-14T09:15:19.000Z",
 *                        updatedAt: "2022-06-14T09:15:19.000Z",
 *                        cropStage: {
 *                          id: 1,
 *                          name: "Days after sowing when pest was detected"
 *                        },
 *                        applicationMethods: [
 *                          {
 *                            id: 190,
 *                            name: "Annually (5 points)"
 *                          }
 *                        ],
 *                        pestManagementAffectedPlantParts: [
 *                          {
 *                            id: 1,
 *                            name: "Leaves"
 *                          },
 *                          {
 *                            id: 2,
 *                            name: "Stem"
 *                          }
 *                        ],
 *                        pestManagementInfestationSymptoms: [
 *                          {
 *                            id: 1,
 *                            name: "Holes on leaves/fruits/grain"
 *                          },
 *                          {
 *                            id: 2,
 *                            name: "Rolled and curied leaves"
 *                          }
 *                        ],
 *                        pestControlTypes: [
 *                          {
 *                            id: 1,
 *                            name: "Cultural/Natural"
 *                          }
 *                        ],
 *                        pestManagementPestControlTypes: [
 *                          {
 *                            chemicalAppliedArea: 30,
 *                            chemicalAppliedAreaUnitId: null,
 *                            chemicalInsecticides: null,
 *                            culturalManualMethodArea: null,
 *                            culturalManualMethodAreaUnitId: null,
 *                            culturalManualMethodId: null,
 *                            id: 1,
 *                            insecticideActiveIngredients: null,
 *                            insecticideDose: null,
 *                            insecticideDoseUnitId: null,
 *                            insecticideEfficacy: null,
 *                            otherDatesOfPestControl: null,
 *                            pestControlDuration: null,
 *                            pestControlTypeId: 1,
 *                            pestManagementId: 9,
 *                            startOfPestControl: null,
 *                            totalInsecticideUsed: null,
 *                            totalInsecticideUsedUnitId: null,
 *                            createdAt: "2022-06-14T09:15:19.000Z",
 *                            updatedAt: "2022-06-14T09:15:19.000Z",
 *                            chemicalAppliedAreaUnit: null,
 *                            culturalManualMethodAreaUnit: null,
 *                            insecticideDoseUnit: null,
 *                            totalInsecticideUsedUnit: null
 *                          }
 *                        ],
 *                        pestType: {
 *                          id: 1,
 *                          name: "Aphids"
 *                        },
 *                        pestManagementFarms: [{id: 406, farmName: 'Sams farm', registrationNo: "ASABBBG45566"}],
 *                        pestManagementSegments: [{id: 148, geofenceName: 'test', farmId: 521, farm: {id: 521, farmName: 'cacac'}}],
 *                        cropType: {
 *                          id: 10,
 *                          name: "micronutrient"
 *                        },
 *                        areaUnit: {
 *                          id: 11,
 *                          name: "Hectares",
 *                          abbvr: "hectares",
 *                          unitType: 5,
 *                          factor: "2.4710500000"
 *                        }
 *                      }
 *                    ]
 */
router.get(
  "/list",
  auth,
  translation,
  validate.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page = 1, limit = 10, col = "id", desc = "true" } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);
      let pestManagementList = await db.PestManagement.findAndCountAll({
        attributes: {
          exclude: ["userId"],
        },
        where: { userId },
        offset: (page - 1) * limit,
        limit: limit,
        distinct: true,
        order: [[col, desc == "false" ? "ASC" : "DESC"]],
        include: includeAssociations,
      });

      if (req.headers.lang && req.headers.lang != "en") {
        pestManagementList.rows = req.translateFunction(pestManagementList.rows, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
          moduleName: "pest/management",
        });
      }

        // Restructure response with plantations array
    const restructuredData = restructureResponseWithPlantations(pestManagementList.rows);



      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: restructuredData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  "/chemicalPesticidesType/list",
  auth,
  validate.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { id: userId } = req.user;
      let pestManagementChemicalPesticidesType =
        await db.PestManagementChemicalPesticidesType.findAll({
          // attributes: {
          //   exclude: ["userId"],
          // },
          include: [
            {
              model: db.Currency,
              as: "currency",
            },
            {
              model: db.UnitsList,
              as: "pesticideQuantityUnit",
              attributes: ["id", "name", "abbvr", "unitType", "factor"],
            },
            {
              model: db.UnitsList,
              as: "pesticideDoseRateUnit",
              attributes: ["id", "name", "abbvr", "unitType", "factor"],
            },
            {
              model: db.Option,
              as: "applicationMethod",
              attributes: ["id", "name"],
            },
            {
              model: db.PestControlTypeOptions,
              as: "PestControlTypeOption",
              attributes: ["id", "name"],
            },
            {
              model: db.PestManagementChemicalMixture,
              as: "mixtures",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.Currency,
                  as: "currency",
                },
                {
                  model: db.UnitsList,
                  as: "quantityUnit",
                  attributes: ["id", "name", "abbvr", "unitType", "factor"],
                },
              ],
            },
          ],
          where: { userId },
        });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: pestManagementChemicalPesticidesType,
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
 * /pest/management:
 *   post:
 *     description: Register peset management
 *     tags: [Pest Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: register pest management details
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                actualDaysAfterPestDetection:
 *                  type: integer
 *                area:
 *                  type: integer
 *                areaUnitId:
 *                  type: integer
 *                cropStageId:
 *                  type: integer
 *                cropTypeId:
 *                  type: integer
 *                cropVarietyId:
 *                  type: integer
 *                dateOfFirstPestDetection:
 *                  type: string
 *                farmId:
 *                  type: integer
 *                numberOfPlantsAffected:
 *                  type: integer
 *                pestControlTypeId:
 *                  type: integer
 *                pestControlTypeOptionId:
 *                  type: integer
 *                pestTypeId:
 *                  type: integer
 *                affectedPlantParts:
 *                    type: interger
 *                applicationMethods:
 *                    type: float
 *                pestControlTypes:
 *                    type: array
 *                    items:
 *                      type: object
 *                pestInfestationSymptoms:
 *                    type: array
 *              example:
 *                actualDaysAfterPestDetection: 5
 *                area: 100
 *                areaUnitId: 11
 *                cropStageId: 1
 *                cropTypeId: 10
 *                cropVarieties: [4]
 *                dateOfFirstPestDetection: "10/03/2022"
 *                farmIds: [4]
 *                segmentIds: [2]
 *                numberOfPlantsAffected: 10
 *                pestControlTypeId: 1
 *                pestControlTypeOptionId: 1
 *                pestTypeId: 1
 *                affectedPlantParts: [1, 2]
 *                applicationMethods: [190]
 *                pestControlTypes: [{
 *                  chemicalAppliedArea: 30,
 *                  chemicalAppliedAreaUnitId: 11,
 *                  chemicalInsecticides: "",
 *                  culturalManualMethodArea: 30,
 *                  culturalManualMethodAreaUnitId: 11,
 *                  culturalManualMethodId: 1,
 *                  insecticideActiveIngredients: "ingredient1",
 *                  insecticideDose: 2,
 *                  insecticideDoseUnitId: 11,
 *                  insecticideEfficacy: 11,
 *                  otherDatesOfPestControl: ["11/03/2022", "12/03/2022"],
 *                  pestControlDuration: 11,
 *                  pestControlTypeId: 1,
 *                  startOfPestControl: "11/03/2022",
 *                  totalInsecticideUsed: 10,
 *                  totalInsecticideUsedUnitId: 11
 *                }]
 *                pestInfestationSymptoms: [1, 2]
 *     responses:
 *       200:
 *         description: Successfully return the pre-signed url
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
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Soil management data saved successfully.
 *                  data: {
 *                    id: 1
 *                  }
 *
 */
router.post(
  "/",
  auth,
  // validatorPestMgmt.general(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let {
        affectedPlantParts = [],
        area,
        areaUnitId,
        cropStageId,
        cropTypeId,
        cropVarieties = [],
        dateOfFirstPestDetection,
        farmIds = [],
        numberOfPlantsAffected,
        pestInfestationSymptoms = [],
        pestTypes = [],
        pestControlTypeId,
        pestControlTypeOptionId,
        recordId,
        segmentIds = [],
        startOfPestControl,
        otherDatesOfPestControl = [],
        pestControlDuration,
        culturalManualMethodId,
        cost,
        pestChemicalPesticidesTypes,
        plantationIds = [],
      } = req.body;

      const transaction = await db.sequelize.transaction();

      try {
        const set = {
          area,
          areaUnitId,
          cropStageId,
          cropTypeId: cropTypeId || null,
          dateOfFirstPestDetection: dateOfFirstPestDetection
            ? moment.utc(dateOfFirstPestDetection, "DD/MM/YYYY")
            : null,
          numberOfPlantsAffected,
          recordId,
          userId,
          pestControlTypeId,
          pestControlTypeOptionId,
          startOfPestControl: startOfPestControl
            ? moment.utc(startOfPestControl, "DD/MM/YYYY")
            : null,
          pestControlDuration,
          culturalManualMethodId,
        };

        Object.keys(set).forEach((key) => {
          if (key === "cropTypeId") {
            // Keep cropTypeId even if null
            return;
          }
          set[key] == undefined || set[key] == null || set[key] == ""
            ? delete set[key]
            : {};
        });

        let pestManagement = await db.PestManagement.create(set, {
          transaction,
        });

        // add pest management to tracebility
        await addPestManagementToTraceability(pestManagement, plantationIds, transaction);


        if (farmIds && farmIds.length) {
          const pestManagementFarmsDataPromises = farmIds?.map(async (_farmId) => {
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
              }
            });
            if(_farm) {
              return {
                farmId: _farm.id,
                pestManagementId: pestManagement.id,
              };
            }
          });
          const pestManagementFarmsData = await Promise.all(pestManagementFarmsDataPromises);
          await db.PestManagementFarm.bulkCreate(pestManagementFarmsData, {
            transaction,
          });
        }

        if (segmentIds && segmentIds.length) {
          const pestManagementSegmentsDataPromise = segmentIds?.map(async (segmentId) => {
            const segment = await db.Geofence.findOne({
              where: {
                [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
              }
            });
            if(segment) {
              return {
                segmentId: segment.id,
                pestManagementId: pestManagement.id,
              };
            }
          });
          const pestManagementSegmentsData = await Promise.all(pestManagementSegmentsDataPromise);
          await db.PestManagementSegment.bulkCreate(
            pestManagementSegmentsData,
            {
              transaction,
            }
          );
        }

        //
        const otherDates = otherDatesOfPestControl?.map((date) => {
          return {
            date: moment.utc(date, "DD/MM/YYYY"),
            pestManagementId: pestManagement.id,
          };
        });
        await db.PestManagementOtherControlDate.bulkCreate(otherDates, {
          transaction,
        });
        //

        //
        const cropVarietiesData = cropVarieties?.map((cropVariety) => {
          return {
            cropVarietyId: cropVariety,
            pestManagementId: pestManagement.id,
          };
        });
        await db.PestManagementCropVariety.bulkCreate(cropVarietiesData, {
          transaction,
        });
        //

        //
        const pestManagementAffectedPlantPartsData = affectedPlantParts?.map(
          (affectedPlantPart) => {
            return {
              plantPartId: affectedPlantPart,
              pestManagementId: pestManagement.id,
            };
          }
        );
        await db.PestManagementAffectedPlantPart.bulkCreate(
          pestManagementAffectedPlantPartsData,
          {
            transaction,
          }
        );
        //

        // Pests
        if (pestTypes && pestTypes.length) {
          let pests = [];
          for (const pest of pestTypes) {
            if (!pest.id) {
              const options = await db.Option.findOne({
                where: {
                  id: cropTypeId,
                },
              });
              const pestType = await db.PestType.create(
                {
                  cropName: options.dataValues.name,
                  name: pest?.name,
                  userId,
                },
                { transaction }
              );

              await db.PestTypeAndCropType.create(
                {
                  cropTypeId: cropTypeId,
                  pestTypeId: pestType.id,
                },
                { transaction }
              );

              if (pest?.symptoms?.length) {
                let symptoms = []
                for (const symptom of pest.symptoms) {
                  const pestSymptom = await db.PestInfestationSymptom.create(
                    {
                      pestTypeId: pestType.id,
                      name: symptom?.name,
                      userId,
                    },
                    { transaction }
                  );
                  symptoms.push({
                    pestManagementId: pestManagement.id,
                    pestInfestationSymptomId: pestSymptom.id,
                  })
                }
                await db.PestManagementInfestationSymptom.bulkCreate(
                  symptoms,
                  {
                    transaction,
                  }
                );
              }
              pests.push({
                pestManagementId: pestManagement.id,
                pestTypeId: pestType.id,
              });
            } else {
              pests.push({
                pestManagementId: pestManagement.id,
                pestTypeId: pest.id,
              });
            }
          }
          await db.PestManagementPestType.bulkCreate(pests, {
            transaction,
          });
        }

        // Symptoms
        if (pestInfestationSymptoms && pestInfestationSymptoms.length) {
          let infestationSymptoms = [];
          for (const symptom of pestInfestationSymptoms) {
            if (!symptom.id) {
              const pestSymptom = await db.PestInfestationSymptom.create(
                {
                  pestTypeId: symptom.pestTypeId,
                  name: symptom?.name,
                  userId,
                },
                { transaction }
              );

              infestationSymptoms.push({
                pestManagementId: pestManagement.id,
                pestInfestationSymptomId: pestSymptom.id,
              });
            } else {
              infestationSymptoms.push({
                pestManagementId: pestManagement.id,
                pestInfestationSymptomId: symptom.id,
              });
            }
          }
          await db.PestManagementInfestationSymptom.bulkCreate(
            infestationSymptoms,
            {
              transaction,
            }
          );
        }

        // Control Types
        if (pestChemicalPesticidesTypes && pestChemicalPesticidesTypes.length) {
          for (const input of pestChemicalPesticidesTypes) {
            if (input.pestManagementChemicalPesticideInputId) {
              await db.PestManagementChemicalPesticidesType.update({
                pestControlTypeOptionId
              }, {
                where: { id: input.pestManagementChemicalPesticideInputId },
                transaction,
              });
              await db.MapPestManagementAndChemicalPesticides.create(
                {
                  pestManagementChemicalPesticideInputId:
                    input.pestManagementChemicalPesticideInputId,
                  pestManagementId: pestManagement.id,
                },
                {
                  transaction,
                }
              );
            } else {
              const {
                pesticideName,
                cost,
                currencyId,
                pesticideQuantity,
                pesticideQuantityUnitId,
                pesticideActiveIngredient,
                pesticideDoseRate,
                pesticideDoseRateUnitId,
                applicationMethodId,
                mixtures,
              } = input;

              if (
                !input.pesticideName ||
                input.pesticideName.trim().length === 0
              ) {
                throw new Error(error.INVALID_PESTICIDE_NAME);
              }

              const existing =
                await db.PestManagementChemicalPesticidesType.findOne({
                  where: {
                    pesticideName: input.pesticideName,
                    userId,
                  },
                });

              if (existing) {
                await db.PestManagementChemicalPesticidesType.update({
                  pestControlTypeOptionId
                }, {
                  where: { id: existing.id, },
                  transaction,
                });
                await db.MapPestManagementAndChemicalPesticides.create(
                  {
                    pestManagementChemicalPesticideInputId:
                      existing.id,
                    pestManagementId: pestManagement.id,
                  },
                  {
                    transaction,
                  }
                );
              } else {
                const chemicalPesticidesTypesSet = {
                  pestManagementId: pestManagement.id,
                  pestControlTypeOptionId,
                  userId: userId,
                  pesticideName: pesticideName ?? null,
                  cost: cost ?? null,
                  currencyId: currencyId ?? null,
                  pesticideQuantity: pesticideQuantity ?? null,
                  pesticideQuantityUnitId: pesticideQuantityUnitId ?? null,
                  pesticideActiveIngredient: pesticideActiveIngredient ?? null,
                  pesticideDoseRate: pesticideDoseRate ?? null,
                  pesticideDoseRateUnitId: pesticideDoseRateUnitId ?? null,
                  applicationMethodId: applicationMethodId ?? null,
                };
                Object.keys(chemicalPesticidesTypesSet).forEach((key) => {
                  chemicalPesticidesTypesSet[key] == undefined ||
                    chemicalPesticidesTypesSet[key] == null ||
                    chemicalPesticidesTypesSet[key] == ""
                    ? delete chemicalPesticidesTypesSet[key]
                    : {};
                });

                const chemicalPesticide =
                  await db.PestManagementChemicalPesticidesType.create(
                    chemicalPesticidesTypesSet,
                    {
                      transaction,
                    }
                  );

                await db.MapPestManagementAndChemicalPesticides.create(
                  {
                    pestManagementChemicalPesticideInputId:
                      chemicalPesticide?.id || existing.id,
                    pestManagementId: pestManagement.id,
                  },
                  {
                    transaction,
                  }
                );

                if (mixtures && mixtures.length) {
                  const chemicalMixtures = mixtures.map((mixture) => {
                    let {
                      ingredientName,
                      percentage,
                      cost,
                      currencyId,
                      quantity,
                      quantityUnitId,
                    } = mixture;

                    return {
                      pestManagementChemicalTypeId: chemicalPesticide?.id || existing?.id,
                      ingredientName: ingredientName ?? null,
                      percentage: percentage ?? null,
                      cost: cost ?? null,
                      currencyId: currencyId ?? null,
                      quantity: quantity ?? null,
                      quantityUnitId: quantityUnitId ?? null,
                    };
                  });
                  await db.PestManagementChemicalMixture.bulkCreate(
                    chemicalMixtures,
                    {
                      transaction,
                    }
                  );
                }
              }
            }
          }
        }

        if (cost) {
          const pestManagementCost = {
            ...cost,
            pestManagementId: pestManagement.id,
          };
          await db.PestManagementCost.create(pestManagementCost, {
            transaction,
          });
        }

        await transaction.commit();

        const pestManagementData = await db.PestManagement.findOne({
          attributes: {
            exclude: ["userId"],
          },
          where: { id: pestManagement.id, userId },
          include: includeAssociations,
        });

        return res.json(
          await successResp({
            data: pestManagementData,
            msg: success.PEST_MANAGEMENT_DATA_ADDED,
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
 * /pest/management/update:
 *   put:
 *     description: Register peset management
 *     tags: [Pest Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: register pest management details
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                actualDaysAfterPestDetection:
 *                  type: integer
 *                area:
 *                  type: integer
 *                areaUnitId:
 *                  type: integer
 *                cropStageId:
 *                  type: integer
 *                cropTypeId:
 *                  type: integer
 *                cropVarietyId:
 *                  type: integer
 *                dateOfFirstPestDetection:
 *                  type: string
 *                farmId:
 *                  type: integer
 *                id:
 *                  type: integer
 *                numberOfPlantsAffected:
 *                  type: integer
 *                pestControlTypeId:
 *                  type: integer
 *                pestControlTypeOptionId:
 *                  type: integer
 *                pestTypeId:
 *                  type: integer
 *                affectedPlantParts:
 *                    type: interger
 *                applicationMethods:
 *                    type: float
 *                pestControlTypes:
 *                    type: array
 *                    items:
 *                      type: object
 *                pestInfestationSymptoms:
 *                    type: array
 *              example:
 *                actualDaysAfterPestDetection: 5
 *                area: 100
 *                areaUnitId: 11
 *                cropStageId: 1
 *                cropTypeId: 10
 *                cropVarieties: [4]
 *                dateOfFirstPestDetection: "10/03/2022"
 *                farmIds: [4]
 *                segmentIds: [1]
 *                id: 10
 *                numberOfPlantsAffected: 10
 *                pestControlTypeId: 1
 *                pestControlTypeOptionId: 1
 *                pestTypeId: 1
 *                affectedPlantParts: [1, 2]
 *                applicationMethods: [190]
 *                pestControlTypes: [{
 *                  chemicalAppliedArea: 30,
 *                  chemicalAppliedAreaUnitId: 11,
 *                  chemicalInsecticides: "",
 *                  culturalManualMethodArea: 30,
 *                  culturalManualMethodAreaUnitId: 11,
 *                  culturalManualMethodId: 1,
 *                  insecticideActiveIngredients: "ingredient1",
 *                  insecticideDose: 2,
 *                  insecticideDoseUnitId: 11,
 *                  insecticideEfficacy: 11,
 *                  otherDatesOfPestControl: ["11/03/2022", "12/03/2022"],
 *                  pestControlDuration: 11,
 *                  pestControlTypeId: 1,
 *                  startOfPestControl: "11/03/2022",
 *                  totalInsecticideUsed: 10,
 *                  totalInsecticideUsedUnitId: 11
 *                }]
 *                pestInfestationSymptoms: [1, 2]
 *     responses:
 *       200:
 *         description: Successfully return the pre-signed url
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
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Pest management data updated successfully.
 *                  data: {
 *                    id: 10
 *                  }
 *
 */
router.put(
  "/update",
  auth,
  // validatorPestMgmt.general(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let {
        affectedPlantParts = [],
        area,
        areaUnitId,
        cropStageId,
        cropTypeId,
        cropVarieties = [],
        dateOfFirstPestDetection,
        farmIds = [],
        id,
        numberOfPlantsAffected,
        pestInfestationSymptoms = [],
        pestTypes = [],
        recordId,
        segmentIds = [],
        startOfPestControl,
        pestControlTypeId,
        pestControlTypeOptionId,
        otherDatesOfPestControl = [],
        pestControlDuration,
        culturalManualMethodId,
        cost,
        pestChemicalPesticidesTypes,
        plantationIds = [],
      } = req.body;

      const transaction = await db.sequelize.transaction();

      try {
        const set = {
          area,
          areaUnitId,
          cropStageId,
          cropTypeId: cropTypeId || null,
          dateOfFirstPestDetection: dateOfFirstPestDetection
            ? moment.utc(dateOfFirstPestDetection, "DD/MM/YYYY")
            : null,
          numberOfPlantsAffected,
          recordId,
          userId,
          pestControlTypeId,
          pestControlTypeOptionId,
          startOfPestControl: startOfPestControl
            ? moment.utc(startOfPestControl, "DD/MM/YYYY")
            : null,
          pestControlDuration,
          culturalManualMethodId,
        };

        Object.keys(set).forEach((key) => {
          set[key] == undefined || set[key] == null || set[key] == ""
            ? delete set[key]
            : {};
        });

        await db.PestManagement.update(set, {
          where: { id },
          transaction,
        });

        const activityData = {
          id: id,
          userId: userId,
          activity_type: ACTIVITY_TYPES.PEST_MANAGEMENT,
          activity_date: moment.utc(dateOfFirstPestDetection, "DD/MM/YYYY") || new Date()
        }    
  
        // update disease management activity to plantation traceability
        await updateActivityToTraceability(activityData, plantationIds, transaction);
  

        await db.PestManagementFarm.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );


        if (farmIds && farmIds.length) {
          const pestManagementFarmsDataPromises = farmIds?.map(async (_farmId) => {
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
              }
            });
            if(_farm) {
              return {
                farmId: _farm.id,
                pestManagementId: id,
              };
            }
          });
          const pestManagementFarmsData = await Promise.all(pestManagementFarmsDataPromises);
          // Filter out null values before bulk create
          const filteredFarmsData = pestManagementFarmsData.filter(data => data !== null);
          if (filteredFarmsData.length > 0) {
            await db.PestManagementFarm.bulkCreate(filteredFarmsData, {
              transaction,
            });
          }
        }

        await db.PestManagementSegment.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );

        if (segmentIds && segmentIds.length) {
          const pestManagementSegmentsDataPromise = segmentIds?.map(async (segmentId) => {
            const segment = await db.Geofence.findOne({
              where: {
                [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
              }
            });
            if(segment) {
              return {
                segmentId: segment.id,
                pestManagementId: id,
              };
            }
          });
          const pestManagementSegmentsData = await Promise.all(pestManagementSegmentsDataPromise);
          // Filter out null values before bulk create
          const filteredSegmentsData = pestManagementSegmentsData.filter(data => data !== null);
          if (filteredSegmentsData.length > 0) {
            await db.PestManagementSegment.bulkCreate(
              filteredSegmentsData,
              {
              transaction,
            });
          }
        }

        //
        await db.PestManagementCropVariety.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );

        const cropVarietiesData = cropVarieties.map((cropVariety) => {
          return {
            cropVarietyId: cropVariety,
            pestManagementId: id,
          };
        });


        const filteredCropVarietiesData = cropVarietiesData.filter(data => data !== null);

        if (filteredCropVarietiesData.length > 0) {
            await db.PestManagementCropVariety.bulkCreate(filteredCropVarietiesData, {
            transaction,
          });
        }
        //

        //
        await db.PestManagementAffectedPlantPart.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );

        const pestManagementAffectedPlantPartsData = affectedPlantParts.map(
          (affectedPlantPart) => {
            return {
              plantPartId: affectedPlantPart,
              pestManagementId: id,
            };
          }
        );

        const filteredAffectedPlantPartsData = pestManagementAffectedPlantPartsData.filter(data => data !== null);

        if (filteredAffectedPlantPartsData.length > 0) {
          await db.PestManagementAffectedPlantPart.bulkCreate(
            filteredAffectedPlantPartsData,
            {
            transaction,
          });
        }

        await db.PestManagementPestType.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );

        await db.PestManagementInfestationSymptom.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );


        // Pests
        if (pestTypes && pestTypes.length) {
          let pests = [];
          for (const pest of pestTypes) {
            if (!pest.id) {
              const options = await db.Option.findOne({
                where: {
                  id: cropTypeId,
                },
              });
              const pestType = await db.PestType.create(
                {
                  cropName: options.dataValues.name,
                  name: pest?.name,
                  userId,
                },
                { transaction }
              );

              await db.PestTypeAndCropType.create(
                {
                  cropTypeId: cropTypeId,
                  pestTypeId: pestType.id,
                },
                { transaction }
              );

              if (pest?.symptoms?.length) {
                let symptoms = []
                for (const symptom of pest.symptoms) {
                  const pestSymptom = await db.PestInfestationSymptom.create(
                    {
                      pestTypeId: pestType.id,
                      name: symptom?.name,
                      userId,
                    },
                    { transaction }
                  );
                  symptoms.push({
                    pestManagementId: id,
                    pestInfestationSymptomId: pestSymptom.id,
                  })
                }
                await db.PestManagementInfestationSymptom.bulkCreate(
                  symptoms,
                  {
                    transaction,
                  }
                );
              }

              pests.push({
                pestManagementId: id,
                pestTypeId: pestType.id,
              });
            } else {
              pests.push({
                pestManagementId: id,
                pestTypeId: pest.id,
              });
            }
          }
          
          const filteredPestsData = pests.filter(data => data !== null);
          if (filteredPestsData.length > 0) {
            await db.PestManagementPestType.bulkCreate(filteredPestsData, {
              transaction,
            });
          }
        }

        // Symptoms
        if (pestInfestationSymptoms && pestInfestationSymptoms.length) {
          let infestationSymptoms = [];
          for (const symptom of pestInfestationSymptoms) {
            if (!symptom.id) {
              const pestSymptom = await db.PestInfestationSymptom.create(
                {
                  pestTypeId: symptom.pestTypeId,
                  name: symptom?.name,
                  userId,
                },
                { transaction }
              );

              infestationSymptoms.push({
                pestManagementId: id,
                pestInfestationSymptomId: pestSymptom.id,
              });
            } else {
              infestationSymptoms.push({
                pestManagementId: id,
                pestInfestationSymptomId: symptom.id,
              });
            }
          }
          
          const filteredInfestationSymptomsData = infestationSymptoms.filter(data => data !== null);
          if (filteredInfestationSymptomsData.length > 0) {
            await db.PestManagementInfestationSymptom.bulkCreate(
              filteredInfestationSymptomsData,
              {
              transaction,
            });
          }
        }

        // Other Control Dates
        await db.PestManagementOtherControlDate.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );
        const otherDates = otherDatesOfPestControl.map((date) => {
          return {
            date: moment.utc(date, "DD/MM/YYYY"),
            pestManagementId: id,
          };
        });
          
        const filteredOtherDatesData = otherDates.filter(data => data !== null);
        if (filteredOtherDatesData.length > 0) {
          await db.PestManagementOtherControlDate.bulkCreate(filteredOtherDatesData, {
            transaction,
          });
        }

        //Cost
        await db.PestManagementCost.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );
        if (cost) {
          const existingOne = await db.PestManagementCost.findOne({
            where: { pestManagementId: id },
          });
          const pestManagementCost = {
            ...cost,
            pestManagementId: id,
          };
          await db.PestManagementCost.create(pestManagementCost, {
            transaction,
          });
        }

        await db.MapPestManagementAndChemicalPesticides.destroy(
          { where: { pestManagementId: id }, force: true },
          { transaction }
        );

        if (pestChemicalPesticidesTypes && pestChemicalPesticidesTypes.length) {
          for (const input of pestChemicalPesticidesTypes) {
            if (input.pestManagementChemicalPesticideInputId) {
              await db.PestManagementChemicalPesticidesType.update({
                pestControlTypeOptionId
              }, {
                where: { id: input.pestManagementChemicalPesticideInputId },
                transaction,
              });
              await db.MapPestManagementAndChemicalPesticides.create(
                {
                  pestManagementChemicalPesticideInputId:
                    input.pestManagementChemicalPesticideInputId,
                  pestManagementId: id,
                },
                {
                  transaction,
                }
              );
            } else {
              const {
                id: pestManagementChemicalPesticideInputId,
                pestManagementId,
                pesticideName,
                cost,
                currencyId,
                pesticideQuantity,
                pesticideQuantityUnitId,
                pesticideActiveIngredient,
                pesticideDoseRate,
                pesticideDoseRateUnitId,
                applicationMethodId,
                mixtures,
              } = input;

              const chemicalPesticidesTypesSet = {
                pesticideName,
                pestManagementId: pestManagementId || id,
                pestControlTypeOptionId,
                userId: userId,
                cost: cost ?? null,
                currencyId: currencyId ?? null,
                pesticideQuantity: pesticideQuantity ?? null,
                pesticideQuantityUnitId: pesticideQuantityUnitId ?? null,
                pesticideActiveIngredient: pesticideActiveIngredient ?? null,
                pesticideDoseRate: pesticideDoseRate ?? null,
                pesticideDoseRateUnitId: pesticideDoseRateUnitId ?? null,
                applicationMethodId: applicationMethodId ?? null,
              };

              for (const key in chemicalPesticidesTypesSet) {
                if (
                  chemicalPesticidesTypesSet[key] == undefined ||
                  chemicalPesticidesTypesSet[key] == null ||
                  chemicalPesticidesTypesSet[key] == ""
                ) {
                  delete chemicalPesticidesTypesSet[key];
                }
              }

              let chemicalPesticide = null;
              let existing = null

              if (
                pestManagementChemicalPesticideInputId &&
                pestManagementId === id
              ) {
                await db.PestManagementChemicalPesticidesType.update(
                  chemicalPesticidesTypesSet,
                  {
                    where: {
                      id: pestManagementChemicalPesticideInputId,
                      pestManagementId: pestManagementId || id,
                    },
                    transaction,
                  }
                );

                await db.MapPestManagementAndChemicalPesticides.create(
                  {
                    pestManagementChemicalPesticideInputId,
                    pestManagementId: id,
                  },
                  {
                    transaction,
                  }
                );
              } else {
                if (
                  !input.pesticideName ||
                  input.pesticideName.trim().length === 0
                ) {
                  throw new Error(error.INVALID_PESTICIDE_NAME);
                }

                existing =
                  await db.PestManagementChemicalPesticidesType.findOne({
                    where: {
                      pesticideName: input.pesticideName,
                      userId,
                    },
                  });

                if (existing) {
                  if (existing.dataValues.pestManagementId === id) {
                    await db.PestManagementChemicalPesticidesType.update(
                      chemicalPesticidesTypesSet,
                      {
                        where: {
                          id: existing.id,
                          pestManagementId: pestManagementId || id,
                        },
                        transaction,
                      }
                    );

                    await db.MapPestManagementAndChemicalPesticides.create(
                      {
                        pestManagementChemicalPesticideInputId: existing.id,
                        pestManagementId: id,
                      },
                      {
                        transaction,
                      }
                    );

                  }
                } else {
                  chemicalPesticide =
                    await db.PestManagementChemicalPesticidesType.create(
                      chemicalPesticidesTypesSet,
                      {
                        transaction,
                      }
                    );

                  await db.MapPestManagementAndChemicalPesticides.create(
                    {
                      pestManagementChemicalPesticideInputId:
                        chemicalPesticide?.id,
                      pestManagementId: id,
                    },
                    {
                      transaction,
                    }
                  );
                }
              }
              if (mixtures && mixtures.length) {
                const existingMixtureIds = mixtures.map(
                  (mixture) => mixture.id
                );

                const existingMixtures =
                  await db.PestManagementChemicalMixture.findAll({
                    where: {
                      pestManagementChemicalTypeId:
                        pestManagementChemicalPesticideInputId ||
                        chemicalPesticide?.id || existing.id,
                    },
                  });

                for (const existingMixture of existingMixtures) {
                  if (!existingMixtureIds.includes(existingMixture.id)) {
                    await db.PestManagementChemicalMixture.destroy(
                      { where: { id: existingMixture.id }, force: true },
                      {
                        transaction,
                      }
                    );
                  }
                }

                for (const mixture of mixtures) {
                  let {
                    id: mixtureId,
                    ingredientName,
                    percentage,
                    cost,
                    currencyId,
                    quantity,
                    quantityUnitId,
                  } = mixture;

                  const mixtureSet = {
                    pestManagementChemicalTypeId:
                      pestManagementChemicalPesticideInputId ||
                      chemicalPesticide?.id || existing.id,
                    ingredientName: ingredientName ?? null,
                    percentage: percentage ?? null,
                    cost: cost ?? null,
                    currencyId: currencyId ?? null,
                    quantity: quantity ?? null,
                    quantityUnitId: quantityUnitId ?? null,
                  };

                  if (mixtureId) {
                    await db.PestManagementChemicalMixture.update(mixtureSet, {
                      where: {
                        id: mixtureId,
                      },
                      transaction,
                    });
                  } else {
                    await db.PestManagementChemicalMixture.create(mixtureSet, {
                      transaction,
                    });
                  }
                }
              }
            }
          }
        }

        await transaction.commit();

        const pestManagementData = await db.PestManagement.findOne({
          attributes: {
            exclude: ["userId"],
          },
          where: { id, userId },
          include: includeAssociations,
        });

        return res.json(
          await successResp({
            data: pestManagementData,
            msg: success.PEST_MANAGEMENT_DATA_UPDATED,
          })
        );
      } catch (err) {
        console.log(err)
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
 * /pest/management/{id}:
 *   get:
 *     description: Fetch details of the register pest data with id(pest management)
 *     tags: [Pest Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
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
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                     {
 *                        actualDaysAfterPestDetection: 5,
 *                        area: 100,
 *                        areaUnitId: 11,
 *                        cropStageId: 1,
 *                        cropTypeId: 10,
 *                        cropVarietyId: 4,
 *                        dateOfFirstPestDetection: "2022-03-10T00:00:00.000Z",
 *                        id: 9,
 *                        numberOfPlantsAffected: 10,
 *                        pestControlTypeId: null,
 *                        pestTypeId: 1,
 *                        createdAt: "2022-06-14T09:15:19.000Z",
 *                        updatedAt: "2022-06-14T09:15:19.000Z",
 *                        cropStage: {
 *                          id: 1,
 *                          name: "Days after sowing when pest was detected"
 *                        },
 *                        applicationMethods: [
 *                          {
 *                            id: 190,
 *                            name: "Annually (5 points)"
 *                          }
 *                        ],
 *                        pestManagementAffectedPlantParts: [
 *                          {
 *                            id: 1,
 *                            name: "Leaves"
 *                          },
 *                          {
 *                            id: 2,
 *                            name: "Stem"
 *                          }
 *                        ],
 *                        pestManagementInfestationSymptoms: [
 *                          {
 *                            id: 1,
 *                            name: "Holes on leaves/fruits/grain"
 *                          },
 *                          {
 *                            id: 2,
 *                            name: "Rolled and curied leaves"
 *                          }
 *                        ],
 *                        pestControlTypes: [
 *                          {
 *                            id: 1,
 *                            name: "Cultural/Natural"
 *                          }
 *                        ],
 *                        pestManagementPestControlTypes: [
 *                          {
 *                            chemicalAppliedArea: 30,
 *                            chemicalAppliedAreaUnitId: null,
 *                            chemicalInsecticides: null,
 *                            culturalManualMethodArea: null,
 *                            culturalManualMethodAreaUnitId: null,
 *                            culturalManualMethodId: null,
 *                            id: 1,
 *                            insecticideActiveIngredients: null,
 *                            insecticideDose: null,
 *                            insecticideDoseUnitId: null,
 *                            insecticideEfficacy: null,
 *                            otherDatesOfPestControl: null,
 *                            pestControlDuration: null,
 *                            pestControlTypeId: 1,
 *                            pestManagementId: 9,
 *                            startOfPestControl: null,
 *                            totalInsecticideUsed: null,
 *                            totalInsecticideUsedUnitId: null,
 *                            createdAt: "2022-06-14T09:15:19.000Z",
 *                            updatedAt: "2022-06-14T09:15:19.000Z",
 *                            chemicalAppliedAreaUnit: null,
 *                            culturalManualMethodAreaUnit: null,
 *                            insecticideDoseUnit: null,
 *                            totalInsecticideUsedUnit: null
 *                          }
 *                        ],
 *                        pestType: {
 *                          id: 1,
 *                          name: "Aphids"
 *                        },
 *                        pestManagementFarms: [{id: 406, farmName: 'Sams farm', registrationNo: "ASABBBG45566"}],
 *                        pestManagementSegments: [{id: 148, geofenceName: 'test', farmId: 521, farm: {id: 521, farmName: 'cacac'}}],
 *                        cropType: {
 *                          id: 10,
 *                          name: "micronutrient"
 *                        },
 *                        areaUnit: {
 *                          id: 11,
 *                          name: "Hectares",
 *                          abbvr: "hectares",
 *                          unitType: 5,
 *                          factor: "2.4710500000"
 *                        }
 *                      }
 */
router.get("/:id", auth, validationErrorHandler, async (req, res) => {
  try {
    let { id: userId } = req.user;
    let { id } = req.params;

    let pestManagement = await db.PestManagement.findOne({
      attributes: {
        exclude: ["userId"],
      },
      where: { id, userId },
      include: includeAssociations,
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: pestManagement,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /pest/management/delete/{id}:
 *   delete:
 *     description: Delete pest management data with id
 *     tags: [Pest Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
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
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Pest management data deleted successfully.
 *                 data:
 */
router.delete(
  "/delete/:id",
  auth,
  // validatorSoilMgmt.exist(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const transaction = await db.sequelize.transaction();
      try {
        await db.PestManagementFarm.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );
        await db.PestManagementSegment.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );
        await db.PestManagementCropVariety.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );
        await db.PestManagementAffectedPlantPart.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );
        await db.PestManagementPestType.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );
        await db.PestManagementInfestationSymptom.destroy({
          where: { pestManagementId: id },
          transaction,
        });
        await db.PestManagementOtherControlDate.destroy(
          { where: { pestManagementId: id } },
          { transaction }
        );
        await db.PestManagementCost.destroy(
          {
            where: { pestManagementId: id },
          },
          { transaction }
        );
        await db.MapPestManagementAndChemicalPesticides.destroy(
          { where: { pestManagementId: id }, force: true },
          { transaction }
        );
        await db.PestManagement.destroy({
          where: { userId, id },
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: success.PEST_MANAGEMENT_DATA_DELETED,
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

router.get(
  "/pesticideName/:name",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const userId = req.user.id;
      const { name } = req.params;

      try {
        const existing = await db.PestManagementChemicalPesticidesType.findOne({
          where: {
            pesticideName: name,
            userId,
          },
        });

        if (existing) {
          throw new Error(error.ALREADY_EXISTS);
        } else {
          return res.json(
            successRespSync({
              msg: error.DOESNT_EXISTS,
            })
          );
        }
      } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
