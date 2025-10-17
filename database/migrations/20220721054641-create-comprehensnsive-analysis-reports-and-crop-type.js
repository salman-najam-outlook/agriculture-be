'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ComprehensnsiveAnalysisReportsAndCropTypes',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        comprehensnsiveAnalysisReportsId: {
          type: Sequelize.INTEGER,
          references: { model: 'comprehensnsive_analysis_reports', key: 'id' },
        },
        cropTypeId: {
          type: Sequelize.INTEGER,
          references: { model: 'options', key: 'id' },
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(
      'ComprehensnsiveAnalysisReportsAndCropTypes'
    );
  },
};
