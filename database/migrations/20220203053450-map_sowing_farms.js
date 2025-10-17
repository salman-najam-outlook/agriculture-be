'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_sowing_farms', {
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
      sowingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'sowing', key: 'id' },
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
    await queryInterface.dropTable('map_sowing_farms');
  }
};
