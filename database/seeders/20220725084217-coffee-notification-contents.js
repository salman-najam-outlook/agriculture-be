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
        notificationId: 221,
        userId:437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 222,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 223,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 224,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 225,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 226,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 227,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 228,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 229,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 230,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        notificationId: 231,
        userId: 437,
        seen: '0',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
    ];


   try {
    await queryInterface.bulkInsert("user_notifications",notificationData);
    
   } catch (error) {
    console.log(error)
   }


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
