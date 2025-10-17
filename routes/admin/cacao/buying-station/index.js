const express = require("express");
const router = express.Router();
const _ = require("lodash");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const moment = require("moment");
const { Op } = require('sequelize');
const { listValidation } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const fileUpload = require(rootPath + "/middleware/file_upload");
const { createPassword } = require(rootPath + "/helpers/hash");
//router.use("/purchase", require("./purchase-order"));
//router.use("/fermentation", require("./fermentation"));
// register buying station
// router.post(
//   "/",
//   fileUpload({
//     fields: [
//       { name: "buyingStationPic", maxCount: 1 },
//       { name: "partnerPic", maxCount: 1 },
//     ],
//     acl: "public-read",
//     bucket: process.env.BUYING_STATION_BUCKET,
//     whiteListMimeTypes: ["image/png", "image/jpeg", "image/jpg"],
//   }),
//   // validatorWeather.get(),
//   // validationErrorHandler,
//   async (req, res) => {
//     try {
//       const { firstName, lastName, partnerTribe, address, email, password } =
//         req.body;
//       console.log(req.files);
//       const set = {
//         firstName,
//         lastName,
//         address,
//         email,
//         password,
//         partnerTribe,
//       };
//       set.password = await createPassword(password);

//       for (let keyName in req.files) {
//         const { size, location, key } = req.files?.[keyName].pop();
//         set[keyName] = { size, location, key };
//         if (keyName == "partnerPic") {
//           set.profilePicUrl = location;
//           set.profilePicS3Key = key;
//         }
//       }

//       let buyingStation = await db.user.create(set);
//       buyingStation = await buyingStation?.toJSON();
//       delete buyingStation?.password;

