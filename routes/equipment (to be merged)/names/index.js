const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { successRespSync, errorRespSync, serverError } = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { equipmentNameValidator } = require(rootPath +
  "/helpers/validators/equipment");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

/**
 * @swagger
 * /equipments/names:
 *   get:
 *     summary: API for fetching equipment names that belongs to user.
 *     description: API for fetching equipment names that belongs to user..
 *     tags: [Equipment-names]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 3, "name": "Hammer", "recordId": "ena100" , "equipment_name_activity": { "id": 1, "name": "General", "category": 1, "createdAt": "2021-12-06T16:40:31.000Z", "updatedAt": "2021-12-06T16:40:31.000Z" } } ] }
 */

router.get("/", auth, async (req, res) => {
  try {
    const equipmentNames = await db.EquipmentName.findAll({
      attributes: ["id", "name", "recordId"],
      where: {
        userID: req.user.id,
      },
      include: [
        {
          model: db.EquipmentActivity,
          as: "equipment_name_activity",
        },
      ],
      order: [["id", "DESC"]],
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: equipmentNames,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /equipments/names:
 *   post:
 *     summary: API for adding new equipment name.
 *     description: API for adding new equipment name.
 *     tags: [Equipment-names]
 *     requestBody:
 *       description: API for adding new equipment
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"name":"Tractor","activity":2}
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
 *                 example: { "success": true, "code": 200, "message": "Equipment Name is added successfully.", "data": { "id": 66, "name": "Tractor", "userID": 171, "activity": 2, "updatedAt": "2022-03-15T14:44:54.270Z", "createdAt": "2022-03-15T14:44:54.270Z" } }
 */
router.post(
  "/",
  auth,
  equipmentNameValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let equipmentNameExists = null;
      
      if(req.body.recordId){
        equipmentNameExists = await db.EquipmentName.findOne({
          where: {
            recordId: req.body.recordId,
          },
        });
     }

      if (equipmentNameExists === null) {
        const equipmentName = await db.EquipmentName.create({
          name: req.body.name,
          userID: req.user.id,
          recordId: req.body.recordId,
          activity: req.body.activity,
        });

        return res.json(
          successRespSync({
            msg: success.EQUIPMENT_NAME_ADDED,
            data: equipmentName,
          })
        );
      } else {
         const equipmentName = await equipmentNameExists.update({
          name: req.body.name,
          activity: req.body.activity,
        });

        return res.json(
          successRespSync({
            msg: success.EQUIPMENT_NAME_UPDATED,
            data: equipmentName,
          })
        );
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /equipments/names/{id}:
 *   put:
 *     summary: API for updating equipment name.
 *     description: API for updating equipment name.
 *     tags: [Equipment-names]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment name
 *     requestBody:
 *       description: API for updating equipment
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"name":"Tractor","activity":2}
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
 *                 example: { "success": true, "code": 200, "message": "Equipment Name is updated successfully.", "data": { "id": 66, "name": "Tractor_new", "userID": 171, "activity": 2, "createdAt": "2022-03-15T14:44:54.000Z", "updatedAt": "2022-03-15T14:57:30.226Z" } }
 */

router.put(
  "/:id",
  auth,
  equipmentNameValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const equipmentExists = await db.EquipmentName.findOne({
        where: {
          userID: req.user.id,
          activity: req.body.activity,
          name: req.body.name,
        },
      });
      if (equipmentExists !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.EQUIPMENT_ALREADY_EXISTS_FOR_ACTIVITY,
            code: error.code.CONFLICT,
            data: equipmentExists,
          })
        );
      }
      const equipmentName = await db.EquipmentName.findByPk(req.params.id);
      if (equipmentName === null || equipmentName.userID !== req.user.id) {
        return res.status(error.code.NOT_FOUND).json(
          errorRespSync({
            msg: error.EQUIPMENT_NAME_NOT_FOUND,
            code: error.code.NOT_FOUND,
          })
        );
      } else {
        await equipmentName.update({
          name: req.body.name,
          activity: req.body.activity,
        });
        return res.json(
          successRespSync({
            msg: success.EQUIPMENT_NAME_UPDATED,
            data: equipmentName,
          })
        );
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


/**
 * @swagger
 * /equipments/names/{id}:
 *   delete:
 *     summary: API for deleting equipment name.
 *     description: API for deleting equipment name.
 *     tags: [Equipment-names]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment name
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
 *                 example: { "success": true, "code": 200, "message": "Equipment Name is removed successfully.", "data": { "id": 66, "name": "Tractor_new", "userID": 171, "activity": 2, "createdAt": "2022-03-15T14:44:54.000Z", "updatedAt": "2022-03-15T14:57:30.000Z" } }
 */

router.delete("/:id", auth, async (req, res) => {
  try {
    const equipmentName = await db.EquipmentName.findByPk(req.params.id);
    if (equipmentName === null || equipmentName.userID !== req.user.id) {
      return res.status(error.code.NOT_FOUND).json(
        errorRespSync({
          msg: error.EQUIPMENT_NAME_NOT_FOUND,
          code: error.code.NOT_FOUND,
        })
      );
    } else {
      await equipmentName.destroy({
        where: { id: req.params.id },
      });
      return res.json(
        successRespSync({
          msg: success.EQUIPMENT_NAME_DELETED,
          data: equipmentName,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(error.code.CONFLICT).json(
        errorRespSync({
          msg: "Equipment Name is currently being used in equipment data.",
          code: error.code.CONFLICT,
        })
      );
    }
    return serverError(res, err);
  }
});

module.exports = router;
