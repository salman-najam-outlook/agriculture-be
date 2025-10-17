'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('satellite_reports', 'inputImage', {
      type: Sequelize.TEXT, 
    });
    await queryInterface.changeColumn('satellite_reports', 'geoImagePath', {
      type: Sequelize.TEXT, 
    });
    await queryInterface.changeColumn('satellite_reports', 'shortImagePath', {
      type: Sequelize.TEXT, 
    });
    await queryInterface.changeColumn('satellite_reports', 'reportPDFPath', {
      type: Sequelize.TEXT, 
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
