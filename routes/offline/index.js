const express = require('express');

const auth = require(rootPath + '/middleware/auth');
const router = express.Router();
const request = require('supertest');

const { successResp, serverError, successRespSync } = require(rootPath +
  '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const rp = require('request-promise');
const { default: axios } = require('axios');
require('dotenv').config();
const db = require(rootPath + '/models');

/**
 * @swagger
 * /offline-api:
 *   get:
 *     description: Get all common data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: {
 *                    crop: [],
 *                    farm: {},
 *                    listOptions: [],
 *                    unit: [],
 *                    userCropType: {},
 *                    userCropVariety: {},
 *                    userUnit: [],
 *                  }
 */
router.get('/', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      await client
        .get('/api/crop')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'crop'),
      await client
        .get('/api/list/options?groupName=crop-type')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropType'),
      await client
        .get('/api/farm')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'farm'),
      await client
        .get('/api/list/options/all')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'listOptions'),
      await client
        .get('/api/soil/type')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'soilType'),
      await client
        .get('/api/unit')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'unit'),
      await client
        .get('/api/user/crop/type')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'userCropType'),
      await client
        .get('/api/user/crop/variety')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'userCropVariety'),
      await client
        .get('/api/unit/user')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'userUnit'),

      // await client.get(`/api/user/crop/variety?cropId=${cropId}`).set("oauth-token", token).set("route", "userCropVariety"),
      // await client.get("/api/list/options?groupName=${groupName}").set("oauth-token", token).set("route", "listOptionsAll"),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/weeding:
 *   get:
 *     description: Get weeding data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: query
 *        name: parentId
 *        required: false
 *        schema:
 *          type: Integer
 *        description: The method id (1 or 2)
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: {
 *                    weed: {},
 *                    weedType: [],
 *                    weedStage: [],
 *                    weedMethod: []
 *                  }
 */
router.get('/weeding', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const parentId = ['', 1, 2];

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      // Weeding
      await client
        .get(`/api/weed`)
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'weed'),
      await client
        .get('/api/weed/type')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'weedType'),
      await client
        .get('/api/weed/stage')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'weedStage'),
      await client
        .get(
          `/api/weed/method?parentId=${JSON.stringify(parentId)}&getAllData=1`
        )
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'weedMethod'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;
      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/harvesting:
 *   get:
 *     description: Get harvesting data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: {
 *                    harvestingLossReason: [],
 *                    harvestingMethodTypes: []
 *                  }
 */
