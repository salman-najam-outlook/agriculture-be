'use strict';
const moment = require("moment");
const cropVarities = require('../../helpers/crop_varities.js')
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
    const varities = [];
    cropVarities.forEach( item => {
      varities.push({
        cropTypeOptId: item.cropTypeOptId,
        name: item.name,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        userId: 17
      })
    })
    await queryInterface.bulkInsert("crops", varities, {});
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
