'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('satellite_reports', 'cropVariety', {
      allowNull: true,
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('satellite_reports', 'cropVarietyName', {
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
