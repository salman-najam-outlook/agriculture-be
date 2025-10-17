const express = require("express");
const router = express.Router();
const _ = require("lodash");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { cropRecLangObj, langObj } = require(rootPath + "/helpers/consts");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const cropReportRec = require(rootPath + "/helpers/validators/cropReportRec");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const {
  landPrepration,
  soilMgmt,
  sowingPlanting,
  irrigation,
  weeding,
  harvesting,
  storage,
} = require("./util");
const { Op } = require('sequelize');

router.use("/module", require("./module"));
router.use("/crop-history", require("./cropHistory"));
const translation = require(rootPath + "/middleware/translation");
const reportingTranslation = require(rootPath +
  "/middleware/reportingTranslation");
const recommendationTranslation = require(rootPath +
  "/middleware/recommendationTranslation");
const REPORT_TYPES = {
  COMPREHENSIVE: "comprehensive",
  RECOMMENDATION: "recommendation"
};

/**
 * @swagger
 * /report/recommendation/popup:
 *   get:
 *     summary: get pop up data of module attributes
 *     description: get pop up data of crop reports except general crop information and pest and disease report
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: module
 *        schema:
 *         type: string
 *      - in: query
 *        name: moduleAttr
 *        schema:
 *         type: string
 *      - in: query
 *        name: cropType
 *        schema:
 *         type: string
 *      - in: query
 *        name: cropVariety
 *        schema:
 *         type: string
 *      - in: query
 *        name: historyId
 *        schema:
 *         type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "userData": { "id": 125 }, "report": { "recommendation": ["Field should be ploughed", "Large cardamom grows well"] } } }
 */
