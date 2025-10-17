'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('harvest_varieties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      varietyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crops',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      harvestId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'harvest',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('harvest_varieties');
  }
};