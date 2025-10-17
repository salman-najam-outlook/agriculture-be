'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('surveys_list', 'status', {
      type: Sequelize.ENUM('Active', 'Inactive', 'Completed'),
      allowNull: false,
      defaultValue: 'Inactive'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('surveys_list', 'status');
  }
};
