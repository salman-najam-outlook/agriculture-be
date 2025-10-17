'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('weeddata_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weedTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'weed_type',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      weedId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'weed',
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
    await queryInterface.dropTable('weeddata_types');
  }
};