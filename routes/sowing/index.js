const moment = require("moment"),
  express = require("express"),
  router = express.Router(),
  { Op } = require("sequelize"),
  db = require(rootPath + "/models"),
  { isArray, pick, isEmpty, difference } = require("lodash"),
  auth = require(rootPath + "/middleware/auth"),
  translation = require(rootPath + "/middleware/translation"),
  { error, success } = require(rootPath + "/helpers/language"),
  {
    errorResp,
    successRespSync,
    errorRespSync,
    serverError,
  } = require(rootPath + "/helpers/api");

const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { addSowingToTraceability } = require(rootPath + "/helpers/autoTraceabilityHelper");

const { restructureResponseWithPlantations } = require("../../helpers/restructurePlantationsResponse");
const {
  validatePlantingType,
  validateCropType,
  validateVarietyBelongsToUser,
} = require("./utils");

const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
router.use("/types", auth, translation, require("./types"));

/**
 * @swagger
 * /sowing:
 *   post:
 *     summary: Create sowing
 *     description: Create sowing on certain segments
 *     tags: [Sowing]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       description: Sowing details
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
 *               areaUnitId:
 *                 type: integer
 *                 example: 5
 *               days:
 *                 type: integer
 *               startDate:
 *                 type: date
 *                 example: '02/17/2022'
 *               endDate:
 *                 type: date
 *                 example: '02/17/2022'
 *               seedingRate:
 *                 type: integer
 *                 example: 50
 *               seedingUnitId:
 *                 type: integer
 *                 example: 4
 *               rowSpacing:
 *                 type: integer
 *                 example: 5
 *               rowSpacingUnitId:
 *                 type: integer
 *                 example: 5
 *               inRowSpacing:
 *                 type: integer
 *                 example: 5
 *               inRowSpacingUnitId:
 *                 type: integer
 *                 example: 5
 *               density:
 *                 type: integer
 *                 example: 5
 *               depth:
 *                 type: integer
 *                 example: 5
 *               depthUnitId:
 *                 type: integer
 *                 example: 5
 *               cropId:
 *                 type: integer
 *               cropVariety:
 *                 type: array
 *                 example: [50, 10]
 *               plantingTypeId:
 *                 type: integer
 *               plantation_id:
 *                 type: string
 *                 description: User-provided plantation ID
 *               recordId:
 *                 type: string
 *           example: { "recordId": "2342342432423432432423432", "geofenceIds": [ 2 ], "farmIds": [ 355 ], "area": 12, "areaUnitId": 5, "days": 0, "startDate": "02/17/2022", "endDate": "02/17/2022", "seedingRate": 50, "seedingUnitId": 4, "rowSpacing": 5, "rowSpacingUnitId": 5, "inRowSpacing": 5, "inRowSpacingUnitId": 5, "density": 5, "depth": 5, "depthUnitId": 5, "cropId": 100, "cropVariety": [ 88 ], "plantingTypeId": 0 }
 *     responses:
 *       200:
 *         description: Returns the sowing JSON
 *       500:
 *         description: Server error
 */

