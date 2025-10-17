const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

/**
 * @desc fetch equipments category with activities
 */
/**
 * @swagger
 * /equipments/categories:
 *   get:
 *     summary: API for fetching equipment category with activities.
 *     description: API for fetching equipment category with activities.
 *     tags: [Equipment-categories]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 4, "name": "Vehicle", "equipment_category_activity": [] }, { "id": 3, "name": "Livestock production equipment", "equipment_category_activity": [ { "id": 9, "name": "Milking", "category": 3, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [] }, { "id": 8, "name": "Eartagging/Animal Identification", "category": 3, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [] }, { "id": 7, "name": "Dehorning", "category": 3, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [] }, { "id": 6, "name": "Castration", "category": 3, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [] } ] }, { "id": 2, "name": "Crop production equipment", "equipment_category_activity": [ { "id": 5, "name": "Storage ", "category": 2, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [] }, { "id": 4, "name": "Irrigation", "category": 2, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [] }, { "id": 3, "name": "Transportation", "category": 2, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [] }, { "id": 2, "name": "Land preparation", "category": 2, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [] } ] }, { "id": 1, "name": "General", "equipment_category_activity": [ { "id": 1, "name": "General", "category": 1, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z", "activity_equipment_name": [ { "id": 3, "name": "Hammer", "userID": 171, "activity": 1, "createdAt": "2021-12-06T16:46:18.000Z", "updatedAt": "2021-12-06T16:46:18.000Z" } ] } ] } ] }
 */

router.get('/', auth,translation, async (req, res) => {
  try {
    let equipmentCategories = await db.EquipmentCategory.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'DESC']],
      include: [
        {
          model: db.EquipmentActivity,
          as: 'equipment_category_activity',
          required: true,
          include: [
            {
              model: db.EquipmentName,
              as: 'activity_equipment_name',
              required: true,
              through: {
                model: db.EquipmentNameEquipmentActivity,
                attributes: ["id"],
              },
              where: {
                [db.Sequelize.Op.or]: [
                  { userID: req.user.id },
                  { userID: null },
                ],
              },
            },
          ],
        },
      ],
    });
    if (req.headers.lang && req.headers.lang != 'en') {
      equipmentCategories =  req.translateFunction(equipmentCategories, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
        moduleName: "equipment/categories"
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: equipmentCategories,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
