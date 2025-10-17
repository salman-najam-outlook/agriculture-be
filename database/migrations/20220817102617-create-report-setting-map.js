'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReportSettingMaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'ReportSettings', key: 'userId' },
      },
      reportType: {
        type: Sequelize.ENUM('crop', 'weather', 'satellite'),
      },
      cropReportId: {
        type: Sequelize.INTEGER,
        comment: 'comprehensnsive_analysis_reports',
      },
      recordId: {
        type: Sequelize.STRING,
      },
      isdeleted: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('ReportSettingMaps');
  },
};
