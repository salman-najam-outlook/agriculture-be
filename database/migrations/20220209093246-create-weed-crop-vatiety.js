'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('weed_crop_vatieties', {
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
    await queryInterface.dropTable('weed_crop_vatieties');
  }
};