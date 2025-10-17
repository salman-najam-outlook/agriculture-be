'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_weed_farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userFarmId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'user_farms', key: 'id' },
        onDelete: 'CASCADE'
      },
      weedId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'weed', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('map_weed_farms');
  }
};
