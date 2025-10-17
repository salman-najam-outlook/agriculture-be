"use strict";
const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const notificationData = [
      {
        id:221,
        notify: "user",
        type: "farmer_sales_report",
        message: "this is a test message",
        title:"Sales Report Ready",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:222,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:223,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        id:224,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:225,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:226,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:227,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:228,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:229,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:230,
        notify: "user",
        type: "low_stock_alert",
        message: "this is a test message",
        title:"Low Stock Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        id:231,
        notify: "user",
        type: "production_target_alert",
        message: "this is a test message",
        title:"Production Target Alert",
        userId:437,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      }
    ];

    await queryInterface.bulkInsert("notifications",notificationData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
