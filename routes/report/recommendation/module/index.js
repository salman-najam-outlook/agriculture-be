const express = require("express");
const router = express.Router();
const _ = require("lodash");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const cropReportRec = require(rootPath + "/helpers/validators/cropReportRec");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const translation = require(rootPath + "/middleware/translation");
const recommendationTranslation = require(rootPath +
  "/middleware/recommendationTranslation");

/**
 * @swagger
 * /report/recommendation/module:
 *   get:
 *     summary: Get Crop Report Recommendaton modules
 *     description: Get Crop Report Recommendaton modules
 *     tags: [Crop Report Recommendation]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 9, "name": "General Information Report" }, { "id": 7, "name": "Harvesting Report" }, { "id": 4, "name": "Irrigation Report" }, { "id": 1, "name": "Land Prepration Report" }, { "id": 6, "name": "Pest and Disease Management Report" }, { "id": 3, "name": "Soil Management Report" }, { "id": 2, "name": "Sowing Report" }, { "id": 8, "name": "Storage Report" }, { "id": 5, "name": "Weeding Report" } ] }
 */
router.get("/", auth, translation, async (req, res) => {
  try {
    let { country: location } = req.user;
    let result = await db.CropRecommendationModule.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });

    if (req.headers.lang && req.headers.lang != "en") {
      location = req.translateFunction(
        { name: location },
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
        }
      );
      location = location?.name;
    }

    if (!_.isEmpty(result)) result = { location, modules: result };

    if (req.headers.lang && req.headers.lang != "en") {
      result = req.translateFunction(result, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      });
    }

    return res.json(
      await successRespSync({
        msg: success.FETCH,
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
 * /report/recommendation/module/attribute:
 *   get:
 *     summary: Get Crop Report Recommendaton modules attributes
 *     description: Get Crop Report Recommendaton modules attributes
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: moduleId
 *        schema:
 *         type: string
 *        example: 1
 *      - in: query
 *        name: cropTypeId
 *        schema:
 *         type: string
 *        example: 1
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 379, "moduleId": 88, "name": "Land Prepration Window", "type": "info", "category": null }, { "id": 380, "moduleId": 88, "name": "Soil/Land Prepration Activities", "type": "info", "category": null } ] }
 */
router.get(
  "/attribute",
  auth,
  translation,
  recommendationTranslation,
  cropReportRec.moduleAttr(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { cropTypeId, moduleId } = req.query;
      let { country: location } = req.user;
      const { lang } = req.headers;

      let result = {};
      if (lang === "en") {
        result = await db.CropRecommendationModuleAttribute.findAll({
          attributes: {
            exclude: [
              "deletedAt",
              "createdAt",
              "updatedAt",
              "ddName",
              "hindi",
              "marathi",
              "nepali",
              "spanish",
              "indonesian",
              "arabic",
              "portugese",
              "french",
              "vietnamese",
              "amharic",
              "somali",
              "oromo",
              "bengali",
              "swahili",
              "turkish",
              "greek",
              "dutch"
            ],
          },
          where: { moduleId },
          include: [
            {
              model: db.CropRecommendation,
              as: "cropRecommendation",
              attributes: [],
              where: {
                cropTypeId: cropTypeId,
                moduleId: moduleId,
              },
              required: true,
            },
          ],
          distinct: true,
          group: ["id"], 
          order: [["id", "ASC"]],
        });

        const scaleResult = await db.CropRecommendationModuleAttribute.findAll({
          attributes: {
            exclude: [
              "deletedAt",
              "createdAt",
              "updatedAt",
              "ddName",
              "hindi",
              "marathi",
              "nepali",
              "spanish",
              "indonesian",
              "arabic",
              "portugese",
              "french",
              "vietnamese",
              "amharic",
              "somali",
              "oromo",
              "bengali",
              "swahili",
              "turkish",
              "greek",
              "dutch"
            ],
          },
          where: { moduleId },
          include: [
            {
              model: db.ScaleRecommendation,
              as: "scaleRecommendation",
              attributes: [],
              where: {
                cropTypeId: cropTypeId,
                moduleId: moduleId,
              },
              required: true,
            },
          ],
          distinct: true,
          group: ["id"], 
          order: [["id", "ASC"]],
        });

        result = _.concat(result, scaleResult);
      } else if (lang !== "en") {
        result = await req.translateRecommendation(
          "CropRecommendationModuleAttribute",
          lang,
          { cropTypeId: cropTypeId, moduleId }
        );
      }

      if (req.headers.lang && req.headers.lang != "en") {
        location = req.translateFunction(
          { name: location },
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
          }
        );
        location = location?.name;
      }

      if (!_.isEmpty(result)) {
        result = { location, attributes: result };
      }
      if (_.isEmpty(result)) result = {};

      return res.json(
        await successRespSync({
          msg: success.FETCH,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
