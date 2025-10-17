const express = require("express"),
  router = express.Router(),
  auth = require(rootPath + "/middleware/auth"),
  duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId"),
  translation = require(rootPath + "/middleware/translation");

router.use("/type", auth, translation, require("./types"));
router.use("/stage", auth, translation, require("./stage"));
router.use("/method", auth, translation, require("./method"));

const moment = require("moment"),
  { Op } = require("sequelize"),
  db = require(rootPath + "/models"),
  { isArray, pick, isEmpty, difference } = require("lodash"),
  { error, success } = require(rootPath + "/helpers/language"),
  { errorRespSync, successRespSync, serverError } = require(rootPath +
    "/helpers/api");

const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { ACTIVITY_TYPES } = require("../../constants/ACTIVITY_TYPES");
const {
  validateCropType,
  addWeedToVariety,
  validateVarietyBelongsToUser,
  deleteWeedVariety,
  deleteWeedType,
  addWeedDates,
  validateWeedManualMethod,
  validateFarmBelongsToUser,
  validateSegmentBelongsToUser,
  deleteWeedStage,
  deleteWeedMethod,
  deleteWeedDate,
  validateWeedType,
  validateWeedStage,
  validateWeedMethod,
  addWeedToType,
  addWeedToStage,
  addWeedToMethod,
  addWeedToAppMethod,
  addWeedToFarm,
  addWeedToSegment
} = require("./utils");
const { updateActivityToTraceability, addWeedControlToTraceability } = require(rootPath + "/helpers/autoTraceabilityHelper");
const { restructureResponseWithPlantations } = require(rootPath + "/helpers/restructurePlantationsResponse");


