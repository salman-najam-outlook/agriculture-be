'use strict';
const moment = require("moment");
const { limingMaterial } = require("../../helpers/consts");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const limingMaterialData = [];
     limingMaterial.forEach((item) =>
     limingMaterialData.push({
         name: item,
         createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
         updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
       })
     );
     await queryInterface.bulkInsert("liming_material", limingMaterialData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