//       return res.json(
//         successRespSync({
//           msg: success.REGISTERED,
//           data: { buyingStation },
//         })
//       );
//     } catch (err) {
//       logErrorOccurred(__filename, err);
//       return serverError(res, err);
//     }
//   }
// );

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
  "/",
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
        search,
      } = req.query;
      limit = parseInt(limit);

      // for searching
      let whereUser = { organization };
      if (!_.isEmpty(search)) {
        const fields = ["firstName", "lastName", "address"];
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
            model: db.CacaoPurchaseOrder,
            as: "cacaoBuyingStationOrder",
            attributes: ["id", "orderCode", "cacao_weight", "grandTotal"],
            include: [
              {
                model: db.user,
                as: "farmer",
                attributes: ["firstName", "lastName"],
              },
            ],
          },
          {
            model: db.CacaoFermentationProcess,
            as: "cacaoFermentationProcess",
            attributes: [
              "id",
              "fermentationCode",
              "startDate",
              "endDate",
              "initialWeight",
              "finalWeight",
            ],
            include: [
              {
                model: db.CacaoPurchaseOrder,
                as: "cacaoPurchaseOrder",
              },
            ],
          },
        ],
        attributes: ["id", "firstName", "lastName", "address", "fullName"],
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
        view = "",
        timePeriod = "date",
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
        attributes: ["id", "firstName", "lastName", "address", "fullName"],
        where: whereUser,
      });

      const { count: totalRows, rows } =
        await db.CacaoPurchaseOrder.findAndCountAll({
          include: [
            {
              model: db.user,
              as: "farmer",
              attributes: ["firstName", "lastName"],
            },
          ],
          offset: (page - 1) * limit,
          limit: limit,
          order: [[col, desc == "false" ? "ASC" : "DESC"]],
          where: where,
          distinct: true,
        });

      // find all farmers
      const { count: totalFarmers, rows: farmers } =
        await db.CacaoPurchaseOrder.findAndCountAll({
          include: [
            {
              model: db.user,
              as: "farmer",
              attributes: [
                "id",
                "fullName",
                "firstName",
                "lastName",
                "email",
                "address",
                "mobile",
                "city",
                "district",
                "village",
                "address",
                "createdAt",
              ],
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
                        user_role_id: "farmer" || "coffee_farmer",
                      },
                    },
                  ],
                },
              ],
              where: {
                organization,
              },
              distinct: true,
            },
          ],
          attributes: ["id"],
          offset: (page - 1) * limit,
          limit: limit,
          order: [[col, desc == "false" ? "ASC" : "DESC"]],
          distinct: true,
          group: ["farmerId"],
        });

      if (view === "calendar" && timePeriod === "date") {
        startDate = startDate
          ? moment.utc(startDate, "YYYY-MM-DD").startOf("day")
          : null;
        endDate = endDate
          ? moment.utc(endDate, "YYYY-MM-DD").endOf("day")
          : null;
        let buyingStationbyFarmers = [];
        for (const f of farmers) {
          let buyingStationData = await db.CacaoPurchaseOrder.findAll({
            include: [
              {
                model: db.user,
                as: "farmer",
                attributes: [
                  "id",
                  "fullName",
                  "firstName",
                  "lastName",
                  "email",
                  "address",
                  "mobile",
                  "city",
                  "district",
                  "village",
                  "address",
                  "createdAt",
                ],
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
                          user_role_id: "farmer" || "coffee_farmer",
                        },
                      },
                    ],
                  },
                ],
                where: {
                  id: f.farmer.id,
                  organization,
                },
              },
            ],
            attributes: ["cacao_weight", "purchasedAt"],
            where: {
              farmerId: f.farmer.id,
              purchasedAt: {
                [db.Sequelize.Op.between]: [startDate, endDate],
              },
            },
            distinct: true,
            group: ["farmerId"],
          });
          if (buyingStationData.length > 0) {
            buyingStationbyFarmers.push(buyingStationData);
          } else {
            buyingStationbyFarmers.push([f]);
          }
        }

        let chartReadyData = [];
        for (const singleData of buyingStationbyFarmers) {
          let local = {};
          let selectedData = [];
          for (const bsf of singleData) {
            if ("cacao_weight" in bsf.dataValues) {
              let tempStartDate = moment.utc(startDate, "YYYY-MM-DD");
              let purchasedDate = moment.utc(bsf.purchasedAt, "MM/DD/YYYY");
              while (tempStartDate <= endDate) {
                if (purchasedDate.isSame(tempStartDate, "day")) {
                  selectedData.push(bsf.cacao_weight);
                } else {
                  selectedData.push(0);
                }
                tempStartDate.add(1, "days");
              }
              local.farmer = bsf.farmer;
              local.selectedData = selectedData;
              chartReadyData.push(local);
            } else {
              local.farmer = bsf.farmer;
              const totalNoDays = endDate.diff(startDate, "days") + 1;
              local.selectedData = Array(totalNoDays)
                .fill()
                .map((x, i) => 0);
              chartReadyData.push(local);
            }
          }
        }
        return res.json(
          successRespSync({
            msg: success.FETCH,
            data: {
              selectedRange: { startDate, endDate },
              totalRows: totalFarmers.length,
              numRows: chartReadyData?.length,
              rows: chartReadyData,
            },
          })
        );
      } else if (view === "calendar" && timePeriod === "month") {
        startDate = startDate
          ? moment.utc(startDate, "YYYY-MM-DD").startOf("month")
          : null;
        endDate = endDate
          ? moment.utc(endDate, "YYYY-MM-DD").endOf("month")
          : null;
        let buyingStationbyFarmers = [];
        for (const f of farmers) {
          let buyingStationData = await db.CacaoPurchaseOrder.findAll({
            include: [
              {
                model: db.user,
                as: "farmer",
                attributes: [
                  "id",
                  "fullName",
                  "firstName",
                  "lastName",
                  "email",
                  "address",
                  "mobile",
                  "city",
                  "district",
                  "village",
                  "address",
                  "createdAt",
                ],
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
                          user_role_id: "farmer" || "coffee_farmer",
                        },
                      },
                    ],
                  },
                ],
                where: {
                  id: f.farmer.id,
                  organization,
                },
              },
            ],
            attributes: ["cacao_weight", "purchasedAt"],
            where: {
              farmerId: f.farmer.id,
              purchasedAt: {
                [db.Sequelize.Op.between]: [startDate, endDate],
              },
            },
            distinct: true,
            group: ["farmerId"],
          });
          if (buyingStationData.length > 0) {
            buyingStationbyFarmers.push(buyingStationData);
          } else {
            buyingStationbyFarmers.push([f]);
          }
        }

        let chartReadyData = [];
        for (const singleData of buyingStationbyFarmers) {
          let local = {};
          let selectedData = [];
          let sum = 0;
          for (const bsf of singleData) {
            if ("cacao_weight" in bsf.dataValues) {
              let tempStartDate = moment.utc(startDate, "YYYY-MM-DD");
              let purchasedDate = moment.utc(bsf.purchasedAt, "MM/DD/YYYY");
              while (tempStartDate <= endDate) {
                let endOfMonth = moment(tempStartDate)
                  .endOf("month")
                  .format("YYYY-MM-DD");
                if (purchasedDate.isSame(tempStartDate, "day")) {
                  sum += parseInt(bsf.cacao_weight);
                } else {
                  sum += 0;
                }
                if (tempStartDate.format("YYYY-MM-DD") === endOfMonth) {
                  selectedData.push(sum);
                  sum = 0;
                }
                tempStartDate.add(1, "days");
              }
              local.farmer = bsf.farmer;
              local.selectedData = selectedData;
              chartReadyData.push(local);
            } else {
              local.farmer = bsf.farmer;
              const totalNoDays = endDate.diff(startDate, "month") + 1;
              local.selectedData = Array(totalNoDays)
                .fill()
                .map((x, i) => 0);
              chartReadyData.push(local);
            }
          }
        }

        return res.json(
          successRespSync({
            msg: success.FETCH,
            data: {
              selectedRange: { startDate, endDate },
              totalRows: totalFarmers.length,
              numRows: chartReadyData?.length,
              rows: chartReadyData,
            },
          })
        );
      } else if (view === "calendar" && timePeriod === "year") {
        startDate = startDate
          ? moment.utc(startDate, "YYYY-MM-DD").startOf("year")
          : null;
        endDate = endDate
          ? moment.utc(endDate, "YYYY-MM-DD").endOf("year")
          : null;
        let buyingStationbyFarmers = [];
        for (const f of farmers) {
          let buyingStationData = await db.CacaoPurchaseOrder.findAll({
            include: [
              {
                model: db.user,
                as: "farmer",
                attributes: [
                  "id",
                  "fullName",
                  "firstName",
                  "lastName",
                  "email",
                  "address",
                  "mobile",
                  "city",
                  "district",
                  "village",
                  "address",
                  "createdAt",
                ],
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
                          user_role_id: "farmer" || "coffee_farmer",
                        },
                      },
                    ],
                  },
                ],
                where: {
                  id: f.farmer.id,
                  organization,
                },
              },
            ],
            attributes: ["cacao_weight", "purchasedAt"],
            where: {
              farmerId: f.farmer.id,
              purchasedAt: {
                [db.Sequelize.Op.between]: [startDate, endDate],
              },
            },
            distinct: true,
            group: ["farmerId"],
          });
          if (buyingStationData.length > 0) {
            buyingStationbyFarmers.push(buyingStationData);
          } else {
            buyingStationbyFarmers.push([f]);
          }
        }

        let chartReadyData = [];
        for (const singleData of buyingStationbyFarmers) {
          let local = {};
          let selectedData = [];
          let sum = 0;
          for (const bsf of singleData) {
            if ("cacao_weight" in bsf.dataValues) {
              let tempStartDate = moment.utc(startDate, "YYYY-MM-DD");
              let purchasedDate = moment.utc(bsf.purchasedAt, "MM/DD/YYYY");
              while (tempStartDate <= endDate) {
                let endOfYear = moment(tempStartDate)
                  .endOf("year")
                  .format("YYYY-MM-DD");
                if (purchasedDate.isSame(tempStartDate, "day")) {
                  sum += parseInt(bsf.cacao_weight);
                } else {
                  sum += 0;
                }
                if (tempStartDate.format("YYYY-MM-DD") === endOfYear) {
                  selectedData.push(sum);
                  sum = 0;
                }
                tempStartDate.add(1, "days");
              }
              local.farmer = bsf.farmer;
              local.selectedData = selectedData;
              chartReadyData.push(local);
            } else {
              local.farmer = bsf.farmer;
              const totalNoDays = endDate.diff(startDate, "year") + 1;
              local.selectedData = Array(totalNoDays)
                .fill()
                .map((x, i) => 0);
              chartReadyData.push(local);
            }
          }
        }
        return res.json(
          successRespSync({
            msg: success.FETCH,
            data: {
              selectedRange: { startDate, endDate },
              totalRows: totalFarmers.length,
              numRows: chartReadyData?.length,
              rows: chartReadyData,
            },
          })
        );
      }

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

