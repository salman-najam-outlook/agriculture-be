'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'farm_limit', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 5
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'farm_limit');
  }
};
