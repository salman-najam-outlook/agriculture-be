'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_storage_variety', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'crop_storage',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      cropVariety: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'crops',
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
    await queryInterface.dropTable('crop_storage_variety');
  },
};
