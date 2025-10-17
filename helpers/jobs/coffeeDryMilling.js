"use strict";

const { CreateUserNotification } = require(rootPath +
  "/helpers/systemNotifications");
const { Op } = require("sequelize");
const moment = require("moment");
const db = require(rootPath + "/models");
const Sequelize = require("sequelize");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

module.exports.DryMillingLowStockAlert = async () => {
  try {
    let notifications = [];

    const lowStockData = await db.dry_milling_low_stock.findAll({
      attributes: ["userId", "parchmentBarcode", "quantity"],
      where: {
        isdeleted: 0,
      },
    });

    const yearToFindLowStock = moment().format("YYYY");

    // productions.forEach( (production) => {
    for (data of lowStockData) {
      const parchment_Bar_Code = data.parchmentBarcode;
      const lowStockLimit = data.quantity;

      const outboundStock = await db.DryMillingOutboundWarehouse.findOne({
        attributes: ["quantity,userId"],
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("createdAt")),
              yearToFindLowStock
            ),
          ],
          parchmentBarcode: parchment_Bar_Code,
          isdeleted: null,
        },
        raw: true,
      });

      const inboundStock = await db.DryMillingInboundWarehouse.findOne({
        attributes: ["quantity,userId"],
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("createdAt")),
              yearToFindLowStock
            ),
          ],
          parchmentBarcode: parchment_Bar_Code,
          isdeleted: null,
        },
        raw: true,
      });

      const remainingStock = inboundStock.quantity - outboundStock.quantity;

      if (remainingStock < lowStockLimit) {
        notifications.push(
          CreateUserNotification(
            data.userId,
            JSON.stringify({
              title: "Low Stock Alert",
              // body: 'Your sales report for last month is now ready to download.',
              body: `Warehouse has only ${remainingStock} KG left in the stock`,
              type: "drymilling_low_stock_warning",
              date: date.toUTCString(),
            })
          )
        );
      }
    }

    await Promise.all(notifications);

    await Promise.all(notifications);
  } catch (err) {
    console.log(err);
    logErrorOccurred(__filename, err);
  }
};

// at the end of each month
module.exports.MonthlyWareHouseReportReadyNotification = async () => {
  try {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dryMillingWarehouseData = await db.DryMillingInboundWarehouse.findAll(
      {
        attributes: [
          db.sequelize.fn("DISTINCT", db.sequelize.col("userId")),
          "userId",
        ],
        where: {
          isdeleted: {
            [Op.eq]: null,
          },
        },
      }
    );

    let dryMillingNotifications = [];
    let date = new Date();
    date.setDate(date.getDate() - 1);

    dryMillingWarehouseData.forEach((data) => {
      dryMillingNotifications.push(
        CreateUserNotification(
          data.userId,
          JSON.stringify({
            title: "Monthly Warehouse Report",
            // body: 'Your sales report for last month is now ready to download.',
            body: `You can download warehouse report for the month of  ${
              monthNames[date.getMonth() - 1]
            }`,
            type: "drymilling_warehouse_report",
            date: date.toUTCString(),
          })
        )
      );
    });
    await Promise.all(dryMillingNotifications);
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log(err);
  }
};

module.exports.ProductionTargetAlertNotifications = async () => {
  let notifications = [];

  //GET buying stations id

  try {
    const productions = await db.dryMilling_perYear_target.findAll({
      attributes: [
        db.sequelize.fn("DISTINCT", db.sequelize.col("userId")),
        "userId",
      ],
      where: {
        isdeleted: null,
      },
    });

    const yearToFindTarget = moment().format("YYYY");

    // productions.forEach( (production) => {
    for (production of productions) {
      const userId = production.userId;

      const output = await db.DryMillingOutboundWarehouse.findAll({
        attributes: ["quantity"],
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("createdAt")),
              yearToFindTarget
            ),
          ],
          userId: userId,
          isdeleted: null,
        },
        raw: true,
      });

      const targetData = await db.dryMilling_perYear_target.findAll({
        attributes: ["quantity", "outboundUnitValue"],
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("createdAt")),
              yearToFindTarget
            ),
          ],
          userId: userId,
        },
        raw: true,
      });

      if (output) {
        output.forEach((element) => {
          console.log(element);
          targetedValue += output[0].quantity;
        });
      }

      const outbound = targetData.outboundUnitValue;
      let date = new Date();

      if (targetedValue < outbound) {
        notifications.push(
          CreateUserNotification(
            stationId,
            JSON.stringify({
              title: "Production Target Alert",
              // body: 'Production is less than target value for this year target.',
              body: "You are lagging behind the production target View production report ",
              type: "production_target_alert",
              date: date.toUTCString(),
            })
          )
        );
      }

      if (targetedValue > outbound) {
        notifications.push(
          CreateUserNotification(
            stationId,
            JSON.stringify({
              title: "Production Target Alert",
              // body: 'Production is less than target value for this year target.',
              body: "Congratulations !! Your production is higher than the target ",
              type: "production_target_alert",
              date: date.toUTCString(),
            })
          )
        );
      }
    }

    await Promise.all(notifications);
  } catch (err) {
    console.log(err);
    logErrorOccurred(__filename, err);
  }
};
