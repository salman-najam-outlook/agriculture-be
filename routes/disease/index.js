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
router.use("/detection", require("./detection"));

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
      let diseaseControlTypes = await db.DiseaseControlTypes.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            attributes: ['id', "name"],
            model: db.DiseaseControlTypeOptions,
            as: "options",
            required: false,
          },
        ],
      });
      let diseaseCulturalManualMethods =
        await db.DiseaseCulturalManualMethods.findAll({
          attributes: ["id", "name"],
        });
        let plantParts = await db.PlantPart.findAll({
        attributes: ["id", "name"],
      });
      let disease = await db.DiseaseTypeAndCropType.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.DiseaseType,
            as: "disease",
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
                model: db.DiseaseSymptoms,
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
                }
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
        diseaseControlTypes = req.translateFunction(
          diseaseControlTypes,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: false,
          }
        );
        diseaseCulturalManualMethods = req.translateFunction(
          diseaseCulturalManualMethods,
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
        disease = req.translateFunction(disease, globalTranslationCache, {
          moduleName: 'disease',
          lvl1: true,
          lvl2: true,
        });
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            applicationMethods,
            cropStages,
            diseaseControlTypes,
            diseaseCulturalManualMethods,
            plantParts,
            disease,
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
