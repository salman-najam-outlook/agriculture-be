const express = require("express");
const { Op } = require('sequelize');
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successRespSync } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

router.use("/management", require("./management"));

router.get(
  "/options",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    const { id: userId } = req.user;
    try {
      let applicationMethods = await db.Option.findAll({
        attributes: ["id", "name"],
        where: {
          groupName: "pest-application-methods",
        },
      });
      let cropStages = await db.CropStage.findAll({
        attributes: ["id", "name"],
      });
      let pestControlTypes = await db.PestControlType.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            attributes: ['id', "name"],
            model: db.PestControlTypeOptions,
            as: "options",
            required: false,

          },
        ],
      });
      let pestCulturalManualMethods = await db.PestCulturalManualMethod.findAll(
        { attributes: ["id", "name"] }
      );
      let plantParts = await db.PlantPart.findAll({
        attributes: ["id", "name"],
      });
      let pests = await db.PestTypeAndCropType.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.PestType,
            as: "pest",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            where: {
              [Op.or]: [
                { userId: { [Op.is]: null } },
                { userId }
              ]
            },
            include: [
              {
                model: db.PestInfestationSymptom,
                as: "symptoms",
                required: false,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                where: {
                  [Op.or]: [
                    { userId: { [Op.is]: null } },
                    { userId }
                  ]
                },
              },
            ],
          },
        ],
      });

      if (req.headers.lang && req.headers.lang != "en") {
        applicationMethods = req.translateFunction(
          applicationMethods,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: false,
          }
        );
        cropStages = req.translateFunction(cropStages, globalTranslationCache, {
          lvl1: true,
          lvl2: false,
        });
        pestControlTypes = req.translateFunction(
          pestControlTypes,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
          }
        );
        pestCulturalManualMethods = req.translateFunction(
          pestCulturalManualMethods,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: false,
          }
        );
        plantParts = req.translateFunction(plantParts, globalTranslationCache, {
          lvl1: true,
          lvl2: false,
        });
        pests = req.translateFunction(pests, globalTranslationCache, {
          moduleName: 'pest',
          lvl1: true,
          lvl2: true,
        });
      }

      // send response
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            applicationMethods,
            cropStages,
            pestControlTypes,
            pestCulturalManualMethods,
            plantParts,
            pests,
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
