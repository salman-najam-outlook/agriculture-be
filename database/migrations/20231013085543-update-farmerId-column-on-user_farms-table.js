'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_farms', 'farmerId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_farms', 'farmerId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
