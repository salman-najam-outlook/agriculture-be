const express = require("express");
const xlsx = require("xlsx");
const axios = require("axios");
const { Op } = require("sequelize");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { errorRespSync, successRespSync, serverError } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { deleteFileS3, uploadToS3 } = require(rootPath + "/helpers/aws_s3");
const fileUpload = require(rootPath + "/middleware/file_upload");
const userUploadValidator = require(rootPath +
  "/helpers/validators/userUpload");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const sequelize = require("sequelize");
const translation = require(rootPath + "/middleware/translation");

/**
 * @swagger
 * /admin/role-req:
 *   get:
 *     summary: API for getting role-req list.
 *     description: API for getting role-req list.
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: orderField
 *         description: 'field name to sort with'
 *         schema:
 *           type: string
 *           enum: [userName, email, role_assigned, mobile, role_requested, status]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: searchPhrase
 *         schema:
 *           type: string
 *       - in: query
 *         name: userRoleFilter
 *         schema:
 *           type: string
 *           enum: [buying_station, dry_milling, farmer]
 *       - in: query
 *         name: statusFilter
 *         schema:
 *           type: string
 *           enum: [rejected, pending, approved]
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
 *                 example: { "success": true, "code": 200, "message": "Role Requests data successfully fetched.", "data": { "count": 2, "response": [ { "id": 2, "user_id": 246, "role_assigned": "buying_station", "role_requested": "dry_milling", "status": "approved", "rejection_reason": null, "is_deleted": false, "createdAt": "2022-07-11T22:50:41.000Z", "updatedAt": "2022-07-11T23:56:22.000Z", "requested": { "id": "dry_milling", "name": "Dry Milling", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, "assigned": { "id": "buying_station", "name": "Buying Station", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, "user_assoc": { "fullName": "Sobia  B", "firstName": "Sobia ", "lastName": "B", "mobile": null, "email": "imsobna@gmail.com" } }, { "id": 1, "user_id": 218, "role_assigned": "farmer", "role_requested": "buying_station", "status": "pending", "rejection_reason": null, "is_deleted": false, "createdAt": "2022-07-11T22:50:41.000Z", "updatedAt": "2022-07-11T22:50:41.000Z", "requested": { "id": "buying_station", "name": "Buying Station", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, "assigned": { "id": "farmer", "name": "Farmer", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, "user_assoc": { "fullName": "mehran raja", "firstName": "mehran", "lastName": "raja", "mobile": "3485516323", "email": null } } ] } }
 */

