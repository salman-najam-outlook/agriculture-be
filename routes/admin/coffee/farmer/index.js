const _ = require("lodash");
const express = require("express");
const { Op } = require("sequelize");
const { addOfflineFarmer } = require("../../../../common/addOfflineFarmer");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { successRespSync, errorRespSync, serverError } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const xlsx = require("xlsx");
const stream = require("stream");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const offlineFarmerPdf = require("../../../../helpers/offlineFarmerPdf");

// Add offline farmer for admin
router.post("/", auth, validationErrorHandler, async (req, res) => {
  await addOfflineFarmer(req, res);
});

router.get("/offline", auth, async (req, res) => {
  try {
    let { organization } = req.user;
    let { searchPhrase, page, limit } = req.query;
    let where = {
      userType: "offline",
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
    const include = [
      {
        model: db.Membership,
        as: "user_membership",
        required: true,
        through: {
          model: db.UserMembershipMap,
         
        },  include: [
          {
            model: db.UserRoleMembershipMap,
            as: "userRoleMembershipMap",
            where: {
              user_role_id: process.env.COFFEE_FARMER || "coffee_farmer"
            }
          }
        ]
      },
    ];
    let query = {
      attributes,
      include,
      where,
      order: [["createdAt", "DESC"]],
      include: [
        {
          attributes: [
            "buyingStationId",
            "orderCode",
            "createdAt",
            "coffeeCherryQty",
            "coffeeCherryQlty",
            "perKgPrice",
          ],
          model: db.BuyingStationOrder,
          as: "buyingStationOrder",
          include: [
            {
              model: db.user,
              as: "buyingStation",
              attributes,
            },
          ],
        },
      ],
    };
    if (page && limit) {
      page = parseInt(page);
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    const getUsers = await db.user.findAndCountAll({ ...query });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: getUsers,
      })
    );
  } catch (err) {
    return serverError(res, err);
  }
});

router.get("/download", auth, async (req, res) => {
  try {
    let { organization } = req.user;
    const { type } = req.query;
    let where = {
      userType: "offline",
      organization,
    };
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
          attributes: [
            "buyingStationId",
            "orderCode",
            "createdAt",
            "coffeeCherryQty",
            "perKgPrice",
          ],
          model: db.BuyingStationOrder,
          as: "buyingStationPurchaseOrders",
          include: [
            {
              model: db.user,
              as: "buyingStation",
              attributes,
            },
          ],
        },
      ],
    };
    const getUsers = await db.user.findAll({ ...query });
    const users = getUsers.map((u) => {
      return {
        name: u.fullName,
        address: u.address,
        buyingStation: u.buyingStationPurchaseOrders.length ? u.buyingStationPurchaseOrders : 'N/A',
        registrationDate: moment(u.createdAt).format("DD/MM/YYYY"),
        quantity: u.buyingStationPurchaseOrders.length ? u.buyingStationPurchaseOrders : 'N/A',
        pricePerKg: u.buyingStationPurchaseOrders.length ? u.buyingStationPurchaseOrders : 'N/A',
      }
    })
    const workbook = xlsx.utils.book_new();
    const offlineFarmerSheet = xlsx.utils.json_to_sheet(users);
    xlsx.utils.book_append_sheet(workbook, offlineFarmerSheet);
    var readStream = new stream.PassThrough();
    if (type === 'csv') {
      let csvBuffer = xlsx.write(workbook, { type: "buffer", bookType: "csv" });
      res.set(
        "Content-disposition",
        "attachment; filename=" + "offlineFarmer.csv"
      );
      res.set("Content-Type", "text/csv");
      readStream.end(csvBuffer);
      readStream.pipe(res);
      return;
    } else if (type === 'xlsx') {
      let csvBuffer = xlsx.write(workbook, { type: "buffer" });
      res.set(
        "Content-disposition",
        "attachment; filename=" + "offlineFarmer.xlsx"
      );
      res.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      readStream.end(csvBuffer);
      readStream.pipe(res);
      return;
    } else if (type === 'pdf') {
      let pdfData = await offlineFarmerPdf(users);
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
        await fs.createReadStream(pdfData.path).pipe(res);
        fs.unlink(
          path.resolve(rootPath + `/views/reports/${pdfData.fileName}`),
          (err) => {
            if (err) {
              console.log(err, "While deleting offline farmer pdf file");
              return;
            }
          }
        );
        return;
      }
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: getUsers,
      })
    );
  } catch (err) {
    return serverError(res, err);
  }
});

module.exports = router;
