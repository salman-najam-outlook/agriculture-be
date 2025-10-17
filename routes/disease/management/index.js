const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successResp, successRespSync } = require(rootPath +
  "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const validate = require(rootPath + "/helpers/validation.js");
const { Op } = require("sequelize");
const moment = require("moment");
const { ACTIVITY_TYPES } = require("../../../constants/ACTIVITY_TYPES");
const { updateActivityToTraceability, addDiseaseManagementToTraceability } = require(rootPath + "/helpers/autoTraceabilityHelper");
const { restructureResponseWithPlantations } = require(rootPath + "/helpers/restructurePlantationsResponse");

const includeAssociations = [
  {
    model: db.user_farm,
    as: "diseaseManagementFarms",
    through: { model: db.DiseaseManagementFarm, attributes: [] },
    attributes: ["id", "farmName", "registrationNo"],
  },
  {
    model: db.Geofence,
    as: "diseaseManagementSegments",
    through: { model: db.DiseaseManagementSegment, attributes: [] },
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
    model: db.UnitsList,
    as: "areaUnit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.Option,
    as: "cropType",
    attributes: ["id", "name"],
  },
  {
    model: db.Crop,
    as: "cropVarieties",
    attributes: ["id", "name"],
    through: { attributes: [] },
  },
  {
    model: db.CropStage,
    as: "cropStage",
    attributes: ["id", "name"],
  },
  {
    model: db.PlantPart,
    as: "diseaseManagementAffectedPlantParts",
    attributes: ["id", "name"],
    through: {
      attributes: [],
      model: db.DiseaseManagementAffectedPlantPart,
    },
  },
  {
    model: db.DiseaseType,
    as: "diseaseType",
    attributes: ["id", "name"],
    through: {
      attributes: [],
      model: db.DiseaseManagementDiseaseType,
    },
  },
  {
    model: db.DiseaseSymptoms,
    as: "diseaseSymptoms",
    attributes: ["id", "symptoms", "diseaseTypeId"],
    through: {
      attributes: [],
      model: db.DiseaseManagementSymptoms,
    },
  },
  {
    model: db.DiseaseControlTypes,
    as: "diseaseControlType",
    attributes: ["id", "name", "hasOptions"],
  },
  {
    model: db.DiseaseControlTypeOptions,
    as: "DiseaseControlTypeOption",
    attributes: ["id", "name"],
  },
  {
    model: db.DiseaseManagementControlOtherDate,
    as: "diseaseControlOtherDates",
    attributes: ["date"],
  },
  {
    model: db.DiseaseCulturalManualMethods,
    as: "culturalManualMethod",
    attributes: ["id", "name"],
  },
  {
    model: db.DiseaseManagementChemicalType,
    as: "diseaseChemicalTypes",
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
        as: "chemicalQuantityUnit",
        attributes: ["id", "name", "abbvr", "unitType", "factor"],
      },
      {
        model: db.UnitsList,
        as: "chemicalDoseRateUnit",
        attributes: ["id", "name", "abbvr", "unitType", "factor"],
      },
      {
        model: db.Option,
        as: "applicationMethod",
        attributes: ["id", "name"],
      },
      {
        model: db.DiseaseManagementChemicalMixture,
        as: "mixtures",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
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
    model: db.DiseaseManagementCost,
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

router.get("/list", auth, translation, validationErrorHandler, async (req, res) => {
  try {
    let { page = 1, limit = 10, col = "id", desc = "true" } = req.query;
    let { id: userId } = req.user;
    limit = parseInt(limit);
    let diseaseManagementList = await db.DiseaseManagement.findAndCountAll({
      attributes: {
        exclude: ["userId", "diseaseManagementId"],
      },
      where: { userId },
      offset: (page - 1) * limit,
      limit: limit,
      distinct: true,
      order: [[col, desc == "false" ? "ASC" : "DESC"]],
      include: includeAssociations,
    });

    if (req.headers.lang && req.headers.lang != "en") {
      diseaseManagementList.rows = req.translateFunction(diseaseManagementList.rows, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
        moduleName: "disease/management",
      });
    }

    // Restructure response with plantations array
    const restructuredData = restructureResponseWithPlantations(diseaseManagementList.rows);

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          rows: restructuredData,
          count: diseaseManagementList.count,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/:id", auth, validationErrorHandler, async (req, res) => {
  try {
    let { id: userId } = req.user;
    let { id } = req.params;

    let diseaseManagement = await db.DiseaseManagement.findOne({
      attributes: {
        exclude: ["userId", "diseaseManagementId"],
      },
      where: { id, userId },
      include: includeAssociations,
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: diseaseManagement,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post("/", auth, validationErrorHandler, async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      farmIds = [],
      segmentIds = [],
      area,
      areaUnitId,
      cropTypeId,
      cropVarieties = [],
      dateOfFirstDiseaseDetection,
      cropStageId,
      numberOfPlantsAffected,
      affectedPlantParts = [],
      diseases = [],
      symptoms = [],
      diseaseControlTypeId,
      diseaseControlTypeOptionId,
      diseaseControlStartDate,
      diseaseControlDuration,
      diseaseControlOtherDates = [],
      culturalManualMethodId,
      diseaseChemicalTypes = [],
      cost,
      recordId,
      plantationIds=[],
    } = req.body;

    const transaction = await db.sequelize.transaction();

    try {
      const set = {
        userId,
        area,
        areaUnitId,
        cropTypeId: cropTypeId || null, 
        dateOfFirstDiseaseDetection: dateOfFirstDiseaseDetection
          ? moment.utc(dateOfFirstDiseaseDetection, "DD/MM/YYYY")
          : null,
        cropStageId,
        numberOfPlantsAffected,
        diseaseControlTypeId,
        diseaseControlTypeOptionId,
        diseaseControlStartDate: diseaseControlStartDate
          ? moment.utc(diseaseControlStartDate, "DD/MM/YYYY")
          : null,
        diseaseControlDuration,
        culturalManualMethodId,
        recordId,
      };

      Object.keys(set).forEach((key) => {
        if (key === 'cropTypeId') {
          // Keep cropTypeId even if null
          return;
        }
        set[key] == undefined || set[key] == null || set[key] == ""
          ? delete set[key]
          : {};
      });

      let diseaseManagement = await db.DiseaseManagement.create(set, {
        transaction,
      });

      // Add disease management activity to plantation traceability
      await addDiseaseManagementToTraceability(diseaseManagement, plantationIds, transaction);


      // Farm Ids
      if (farmIds && farmIds?.length) {
        const diseaseManagementFarmsDataPromise = farmIds?.map(async (_farmId) => {
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
              diseaseManagementId: diseaseManagement.id,
            };
          }
          return null;
        });
        const diseaseManagementFarmsData = await Promise.all(diseaseManagementFarmsDataPromise);
        // Filter out null values before bulk create
        const filteredFarmsData = diseaseManagementFarmsData.filter(data => data !== null);
        if (filteredFarmsData.length > 0) {
          await db.DiseaseManagementFarm.bulkCreate(filteredFarmsData, {
            transaction,
          });
        }
      }

      // Segment Ids
      if (segmentIds && segmentIds?.length) {
        const diseaseManagementSegmentsDataPromise = segmentIds?.map(async (segmentId) => {
          const segment = await db.Geofence.findOne({
            where: {
              [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
            }
          });
          if(segment) {
            return {
              segmentId: segment.id,
              diseaseManagementId: diseaseManagement.id,
            };
          }
          return null;
        });
        const diseaseManagementSegmentsData = await Promise.all(diseaseManagementSegmentsDataPromise);
        // Filter out null values before bulk create
        const filteredSegmentsData = diseaseManagementSegmentsData.filter(data => data !== null);
        if (filteredSegmentsData.length > 0) {
          await db.DiseaseManagementSegment.bulkCreate(filteredSegmentsData, {
            transaction,
          });
        }
      }

      // Crop Varieties
      if (cropVarieties && cropVarieties?.length) {
        const cropVarietiesData = cropVarieties?.map((cropVariety) => {
          return {
            cropVarietyId: cropVariety,
            diseaseManagementId: diseaseManagement.id,
          };
        });
        await db.DiseaseManagementCropVariety.bulkCreate(cropVarietiesData, {
          transaction,
        });
      }

      // Affected Plant Parts
      if (affectedPlantParts && affectedPlantParts?.length) {
        const diseaseManagementAffectedPlantPartsData = affectedPlantParts?.map(
          (affectedPlantPart) => {
            return {
              plantPartId: affectedPlantPart,
              diseaseManagementId: diseaseManagement.id,
            };
          }
        );
        await db.DiseaseManagementAffectedPlantPart.bulkCreate(
          diseaseManagementAffectedPlantPartsData,
          {
            transaction,
          }
        );
      }

      // Diseases
      if (diseases && diseases?.length) {
        let diseaseTypes = [];
        for (const disease of diseases) {
          if (!disease.id) {
            const options = await db.Option.findOne({
              where: {
                id: cropTypeId,
              },
            });
            const diseaseType = await db.DiseaseType.create(
              {
                cropName: options.dataValues.name,
                name: disease?.name,
                userId,
              },
              { transaction }
            );

            await db.DiseaseTypeAndCropType.create(
              {
                cropTypeId: cropTypeId,
                diseaseTypeId: diseaseType.id,
              },
              { transaction }
            );

            diseaseTypes.push({
              diseaseManagementId: diseaseManagement.id,
              diseaseId: diseaseType.id,
            });

            if (disease?.symptoms?.length) {
              let symptoms = [];
              for (const symptom of disease.symptoms) {
                const diseaseSymptom = await db.DiseaseSymptoms.create(
                  {
                    diseaseTypeId: diseaseType.id,
                    symptoms: symptom?.name,
                    userId,
                  },
                  { transaction }
                );
                symptoms.push({
                  diseaseManagementId: diseaseManagement.id,
                  symptomId: diseaseSymptom.id,
                });
              }
              await db.DiseaseManagementSymptoms.bulkCreate(symptoms, {
                transaction,
              });
            }
          } else {
            diseaseTypes.push({
              diseaseManagementId: diseaseManagement.id,
              diseaseId: disease.id,
            });
          }
        }
        await db.DiseaseManagementDiseaseType.bulkCreate(diseaseTypes, {
          transaction,
        });
      }

      // Diseases Symptoms
      if (symptoms && symptoms?.length) {
        let diseaseSymptoms = [];
        for (const symptom of symptoms) {
          if (!symptom.id) {
            const diseaseSymptom = await db.DiseaseSymptoms.create(
              {
                diseaseTypeId: symptom.diseaseTypeId,
                symptoms: symptom?.symptoms,
                userId,
              },
              { transaction }
            );

            diseaseSymptoms.push({
              diseaseManagementId: diseaseManagement.id,
              symptomId: diseaseSymptom.id,
            });
          } else {
            diseaseSymptoms.push({
              diseaseManagementId: diseaseManagement.id,
              symptomId: symptom.id,
            });
          }
        }
        await db.DiseaseManagementSymptoms.bulkCreate(diseaseSymptoms, {
          transaction,
        });
      }

      // Others Date
      if (diseaseControlOtherDates && diseaseControlOtherDates?.length) {
        const otherDates = diseaseControlOtherDates?.map((date) => {
          return {
            date: moment.utc(date, "DD/MM/YYYY"),
            diseaseManagementId: diseaseManagement.id,
          };
        });
        await db.DiseaseManagementControlOtherDate.bulkCreate(otherDates, {
          transaction,
        });
      }

      // Control Types
      if (diseaseChemicalTypes && diseaseChemicalTypes?.length) {
        await Promise.all(
          diseaseChemicalTypes?.map(async (chemicalType) => {
            if (chemicalType.chemicalTypeId) {
              await db.PestManagementChemicalPesticidesType.update({
                diseaseControlTypeOptionId
              }, {
                where: { id: chemicalType.chemicalTypeId, },
                transaction,
              });
              await db.DiseaseManagementChemicalTypeMap.create(
                {
                  diseaseManagementId: diseaseManagement.id,
                  chemicalTypeId: chemicalType.chemicalTypeId,
                },
                { transaction }
              );
            } else {
              const {
                title,
                cost,
                currencyId,
                chemicalQuantity,
                chemicalQuantityUnitId,
                chemicalActiveIngredient,
                chemicalDoseRate,
                chemicalDoseRateUnitId,
                applicationMethodId,
                mixtures = [],
              } = chemicalType;
              if (!title || title.trim()?.length === 0) {
                throw new Error(error.INVALID_CHEMICAL_NAME);
              }
              const chemicalTypeWithSameTitle =
                await db.DiseaseManagementChemicalType.findOne(
                  {
                    where: {
                      title,
                      userId,
                    },
                  },
                  { transaction }
                );
              if (chemicalTypeWithSameTitle) {
                await db.DiseaseManagementChemicalTypeMap.create(
                  {
                    diseaseManagementId: diseaseManagement.id,
                    chemicalTypeId: chemicalTypeWithSameTitle.id,
                  },
                  { transaction }
                );
              }
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
                  ingredientName: (ingredientName ?? null) || null,
                  percentage: (percentage ?? null) || null,
                  cost: (cost ?? null) || null,
                  currencyId: (currencyId ?? null) || null,
                  quantity: (quantity ?? null) || null,
                  quantityUnitId: (quantityUnitId ?? null) || null,
                };
              });
              const chemicalTypeReturn = {
                diseaseManagementId: diseaseManagement.id,
                diseaseControlTypeOptionId,
                userId: userId,
                title,
                cost,
                currencyId,
                chemicalQuantity,
                chemicalQuantityUnitId,
                chemicalActiveIngredient,
                chemicalDoseRate,
                chemicalDoseRateUnitId,
                applicationMethodId,
                mixtures: chemicalMixtures,
              };

              for (const key in chemicalTypeReturn) {
                if (
                  chemicalTypeReturn[key] == undefined ||
                  chemicalTypeReturn[key] == null ||
                  chemicalTypeReturn[key] == ""
                ) {
                  delete chemicalTypeReturn[key];
                }
              }

              const diseaseManagementChemicalType =
                await db.DiseaseManagementChemicalType.create(
                  chemicalTypeReturn,
                  {
                    transaction,
                    include: [
                      {
                        association: "mixtures",
                      },
                    ],
                  }
                );

              await db.DiseaseManagementChemicalTypeMap.create(
                {
                  chemicalTypeId:
                    diseaseManagementChemicalType.id ||
                    chemicalTypeWithSameTitle.id,
                  diseaseManagementId: diseaseManagement.id,
                },
                { transaction }
              );
            }
          })
        );
      }

      if (cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = cost;
        const diseaseManagementCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          diseaseManagementId: diseaseManagement.id,
        };
        await db.DiseaseManagementCost.create(diseaseManagementCost, {
          transaction,
        });
      }

      await transaction.commit();

      const diseaseManagementData = await db.DiseaseManagement.findOne({
        attributes: {
          exclude: ["userId", "diseaseManagementId"],
        },
        where: { id: diseaseManagement.id, userId },
        include: includeAssociations,
      });

      return res.json(
        await successResp({
          data: diseaseManagementData,
          msg: success.DISEASE_MANAGEMENT_DATA_ADDED,
        })
      );
    } catch (error) {
      await transaction?.rollback();
      logErrorOccurred(__filename, error);
      return serverError(res, error);
    }
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.get(
  "/chemicalPesticidesType/list",
  auth,
  validate.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { id: userId } = req.user;
      let diseaseManagementChemicalType =
        await db.DiseaseManagementChemicalType.findAll({
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
              as: "chemicalQuantityUnit",
              attributes: ["id", "name", "abbvr", "unitType", "factor"],
            },
            {
              model: db.UnitsList,
              as: "chemicalDoseRateUnit",
              attributes: ["id", "name", "abbvr", "unitType", "factor"],
            },
            {
              model: db.Option,
              as: "applicationMethod",
              attributes: ["id", "name"],
            },
            {
              model: db.DiseaseControlTypeOptions,
              as: "DiseaseControlTypeOption",
              attributes: ["id", "name"],
            },
            {
              model: db.DiseaseManagementChemicalMixture,
              as: "mixtures",
              attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
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
          data: diseaseManagementChemicalType,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put("/update", auth, validationErrorHandler, async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      id,
      farmIds = [],
      segmentIds = [],
      area,
      areaUnitId,
      cropTypeId,
      cropVarieties = [],
      dateOfFirstDiseaseDetection,
      cropStageId,
      numberOfPlantsAffected,
      affectedPlantParts = [],
      diseases = [],
      symptoms = [],
      diseaseControlTypeId,
      diseaseControlTypeOptionId,
      diseaseControlStartDate,
      diseaseControlDuration,
      diseaseControlOtherDates = [],
      culturalManualMethodId,
      diseaseChemicalTypes = [],
      cost,
      recordId,
      plantationIds = [],
    } = req.body;

    const transaction = await db.sequelize.transaction();

    try {
      const set = {
        userId,
        area,
        areaUnitId,
        cropTypeId,
        dateOfFirstDiseaseDetection: dateOfFirstDiseaseDetection
          ? moment.utc(dateOfFirstDiseaseDetection, "DD/MM/YYYY")
          : null,
        cropStageId,
        numberOfPlantsAffected,
        diseaseControlTypeId,
        diseaseControlTypeOptionId,
        diseaseControlStartDate: diseaseControlStartDate
          ? moment.utc(diseaseControlStartDate, "DD/MM/YYYY")
          : null,
        diseaseControlDuration,
        culturalManualMethodId,
        recordId,
      };

      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null || set[key] == ""
          ? delete set[key]
          : {};
      });

      await db.DiseaseManagement.update(set, {
        where: { id },
        transaction,
      });

      const activityData = {
        id: id,
        userId: userId,
        activity_type: ACTIVITY_TYPES.DISEASE_MANAGEMENT,
        activity_date: moment.utc(dateOfFirstDiseaseDetection, "DD/MM/YYYY") || new Date()
      }    

      // update disease management activity to plantation traceability
      await updateActivityToTraceability(activityData, plantationIds, transaction);

      // Farms
      await db.DiseaseManagementFarm.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );
      if (farmIds && farmIds?.length) {
        const diseaseManagementFarmsDataPromise = farmIds?.map(async (_farmId) => {
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
              diseaseManagementId: id,
            };
          }
          
        });
        const diseaseManagementFarmsData = await Promise.all(diseaseManagementFarmsDataPromise);
        // Filter out null values before bulk create
        const filteredFarmsData = diseaseManagementFarmsData.filter(data => data !== null);
        if (filteredFarmsData.length > 0) {
          await db.DiseaseManagementFarm.bulkCreate(filteredFarmsData, {
            transaction,
          });
        }
      }
      

      // Segments
      await db.DiseaseManagementSegment.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );

      if (segmentIds && segmentIds?.length) {
        const diseaseManagementSegmentsDataPromise = segmentIds?.map(async (segmentId) => {
          const segment = await db.Geofence.findOne({
            where: {
              [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
            }
          });
          if(segment) {
            return {
              segmentId: segment.id,
              diseaseManagementId: id,
            };
          }
        });
        const diseaseManagementSegmentsData = await Promise.all(diseaseManagementSegmentsDataPromise);
        await db.DiseaseManagementSegment.bulkCreate(
          diseaseManagementSegmentsData,
          {
            transaction,
          }
        );
      }

      // Crop Varieties
      await db.DiseaseManagementCropVariety.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );

      if (cropVarieties && cropVarieties?.length) {
        const cropVarietiesData = cropVarieties?.map((cropVariety) => {
          return {
            cropVarietyId: cropVariety,
            diseaseManagementId: id,
          };
        });
        await db.DiseaseManagementCropVariety.bulkCreate(cropVarietiesData, {
          transaction,
        });
      }
      // Affected Plant Parts
      await db.DiseaseManagementAffectedPlantPart.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );
      if (affectedPlantParts && affectedPlantParts?.length) {
        const diseaseManagementAffectedPlantPartsData = affectedPlantParts?.map(
          (affectedPlantPart) => {
            return {
              plantPartId: affectedPlantPart,
              diseaseManagementId: id,
            };
          }
        );
        await db.DiseaseManagementAffectedPlantPart.bulkCreate(
          diseaseManagementAffectedPlantPartsData,
          {
            transaction,
          }
        );
      }

      // Diseases
      await db.DiseaseManagementDiseaseType.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );

      await db.DiseaseManagementSymptoms.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );
      if (diseases && diseases?.length) {
        let diseaseTypes = [];
        for (const disease of diseases) {
          if (!disease.id) {
            const options = await db.Option.findOne({
              where: {
                id: cropTypeId,
              },
            });
            const diseaseType = await db.DiseaseType.create(
              {
                cropName: options.dataValues.name,
                name: disease?.name,
                userId,
              },
              { transaction }
            );

            await db.DiseaseTypeAndCropType.create(
              {
                cropTypeId: cropTypeId,
                diseaseTypeId: diseaseType.id,
              },
              { transaction }
            );

            diseaseTypes.push({
              diseaseManagementId: id,
              diseaseId: diseaseType.id,
            });

            if (disease?.symptoms?.length) {
              let symptoms = [];
              for (const symptom of disease.symptoms) {
                const diseaseSymptom = await db.DiseaseSymptoms.create(
                  {
                    diseaseTypeId: diseaseType.id,
                    symptoms: symptom?.name,
                    userId,
                  },
                  { transaction }
                );
                symptoms.push({
                  diseaseManagementId: id,
                  symptomId: diseaseSymptom.id,
                });
              }
              await db.DiseaseManagementSymptoms.bulkCreate(symptoms, {
                transaction,
              });
            }
          } else {
            diseaseTypes.push({
              diseaseManagementId: id,
              diseaseId: disease.id,
            });
          }
        }
        await db.DiseaseManagementDiseaseType.bulkCreate(diseaseTypes, {
          transaction,
        });
      }

      // Diseases Symptoms
      if (symptoms && symptoms?.length) {
        let diseaseSymptoms = [];
        for (const symptom of symptoms) {
          if (!symptom.id) {
            const diseaseSymptom = await db.DiseaseSymptoms.create(
              {
                diseaseTypeId: symptom.diseaseTypeId,
                symptoms: symptom?.symptoms,
                userId,
              },
              { transaction }
            );

            diseaseSymptoms.push({
              diseaseManagementId: id,
              symptomId: diseaseSymptom.id,
            });
          } else {
            diseaseSymptoms.push({
              diseaseManagementId: id,
              symptomId: symptom.id,
            });
          }
        }
        await db.DiseaseManagementSymptoms.bulkCreate(diseaseSymptoms, {
          transaction,
        });
      }

      // Others Date
      await db.DiseaseManagementControlOtherDate.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );
      if (diseaseControlOtherDates && diseaseControlOtherDates?.length) {
        const otherDates = diseaseControlOtherDates?.map((date) => {
          return {
            date: moment.utc(date, "DD/MM/YYYY"),
            diseaseManagementId: id,
          };
        });
        await db.DiseaseManagementControlOtherDate.bulkCreate(otherDates, {
          transaction,
        });
      }

      await db.DiseaseManagementChemicalTypeMap.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );

      if (diseaseChemicalTypes && diseaseChemicalTypes?.length) {
        await Promise.all(
          diseaseChemicalTypes?.map(async (chemicalType) => {
            const {
              title,
              cost,
              currencyId,
              chemicalQuantity,
              chemicalQuantityUnitId,
              chemicalActiveIngredient,
              chemicalDoseRate,
              chemicalDoseRateUnitId,
              applicationMethodId,
              mixtures = [],
            } = chemicalType;
            const chemicalMixtures = mixtures.map((mixture) => {
              const {
                ingredientName,
                percentage,
                cost,
                currencyId,
                quantity,
                quantityUnitId,
              } = mixture;
              return {
                ingredientName: (ingredientName ?? null) || null,
                percentage: (percentage ?? null) || null,
                cost: (cost ?? null) || null,
                currencyId: (currencyId ?? null) || null,
                quantity: (quantity ?? null) || null,
                quantityUnitId: (quantityUnitId ?? null) || null,
              };
            });

            const chemicalTypeData = {
              diseaseManagementId: id,
              diseaseControlTypeOptionId,
              userId: userId,
              title,
              cost,
              currencyId,
              chemicalQuantity,
              chemicalQuantityUnitId,
              chemicalActiveIngredient,
              chemicalDoseRate,
              chemicalDoseRateUnitId,
              applicationMethodId,
              mixtures: chemicalMixtures,
            };

            for (const key in chemicalTypeData) {
              if (
                chemicalTypeData[key] == undefined ||
                chemicalTypeData[key] == null ||
                chemicalTypeData[key] == ""
              ) {
                delete chemicalTypeData[key];
              }
            }

            if (chemicalType.chemicalTypeId) {
              const existingChemicalType =
                await db.DiseaseManagementChemicalType.findOne(
                  {
                    where: { id: chemicalType.chemicalTypeId },
                  },
                  { transaction }
                );
              if (existingChemicalType) {
                await db.DiseaseManagementChemicalTypeMap.create(
                  {
                    chemicalTypeId: chemicalType.chemicalTypeId,
                    diseaseManagementId: id,
                  },
                  { transaction }
                );
                if (existingChemicalType.diseaseManagementId == id) {
                  await existingChemicalType.update(chemicalTypeData, {
                    transaction,
                  });
                  if (chemicalTypeData.mixtures?.length) {
                    await db.DiseaseManagementChemicalMixture.bulkCreate(
                      chemicalTypeData.mixtures.map((mixture) => ({
                        ...mixture,
                        diseaseManagementChemicalTypeId:
                          existingChemicalType.id,
                      })),
                      { transaction }
                    );
                  }
                }
              }
            } else {
              if (!title || title.trim()?.length === 0) {
                throw new Error(error.INVALID_CHEMICAL_NAME);
              }
              const chemicalTypeWithSameTitle =
                await db.DiseaseManagementChemicalType.findOne(
                  {
                    where: {
                      title,
                      userId,
                    },
                  },
                  { transaction }
                );
              if (chemicalTypeWithSameTitle) {
                await db.DiseaseManagementChemicalTypeMap.create(
                  {
                    chemicalTypeId: chemicalTypeWithSameTitle.id,
                    diseaseManagementId: id,
                  },
                  { transaction }
                );
              }

              const diseaseManagementChemicalType =
                await db.DiseaseManagementChemicalType.create(
                  chemicalTypeData,
                  {
                    include: [
                      {
                        association: "mixtures",
                      },
                    ],
                    transaction,
                  }
                );
              await db.DiseaseManagementChemicalTypeMap.create(
                {
                  chemicalTypeId: diseaseManagementChemicalType.id,
                  diseaseManagementId: id,
                },
                { transaction }
              );
            }
          })
        );
      }

      // cost
      await db.DiseaseManagementCost.destroy(
        { where: { diseaseManagementId: id } },
        {
          transaction,
        }
      );
      if (cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = cost;
        const diseaseManagementCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          diseaseManagementId: id,
        };
        await db.DiseaseManagementCost.create(diseaseManagementCost, {
          transaction,
        });
      }

      await transaction.commit();

      const diseaseManagement = await db.DiseaseManagement.findOne({
        attributes: {
          exclude: ["userId", "diseaseManagementId"],
        },
        where: { id, userId },
        include: includeAssociations,
      });

      return res.json(
        await successResp({
          data: diseaseManagement,
          msg: success.DISEASE_MANAGEMENT_DATA_UPDATED,
        })
      );
    } catch (error) {
      console.log("error", error);
      await transaction?.rollback();
      logErrorOccurred(__filename, error);
      return serverError(res, error);
    }
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

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
        // Farms
        await db.DiseaseManagementFarm.destroy(
          { where: { diseaseManagementId: id } },
          {
            transaction,
          }
        );
        // Segments
        await db.DiseaseManagementSegment.destroy(
          { where: { diseaseManagementId: id } },
          {
            transaction,
          }
        );

        // Crop Varieties
        await db.DiseaseManagementCropVariety.destroy(
          { where: { diseaseManagementId: id } },
          {
            transaction,
          }
        );

        // Affected Plant Parts
        await db.DiseaseManagementAffectedPlantPart.destroy(
          { where: { diseaseManagementId: id } },
          {
            transaction,
          }
        );

        // Diseases
        await db.DiseaseManagementDiseaseType.destroy(
          { where: { diseaseManagementId: id } },
          {
            transaction,
          }
        );

        // Diseases Symptoms
        await db.DiseaseManagementSymptoms.destroy(
          { where: { diseaseManagementId: id } },
          {
            transaction,
          }
        );

        // Others Date
        await db.DiseaseManagementControlOtherDate.destroy(
          { where: { diseaseManagementId: id } },
          {
            transaction,
          }
        );

        // Cost
        await db.DiseaseManagementCost.destroy(
          { where: { diseaseManagementId: id } },
          {
            transaction,
          }
        );

        await db.DiseaseManagement.destroy({
          where: { userId, id },
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: success.DISEASE_MANAGEMENT_DATA_DELETED,
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
  "/chemicalName/:name",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const userId = req.user.id;
      const { name } = req.params;

      try {
        const existing = await db.DiseaseManagementChemicalType.findOne({
          where: {
            title: name,
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
