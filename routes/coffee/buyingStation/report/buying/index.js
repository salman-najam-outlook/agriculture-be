const express = require("express");
const fs = require("fs");
const router = express.Router();
const moment = require("moment");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { serverError, errorRespSync } = require(rootPath + "/helpers/api");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");
const _ = require("lodash");

/**
 * @swagger
 * /coffee/buying-station/report/buying/pdf:
 *   get:
 *     description: download buying report pdf
 *     tags: [Coffee Buying Station Reports]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *        example:
 *          10
 *      - in: query
 *        name: col
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: order
 *        schema:
 *          type: string
 *          enum: ['desc','asc']
 *      - in: query
 *        name: farmer
 *        description: seperate farmer id with forward slash(/)
 *        example: 265/1
 *        schema:
 *          type: string
 *      - in: query
 *        name: dateRange
 *        description: seperate date by hyphen(-) for sending from and to date respectively
 *        example: 01/01/2012-12/31/2022
 *        schema:
 *          type: string
 *      - in: query
 *        name: search
 *        description: search data from the list
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         content:
 *           application/octet-stream:
 */
router.get(
  "/pdf",
  auth,
  // BuyStationOrderValidator(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      const userId = req.user.id;

      let {
        page = 1,
        limit = 10000,
        col = "id",
        order = "desc",
        dateRange,
        farmer,
        search,
      } = req.query;
      limit = parseInt(limit);

      let where = { buyingStationId };
      if (!_.isEmpty(dateRange)) {
        dateRange = dateRange
          .split("-")
          ?.map((date) =>
            moment
              .utc(date, process.env.ACCEPT_DATE_FORMAT)
              .format(process.env.DB_ONLYDATE_FORMAT)
          );
        where.purchasedAt = { [db.Sequelize.Op.between]: dateRange };
      }
      if (!_.isEmpty(farmer)) {
        farmer = farmer.split("/");
        where.farmerId = farmer;
      }
      if (!_.isEmpty(search)) {
        const fields = [
          "perKgPrice",
          "grandTotal",
          "$farmer.firstName$",
          "coffeeCherryQty",
          "orderCode",
          "coffeeCherryQlty",
        ];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }

      const query = {
        where,
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, order]],
        distinct: true,
      };

      let [{ count: totalRows, rows }, total, user] = await Promise.all([
        db.BuyingStationOrder.findAndCountAll({
          include: [
            {
              model: db.user,
              as: "farmer",
              attributes: ["firstName","middleName", "lastName"],
            },
          ],
          attributes: { exclude: ["updatedAt", "isdeleted"] },
          ...query,
        }),

        db.BuyingStationOrder.findAll({
          attributes: [
            [
              db.Sequelize.fn("sum", db.Sequelize.col("grandTotal")),
              "total_amount",
            ],
            [
              db.Sequelize.fn("sum", db.Sequelize.col("coffeeCherryQty")),
              "total_weight",
            ],
          ],
          raw: true,
          ...query,
        }),

        db.user.findOne({
          attributes: ["firstName","middleName", "lastName", "organization"],
          where: {
            id: buyingStationId,
          },
        }),
      ]);

      const currencySetting = await db.UserCurrencySettings.findOne({
        where: { userId: userId },
        include: [{ model: db.Currency, as: "currency" }],
      });

      const globalCurrency = await db.GlobalSetting.findOne({
        attributes: ["currencyId"],
        where: {
          org_id: user.organization,
        },
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      });

      let currency = currencySetting
        ? currencySetting?.currency?.dataValues?.symbol
        : globalCurrency
        ? globalCurrency?.currency?.dataValues?.symbol
        : "$";

      rows = await Promise.all(
        rows?.map(async (order) => {
          order = await order.toJSON();
          let {
            grandTotal: price,
            farmer,
            coffeeCherryQty: weight,
            purchasedAt: date,
            orderCode: purchase_ID,
          } = order;

          const farmer_name = _.isEmpty(farmer.firstName) 
            ? "---" 
            : [farmer.firstName, farmer.middleName, farmer.lastName].filter(Boolean).join(" ");

          weight = _.isEmpty(weight?.toString()) ? "-" : weight + " Kg";
          price = _.isEmpty(price?.toString()) ? "-" : `${currency} ` + price;
          return { date, farmer_name, weight, purchase_ID, price };
        })
      );

      if (_.isEmpty(rows)) {
        return res.json(
          errorRespSync({
            msg: "PDF report generation failed.",
          })
        );
      }

      const data = {
        title: "Buying Station Report",
        subHeader: {
          user_name: _.isEmpty(user.firstName)
            ? "---"
            : [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" "),

          date_of_entry: moment().format(process.env.ACCEPT_DATE_FORMAT),
        },
        total: {
          weight: _.isEmpty(total[0].total_weight?.toString())
            ? "-"
            : total[0].total_weight + " Kg",
          price: _.isEmpty(total[0].total_amount?.toString())
            ? "-"
            : `${currency} ` + total[0].total_amount,
        },
        tableData: rows,
      };

      const pdfData = await generatePDF(data, req);
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
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
