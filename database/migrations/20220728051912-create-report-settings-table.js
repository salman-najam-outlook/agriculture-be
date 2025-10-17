'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */
     await queryInterface.createTable('report_settings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      reportDataType: {
        type: Sequelize.ENUM,
        values: ['cellular data', "wifi data", "both"],
      },
      cropReports: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cropReportTypeIds: {
        type: Sequelize.STRING,
        allowNull: true
      },
      weatherReport: {
        type: Sequelize.STRING,
        allowNull: true
      },
      satelliteReport: {
        type: Sequelize.STRING,
        allowNull: true
      },
      scheduleReportDownload: {
        type: Sequelize.ENUM,
        values: ['automatically', "daily", "weekly", "biweekly", "monthly", "custom"],
      },
      specificNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      specificNumberUnits: {
        type: Sequelize.STRING,
        allowNull: true
      },
      startingDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      specificDaysInWeek: {
        type: Sequelize.STRING,
        allowNull: true
      },
      specificDaysReportInterval:{
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        )
      },
      

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
     await queryInterface.dropTable('report_settings')
  }
};
