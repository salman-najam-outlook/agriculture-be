const _ = require("lodash");
const express = require("express");
const xlsx = require("xlsx");
const axios = require("axios");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { errorRespSync, successRespSync, serverError } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty, getUserIdsByOrganization } = require(rootPath + "/helpers/general");
const { deleteFileS3 } = require(rootPath + "/helpers/aws_s3");
const fileUpload = require(rootPath + "/middleware/file_upload");
const userUploadValidator = require(rootPath +
  "/helpers/validators/userUpload");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const translation = require(rootPath + "/middleware/translation");
const { Op } = require("sequelize");
const { sortCoffeeVarieties } = require('../../../helpers/coffee-variety');

router.get("/farmers", auth, async (req, res) => {
  try {
    const { search, hasPurchase } = req.query;
    const userOrg = req.user.organization;
    const subOrgId = req.user.subOrgId || null;
    
    // Get all user IDs within the organization/sub-organization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-organization, only get data from that sub-organization
      organizationUserIds = await getUserIdsByOrganization(db, userOrg, subOrgId);
    } else {
      // If user is from main organization, get data from all sub-organizations
      organizationUserIds = await getUserIdsByOrganization(db, userOrg, null);
    }

    // If no users found in organization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No farmers found for this organization.",
          data: { farmers: [] },
        })
      );
    }

    let where = {
      id: {
        [Op.in]: organizationUserIds
      },
      firstName: {
        [Op.not]: null,
      },
      active: true
    };

    if (!_.isEmpty(search)) {
      const fields = ["firstName","middleName", "lastName"];
      const searchQuery = fields.map((col) => {
        return {
          [col]: {
            [db.Sequelize.Op.like]: "%" + search + "%",
          },
        };
      });
      where = { ...where, [db.Sequelize.Op.or]: searchQuery };
    }

    const include = [
      {
        model: db.Membership,
        as: "user_membership",
        required: true,
        through: {
          model: db.UserMembershipMap,
        },
        include: [
          {
            model: db.UserRoleMembershipMap,
            as: "userRoleMembershipMap",
            where: {
              user_role_id: process.env.COFFEE_FARMER || "coffee_farmer",
            },
          },
        ],
      },
    ];

    const farmers = await db.user.findAll({
      include,
      attributes: ["id", "firstName","middleName", "lastName", "userType"],
      where,
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { farmers },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/farm/:farmerId", auth, async (req, res) => {
  try {
    const { farmerId, farmName, search, geofence } = req.params;
    const userOrg = req.user.organization;
    const subOrgId = req.user.subOrgId || null;
    
    // Get all user IDs within the organization/sub-organization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-organization, only get data from that sub-organization
      organizationUserIds = await getUserIdsByOrganization(db, userOrg, subOrgId);
    } else {
      // If user is from main organization, get data from all sub-organizations
      organizationUserIds = await getUserIdsByOrganization(db, userOrg, null);
    }

    // If no users found in organization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No farms found for this organization.",
          data: { farms: [] },
        })
      );
    }

    // Verify that the farmerId belongs to the user's organization
    if (!organizationUserIds.includes(parseInt(farmerId))) {
      return res.json(
        errorRespSync({
          msg: "Farmer not found in your organization.",
        })
      );
    }

    let where = { userId: farmerId, isDeleted: 0 };
    if (notEmpty(farmName)) {
      where.farmName = {
        [Op.like]: "%" + farmName + "%",
      };
    }

    let query = {
      include: [
        {
          attributes: ["unit_subCategory_id"],
          model: db.UnitConfiguration,
          as: "configuration",
          required: false,
          where: {
            unit_subCategory_id: [3, 14],
            // [db.Sequelize.Op.or]: [{ unit_subCategory_id: 'area' }, { unit_subCategory_id: 'parameter' }],
          },
          include: [
            {
              model: db.Unit,
              attributes: [["field", "name"]],
              as: "subCategory",
            },
            {
              model: db.Unit,
              attributes: ["id", ["field", "name"], "abbreviation"],
              as: "unit",
            },
          ],
        },

        {
          ...(geofence == 1 ? { required: true } : null),
          attributes: ["id", "lat", "log"],
          model: db.UserFarmCoordinate,
          as: "coordinates",
        },
        {
          attributes: ["id", "cropTypeOptId"],
          model: db.UserfarmCrop,
          as: "farmCrops",
          include: [
            {
              attributes: [
                "id",
                [
                  db.sequelize.literal("`farmCrops->cropVariety->crop`.`name`"),
                  "cropName",
                ],
              ],
              model: db.UserfarmCropVariety,
              as: "cropVariety",
              include: [{ model: db.Crop, as: "crop", attributes: [] }],
            },
          ],
        },
        {
          attributes: ["id", "farmingGoal"],
          model: db.UserFarmingGoal,
          as: "farmGoals",
        },
        {
          attributes: ["id", "displayName"],
          model: db.userLiveStock,
          as: "farmLivestocks",
          through: { attributes: [] },
        },
        {
          attributes: ["id", "displayName"],
          model: db.Equipment,
          as: "farmEquipments",
          through: { attributes: [] },
        },
        {
          attributes: [
            "id",
            "geofenceName",
            "geofenceArea",
            "geofenceParameter",
          ],
          model: db.Geofence,
          as: "segments",
          include: [
            {
              attributes: ["unit_subCategory_id"],
              model: db.UnitConfiguration,
              as: "configuration",
              required: false,
              where: {
                unit_subCategory_id: [3, 14],
              },
              include: [
                {
                  model: db.Unit,
                  attributes: [["field", "name"]],
                  as: "subCategory",
                },
                {
                  model: db.Unit,
                  attributes: ["id", ["field", "name"], "abbreviation"],
                  as: "unit",
                },
              ],
            },
            {
              model: db.GeofenceCoordinate,
              attributes: ["id", "lat", "log"],
              as: "coordinates",
              required: false,
            },
          ],
        },
        {
          model: db.user,
          as: "includeFarmOwner",
          attributes: ["id", "firstName","middleName", "lastName", "fullName"],
        },
        {
          model: db.Option,
          as: "includeFarmType",
          attributes: ["id", "name"],
        },
      ],
      attributes: [
        "id",
        "userId",
        "farmName",
        "ownerName",
        "registrationNo",
        "farmOwnershipType",
        "address",
        "district",
        "zipCode",
        "farmingActivity",
        "area",
        "parameter",
        "lat",
        "log",
        "createdAt",
        // new
        "farmType",
        "productionSystem",
        "farmOwner",
        "country",
        "state",
        "city",
        "govRegistrationNum",
        "contractMating",
        "cooperativeId",
        "licenceNum",
        "licenceExpiryDate",
        "regulatorName",
        "regulatorRepresentiveName",
        "houseNum",
        "street",
      ],
      where,
      order: [["coordinates", "id", "ASC"]],
    };

    let [organization, result] = await Promise.all([
      db.sequelize.query(
        `select code from organization og inner join users u on og.id = u.organization where u.id=?`,
        {
          replacements: [farmerId],
          type: db.sequelize.QueryTypes.SELECT,
          plain: true,
        }
      ),
      db.user_farm.findAll(query),
    ]);

    let response = [];
    if (notEmpty(result)) {
      for (let el of result) {
        el = await el.toJSON();
        let { configuration, segments } = el;
        el.geofence = "Unmapped";
        el.farmId = organization?.code + "-" + el.id;
        // update configuration values
        el.configuration = configuration.map((config) => {
          return { name: config.subCategory?.name, unit: config?.unit };
        });
        if (notEmpty(segments)) {
          el.geofence = "Mapped";
          el.segments = segments.map((segment) => {
            let { configuration } = segment;
            // update configuration array inside segment array
            configuration = configuration.map((config) => {
              return { name: config.subCategory?.name, unit: config?.unit };
            });
            return { ...segment, configuration };
          });
        }
        response.push(el);
      }
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          num_rows: response.length,
          data: response,
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
 * /admin/coffee/windBreaker:
 *   post:
 *     summary: API to post windbreaker
 *     description: API to post windbreaker.
 *     tags: [Admin]
 *     requestBody:
 *       description: Request body for creating windbreaker
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *            example:
 *              {"name":"wind breaker tree1"}
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
 *               example: { "success": true, "code": 200, "message": "Wind breaker tree created", "data": { "id": 18, "name": "windbreaker tree123", "created_by": 246, "updatedAt": "2022-06-24T11:17:57.973Z", "createdAt": "2022-06-24T11:17:57.973Z" } }
 */
router.post("/windBreaker", auth, async function (req, res) {
  try {
    const { name } = req.body;
    let userId = req.user.id;
    const windBreakerRes = await db.WindBreaker.create({
      name,
      created_by: userId,
      status: "active",
    });
    return res.json(
      successRespSync({
        msg: "Wind breaker tree created",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/coffeeVariety:
 *   post:
 *     summary: API to post coffeeVariety
 *     description: API to post coffeeVariety.
 *     tags: [Admin]
 *     requestBody:
 *       description: Request body for creating coffeeVariety
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *            example:
 *              {"name":"wind breaker tree1"}
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
 *               example: { "success": true, "code": 200, "message": "Wind breaker tree created", "data": { "id": 18, "name": "coffeeVariety tree123", "created_by": 246, "updatedAt": "2022-06-24T11:17:57.973Z", "createdAt": "2022-06-24T11:17:57.973Z" } }
 */
router.post("/coffeeVariety", auth, async function (req, res) {
  try {
    const { name } = req.body;
    let userId = req.user.id;
    const windBreakerRes = await db.CoffeeVariety.create({
      name,
      created_by: userId,
      status: "enabled",
    });
    return res.json(
      successRespSync({
        msg: "Wind breaker tree created",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/coffeeSpecies:
 *   post:
 *     summary: API to post coffeeSpecies
 *     description: API to post coffeeSpecies.
 *     tags: [Admin]
 *     requestBody:
 *       description: Request body for creating coffeeSpecies
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                coffeeVarid:
 *                  type: integer
 *            example:
 *              {"name":"coffee species", coffeeVarid: 1}
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
 *               example: { "success": true, "code": 200, "message": "Wind breaker tree created", "data": { "id": 18, "name": "coffeeSpecies tree123", "created_by": 246, "updatedAt": "2022-06-24T11:17:57.973Z", "createdAt": "2022-06-24T11:17:57.973Z" } }
 */

router.post("/coffeeSpecies", auth, async function (req, res) {
  try {
    const { name, coffeeVarId } = req.body;
    let userId = req.user.id;
    const windBreakerRes = await db.CoffeeSpecies.create({
      name,
      created_by: userId,
      coffee_variety: coffeeVarId,
      status: "enabled",
    });
    return res.json(
      successRespSync({
        msg: "CoffeeSpecies created successfully",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/horticultureInfo:
 *   post:
 *     summary: API to post horticultureInfo
 *     description: API to post horticultureInfo.
 *     tags: [Admin]
 *     requestBody:
 *       description: Request body for creating horticultureInfo
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *            example:
 *              {"name":"wind breaker tree1"}
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
 *               example: { "success": true, "code": 200, "message": "Wind breaker tree created", "data": { "id": 18, "name": "horticultureInfo tree123", "created_by": 246, "updatedAt": "2022-06-24T11:17:57.973Z", "createdAt": "2022-06-24T11:17:57.973Z" } }
 */
router.post("/horticultureInfo", auth, async function (req, res) {
  try {
    const { name } = req.body;
    let userId = req.user.id;
    const windBreakerRes = await db.HorticultureInformation.create({
      name,
      created_by: userId,
      status: "enabled",
    });
    return res.json(
      successRespSync({
        msg: "Wind breaker tree created",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/shadeTree:
 *   post:
 *     summary: API to post shadeTree
 *     description: API to post shadeTree.
 *     tags: [Admin]
 *     requestBody:
 *       description: Request body for creating shadeTree
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *            example:
 *              {"name":"wind breaker tree1"}
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
 *               example: { "success": true, "code": 200, "message": "Wind breaker tree created", "data": { "id": 18, "name": "shadeTree tree123", "created_by": 246, "updatedAt": "2022-06-24T11:17:57.973Z", "createdAt": "2022-06-24T11:17:57.973Z" } }
 */

router.post("/shadeTree", auth, async function (req, res) {
  try {
    const { name } = req.body;
    let userId = req.user.id;
    const windBreakerRes = await db.ShadeTree.create({
      name,
      created_by: userId,
      status: "active",
    });
    return res.json(
      successRespSync({
        msg: "Shade  tree created",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/windBreaker/{id}:
 *   put:
 *     summary: Update windBreaker
 *     description: Update windBreaker
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of windBreaker
 *     requestBody:
 *       description: Request body for updating windbreaker
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *            example:
 *              {"name":"wind breaker tree1"}
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
 *               example: { "success": true, "code": 200, "message": "Wind breaker tree updated", "data": [ 1 ] }
 */

router.put("/windBreaker/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.WindBreaker.update(
      { name, status },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Wind breaker tree updated",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/coffeeVariety/{id}:
 *   put:
 *     summary: Update coffeeVariety
 *     description: Update coffeeVariety
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of coffeeVariety
 *     requestBody:
 *       description: Request body for updating coffeeVariety
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *            example:
 *              {"name":"coffee variety"}
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
 *               example: { "success": true, "code": 200, "message": "Coffee variety tree updated", "data": [ 1 ] }
 */
router.put("/coffeeVariety/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.CoffeeVariety.update(
      { name, status },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Coffee variety tree updated",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/coffeeSpecies/{id}:
 *   put:
 *     summary: Update coffeeSpecies
 *     description: Update coffeeSpecies
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of coffeeSpecies
 *     requestBody:
 *       description: Request body for updating coffeeSpecies
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                coffeeVarId:
 *                  type: integer
 *            example:
 *              {"name":"coffee species", coffeeVarId: 1}
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
 *               example: { "success": true, "code": 200, "message": "Coffee species tree updated", "data": [ 1 ] }
 */
router.put("/coffeeSpecies/:id", auth, async function (req, res) {
  try {
    const { name, status, coffeeVarId } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.CoffeeSpecies.update(
      { name, status, coffee_variety: coffeeVarId },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Coffee species updated",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/horticultureInfo/{id}:
 *   put:
 *     summary: Update horticultureInfo
 *     description: Update horticultureInfo
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of horticultureInfo
 *     requestBody:
 *       description: Request body for updating horticultureInfo
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *            example:
 *              {"name":"horticulture info 1"}
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
 *               example: { "success": true, "code": 200, "message": "Horticulture info updated", "data": [ 1 ] }
 */
router.put("/horticultureInfo/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.HorticultureInformation.update(
      { name, status },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Horticulture info updated",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/shadeTree/{id}:
 *   put:
 *     summary: Update shadeTree
 *     description: Update shadeTree
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of shadeTree
 *     requestBody:
 *       description: Request body for updating shadeTree
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *            example:
 *              {"name":"shade tree1"}
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
 *               example: { "success": true, "code": 200, "message": "Shade tree updated", "data": [ 1 ] }
 */

router.put("/shadeTree/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.ShadeTree.update(
      { name, status },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Shade tree updated",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/windBreaker:
 *   get:
 *     description: Returns all winbreaker data
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
 *     responses:
 *       200:
 *         description: Wind breaker fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get("/windBreaker", auth, translation, async function (req, res) {
  try {
    const { page, limit } = req.query;
    const { organization, subOrgId } = req.user;
    let query = {
      include: [
        {
          attributes: [],
          model: db.user,
          as: "user",
          where: { 
            organization ,
            ...(subOrgId ? {subOrganizationId: subOrgId } : {})
          },
          required: true,
        },
      ],
      where: { isDeleted: false },
    };
    if (page && limit) {
      query.offset = parseInt((page - 1) * limit);
      query.limit = parseInt(limit);
    }
    let windBreakerRes = await db.WindBreaker.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/windBreaker",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Wind breaker fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/coffeeVariety:
 *   get:
 *     description: Returns all coffee variety data
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
 *     responses:
 *       200:
 *         description: Coffee variety fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/coffeeVariety", auth, translation, async function (req, res) {
  try {
    const { name, sortingType, page, limit, coffeeSpecies } = req.query;
    const { userOrganization } = req.user;
    const subOrgId = req.user.subOrgId || null;
    
    // Get all user IDs within the userOrganization/sub-userOrganization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-userOrganization, only get data from that sub-userOrganization
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, subOrgId);
    } else {
      // If user is from main userOrganization, get data from all sub-userOrganizations
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, null);
    }

    // If no users found in userOrganization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No data found for this userOrganization.",
          data: { rows: [], count: 0 },
        })
      );
    }
    
    let query = {
      include: [
        {
          attributes: [],
          model: db.user,
          as: "user",
          where: { 
            userOrganization,
            id: {
              [Op.in]: organizationUserIds
            }
          },
          required: true,
        },
      ],
      where: { isDeleted: false },
    };
    if (page && limit) {
      query.offset = parseInt((page - 1) * limit);
      query.limit = parseInt(limit);
    }
    if (name && sortingType) {
      query.order = [[name, sortingType]];
    }
    let getCoffeeVarieties = await db.CoffeeVariety.findAndCountAll(query);
    if(getCoffeeVarieties.rows) {
      sortCoffeeVarieties(getCoffeeVarieties.rows);
    }
    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      getCoffeeVarieties = req.translateFunction(
        getCoffeeVarieties,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/coffeeVariety",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Coffee variety fetched",
        data: getCoffeeVarieties,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/coffeeSpecies:
 *   get:
 *     description: Returns all coffee species data
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
 *     responses:
 *       200:
 *         description: Coffee species fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/coffeeSpecies", auth, translation, async function (req, res) {
  try {
    const { name, sortingType, page, limit } = req.query;
    let userId = req.user.id;
    const { userOrganization } = req.user;
    const subOrgId = req.user.subOrgId || null;
    
    // Get all user IDs within the userOrganization/sub-userOrganization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-userOrganization, only get data from that sub-userOrganization
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, subOrgId);
    } else {
      // If user is from main userOrganization, get data from all sub-userOrganizations
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, null);
    }

    // If no users found in userOrganization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No data found for this userOrganization.",
          data: { rows: [], count: 0 },
        })
      );
    }
    
    let query = { where: { isDeleted: false } };
    query.include = [
      {
        model: db.CoffeeVariety,
      },
      {
        attributes: [],
        model: db.user,
        as: "user",
        where: { 
          userOrganization,
          id: {
            [Op.in]: organizationUserIds
          }
        },
        required: true,
      },
    ];
    if (page && limit) {
      query.offset = parseInt((page - 1) * limit);
      query.limit = parseInt(limit);
    }
    if (name && sortingType) {
      query.order = [[name, sortingType]];
    }
    let windBreakerRes = await db.CoffeeSpecies.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/coffeeSpecies",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Coffee species fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/horticultureInfo:
 *   get:
 *     description: Returns all horticulture info data
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
 *     responses:
 *       200:
 *         description: horticulture info fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/horticultureInfo", auth, translation, async function (req, res) {
  try {
    const { page, limit } = req.query;
    const { organization, subOrgId } = req.user;
    let query = {
      include: [
        {
          attributes: [],
          model: db.user,
          as: "user",
          where: { 
            organization,
            ...(subOrgId ? {subOrganizationId: subOrgId } : {})
           },
          required: true,
        },
      ],
      where: { isDeleted: false },
    };
    if (page && limit) {
      query.offset = parseInt((page - 1) * limit);
      query.limit = parseInt(limit);
    }
    let windBreakerRes = await db.HorticultureInformation.findAndCountAll(
      query
    );

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/horticultureInfo",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Horticulture info fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/shadeTree:
 *   get:
 *     description: Returns all shade tree data
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
 *     responses:
 *       200:
 *         description: shade tree fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/shadeTree", auth, translation, async function (req, res) {
  try {
    const { page, limit } = req.query;
   const { organization, subOrgId } = req.user;
    let query = {
      include: [
        {
          attributes: [],
          model: db.user,
          as: "user",
          where:  { 
            organization,
            ...(subOrgId ? {subOrganizationId: subOrgId } : {})
           },
          required: true,
        },
      ],
      where: { isDeleted: false },
    };
    if (page && limit) {
      query.offset = parseInt((page - 1) * limit);
      query.limit = parseInt(limit);
    }
    let windBreakerRes = await db.ShadeTree.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/shadeTree",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Shade tree fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/windBreaker/{id}:
 *   delete:
 *     summary: Delete windBreaker
 *     description: Delete windBreaker
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of windBreaker
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
 *                 example: { "success": true, "code": 200, "message": "Wind breaker tree deleted", "data": [ 1 ] }
 */
router.delete("/windBreaker/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.WindBreaker.update(
      { isDeleted: true },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Wind breaker tree deleted",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/coffeeVariety/{id}:
 *   delete:
 *     summary: Delete coffeeVariety
 *     description: Delete coffeeVariety
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of coffeeVariety
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
 *                 example: { "success": true, "code": 200, "message": "Coffee variety tree deleted", "data": [ 1 ] }
 */
router.delete("/coffeeVariety/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.CoffeeVariety.update(
      { isDeleted: true },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Coffee variety tree deleted",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/coffeeSpecies/{id}:
 *   delete:
 *     summary: Delete coffeeSpecies
 *     description: Delete coffeeSpecies
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of coffeeSpecies
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
 *                 example: { "success": true, "code": 200, "message": "Coffee species deleted", "data": [ 1 ] }
 */
router.delete("/coffeeSpecies/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.CoffeeSpecies.update(
      { isDeleted: true },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Coffee species deleted",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/horticultureInfo/{id}:
 *   delete:
 *     summary: Delete horticultureInfo
 *     description: Delete horticultureInfo
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of horticultureInfo
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
 *                 example: { "success": true, "code": 200, "message": "Horticulture info deleted", "data": [ 1 ] }
 */
router.delete("/horticultureInfo/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.HorticultureInformation.update(
      { isDeleted: true },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Horticulture info deleted",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/coffee/shadeTree/{id}:
 *   delete:
 *     summary: Delete shadeTree
 *     description: Delete shadeTree
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of shadeTree
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
 *                 example: { "success": true, "code": 200, "message": "Shade tree deleted", "data": [ 1 ] }
 */
router.delete("/shadeTree/:id", auth, async function (req, res) {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    let userId = req.user.id;
    const windBreakerRes = await db.ShadeTree.update(
      { isDeleted: true },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Shade tree deleted",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.get('/coffee-types', auth, translation, async (req, res) => {
  try {
    const { lang } = req.headers;

    const coffeeTypes = await db.CoffeeType.findAll();

    if(lang && lang !== "en") {
      req.translateFunction(coffeeTypes, globalTranslationCache, {
        lvl1: true,
      });
    }

    return res.json(
      successRespSync({
        msg: "Coffee types fetched",
        data: coffeeTypes,
      })
    );
  } catch (err) {
    console.log(err);
    return serverError(res, error);
  }
});

router.get("/memberData/coffeeSpecies", auth, translation, async function (req, res) {
  try {
    let userId = req.user.id;
    const { userOrganization } = req.user;
    const subOrgId = req.user.subOrgId || null;
    
    // Get all user IDs within the userOrganization/sub-userOrganization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-userOrganization, only get data from that sub-userOrganization
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, subOrgId);
    } else {
      // If user is from main userOrganization, get data from all sub-userOrganizations
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, null);
    }

    // If no users found in userOrganization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No data found for this userOrganization.",
          data: { rows: [], count: 0 },
        })
      );
    }
    
    let query = { 
      where: { isDeleted: false,
        [Op.or]: [
          { created_by: { [Op.in]: organizationUserIds } }, 
          { created_by: { [Op.is]: null }}
        ],
      },
    };

    query.include = [
      {
        model: db.CoffeeVariety,
      },
      {
        attributes: [],
        model: db.user,
        as: "user",
        where: { 
          userOrganization,
          id: {
            [Op.in]: organizationUserIds
          }
        },
        required: false,
      },
    ];

    let windBreakerRes = await db.CoffeeSpecies.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        windBreakerRes,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/coffeeSpecies",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Coffee species fetched",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});
router.get("/memberData/coffeeVariety", auth, translation, async function (req, res) {
  try {
    const { coffeeSpecies } = req.query;
    let userId = req.user.id;
    const { userOrganization } = req.user;
    const subOrgId = req.user.subOrgId || null;
    
    // Get all user IDs within the userOrganization/sub-userOrganization
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-userOrganization, only get data from that sub-userOrganization
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, subOrgId);
    } else {
      // If user is from main userOrganization, get data from all sub-userOrganizations
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, null);
    }

    // If no users found in userOrganization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No data found for this userOrganization.",
          data: { rows: [], count: 0 },
        })
      );
    }
    
    let query = { 
        where: { isDeleted: false,
          [Op.or]: [
            { created_by: { [Op.in]: organizationUserIds } }, 
            { created_by: { [Op.is]: null }}
          ],
          coffee_species: coffeeSpecies
        },
    };
    query.include  = [
        {
          attributes: [],
          model: db.user,
          as: "user",
          where: { 
            userOrganization,
            id: {
              [Op.in]: organizationUserIds
            }
          },
          required: false,
        },
      ]
    let getCoffeeVarieties = await db.CoffeeVariety.findAndCountAll(query);
    if(getCoffeeVarieties.rows) {
      sortCoffeeVarieties(getCoffeeVarieties.rows);
    }
    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      getCoffeeVarieties = req.translateFunction(
        getCoffeeVarieties,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/coffeeVariety",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Coffee variety fetched",
        data: getCoffeeVarieties,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

module.exports = router;
