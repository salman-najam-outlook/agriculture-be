'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_storage_segment', {
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
      },
      segment: {
        type: Sequelize.INTEGER,
        references: {
          model: 'geofences',
          key: 'id',
        },
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
    await queryInterface.dropTable('crop_storage_segment');
  },
};
