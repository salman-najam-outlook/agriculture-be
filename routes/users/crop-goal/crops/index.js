const express = require('express');
const _ = require('lodash');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { logErrorOccurred, removeEmptyValuesFromObject } = require(rootPath +
  '/helpers/general');
const { success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /user/crop-goal/crops:
 *   get:
 *     summary: list all the crop types which are registered by the user for crop goals and filter it out with primary goal types.
 *     description: list all the crop types which are registered by the user for crop goals and filter it out with primary goal types.
 *     tags: [User Crop Goals]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: cropGoalTypeId
 *        description: for filtering crop types based on the primary crop goal
 *        schema:
 *          type: string
 *        example:
 *          1
 *     responses:
 *       200:
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
 *             example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 49, "name": "mangos" }, { "id": 493, "name": "Potato (Nepal)" } ] }
 */
router.get('/', auth, validationErrorHandler, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { cropGoalTypeId } = req.query;

    const cropTypes = await db.Option.findAll({
      where: {
        groupName: 'crop-type',
        '$`cropGoalFarm->user_crop_goal_season`.`userId`$': userId,
        ...(_.isEmpty(cropGoalTypeId)
          ? null
          : {
              '$`cropGoalFarm->user_crop_goal_type_map`.`cropGoalTypeId`$':
                cropGoalTypeId,
            }),
      },
      attributes: ['id', 'name'],
      include: [
        {
          required: true,
          model: db.UserCropGoalFarm,
          as: 'cropGoalFarm',
          attributes: [],
          include: [
            {
              required: true,
              model: db.UserCropGoalTypeMap,
              attributes: [],
              as: 'user_crop_goal_type_map',
            },
            {
              required: true,
              model: db.UserCropGoalSeason,
              attributes: [],
              as: 'user_crop_goal_season',
            },
          ],
        },
      ],
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: cropTypes,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