router.get("/purchase-order/list", auth, async function (req, res) {
  try {
    console.log(
      "I am hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    const { organization } = req.user;
    let { page = 1, limit = 10, order, search } = req.query;
    limit = parseInt(limit);

    let where;
    if (!_.isEmpty(search)) {
      const fields = ["firstName", "lastName"];
      const searchQuery = fields.map((col) => {
        return {
          [col]: {
            [db.Sequelize.Op.substring]: search,
          },
        };
      });
      where = { [db.Sequelize.Op.or]: searchQuery };
    }
    const data = await db.CacaoPurchaseOrder.findAndCountAll({
      include: [
        {
          model: db.user,
          as: "farmer",
          attributes: ["fullName", "firstName", "lastName", "address"],
          where: { ...where, organization },
        },
        {
          model: db.user,
          as: "buyingStation",
          attributes: ["fullName", "firstName", "lastName", "address"],
          where: { organization },
        },
      ],
      offset: (page - 1) * limit,
      limit: limit,
      order: [["createdAt", order]],
      distinct: true,
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          count: data.count,
          numRows: data.rows?.length || 0,
          rows: data.rows,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get(
  "/purchase-order/list/:id/:type",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization } = req.user;
      let { id, type } = req.params;
      let { startDate, endDate } = req.query;

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
        attributes: ["id", "firstName", "lastName", "address", "fullName"],
        where: whereUser,
      });

      let data = await db.CacaoPurchaseOrder.findAll({
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
                db.Sequelize.col("farmer.lastName"),
                ""
              )
            ),
            "farmerName",
          ],
          "cacao_weight",
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
            report: "Purchase Order",
          },
          tableData: data,
        };
        const pdfData = await generatePDF(_data);
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

const generateExcelReport = async (csvOrXlsx, response) => {
  try {
    const workbook = XLSX.utils.book_new();

    const directoryPath = "files";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const worksheet = XLSX.utils.json_to_sheet(response);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fermentation Report");
    console.log(__dirname);
    const filePath = path.resolve(
      __dirname,
      `../../../../files/cacao-fermentation-report.xlsx`
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
        `../../../../files/cacao-fermentation-report.csv`
      );

      fs.writeFileSync(csvFilePath, csvData, "utf-8");
      return csvFilePath;
    }

    return;
  } catch (err) {
    console.log("Error processing request: " + err);
  }
};