router.get('/harvesting', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      // // Harvesting
      await client
        .get('/api/harvesting/loss_reason')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'harvestingLossReason'),
      await client
        .get('/api/harvesting/method')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'harvestingMethodTypes'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    const harvestingMethodTypes = result.harvestingMethodTypes.map((item) => {
      return {
        action: 'get',
        endPoint: `/harvesting/method/types/${item.id}`,
        lang,
      };
    });
    const promises = [];
    for (let i = 0; i < harvestingMethodTypes.length; i++) {
      promises.push(make_api_call(harvestingMethodTypes[i], token));
    }

    const data = await Promise.all(promises);
    let newHarvestingMethodTypes = result.harvestingMethodTypes.map(
      (item, index) => {
        return {
          ...item,
          harvestingMethodData: data[index].data,
        };
      }
    );
    delete result.harvestingMethodTypes;
    result['harvestingMethodTypes'] = newHarvestingMethodTypes;
    let allHarvestRes = await client
      .get(`/api/harvesting?page=1&limit=10`)
      .set('oauth-token', token)
      .set('lang', lang);
    result['allHarvest'] = allHarvestRes;
    return res.json(
      successRespSync({
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
 * /offline-api/sowing:
 *   get:
 *     description: Get sowing data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: {
 *                    sowingTypes: []
 *                  }
 */
router.get('/sowing', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      // // Sowing and planting
      await client
        .get('/api/sowing/types')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'sowingTypes'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});
    let allSowingRes = await client
      .get('/api/sowing')
      .set('oauth-token', token)
      .set('lang', lang);
    result['allSowing'] = allSowingRes;

    return res.json(
      successRespSync({
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
 * /offline-api/crop-observation:
 *   get:
 *     description: Get crop observation data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: {
 *                    cropObservationToxicity: [],
 *                    cropObservationJointTypes: [],
 *                    cropObservationPestInfestation: [],
 *                    cropObservationGrowthStages: [],
 *                    cropObservationDeficiencies: [],
 *                    cropObservationLeafSizes: [],
 *                    cropObservationDiseases: []
 *                  }
 */
router.get('/crop-observation', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      // Crop Observation options API's
      await client
        .get('/api/crop/observation')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropObservation'),
      await client
        .get('/api/crop/observation/toxicity')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropObservationToxicity'),
      await client
        .get('/api/crop/observation/jointTypes')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropObservationJointTypes'),
      await client
        .get('/api/crop/observation/pestInfestation')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropObservationPestInfestation'),
      await client
        .get('/api/crop/observation/growthStages')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropObservationGrowthStages'),
      await client
        .get('/api/crop/observation/deficiencies')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropObservationDeficiencies'),
      await client
        .get('/api/crop/observation/leafSizes')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropObservationLeafSizes'),
      await client
        .get('/api/crop/observation/diseases')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropObservationDiseases'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});
    result.cropObservation = []
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/crop-registration', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      // Crop Registration options API's
      await client
        .get('/api/farm/crop')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'farmCrop'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/crop-storage:
 *   get:
 *     description: Get crop storage data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: {
 *                    cropStorage: [],
 *                    cropStorageTypes: [],
 *                    cropStorageMethods: []
 *                  }
 */
router.get('/crop-storage', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      // Crop Storage
      await client
        .get(`/api/crop/storage?page=1&limit=10`)
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropStorage'),
      await client
        .get('/api/crop/storage/types')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropStorageTypes'),
      await client
        .get('/api/crop/storage/methods')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'cropStorageMethods'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/soil-preparations:
 *   get:
 *     description: Get soil preparation data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: {
 *                    equipments: [],
 *                    equipmentsType: [],
 *                    practice: [],
 *                    practiceActivity: [],
 *                    soilType: []
 *                  }
 */
router.get('/soil-preparations', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      // Soil Preparations
      await client
        .get('/api/equipments')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipments'),
      await client
        .get('/api/equipments/equipmentType')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipmentsType'),
      await client
        .get('/api/practice')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'practice'),
      await client
        .get('/api/practice/activity')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'practiceActivity'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    const soilTypes = await db.SoilType.findAll();
    result.soilTypes = soilTypes;
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/irrigation', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';
    const id = [1, 2];

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      await client
        .get('/api/irrigation')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'irrigation'),
      await client
        .get('/api/irrigation/types')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'irrigationTypes'),
      await client
        .get('/api/irrigation/schedules')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'irrigationSchedules'),
      await client
        .get('/api/irrigation/stages')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'irrigationStages'),
      await client
        .get('/api/irrigation/waterSources')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'irrigationWaterSources'),
      await client
        .get('/api/irrigation/waterSources/cropWaterMgmt')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'irrigationWaterSourcesCropWaterMgmt'),
      await client
        .get(`/api/irrigation/waterSources/${JSON.stringify(id)}/getOrigins`)
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'irrigationWaterSourcesGetOrigins'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

async function make_api_call(apiData, accessToken, defaultLang = 'en') {
  try {
    let { action, payload, endPoint, lang = defaultLang } = apiData;
    endPoint = endPoint.charAt(0) === '/' ? endPoint.substr(1) : endPoint;
    const fullUrl = `${process.env.BASEURL}/${endPoint}`;
    
    const response = await axios({
      url: fullUrl,
      method: action,
      data: payload,
      headers: {
        'User-Agent': 'client',
        'oauth-token': accessToken,
        lang,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      statusCode: error.response?.status,
      responseData: error.response?.data,
    };
  }
}

router.post('/syncData', auth, async (req, res) => {
  try {
    let apis = req.body;
    token = req.headers['oauth-token'];
    const mongoClient = req.app.locals.mongoClient;

    const results = [];
    for (let i = 0; i < apis.length; i++) {
      const response = await make_api_call(apis[i], token, req.headers.lang ?? 'en');
      const isDuplicateRecordId = response.data?.message === 'recordId already exists';
      const result = {
        success: response.data?.success ?? response.success,
        message: response.success ? 
          (typeof response.data?.message === 'string' ? response.data?.message : 'Unknown error') : 
          (response.message || 'API call failed'),
        status: response.success && isDuplicateRecordId ? 'rejected' : 'fulfilled',
        action: apis[i].action,
        module: apis[i].module,
        initial_payload: apis[i].payload,
        statusCode: response.statusCode,
        apiError: response.responseData,
      };

      if (!response.success || isDuplicateRecordId) {
        result.api_response = {};
      } else {
        const isResponseDataObject = typeof response.data === 'object' && response.data && !Array.isArray(response.data);
        const responseObj = isResponseDataObject ? {
          userId: req.user.id ?? null,
          recordId: apis[i].payload?.recordId || null,
          id: apis[i].payload?.id || null,
          ...(typeof response.data?.data === 'object' ? response.data.data : {})
        } : {};
        result.api_response = responseObj;
      }
      results.push(result);

      if (mongoClient) {
        const db = mongoClient.db(process.env.MONGO_DB);
        const collection = db.collection(process.env.MONGO_DB_Failure_COLLECTION)
        const activityCollection = db.collection(process.env.MONGO_DB_ACTIVITY_COLLECTION)

        await activityCollection.insertOne({
          userId: req.user.id ?? null,
          orgId: req.user.organization ?? null,
          module: apis[i].module,
          endpoint: apis[i].endPoint,
          payload: apis[i].payload,
          response: result.api_response,
          app_version_code: req.headers.app_version_code,
          app_package_name: req.headers.app_package_name,
          app_version_name: req.headers.app_version_name,
          createdAt: new Date()
      })

      if(!response.success || !response.data?.success) {
        const failedRequest = {
          userId: req.user.id ?? null,
          orgId: req.user.organization ?? null,
          module: apis[i].module,
          endpoint: apis[i].endPoint,
          payload: apis[i].payload,
          reason: response.success ? response.data?.message : response.message,
          app_version_code: req.headers.app_version_code,
          app_package_name: req.headers.app_package_name,
          app_version_name: req.headers.app_version_name,
          createdAt: new Date()
        }
        await collection.insertOne(failedRequest);
      }

      }
    }

    return res.json(
      successRespSync({
        msg: 'Data synced successfully',
        data: results,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /offline-api/dashboard:
 *   get:
 *     description: Get dashboard data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "farm": { "farm": 2, "geoFence": 8, "location": 8, "crop": 2, "equipment": 1, "userGoals": 13, "farmAudit": 0, "document": 7 }, "crop": { "soil": 1, "sowing": 1, "landPreparation": 0, "irrigation": 0, "storage": 17, "harvesting": 5, "cropObservation": 6, "userGoal": 14, "weeding": 0 } } }
 */
router.get('/dashboard', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';
    const id = [1, 2];

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      await client
        .get('/api/report/general/farm')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'farm'),
      await client
        .get('/api/report/general/crop')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'crop'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/faq', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      await client.get('/api/faq').set('oauth-token', token).set('lang', lang),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc['data'] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: offlineApiData[0].body.data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/faq/:faq_type', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      await client
        .get(`/api/faq/${req.params.faq_type}`)
        .set('oauth-token', token)
        .set('lang', lang),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc['data'] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: offlineApiData[0].body.data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /offline-api/pest:
 *   get:
 *     description: Get pest management options data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       applicationMethods: [],
 *                       cropStages: [],
 *                       pestControlTypes: [],
 *                       pestCulturalManualMethods: [],
 *                       pestInfestationSymptoms: [],
 *                       pestTypes: [],
 *                       plantParts: []
 *                     }
 */
router.get('/pest', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    // const lang = req.header('lang') || 'en';

    // FIXME segregate all routes to controller and services
    const offlineApiData = await Promise.all([
      await client
        .get('/api/pest/options')
        .set('oauth-token', token)
        // .set('lang', lang)
        .set('route', 'options'),
      await client
        .get('/api/pest/management/list')
        .set('oauth-token', token)
        .set('route', 'pestManagements'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      if (data.request.header.route === 'options') {
        acc = { ...acc, ...data.body.data };
      } else {
        acc[data.request.header.route] = data.body.data;
      }
      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/equipment:
 *   get:
 *     description: Get equipments data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       equipmentGroups: [],
 *                       equipmentCategories: [],
 *                       equipmentModeOfOperations: [],
 *                       equipmentFuelTypes: [],
 *                       equipmentLoanStatus: [],
 *                       equipmentTypes: [],
 *                       equipments: []
 *                     }
 */
router.get('/equipment', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/equipments/groups')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipmentGroups'),
      await client
        .get('/api/equipments/categories')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipmentCategories'),
      await client
        .get('/api/equipments/mode-of-operations')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipmentModeOfOperations'),
      await client
        .get('/api/equipments/fuelType')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipmentFuelTypes'),
      await client
        .get('/api/equipments/loanStatus')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipmentLoanStatus'),
      await client
        .get('/api/equipments/equipmentType')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipmentTypes'),
      await client
        .get('/api/equipments')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'equipments'),
      await client
        .get('/api/farm')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'farms'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/plantation:
 *   get:
 *     description: Get plantation data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       targetsData: []
 *                     }
 */
router.get('/plantation', auth, async(req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/farmers/plantation?page=1&limit=10')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'plantationData'),
      await client
        .get('/api/coffee/farmers/plantation/getDropdownData')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'plantationDropdownData'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;
      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/seedling', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/farmers/seedling?page=1&limit=10')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'seedlingData'),
      await client
        .get('/api/coffee/farmers/seedling/getDropdownData')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'seedlingDropdownData'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/buyingstation-processing:
 *   get:
 *     description: Get plantation data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       processingTypes: [],
 *                       processingBatch: [],
 *                       ordersOptions: []
 *                     }
 */
router.get('/buyingstation-processing', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/buying-station/processing/types')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'processingTypes'),
      await client
        .get('/api/coffee/buying-station/processing')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'processingBatch'),
      await client
        .get('/api/coffee/buying-station/purchase/orders')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'ordersOptions'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] =
        data.body.data?.processingBatch || data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/buyingstation-purchase-orders', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/buying-station/purchase')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'buyingStationOrder'),
      await client
        .get('/api/coffee/farmers')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'farmers'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] =
        data.body.data?.buyingStationOrder || data.body.data?.farmers;

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/buyingstation-buying-report', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/buying-station/purchase')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'buyingStationOrder')
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] =
        data.body.data?.buyingStationOrder;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/farmer-production-chart:
 *   get:
 *     description: Get Farmer Production Chart data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       chartsData: []
 *                     }
 */
 router.get('/farmer-production-chart', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/farmers/production-chart/offline')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'chartsData'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/farmer:
 *   get:
 *     description: Get Farmer data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       farmers: []
 *                     }
 */
