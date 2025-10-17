'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('harvest', 'cropVariety');
    await queryInterface.removeColumn('harvest', 'cropType');
    await queryInterface.addColumn('harvest', 'cropType', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'options',
        key: 'id',
      },
      onDelete: 'CASCADE'
    });
    await queryInterface.removeColumn('harvest', 'resonForLoss');
    await queryInterface.addColumn('harvest', 'resonForLoss', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'harvest_reason_for_losses',
        key: 'id',
      },
      onDelete: 'CASCADE'
    });
    await queryInterface.removeColumn('harvest', 'manualHarvesting');
    await queryInterface.addColumn('harvest', 'manualHarvesting', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'harvestMethodTypes',
        key: 'id',
      },
       onDelete: 'CASCADE'
    });
    await queryInterface.removeColumn('harvest', 'mechanicalHarvesting');
    await queryInterface.addColumn('harvest', 'mechanicalHarvesting', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'harvestMethodTypes',
        key: 'id',
      },
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
