const express = require('express'),
  router = express.Router(),
  db = require(rootPath + '/models'),
  { error, success } = require(rootPath + '/helpers/language'),
  { errorRespSync, successRespSync, serverError } = require(rootPath +
    '/helpers/api');

const { logErrorOccurred } = require(rootPath + '/helpers/general');

/**
 * @swagger
 * /sowing/types:
 *   post:
 *     summary: Create sowing type
 *     description: Create sowing type with name
 *     tags: [Sowing name]
 *     requestBody:
 *       description: sowing type name
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Seeds
 *     responses:
 *       200:
 *         description: Returns the sowing type JSON
 *       500:
 *         description: Server error
 */

router.post('/', async function (req, res) {
  try {
    if (!req.body.name) {
      return res.status(error.code.SERVER_ERROR).json(
        errorRespSync({
          msg: 'name is required',
        })
      );
    }
    let name = req.body.name;
    let result = await db.PlantingTypes.findOrCreate({
      where: {
        name: name,
      },
      defaults: {
        name: name,
      },
    });
    return res.json(
      successRespSync({
        msg: success.PLANTING_TYPE_CREATED,
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
 * /sowing/types:
 *   get:
 *     summary: Get sowing type list
 *     description: Get the list of sowing types
 *     tags: [Sowing name]
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
 *     responses:
 *       200:
 *         description: Returns the list of sowing types
 *       500:
 *         description: Server error
 */

router.get('/', function (req, res) {
  let limit = parseInt(req.query.limit || 10);
  let offset = parseInt(req.query.offset || 0);

  db.PlantingTypes.findAndCountAll({
    limit,
    offset,
  })
    .then((Allresult) => {
      var results = Allresult.rows;
      results = req.translateFunction(results, globalTranslationCache, {
        lvl1: true,
        lvl2: false,
      });
      res.setHeader('X-Pagination-Count', Allresult.count);
      res.setHeader('X-Pagination-Limit', limit);
      res.setHeader('X-Pagination-Offset', offset);
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
module.exports = router;
