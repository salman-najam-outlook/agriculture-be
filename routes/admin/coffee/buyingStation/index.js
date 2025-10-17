const express = require("express");
const router = express.Router();
const _ = require("lodash");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { success } = require(rootPath + "/helpers/language");
const { successRespSync, serverError, errorRespSync } = require(rootPath + "/helpers/api");
const { listValidation } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const moment = require("moment");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");

const {Op} = require('sequelize')

router.use("/purchase-order", require("./purchaseOrder"));
router.use("/processing-batch", require("./processingBatch"));

const circularJson = (array) => {
  return JSON.stringify(array, (key, value) => {
    // If the value is an object with a "parent" property, it's a circular reference
    if (key === "parent" && typeof value === "object" && value !== null) {
      return; // return undefined to remove the circular reference
    }
    return value; // return the original value for other properties
  });
};

router.get(
  "/processing-batch-for-dds",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization } = req.user;
      let {
        page = 1,
        limit = 10,
        col = "id",
        desc = "false",
        searchPhrase,
      } = req.query;
      limit = parseInt(limit);
      let where = {} ;

      // for searching
      if (!_.isEmpty(searchPhrase)) {
        const fields = ["batchCode"];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: searchPhrase,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }
      let response = await db.BuyingStationProcessingBatch.findAndCountAll({
        where: where,
        include: [
          {
            required:true,
            model: db.BuyingStationOrder,
            as: "buyingStationOrder",
            through: "BuyingStationProcessingBatchAndOrder",
            include: [
              {
                model: db.BuyingStationProcessingBatch,
                through: {
                  model: db.BuyingStationProcessingBatchAndOrder,
                  attributes: [],
                },
                attributes: ["batchRating"],
                as: "processingBatch",
              },
              {
                required:true,
                where:{
                  organization:req.user.organization
                },
                model: db.user,
                as: "buyingStation",
                attributes: ["id", "address", "country", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
              },
              {
                model: db.user,
                attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                as: "farmer",
              },
              {
                model: db.Plantations,
                as: "plantations",
                attributes: ["id", "plantation_name", "no_of_coffee_trees", "expected_yield"],
                include: [
                  {
                    model: db.user_farm,
                    as: "userFarms",
                    through: "PlantationsUserFarmsMap",
                    attributes: ["id", "address", "farmType", "farmName", "farmOwner", "ownerName",  "area", "district", "region", "registrationNo", "farmerId", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                    include: [
                      {
                        model: db.UserFarmCoordinate,
                        as: "farmCoordinates",
                        required: false,
                      },
                      {
                        model: db.Geofence,
                        as: "circularGeofence",
                        where: { isPrimary: true, geofenceRadius: { [Op.not]: null } },
                        attributes: ["id", "geofenceRadius", "geofenceCenterLat", "geofenceCenterLog"],
                        required: false,
                      },
                      {
                        model: db.user,
                        as: "user",
                        attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl","country"],
                      }
                    ]
                  },
                ],
              },
              {
                model: db.user_farm,
                as: "userFarms",
                attributes: ["id", "address", "farmType", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerId", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                include: [
                  {
                    model: db.UserFarmCoordinate,
                    as: "farmCoordinates",
                    required: false,
                  },
                  {
                    model: db.Geofence,
                    as: "circularGeofence",
                    where: { isPrimary: true, geofenceRadius: { [Op.not]: null } },
                    attributes: ["id", "geofenceRadius", "geofenceCenterLat", "geofenceCenterLog"],
                    required: false,
                  },
                  {
                    model: db.user,
                    as: "user",
                    attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl","country"],
                  }
                ]
              },
            ]},
            {
              required:true,
              model: db.ParchmentCoffeeProcessingBatch,
              as: "parchmentCoffeeProcessingBatches",
              include:[{
                required:true,
                model: db.ParchmentCoffee,
                as: "parchmentCoffee",
                  include:[{
                    attributes: ["id", "address", "country", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                    model: db.user,
                    as: "dryMilling",
                  },
                  {
                    model: db.ParchmentCupping,
                    as: "parchmentCuppings",
                  },
                  {
                    model: db.Cupping,
                    as: "cuppingData",
                  }]
              },
        ],
      }
    ]
      });

    
         const a  = JSON.parse(JSON.stringify(response))  
          const nwResponse = []
          a.rows.forEach(x=> {
            const purchaOrder = x.buyingStationOrder.filter(y => {
              return (y.plantations && y.plantations.userFarms.length)  || y.userFarms 
            })
            x.buyingStationOrder = purchaOrder
            nwResponse.push(x)
          })
          
          const result = nwResponse.filter(x => {
             return x.buyingStationOrder.length
          })

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          count:result.length,
          response:result
        },
      })
    );
    }catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
})