router.get('/farmer', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/farmers')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'farmers'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      if (data.request.header.route === 'farmers') {
        acc[data.request.header.route] = data.body.data.farmers;
      } else {
        acc[data.request.header.route] = data.body.data;
      }

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
})

/**
 * @swagger
 * /offline-api/buyingStation:
 *   get:
 *     description: Get Targets data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       targetsData: [],
 *                       chartsData: []
 *                     }
 */
router.get('/buyingStation', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/buying-station/production/target')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'targetsData'),
      await client
        .get('/api/coffee/buying-station/production/offline')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'chartsData'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/dry-milling:
 *   get:
 *     description: Get Targets data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       targetsData: [],
 *                       chartsData: []
 *                     }
 */
 router.get('/dry-milling', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/dry-milling/production-target/list')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'targetsData'),
      await client
        .get('/api/coffee/dry-milling/production-chart/offline')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'chartsData'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/dry-milling/parchment-coffee:
 *   get:
 *     description: Get Targets parchment coffee data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       options: [],
 *                       parchmentCoffeesData: []
 *                     }
 */
 router.get('/dry-milling/parchment-coffee', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/dry-milling/parchment-coffee/options')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'options'),
      await client
        .get('/api/coffee/dry-milling/parchment-coffee/list')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'parchmentCoffeesData'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      if (data.request.header.route === 'options') {
        acc = { ...acc, ...data.body.data };
      } else {
        acc[data.request.header.route] = data.body.data;
      }

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/dry-milling/warehouse:
 *   get:
 *     description: Get Targets warehouse data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       inboundWarehouseData: [],
 *                       outboundWarehouseData: [],
 *                       warehouseReport: []
 *                     }
 */
 router.get('/dry-milling/warehouse', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';

    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/dry-milling/inbound-warehouse/list')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'inboundWarehouseData'),
      await client
        .get('/api/coffee/dry-milling/outbound-warehouse/list')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'outboundWarehouseData'),
      await client
        .get('/api/coffee/dry-milling/report/pdf')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'warehouseReport'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/enquiry:
 *   get:
 *     description: Get Enquiry data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       areaOfRequest: [],
 *                       enquiryData: []
 *                     }
 */
 router.get('/enquiry', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';
    
    const offlineApiData = await Promise.all([
      await client
        .get('/api/enquiry/areaOfRequest')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'areaOfRequest'),
      await client
        .get('/api/enquiry')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'enquiryData'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
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
 * /offline-api/crop-disease:
 *   get:
 *     description: Get Crop disease data for offline module
 *     tags: [Offline Module]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                     {
 *                       diseaseData: []
 *                     }
 */
 router.get('/crop-disease', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';
    
    const offlineApiData = await Promise.all([
      await client
        .get('/api/disease/options')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'diseaseData'),
      await client
        .get('/api/disease/management/list')
        .set('oauth-token', token)
        .set('route', 'diseaseManagements'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      if (data.request.header.route === 'diseaseData') {
        acc = { ...acc, ...data.body.data };
      } else {
        acc[data.request.header.route] = data.body.data;
      }

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/traceability-information', auth, async (req, res) => {
  try {
    const client = request(req.app);
    const token = req.header('oauth-token');
    const lang = req.header('lang') || 'en';
    
    const offlineApiData = await Promise.all([
      await client
        .get('/api/coffee/traceability-information')
        .set('oauth-token', token)
        .set('lang', lang)
        .set('route', 'traceabilityInformation'),
    ]);

    const result = offlineApiData.reduce((acc, data) => {
      acc[data.request.header.route] = data.body.data;

      return acc;
    }, {});

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
module.exports = router;
