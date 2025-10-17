const _ = require("lodash");
const express = require("express");
const { Op } = require("sequelize");
const { addOfflineFarmer } = require("../../../common/addOfflineFarmer");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { successRespSync, serverError, errorRespSync } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty, getUserIdsByOrganization } = require(rootPath + "/helpers/general");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
  
/**
 * @swagger
 * /coffee/farmers:
 *   get:
 *     description: list all registered coffee farmers
 *     tags: [Coffee Buying Station Farmers]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "farmers": [ { "id": 16, "firstName": "santosh", "lastName": "gusain" }, { "id": 34, "firstName": "manish", "lastName": "adhikari" }, { "id": 40, "firstName": "vicky", "lastName": "vi" } ] } }
 */

router.get("/", auth, async (req, res) => {
  try {
    let { search, hasPurchase, page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;
    const userOrganization = req.user.organization;
    const subOrgId = req.user.subOrgId || null;
    
    // Console log for debugging
    console.log('=== COFFEE FARMERS API DEBUG ===');
    console.log('User Organization ID:', userOrganization);
    console.log('User Sub-Organization ID:', subOrgId);
    console.log('User ID:', req.user.id);
    console.log('Is Sub Enterprise:', req.user.isSubEnterprise);
    console.log('Mongo Sub Organization ID:', req.user.mongoSubOrganizationId);
    console.log('Full User Object:', JSON.stringify(req.user, null, 2));
    console.log('================================');
    
    // Get all user IDs within the sub-organization only (not parent org)
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-organization, only get data from that sub-organization
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, subOrgId);
    } else {
      // If user is from main organization, get data from all sub-organizations
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, null);
    }

    // If no users found in organization, return empty result
    if (organizationUserIds.length === 0) {
      return res.json(
        successRespSync({
          msg: "No farmers found for this organization.",
          data: { farmers: [], total: 0, page, limit },
        })
      );
    }

    let where = {
      id: {
        [Op.in]: organizationUserIds
      },
      active: true,
      firstName: {
        [Op.not]: null,
      },
    };

    let searchArr = [];
    if (!_.isEmpty(search)) {
      searchArr = search.split(" ");
      const fields = ["firstName", "middleName", "lastName", "email", "id_number", "mobile"];
      const searchQuery = fields.map((col) => {
        return searchArr.map(word => {
          return {
            [col]: {
              [db.Sequelize.Op.like]: `%${word}%`,
            },
          };
        });
      }).flat();
      where = { ...where, [db.Sequelize.Op.or]: searchQuery };
    }

    const include = [
      {
        model: db.BuyingStationFarmer,
        as: "offlineFarmerData",
        required: false,
      },
      {
        model: db.BuyingStationOrder,
        as: "buyingStationOrder",
        order: [["id", "DESC"]],
        required: false,
      },
      {
        model: db.user_farm,
        attributes: ['id', 'farmerFirstName', 'farmerLastName'],
        as: "farms",
        required: false,
      },
    ];

    let { count, rows: farmers } = await db.user.findAndCountAll({
      include,
      attributes: ["id", "fullName", "firstName", "middleName", "lastName", "email", "userType", "address", "mobile", "id_number"],
      where,
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    let farmCountMap = {};
    if (!_.isEmpty(search)) {
      // Get all user IDs from the farmers result
      let userIds = farmers.map(farmer => farmer.id);
      
      // Execute a single optimized query to get counts
      let farmCounts = await db.user_farm.count({
        attributes: [
          'userId',
          'technicianId',
          [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count']
        ],
        where: {
          [Op.or]: [
            { userId: { [Op.in]: userIds } },
            { technicianId: { [Op.in]: userIds } }
          ]
        },
        group: ['userId', 'technicianId'],
        raw: true
      });

    // Process the counts
      farmCounts.forEach(count => {
        if (count.userId && count.technicianId && count.userId === count.technicianId) {
          farmCountMap[count.userId] = (farmCountMap[count.userId] || 0) + parseInt(count.count);
        } else {
          if (count.userId) {
            farmCountMap[count.userId] = (farmCountMap[count.userId] || 0) + parseInt(count.count);
          }
          if (count.technicianId) {
            farmCountMap[count.technicianId] = (farmCountMap[count.technicianId] || 0) + parseInt(count.count);
          }
        }
  });
    }

    let updatedFarmers = [];
    for (let el of farmers) {
      let farmCount = !_.isEmpty(search) ? (farmCountMap[el.id] || 0) : 0;
      el.farmCount = farmCount;
      let farmIds = el.farms ? el.farms.map(farm => farm.id) : [];

      if (el.userType === 'offline_technician' && el.farms && el.farms.length > 0) {
        el.lastName = el?.farms[0]?.farmerLastName;
      }
      if (el.userType === 'offline' && el.farms && el.farms.length > 0) {
        el.userType = 'offline_technician';
        el.lastName = el?.lastName || el?.farms[0].farmerLastName;
      }

      if (el.offlineFarmerData) {
        let offlineFarmerDataCopy = JSON.parse(JSON.stringify(el.offlineFarmerData));
        offlineFarmerDataCopy && offlineFarmerDataCopy.id && delete offlineFarmerDataCopy.id;
        let elCopy = JSON.parse(JSON.stringify(el));
        let tmpObj = {
          ...elCopy,
          ...offlineFarmerDataCopy,
        };
        let { farms, ...filteredEl } = tmpObj;
        if (!_.isEmpty(search)) {
          updatedFarmers.push({ ...filteredEl, farmCount });
        } else {
          updatedFarmers.push({ ...filteredEl, farmIds });
        }
      } else {
        let { farms, ...filteredEl } = el.toJSON();
        if (!_.isEmpty(search)) {
          updatedFarmers.push({ ...filteredEl, farmCount });
        } else {
          updatedFarmers.push({ ...filteredEl, farmIds });
        }
      }
    }

    farmers = updatedFarmers;

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          farmers,
          total: count,
          page,
          limit,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/detail/:farmerId", auth, async (req, res) => {
  try {
    const farmerId = req.params.farmerId;

    let where = {
      id: farmerId,
      organization: req.user.organization,
      active: true,
      firstName: {
        [Op.not]: null,
      },
    };

    const include = [
      {
        model: db.BuyingStationFarmer,
        as: "offlineFarmerData",
        required: false,
      },
      {
        model: db.BuyingStationOrder,
        as: "buyingStationOrder",
        order: [["id", "DESC"]],
        required: false,
      },
      {
        model: db.user_farm,
        attributes: ['id', 'farmerFirstName', 'farmerLastName'],
        as: "farms",
        required: false,
      },
    ];

    let farmer = await db.user.findOne({
      include,
      attributes: ["id", "fullName", "firstName", "middleName", "lastName", "email", "userType", "address", "mobile", "id_number"],
      where,
    });

    if (!farmer) {
      return res.json(
        errorRespSync({
          msg: "Farmer not found",
        })
      );
    }

    if (farmer.userType === 'offline_technician' && farmer.farms && farmer.farms.length > 0) {
      farmer.lastName = farmer?.farms[0]?.farmerLastName;
    }
    if (farmer.userType === 'offline' && farmer.farms && farmer.farms.length > 0) {
      farmer.userType = 'offline_technician';
      farmer.lastName = farmer?.lastName || farmer?.farms[0].farmerLastName;
    }

    const farmCount = await db.user_farm.count({
      where: {
        [Op.or]: [
          { userId: farmerId },
          { technicianId: farmerId },
        ],
      },
    });

    if (farmer.offlineFarmerData) {
      let offlineFarmerDataCopy = JSON.parse(JSON.stringify(farmer.offlineFarmerData));
      offlineFarmerDataCopy && offlineFarmerDataCopy.id && delete offlineFarmerDataCopy.id;
      let farmerCopy = JSON.parse(JSON.stringify(farmer));
      let tmpObj = {
        ...farmerCopy,
        ...offlineFarmerDataCopy,
      };
      let { farms, ...filteredFarmer } = tmpObj;
      farmer = { ...filteredFarmer, farmCount };
    } else {
      let { farms, ...filteredFarmer } = farmer.toJSON();
      farmer = { ...filteredFarmer, farmCount };
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: farmer,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


router.post("/", auth, validationErrorHandler, async (req, res) => {
  await addOfflineFarmer(req, res);
});

router.get("/offline", auth, async (req, res) => {
  try {
    let { organization } = req.user;
    let { searchPhrase } = req.query;
    let where = {
      organization,
    };
    if (searchPhrase) {
      where[Op.or] = {
        firstName: { [Op.like]: `%${searchPhrase}%` },
        middleName: { [Op.like]: `%${searchPhrase}%` },
        lastName: { [Op.like]: `%${searchPhrase}%` },
      };
    }
    let attributes = [
      "id",
      "fullName",
      "firstName",
      "middleName",
      "lastName",
      "address",
      "createdAt",
    ];
    let query = {
      attributes,
      where,
      order: [["createdAt", "DESC"]],
      include: [
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
        {
          attributes: [
            "orderCode",
            "createdAt",
            "coffeeCherryQty",
            "perKgPrice",
          ],
          model: db.BuyingStationOrder,
          as: "buyingStationPurchaseOrders",
        },
      ],
    };
    const getUsers = await db.user.findAndCountAll({ ...query });
    const getOfflineUser = await db.user.findAndCountAll({
      attributes,
      where: { ...where, userType: "offline" },
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          count: getUsers.count + getOfflineUser.count,
          rows: [...getOfflineUser.rows, ...getUsers.rows],
        },
      })
    );
  } catch (err) {
    return serverError(res, err);
  }
});

router.get("/farm/:farmerId", auth, async (req, res) => {
  try {
    const { farmerId, farmName, search, geofence } = req.params;
    const userOrganization = req.user.organization;
    const subOrgId = req.user.subOrgId || null;
    
    // Console log for debugging
    console.log('=== COFFEE FARM API DEBUG ===');
    console.log('User Organization ID:', userOrganization);
    console.log('User Sub-Organization ID:', subOrgId);
    console.log('User ID:', req.user.id);
    console.log('Farmer ID:', farmerId);
    console.log('=============================');
    
    // Get all user IDs within the sub-organization only (not parent org)
    let organizationUserIds = [];
    
    if (subOrgId) {
      // If user is from sub-organization, only get data from that sub-organization
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, subOrgId);
    } else {
      // If user is from main organization, get data from all sub-organizations
      organizationUserIds = await getUserIdsByOrganization(db, userOrganization, null);
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

    let where = { 
      isDeleted: 0,
      [Op.or]: [
        { userId: { [Op.eq]: farmerId } },
        { technicianId: { [Op.eq]: farmerId } }
      ]
    };

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
        // {
        //   attributes: [
        //     "id",
        //     "geofenceName",
        //     "geofenceArea",
        //     "geofenceParameter",
        //     "recordId"
        //   ],
        //   model: db.Geofence,
        //   as: "segments",
        //   where: {
        //     [Op.or]: [{ isPrimary: false }, { isPrimary: null }]
        //   },
        //   include: [
        //     {
        //       attributes: ["unit_subCategory_id"],
        //       model: db.UnitConfiguration,
        //       as: "configuration",
        //       required: false,
        //       where: {
        //         unit_subCategory_id: [3, 14],
        //       },
        //       include: [
        //         {
        //           model: db.Unit,
        //           attributes: [["field", "name"]],
        //           as: "subCategory",
        //         },
        //         {
        //           model: db.Unit,
        //           attributes: ["id", ["field", "name"], "abbreviation"],
        //           as: "unit",
        //         },
        //       ],
        //     },
        //     {
        //       model: db.GeofenceCoordinate,
        //       attributes: ["id", "lat", "log"],
        //       as: "coordinates",
        //       required: false,
        //     },
        //   ],
        //   required: false
        // },
            {
            model: db.Geofence,
            required: false,
            as: 'circularGeofence',
            where: {
              isPrimary: true,
              geofenceRadius: {
                [Op.ne]: null, 
                [Op.not]: 0 
              }
            },
              attributes:['id', 'geofenceRadius','geofenceCenterLat','geofenceCenterLog', 'farmId']
          },
          {
            model: db.FarmLocation,
            include: [
              {
                model: db.Geofence,
                where: { deletedAt: null},
                required: false,
                as: "zones",
                include: [{
                  model: db.GeofenceCoordinate,
                  as: "geofence_coordinates"
                }],
              },
            ],
            as: "locations",
            attributes:['address','city','country','state','area','id','recordId','farmId'],
            // where: {
            //   [Op.or]: [
            //     { isPrimary: false },
            //     { isPrimary: null },
            //   ],
            // },
            required: false
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
        "recordId",
        "technicianId"
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

    let farmIdArr = result.map((el) => el.id);
    let farmSegmentsHash = {},   farmSegments
    farmSegments = await db.Geofence.findAll({
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
      where: {
        [Op.or]: [{ isPrimary: false }, { isPrimary: null }],
        farmId: farmIdArr,
      },
    });

    farmSegments.forEach((el) => {
      farmSegmentsHash[el.farmId] = [
        ...(farmSegmentsHash[el.farmId] || []),
        el,
      ];
    });

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
          el.segments = farmSegmentsHash[el.id];
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

router.get("/:farmerId/farms", auth, async (req, res) => {
  try {
    const { farmerId, farmName, search, geofence } = req.params;
    const {page , limit } = req.query;

    let where = { 
      isDeleted: 0,
      [Op.or]: [
        { userId: { [Op.eq]: farmerId } },
        { technicianId: { [Op.eq]: farmerId } }
      ]
    };

    if (notEmpty(farmName)) {
      where.farmName = {
        [Op.like]: "%" + farmName + "%",
      };
    }

    let query = {

      offset: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
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
            model: db.Geofence,
            required: false,
            as: 'circularGeofence',
            where: {
              isPrimary: true,
              geofenceRadius: {
                [Op.ne]: null, 
                [Op.not]: 0 
              }
            },
              attributes:['id', 'geofenceRadius','geofenceCenterLat','geofenceCenterLog', 'farmId']
          },
          {
            model: db.FarmLocation,
            include: [
              {
                model: db.Geofence,
                where: { deletedAt: null},
                required: false,
                as: "zones",
                include: [{
                  model: db.GeofenceCoordinate,
                  as: "geofence_coordinates"
                }],
              },
            ],
            as: "locations",
            attributes:['address','city','country','state','area','id','recordId','farmId'],
            required: false
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
        "recordId",
        "technicianId"
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
    let farmIdArr = result.map((el) => el.id);
    let farmSegmentsHash = {},   farmSegments
    farmSegments = await db.Geofence.findAll({
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
      where: {
        [Op.or]: [{ isPrimary: false }, { isPrimary: null }],
        farmId: farmIdArr,
      },
    });

    farmSegments.forEach((el) => {
      farmSegmentsHash[el.farmId] = [
        ...(farmSegmentsHash[el.farmId] || []),
        el,
      ];
    });

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
          el.segments = farmSegmentsHash[el.id];
        }
        response.push(el);
      }
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          num_rows: response.length,
          data: response
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


router.get("/traceability/:farmerId", async (req, res) => {
  try {
    const { farmerId } = req.params;

    //get unit configs

    let units = await db.UnitTypes.findAll({
      attributes: ["id", "name", "label"],
      include: [
        {
          required: false,
          model: db.UserUnitConfiguration,
          as: "userSelectedUnit",
          where: { userId: farmerId },
          attributes: ["unitType", "unitId"],
        },
        {
          model: db.UnitsList,
          as: "units",
          attributes: ["id", "name", "abbvr", "factor"],
        },
      ],
    });
    const settings = await db.UserGeneralSetting.findOne({
      raw: true,
      attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
      where: { userId: farmerId },
    });

    const include = [
      {
        model: db.user_farm,
        where: {
          isDeleted: false,
        },
        as: "farms",
        include: [
          {
            model: db.PlantationsUserFarmsMap,
            as: "farmPlantationMap",
            required: true,
            include: [
              {
                model: db.Plantations,
                as: "plantations",
                where: {
                  is_deleted: false,
                },
                include: [
                  {
                    model: db.CoffeeSpecies,
                    as: "coffeeSpecies",
                  },
                  {
                    model: db.CoffeeVariety,
                    as: "coffeeVariety",
                  },
                  {
                    model: db.HorticultureInformation,
                    as: "horticultureInformation",
                    through: {
                      model: db.HorticultureInformationMapData,
                      attributes: ["number_of_trees"],
                    },
                  },
                  {
                    model: db.WindBreaker,
                    as: "windBreakerTree",
                    through: {
                      model: db.WindBreakerTreeMapData,
                      attributes: ["number_of_trees"],
                    },
                  },
                  {
                    model: db.ShadeTree,
                    as: "shadeTree",
                    through: {
                      model: db.ShadeTreeMapData,
                      attributes: ["number_of_trees"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const farmData = await db.user.findOne({
      include,
      attributes: ["id", "firstName","middleName", "lastName"],
      where: {
        id: farmerId,
      },
    });

    let traceabilityData = await db.TraceabilityInformation.findOne({
      where: {
        user_id: farmerId,
      },
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { farmData, traceabilityData, units, settings },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;