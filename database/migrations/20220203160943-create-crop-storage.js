'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_storage', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      area: {
        type: Sequelize.DOUBLE,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      durationOfStorage: {
        type: Sequelize.DOUBLE,
      },
      yieldStored: {
        type: Sequelize.DOUBLE,
      },
      storageMethod: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_storage_method',
          key: 'id',
        },
      },
      storageType: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_storage_type',
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
    await queryInterface.dropTable('crop_storage');
  },
};
