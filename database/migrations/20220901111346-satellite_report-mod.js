'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('satellite_reports', 'status', {
      type: Sequelize.ENUM(
        'FAILED',
        'PENDING',
        'IN-PROGRESS',
        'COMPLETED',
        'INVALID-LOCATION',
        'DATA-NOT-AVAILABLE',
        'DATA-DOWNLOAD-FAILED'
      ),
      defaultValue: 'PENDING',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('satellite_reports', 'status', {
      type: Sequelize.STRING(),
    });
  },
};
