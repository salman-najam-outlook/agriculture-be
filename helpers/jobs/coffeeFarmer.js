'use strict';

const { CreateUserNotification } = require(rootPath +
  "/helpers/systemNotifications");
const { Op } = require("sequelize");
const db = require(rootPath + "/models");
const Sequelize = require("sequelize");
const moment = require("moment");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

// at the end of each month
module.exports.SalesReportReadyNotification = async () => {
  try {
    const buyingStationOrders = await db.BuyingStationOrder.findAll({
      attributes: [
        db.sequelize.fn("DISTINCT", db.sequelize.col("farmerId")),
        "farmerId",
      ],
      where: {
        isDeleted: {
          [Op.eq]: null,
        },
      },
    });

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

    let farmerNotifications = [];
    let date = new Date();
    date.setDate(date.getDate() - 1);

    buyingStationOrders.forEach((buyingStationOrder) => {
      farmerNotifications.push(
        CreateUserNotification(
          buyingStationOrder.farmerId,
          JSON.stringify({
            title: "Sales Report Ready",
            // body: `Your sales report for last month is now ready to download.`,
            body: `You can download sales report for the month of  ${
              monthNames[date.getMonth() - 1]
            }`,
            type: "farmer_sales_report",
            date: date.toUTCString(),
          })
        )
      );
    });

    await Promise.all(farmerNotifications);
  } catch (err) {
    console.log(err);
    logErrorOccurred(__filename, err);
  }
};

module.exports.ProductionTargetAlertNotification = async () => {
  let targetedValue = 0;
  let finalScore = 0;
  let notifications = [];

  try {
    const plantations = await db.Plantations.findAll({
      attributes: [
        db.sequelize.fn("DISTINCT", db.sequelize.col("user_id")),
        "user_id",
      ],
      where: {
        is_deleted: 0,
      },
    });
    const yearToFindYield = moment().format("YYYY");
    const currentMonth = moment().format("MM");

    plantations.forEach(async (plantation) => {
      const expectedYield = await db.Plantations.findAll({
        attributes: ["expected_yield", "createdAt"],
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("createdAt")),
              yearToFindYield
            ),
          ],
          user_id: plantation.user_id,
          is_deleted: 0,
        },
        raw: true,
      });

      if (expectedYield) {
        expectedYield.forEach((element) => {
          console.log(element);
          targetedValue += element.expected_yield;
        });
      }

      ////

      const condtion = {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("purchasedAt")),
            yearToFindYield
          ),
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("purchasedAt")),
            currentMonth
          ),
        ],
      };

      const farmerSoldData = await db.BuyingStationOrder.findAll({
        attributes: ["coffeeCherryQty", "coffeeCherryQlty", "purchasedAt"],
        where: {
          ...condtion,
          farmerId: plantation.user_id,
          isdeleted: null,
        },
        raw: true,
      });

      if (farmerSoldData) {
        farmerSoldData.forEach((element) => {
          finalScore += element.coffeeCherryQty;
        });
      }

      let date = new Date();
      date.setDate(date.getDate());

      let finalMonthlyTargetedYield = targetedValue / 12;

      if (finalMonthlyTargetedYield > finalScore) {
        notifications.push(
          CreateUserNotification(
            plantation.user_id,
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
      if (finalMonthlyTargetedYield < finalScore) {
        notifications.push(
          CreateUserNotification(
            plantation.user_id,
            JSON.stringify({
              title: "Production Target Alert",
              body: "Congratulations! Your production is higher than the target value for this year. ",
              type: "production_target_alert",
              date: date.toUTCString(),
            })
          )
        );
      }
    });

    await Promise.all(notifications);
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log(err);
  }
};

module.exports.PlantationALert = async () => {
  try {
    const plantationOrders = await db.Plantations.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("user_id")), "user_id"],
        "status",
        "rejection_reason",
      ],
      where: {
        is_deleted: 0,
      },
    });

    let farmerNotifications = [];

    plantationOrders.forEach((plantation) => {
      if (plantation.status === "rejected") {
        //send rejected message
        farmerNotifications.push(
          CreateUserNotification(
            plantation.user_id,
            JSON.stringify({
              title: "Plantation Alert",
              body: plantation.rejection_reason,
              type: "rejected_alert",
            })
          )
        );
      }

      if (plantation.status === "approved") {
        //send success message
        farmerNotifications.push(
          CreateUserNotification(
            plantation.user_id,
            JSON.stringify({
              title: "Plantation Alert",
              body: "Plantation that you have submitted has been approved",
              type: "plantation_alert",
            })
          )
        );
      }
    });

    await Promise.all(farmerNotifications);
  } catch (err) {
    console.log(err);
    logErrorOccurred(__filename, err);
  }
};
