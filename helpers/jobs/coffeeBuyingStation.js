'use strict';

const { CreateUserNotification } = require(rootPath +
  "/helpers/systemNotifications");
const { Op } = require("sequelize");
const moment = require("moment");
const db = require(rootPath + "/models");
const Sequelize = require("sequelize");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

// run each day
module.exports.BuyingStationProcessingBatchRemainingDaysNotification = async () => {
    try {
      let date = new Date();
      date = moment(new Date())
        .utc(date, process.env.ACCEPT_DATE_FORMAT)
        .format(process.env.DB_ONLYDATE_FORMAT);
      const buyingStationProcessingBatches =
        await db.BuyingStationProcessingBatch.findAll({
          where: {
            startDate: { [db.Sequelize.Op.lte]: date },
            endDate: { [db.Sequelize.Op.gte]: date },
          },
        });

      let notifications = [];

      buyingStationProcessingBatches.forEach((processingBatch) => {
        // const diffTime = Math.abs(new Date(processingBatch.endDate) - new Date(processingBatch.startDate));
        // const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const diffTime = Math.abs(
          new Date(processingBatch.endDate) - new Date()
        );
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (remainingDays == 1) {
          notifications.push(
            CreateUserNotification(
              processingBatch.buyingStationId,
              JSON.stringify({
                title: "Processing Batch Alert",
                body: `${processingBatch.batchCode} will be ready tomorrow.`,
                type: "buying_station_processing_batch",
                id: processingBatch.id,
              })
            )
          );
        }
      });

      await Promise.all(notifications);
    } catch (err) {
      console.log(err);
      logErrorOccurred(__filename, err);
    }
  };

// at the end of each month
module.exports.BuyingReportReadyNotification = async () => {
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

    const buyingStationOrders = await db.BuyingStationOrder.findAll({
      attributes: [
        db.sequelize.fn("DISTINCT", db.sequelize.col("buyingStationId")),
        "buyingStationId",
      ],
      where: {
        isDeleted: {
          [Op.eq]: null,
        },
      },
    });

    let buyingStationNotifications = [];
    let date = new Date();
    date.setDate(date.getDate() - 1);

    buyingStationOrders.forEach((buyingStationOrder) => {
      buyingStationNotifications.push(
        CreateUserNotification(
          buyingStationOrder.buyingStationId,
          JSON.stringify({
            title: "Sales Report Ready",
            // body: 'Your sales report for last month is now ready to download.',
            body: `You can download buying report for the month of  ${
              monthNames[date.getMonth() - 1]
            }`,
            type: "buyingstation_sales_report",
            date: date.toUTCString(),
          })
        )
      );
    });

    await Promise.all(buyingStationNotifications);
  } catch (err) {
    console.log(err);
    logErrorOccurred(__filename, err);
  }
};

module.exports.ProductionTargetAlertNotification = async () => {

  let notifications = [];

  //GET buying stations id

 try {
  const productions = await db.BuyingStationProcessingBatch.findAll({
    attributes: [
      db.sequelize.fn("DISTINCT", db.sequelize.col("buyingStationId")),
      "buyingStationId",
    ],
    where: {
      isDeleted: null,
    },
  });

  const yearToFindTarget = moment().format("YYYY");

  // productions.forEach( (production) => {
 for (production of productions) {
   
  const stationId= production.buyingStationId;
   const parchmentData = await db.BuyingStationProcessingBatch.findAll({
      attributes: ["parchmentTarget", "parchmentOut"],
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("createdAt")),
            yearToFindTarget
          ),
        ],
        buyingStationId:stationId,
        isdeleted: null,
      },
      raw: true,
    });


      let parchmentOut=0
      let parchmentTarget=0;

    if (parchmentData) {
      parchmentData.forEach((element) => {
        console.log(element);
        parchmentOut += element.parchmentOut;
      });
    }


    if (parchmentData) {
      parchmentData.forEach((element) => {
        console.log(element);
        parchmentTarget += element.parchmentTarget;
      });
    }



    // const parchmentOut = parchmentData[0].parchmentOut;
    // const parchmentTarget = parchmentData[0].parchmentTarget;
    let date = new Date();

    if(parchmentOut < parchmentTarget){
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


    if(parchmentOut > parchmentTarget){
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
