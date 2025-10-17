'use strict';
const moment = require('moment');
const { equipmentActivityData } = require("../../helpers/consts");
module.exports = {
  async up (queryInterface, Sequelize) {
    let equipmentActivitySeed=[];
    equipmentActivityData.forEach((item) =>
    equipmentActivitySeed.push({
        name: item.name,
        category:item.category,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    await queryInterface.bulkInsert("equipment_activity", equipmentActivitySeed, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("equipment_activity", null, {
      truncate: true,
      cascade: false,
    });
  }
};