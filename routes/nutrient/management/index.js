const express = require("express");
const router = express.Router();
const moment = require("moment");
const { Op } = require("sequelize");
const { ACTIVITY_TYPES } = require("../../../constants/ACTIVITY_TYPES");
const { restructureResponseWithPlantations } = require("../../../helpers/restructurePlantationsResponse");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { successResp, serverError, successRespSync } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const validate = require(rootPath + "/helpers/validation.js");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const { addNutrientManagementToTraceability, updateActivityToTraceability } = require(rootPath + "/helpers/autoTraceabilityHelper");

const includeAssociations = [
  {
    model: db.user_farm,
    as: "farms",
    through: { model: db.NutrientManagementFarm, attributes: [] },
    attributes: ["id", "farmName", "registrationNo", "area"],
  },
  {
    model: db.Geofence,
    as: "segments",
    through: { model: db.NutrientManagementSegment, attributes: [] },
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
    as: "cropType",
    attributes: ["id", "name",],
  },
  {
    model: db.SoilApplicationStage,
    as: "applicationStage",
    attributes: ["id", "name"],
  },
  {
    model: db.UnitsList,
    as: "fertilizerAppliedAreaUnit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.MapNutrientManagementAndFertilizerMixture,
    as: "fertilizerInputs",
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
    include: [
      {
        model: db.NutrientManagementFertilizerInputs,
        as: "nutrientManagementFertilizerInput",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
          {
            model: db.FertilizerInputType,
            as: "fertilizerType",
            attributes: ["id", "name"],
          },
          {
            model: db.SoilApplicationMethod,
            as: "applicationMethod",
            attributes: ["id", "name"],
          },
          {
            model: db.UnitsList,
            as: "applicationRateUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.NutrientManagementFertilizerMixture,
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
    ],
  },
  {
    model: db.NutrientManagementCost,
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

const deleteNutrientManagementAssociation = async (
  nutrientManagementId,
  transaction,
  force
) => {
  await db.NutrientManagementFarm.destroy(
    { where: { nutrientManagementId }, force },
    {
      transaction,
    }
  );
  await db.NutrientManagementSegment.destroy(
    { where: { nutrientManagementId }, force },
    {
      transaction,
    }
  );
  await db.MapNutrientManagementAndFertilizerMixture.destroy(
    { where: { nutrientManagementId }, force },
    {
      transaction,
    }
  );
  await db.NutrientManagementCost.destroy(
    { where: { nutrientManagementId }, force },
    {
      transaction,
    }
  );
};

router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("NutrientManagement"),
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      let {
        farms = [],
        segments = [],
        fertilizerInputs = [],
        cropTypeId,
        dateOfApplication,
        applicationStageId,
        daysAfterSowing,
        fertilizerAppliedArea,
        fertilizerAppliedAreaUnitId,
        cost,
        recordId,
        plantationIds,
      } = req.body;
      try {
        
        const set = {
          userId,
          cropTypeId: cropTypeId || null, 
          dateOfApplication: dateOfApplication
            ? moment.utc(dateOfApplication, "DD/MM/YYYY")
            : null,
          applicationStageId,
          daysAfterSowing,
          fertilizerAppliedArea,
          fertilizerAppliedAreaUnitId,
          recordId,
        };
        // Don't delete cropTypeId even if it's null, since it's nullable in the database
        Object.keys(set).forEach((key) => {
          if (key === 'cropTypeId') {
            // Keep cropTypeId even if null
            return;
          }
          set[key] == undefined || set[key] == null || set[key] == ""
            ? delete set[key]
            : {};
        });
        let nutrientManagement = await db.NutrientManagement.create(set, {
          transaction,
        });
        
        // Add nutrient management activity to plantation traceability
        await addNutrientManagementToTraceability(nutrientManagement, plantationIds, transaction);

        if (farms && farms.length) {
          const nutrientManagementFarmsDataPromise = farms?.map(
            async (_farmId) => {
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
                  nutrientManagementId: nutrientManagement.id,
                };
              }
            }
          );
          const nutrientManagementFarmsData = await Promise.all(
            nutrientManagementFarmsDataPromise
          );
          await db.NutrientManagementFarm.bulkCreate(
            nutrientManagementFarmsData,
            {
              transaction,
            }
          );
        }

        if (segments && segments.length) {
          const nutrientManagementSegmetsDataPromise = segments?.map(
            async (_segmentId) => {
              const segment = await db.Geofence.findOne({
                where: {
                  [Op.or]: [{ id: _segmentId }, { recordId: _segmentId }],
                },
              });
              if (segment) {
                return {
                  segmentId: segment.id,
                  nutrientManagementId: nutrientManagement.id,
                };
              }
            }
          );
          const nutrientManagementSegmetsData = await Promise.all(
            nutrientManagementSegmetsDataPromise
          );
          await db.NutrientManagementSegment.bulkCreate(
            nutrientManagementSegmetsData,
            {
              transaction,
            }
          );
        }

        if (fertilizerInputs && fertilizerInputs.length) {
          for (const input of fertilizerInputs) {
            if (input.nutrientManagementFertilizerInputId) {
              await db.MapNutrientManagementAndFertilizerMixture.create(
                {
                  nutrientManagementFertilizerInputId:
                    input.nutrientManagementFertilizerInputId,
                  nutrientManagementId: nutrientManagement.id,
                },
                {
                  transaction,
                }
              );
            } else {
              const {
                fertilizerName,
                fertilizerTypeId,
                currencyId,
                cost,
                applicationRate,
                applicationRateUnitId,
                applicationMethodId,
                mixtures,
              } = input;

              if (
                !input.fertilizerName ||
                input.fertilizerName.trim().length === 0
              ) {
                throw new Error(error.INVALID_FERTILIZER_NAME);
              }

              const existing =
                await db.NutrientManagementFertilizerInputs.findOne({
                  where: {
                    fertilizerName: input.fertilizerName,
                    userId,
                  },
                });

              if (existing) {
                await db.MapNutrientManagementAndFertilizerMixture.create(
                  {
                    nutrientManagementFertilizerInputId: existing.id,
                    nutrientManagementId: nutrientManagement.id,
                  },
                  {
                    transaction,
                  }
                );
              } else {
                const fertilizerSet = {
                  nutrientManagementId: nutrientManagement.id,
                  userId,
                  fertilizerName,
                  fertilizerTypeId,
                  currencyId,
                  cost,
                  applicationRate,
                  applicationRateUnitId,
                  applicationMethodId,
                };
                Object.keys(fertilizerSet).forEach((key) => {
                  fertilizerSet[key] == undefined ||
                  fertilizerSet[key] == null ||
                  fertilizerSet[key] == ""
                    ? delete fertilizerSet[key]
                    : {};
                });

                const fertilizerInput =
                  await db.NutrientManagementFertilizerInputs.create(
                    fertilizerSet,
                    {
                      transaction,
                    }
                  );

                await db.MapNutrientManagementAndFertilizerMixture.create(
                  {
                    nutrientManagementFertilizerInputId: fertilizerInput?.id,
                    nutrientManagementId: nutrientManagement.id,
                  },
                  {
                    transaction,
                  }
                );

                if (mixtures && mixtures.length) {
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
                      nutrientManagementFertilizerInputId: fertilizerInput?.id,
                      ingredientName: ingredientName ?? null,
                      percentage: percentage ?? null,
                      cost: cost ?? null,
                      currencyId: currencyId ?? null,
                      quantity: quantity ?? null,
                      quantityUnitId: quantityUnitId ?? null,
                    };
                  });

                  await db.NutrientManagementFertilizerMixture.bulkCreate(
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
          const nutrientManagementCost = {
            totalNumberOfWorkers: cost?.totalNoOfWorkers ?? 0,
            totalNumberOfHours: cost?.totalNoOfHours ?? 0,
            totalCost: cost?.totalCost ?? 0,
            currencyId: cost?.currencyId ?? null,
            nutrientManagementId: nutrientManagement.id,
          };
          await db.NutrientManagementCost.create(nutrientManagementCost, {
            transaction,
          });
        }
        await transaction.commit();

        const nutrientManagementData = await db.NutrientManagement.findOne({
          attributes: {
            exclude: ["userId"],
          },
          where: { id: nutrientManagement.id, userId },
          include: includeAssociations,
        });

        if (req.headers.lang && req.headers.lang != "en") {
          req.translateFunction(
            [nutrientManagementData],
            globalTranslationCache,
            {
              lvl1: true,
              lvl2: true,
              moduleName: "nutrient/management",
            }
          );
        }

        // Restructure response with plantations array
        const restructuredData = restructureResponseWithPlantations(nutrientManagementData);
        
        return res.json(
          await successResp({
            data: restructuredData,
            msg: success.NUTRIENT_MANAGEMENT_DATA_ADDED,
          })
        );
      } catch (error) {
        await transaction?.rollback();
        logErrorOccurred(__filename, error);
        return serverError(res, error);
      }
    } catch (error) {
      await transaction?.rollback();
      logErrorOccurred(__filename, error);
      return serverError(res, error);
    }
  }
);

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
      let nutrientManagementList = await db.NutrientManagement.findAndCountAll({
        attributes: {
          exclude: ["userId", "deletedAt"],
        },
        where: { userId },
        offset: (page - 1) * limit,
        limit: limit,
        distinct: true,
        order: [[col, desc == "false" ? "ASC" : "DESC"]],
        include: includeAssociations,
        paranoid: true,
      });

      if (req.headers.lang && req.headers.lang != "en") {
        nutrientManagementList.rows = req.translateFunction(
          nutrientManagementList.rows,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
            moduleName: "nutrient/management",
          }
        );
      }

      // Restructure response with plantations array for each record
      nutrientManagementList.rows = nutrientManagementList.rows.map(record => 
        restructureResponseWithPlantations(record)
      );

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: nutrientManagementList,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put(
  "/:id",
  auth,
  duplicateRecordId.handleDuplicateRecordId("NutrientManagement"),
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      let id = req.params.id;
      let {
        farms = [],
        segments = [],
        fertilizerInputs = [],
        cropTypeId,
        dateOfApplication,
        applicationStageId,
        daysAfterSowing,
        fertilizerAppliedArea,
        fertilizerAppliedAreaUnitId,
        cost,
        recordId,
        plantationIds = [],
      } = req.body;
      try {

        const set = {
          userId,
          cropTypeId: cropTypeId || null,
          dateOfApplication: dateOfApplication
            ? moment.utc(dateOfApplication, "DD/MM/YYYY")
            : null,
          applicationStageId,
          daysAfterSowing,
          fertilizerAppliedArea,
          fertilizerAppliedAreaUnitId,
          recordId,
        };
        // Don't delete cropTypeId even if it's null, since it's nullable in the database
        Object.keys(set).forEach((key) => {
          if (key === 'cropTypeId') {
            // Keep cropTypeId even if null
            return;
          }
          set[key] == undefined || set[key] == null || set[key] == ""
            ? delete set[key]
            : {};
        });
        await db.NutrientManagement.update(set, {
          where: { id },
          transaction,
        });

        const activityData = {
          id: id,
          userId: userId,
          activity_type: ACTIVITY_TYPES.NUTRIENT_MANAGEMENT,
          activity_date: moment.utc(dateOfApplication, "DD/MM/YYYY") || new Date()
        }        
        // update nutrient management activity to plantation traceability
        await updateActivityToTraceability(activityData, plantationIds, transaction);

        await deleteNutrientManagementAssociation(id, transaction, true);

        if (farms && farms.length) {
          const nutrientManagementFarmsDataPromise = farms?.map(
            async (_farmId) => {
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
                  nutrientManagementId: id,
                };
              }
            }
          );
          const nutrientManagementFarmsData = await Promise.all(
            nutrientManagementFarmsDataPromise
          );
          await db.NutrientManagementFarm.bulkCreate(
            nutrientManagementFarmsData,
            {
              transaction,
            }
          );
        }

        if (segments && segments.length) {
          const nutrientManagementSegmetsDataPromise = segments?.map(
            async (_segmentId) => {
              const segment = await db.Geofence.findOne({
                where: {
                  [Op.or]: [{ id: _segmentId }, { recordId: _segmentId }],
                },
              });
              if (segment) {
                return {
                  segmentId: segment.id,
                  nutrientManagementId: id,
                };
              }
            }
          );
          const nutrientManagementSegmetsData = await Promise.all(
            nutrientManagementSegmetsDataPromise
          );
          await db.NutrientManagementSegment.bulkCreate(
            nutrientManagementSegmetsData,
            {
              transaction,
            }
          );
        }

        if (fertilizerInputs && fertilizerInputs.length) {
          for (const input of fertilizerInputs) {
            if (input.nutrientManagementFertilizerInputId) {
              await db.MapNutrientManagementAndFertilizerMixture.create(
                {
                  nutrientManagementFertilizerInputId:
                    input.nutrientManagementFertilizerInputId,
                  nutrientManagementId: id,
                },
                {
                  transaction,
                }
              );
            } else {
              let {
                id: nutrientManagementFertilizerInputId,
                fertilizerName,
                fertilizerTypeId,
                currencyId,
                cost,
                applicationRate,
                applicationRateUnitId,
                applicationMethodId,
                mixtures,
              } = input;

              const fertilizerSet = {
                nutrientManagementId: id,
                userId,
                fertilizerName,
                fertilizerTypeId,
                currencyId,
                cost,
                applicationRate,
                applicationRateUnitId,
                applicationMethodId,
              };

              for (const key in fertilizerSet) {
                if (
                  fertilizerSet[key] == undefined ||
                  fertilizerSet[key] == null ||
                  fertilizerSet[key] == ""
                ) {
                  delete fertilizerSet[key];
                }
              }

              let fertilizerInput = null;
              let existing = null;

              if (nutrientManagementFertilizerInputId) {
                await db.NutrientManagementFertilizerInputs.update(
                  fertilizerSet,
                  {
                    where: {
                      id: nutrientManagementFertilizerInputId,
                      nutrientManagementId: id,
                    },
                    transaction,
                  }
                );
                await db.MapNutrientManagementAndFertilizerMixture.create(
                  {
                    nutrientManagementFertilizerInputId,
                    nutrientManagementId: id,
                  },
                  {
                    transaction,
                  }
                );
              } else {
                if (!fertilizerName || fertilizerName.trim().length === 0) {
                  throw new Error(error.INVALID_FERTILIZER_NAME);
                }
                existing = await db.NutrientManagementFertilizerInputs.findOne({
                  where: {
                    fertilizerName,
                    userId,
                  },
                });

                if (existing) {
                  await db.MapNutrientManagementAndFertilizerMixture.create(
                    {
                      nutrientManagementFertilizerInputId: existing.id,
                      nutrientManagementId: id,
                    },
                    {
                      transaction,
                    }
                  );
                } else {
                  fertilizerInput =
                    await db.NutrientManagementFertilizerInputs.create(
                      fertilizerSet,
                      {
                        transaction,
                      }
                    );

                  await db.MapNutrientManagementAndFertilizerMixture.create(
                    {
                      nutrientManagementFertilizerInputId: fertilizerInput?.id,
                      nutrientManagementId: id,
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
                  await db.NutrientManagementFertilizerMixture.findAll({
                    where: {
                      nutrientManagementFertilizerInputId:
                        nutrientManagementFertilizerInputId ||
                        fertilizerInput?.id ||
                        existing.id,
                    },
                  });

                for (const existingMixture of existingMixtures) {
                  if (!existingMixtureIds.includes(existingMixture.id)) {
                    await db.NutrientManagementFertilizerMixture.destroy(
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
                    nutrientManagementFertilizerInputId:
                      nutrientManagementFertilizerInputId ||
                      fertilizerInput?.id ||
                      existing.id,
                    ingredientName: ingredientName ?? null,
                    percentage: percentage ?? null,
                    cost: cost ?? null,
                    currencyId: currencyId ?? null,
                    quantity: quantity ?? null,
                    quantityUnitId: quantityUnitId ?? null,
                  };

                  if (mixtureId) {
                    await db.NutrientManagementFertilizerMixture.update(
                      mixtureSet,
                      {
                        where: {
                          id: mixtureId,
                        },
                        transaction,
                      }
                    );
                  } else {
                    await db.NutrientManagementFertilizerMixture.create(
                      mixtureSet,
                      {
                        transaction,
                      }
                    );
                  }
                }
              }
            }
          }
        }

        if (cost) {
          const nutrientManagementCost = {
            totalNumberOfWorkers: cost?.totalNoOfWorkers ?? 0,
            totalNumberOfHours: cost?.totalNoOfHours ?? 0,
            totalCost: cost?.totalCost ?? 0,
            currencyId: cost?.currencyId ?? null,
            nutrientManagementId: id,
          };
          await db.NutrientManagementCost.create(nutrientManagementCost, {
            transaction,
          });
        }

        await transaction.commit();

        const nutrientManagementData = await db.NutrientManagement.findOne({
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt", "deletedAt"],
          },
          where: { id, userId },
          include: includeAssociations,
          paranoid: true,
        });

        if (req.headers.lang && req.headers.lang != "en") {
          req.translateFunction(
            [nutrientManagementData],
            globalTranslationCache,
            {
              lvl1: true,
              lvl2: true,
              moduleName: "nutrient/management",
            }
          );
        }

        // Restructure response with plantations array
        const restructuredData = restructureResponseWithPlantations(nutrientManagementData);

        return res.json(
          await successResp({
            data: restructuredData,
            msg: success.NUTRIENT_MANAGEMENT_DATA_UPDATED,
          })
        );
      } catch (error) {
        await transaction?.rollback();
        logErrorOccurred(__filename, error);
        return serverError(res, error);
      }
    } catch (error) {
      await transaction?.rollback();
      logErrorOccurred(__filename, error);
      return serverError(res, error);
    }
  }
);

router.delete(
  "/delete/:id",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const transaction = await db.sequelize.transaction();
      try {
        await deleteNutrientManagementAssociation(id, transaction, false);
        await db.NutrientManagement.destroy({
          where: { userId, id },
          force: false,
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: success.NUTRIENT_MANAGEMENT_DATA_DELETED,
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
  "/fertilizers/:name",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const userId = req.user.id;
      const { name } = req.params;

      try {
        const existing = await db.NutrientManagementFertilizerInputs.findOne({
          where: {
            fertilizerName: name,
            [db.Sequelize.Op.or]: [
              { userId },
              { userId: null, nutrientManagementId: null },
            ],
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
