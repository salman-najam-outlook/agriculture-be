'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_farm_bulk_upload_records', {
      id: {
        type: Sequelize.BIGINT({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userFarmBulkUploadId: {
        type: Sequelize.BIGINT({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'user_farm_bulk_uploads',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      errorMessage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payloadJsonData: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      recordedJsonData: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_farm_bulk_upload_records');
  },
};
