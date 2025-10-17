'use strict';
const moment = require("moment");
const { departments } = require("../../helpers/consts");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const departmentsData = [];
    departments.forEach((item) =>
    departmentsData.push({
        id: item.id,
        name: item.name,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    await queryInterface.bulkInsert("departments", departmentsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("departments", null, {
      truncate: true,
      cascade: false,
    });
  }
};