const includeAssociations = [
  db.user_farm,
  {
    model: db.Geofence,
    as: "segments",
    include: [
      {
        as: "farm",
        model: db.user_farm,
      },
    ],
  },
  {
    model: db.weed_date,
    as: "weed_dates",
    attributes: ["date"],
  },
  {
    model: db.Option,
    as: "weed_cropType",
    attributes: ["id", "name"],
  },
  {
    model: db.Crop,
    as: "weed_variety",
    through: { model: db.weed_crop_vatiety, attributes: [] },
    attributes: ["id", "name"],
  },
  {
    model: db.WeedType,
    as: "weed_data_type",
    through: { model: db.weeddata_type, attributes: [] },
    attributes: ["id", "name"],
  },
  {
    model: db.WeedStage,
    as: "weed_data_stage",
    through: { model: db.weeddata_stage, attributes: [] },
    attributes: ["id", "name"],
  },
  {
    model: db.WeedMethod,
    as: "weed_method",
    attributes: ["id", "name"],
  },
  {
    model: db.WeedMethod,
    as: "weed_data_manual_method",
    through: { model: db.weeddata_method, attributes: [] },
    attributes: ["id", "name"],
  },
  {
    model: db.UnitsList,
    as: "weed_area_unit_id",
    attributes: ["id", "abbvr"],
  },
  {
    model: db.WeedCost,
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
    model: db.MapWeedingAndHerbicideInputs,
    as: "weedingHerbicideInputs",
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
    include: [
      {
        model: db.WeedingHerbicideInputs,
        as: "input",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
          {
            model: db.WeedMethod,
            as: "applicationMethod",
            attributes: ["id", "name"],
          },
          {
            model: db.UnitsList,
            as: "herbicideQuantityUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.UnitsList,
            as: "herbicideRateUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.WeedingHerbicideMixture,
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
 * /weed:
 *   post:
 *     summary: Create weed
 *     description: Create weed on certain segments or farms
 *     tags: [Weed]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       description: Weed details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geofenceIds:
 *                 type: array
 *                 example: [50, 10]
 *               farmIds:
 *                 type: array
 *                 example: [50, 10]
 *               area:
 *                 type: integer
 *                 example: 0
 *               weedingDays:
 *                 type: integer
 *                 example: 0
 *               cropTypeId:
 *                 type: integer
 *                 example: 0
 *               cropVarietyId:
 *                 type: array
 *                 example: [50, 10]
 *               weedTypeId:
 *                 type: array
 *                 example: [50, 10]
 *               date:
 *                 type: date
 *               weedStageId:
 *                 type: array
 *                 example: [50, 10]
 *               weedMethodId:
 *                 type: integer
 *                 example: 1
 *                 required: true
 *               weedManualId:
 *                 type: array
 *                 example: [50, 10]
 *                 required: false
 *               weedApplicationMethodId:
 *                 type: array
 *                 example: [50, 10]
 *                 required: false
 *               herbicideType:
 *                 type: string
 *               herbicideUsed:
 *                 type: integer
 *               herbicideUsedUnitId:
 *                 type: integer
 *               herbicideRate:
 *                 type: integer
 *               herbicideRateUnitId:
 *                 type: integer
 *               recordId:
 *                 type: string
 *                 example: "123ABC"
 *     responses:
 *       200:
 *         description: Returns the weed JSON
 *       500:
 *         description: Server error
 */

router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("Weed"),
  async function (req, res) {
    let transaction = null;
    try {
      let reqFields = [
        "area",
        // 'areaUnitId'
      ];
      let msg = null;
      reqFields.forEach(async function (field) {
        if (!req.body[field]) {
          msg = field + " is required";
          return;
        }
      });

      if (!req.body.weedTypeId) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "Weed type Id is required",
          })
        );
      } else if (!Array.isArray(req.body.weedTypeId)) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "Weed type Id must be an array",
          })
        );
      }
      if (!req.body.weedStageId) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "Weed stage Id is required",
          })
        );
      } else if (!Array.isArray(req.body.weedStageId)) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "Weed stage Id must be an array",
          })
        );
      }
      if (!req.body.date) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "date is required",
          })
        );
      } else if (!Array.isArray(req.body.date)) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "Date must be an array",
          })
        );
      }
      if (!req.body.farmIds && !req.body.geofenceIds) {
        msg = "farmIds or geofenceIds are required";
      }

      if (msg) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: msg,
          })
        );
      }
      if (req.body.geofenceIds && !isArray(req.body.geofenceIds))
        msg = "geofenceIds should be an array!";
      if (req.body.farmIds && !isArray(req.body.farmIds))
        msg = "farmIds should be an array!";
      if (msg) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: msg,
          })
        );
      }

      const userId = req.user.id;
      let data = pick(req.body, reqFields);
      data.area_unit_id = req.body.areaUnitId;
      data.userId = req.user.id;
      if (req.body.recordId) {
        data.recordId = req.body.recordId;
      }
      if (req.body.weedingDays) {
        data.weedingDays = req.body.weedingDays;
      }
      if (req.body.cropVarietyId) {
        if (!Array.isArray(req.body.cropVarietyId)) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Crop variety must be an array",
            })
          );
        } else if (!req.body.cropTypeId) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Please provide crop type",
            })
          );
        }
      }
      if (req.body.cropTypeId) {
        const validatCrop = await validateCropType(req.body.cropTypeId, userId);
        if (!validatCrop) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Crop type selected does not belongs to the user.",
            })
          );
        }
        data.cropTypeId = req.body.cropTypeId;
      }
      if (!req.body.weedMethodId) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "Weed method Id is required",
          })
        );
      } else {
        const validWeedMethod = await validateWeedMethod(
          req.body.weedMethodId,
          userId
        );
        if (!validWeedMethod) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Weed method selected does not belongs to the user or its not added by admin.",
            })
          );
        }
      }
      data.weed_method_id = req.body.weedMethodId;
      if (req.body.weedManualId) {
        if (!Array.isArray(req.body.weedManualId)) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Weed manual method Id must be an array",
            })
          );
        }
      }
      if (req.body.weedTypeId) {
        const validWeedTypeData = await validateWeedType(
          req.body.weedTypeId,
          userId
        );
        if (!validWeedTypeData) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Weed type selected does not belongs to the user or its not added by admin.",
            })
          );
        }
      }
      if (req.body.weedStageId) {
        const validWeedStage = await validateWeedStage(
          req.body.weedStageId,
          userId
        );
        if (!validWeedStage) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Weed stage selected does not belongs to the user or its not added by admin.",
            })
          );
        }
      }
      if (req.body.weedManualId) {
        const validWeedMethod = await validateWeedManualMethod(
          req.body.weedManualId,
          userId
        );
        if (!validWeedMethod) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Weed manual method selected does not belongs to the user or its not added by admin.",
            })
          );
        }
      }

      if (req.body.cropVarietyId?.length) {
        const varietyValid = await validateVarietyBelongsToUser(
          req.body.cropVarietyId,
          userId
        );
        if (!varietyValid) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Crop variety selected does not belong to the user or its not added by admin.",
            })
          );
        }
      }

      // commented out because of technician farmer farms
      // if (req.body.farmIds?.length) {
      //   const validateFarm = await validateFarmBelongsToUser(
      //     req.body.farmIds,
      //     userId
      //   );
      //   if (!validateFarm) {
      //     return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      //       errorRespSync({
      //         code: error.code.UNPROCESSABLE_ENTITY,
      //         msg: "Farm Id selected does not belong to the user.",
      //       })
      //     );
      //   }
      // }
      if (req.body.geofenceIds?.length) {
        const validateSegment = await validateSegmentBelongsToUser(
          req.body.geofenceIds,
          userId
        );
        if (!validateSegment) {
          return res.status(error.code.UNPROCESSABLE_ENTITY).json(
            errorRespSync({
              code: error.code.UNPROCESSABLE_ENTITY,
              msg: "Segment selected does not belong to the user.",
            })
          );
        }
      }
      transaction = await db.sequelize.transaction();
      let result = await db.Weed.create(data, { transaction });

      // get plantation ids
      const plantationIds = req.body.plantationIds || [];


      // add weed to tracebility
      await addWeedControlToTraceability(result, plantationIds, transaction);


      if (req.body.date?.length)
        await addWeedDates(req.body.date, result.id, transaction);
      if (req.body.cropVarietyId?.length)
        await addWeedToVariety(req.body.cropVarietyId, result.id, transaction);
      if (req.body.weedTypeId?.length)
        await addWeedToType(req.body.weedTypeId, result.id, transaction);
      if (req.body.weedStageId?.length)
        await addWeedToStage(req.body.weedStageId, result.id, transaction);
      if (req.body.weedManualId?.length)
        await addWeedToMethod(req.body.weedManualId, result.id, transaction);
      if (req.body.farmIds && req.body.farmIds.length) {
        await addWeedToFarm(req.body.farmIds, result.id, transaction);
      }
      if (req.body.geofenceIds && req.body.geofenceIds.length) {
        await addWeedToSegment(req.body.geofenceIds, result.id, transaction);
      }

      if (req.body.herbicideInputs?.length) {
        const weedId = result.id;
        for (const input of req.body.herbicideInputs) {
          if (input.weedingHerbicideInputId) {
            await db.MapWeedingAndHerbicideInputs.create(
              {
                weedingHerbicideInputId: input.weedingHerbicideInputId,
                weedId,
              },
              {
                transaction,
              }
            );
          } else {
            const {
              herbicideName,
              currencyId,
              cost,
              herbicideQuantity,
              herbicideQuantityUnitId,
              herbicideActiveIngredient,
              herbicideRate,
              herbicideRateUnitId,
              applicationMethodId,
              mixtures,
            } = input;

            const existing = await db.WeedingHerbicideInputs.findOne({
              where: {
                herbicideName: input.herbicideName,
                userId,
              },
            });

            if (existing) {
              await db.MapWeedingAndHerbicideInputs.create(
                {
                  weedingHerbicideInputId: existing.id,
                  weedId,
                },
                {
                  transaction,
                }
              );
            } else {
              const herbicideSet = {
                userId,
                herbicideName,
                currencyId,
                cost,
                herbicideQuantity,
                herbicideQuantityUnitId,
                herbicideActiveIngredient,
                herbicideRate,
                herbicideRateUnitId,
                applicationMethodId,
              };
              Object.keys(herbicideSet).forEach((key) => {
                herbicideSet[key] == undefined ||
                herbicideSet[key] == null ||
                herbicideSet[key] == ""
                  ? delete herbicideSet[key]
                  : {};
              });

              const herbicideInput = await db.WeedingHerbicideInputs.create(
                herbicideSet,
                {
                  transaction,
                }
              );

              await db.MapWeedingAndHerbicideInputs.create(
                {
                  weedingHerbicideInputId: herbicideInput?.id,
                  weedId,
                },
                {
                  transaction,
                }
              );

              if (mixtures && mixtures.length) {
                const herbicideMixtures = mixtures.map((mixture) => {
                  const {
                    ingredientName,
                    percentage,
                    cost,
                    currencyId,
                    quantity,
                    quantityUnitId,
                  } = mixture;

                  return {
                    weedingHerbicideInputId: herbicideInput?.id,
                    ingredientName: ingredientName ?? null,
                    percentage: percentage ?? null,
                    cost: cost ?? null,
                    currencyId: currencyId ?? null,
                    quantity: quantity ?? null,
                    quantityUnitId: quantityUnitId ?? null,
                  };
                });

                await db.WeedingHerbicideMixture.bulkCreate(herbicideMixtures, {
                  transaction,
                });
              }
            }
          }
        }
      }

      if (req.body.cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = req.body.cost;
        const weedCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          weedId: result.id,
        };
        await db.WeedCost.create(weedCost, {
          transaction,
        });
      }

      await transaction.commit();

      let query = {
        // raw: true,
        attributes: {
          exclude: [
            "cropVarietyId",
            "weedMethodId",
            "weedStageId",
            "weedTypeId",
          ],
        },
        include: includeAssociations,
        where: {
          userId: req.user.id,
          id: result.id,
        },
      };
      let resultWeed = await db.Weed.findOne(query);

      return res.json(
        successRespSync({
          msg: success.WEED_CREATED,
          data: resultWeed,
        })
      );
    } catch (err) {
      if (transaction) transaction.rollback();
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
 * /weed/{id}:
 *   delete:
 *     summary: Delete weed
 *     description: Delete weed by id
 *     tags: [Weed]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: weed id
 *     responses:
 *       200:
 *         description: Returns the weed JSON
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.MapWeedingAndHerbicideInputs.destroy(
      { where: { weedId: req.params.id }, force: true },
      {
        transaction,
      }
    );
    await db.Weed.destroy(
      { where: { userId: req.user.id, id: req.params.id } },
      {
        transaction,
      }
    );

    await transaction.commit();

    return res.json(
      successRespSync({
        msg: success.WEED_DELETED,
      })
    );
  } catch (error) {
    console.log(error);
    await transaction?.rollback();
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /weed:
 *   get:
 *     summary: Get weed list
 *     description: Get the list of weed
 *     tags: [Weed]
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
 *         name: offset
 *         required: false
 *         schema:
 *           type: Integer
 *         description: The number of records to skip before starting to collect the result set
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *         description: ASC | DESC | createdAt
 *       - in: query
 *         name: getAllData
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Send 1 for getting all records at once
 *     responses:
 *       200:
 *         description: Returns the list of weed
 *       500:
 *         description: Server error
 */

router.get("/", auth, translation, function (req, res) {
  let limit = parseInt(req.query.limit || 10);
  let offset = parseInt(req.query.offset || 0);
  let order = ["createdAt", "DESC"];
  if (req.query.order) {
    if (req.query.order == "ASC") order = [db.user_farm, "farmName", "ASC"];
    else if (req.query.order == "DESC")
      order = [db.user_farm, "farmName", "DESC"];
  }

  db.Weed.findAndCountAll({
    ...((!req.query?.getAllData || req.query?.getAllData == 0) && {
      limit,
      offset,
    }),
    order: [order],
    where: {
      userId: req.user.id,
    },
    attributes: {
      exclude: ["cropVarietyId", "weedMethodId", "weedStageId", "weedTypeId"],
    },
    include: includeAssociations,
  })
    .then((Allresult) => {
      var results = Allresult.rows;
      res.setHeader("X-Pagination-Count", Allresult.count);
      res.setHeader("X-Pagination-Limit", limit);
      res.setHeader("X-Pagination-Offset", offset);

      if (req.headers.lang && req.headers.lang != "en") {
        results = req.translateFunction(results, globalTranslationCache, {
          lvl1: false,
          lvl2: true,
          moduleName: "weed",
        });
      }

      // restructure the response with plantations
      results = restructureResponseWithPlantations(results, req.user.id);

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: results,
        })
      );
    })
    .catch(async function (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    });
});

