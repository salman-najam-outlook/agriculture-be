'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_storage_farm', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cropStorage: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_storage',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      farm: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_farms',
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
    await queryInterface.dropTable('crop_storage_farm');
  },
};
