'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('satellite_reports', 'ingestionDate', {
      type: Sequelize.DATEONLY,
      comment: 'date when report generated successfull',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('satellite_reports', 'ingestionDate');
  },
};
