'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('harvesting_farm', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      farmId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_farms',
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('harvesting_farm');
  }
};
