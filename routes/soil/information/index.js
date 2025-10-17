const express = require("express");
const router = express.Router();
const moment = require("moment");
const { Op } = require("sequelize");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { successResp, serverError, successRespSync } = require(rootPath +
  "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const validate = require(rootPath + "/helpers/validation.js");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const translation = require(rootPath + '/middleware/translation');

const includeAssociations = [
  {
    model: db.user_farm,
    as: "farms",
    through: { model: db.SoilInformationFarm, attributes: [] },
    attributes: ["id", "farmName", "registrationNo", "area"],
    include: [
      {
        attributes: ["id", "cropTypeOptId"],
        model: db.UserfarmCrop,
        as: "farmCrops",
        through: { model: db.UserCropFarm, attributes: [] },
        include: [
          { attributes: ["id", "name"], as: "showCropTypes", model: db.Option },
        ],
      },
    ],
  },
  {
    model: db.Geofence,
    as: "segments",
    through: { model: db.SoilInformationSegment, attributes: [] },
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
    model: db.SoilType,
    as: "soilType",
    through: { model: db.SoilInformationSoilType, attributes: [] },
  },
  {
    model: db.UnitsList,
    as: "sulfurUnit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.UnitsList,
    as: "potassiumUnit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.UnitsList,
    as: "phosphorusUnit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.UnitsList,
    as: "nitrogenUnit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.SoilInformationCost,
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
    model: db.Option,
    as: 'crop_type',
    attributes: ['id', 'name'],
  },
];

router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("SoilInformation"),
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      let {
        farms = [],
        segments = [],
        soilType = [],
        soilHealth,
        ph,
        soilTest,
        soilTestLocationLat,
        soilTestLocationLog,
        soilTestLocationAddr,
        soilTestLocationFarmId,
        soilOrganicCarbon,
        nitrogen,
        nitrogenUnitId,
        phosphorus,
        phosphorusUnitId,
        potassium,
        potassiumUnitId,
        sulfur,
        sulfurUnitId,
        calcium,
        magnesium,
        iron,
        zinc,
        boron,
        cost,
        recordId,
        cropType,
      } = req.body;

      // return
      try {
        const set = {
          userId,
          soilHealth,
          ph,
          soilTest,
          soilTestLocationLat,
          soilTestLocationLog,
          soilTestLocationAddr,
          soilTestLocationFarmId,
          soilOrganicCarbon,
          nitrogen,
          nitrogenUnitId,
          phosphorus,
          phosphorusUnitId,
          potassium,
          potassiumUnitId,
          sulfur,
          sulfurUnitId,
          calcium,
          magnesium,
          iron,
          zinc,
          boron,
          recordId,
          cropType,
        };
        Object.keys(set).forEach((key) => {
          set[key] == undefined ||
          set[key] == null ||
          set[key]?.toString().trim() == ""
            ? delete set[key]
            : {};
        });

        let soilInformation = await db.SoilInformation.create(set, {
          transaction,
        });

        // Farms
        if (farms && farms.length) {
          const soilInformationFarmsDataPromises =
            farms?.map(async (farmId) => {
              const _farm = await db.user_farm.findOne({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [
                        { id: farmId}, 
                        { recordId: farmId }
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
                  soilInformationId: soilInformation.id,
                };
              }
            }) || [];
          const soilInformationFarmsData = await Promise.all(
            soilInformationFarmsDataPromises
          );
          await db.SoilInformationFarm.bulkCreate(soilInformationFarmsData, {
            transaction,
          });
        }

        // Segments
        if (segments && segments.length) {
          const soilInformationSegmentsDataPromise = segments?.map(
            async (segmentId) => {
              const segment = await db.Geofence.findOne({
                where: {
                  [Op.or]: [{ id: segmentId }, { recordId: segmentId }],
                },
              });
              if (segment) {
                return {
                  segmentId: segment.id,
                  soilInformationId: soilInformation.id,
                };
              }
            }
          );
          const soilInformationSegmentsData = await Promise.all(
            soilInformationSegmentsDataPromise
          );

          await db.SoilInformationSegment.bulkCreate(
            soilInformationSegmentsData,
            {
              transaction,
            }
          );
        }

        // Soil Type
        if (soilType && soilType.length) {
          const soilInformationSoilType = soilType?.map((soilTypeId) => {
            return {
              soilTypeId: soilTypeId,
              soilInformationId: soilInformation.id,
            };
          });
          await db.SoilInformationSoilType.bulkCreate(soilInformationSoilType, {
            transaction,
          });
        }

        if (cost) {
          const soilInformationCost = {
            ...cost,
            soilInformationId: soilInformation.id,
          };
          await db.SoilInformationCost.create(soilInformationCost, {
            transaction,
          });
        }

        await transaction.commit();

        const soilInformationResponseData = await db.SoilInformation.findOne({
          where: { id: soilInformation.id },
          include: includeAssociations,
        });
        if (req.headers.lang && req.headers.lang != "en") {
          req.translateFunction(
            [soilInformationResponseData],
            globalTranslationCache,
            {
              lvl1: true,
              lvl2: true,
              moduleName: "soil/information",
            }
          );
        }

        return res.json(
          await successResp({
            data: soilInformation,
            msg: success.SOILMANAGEMENTDATA_ADDED,
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
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
      let soilInformationList = await db.SoilInformation.findAndCountAll({
        attributes: {
          exclude: ["userId"],
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
        soilInformationList.rows = req.translateFunction(
          soilInformationList.rows,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
            moduleName: "soil/information",
          }
        );
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: soilInformationList,
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
  duplicateRecordId.handleDuplicateRecordId("SoilInformation"),
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      let { id } = req.params;
      const userId = req.user.id;
      let {
        farms = [],
        segments = [],
        soilType = [],
        soilHealth,
        ph,
        soilTest,
        soilTestLocationLat,
        soilTestLocationLog,
        soilTestLocationAddr,
        soilTestLocationFarmId,
        soilOrganicCarbon,
        nitrogen,
        nitrogenUnitId,
        phosphorus,
        phosphorusUnitId,
        potassium,
        potassiumUnitId,
        sulfur,
        sulfurUnitId,
        calcium,
        magnesium,
        iron,
        zinc,
        boron,
        cost,
        recordId,
        cropType,
      } = req.body;

      // return
      try {
        const set = {
          userId,
          soilHealth,
          ph,
          soilTest,
          soilTestLocationLat,
          soilTestLocationLog,
          soilTestLocationAddr,
          soilTestLocationFarmId,
          soilOrganicCarbon,
          nitrogen,
          nitrogenUnitId,
          phosphorus,
          phosphorusUnitId,
          potassium,
          potassiumUnitId,
          sulfur,
          sulfurUnitId,
          calcium,
          magnesium,
          iron,
          zinc,
          boron,
          cropType,
          recordId,
        };
        Object.keys(set).forEach((key) => {
          set[key] == undefined ||
          set[key] == null ||
          set[key]?.toString().trim() == ""
            ? delete set[key]
            : {};
        });

        let soilInformation = await db.SoilInformation.update(set, {
          where: { id },
          transaction,
        });

        // Farms
        await db.SoilInformationFarm.destroy(
          { where: { soilInformationId: id }, force: true },
          {
            transaction,
          }
        );
        if (farms && farms.length) {
          const soilInformationFarmsDataPromises =
            farms?.map(async (farmId) => {
              const _farm = await db.user_farm.findOne({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [
                        { id: farmId}, 
                        { recordId: farmId }
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
                  soilInformationId: id,
                };
              }
            }) || [];
          const soilInformationFarmsData = await Promise.all(
            soilInformationFarmsDataPromises
          );
          await db.SoilInformationFarm.bulkCreate(soilInformationFarmsData, {
            transaction,
          });
        }

        // Segments
        await db.SoilInformationSegment.destroy(
          { where: { soilInformationId: id }, force: true },
          {
            transaction,
          }
        );
        if (segments && segments.length) {
          const soilInformationSegmentsDataPromise = segments?.map(
            async (segmentId) => {
              const segment = await db.Geofence.findOne({
                where: {
                  [Op.or]: [{ id: segmentId }, { recordId: segmentId }],
                },
              });
              if (segment) {
                return {
                  segmentId: segment.id,
                  soilInformationId: id,
                };
              }
            }
          );
          const soilInformationSegmentsData = await Promise.all(
            soilInformationSegmentsDataPromise
          );
          await db.SoilInformationSegment.bulkCreate(
            soilInformationSegmentsData,
            {
              transaction,
            }
          );
        }

        // Soil Type
        await db.SoilInformationSoilType.destroy(
          { where: { soilInformationId: id }, force: true },
          {
            transaction,
          }
        );
        if (soilType && soilType.length) {
          const soilInformationSoilType = soilType?.map((soilTypeId) => {
            return {
              soilTypeId: soilTypeId,
              soilInformationId: id,
            };
          });
          await db.SoilInformationSoilType.bulkCreate(soilInformationSoilType, {
            transaction,
          });
        }

        //Cost
        await db.SoilInformationCost.destroy(
          { where: { soilInformationId: id }, force: true },
          {
            transaction,
          }
        );
        if (cost) {
          const soilInformationCost = {
            ...cost,
            soilInformationId: id,
          };
          await db.SoilInformationCost.create(soilInformationCost, {
            transaction,
          });
        }

        await transaction.commit();

        const soilInformationData = await db.SoilInformation.findOne({
          attributes: {
            exclude: ["userId"],
          },
          where: { id, userId },
          include: includeAssociations,
          paranoid: true,
        });

        return res.json(
          await successResp({
            data: soilInformationData,
            msg: success.SOILMANAGEMENTDATA_UPDATED,
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

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
        await db.SoilInformationFarm.destroy(
          { where: { soilInformationId: id }, force: false },
          {
            transaction,
          }
        );
        await db.SoilInformationSegment.destroy(
          { where: { soilInformationId: id }, force: false },
          {
            transaction,
          }
        );
        await db.SoilInformationSoilType.destroy(
          { where: { soilInformationId: id }, force: false },
          {
            transaction,
          }
        );
        await db.SoilInformationCost.destroy(
          { where: { soilInformationId: id }, force: false },
          {
            transaction,
          }
        );
        await db.SoilInformation.destroy({
          where: { userId, id },
          force: false,
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: success.SOILMANAGEMENTDATA_DELETED,
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
  "/options",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      let soilType = await db.SoilType.findAll({
        attributes: ["id", "name"],
        order: [["id", "ASC"]],
      });

      soilType = req.translateFunction(soilType, globalTranslationCache, {
        lvl1: true,
        lvl2: false,
        moduleName: null,
      });

      // send response
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            soilType,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);

      return serverError(res, err);
    }
  }
);

module.exports = router;
