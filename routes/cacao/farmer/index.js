const _ = require("lodash");
const express = require("express");
const { Op } = require("sequelize");
const { addOfflineFarmer } = require("../../../common/addOfflineFarmer");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
/**
 * @swagger
 * /cacao/farmers:
 *   get:
 *     description: list all registered Cacao farmers
 *     tags: [Cacao Buying Station Farmers]
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
    const { search, hasPurchase,  page = 1, limit } = req.query;
    let where = {
      firstName: {
        [Op.not]: null,
      },
    };

    if (!_.isEmpty(search)) {
      const fields = ["firstName","middleName", "lastName","email"];
      const searchQuery = fields.map((col) => {
        return {
          [col]: {
            [db.Sequelize.Op.like]: "%" + search + "%",
          },
        };
      });
      where = { ...where, [db.Sequelize.Op.or]: searchQuery };
    }

    const offset = (page - 1) * (limit || 0);
    const include = [
      {
        model: db.Membership,
        as: "user_membership",
        required: false,
        through: {
          model: db.UserMembershipMap,
        },
        include: [
          {
            model: db.UserRoleMembershipMap,
            as: "userRoleMembershipMap",
            where: {
              user_role_id: "cacao_farmer",
            },
            required: false,
          },
        ],
      },
      {
        model: db.CacaoBuyingStationFarmer,
        as: "offlineCacaoFarmerData",
        required: false,
      },
      {
        model: db.CacaoPurchaseOrder,
        as: "cacaoBuyingStationOrder",
        order: [["id", "DESC"]],
        required: false,
      },
      // Only for usertype filter
      {
        model:db.user_farm,
        attributes:['id', 'farmerFirstName','farmerMiddleName', 'farmerLastName'],
        as:"farms",
        required:false
      }
    ];

    let farmers = await db.user.findAll({
      // let { count, rows: farmers } = await db.user.findAll({
      include,
      attributes: [
        "id",
        "firstName",
        "middleName",
        "lastName",
        "email",
        "mobile",
        "userType",
        "address",
        "id_number",
        [
          db.Sequelize.literal(`(
          SELECT COUNT(*)
          FROM user_farms AS farms
          WHERE
            farms.userId = user.id
        )`),
          "farmCount",
        ],
      ],
      where: {
        ...where,
        organization: req.user.organization,
        active: true,
      },
      limit: limit ? parseInt(limit) : null,
      offset: page ? parseInt(offset) : null,
    });

    let count = await db.user.count({ 
      include: [
        {
          model: db.Membership,
          as: "user_membership",
          required: false,
          through: {
            model: db.UserMembershipMap,
          },
          include: [
            {
              model: db.UserRoleMembershipMap,
              as: "userRoleMembershipMap",
              where: {
                user_role_id: "cacao_farmer",
              },
            },
          ],
        }
      ],
      attributes: ["id", "firstName", "middleName","lastName", "userType", "address"],
      where: {
        organization: req.user.organization,
        active: true,
        firstName: {
          [Op.not]: null,
        }
      },
    });
    farmers = farmers.map((el) => {
     if (el.farms && el.farms.length > 0) {
        const { farmerFirstName, farmerMiddleName, farmerLastName } = el.farms[0];

        if (el.userType === 'offline_technician' && el.farms && el.farms.length > 0) {
          el.lastName = farmerLastName;
          el.middleName = farmerMiddleName;
        } else if (el.userType === 'offline' && el.farms && el.farms.length > 0) {
          el.userType = 'offline_technician';
          el.lastName = el.lastName || farmerLastName;
          el.middleName = el.middleName || farmerMiddleName;
        }
      }


      if (el.offlineFarmerData) {
        let offlineFarmerDataCopy = JSON.parse(
          JSON.stringify(el.offlineFarmerData)
        );
        offlineFarmerDataCopy &&
          offlineFarmerDataCopy.id &&
          delete offlineFarmerDataCopy.id;
        let elCopy = JSON.parse(JSON.stringify(el));
        let tmpObj = {
          ...elCopy,
          ...offlineFarmerDataCopy,
        };

        return tmpObj;
      } else {
        return el;
      }
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          farmers,
          total: count,
          page: parseInt(page),
          limit: parseInt(limit) || '',
        },
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
                user_role_id: "cacao_farmer",
              },
            },
          ],
        },
        {
          attributes: [
            "orderCode",
            "createdAt",
            "cacao_weight",
            "perKgPrice",
          ],
          model: db.CacaoPurchaseOrder,
          as: "cacaoBuyingStationPurchaseOrders",
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

// router.get("/farm/:farmerId", auth, async (req, res) => {
//   try {
//     const { farmerId, farmName, search, geofence } = req.params;

//     let where = { userId: farmerId, isDeleted: 0 };
//     if (notEmpty(farmName)) {
//       where.farmName = {
//         [Op.like]: "%" + farmName + "%",
//       };
//     }

//     let query = {
//       include: [
//         {
//           attributes: ["unit_subCategory_id"],
//           model: db.UnitConfiguration,
//           as: "configuration",
//           required: false,
//           where: {
//             unit_subCategory_id: [3, 14],
//             // [db.Sequelize.Op.or]: [{ unit_subCategory_id: 'area' }, { unit_subCategory_id: 'parameter' }],
//           },
//           include: [
//             {
//               model: db.Unit,
//               attributes: [["field", "name"]],
//               as: "subCategory",
//             },
//             {
//               model: db.Unit,
//               attributes: ["id", ["field", "name"], "abbreviation"],
//               as: "unit",
//             },
//           ],
//         },

//         {
//           ...(geofence == 1 ? { required: true } : null),
//           attributes: ["id", "lat", "log"],
//           model: db.UserFarmCoordinate,
//           as: "coordinates",
//         },
//         {
//           attributes: ["id", "cropTypeOptId"],
//           model: db.UserfarmCrop,
//           as: "farmCrops",
//           include: [
//             {
//               attributes: [
//                 "id",
//                 [
//                   db.sequelize.literal("`farmCrops->cropVariety->crop`.`name`"),
//                   "cropName",
//                 ],
//               ],
//               model: db.UserfarmCropVariety,
//               as: "cropVariety",
//               include: [{ model: db.Crop, as: "crop", attributes: [] }],
//             },
//           ],
//         },
//         {
//           attributes: ["id", "farmingGoal"],
//           model: db.UserFarmingGoal,
//           as: "farmGoals",
//         },
//         {
//           attributes: ["id", "displayName"],
//           model: db.userLiveStock,
//           as: "farmLivestocks",
//           through: { attributes: [] },
//         },
//         {
//           attributes: ["id", "displayName"],
//           model: db.Equipment,
//           as: "farmEquipments",
//           through: { attributes: [] },
//         },
//         {
//           attributes: [
//             "id",
//             "geofenceName",
//             "geofenceArea",
//             "geofenceParameter",
//           ],
//           model: db.Geofence,
//           as: "segments",
//           include: [
//             {
//               attributes: ["unit_subCategory_id"],
//               model: db.UnitConfiguration,
//               as: "configuration",
//               required: false,
//               where: {
//                 unit_subCategory_id: [3, 14],
//               },
//               include: [
//                 {
//                   model: db.Unit,
//                   attributes: [["field", "name"]],
//                   as: "subCategory",
//                 },
//                 {
//                   model: db.Unit,
//                   attributes: ["id", ["field", "name"], "abbreviation"],
//                   as: "unit",
//                 },
//               ],
//             },
//             {
//               model: db.GeofenceCoordinate,
//               attributes: ["id", "lat", "log"],
//               as: "coordinates",
//               required: false,
//             },
//           ],
//         },
//         {
//           model: db.user,
//           as: "includeFarmOwner",
//           attributes: ["id", "firstName", "middleName","lastName", "fullName"],
//         },
//         {
//           model: db.Option,
//           as: "includeFarmType",
//           attributes: ["id", "name"],
//         },
//       ],
//       attributes: [
//         "id",
//         "userId",
//         "farmName",
//         "ownerName",
//         "registrationNo",
//         "farmOwnershipType",
//         "address",
//         "district",
//         "zipCode",
//         "farmingActivity",
//         "area",
//         "parameter",
//         "lat",
//         "log",
//         "createdAt",
//         // new
//         "farmType",
//         "productionSystem",
//         "farmOwner",
//         "country",
//         "state",
//         "city",
//         "govRegistrationNum",
//         "contractMating",
//         "cooperativeId",
//         "licenceNum",
//         "licenceExpiryDate",
//         "regulatorName",
//         "regulatorRepresentiveName",
//         "houseNum",
//         "street",
//         "recordId",
//       ],
//       where,
//       order: [["coordinates", "id", "ASC"]],
//     };

//     let [organization, result] = await Promise.all([
//       db.sequelize.query(
//         `select code from organization og inner join users u on og.id = u.organization where u.id=?`,
//         {
//           replacements: [farmerId],
//           type: db.sequelize.QueryTypes.SELECT,
//           plain: true,
//         }
//       ),
//       db.user_farm.findAll(query),
//     ]);

//     let response = [];
//     if (notEmpty(result)) {
//       for (let el of result) {
//         el = await el.toJSON();
//         let { configuration, segments } = el;
//         el.geofence = "Unmapped";
//         el.farmId = organization?.code + "-" + el.id;
//         // update configuration values
//         el.configuration = configuration.map((config) => {
//           return { name: config.subCategory?.name, unit: config?.unit };
//         });
//         if (notEmpty(segments)) {
//           el.geofence = "Mapped";
//           el.segments = segments.map((segment) => {
//             let { configuration } = segment;
//             // update configuration array inside segment array
//             configuration = configuration.map((config) => {
//               return { name: config.subCategory?.name, unit: config?.unit };
//             });
//             return { ...segment, configuration };
//           });
//         }
//         response.push(el);
//       }
//     }

//     return res.json(
//       successRespSync({
//         msg: success.FETCH,
//         data: {
//           num_rows: response.length,
//           data: response,
//         },
//       })
//     );
//   } catch (err) {
//     logErrorOccurred(__filename, err);
//     return serverError(res, err);
//   }
// });

// router.get("/traceability/:farmerId", async (req, res) => {
//   try {
//     const { farmerId } = req.params;

//     //get unit configs

//     let units = await db.UnitTypes.findAll({
//       attributes: ["id", "name", "label"],
//       include: [
//         {
//           required: false,
//           model: db.UserUnitConfiguration,
//           as: "userSelectedUnit",
//           where: { userId: farmerId },
//           attributes: ["unitType", "unitId"],
//         },
//         {
//           model: db.UnitsList,
//           as: "units",
//           attributes: ["id", "name", "abbvr", "factor"],
//         },
//       ],
//     });
//     const settings = await db.UserGeneralSetting.findOne({
//       raw: true,
//       attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
//       where: { userId: farmerId },
//     });

//     const include = [
//       {
//         model: db.user_farm,
//         where: {
//           isDeleted: false,
//         },
//         as: "farms",
//         include: [
//           {
//             model: db.PlantationsUserFarmsMap,
//             as: "farmPlantationMap",
//             required: true,
//             include: [
//               {
//                 model: db.Plantations,
//                 as: "plantations",
//                 where: {
//                   is_deleted: false,
//                 },
//                 include: [
//                   {
//                     model: db.CoffeeSpecies,
//                     as: "coffeeSpecies",
//                   },
//                   {
//                     model: db.CoffeeVariety,
//                     as: "coffeeVariety",
//                   },
//                   {
//                     model: db.HorticultureInformation,
//                     as: "horticultureInformation",
//                     through: {
//                       model: db.HorticultureInformationMapData,
//                       attributes: ["number_of_trees"],
//                     },
//                   },
//                   {
//                     model: db.WindBreaker,
//                     as: "windBreakerTree",
//                     through: {
//                       model: db.WindBreakerTreeMapData,
//                       attributes: ["number_of_trees"],
//                     },
//                   },
//                   {
//                     model: db.ShadeTree,
//                     as: "shadeTree",
//                     through: {
//                       model: db.ShadeTreeMapData,
//                       attributes: ["number_of_trees"],
//                     },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ];

//     const farmData = await db.user.findOne({
//       include,
//       attributes: ["id", "firstName", "middleName","lastName"],
//       where: {
//         id: farmerId,
//       },
//     });

//     let traceabilityData = await db.TraceabilityInformation.findOne({
//       where: {
//         user_id: farmerId,
//       },
//     });

//     return res.json(
//       successRespSync({
//         msg: success.FETCH,
//         data: { farmData, traceabilityData, units, settings },
//       })
//     );
//   } catch (err) {
//     logErrorOccurred(__filename, err);
//     return serverError(res, err);
//   }
// });

module.exports = router;