/**
 * @swagger
 * /weed/{id}:
 *   put:
 *     summary: Update weed
 *     description: Update weed on certain segments
 *     tags: [Weed]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: weed id
 *     requestBody:
 *       description: Weed details and it's id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geofenceIds:
 *                 type: array
 *                 example: [50, 10]
 *               farmIds:
 *                 type: array
 *                 example: [50, 10]
 *               area:
 *                 type: integer
 *                 example: 0
 *               weedingDays:
 *                 type: integer
 *                 example: 0
 *               cropTypeId:
 *                 type: integer
 *                 example: 0
 *               cropVarietyId:
 *                 type: array
 *                 example: [50, 10]
 *               weedTypeId:
 *                 type: array
 *                 example: [50, 10]
 *               date:
 *                 type: date
 *               weedStageId:
 *                 type: array
 *                 example: [50, 10]
 *               weedMethodId:
 *                 type: integer
 *                 example: 1
 *                 required: true
 *               weedManualId:
 *                 type: array
 *                 example: [50, 10]
 *                 required: false
 *               weedApplicationMethodId:
 *                 type: array
 *                 example: [50, 10]
 *                 required: false
 *               herbicideType:
 *                 type: string
 *               herbicideUsed:
 *                 type: integer
 *               herbicideUsedUnitId:
 *                 type: integer
 *               herbicideRate:
 *                 type: integer
 *               herbicideRateUnitId:
 *                 type: integer
 *               recordId:
 *                 type: string
 *                 example: "123ABC"
 *     responses:
 *       200:
 *         description: Returns the weed JSON
 *       500:
 *         description: Server error
 */