router.get(
  "/popup",
  auth,
  translation,
  recommendationTranslation,
  cropReportRec.myCropReport(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { module: moduleId } = req.query;

      let module = await db.CropRecommendationModule.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: { id: moduleId },
      });

      // return res.json(module);

      let result = null;
      switch (module?.name) {
        case "Land Preparation Report":
          result = await landPrepration(req);
          break;
        case "Sowing/Planting Report":
          result = await sowingPlanting(req);
          break;
        case "Soil Management Report":
          result = await soilMgmt(req);
          break;
        case "Irrigation Report":
          result = await irrigation(req);
          break;
        case "Weeding Report":
          result = await weeding(req);
          break;
        case "Harvesting Report":
          result = await harvesting(req);
          break;
        case "Storage Report":
          result = await storage(req);
          break;
      }

      //translation
      // result.report.recommendation =
      //   result.report[cropRecLangObj[req.headers.lang]];

      let resData = {
        report: {},
      };
      resData.userData = result.userData;
      resData.report = result.report;
      // resData.report.moduleName = result.report.moduleName;
      // resData.report.attributeNum = result.report.attributeNum;
      // resData.report.recommendation = result.report.recommendation;

      // "userData": null,
      // "report": {
      //     "moduleNum": null,
      //     "attributeNum": null,
      //     "recommendation": [

      return res.json(
        await successRespSync({
          msg: success.FETCH,
          data: resData,
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
 * /report/recommendation/special-operations:
 *   get:
 *     summary: get special operations data by crop type and practices
 *     description: get special operations data by crop type and practices
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: cropType
 *        schema:
 *         type: string
 *      - in: query
 *        name: practiceId
 *        schema:
 *         type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "cropTypeId": 346, "practiceId": 22, "periodSummary": [ "It is done to protect early shoots from frost damage and ensure the developing potatoes aren't exposed to light, which turns them green and poisonous.", "It also aids to keep the soil loose and destroy weeds.", "When the plant foliage has reached a height of about 20 to 30cm, it is time to earth up.", "Creating a mound of soil around the potatoes can also increase the yield.", "The mounded soil encourages roots to form along the shoots, improving water and nutrient uptake.", "Combine earthing up with weeding between the rows for better efficiency.", "Two or three earthing up should be done at an interval of 15-20 days.", "The first earthing-up should be done when the plants are about 15-25 cm high.", "The second earthing up is often done to cover up the tubers properly.", "First and second earthing should be combine with 1st and 2nd weeding" ] } }
 */
router.get(
  "/special-operations",
  auth,
  recommendationTranslation,
  cropReportRec.specialOperation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { cropType: cropTypeId, practiceId: practiceId } = req.query;
      const { lang = "en" } = req.headers;

      const where = { cropTypeId, practiceId };
      let result = {};

      if (lang === "en") {
        result = await db.SpecialOperationRecommendation.findOne({
          attributes: {
            exclude: [
              "id",
              "updatedAt",
              "createdAt",
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
          where,
        });
      } else if (lang !== "en") {
        result = await req.translateRecommendation(
          "SpecialOperationRecommendation",
          lang,
          where
        );
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
  }
);

/**
 * @swagger
 * /report/recommendation/pest-disease:
 *   get:
 *     summary: get pest report or diseae report data
 *     description: get pest report or diseae report data by pestId or diseaseId and cropType
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: cropType
 *        schema:
 *         type: string
 *      - in: query
 *        name: pestId
 *        description: don't use this param if diseaseId param is in use
 *        schema:
 *         type: string
 *      - in: query
 *        description: don't use this param if pestId param is in use
 *        name: diseaseId
 *        schema:
 *         type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "symptoms": [ "Drying up of the growing point and formation of 'dead heart' in young plant as a result of larval feeding.", "Sometimes the bottom internodes show circular ring like cuts.", "At ear head stage 'white ears' are produced." ], "prevention": [ "Application of BHC and DDT at 0.1% in spray or 1% in dust.", "The spray of fenthion, fenitrothion, quinalphos, phosphamidon and granules of lindane are effective in checking the destruction from this pest." ], "treatment": null, "pestImages": [ { "s3Location": "english1" } ], "diseaseImages": [] } }
 */
router.get(
  "/pest-disease",
  auth,
  translation,
  reportingTranslation,
  cropReportRec.pestAndDisease(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { cropType: cropTypeId, pestId, diseaseId } = req.query;
      let { id: userId, country: location } = req.user;

      const where = { cropTypeId, ...req.langWhere };
      if (!_.isEmpty(pestId)) where.pestId = pestId;
      else where.diseaseId = diseaseId;

      // this cant be helped, if we want to make this cleaner we have to revamp the core crop relationship which will affect everything in the system
      
      let cropName = await db.Option.findOne({where: {
        id : cropTypeId
      }})
      let cropIds = await db.Option.findAll({
        where: {
          name : {[db.Sequelize.Op.like]: `${cropName.name.split("(")[0]}%`}
        }
      })

      let result = await db.PestAndDiseaseRecommendation.findOne({
        include: [
          {
            required: false,
            model: db.PestImage,
            as: "pestImages",
            attributes: ["s3Location"],
            where: {cropTypeId: cropIds.map(crop => crop.id)}
          },
          {
            required: false,
            model: db.DiseaseImage,
            as: "diseaseImages",
            attributes: ["s3Location"],
          },
        ],
        attributes: {
          exclude: [
            "updatedAt",
            "createdAt",
            "cropTypeId",
            "cropVarietyId",
            "pestId",
            "diseaseId",
            "id",
          ],
        },
        where,
        subQuery: false,
        limit: null
      });
      if (_.isEmpty(result))
        result = await db.PestAndDiseaseRecommendation.findOne({
          include: [
            {
              required: false,
              model: db.PestImage,
              as: "pestImages",
              attributes: ["s3Location"],
              where: {cropTypeId: cropIds.map(crop => crop.id)}
            },
            {
              required: false,
              model: db.DiseaseImage,
              as: "diseaseImages",
              attributes: ["s3Location"],
            },
          ],
          attributes: {
            exclude: [
              "updatedAt",
              "createdAt",
              "cropTypeId",
              "cropVarietyId",
              "pestId",
              "diseaseId",
              "id",
            ],
          },
          where: {
            ...where,
            language: 'english',
          },
          subQuery: false,
          limit: null
        });

        if (req.headers.lang && req.headers.lang != "en") {
          location = req.translateFunction(
            {name: location},
            globalTranslationCache,
            {
              lvl1: true,
              lvl2: true,
            }
          );
          location = location?.name
        }

      if (!_.isEmpty(result)) result = { location, ...(await result.toJSON()) };

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

/**
 * @swagger
 * /report/recommendation/general-crop-info:
 *   get:
 *     summary: get general crop information report
 *     description: get general crop information by crop type and crop variety
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: cropType
 *        schema:
 *         type: string
 *      - in: query
 *        name: cropVariety
 *        schema:
 *         type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "id": 1, "region": "Indonesia", "season": "Sep-Nov / Jun-Jul", "requiredDaysForCropMature": "9 - 18 months (differs based on variety)", "potentialYield": "30 - 40 tons (differs based on variety and the projected yield is pertaining to the adoption of dimitra practices", "storability": "Cold storage and freezing (or) Wash, clean fresh cassava roots, and wax them to store for a period of 4-6 months (or) or store in soil (field)itself (or)", "maturityIndices": "Crop duration; cracking of ground cover and sound produced when beating by hand hoe on the ground around the cassava crop", "uniqueFactorOfVariety": "" } }
 */
router.get(
  "/general-crop-info",
  auth,
  translation,
  reportingTranslation,
  cropReportRec.generalCropInfo(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { cropType: cropTypeId, cropVariety: cropVarietyId } = req.query;
      let { id: userId, country: english } = req.user;

      let result = await db.GeneralCropInformationRecommendation.findOne({
        attributes: {
          exclude: ["updatedAt", "createdAt", "cropTypeId", "cropVarietyId"],
        },
        where: { cropTypeId, cropVarietyId, ...req.langWhere },
      });

      if (req.headers.lang && req.headers.lang != "en") {
        english = req.translateFunction(
          {name: english},
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
          }
        );
        english = english?.name
      }

      if (_.isEmpty(result))
        result = await db.GeneralCropInformationRecommendation.findOne({
          attributes: {
            exclude: ["updatedAt", "createdAt", "cropTypeId", "cropVarietyId"],
          },
          where: { cropTypeId, cropVarietyId, language: "english" },
        });

      if (!_.isEmpty(result)) result = { english, ...(await result.toJSON()) };

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

/**
 * Helper to build the comprehensnsiveAnalysis array for crop reports.
 * @param {Object} params - Parameters for building the analysis.
 * @param {Object} params.db - Database object.
 * @param {Array} params.cropTypes - Crop type IDs.
 * @param {number} params.userId - User ID.
 * @param {number} params.page - Page number.
 * @param {number} params.limit - Limit per page.
 * @param {string} params.sort - Sort order.
 * @param {Object} params.where - Where clause for query.
 * @param {Object} params.req - Express request object.
 * @param {Array} params.comparisonAndRecommendation - Comparison and recommendation data.
 * @returns {Promise<Array>} - The comprehensnsiveAnalysis array.
 */
async function buildComprehensiveAnalysis({ db, cropTypes, userId, page, limit, sort, where, req, comparisonAndRecommendation }) {
  // For comparison reports, we should only use the cropTypes passed in, not include comparisonAndRecommendation
  let comprehensnsiveAnalysisQuery = {
    attributes: ["id", "name"],
    raw: true,
    group: ["id"],
    order: [["name", sort]],
  };
  if (_.isEmpty(cropTypes)) {
    comprehensnsiveAnalysisQuery.include = [
      {
        model: db.UserfarmCrop,
        as: "userCropTypes",
        where: { userId },
        attributes: [],
      },
    ];
    // Ensure we only get crops with groupName: "crop-type"
    comprehensnsiveAnalysisQuery.where = {
      groupName: "crop-type",
    };
  }
  if (!_.isEmpty(cropTypes)) {
    comprehensnsiveAnalysisQuery.where = {
      id: cropTypes, // Only use the cropTypes passed in, don't concatenate with comparisonAndRecommendation
      groupName: "crop-type", // Ensure we only get crops
    };
  } else {
    comprehensnsiveAnalysisQuery.where = {
      ...where,
      groupName: "crop-type", // Ensure we only get crops
    };
  }
  let comprehensnsiveAnalysis = await db.Option.findAll(
    comprehensnsiveAnalysisQuery
  );
  comprehensnsiveAnalysis = JSON.parse(
    JSON.stringify(comprehensnsiveAnalysis)
  ).map((el) => {
    el.name = el.name.trim();
    return el;
  });
  let location = req.user.country;
  if (req.headers.lang && req.headers.lang !== "en") {
    location = req.translateFunction(
      { name: location },
      globalTranslationCache,
      {
        lvl1: true,
        lvl2: true,
      }
    );
    location = location?.name;
    comprehensnsiveAnalysis = req.translateFunction(
      comprehensnsiveAnalysis,
      globalTranslationCache,
      {
        lvl1: true,
        lvl2: true,
      }
    );
  }
  const uniqueNamesMap = new Map();
  comprehensnsiveAnalysis.forEach((el) => {
    const match = el.name.match(/\(([^)]+)\)/);
    const country = match ? match[1] : '';
    const nameWithoutCountry = el.name.replace(/\s*\([^)]*\)/g, "").trim();
    const processedElement = {
      id: el.id,
      name: nameWithoutCountry,
      country: country,
      location: el[langObj[req.headers.lang]] || el["english"],
    };
    const processedName = processedElement.name.toLowerCase();
    if (req.user.country === processedElement.country) {
      uniqueNamesMap.set(processedName, processedElement);
    } else if (!uniqueNamesMap.has(processedName)) {
      uniqueNamesMap.set(processedName, processedElement);
    }
  });
  comprehensnsiveAnalysis = Array.from(uniqueNamesMap.values());
  comprehensnsiveAnalysis = comprehensnsiveAnalysis.map(el => ({
    id: el.id,
    name: el.name,
    location: el[langObj[req.headers.lang]] || el["english"]
  }));
  return comprehensnsiveAnalysis;
}

/**
 * @swagger
 * /report/recommendation/crop-reports:
 *   get:
 *     summary: get data for my crop report screen
 *     description: list all users registered cropType data for Comprehensnsive Analysis, Comparison And Recommendation, Goals
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: sort
 *        schema:
 *         type: string
 *         enum: [asc,desc]
 *      - in: query
 *        name: cropTypes
 *        description: add multiple crop id's by seperating them with slash(/)
 *        example: 1/2
 *        schema:
 *         type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "english":null, "comprehensnsiveAnalysis": [ { "id": 7, "name": "Cardamom.pdf", "english": "https://dimitra-public-images.s3.amazonaws.com/Cardamom.pdf" } ], "comparisonAndRecommendation": [ { "id": 78, "name": "peach" }, { "id": 336, "name": "Cardamom-Nepal" }, { "id": 494, "name": "Cardamom (Nepal)" }, { "id": 76, "name": "beans" } ], "goals": [] } }
 */
router.get(
  "/crop-reports",
  auth,
  translation,
  cropReportRec.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page = 1, limit = 1000, sort = "asc", reportType = "comprehensive" } = req.query;
      limit = parseInt(limit);
      const { id: userId } = req.user;
      let where = { groupName: "crop-type" };

      // Fetch or initialize the user's report record
      let userCropReport = await db.UserCropReport.findOne({
        where: { userId, language: req.headers.lang || 'en' }
      });
      if (!userCropReport) {
        userCropReport = await db.UserCropReport.create({
          userId,
          comprehensiveCropTypeIds: [],
          comparisonCropTypeIds: [],
          reportType,
          reportData: {},
          language: req.headers.lang || 'en',
        });
      }

      // Parse cropTypes from query for adding new crops
      let cropTypesToAdd = [];
      if (typeof req.query.cropTypes === 'string' && req.query.cropTypes.length > 0) {
        cropTypesToAdd = req.query.cropTypes.split('/').map(String);
      }

      // Always fetch the latest arrays from DB
      let comprehensiveCropTypeIds = Array.isArray(userCropReport.comprehensiveCropTypeIds) ? [...userCropReport.comprehensiveCropTypeIds] : [];
      let comparisonCropTypeIds = Array.isArray(userCropReport.comparisonCropTypeIds) ? [...userCropReport.comparisonCropTypeIds] : [];

      // Add new crop types to the correct array
      if (reportType === 'comprehensive' && cropTypesToAdd.length > 0) {
        comprehensiveCropTypeIds = Array.from(new Set([...comprehensiveCropTypeIds, ...cropTypesToAdd]));
      }
      if (reportType === 'recommendation' && cropTypesToAdd.length > 0) {
        comparisonCropTypeIds = Array.from(new Set([...comparisonCropTypeIds, ...cropTypesToAdd]));
      }

      // Always update the DB if arrays changed
      await userCropReport.update({
        comprehensiveCropTypeIds,
        comparisonCropTypeIds
      });

      // Build the response arrays
      let comprehensnsiveAnalysis = await buildComprehensiveAnalysis({
        db,
        cropTypes: comprehensiveCropTypeIds,
        userId,
        page,
        limit,
        sort,
        where,
        req,
        comparisonAndRecommendation: []
      });
      let comparisonAndRecommendation = await db.Option.findAll({
        attributes: ["id", "name", "groupName"],
        where: {
          id: comparisonCropTypeIds,
          groupName: "crop-type",
        },
        raw: true,
        order: [["name", sort]],
      });
      // If recommendation report and cropTypesToAdd, add them to the response (already in DB)
      if (reportType === 'recommendation' && cropTypesToAdd.length > 0) {
        const newCrops = await db.Option.findAll({
          attributes: ["id", "name", "groupName"],
          where: {
            id: cropTypesToAdd,
            groupName: "crop-type",
          },
          raw: true,
        });
        comparisonAndRecommendation = _.uniqBy([...comparisonAndRecommendation, ...newCrops], 'id');
      }
      return res.json(successRespSync({
        msg: success.FETCH,
        data: {
          comprehensnsiveAnalysis,
          comparisonAndRecommendation,
          goals: [],
        },
      }));
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /report/recommendation/crop-pdf:
 *   get:
 *     summary: list only Comprehensnsive Analysis crop reports of all selected crop type
 *     description: list only Comprehensnsive Analysis crop reports of all selected crop type
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: cropType
 *        description: seperate multiple crop id's using slash(/) e.g. 1/2/4
 *        schema:
 *         type: string
 *      - in: query
 *        name: sort
 *        schema:
 *         type: string
 *         enum: [asc,desc]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 7, "name": "Cardamom.pdf", "english": "https://dimitra-public-images.s3.amazonaws.com/Cardamom.pdf" } ] }
 */
router.get(
  "/crop-pdf",
  auth,
  translation,
  cropReportRec.cropPdf(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page = 1, limit = 1000, sort = "asc", cropType } = req.query;
      limit = parseInt(limit);

      const where = {};
      if (!_.isEmpty(cropType) && typeof cropType === 'string') where.cropTypeId = cropType.split("/");

      const result = await db.ComprehensnsiveAnalysisReport.findAll({
        include: [
          {
            model: db.ComprehensnsiveAnalysisReportsAndCropType,
            as: "mapedCropTypeId",
            attributes: [],
            where,
            required: true,
          },
        ],
        // attributes: ['id', 'name', 'english'],
        offset: (page - 1) * limit,
        limit: limit,
        order: [["name", sort]],
        raw: true,
      });

      //translation
      let resData = {};
      if(!result || (Array.isArray(result) && result.length == 0)) {
        throw new Error("Reports unavailable for this crop")
      }
      resData.location = result[0][langObj[req.headers.lang]];
      resData.id = result[0].id;
      resData.name = result[0].name;
      //  resData.fileS3Key = result[0].fileS3Key

      if (req.headers.lang && req.headers.lang != "en") {
        resData = req.translateFunction(resData, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: [resData],
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
 * /report/recommendation/comprehensive-report:
 *   get:
 *     summary: list only Comprehensnsive Analysis crop reports of all selected crop type
 *     description: list only Comprehensnsive Analysis crop reports of all selected crop type
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: cropType
 *        schema:
 *         type: string
 *      - in: query
 *        name: sort
 *        schema:
 *         type: string
 *         enum: [asc,desc]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 7, "name": "Cardamom.pdf", "english": "https://dimitra-public-images.s3.amazonaws.com/Cardamom.pdf" } ] }
 */
router.get(
  "/comprehensive-report",
  auth,
  translation,
  cropReportRec.comprehensiveReport(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { cropType } = req.query;

      const where = {};
      if (!_.isEmpty(cropType)) where.cropTypeId = cropType;

      const result = await db.ComprehensnsiveAnalysisReport.findAll({
        include: [
          {
            model: db.ComprehensnsiveAnalysisReportsAndCropType,
            as: "mapedCropTypeId",
            attributes: [],
            where,
            required: true,
          },
        ],
        order: [["order", "asc"]],
        raw: true,
        group: ["id"], 
      });

      //translation
      let resData = result.map((item) => {
        return {
          id: item.id,
          location: item[langObj[req.headers.lang]] || `https://dimitra-public-images.s3.amazonaws.com/${item.fileS3Key}`,
          type: item.type,
          name: item.name,
        };
      });

      if (req.headers.lang && req.headers.lang != "en") {
        resData = req.translateFunction(resData, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: resData,
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
 * /report/recommendation/options:
 *   get:
 *     summary: list pest and diseases
 *     description: list pest and diseases
 *     tags: [Crop Report Recommendation]
 *     parameters:
 *      - in: query
 *        name: cropType
 *        schema:
 *         type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "pestList": [], "diseaseList": [] } }
 */
router.get(
  "/options",
  auth,
  recommendationTranslation,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { cropType: cropTypeId } = req.query;
      const { lang = "en" } = req.headers;

      let pestList = [];
      let diseaseList = [];
      let where = {};

      if (cropTypeId) {
        where = {
          cropTypeId,
        };
      }

      if (lang === "en") {
        let pestAndDiseaseDropDowns =
          await db.PestAndDiseaseRecommendation.findAll({
            attributes: ["id"],
            include: [
              {
                model: db.CropObservationPestInfestation,
                attributes: ["id", "name"],
                as: "pests",
              },
              {
                model: db.CropObservationDisease,
                attributes: ["id", "name"],
                as: "diseases",
              },
            ],
            where,
          });

        pestList = pestAndDiseaseDropDowns.map((p) => {
          if (p.pests) {
            return p.pests;
          }
        });
        diseaseList = pestAndDiseaseDropDowns.map((p) => {
          if (p.diseases) {
            return p.diseases;
          }
        });
        pestList = _.uniqBy(pestList, "id");
        diseaseList = _.uniqBy(diseaseList, "id");

        pestList = pestList
          .filter((p) => p)
          .filter((p) => p.name.toLowerCase() !== "see dd here");
        diseaseList = diseaseList
          .filter((p) => p)
          .filter((p) => p.name.toLowerCase() !== "see dd here");
      } else if (lang !== "en") {
        const result = await req.translateRecommendation("options", lang, where);
        pestList = result.pestList;
        diseaseList = result.diseaseList;
      }

      return res.json(
        await successRespSync({
          msg: success.FETCH,
          data: {
            pestList,
            diseaseList,
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
