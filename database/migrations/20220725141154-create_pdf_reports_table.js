'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pdf_reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      storageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user_storage_settings',
          key: 'id',
        },
      },
      saveCropReport: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      saveSateliteReport: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      saveWeatherReport: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pdf_reports');
  }
};
