const express = require('express');
const _ = require('lodash');
const {
  updateFinalValueValidation,
} = require('../../../../helpers/validators/cropGoal');
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
 * /user/crop-goal/final-value:
 *   post:
 *     summary: Add user crop goal season.
 *     description: Add user crop goal season.
 *     tags: [User Crop Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              { "id":2 , "cropHistory": [{"yieldHarvested":332, "farmingArea":223, "harvestedOn": {"start":"11/17/2021","end":"12/23/2021"}},]}
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
 *                 example: { "success": true, "code": 200, "message": "user crop history has been updated successfully.", "data": { "id": 117, "goalType": "crop", "goalName": "Pin?", "sowingDate": { "start": "01/03/2022", "end": null }, "harvestingDate": { "start": "12/03/2023", "end": null }, "expectedYield": 256, "note": "", "createdAt": "03/09/2022 6:20 am", "user_farms": [ { "farmName": "potato ?", "MapUserGoalFarms": { "userGoalId": 117, "userFarmId": 476, "createdAt": "2022-03-09T00:50:10.000Z", "updatedAt": "2022-03-09T00:50:10.000Z" } } ], "segments": [], "soilPH": null, "cropVariety": [ { "name": "lentil", "MapUserGoalsCrop": { "id": 44, "cropId": 64, "userGoalId": 117, "createdAt": "2022-03-09T00:50:10.000Z", "updatedAt": "2022-03-09T00:50:10.000Z", "CropId": 64 } } ], "cropType": { "name": "lentils" }, "cropHistory": [ { "id": 391, "harvestedOn": { "start": "11/17/2021", "end": "12/23/2021" }, "farmingArea": "223", "yieldHarvested": "332", "configuration": [] }, { "id": 390, "harvestedOn": { "start": "01/03/2022", "end": null }, "farmingArea": "56", "yieldHarvested": "86", "configuration": [ { "name": "yield", "unit": { "id": 10, "name": "Kg per hectare", "abbreviation": "Kg/hectare" } }, { "name": "area", "unit": { "id": 12, "name": "Square Meter", "abbreviation": "sq/m" } } ] } ] } }
 */

router.put('/', auth, validationErrorHandler, async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id: userId } = req.user;
    const {
      goalId: id,
      seasonEndDate,
      yieldHarvested,
      yieldHarvestedUom,
      marketValue,
      marketValueUom,
      syntheticFertilizerUsed,
      syntheticFertilizerUsedUom,
      maximizingYieldNote,
      maximizingIncomeNote,
      syntheticFertilizerUsedNote,
      recordId
    } = req.body;

    const cropGoal = await db.UserCropGoal.findOne({
      raw: true,
      where: { id, userId },
    });
    if (_.isEmpty(cropGoal)) throw new Error("crop goal doesn't exist");

    const setUserCropGoalOutcome = {
      yieldHarvested,
      yieldHarvestedUom,
      marketValue,
      marketValueUom,
      syntheticFertilizerUsed,
      syntheticFertilizerUsedUom,
      maximizingYieldNote,
      maximizingIncomeNote,
      syntheticFertilizerUsedNote,
      recordId
    };
    removeEmptyValuesFromObject(setUserCropGoalOutcome);

    // update final value and season end date
    await Promise.all([
      db.UserCropGoalOutcome.update(setUserCropGoalOutcome, {
        where: { userCropGoalSeasonId: cropGoal.seasonId },
        transaction,
      }),

      db.UserCropGoalSeason.update(
        { seasonEndDate },
        { where: { id: cropGoal.seasonId }, transaction }
      ),

      db.UserCropGoal.update({ goalStatus: 'complete' }, {
        where: { id, userId },
        transaction,
      }),
    ]);

    await transaction.commit();

    return res.json(
      successRespSync({
        msg: success.SAVED,
      })
    );
  } catch (err) {
    await transaction.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
