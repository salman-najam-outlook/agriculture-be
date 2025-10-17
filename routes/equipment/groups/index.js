const express = require("express");
const translation = require("../../../middleware/translation");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { successRespSync, errorRespSync, serverError } = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { equipmentGroupValidator } = require(rootPath +
  "/helpers/validators/equipment");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

/**
 * @desc fetch equipments groups
 */
/**
 * @swagger
 * /equipments/groups:
 *   get:
 *     summary: API for fetching equipment groups.
 *     description: API for fetching equipment groups.
 *     tags: [Equipment-groups]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 1, "name": "Tractors Collection" } ] }
 */

router.get("/", auth, translation, async (req, res) => {
  try {
    const equipmentGroups = await db.EquipmentGroup.findAll({
      attributes: ["id", "name", "recordId"],
      where: {
        userID: req.user.id,
      },
      order: [["id", "DESC"]],
    });

    if (req.headers.lang && req.headers.lang != 'en') {
      req.translateFunction(equipmentGroups, globalTranslationCache, {
        lvl1: true,
        lvl2: false
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: equipmentGroups,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc add new group - equipments
 */
/**
 * @swagger
 * /equipments/groups:
 *   post:
 *     summary: API for adding new group equipments.
 *     description: API for adding new group equipments.
 *     tags: [Equipment-groups]
 *     requestBody:
 *       description: API for adding new group equipments
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"name":"Group_name"}
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
 *                 example: { "success": true, "code": 200, "message": "Equipment Group is added successfully.", "data": { "id": 48, "name": "Group_name", "userID": 171, "updatedAt": "2022-03-16T14:17:19.754Z", "createdAt": "2022-03-16T14:17:19.754Z" } }
 */

router.post(
  "/",
  auth,
  equipmentGroupValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const equipmentGroupExists = await db.EquipmentGroup.findOne({
        where: {
          name: req.body.name,
          userID: req.user.id,
        },
      });
      if (equipmentGroupExists === null) {
        const equipmentGroup = await db.EquipmentGroup.create({
          name: req.body.name,
          userID: req.user.id,
        });
        return res.json(
          successRespSync({
            msg: success.EQUIPMENT_GROUP_ADDED,
            data: equipmentGroup,
          })
        );
      } else {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.EQUIPMENT_GROUP_EXISTS,
            code: 409,
            data: equipmentGroupExists,
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
 * @desc update group - equipment
 */
/**
 * @swagger
 * /equipments/groups/{id}:
 *   put:
 *     summary: API for updating group equipment.
 *     description: API for updating group equipment.
 *     tags: [Equipment-groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment name
 *     requestBody:
 *       description: API for updating group equipment
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
 *                 example: { "success": true, "code": 200, "message": "Equipment Group is updated successfully.", "data": { "id": 48, "name": "Group_updated", "userID": 171, "createdAt": "2022-03-16T14:17:19.000Z", "updatedAt": "2022-03-16T14:18:49.714Z" } }
 */

router.put(
  "/:id",
  auth,
  equipmentGroupValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const equipmentGroup = await db.EquipmentGroup.findByPk(req.params.id);
      if (equipmentGroup === null || equipmentGroup.userID !== req.user.id) {
        return res.status(error.code.NOT_FOUND).json(
          errorRespSync({
            msg: error.EQUIPMENT_GROUP_NOT_FOUND,
            code: error.code.NOT_FOUND,
          })
        );
      } else {
        await equipmentGroup.update({
          name: req.body.name,
        });
        return res.json(
          successRespSync({
            msg: success.EQUIPMENT_GROUP_UPDATED,
            data: equipmentGroup,
          })
        );
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: "Equipment group already exists.",
            code: error.code.CONFLICT,
          })
        );
      }
      return serverError(res, err);
    }
  }
);

/**
 * @desc delete group - equipment
 */
/**
 * @swagger
 * /equipments/groups/{id}:
 *   delete:
 *     summary: API for deleting group equipment.
 *     description: API for deleting group equipment.
 *     tags: [Equipment-groups]
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
 *                 example: { "success": true, "code": 200, "message": "Equipment Group is removed successfully.", "data": { "id": 48, "name": "Group_updated", "userID": 171, "createdAt": "2022-03-16T14:17:19.000Z", "updatedAt": "2022-03-16T14:18:49.000Z" } }
 */

router.delete("/:id", auth, async (req, res) => {
  try {
    const equipmentGroup = await db.EquipmentGroup.findByPk(req.params.id);
    if (equipmentGroup === null || equipmentGroup.userID !== req.user.id) {
      return res.status(error.code.NOT_FOUND).json(
        errorRespSync({
          msg: error.EQUIPMENT_GROUP_NOT_FOUND,
          code: error.code.NOT_FOUND,
        })
      );
    } else {
      await equipmentGroup.destroy({
        where: { id: req.params.id },
      });
      return res.json(
        successRespSync({
          msg: success.EQUIPMENT_GROUP_DELETED,
          data: equipmentGroup,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(error.code.CONFLICT).json(
        errorRespSync({
          msg: "Equipment group is currently being used in equipment data.",
          code: error.code.CONFLICT,
        })
      );
    }
    return serverError(res, err);
  }
});

module.exports = router;