router.get('/cacao-fermentation-process', auth, async (req, res) => {
  const {searchPhrase} = req.query;
  let where = {} ;

  // for searching
  if (!_.isEmpty(searchPhrase)) {
    const fields = ["fermentationCode"];
    const searchQuery = fields.map((col) => {
      return {
        [col]: {
          [db.Sequelize.Op.substring]: searchPhrase,
        },
      };
    });
    where = { ...where, [db.Sequelize.Op.or]: searchQuery };
  }
  try {
        let response = await db.CacaoFermentationProcess.findAndCountAll({
          where:  where,
              include: [
                {
                  required:true,
                  model: db.CacaoPurchaseOrder,
                  as: "cacaoPurchaseOrder",
                  through: "CacaoFermentationAndPurchaseOrder",
                  include: [
                    {
                      required:true,
                      model: db.user,
                      where:{
                        organization:req.user.organization
                      },
                      as: "buyingStation",
                      attributes: [
                        "address",
                        "firstName",
                        "lastName",
                        "middleName",
                        "fullName",
                        "profilePicUrl",
                        "country"
                      ],
                    },
                    {
                      model: db.user,
                      as: "farmer",
                      attributes: [
                        "address",
                        "firstName",
                        "middleName",
                        "lastName",
                        "fullName",
                        "profilePicUrl",
                      ],
                    },
                    {
                      model: db.CacaoPlantations,
                      as: "cacaoPlantations",
                      include: [
                        {
                          model: db.user_farm,
                          as: "userFarms",
                          through: "PlantationsUserFarmsMap",
                          attributes: ["id", "farmType", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
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
                              attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl","country"],
                            }
                          ]
                        },
                      ],
                    },
                    {
                      model: db.user_farm,
                      as: "userFarms",
                      attributes: ["id", "farmType", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
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
                          model: db.FarmTraceability,
                          attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                          as: "farmTraceability"
                        },
                        {
                          model: db.user,
                          as: "user",
                          attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl","country"],
                        }
                      ]
                    },
                  ],
                },
              ],
            });

          const a  = JSON.parse(JSON.stringify(response))  
          const nwResponse = []
          a.rows.forEach(x=> {
            const purchaOrder = x.cacaoPurchaseOrder.filter(y => {
              return (y.cacaoPlantations && y.cacaoPlantations.userFarms.length)  || y.userFarms 
            })
            x.cacaoPurchaseOrder = purchaOrder
            nwResponse.push(x)
          })
          
          const result = nwResponse.filter(x => {
             return x.cacaoPurchaseOrder.length
          })

          return res.json(
            successRespSync({
                msg: success.FETCH,
                data: {
                  count:result.length,
                  response:result,
                },
            })
          );
    }catch(err){
      logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
  })


module.exports = router;
