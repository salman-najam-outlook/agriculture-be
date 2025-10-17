'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //  await queryInterface.removeColumn('satellite_report_coordinates', 'satelliteReportId');
     await queryInterface.changeColumn('satellite_report_coordinates', 'satelliteReportId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'satellite_reports', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
