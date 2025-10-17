const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { serverError, successRespSync, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { cropObservationValidator } = require(rootPath +
  '/helpers/validators/cropObservation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const {
  validateFarmBelongsToUser,
  validateSegmentBelongsToUser,
} = require('../../irrigation/utils');
const {
  validateFarmsAndSegmentsPayloadData,
} = require('../../equipment/utils');
const {
  addObservationToFarm,
  addObservationToSegment,
  addObservationDeficiency,
  addObservationToxicity,
  addObservationDiseases,
  addObservationPestInfestation,
  addObservationCropVariety,
  removeObservationAdditonalData,
} = require('../observation/utils');
const { Op } = require('sequelize');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId')
const recommendationTranslation = require(rootPath + '/middleware/recommendationTranslation');

/**
 * @swagger
 * /crop/observation/deficiencies:
 *   get:
 *     description: Returns all crops observation deficiencies
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: element
 *         schema:
 *           type: string
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                       element:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "Chlorosis/yellowing of leaves","element": "Nitrogen"}]
 *
 */
router.get('/deficiencies', auth, translation, async (req, res) => {
  try {
    const { element } = req.query;
    let query = {};
    if (notEmpty(element)) {
      query.where = { element };
    }
    let cropDeficiency = await db.CropObservationDeficiency.findAll(query);
    if (req.headers.lang && req.headers.lang != 'en') {
      cropDeficiency = req.translateFunction(cropDeficiency,  globalTranslationCache, {
        lvl1: true,
        lvl2: false,
        moduleName: "observation/deficiencies"
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: cropDeficiency,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/toxicity:
 *   get:
 *     description: Returns all crops observation toxicity
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: element
 *         schema:
 *           type: string
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                       element:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "Dark leaves","element": "Nitrogen"}]
 *
 */
router.get('/toxicity', auth, translation, async (req, res) => {
  try {
    const { element } = req.query;
    let query = {};
    if (notEmpty(element)) {
      query.where = { element };
    }
    let cropToxicity = await db.CropObservationToxicity.findAll(query);
    if (req.headers.lang && req.headers.lang != 'en') {
      cropToxicity = req.translateFunction(cropToxicity,  globalTranslationCache, {
        lvl1: true,
        lvl2: false,
        moduleName: "observation/deficiencies"
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: cropToxicity,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/diseases:
 *   get:
 *     description: Returns all crops observation diseases
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: organism
 *         schema:
 *           type: string
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                       organism:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "Disease name","organism": "Virus"}]
 *
 */
router.get('/diseases', auth, translation, async (req, res) => {
  try {
    const { organism } = req.query;
    let query = {};
    if (notEmpty(organism)) {
      query.where = { organism };
    }
    let cropDisease = await db.CropObservationDisease.findAll(query);
    if (req.headers.lang && req.headers.lang != 'en') {
      cropDisease = req.translateFunction(cropDisease,  globalTranslationCache, {
        lvl1: true,
        lvl2: false,
        moduleName: "observation/diseases"
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: cropDisease,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/pestInfestation:
 *   get:
 *     description: Returns all crops observation pest infestations
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "Infestation name"}]
 *
 */
router.get('/pestInfestation', auth, translation, async (req, res) => {
  try {
    let infestation = await db.CropObservationPestInfestation.findAll();
    infestation = req.translateFunction(infestation,  globalTranslationCache, {
      lvl1: true,
      lvl2: false
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: infestation,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/specialOperationPractice:
 *   get:
 *     description: Returns all crops observation pest infestations
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: cropTypeId
 *         required: true
 *         schema:
 *           type: string
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"practice": "Infestation name"}]
 *
 */
router.get('/specialOperationPractice', auth, recommendationTranslation, async (req, res) => {
  try {
    const { cropTypeId } = req.query;
    const { lang = 'en' } = req.headers;

    let query = {
      attributes: {
        exclude: [
          'createdAt', 'updatedAt',
          'hindi', 'marathi', 'nepali', 'spanish', 'indonesian', 'arabic', 'portugese', 'french', 'vietnamese', 'amharic', 'somali', 'oromo', 'bengali', 'swahili', 'turkish', 'greek'
        ],
      }
    };
    if (notEmpty(cropTypeId)) {
      query.where = { cropTypeId };
    }
    let specicalOperationPractice = []

    if (lang === 'en') {
      specicalOperationPractice = await db.CropObservationSpecialOperationPractice.findAll(query);

    } else if (lang !== 'en') { 
      specicalOperationPractice = await req.translateRecommendation('CropObservationSpecialOperationPractice', lang, query.where )
    }
    specicalOperationPractice = specicalOperationPractice.filter(item => item.practice)

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: specicalOperationPractice,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/growthStages:
 *   get:
 *     description: Returns all crops growth stages
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                       cropType:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "growth stage name", "cropType": 1, "cropObservation_cropType": {"name": "mangos"}}]
 *
 */
router.get('/growthStages', auth, translation, async (req, res) => {
  try {
    const { cropType } = req.query;
    let query = {
      include: [
        {
          model: db.Option,
          as: 'cropObservation_cropType',
          where: {
            userId: {
              [Op.is]: null
            }
          },
          attributes: ['name'],
        },
      ],
    };
    if (notEmpty(cropType)) {
      query.where = {
        cropType,
      };
    }
    let growthStage = await db.CropObservationGrowthStage.findAll(query);
    growthStage = req.translateFunction(growthStage,  globalTranslationCache, {
      lvl1: true,
      lvl2: true,
      moduleName: "observation/growthstages"
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: growthStage,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/leafSizes:
 *   get:
 *     description: Returns all crops observation leaf sizes
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "leaf size name"}]
 *
 */
router.get('/leafSizes', auth, translation, async (req, res) => {
  try {
    let leafSizes = await db.CropObservationLeafSize.findAll();

   leafSizes = req.translateFunction(leafSizes,  globalTranslationCache, {
      lvl1: true,
      lvl2: false
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: leafSizes,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/jointTypes:
 *   get:
 *     description: Returns all crops observation leaf sizes
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "joint type name"}]
 *
 */
router.get('/jointTypes', auth, translation, async (req, res) => {
  try {
    let jointTypes = await db.CropObservationJointType.findAll();
    jointTypes = req.translateFunction(jointTypes,  globalTranslationCache, {
      lvl1: true,
      lvl2: false
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: jointTypes,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/:
 *   get:
 *     description: Returns all crops observation
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 95, "recordId": "1111111111111116", "userId": 17, "areaPlanted": 123, "cropType": 78, "cropSeason": 40, "dateOfObservation": "2022-08-12T00:00:00.000Z", "growthStage": 1, "germinationRate": 33, "leafColor": "blue", "leafSize": 1, "stemColor": "red", "stemThickness": 12, "plantHeight": 13, "tillerNumber": 343, "appreanceOfFlower": "appereance", "jointType": 1, "notes": "notes", "doc": "pic.jpeg", "createdAt": "2022-04-26T08:51:47.000Z", "updatedAt": "2022-04-26T08:51:47.000Z", "cropObservation_cropType": { "id": 78, "name": "peach" }, "cropObservation_cropSeason": { "id": 40, "name": "long rains" }, "cropObservation_growthStage": { "id": 1, "name": "Germination/emergence" }, "cropObservation_leafSize": { "id": 1, "name": "Broad" }, "cropObservation_jointType": { "id": 1, "name": "Straight" }, "cropObservation_farm": [ { "id": 1, "farmName": "corbett farm" } ], "cropObservation_segment": [], "cropObservation_cropVariety": [ { "id": 45, "name": "banana fruit testing" } ], "cropObservation_diseases": [], "cropObservation_deficiency": [], "cropObservation_pestInfestation": [], "cropObservation_toxicity": [] },]}
 *
 */
router.get('/', auth, translation, async (req, res) => {
  try {
    let { page = 1, limit = 10, order = 'desc' } = req.query;
    const userId = req.user.id;
    let query = {
      where: { userId },
      include: [
        {
          model: db.Option,
          as: 'cropObservation_cropType',
          attributes: ['id', 'name'],
        },
        {
          model: db.Option,
          as: 'cropObservation_cropSeason',
          attributes: ['id', 'name'],
        },
        {
          model: db.CropObservationGrowthStage,
          as: 'cropObservation_growthStage',
          attributes: ['id', 'name'],
        },
        {
          model: db.CropObservationLeafSize,
          as: 'cropObservation_leafSize',
          attributes: ['id', 'name'],
        },
        {
          model: db.CropObservationJointType,
          as: 'cropObservation_jointType',
          attributes: ['id', 'name'],
        },
        {
          model: db.user_farm,
          as: 'cropObservation_farm',
          through: { model: db.CropObservationFarm, attributes: [] },
          attributes: ['id', 'farmName'],
          include: [
            {
              attributes: [
                'id',
                'geofenceName',
                'geofenceArea',
                'geofenceParameter',
              ],
              model: db.Geofence,
              as: 'segments',
            },
          ]
        },
        {
          model: db.Geofence,
          as: 'cropObservation_segment',
          through: { model: db.CropObservationSegment, attributes: [] },
          attributes: ['id', 'geofenceName', 'farmId'],
          include: [
            {
              model: db.user_farm,
              as: 'farm',
              attributes: ['id', 'farmName'],
            },
          ],
        },
        {
          model: db.Crop,
          as: 'cropObservation_cropVariety',
          through: { model: db.CropObservationVariety, attributes: [] },
          attributes: ['id', 'name'],
        },
        {
          model: db.CropObservationDisease,
          as: 'cropObservation_diseases',
          through: { model: db.CropObservationDiseaseList, attributes: [] },
          attributes: ['id', 'name', 'organism'],
        },
        {
          model: db.CropObservationDeficiency,
          as: 'cropObservation_deficiency',
          through: { model: db.CropObservationDeficiencyList, attributes: [] },
          attributes: ['id', 'name', 'element'],
        },
        {
          model: db.CropObservationPestInfestation,
          as: 'cropObservation_pestInfestation',
          through: {
            model: db.CropObservationPestInfestationList,
            attributes: [],
          },
          attributes: ['id', 'name'],
        },
        {
          model: db.CropObservationToxicity,
          as: 'cropObservation_toxicity',
          through: {
            model: db.CropObservationToxicityList,
            attributes: [],
          },
          attributes: ['id', 'name', 'element'],
        },
        {
          model: db.CropObservationCost,
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
      offset: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
      order: [['createdAt', 'desc']],
    };
    if (order === 'asc') {
      query.order = [['createdAt', 'asc']];
    }
    let observation = await db.CropObservation.findAll(query);
    observation = req.translateFunction(observation,  globalTranslationCache, {
      lvl1: false,
      lvl2: true,
      moduleName: "crop/observation"
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: observation,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/observation/:
 *   post:
 *     description: Add new crop observation data
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for submitting new crop observation data
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *            example: { "recordId": "1111111111111116", "farm": [ 1 ], "segment": [], "areaPlanted": 123, "cropSeason": 40, "dateOfObservation": "2022-08-12", "cropType": 78, "cropVariety": [ 45 ], "growthStage": 1, "germinationRate": 33, "leafColor": "blue", "leafSize": 1, "stemColor": "red", "stemThickness": 12, "plantHeight": 13, "tillerNumber": 343, "appreanceOfFlower": "appereance", "jointType": 1, "notes": "notes", "doc": "pic.jpeg", "nitrogenDeficiency": [], "phosphorusDeficiency": [], "potassiumDeficiency": [], "nitrogenToxicity": [], "phosphorusToxicity": [], "pestInfestation": [], "viralDisease": [], "bacterialDisease": [], "fungalDisease": [] }
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
 *                 example: { "success": true, "code": 200, "message": "Crop observation data has been added successfully.", "data": { "id": 95, "recordId": "1111111111111116", "farm": [ 1 ], "segment": [], "areaPlanted": "123", "cropSeason": 40, "dateOfObservation": "2022-08-12", "cropType": 78, "cropVariety": [ 45 ], "growthStage": 1, "germinationRate": 33, "leafColor": "blue", "leafSize": 1, "stemColor": "red", "stemThickness": 12, "plantHeight": 13, "tillerNumber": 343, "appreanceOfFlower": "appereance", "jointType": 1, "notes": "notes", "doc": "pic.jpeg", "nitrogenDeficiency": [], "phosphorusDeficiency": [], "potassiumDeficiency": [], "nitrogenToxicity": [], "phosphorusToxicity": [], "pestInfestation": [], "viralDisease": [], "bacterialDisease": [], "fungalDisease": [], "userId": 17 } }
 *
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('CropObservation'),
  cropObservationValidator(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      let {
        farm,
        segment,
        cropVariety,
        nitrogenDeficiency,
        phosphorusDeficiency,
        potassiumDeficiency,
        nitrogenToxicity,
        phosphorusToxicity,
        pestInfestation,
        viralDisease,
        bacterialDisease,
        fungalDisease,
        cost
      } = req.body;
      nitrogenDeficiency = nitrogenDeficiency || [];
      phosphorusDeficiency = phosphorusDeficiency || [];
      potassiumDeficiency = potassiumDeficiency || [];
      nitrogenToxicity = nitrogenToxicity || [];
      phosphorusToxicity = phosphorusToxicity || [];
      pestInfestation = pestInfestation || [];
      viralDisease = viralDisease || [];
      bacterialDisease = bacterialDisease || [];
      fungalDisease = fungalDisease || [];
      const cropObservationData = ({
        areaPlanted,
        cropType,
        cropSeason,
        dateOfObservation,
        growthStage,
        germinationRate,
        leafColor,
        leafSize,
        stemColor,
        stemThickness,
        plantHeight,
        tillerNumber,
        appreanceOfFlower,
        jointType,
        notes,
        doc,
        recordId,
      } = req.body);
      const userId = req.user.id;
      cropObservationData.userId = userId;
      if (farm?.length) await validateFarmBelongsToUser(farm, userId);
      if (segment?.length) {
        await validateSegmentBelongsToUser(segment, userId);
        await validateFarmsAndSegmentsPayloadData(segment, farm, res);
      }
      const observation = await db.CropObservation.create(cropObservationData, {
        transaction: t,
      });
      if (farm?.length) {
        await addObservationToFarm(farm, observation.id, t);
      }
      if (segment?.length) {
        await addObservationToSegment(segment, observation.id, t);
      }
      if (cropVariety?.length) {
        await addObservationCropVariety(cropVariety, observation.id, t);
      }
      if (
        nitrogenDeficiency.length ||
        phosphorusDeficiency.length ||
        potassiumDeficiency.length
      ) {
        await addObservationDeficiency(
          [
            ...nitrogenDeficiency,
            ...phosphorusDeficiency,
            ...potassiumDeficiency,
          ],
          observation.id,
          t,
        );
      }
      if (nitrogenToxicity.length || phosphorusToxicity.length) {
        await addObservationToxicity(
          [...nitrogenToxicity, ...phosphorusToxicity],
          observation.id,
          t,
        );
      }
      if (pestInfestation.length) {
        await addObservationPestInfestation(pestInfestation, observation.id, t);
      }

      if (
        viralDisease.length ||
        bacterialDisease.length ||
        fungalDisease.length
      ) {
        await addObservationDiseases(
          [...viralDisease, ...bacterialDisease, ...fungalDisease],
          observation.id,
          t,
        );
      }

      if (cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = cost;
        const cropObservationCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          observationId: observation.id,
        };
        await db.CropObservationCost.create(cropObservationCost, {
          transaction: t,
        });
      }

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.CROP_OBSERVATION_CREATED,
          data: {id: observation?.id,
            ...cropObservationData},
        }),
      );
    } catch (err) {
      await t?.rollback();
      if (err?.msg && err?.customValidationError) {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: err.msg,
          }),
        );
      }
      logErrorOccurred(__filename, err);
      return res.json(errorRespSync());
    }
  },
);

/**
 * @swagger
 * /crop/observation/{id}:
 *   put:
 *     description: Update  crop observation data
 *     tags: [Crop Observation]
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     requestBody:
 *       description: Request body for updating crop observation data
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *            example: { "recordId": "1111111111111116", "farm": [ 1 ], "segment": [], "areaPlanted": 123, "cropSeason": 40, "dateOfObservation": "2022-08-12", "cropType": 78, "cropVariety": [ 45 ], "growthStage": 1, "germinationRate": 33, "leafColor": "blue", "leafSize": 1, "stemColor": "red", "stemThickness": 12, "plantHeight": 13, "tillerNumber": 343, "appreanceOfFlower": "appereance", "jointType": 1, "notes": "notes", "doc": "pic.jpeg", "nitrogenDeficiency": [], "phosphorusDeficiency": [], "potassiumDeficiency": [], "nitrogenToxicity": [], "phosphorusToxicity": [], "pestInfestation": [], "viralDisease": [], "bacterialDisease": [], "fungalDisease": [] }
 *     responses:
 *        '404':
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  success: false
 *                  code: 404
 *                  message: Crop observation doesnot exist.
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
 *                 example: { "success": true, "code": 200, "message": "Crop observation data has been added successfully.", "data": { "id": 95, "recordId": "1111111111111116", "farm": [ 1 ], "segment": [], "areaPlanted": "123", "cropSeason": 40, "dateOfObservation": "2022-08-12", "cropType": 78, "cropVariety": [ 45 ], "growthStage": 1, "germinationRate": 33, "leafColor": "blue", "leafSize": 1, "stemColor": "red", "stemThickness": 12, "plantHeight": 13, "tillerNumber": 343, "appreanceOfFlower": "appereance", "jointType": 1, "notes": "notes", "doc": "pic.jpeg", "nitrogenDeficiency": [], "phosphorusDeficiency": [], "potassiumDeficiency": [], "nitrogenToxicity": [], "phosphorusToxicity": [], "pestInfestation": [], "viralDisease": [], "bacterialDisease": [], "fungalDisease": [], "userId": 17 } }
 *
 */
router.put(
  '/:id',
  auth,
  cropObservationValidator(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      let {
        farm,
        segment,
        cropVariety,
        nitrogenDeficiency,
        phosphorusDeficiency,
        potassiumDeficiency,
        nitrogenToxicity,
        phosphorusToxicity,
        pestInfestation,
        viralDisease,
        bacterialDisease,
        fungalDisease,
        cost
      } = req.body;
      nitrogenDeficiency = nitrogenDeficiency || [];
      phosphorusDeficiency = phosphorusDeficiency || [];
      potassiumDeficiency = potassiumDeficiency || [];
      nitrogenToxicity = nitrogenToxicity || [];
      phosphorusToxicity = phosphorusToxicity || [];
      pestInfestation = pestInfestation || [];
      viralDisease = viralDisease || [];
      bacterialDisease = bacterialDisease || [];
      fungalDisease = fungalDisease || [];
      const cropObservationData = ({
        areaPlanted,
        cropType,
        cropSeason,
        dateOfObservation,
        growthStage,
        germinationRate,
        leafColor,
        leafSize,
        stemColor,
        stemThickness,
        plantHeight,
        tillerNumber,
        appreanceOfFlower,
        jointType,
        notes,
        doc,
        recordId,
      } = req.body);
      const userId = req.user.id;
      const observationParamId = req.params.id;
      cropObservationData.userId = userId;
      cropObservationData.growthStage = req.body?.growthStage || null;
      const currentObservationData = await db.CropObservation.findOne({
        where: {
          userId,
          id: observationParamId,
        },
      });
      if (currentObservationData === null) {
        return res.json(
          errorRespSync({
            code: error.code.NOT_FOUND,
            msg: error.CROP_OBSERVATION_DOESNOT_EXIST,
          }),
        );
      }
      if (farm?.length) await validateFarmBelongsToUser(farm, userId);
      if (segment?.length) {
        await validateSegmentBelongsToUser(segment, userId);
        await validateFarmsAndSegmentsPayloadData(segment, farm, res);
      }
      const observationUpdated = await db.CropObservation.update(
        cropObservationData,
        {
          where: {
            id: observationParamId,
          },
        },
        { transaction: t },
      );
      await removeObservationAdditonalData(observationParamId, t);
      if (farm?.length) {
        await addObservationToFarm(farm, observationParamId, t);
      }
      if (segment?.length) {
        await addObservationToSegment(segment, observationParamId, t);
      }
      if (cropVariety?.length) {
        await addObservationCropVariety(cropVariety, observationParamId, t);
      }
      if (
        nitrogenDeficiency.length ||
        phosphorusDeficiency.length ||
        potassiumDeficiency.length
      ) {
        await addObservationDeficiency(
          [
            ...nitrogenDeficiency,
            ...phosphorusDeficiency,
            ...potassiumDeficiency,
          ],
          observationParamId,
          t,
        );
      }
      if (nitrogenToxicity.length || phosphorusToxicity.length) {
        await addObservationToxicity(
          [...nitrogenToxicity, ...phosphorusToxicity],
          observationParamId,
          t,
        );
      }
      if (pestInfestation.length) {
        await addObservationPestInfestation(
          pestInfestation,
          observationParamId,
          t,
        );
      }

      if (
        viralDisease.length ||
        bacterialDisease.length ||
        fungalDisease.length
      ) {
        await addObservationDiseases(
          [...viralDisease, ...bacterialDisease, ...fungalDisease],
          observationParamId,
          t,
        );
      }
      if (cost) {
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = cost;
        const cropObservationCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          observationId: observationParamId,
        };
        await db.CropObservationCost.create(cropObservationCost, {
          transaction: t,
        });
      }

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.CROP_OBSERVATION_UPDATED,
          data: {id:req.params.id, ...cropObservationData},
        }),
      );
    } catch (err) {
      await t?.rollback();
      if (err?.msg && err?.customValidationError) {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: err.msg,
          }),
        );
      }
      logErrorOccurred(__filename, err);
      return res.json(errorRespSync());
    }
  },
);

/**
 * @swagger
 * /crop/observation/:id:
 *   delete:
 *     description: Delete crop observation data
 *     tags: [Crop Observation]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     responses:
 *        '404':
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  success: false
 *                  code: 404
 *                  message: Crop observation doesnot exist.
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Crop observation data has been removed successfully.
 *
 */
router.delete('/:id', auth, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const userId = req.user.id;
    const observationParamId = req.params.id;
    const currentObservationData = await db.CropObservation.findOne({
      where: {
        userId,
        id: observationParamId,
      },
    });
    if (currentObservationData === null) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.CROP_OBSERVATION_DOESNOT_EXIST,
        }),
      );
    }
    await removeObservationAdditonalData(observationParamId, t);
    await db.CropObservation.destroy(
      {
        where: {
          id: observationParamId,
        },
      },
      { transaction: t },
    );
    await t.commit();
    return res.json(
      successRespSync({
        msg: success.CROP_OBSERVATION_REMOVED,
        data: currentObservationData,
      }),
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
