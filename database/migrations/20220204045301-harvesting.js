'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('harvest', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      area: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      cropType: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      cropVariety: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      dateHarvested: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      daysHarvesting: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalFreshYield: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalDryYield: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPlannedYield: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      yieldForHouseholdConsumption: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      yieldForSale: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      methodForHarvesting: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'harvest_method',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      manualHarvesting: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      mechanicalHarvesting: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      yieldLosses: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      resonForLoss: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      cropResidueManagement: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('harvest');
  }
};