router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("Sowing"),
  async function (req, res) {
    let transaction = null;
    const userId = req.user.id;
    try {
      let reqFields = ["area", "areaUnitId", "startDate", "endDate"];
      let msg = null;
      reqFields.forEach(async function (field) {
        if (!req.body[field]) {
          msg = field + " is required";
          return;
        }
      });

      if (!req.body.farmIds && !req.body.geofenceIds) {
        msg = "farmIds or geofenceIds are required";
      }
      if (msg) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: msg,
          })
        );
      }

      if (req.body.geofenceIds && !isArray(req.body.geofenceIds))
        msg = "geofenceIds should be an array!";
      if (req.body.farmIds && !isArray(req.body.farmIds))
        msg = "farmIds should be an array!";
      if (req.body.cropVariety && !isArray(req.body.cropVariety))
        msg = "cropVariety should be an array!";

      if (msg) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: msg,
          })
        );
      }

      if (
        !moment(req.body.startDate).isValid() ||
        !moment(req.body.endDate).isValid()
      ) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "startDate and endDate must be date",
          })
        );
      }

      // if(moment(req.body.startDate).isBefore() || moment(req.body.endDate).isBefore())
      //   return res.status(error.code.UNPROCESSABLE_ENTITY).json(await errorResp({
      //     code: error.code.UNPROCESSABLE_ENTITY,
      //     msg: 'startDate and endDate must be in future'
      //   }));

      if (moment(req.body.endDate).isBefore(moment(req.body.startDate)))
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "endDate must be after startDate",
          })
        );
      if (req.body.plantingTypeId) {
        await validatePlantingType(req.body.plantingTypeId, userId);
      }
      if (req.body.cropId) {
        await validateCropType(req.body.cropId, userId);
      }
      if (req.body.cropVariety?.length)
        await validateVarietyBelongsToUser(req.body.cropVariety, userId);

      let optionalFields = [
        "plantingTypeId",
        "cropId",
        "cropVariety",
        "days",
        "seedingRate",
        "seedingUnitId",
        "rowSpacing",
        "rowSpacingUnitId",
        "inRowSpacing",
        "inRowSpacingUnitId",
        "density",
        "depth",
        "depthUnitId",
        "plantation_id",
      ];

      let data = pick(req.body, optionalFields);
      const { plantingTypeId } = data;
      delete data.plantingTypeId;
      data.area = req.body.area;
      data.areaUnitId = req.body.areaUnitId;
      data.startDate = moment(req.body.startDate).format();
      data.endDate = moment(req.body.endDate).format();
      
      data.plantation_status = true;

      transaction = await db.sequelize.transaction();

      data.userId = req.user.id;
      data.recordId = req.body.recordId;
      let result = await db.Sowing.create(data, { transaction });

      if (req.body.plantingTypeId && req.body.plantingTypeId.length) {
        let plantingTypeData = [];
        plantingTypeId.forEach((plant) => {
          plantingTypeData.push({
            sowingId: result.id,
            plantingTypeId: plant,
          });
        });
        await db.MapSowingPlantingType.bulkCreate(plantingTypeData, {
          transaction,
        });
      }

      if (req.body.geofenceIds && req.body.geofenceIds.length) {
        const segmentDataPromises =  req.body.geofenceIds.map(async(geofenceId) => {
          const segment = await db.Geofence.findOne({
            where: {
              [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
            }
          });
          if(segment) {
            return {
            geofenceId: segment.id,
            sowingId: result.id,
            }
          }
        });
        const segmentData = await Promise.all(segmentDataPromises);
        await db.MapSowingGeofences.bulkCreate(segmentData, { transaction });
      }

      if (req.body.farmIds && req.body.farmIds.length) {

        const farmDataPromises =  req.body.farmIds.map(async(userFarmId)=>{
          const _farm = await db.user_farm.findOne({
            where: {
              [Op.and]: [
                {
                  [Op.or]: [
                    { id: userFarmId}, 
                    { recordId: userFarmId }
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
              userFarmId: _farm.id,
              sowingId: result.id,
            }
          }
        });
        const farmData = await Promise.all(farmDataPromises);
        await db.MapSowingFarms.bulkCreate(farmData, { transaction });
      }

      if (req.body.cropVariety && req.body.cropVariety.length) {
        let varieties = [];
        req.body.cropVariety.forEach(function (cropId) {
          varieties.push({
            cropId,
            sowingId: result.id,
          });
        });
        await db.MapSowingCrop.bulkCreate(varieties, { transaction });
      }

      if (req.body.cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = req.body.cost;
        const sowingCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          sowingId: result.id,
        };
        await db.SowingCost.create(sowingCost, {
          transaction,
        });
      }

      // Add sowing activity to plantation traceability
      await addSowingToTraceability(result, req.user.id, transaction);

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.SOWING_CREATED,
          data: result,
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
 * /sowing:
 *   get:
 *     summary: Get sowing list
 *     description: Get the list of sowings
 *     tags: [Sowing]
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
 *     responses:
 *       200:
 *         description: Returns the list of sowings
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

  db.Sowing.findAndCountAll({
    ...((!req.query?.getAllData || req.query?.getAllData == 0) && {
      limit,
      offset,
    }),
    order: [order],
    where: {
      userId: req.user.id,
    },
    include: [
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
      db.Crop,
      db.Option,
      {
        model: db.PlantingTypes,
        as: "sowing_planting_type_assoc",
      },
      {
        model: db.UnitsList,
        as: "areaunit",
      },
      {
        model: db.UnitsList,
        as: "seedingunit",
      },
      {
        model: db.UnitsList,
        as: "rowspacing",
      },
      {
        model: db.UnitsList,
        as: "inrowspacing",
      },
      {
        model: db.UnitsList,
        as: "depthspacing",
      },
      {
        model: db.SowingCost,
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
      }
    ],
  })
    .then((Allresult) => {
      var results = Allresult.rows;
      res.setHeader("X-Pagination-Count", Allresult.count);
      res.setHeader("X-Pagination-Limit", limit);
      res.setHeader("X-Pagination-Offset", offset);

      results = req.translateFunction(results, globalTranslationCache, {
        lvl1: false,
        lvl2: true,
        moduleName: "sowing",
      });

      // restructuring response
      results = restructureResponseWithPlantations(results);

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
 * /sowing/{id}:
 *   delete:
 *     summary: Delete sowing
 *     description: Delete sowing by id
 *     tags: [Sowing]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: false
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Sowing id
 *     responses:
 *       200:
 *         description: Returns the sowing JSON
 *       500:
 *         description: Server error
 */

router.delete("/:id", auth, async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const id = req.params.id;
    const userId = req.user.id;

    await db.SowingCost.destroy(
      { where: { sowingId: id } },
      {
        transaction,
      }
    );

    await db.Sowing.destroy(
      {
        where: {
          userId,
          id,
        },
      },
      {
        transaction,
      }
    );
    await transaction.commit();
    return res.json(
      successRespSync({
        msg: success.SOWING_DELETED,
      })
    );
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /sowing/{id}:
 *   put:
 *     summary: Update sowing
 *     description: Update sowing on certain segments
 *     tags: [Sowing]
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
 *         description: sowing id
 *     requestBody:
 *       description: Sowing details and it's id
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
 *                 example: [10, 50]
 *               area:
 *                 type: integer
 *               areaUnitId:
 *                 type: integer
 *                 example: 5
 *               days:
 *                 type: integer
 *               startDate:
 *                 type: date
 *                 example: '02/17/2022'
 *               endDate:
 *                 type: date
 *                 example: '02/17/2022'
 *               seedingRate:
 *                 type: integer
 *                 example: 50
 *               seedingUnitId:
 *                 type: integer
 *                 example: 4
 *               rowSpacing:
 *                 type: integer
 *                 example: 5
 *               rowSpacingUnitId:
 *                 type: integer
 *                 example: 5
 *               inRowSpacing:
 *                 type: integer
 *                 example: 5
 *               inRowSpacingUnitId:
 *                 type: integer
 *                 example: 5
 *               density:
 *                 type: integer
 *                 example: 5
 *               depth:
 *                 type: integer
 *                 example: 5
 *               depthUnitId:
 *                 type: integer
 *                 example: 5
 *               cropId:
 *                 type: integer
 *               cropVariety:
 *                 type: array
 *               plantingTypeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Returns the sowing JSON
 *       500:
 *         description: Server error
 */

router.put("/:id", auth, async function (req, res) {
  const userId = req.user.id;
  let data = pick(req.body, [
    "plantation_id",
    "farmIds",
    "area",
    "startDate",
    "endDate",
    "areaUnitId",
    "days",
    "cropId",
    "cropVariety",
    "plantingTypeId",
    "geofenceIds",
    "seedingRate",
    "seedingUnitId",
    "rowSpacing",
    "rowSpacingUnitId",
    "inRowSpacing",
    "inRowSpacingUnitId",
    "density",
    "depth",
    "depthUnitId",
    "plantation_status"
  ]);
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
  if (data.cropVariety && !isArray(data.cropVariety))
    msg = "cropVariety should be an array!";
  if (msg)
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      await errorResp({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: msg,
      })
    );

  if (
    (data.startDate && !moment(data.startDate).isValid()) ||
    (data.endDate && !moment(data.endDate).isValid())
  )
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      await errorResp({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "startDate and endDate must be date",
      })
    );

  // if((data.startDate && moment(data.startDate).isBefore()) || (data.endDate && moment(data.endDate).isBefore()))
  //   return res.status(error.code.UNPROCESSABLE_ENTITY).json(await errorResp({
  //     code: error.code.UNPROCESSABLE_ENTITY,
  //     msg: 'startDate and endDate must be in future'
  //   }));

  if (
    data.startDate &&
    data.endDate &&
    moment(data.endDate).isBefore(moment(data.startDate))
  )
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      await errorResp({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "endDate must be after startDate",
      })
    );

  let transaction = null;
  db.Sowing.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id,
    },
    include: [
      db.Crop,
      db.user_farm,
      {
        model: db.PlantingTypes,
        as: "sowing_planting_type_assoc",
      },
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
        model: db.SowingCost,
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
  })
    .then(async (sowing) => {
      if (!sowing) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: `Sowing with id ${req.params.id} not found`,
          })
        );
      }
      if (
        !data.endDate &&
        data.startDate &&
        moment(data.startDate).isBefore(moment(sowing.endDate))
      ) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "endDate must be after startDate",
          })
        );
      }

      if (req.body.cropId) {
        await validateCropType(req.body.cropId, userId);
      }
      if (req.body.plantingTypeId) {
        await validatePlantingType(req.body.plantingTypeId, userId);
      }
      if (req.body.cropVariety?.length)
        await validateVarietyBelongsToUser(req.body.cropVariety, userId);

      transaction = await db.sequelize.transaction();
      if (
        !req.body.cropVariety ||
        (Array.isArray(req.body.cropVariety) &&
          req.body.cropVariety.length == 0)
      ) {
        oldVarieties = sowing.Crops.map((crop) => crop.id);
        await db.MapSowingCrop.destroy({
          where: {
            sowingId: sowing.id,
            cropId: {
              [Op.in]: oldVarieties,
            },
          },
          transaction: transaction,
        });
      }

      if (req.body.cropVariety && req.body.cropVariety.length) {
        let oldVarieties = [];
        if (sowing.Crops && sowing.Crops.length)
          oldVarieties = sowing.Crops.map((crop) => crop.id);

        let destroy = difference(oldVarieties, req.body.cropVariety);
        let create = difference(req.body.cropVariety, oldVarieties);
        if (destroy && destroy.length) {
          await db.MapSowingCrop.destroy({
            where: {
              sowingId: sowing.id,
              cropId: {
                [Op.in]: destroy,
              },
            },
            transaction: transaction,
          });
        }

        if (create && create.length) {
          let varietyData = create.map(function (cropId) {
            return { cropId, sowingId: sowing.id };
          });
          await db.MapSowingCrop.bulkCreate(varietyData, { transaction });
        }
      }

      if (req.body.plantingTypeId && req.body.plantingTypeId.length) {
        let oldVarieties = [];
        if (
          sowing.sowing_planting_type_assoc &&
          sowing.sowing_planting_type_assoc.length
        )
          oldVarieties = sowing.sowing_planting_type_assoc.map(
            (plant) => plant.id
          );

        let destroy = difference(oldVarieties, req.body.plantingTypeId);
        let create = difference(req.body.plantingTypeId, oldVarieties);
        if (destroy && destroy.length) {
          await db.MapSowingPlantingType.destroy({
            where: {
              sowingId: sowing.id,
              plantingTypeId: {
                [Op.in]: destroy,
              },
            },
            transaction: transaction,
          });
        }

        if (create && create.length) {
          let varietyData = create.map(function (plantingTypeId) {
            return { plantingTypeId, sowingId: sowing.id };
          });
          await db.MapSowingPlantingType.bulkCreate(varietyData, {
            transaction,
          });
        }
      }

      if (req.body.farmIds) {
        let oldFarmIds = [];
        if (sowing.user_farms && sowing.user_farms.length)
          oldFarmIds = sowing.user_farms.map((farm) => farm.id);

        let destroy = difference(oldFarmIds, req.body.farmIds);
        let create = difference(req.body.farmIds, oldFarmIds);
        if (destroy && destroy.length) {
          await db.MapSowingFarms.destroy({
            where: {
              sowingId: sowing.id,
              userFarmId: {
                [Op.in]: destroy,
              },
            },
            transaction: transaction,
          });
        }

        if (create && create.length) {
          const farmDataPromises =  create.map(async(userFarmId)=>{
            const _farm = await db.user_farm.findOne({
              where: {
                [Op.and]: [
                  {
                    [Op.or]: [
                      { id: userFarmId}, 
                      { recordId: userFarmId }
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
                userFarmId: _farm.id,
                sowingId: sowing.id,
              }
            }
          });
          const farmData = await Promise.all(farmDataPromises);
          await db.MapSowingFarms.bulkCreate(farmData, { transaction });
        }
      }

      if (req.body.geofenceIds) {
        let oldGeofenceIds = [];
        if (sowing.segments && sowing.segments.length)
          oldGeofenceIds = sowing.segments.map((segment) => segment.id);

        let destroy = difference(oldGeofenceIds, req.body.geofenceIds);
        let create = difference(req.body.geofenceIds, oldGeofenceIds);

        if (destroy && destroy.length) {
          await db.MapSowingGeofences.destroy({
            where: {
              sowingId: sowing.id,
              geofenceId: {
                [Op.in]: destroy,
              },
            },
            transaction: transaction,
          });
        }

        if (create && create.length) {
          const segmentDataPromises =  create.map(async(geofenceId) => {
            const segment = await db.Geofence.findOne({
              where: {
                [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
              }
            });
            if(segment) {
              return {
              geofenceId: segment.id,
              sowingId: sowing.id,
              }
            }
          });
          const segmentData = await Promise.all(segmentDataPromises);
          await db.MapSowingGeofences.bulkCreate(segmentData, { transaction });
        }
      }

      await db.SowingCost.destroy(
        { where: { sowingId: req.params.id } },
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
        const sowingCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          sowingId: req.params.id,
        };
        await db.SowingCost.create(sowingCost, {
          transaction,
        });
      }
      sowing = await sowing.update(data, { transaction });
      await transaction.commit();

      const sowingData = await db.Sowing.findOne({
        where: { id: req.params.id,  },
        include: [
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
          db.Crop,
          db.Option,
          {
            model: db.PlantingTypes,
            as: "sowing_planting_type_assoc",
          },
          {
            model: db.UnitsList,
            as: "areaunit",
          },
          {
            model: db.UnitsList,
            as: "seedingunit",
          },
          {
            model: db.UnitsList,
            as: "rowspacing",
          },
          {
            model: db.UnitsList,
            as: "inrowspacing",
          },
          {
            model: db.UnitsList,
            as: "depthspacing",
          },
          {
            model: db.SowingCost,
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
      })
      return res.json(
        successRespSync({
          msg: success.SOWING_UPDATED,
          data: sowingData,
        })
      );
    })
    .catch(async function (err) {
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
    });
});

module.exports = router;
