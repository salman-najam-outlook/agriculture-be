const express = require('express');
const _ = require('lodash');
const { seasonCreateValidation } = require(rootPath + '/helpers/validators/cropGoal');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { logErrorOccurred, removeEmptyValuesFromObject } = require(rootPath +
  '/helpers/general');
const { success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
// validations
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /user/crop-goal/season:
 *   post:
 *     summary: Add user crop goal season.
 *     description: Add user crop goal season.
 *     tags: [User Crop Goals seasons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              { "recordId": "333663366", "seasonName": 20, "seasonStartDate": "2022-08-02", "seasonEndDate": "2022-10-02"}
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
 *                 example: { "success": true, "code": 200, "message": "saved successfully.", "data": { "seasonName": "Season 20", "id": 7, "seasonStartDate": "2022-08-02T00:00:00.000Z",
"seasonEndDate": "2022-10-02T00:00:00.000Z" }}
 */

router.post('/', auth, seasonCreateValidation() , validationErrorHandler, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { seasonName, seasonStartDate, seasonEndDate, recordId } = req.body;

    // create season
    const setSeason = {
      userId,
      seasonName,
      seasonStartDate,
      seasonEndDate,
      recordId,
    };
    removeEmptyValuesFromObject(setSeason);
    let season = await (await db.UserCropGoalSeason.create(setSeason)).toJSON();

    season = await getSeasonDetails({ id: season?.id });

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: season,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


/**
 * @swagger
 * /user/crop-goal/season:
 *   get:
 *     summary: get user crop goal season.
 *     description: get user crop goal season.
 *     tags: [User Crop Goals seasons]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [{ "seasonName": "Season 8", "id": 25, "seasonStartDate": "2022-02-02","seasonEndDate": "2022-02-02" },{"seasonName": "Season 7","id": 22,"seasonStartDate": "2022-02-02", "seasonEndDate": "2022-02-02"}]}
 */

router.get('/', auth, validationErrorHandler, async (req, res) => {
  try {
    const { id: userId } = req.user;

    const subQuery = 'SELECT userCropGoalSeasonId FROM user_crop_goal_outcomes'; // get season id used already
    const season = await db.UserCropGoalSeason.findAll({
      // raw: true,
      where: {
        userId,
        id: { [db.Sequelize.Op.notIn]: db.Sequelize.literal(`(${subQuery})`) },
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      order: [
        ['seasonStartDate', 'DESC'],
        ['seasonName', 'DESC'],
      ],
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: season,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @description get season details
 * @param {*} where
 * @param {*} attributes
 * @returns
 */
async function getSeasonDetails(where, attributes) {
  return await db.UserCropGoalSeason.findOne({
    raw: true,
    where,
    attributes: attributes ?? { exclude: ['createdAt', 'updatedAt', 'userId'] },
  });
}

module.exports = router;
