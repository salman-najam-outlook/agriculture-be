const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successRespSync } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { listValidation } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

router.use("/management", require("./management"));

router.get(
  "/options",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      let applicationStage = await db.SoilApplicationStage.findAll({
        attributes: ["id", "name"],
        order: [["id", "ASC"]],
      });
      let applicationMethod = await db.SoilApplicationMethod.findAll({
        attributes: ["id", "name"],
        order: [["id", "ASC"]],
      });
      let fertilizerType = await db.FertilizerInputType.findAll({
        attributes: ["id", "name"],
        where:{
          name:{
            [Op.or]: [
              { [Op.like]: '%Organic%' },
              { [Op.like]: '%Synthetic%' }
            ]
          }
        },
        order: [["id", "ASC"]],
      });

      if (req.headers.lang && req.headers.lang != "en") {
        applicationStage = req.translateFunction(
          applicationStage,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: false,
          }
        );
        applicationMethod = req.translateFunction(
          applicationMethod,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: false,
          }
        );
        fertilizerType = req.translateFunction(
          fertilizerType,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: false,
          }
        );
      }

      // send response
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            applicationStage,
            applicationMethod,
            fertilizerType,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);

      return serverError(res, err);
    }
  }
);

router.get(
  "/fertilizers",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    const userId = req.user.id;
    try {
      let fertilizers = await db.NutrientManagementFertilizerInputs.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            {
              userId: null,
              nutrientManagementId: null,
            },
            {
              userId,
            },
          ],
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
        paranoid: true,
      });

      if (req.headers.lang && req.headers.lang != "en") {
        fertilizers = req.translateFunction(
          fertilizers,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: false,
          }
        );
      }
      // send response
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: fertilizers,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);

      return serverError(res, err);
    }
  }
);

module.exports = router;