router.get("/", auth, async (req, res) => {
  try {
    const { id, organization } = req.user;

    // Filters
    let query = {},
      roleReqFilters = {
        where: {
          org_id: organization,
        },
      },
      userQuery = {};
    query.order = [];
    let {
      page,
      limit,
      searchPhrase,
      orderField,
      order,
      userRoleFilter,
      statusFilter,
    } = req.query;

    if (orderField && order) {
      if (orderField == "userName") {
        query.order = [["user_assoc", "firstName", order]];
      } else if (orderField == "email") {
        query.order = [["user_assoc", "email", order]];
      } else if (orderField == "mobile") {
        query.order = [["user_assoc", "mobile", order]];
      } else {
        query.order = [[orderField, order]];
      }
    } else {
      query.order.push(["createdAt", "DESC"]);
    }

    if (searchPhrase) {
      roleReqFilters.where = {
        org_id: organization,
        [Op.or]: [
          sequelize.where(sequelize.col("user_assoc.firstName"), {
            [Op.like]: `%${searchPhrase}%`,
          }),
          sequelize.where(sequelize.col("user_assoc.lastName"), {
            [Op.like]: `%${searchPhrase}%`,
          }),
          sequelize.where(sequelize.col("user_assoc.mobile"), {
            [Op.like]: `%${searchPhrase}%`,
          }),
          sequelize.where(sequelize.col("user_assoc.email"), {
            [Op.like]: `%${searchPhrase}%`,
          }),
        ],
      };
    }

    userRoleFilter && (roleReqFilters.where.role_requested = userRoleFilter);
    statusFilter && (roleReqFilters.where.status = statusFilter);
    if (page && limit) {
      page = parseInt(page);
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }

    const count = await db.RoleRequests.count({
      ...query,
      include: [
        {
          model: db.UserRole,
          as: "requested",
        },
        {
          attributes: ["firstName", "lastName", "fullName", "mobile", "email"],
          model: db.user,
          as: "user_assoc",
        },
      ],
      ...roleReqFilters,
    });

    const response = await db.RoleRequests.findAll({
      ...query,
      include: [
        {
          model: db.UserRole,
          as: "requested",
        },
        {
          attributes: ["firstName", "lastName", "fullName", "mobile", "email"],
          model: db.user,
          as: "user_assoc",
        },
      ],
      ...roleReqFilters,
    });

    if (!response) {
      return res.json(
        errorRespSync({
          msg: "Role Requests data not found.",
        })
      );
    } else {
      return res.json(
        successRespSync({
          msg: "Role Requests data successfully fetched.",
          data: {
            count,
            response,
          },
        })
      );
    }
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/role-req/{id}:
 *   put:
 *     summary: Update (approve/decline) role-req
 *     description: Update role-req
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of role-req
 *     requestBody:
 *       description: Request body for updating role-req
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                rejectionReason:
 *                  type: string
 *            example:
 *              {"status":"rejected", rejectionReason: "rejection reason text"}
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
 *                     properties:
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Role request status updated", "data": [ 1 ] }
 */

//update status
router.put("/:id", auth, async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const { id } = req.params;

    let set = { status, rejection_reason: rejectionReason };
    let roleReqRes = await db.RoleRequests.update(set, {
      where: { id },
    });
    return res.json(
      successRespSync({
        msg: "Role request status updated",
        data: roleReqRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/role-req/user-role:
 *   get:
 *     summary: API for getting user-role list.
 *     description: API for getting user-role list.
 *     tags: [Admin]
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
 *                 example: { "success": true, "code": 200, "message": "Role Requests data successfully fetched.", "data": { "count": 2, "response": [ { "id": 2, "user_id": 246, "role_assigned": "buying_station", "role_requested": "dry_milling", "status": "approved", "rejection_reason": null, "is_deleted": false, "createdAt": "2022-07-11T22:50:41.000Z", "updatedAt": "2022-07-11T23:56:22.000Z", "requested": { "id": "dry_milling", "name": "Dry Milling", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, "assigned": { "id": "buying_station", "name": "Buying Station", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, "user_assoc": { "fullName": "Sobia  B", "firstName": "Sobia ", "lastName": "B", "mobile": null, "email": "imsobna@gmail.com" } }, { "id": 1, "user_id": 218, "role_assigned": "farmer", "role_requested": "buying_station", "status": "pending", "rejection_reason": null, "is_deleted": false, "createdAt": "2022-07-11T22:50:41.000Z", "updatedAt": "2022-07-11T22:50:41.000Z", "requested": { "id": "buying_station", "name": "Buying Station", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, "assigned": { "id": "farmer", "name": "Farmer", "created_by": 22, "isdeleted": null, "createdAt": "2022-07-08T04:17:10.000Z", "updatedAt": "2022-07-08T04:17:10.000Z" }, "user_assoc": { "fullName": "mehran raja", "firstName": "mehran", "lastName": "raja", "mobile": "3485516323", "email": null } } ] } }
 */
router.get("/user-role", auth, translation, async (req, res) => {
  try {
    let userRoleRes = await db.UserRole.findAll({
      where: {
        isDeleted: {
          [db.Sequelize.Op.is]: null,
        },
      },
    });
    if (req.headers.lang && req.headers.lang != "en") {
      userRoleRes = req.translateFunction(userRoleRes, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      });
    }
    return res.json(
      successRespSync({
        msg: "Role request fetched",
        data: userRoleRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

module.exports = router;
