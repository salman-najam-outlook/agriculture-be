'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'user_import',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        fileOriginalName: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        fileS3Name: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        fileSize: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(),
          values: ['pending', 'success', 'failed'],
          defaultValue: 'pending',
        },
        error: {
          type: Sequelize.JSON,
          allowNull: true,
        },
        isDeleted: {
          type: Sequelize.ENUM(),
          values: ['1', '0'],
          defaultValue: '0',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
          ),
        },
      },
      {
        uniqueKeys: {
          fileS3Name: {
            fields: ['fileS3Name'],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_import');
  },
};
