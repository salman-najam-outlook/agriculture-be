'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_crop_reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      cropTypes: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: 'Array of crop type IDs used in the report',
      },
      reportType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'comprehensive',
        comment: 'Type of report generated (comprehensive, recommendation)',
      },
      reportData: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: 'The complete generated report data',
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'en',
        comment: 'Language used for the report',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // Add simple index for better performance
    await queryInterface.addIndex('user_crop_reports', ['userId']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_crop_reports');
  }
};
