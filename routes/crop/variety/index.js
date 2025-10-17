const express = require("express"),
  router = express.Router(),
  { Op } = require("sequelize"),
  db = require(rootPath + "/models"),
  { success } = require(rootPath + "/helpers/language"),
  { serverError, successRespSync } = require(rootPath + "/helpers/api");
const validate = require(rootPath + "/helpers/validation");
const translation = require(rootPath + "/middleware/translation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const auth = require(rootPath + "/middleware/auth");
/**
 * @swagger
 * /crop/variety:
 *   get:
 *     summary: Get list of crop varieties
 *     description: Get list of crop varieties
 *     tags: [Crop variety]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *         name: cropId
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Get the crop variety by crop id
 *     responses:
 *       200:
 *         description: Returns the list of crop vareities
 *       500:
 *         description: Server error
 */

router.get(
  "/",
  translation,
  async (req, res) => {
    try {
      let userId = req.user.id
      let limit = parseInt(req.query.limit || 10);
      let offset = parseInt(req.query.offset || 0);
      let query = {
        limit,
        offset,
      };
      if (req.query.cropId) {
        query.where = {
          cropTypeOptId: {
            [Op.eq]: req.query.cropId,
            userId: {
              [Op.or]: [userId, null],
            }
          },
        };
      } else {
        query.where = {
          userId: {
            [Op.or]: [userId, null],
          }
        };
      }

      query.order = [['id', 'DESC']];
       
      const Allresult = await db.Crop.findAndCountAll(query);
      let results = Allresult.rows;
      if (req.headers.lang && req.headers.lang != "en") {
        results = req.translateFunction(results, globalTranslationCache, {
          lvl1: true,
          lvl2: false,
        });
      }
      res.setHeader("X-Pagination-Count", Allresult.count);
      res.setHeader("X-Pagination-Limit", limit);
      res.setHeader("X-Pagination-Offset", offset);

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: results,
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
 * /crop/variety/all:
 *   get:
 *     summary: Get list of crop varieties
 *     description: Get list of crop varieties
 *     tags: [Crop variety]
 *     parameters:
 *       - in: query
 *         name: cropId
 *         required: true
 *         schema:
 *           type: Integer
 *         description: Get the crop variety by crop id
 *     responses:
 *       200:
 *         description: Returns the list of crop vareities
 *       500:
 *         description: Server error
 */

router.get("/all", translation, validate.CropVarietList(), async (req, res) => {
  try {
    const { cropId } = req.query;
    let results = await db.Crop.findAll({
      where: {
        cropTypeOptId: {
          [Op.eq]: cropId,
        },
      },
    });
    if (req.headers.lang && req.headers.lang != "en") {
      results = req.translateFunction(results, globalTranslationCache, {
        lvl1: true,
        lvl2: false,
      });
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
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
 * /crop/variety:
 *   post:
 *     summary: API for adding a crop variety
 *     description: API for adding a crop variety.
 *     tags: [Crop variety]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: API for adding a crop variety
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {"name":"Early Grano","cropTypeOptId":"100","countryId":1}
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
 *                 example: {"success": true,"code": 200, "message": "crop variety has been created successfully.","data": {"id": 87, "name": "early grano", "cropTypeOptId": "100","updatedAt": "2022-03-12T11:09:35.881Z","createdAt": "2022-03-12T11:09:35.881Z"}}
 *
 */

router.post(
  '/',
  validate.cropVarietyPost(),
  validationErrorHandler,
  auth,
  async (req, res) => {
    try {
      let { name, cropTypeOptId } = req.body;
      const set = { name: name.toLowerCase(), cropTypeOptId , userId: req.user.id};
      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });
      let result = await db.Crop.create(set);

      // send response
      return res.json(
        successRespSync({
          msg: success.CROP_VARIETY_CREATED,
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
