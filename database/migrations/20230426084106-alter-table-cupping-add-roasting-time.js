'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cupping', 'roasting_time', {
      allowNull: true,
      type: Sequelize.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cupping', 'roasting_time')
  }
};
