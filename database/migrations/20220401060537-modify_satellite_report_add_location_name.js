'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('satellite_reports', 'reportName', {
      allowNull: true,
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('satellite_reports', 'locationName', {
      allowNull: true,
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('satellite_reports', 'segment', {
      allowNull: true,
      type: Sequelize.STRING
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
