'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('weather_analysis_reports', 'bbox_coordinates', {
      type: Sequelize.JSON,
      allowNull: true,
      after: "issuedDate"
    });
    await queryInterface.addColumn('weather_analysis_reports', 'overall_score', {
      type: Sequelize.DECIMAL,
      allowNull: true,
      after: "bbox_coordinates"
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('weather_analysis_reports', 'bbox_coordinates');
    await queryInterface.removeColumn('weather_analysis_reports', 'overall_score');
  }
};