router.put("/:id", auth, async function (req, res) {
  let data = pick(req.body, ["area"]);
  if (req.body.recordId) {
    data.recordId = req.body.recordId;
  }
  data.area_unit_id = req.body.areaUnitId;

  if (isEmpty(data))
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      await errorResp({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "Atleast one column is required",
      })
    );

  let msg = null;
  if (data.geofenceIds && !isArray(data.geofenceIds))
    msg = "geofenceIds should be an array!";
  if (data.farmIds && !isArray(data.farmIds))
    msg = "farmIds should be an array!";
  if (msg)
    return res
      .status(error.code.UNPROCESSABLE_ENTITY)
      .json(errorRespSync({ code: error.code.UNPROCESSABLE_ENTITY, msg: msg }));

  if (!req.body.date) {
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      errorRespSync({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "date is required",
      })
    );
  } else if (!Array.isArray(req.body.date)) {
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      errorRespSync({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "Date must be an array",
      })
    );
  }
  if (!req.body.weedTypeId) {
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      errorRespSync({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "Weed type Id is required",
      })
    );
  } else if (!Array.isArray(req.body.weedTypeId)) {
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      errorRespSync({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "Weed type Id must be an array",
      })
    );
  }
  if (!req.body.weedStageId) {
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      errorRespSync({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "Weed stage Id is required",
      })
    );
  } else if (!Array.isArray(req.body.weedStageId)) {
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      errorRespSync({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "Weed stage Id must be an array",
      })
    );
  }
  if (req.body.weedingDays) {
    data.weedingDays = req.body.weedingDays;
  } else {
    data.weedingDays = null;
  }
  const userId = req.user.id;
  if (req.body.cropVarietyId) {
    if (!Array.isArray(req.body.cropVarietyId)) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Crop variety must be an array",
        })
      );
    } else if (!req.body.cropTypeId) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Please provide crop type",
        })
      );
    }
  }
  if (req.body.cropTypeId) {
    const validatCrop = await validateCropType(req.body.cropTypeId, userId);
    if (!validatCrop) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Crop type selected does not belongs to the user.",
        })
      );
    } else {
      data.cropTypeId = req.body.cropTypeId
    }
  }
  if (!req.body.weedMethodId) {
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      errorRespSync({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "Weed method Id is required",
      })
    );
  } else {
    const validWeedMethod = await validateWeedMethod(
      req.body.weedMethodId,
      userId
    );
    if (!validWeedMethod) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Weed method selected does not belongs to the user or its not added by admin.",
        })
      );
    }
  }
  data.weed_method_id = req.body.weedMethodId;
  if (req.body.weedManualId) {
    if (!Array.isArray(req.body.weedManualId)) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Weed manual method Id must be an array",
        })
      );
    }
  }

  if (req.body.weedTypeId) {
    const validWeedType = await validateWeedType(req.body.weedTypeId, userId);
    if (!validWeedType) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Weed type selected does not belongs to the user or its not added by admin.",
        })
      );
    }
  }
  if (req.body.weedStageId) {
    const validWeedStage = await validateWeedStage(
      req.body.weedStageId,
      userId
    );
    if (!validWeedStage) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Weed stage selected does not belongs to the user or its not added by admin.",
        })
      );
    }
  }
  if (req.body.weedManualId) {
    const validWeedMethod = await validateWeedManualMethod(
      req.body.weedManualId,
      userId
    );
    if (!validWeedMethod) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Weed manual method selected does not belongs to the user or its not added by admin.",
        })
      );
    }
  }
  if (req.body.cropVarietyId?.length) {
    const varietyValid = await validateVarietyBelongsToUser(
      req.body.cropVarietyId,
      userId
    );
    if (!varietyValid) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Crop variety selected does not belong to the user or its not added by admin.",
        })
      );
    }
  }

  // if (req.body.farmIds?.length) {
  //   const validateFarm = await validateFarmBelongsToUser(
  //     req.body.farmIds,
  //     userId
  //   );
  //   if (!validateFarm) {
  //     return res.status(error.code.UNPROCESSABLE_ENTITY).json(
  //       errorRespSync({
  //         code: error.code.UNPROCESSABLE_ENTITY,
  //         msg: "Farm Id selected does not belong to the user.",
  //       })
  //     );
  //   }
  // }
  if (req.body.geofenceIds?.length) {
    const validateSegment = await validateSegmentBelongsToUser(
      req.body.geofenceIds,
      userId
    );
    if (!validateSegment) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Segment selected does not belong to the user.",
        })
      );
    }
  }

  let transaction = null;
  db.Weed.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id,
    },
    attributes: {
      exclude: ["cropVarietyId", "weedMethodId", "weedStageId", "weedTypeId"],
    },
    include: includeAssociations,
  })
    .then(async (weed) => {
      if (!weed) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          errorRespSync({
            msg: `Weed with id ${req.params.id} not found`,
          })
        );
      }
      transaction = await db.sequelize.transaction();

      if (req.body.farmIds) {
        let oldFarmIds = [];
        if (weed.user_farms && weed.user_farms.length)
          oldFarmIds = weed.user_farms.map((farm) => farm.id);

        let destroy = difference(oldFarmIds, req.body.farmIds);
        let create = difference(req.body.farmIds, oldFarmIds);
        if (destroy && destroy.length) {
          await db.MapWeedFarms.destroy({
            where: {
              weedId: weed.id,
              userFarmId: {
                [Op.in]: destroy,
              },
            },
            transaction: transaction,
          });
        }

        if (create && create.length) {
          await addWeedToFarm(create, weed.id, transaction);
        }
      }

      if (req.body.geofenceIds) {
        let oldGeofenceIds = [];
        if (weed.segments && weed.segments.length)
          oldGeofenceIds = weed.segments.map((segment) => segment.id);

        let destroy = difference(oldGeofenceIds, req.body.geofenceIds);
        let create = difference(req.body.geofenceIds, oldGeofenceIds);

        if (destroy && destroy.length) {
          await db.MapWeedGeofences.destroy({
            where: {
              weedId: weed.id,
              geofenceId: {
                [Op.in]: destroy,
              },
            },
            transaction: transaction,
          });
        }

        if (create && create.length) {
          await addWeedToSegment(create, weed.id, transaction);
        }
      }
      await deleteWeedVariety(weed.id, transaction);
      await deleteWeedType(weed.id, transaction);
      await deleteWeedStage(weed.id, transaction);
      await deleteWeedMethod(weed.id, transaction);
      await deleteWeedDate(weed.id, transaction);

      if (req.body.date?.length)
        await addWeedDates(req.body.date, weed.id, transaction);
      if (req.body.cropVarietyId?.length)
        await addWeedToVariety(req.body.cropVarietyId, weed.id, transaction);
      if (req.body.weedTypeId?.length)
        await addWeedToType(req.body.weedTypeId, weed.id, transaction);
      if (req.body.weedStageId?.length)
        await addWeedToStage(req.body.weedStageId, weed.id, transaction);
      if (req.body.weedManualId?.length)
        await addWeedToMethod(req.body.weedManualId, weed.id, transaction);

      await db.WeedCost.destroy(
        { where: { weedId: weed.id } },
        {
          transaction,
        }
      );
      if (req.body.cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = req.body.cost;
        const weedCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          weedId: weed.id,
        };
        await db.WeedCost.create(weedCost, {
          transaction,
        });
      }

      await db.MapWeedingAndHerbicideInputs.destroy(
        { where: { weedId: weed.id }, force: true },
        {
          transaction,
        }
      );
      if (req.body.herbicideInputs?.length) {
        const weedId = weed.id;
        for (const input of req.body.herbicideInputs) {
          if (input.weedingHerbicideInputId) {
            await db.MapWeedingAndHerbicideInputs.create(
              {
                weedingHerbicideInputId: input.weedingHerbicideInputId,
                weedId,
              },
              {
                transaction,
              }
            );
          } else {
            let {
              id: weedingHerbicideInputId,
              herbicideName,
              currencyId,
              cost,
              herbicideQuantity,
              herbicideQuantityUnitId,
              herbicideActiveIngredient,
              herbicideRate,
              herbicideRateUnitId,
              applicationMethodId,
              mixtures,
            } = input;

            const herbicideSet = {
              userId,
              herbicideName,
              currencyId,
              cost,
              herbicideQuantity,
              herbicideQuantityUnitId,
              herbicideActiveIngredient,
              herbicideRate,
              herbicideRateUnitId,
              applicationMethodId,
            };

            for (const key in herbicideSet) {
              if (
                herbicideSet[key] == undefined ||
                herbicideSet[key] == null ||
                herbicideSet[key] == ""
              ) {
                delete herbicideSet[key];
              }
            }

            let herbicideInput = null;
            let existing = null;

            if (weedingHerbicideInputId) {
              await db.WeedingHerbicideInputs.update(herbicideSet, {
                where: {
                  id: weedingHerbicideInputId,
                },
                transaction,
              });
              await db.MapWeedingAndHerbicideInputs.create(
                {
                  weedingHerbicideInputId,
                  weedId,
                },
                {
                  transaction,
                }
              );
            } else {
              existing = await db.WeedingHerbicideInputs.findOne({
                where: {
                  herbicideName,
                  userId,
                },
              });

              if (existing) {
                await db.MapWeedingAndHerbicideInputs.create(
                  {
                    weedingHerbicideInputId: existing.id,
                    weedId,
                  },
                  {
                    transaction,
                  }
                );
              } else {
                herbicideInput = await db.WeedingHerbicideInputs.create(
                  herbicideSet,
                  {
                    transaction,
                  }
                );

                await db.MapWeedingAndHerbicideInputs.create(
                  {
                    weedingHerbicideInputId: herbicideInput?.id,
                    weedId,
                  },
                  {
                    transaction,
                  }
                );
              }
            }

            if (mixtures && mixtures.length) {
              const existingMixtureIds = mixtures.map((mixture) => mixture.id);

              const existingMixtures = await db.WeedingHerbicideMixture.findAll(
                {
                  where: {
                    weedingHerbicideInputId:
                      weedingHerbicideInputId ||
                      herbicideInput?.id ||
                      existing.id,
                  },
                }
              );

              for (const existingMixture of existingMixtures) {
                if (!existingMixtureIds.includes(existingMixture.id)) {
                  await db.WeedingHerbicideMixture.destroy(
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
                  weedingHerbicideInputId:
                    weedingHerbicideInputId || herbicideInput?.id || existing.id,
                  ingredientName: ingredientName ?? null,
                  percentage: percentage ?? null,
                  cost: cost ?? null,
                  currencyId: currencyId ?? null,
                  quantity: quantity ?? null,
                  quantityUnitId: quantityUnitId ?? null,
                };

                if (mixtureId) {
                  await db.WeedingHerbicideMixture.update(mixtureSet, {
                    where: {
                      id: mixtureId,
                    },
                    transaction,
                  });
                } else {
                  await db.WeedingHerbicideMixture.create(mixtureSet, {
                    transaction,
                  });
                }
              }
            }
          }
        }
      }

      await weed.update(data, { transaction });


      const plantationIds = req.body.plantationIds || [];

      await transaction.commit();

      // Find the earliest date 
      let earliestDate = null;
      if (req.body.date && req.body.date.length > 0) {
        const parsedDates = req.body.date.map(dateStr => moment.utc(dateStr, "MM/DD/YYYY"));
        earliestDate = moment.min(parsedDates);
      }

      const activityData = {
        id: weed.id,
        userId: req.user.id,
        activity_type: ACTIVITY_TYPES.WEED_CONTROL,
        activity_date: earliestDate || weed.createdAt
      }    

      // update weed control activity to plantation traceability
      await updateActivityToTraceability(activityData, plantationIds, transaction);


      let query = {
        // raw: true,
        attributes: {
          exclude: [
            "cropVarietyId",
            "weedMethodId",
            "weedStageId",
            "weedTypeId",
          ],
        },
        include: includeAssociations,
        where: {
          userId: req.user.id,
          id: req.params.id,
        },
      };
      let result = await db.Weed.findOne(query);

      return res.json(
        successRespSync({
          msg: success.WEED_UPDATED,
          data: result,
        })
      );
    })
    .catch(async function (err) {
      if (transaction) transaction.rollback();
      logErrorOccurred(__filename, err);
      if (err?.msg && err?.customValidationError) {
        return res
          .status(error.code.UNPROCESSABLE_ENTITY)
          .json({ code: error.code.UNPROCESSABLE_ENTITY, msg: err.msg });
      }
      return serverError(res, err);
    });
});

router.get("/herbicide/:name", auth, async function (req, res) {
  try {
    const userId = req.user.id;
    const { name } = req.params;

    try {
      const existing = await db.WeedingHerbicideInputs.findOne({
        where: {
          herbicideName: name,
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
});

router.get("/herbicide", auth, async function (req, res) {
  try {
    const userId = req.user.id;

    try {
      const herbicides = await db.WeedingHerbicideInputs.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
          {
            model: db.WeedMethod,
            as: "applicationMethod",
            attributes: ["id", "name"],
          },
          {
            model: db.UnitsList,
            as: "herbicideQuantityUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.UnitsList,
            as: "herbicideRateUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.WeedingHerbicideMixture,
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
      });

      return res.json(
        successRespSync({
          msg: error.DOESNT_EXISTS,
          data: herbicides,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
