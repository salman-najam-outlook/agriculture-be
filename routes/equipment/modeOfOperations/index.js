const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const db = require(rootPath + "/models");
const { Op } = require('sequelize');
const { defaultUserId } = require("../../../helpers/consts");
const { serverError, successRespSync, errorRespSync } = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { equipmentModeOfOperationValidator } = require(rootPath +
  "/helpers/validators/equipment");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

/**
 * @desc fetch modes of operations for equipments
 */
/**
 * @swagger
 * /equipments/mode-of-operations:
 *   get:
 *     summary: API for fetching modes of operations for equipments.
 *     description: API for fetching modes of operations for equipments.
 *     tags: [Equipment-mode-of-operations]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 6, "name": "Solar" }, { "id": 5, "name": "Wind Energy" }, { "id": 4, "name": "Electricity" }, { "id": 3, "name": "Fuel Based" }, { "id": 2, "name": "Manual (Human Energy)" } ] }
 */
router.get("/", auth, translation, async (req, res) => {
  try {
    const modeOfOperations = await db.EquipmentModeOfOperation.findAll({
      attributes: ["id", "name", "recordId"],
      where: {
        [Op.or]: [
          { userID: req.user.id },
          { userId: defaultUserId || 37 }
        ]
      },
      order: [["id", "DESC"]],
    });
    if (req.headers.lang && req.headers.lang != 'en') {
      req.translateFunction(modeOfOperations, globalTranslationCache, {
        lvl1: true,
        lvl2: true 
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: modeOfOperations,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc add new mode of operation for equipments
 */
/**
 * @swagger
 * /equipments/mode-of-operations:
 *   post:
 *     summary: API for adding new mode of operation for equipments.
 *     description: API for adding new mode of operation for equipments.
 *     tags: [Equipment-mode-of-operations]
 *     requestBody:
 *       description: API for adding new mode of operation for equipments
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"name":"Solar"}
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
 *                 example: { "success": true, "code": 200, "message": "Mode of operation for equipment is added successfully.", "data": { "id": 16, "name": "Solar", "userID": 171, "updatedAt": "2022-03-15T15:55:16.473Z", "createdAt": "2022-03-15T15:55:16.473Z" } }
 */
router.post(
  "/",
  auth,
  equipmentModeOfOperationValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const modeOfOperationExists = await db.EquipmentModeOfOperation.findOne({
        where: {
          name: req.body.name,
          userID: req.user.id,
        },
      });
      if (modeOfOperationExists === null) {
        const modeOfOperation = await db.EquipmentModeOfOperation.create({
          name: req.body.name,
          recordId: req.body.recordId,
          userID: req.user.id,
        });
        return res.json(
          successRespSync({
            msg: success.EQUIPMENT_MODE_OF_OPERATION_ADDED,
            data: modeOfOperation,
          })
        );
      } else {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.EQUIPMENT_MODE_OF_OPERATION_EXISTS,
            code: 409,
            data: modeOfOperationExists,
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
 * @desc update mode of operation for equipments
 */
/**
 * @swagger
 * /equipments/mode-of-operations/{id}:
 *   put:
 *     summary: API for updating mode of operation for equipments.
 *     description: API for updating mode of operation for equipments.
 *     tags: [Equipment-mode-of-operations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment name
 *     requestBody:
 *       description: API for updating mode of operation for equipments
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"name":"Fossil Fuel"}
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
 *                 example: { "success": true, "code": 200, "message": "Mode of operation for equipment is updated successfully.", "data": { "id": 16, "name": "Solar_test", "userID": 171, "createdAt": "2022-03-15T15:55:16.000Z", "updatedAt": "2022-03-15T15:57:49.307Z" } }
 */

router.put(
  "/:id",
  auth,
  equipmentModeOfOperationValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const modeOfOperation = await db.EquipmentModeOfOperation.findByPk(
        req.params.id
      );
      if (modeOfOperation === null || modeOfOperation.userID !== req.user.id) {
        return res.status(error.code.NOT_FOUND).json(
          errorRespSync({
            msg: error.EQUIPMENT_MODE_OF_OPERATION_NOT_FOUND,
            code: error.code.NOT_FOUND,
          })
        );
      } else {
        await modeOfOperation.update({
          name: req.body.name,
        });
        return res.json(
          successRespSync({
            msg: success.EQUIPMENT_MODE_OF_OPERATION_UPDATED,
            data: modeOfOperation,
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
 * @desc delete mode of operation for equipments
 */
/**
 * @swagger
 * /equipments/mode-of-operations/{id}:
 *   delete:
 *     summary: API for deleting mode of operation for equipments.
 *     description: API for deleting mode of operation for equipments.
 *     tags: [Equipment-mode-of-operations]
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
 *                 example: { "success": true, "code": 200, "message": "Mode of operation for equipment is removed successfully.", "data": { "id": 16, "name": "Solar_test", "userID": 171, "createdAt": "2022-03-15T15:55:16.000Z", "updatedAt": "2022-03-15T15:57:49.000Z" } }
 */

router.delete("/:id", auth, async (req, res) => {
  try {
    const modeOfOperation = await db.EquipmentModeOfOperation.findByPk(
      req.params.id
    );
    if (modeOfOperation === null || modeOfOperation.userID !== req.user.id) {
      return res.status(error.code.NOT_FOUND).json(
        errorRespSync({
          msg: error.EQUIPMENT_MODE_OF_OPERATION_NOT_FOUND,
          code: error.code.NOT_FOUND,
        })
      );
    } else {
      await modeOfOperation.destroy({
        where: { id: req.params.id },
      });
      return res.json(
        successRespSync({
          msg: success.EQUIPMENT_MODE_OF_OPERATION_DELETED,
          data: modeOfOperation,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(error.code.CONFLICT).json(
        errorRespSync({
          msg: "Mode of equipment is currently being used in equipment data.",
          code: error.code.CONFLICT,
        })
      );
    }
    return serverError(res, err);
  }
});

module.exports = router;
