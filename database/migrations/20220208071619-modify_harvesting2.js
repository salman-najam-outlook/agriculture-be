'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('harvest', 'dateHarvested');
    await queryInterface.addColumn('harvest', 'start_date_harvesting', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('harvest', 'end_date_harvesting', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    
    await queryInterface.removeColumn('harvest', 'totalPlannedYield');
    await queryInterface.addColumn('harvest', 'total_planned_fresh_yield', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('harvest', 'total_planned_dry_yield', {
      type: Sequelize.INTEGER,
      allowNull: false,
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