/**
 * @swagger
 * /admin/coffee/buying-station:
 *   get:
 *     summary: API for getting list of the buying stations.
 *     description: API for getting list of the buying stations along with purchase order and processing batch data.
 *     tags: [Admin-BuyingStation]
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
 *         name: search
 *         schema:
 *           type: string
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 17, "firstName": "hemant", "lastName": "rathore786", "address": null, "buyingStationPurchaseOrders": [ { "id": 2, "orderCode": "PO-0002" }, { "id": 21, "orderCode": "PO-00020" } ], "buyingStationProcessingBatches": [ { "id": 48, "batchCode": "PB-00048" } ] } ] }
 */
router.get(
  "/",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization, subOrgId } = req.user;
      let {
        page = 1,
        limit = 10,
        col = "id",
        desc = "false",
        search,
      } = req.query;
      limit = parseInt(limit);

      // for searching
      let whereUser = { 
        organization,
        ...(subOrgId ? {subOrganizationId: subOrgId } : {subOrganizationId : null})
      };
      if (!_.isEmpty(search)) {
        const fields = ["firstName","middleName", "lastName", "address", "id_number"];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        whereUser = { ...whereUser, [db.Sequelize.Op.or]: searchQuery };
      }

      // fetch and count data
      const { count: totalRows, rows } = await db.user.findAndCountAll({
        include: [
          {
            model: db.UserMembershipMap,
            as: "manyMembershipMap",
            attributes: [],
            required: true,
            subQuery: true,
            include: [
              {
                required: true,
                model: db.UserRoleMembershipMap,
                as: "mappedUserRole",
                attributes: [],
                where: {
                  user_role_id: "buying_station",
                },
              },
            ],
          },
          {
            model: db.BuyingStationOrder,
            as: "buyingStationPurchaseOrders",
            attributes: ["id", "orderCode", "coffeeCherryQty", "grandTotal"],
            include: [
              {
                model: db.user,
                as: "farmer",
                attributes: ["firstName","middleName", "lastName"],
              },
            ],
          },
          {
            model: db.BuyingStationProcessingBatch,
            as: "buyingStationProcessingBatches",
            attributes: [
              "id",
              "batchCode",
              "startDate",
              "endDate",
              "totalCoffeeCherryQty",
              "parchmentOut",
            ],
            include: [
              {
                model: db.BuyingStationOrder,
                through: {
                  model: db.BuyingStationProcessingBatchAndOrder,
                  attributes: [],
                },
                as: "buyingStationOrder",
                attributes: {
                  exclude: ["qrCode", "isdeleted", "createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: db.user,
                    as: "buyingStation",
                    attributes: ["firstName","middleName", "lastName", "fullName","id_number"],
                  },
                ],
              },
              {
                model: db.ProcessingType,
                as: "processingType",
              },
            ],
          },
        ],
        attributes: ["id", "firstName","middleName", "lastName", "address", "fullName", "id_number", "email", "mobile", "active"],
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, desc == "false" ? "ASC" : "DESC"]],
        where: whereUser,
        distinct: true,
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { totalRows, numRows: rows?.length || 0, rows },
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
 * /admin/coffee/buying-station/{id}:
 *   get:
 *     summary: API for getting a single buying station details.
 *     description: API for getting details of a specific buying station by ID.
 *     tags: [Admin-BuyingStation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *           description: Success
 *        '404':
 *           description: Buying station not found
 */
router.get(
  "/:id",
  auth,
  async function (req, res) {
    try {
      const { id } = req.params;
      const { organization } = req.user;

      // Find the buying station
      const buyingStation = await db.user.findOne({
        where: { id, organization },
        include: [
          {
            model: db.UserMembershipMap,
            as: "manyMembershipMap",
            attributes: [],
            required: true,
            subQuery: true,
            include: [
              {
                required: true,
                model: db.UserRoleMembershipMap,
                as: "mappedUserRole",
                attributes: [],
                where: {
                  user_role_id: "buying_station",
                },
              },
            ],
          },
          {
            model: db.Membership,
            as: "user_membership",
            required: false,
            through: {
              model: db.UserMembershipMap,
              attributes: [],
            },
            attributes: [
              "id",
              "membership_type",
              "plan_type",
              "membership_duration",
              "membership_duration_unit",
              "membership_fee"
            ],
            include: [
              {
                model: db.UserRoleMembershipMap,
                as: "userRoleMembershipMap",
                attributes: ["user_role_id"],
                where: { user_role_id: "buying_station" },
                required: false,
              },
            ],
          },
          {
              model: db.activationKeys,
              as: 'activation',
              include: [
                {
                  model: db.Membership,
                  as: 'membership_assoc',
                  attributes: [
                    'membership_type',
                    'membership_duration',
                    'membership_duration_unit',
                  ],
                },
              ],
              attributes: [
                'membershipExtendedDays',
                'membershipExtensionReason',
                'membership_type',
                'membershipValidity',
              ],
              required: false
            },
        ],
        attributes: ["id", "firstName", "middleName", "lastName", "address", "fullName", "id_number", "email", "mobile", "active", "country","countryIsoCode","countryId", "stateId", "city", "district", "village","website","userTribe"],
      });

      if (!buyingStation) {
        return res.status(404).json(
          errorRespSync({
            msg: "Buying station not found.",
          })
        );
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: buyingStation,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  "/purchase-order/list/:id",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization } = req.user;
      let { id } = req.params;
      let {
        page = 1,
        limit = 10,
        col = "id",
        desc = "false",
        search,
        startDate,
        endDate,
      } = req.query;
      limit = parseInt(limit);

      let where = { buyingStationId: id };

      // for searching
      if (!_.isEmpty(search)) {
        const fields = ["orderCode"];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }
      if (startDate) {
        startDate = startDate
          ? moment.utc(startDate, "YYYY-MM-DD").startOf("day")
          : null;

        endDate = endDate
          ? moment.utc(endDate, "YYYY-MM-DD").endOf("day")
          : null;
        where = {
          ...where,
          purchasedAt: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        };
      }
      let whereUser = { organization, id };

      // fetch and count data
      const buyingStation = await db.user.findOne({
        attributes: ["id", "firstName","middleName", "lastName", "address", "fullName"],
        where: whereUser,
      });

      const { count: totalRows, rows } =
        await db.BuyingStationOrder.findAndCountAll({
          include: [
            {
              model: db.user,
              as: "farmer",
              attributes: ["firstName","middleName", "lastName"],
            },
            {
              model: db.user_farm,
              as: "userFarms",
              attributes: ["farmName"],
              required: false,
            },
            {
              model: db.CoffeeSpecies,
              as: "coffeeSpecies",
              attributes: ["name"],
              required: false,
            },
            {
              model: db.CoffeeVariety,
              as: "coffeeVariety",
              attributes: ["name"],
              through: { attributes: [] },
              required: false,
            },
            {
              model: db.CoffeeVariety,
              as: "coffeeVarietyDirect",
              attributes: ["name"],
              required: false,
            },
          ],
          attributes: [
            "id", "orderCode", "farmerId", "farmId", "plantationId", "speciesId", "varietyId", 
            "buyingStationId", "currency_id", "coffeeCherryQty", "coffeeCherryQlty", "coffeeCherryPic",
            "perKgPrice", "grandTotal", "buyer", "availableWeight", "status", "recordId", 
            "external_id", "createdAt", "updatedAt", "isdeleted", "segmentId", "coffeeTypeId",
            "purchasedAt", "dateOfEntry"
          ],
          offset: (page - 1) * limit,
          limit: limit,
          order: [[col, desc == "false" ? "ASC" : "DESC"]],
          where: where,
          distinct: true,
        });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            buyingStation,
            totalRows,
            numRows: rows?.length || 0,
            rows,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  "/processing-batch/list/:id",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization } = req.user;
      let { id } = req.params;
      let {
        page = 1,
        limit = 10,
        col = "id",
        desc = "false",
        search,
        startDate,
        endDate,
      } = req.query;
      limit = parseInt(limit);

      let where = { buyingStationId: id };

      // for searching
      if (!_.isEmpty(search)) {
        const fields = ["batchCode"];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }
      if (startDate) {
        startDate = startDate
          ? moment.utc(startDate, "YYYY-MM-DD").startOf("day")
          : null;

        endDate = endDate
          ? moment.utc(endDate, "YYYY-MM-DD").endOf("day")
          : null;
        where = {
          ...where,
          [db.Sequelize.Op.or]: [
            {
              startDate: {
                [Op.between]: [startDate, endDate],
              },
            },
            {
              endDate: {
                [Op.between]: [startDate, endDate],
              },
            },
          ],
        };
      }
      let whereUser = { organization, id };

      // fetch and count data
      const buyingStation = await db.user.findOne({
        attributes: ["id", "firstName","middleName", "lastName", "address", "fullName"],
        where: whereUser,
      });

      const { count: totalRows, rows } =
        await db.BuyingStationProcessingBatch.findAndCountAll({
          include: [
            {
              model: db.BuyingStationOrder,
              through: {
                model: db.BuyingStationProcessingBatchAndOrder,
                attributes: [],
              },
              as: "buyingStationOrder",
              attributes: {
                exclude: ["qrCode", "isdeleted", "createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.user,
                  as: "buyingStation",
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                },
              ],
            },
            {
              model: db.ProcessingType,
              as: "processingType",
            },
          ],
          offset: (page - 1) * limit,
          limit: limit,
          order: [[col, desc == "false" ? "ASC" : "DESC"]],
          where: where,
          distinct: true,
        });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            buyingStation,
            totalRows,
            numRows: rows?.length || 0,
            rows,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  "/purchase-order/list/:id/:type",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization } = req.user;
      let { id, type } = req.params;
      let {
        startDate,
        endDate,
      } = req.query;

      let where = { buyingStationId: id };

      if (startDate) {
        startDate = startDate
          ? moment.utc(startDate, "YYYY-MM-DD").startOf("day")
          : null;

        endDate = endDate
          ? moment.utc(endDate, "YYYY-MM-DD").endOf("day")
          : null;
        where = {
          ...where,
          purchasedAt: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        };
      }
      let whereUser = { organization, id };

      // fetch and count data
      let buyingStation = await db.user.findOne({
        attributes: ["id", "firstName","middleName", "lastName", "address", "fullName"],
        where: whereUser,
      });

      let data = await db.BuyingStationOrder.findAll({
        include: [
          {
            model: db.user,
            as: "farmer",
            attributes: [],
          },
        ],
        attributes: [
          "orderCode",
          "purchasedAt",
          [
            db.Sequelize.fn(
              "CONCAT",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("farmer.firstName"),
                ""
              ),
              " ",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("farmer.middleName"),
                ""
              ),
              " ",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("farmer.lastName"),
                ""
              )
            ),
            "farmerName", // Alias for the concatenated full name of the farmer including middle name
          ],
          "coffeeCherryQty",
          "coffeeCherryQlty",
          "perKgPrice",
          "grandTotal",
        ],
        
        where: where,
        distinct: true,
      });

      buyingStation = JSON.parse(circularJson(buyingStation));
      data = JSON.parse(circularJson(data));

      let filepath = "";
      if (type === "pdf") {
        const _data = {
          title: "Purchase Order",
          subHeader: {
            user_name: buyingStation.fullName,
            report: "Purchase Order"
          },
          tableData: data,
        };
        const pdfData = await generatePDF(_data, req);
        if (!pdfData) {
          return res.json(
            errorRespSync({
              msg: "PDF report generation failed.",
            })
          );
        } else {
          res.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=" + pdfData.fileName,
          });
          fs.createReadStream(pdfData.path).pipe(res);
          return;
        }
      } else if (type === "csv") {
        filepath = await generateExcelReport("csv", data);

        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=${buyingStation.fullName}-purchaseOrder.csv`,
        });
        fs.createReadStream(filepath).pipe(res);
        return;
      } else if (type === "xlsx") {
        filepath = await generateExcelReport("xlsx", data);

        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=${buyingStation.fullName}-purchaseOrder.xlsx`,
        });
        fs.createReadStream(filepath).pipe(res);
        return;
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  "/processing-batch/list/:id/:type",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization } = req.user;
      let { id, type } = req.params;
      let {
        startDate,
        endDate,
      } = req.query;

      let where = { buyingStationId: id };

      if (startDate) {
        startDate = startDate
          ? moment.utc(startDate, "YYYY-MM-DD").startOf("day")
          : null;

        endDate = endDate
          ? moment.utc(endDate, "YYYY-MM-DD").endOf("day")
          : null;
        where = {
          ...where,
          [db.Sequelize.Op.or]: [
            {
              startDate: {
                [Op.between]: [startDate, endDate],
              },
            },
            {
              endDate: {
                [Op.between]: [startDate, endDate],
              },
            },
          ],
        };
      }
      let whereUser = { organization, id };

      // fetch and count data
      let buyingStation = await db.user.findOne({
        attributes: ["id", "firstName","middleName", "lastName", "address", "fullName"],
        where: whereUser,
      });

      let data =
        await db.BuyingStationProcessingBatch.findAll({
          include: [
            {
              model: db.ProcessingType,
              as: "processingType",
              attributes: []
            },
          ],
          attributes: [
            "batchCode",
            "buyingStationId",
            "startDate",
            "endDate",
            "totalCoffeeCherryQty",
            "batchRating",
            [db.Sequelize.col("processingType.name"), "processType"],
          ],
          where: where,
          distinct: true,
        });

        buyingStation = JSON.parse(circularJson(buyingStation));
        data = JSON.parse(circularJson(data));

        let filepath = "";
      if (type === "pdf") {
        const _data = {
          title: "Processing Batch",
          subHeader: {
            user_name: buyingStation.fullName,
            report: "Processing Batch"
          },
          tableData: data,
        };
        const pdfData = await generatePDF(_data, req);
        if (!pdfData) {
          return res.json(
            errorRespSync({
              msg: "PDF report generation failed.",
            })
          );
        } else {
          res.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=" + pdfData.fileName,
          });
          fs.createReadStream(pdfData.path).pipe(res);
          return;
        }
      } else if (type === "csv") {
        filepath = await generateExcelReport("csv", data);

        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=${buyingStation.fullName}-purchaseOrder.csv`,
        });
        fs.createReadStream(filepath).pipe(res);
        return;
      } else if (type === "xlsx") {
        filepath = await generateExcelReport("xlsx", data);

        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=${buyingStation.fullName}-purchaseOrder.xlsx`,
        });
        fs.createReadStream(filepath).pipe(res);
        return;
      }

    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /admin/coffee/buying-station/{id}:
 *   delete:
 *     summary: API for deleting a buying station.
 *     description: API for deleting a buying station by ID.
 *     tags: [Admin-BuyingStation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *           description: Success
 *        '404':
 *           description: Buying station not found
 */
router.delete(
  "/:id",
  auth,
  async function (req, res) {
    try {
      const { id } = req.params;
      const { organization } = req.user;

      // Check if buying station exists and belongs to organization
      const buyingStation = await db.user.findOne({
        where: { id, organization, active: 1 },
        include: [
          {
            model: db.UserMembershipMap,
            as: "manyMembershipMap",
            attributes: [],
            required: true,
            subQuery: true,
            include: [
              {
                required: true,
                model: db.UserRoleMembershipMap,
                as: "mappedUserRole",
                attributes: [],
                where: {
                  user_role_id: "buying_station",
                },
              },
            ],
          },
        ],
      });

      if (!buyingStation) {
        return res.status(404).json(
          errorRespSync({
            msg: "Buying station not found.",
          })
        );
      }

      // Soft delete by setting active to 0
      await db.user.update(
        { active: 0 },
        { where: { id, organization } }
      );

      return res.json(
        successRespSync({
          msg: "Buying station deleted successfully.",
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
 * /admin/coffee/buying-station/{id}/activate:
 *   put:
 *     summary: API for activating a buying station.
 *     description: API for activating a buying station by ID.
 *     tags: [Admin-BuyingStation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *           description: Success
 *        '404':
 *           description: Buying station not found
 */
router.put(
  "/:id/activate",
  auth,
  async function (req, res) {
    try {
      const { id } = req.params;
      const { organization } = req.user;

      // Check if buying station exists and belongs to organization
      const buyingStation = await db.user.findOne({
        where: { id, organization },
        include: [
          {
            model: db.UserMembershipMap,
            as: "manyMembershipMap",
            attributes: [],
            required: true,
            subQuery: true,
            include: [
              {
                required: true,
                model: db.UserRoleMembershipMap,
                as: "mappedUserRole",
                attributes: [],
                where: {
                  user_role_id: "buying_station",
                },
              },
            ],
          },
        ],
      });

      if (!buyingStation) {
        return res.status(404).json(
          errorRespSync({
            msg: "Buying station not found.",
          })
        );
      }

      // Activate by setting active to 1
      await db.user.update(
        { active: 1 },
        { where: { id, organization } }
      );

      return res.json(
        successRespSync({
          msg: "Buying station activated successfully.",
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
 * /admin/coffee/buying-station/{id}/deactivate:
 *   put:
 *     summary: API for deactivating a buying station.
 *     description: API for deactivating a buying station by ID.
 *     tags: [Admin-BuyingStation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *           description: Success
 *        '404':
 *           description: Buying station not found
 */
router.put(
  "/:id/deactivate",
  auth,
  async function (req, res) {
    try {
      const { id } = req.params;
      const { organization } = req.user;

      // Check if buying station exists and belongs to organization
      const buyingStation = await db.user.findOne({
        where: { id, organization },
        include: [
          {
            model: db.UserMembershipMap,
            as: "manyMembershipMap",
            attributes: [],
            required: true,
            subQuery: true,
            include: [
              {
                required: true,
                model: db.UserRoleMembershipMap,
                as: "mappedUserRole",
                attributes: [],
                where: {
                  user_role_id: "buying_station",
                },
              },
            ],
          },
        ],
      });

      if (!buyingStation) {
        return res.status(404).json(
          errorRespSync({
            msg: "Buying station not found.",
          })
        );
      }

      // Deactivate by setting active to 0
      await db.user.update(
        { active: 0 },
        { where: { id, organization } }
      );

      return res.json(
        successRespSync({
          msg: "Buying station deactivated successfully.",
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

const generateExcelReport = async (csvOrXlsx, response) => {
  try {
    const workbook = XLSX.utils.book_new();

    const directoryPath = "files";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const worksheet = XLSX.utils.json_to_sheet(response);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Order Report");

    const filePath = path.resolve(
      __dirname,
      `../../../../files/purchase-order-report.xlsx`
    );
    XLSX.writeFile(workbook, filePath);

    if (csvOrXlsx === "xlsx") {
      return filePath;
    }

    if (csvOrXlsx === "csv") {
      const csvWorkbook = XLSX.readFile(filePath);
      const csvWorksheet = csvWorkbook.Sheets[csvWorkbook.SheetNames[0]];
      const csvData = XLSX.utils.sheet_to_csv(csvWorksheet);
      const csvFilePath = path.resolve(
        __dirname,
        `../../../../files/purchase-order-report.csv`
      );
      fs.writeFileSync(csvFilePath, csvData, "utf-8");
      return csvFilePath;
    }

    return;
  } catch (err) {
    console.log("Error processing request: " + err);
  }
};

module.exports = router;
