const express = require('express'),
  router = express.Router(),
  db = require(rootPath + '/models'),
  auth = require(rootPath + "/middleware/auth"),
  { error, success } = require(rootPath + '/helpers/language'),
  { errorResp, successRespSync, serverError } = require(rootPath +
    '/helpers/api');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

/**
 * @swagger
 * /practice/activity:
 *   post:
 *     summary: Create soil activity
 *     description: Create soil activity with name
 *     tags: [Soil activity]
 *     requestBody:
 *       description: Soil details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Flooding
 *     responses:
 *       200:
 *         description: Returns the activity JSON
 *       500:
 *         description: Server error
 */

router.post('/', auth, async function (req, res) {
  try {
    const userId = req.user.id
    if (!req.body.name) {
      return res.status(error.code.SERVER_ERROR).json(
        await errorResp({
          msg: 'name is required',
        })
      );
    }
    let name = req.body.name;
    let result = await db.Soil_prep_activity.findOrCreate({
      where: {
        name: name,
        userId
      },
      defaults: {
        name: name,
        userId
      },
    });
    return res.json(
      successRespSync({
        msg: success.SOILPREP_ACTIVITY_CREATED,
        data: result[0],
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /practice/activity:
 *   get:
 *     summary: Get soil activity list
 *     description: Get the list of soil activities
 *     tags: [Soil activity]
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
 *         description: Returns the list of soil activities
 *       500:
 *         description: Server error
 */

router.get('/', auth, function (req, res) {
  let limit = parseInt(req.query.limit || 1000);
  let offset = parseInt(req.query.offset || 0);
  const { organization } = req.user;

  db.Soil_prep_activity.findAndCountAll({
    include: [
      {
        model: db.user,
        attributes: [],
        as: 'users',
        required: false,
        where: { organization },
      },
    ],
    where: {
      [db.Sequelize.Op.or]: [
        { userId: null },
        { '$users.organization$': organization }
      ]
    },
    limit,
    offset,
  })
    .then((Allresult) => {
      var results = Allresult.rows;
      results = req.translateFunction(results, globalTranslationCache, {
        lvl1: true,
        lvl2: false,
        moduleName: null,
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
