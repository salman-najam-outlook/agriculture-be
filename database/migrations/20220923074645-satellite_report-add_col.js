'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('satellite_reports', 'language', {
      type: Sequelize.STRING(8),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('satellite_reports', 'language');
  },
};
