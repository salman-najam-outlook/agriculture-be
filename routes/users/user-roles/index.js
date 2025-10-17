const express = require("express");
const moment = require("moment");
const router = express.Router();
const { Op } = require("sequelize");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { logErrorOccurred, notEmpty, isObject } = require(rootPath +
  "/helpers/general");
const { error, success } = require(rootPath + "/helpers/language");
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  "/helpers/api");
const validate = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const { isArray, difference } = require("lodash");
const {
  roleRequestsByUserValidation,
  roleDeleteValidation,
} = require("../../../helpers/validation");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const _ = require("lodash")


/**
 * @swagger
 * /user/roles/assignedRoles:
 *   get:
 *     summary: Get a roles assigned to user
 *     description: Get the roles for the user
 *     tags: [User-Roles]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
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
 *                 example:
 *                   { "success": true, "code": 200, "message": "Fetched successfully", "data": { "numRows": 2, "info": [ { "id": 26, "membership_id": 9, "user_role_id": "dry_milling", "isDeleted": false, "createdAt": "2022-07-27T13:00:52.000Z", "updatedAt": "2022-07-27T13:01:43.000Z" }, { "id": 27, "membership_id": 9, "user_role_id": "farmer", "isDeleted": false, "createdAt": "2022-07-27T13:00:52.000Z", "updatedAt": "2022-07-27T13:01:43.000Z" } ] } }
 */
 router.get("/assignedRoles", auth, async (req, res) => {
  try {
    const { id: userId, organization: org_id } = req.user;
    //check if the role requested already exists

    const getAllRoles =  await db.activationKeys.findAll({
      where: { user_id: userId, is_deleted: 0 },
      include: [
        {
          model: db.Membership,
          as: "membership_assoc",
          include: [
            {
              model: db.UserRoleMembershipMap,
              as: "userRoleMembershipMap"
            }
          ]
        }
      ]
    });

    if (getAllRoles == null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: "No roles found",
        })
      );
    }

    let resData = []
    getAllRoles.forEach(el => {
      resData.push(...(el.membership_assoc.userRoleMembershipMap))
    })
    return res.json(
      await successRespSync({
        msg: "Fetched successfully",
        data: {
          numRows: resData.length,
          data: resData,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
/**
 * @swagger
 * /user/roles:
 *   post:
 *     summary: Create a User-Role
 *     description: Create a new role for the user
 *     tags: [User-Roles]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       description: Goal details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requested_role:
 *                 type: string
 *           example: { "requested_role": "farmer" }
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
 *                 example: { "success": true, "code": 200, "message": "User Role requested succesfully","data": {}}
 */
router.post(
  "/",
    auth,
  //   roleRequestsByUserValidation(),
  //  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId, organization: org_id } = req.user;
      let { requested_role } = req.body;

      //check if the role requested already exists

      let checkIfRolesExists = []
      checkIfRolesExists = await db.RoleRequests.findAll({
        attibutes: ["user_id"],
        where: {
          user_id: userId,
          role_requested: requested_role,
          is_deleted: 0,
        },
      });

      let existingRoleReq = []
      existingRoleReq = checkIfRolesExists.map(resRole => resRole.role_requested)
      requested_role = _.difference(requested_role, existingRoleReq)
      //Assign the requested role
      let insertArr = []
      insertArr = requested_role.map(reqRole => {
        return {
          user_id: userId,
          status: "pending",
          role_requested: reqRole,
          org_id
        }
      })

     let roleReqRes = []
     roleReqRes =  await db.RoleRequests.bulkCreate(insertArr)

      return res.json(
        await successRespSync({
          code: success.code.OK,
          msg: "Role was requested successfully",
          data: roleReqRes
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
 * /user/roles:
 *   get:
 *     summary: Get a User-Role
 *     description: Get the roles for the user
 *     tags: [User-Roles]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 */
router.get("/", auth, async (req, res) => {
  try {
    const { id: userId, organization: org_id } = req.user;
    //check if the role requested already exists

    const getAllRoles = await db.RoleRequests.findAll({
      where: { user_id: userId, is_deleted: 0 },
    });

    if (getAllRoles == null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: "No roles found",
        })
      );
    }

    return res.json(
      await successRespSync({
        msg: "Fetched successfully",
        data: {
          numRows: getAllRoles.length,
          data: getAllRoles,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /user/roles:
 *   delete:
 *     summary: API for deleting user role
 *     description: API for deleting user role.
 *     tags: [User-Roles]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: Integer
 *         description: role id
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
 *                 example: { "success": true, "code": 200, "message": "User role deleted succesfully","data": {}}
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const userRole = await db.RoleRequests.findOne({
      where: { id, is_deleted: 0 },
    });

    // send response if user role doesnt exist
    if (userRole == null) {
      return res.json(
        errorRespSync({
          code: success.code.OK,
          msg: "Role Not Found",
        })
      );
    }

    // update user
    await db.RoleRequests.update({ is_deleted: 1 }, { where: { id } });

    return res.json(
      successRespSync({
        msg: "Role deletion successfull",
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

module.exports = router;
