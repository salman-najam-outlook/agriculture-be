'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReportSettings', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
      },
      enableOfflineReport: {
        type: Sequelize.BOOLEAN,
      },
      downloadingPreference: {
        type: Sequelize.ENUM('cellular data', 'with data', 'both', 'wifi data'),
      },
      scheduleType: {
        type: Sequelize.ENUM(
          'when automatically connected',
          'daily',
          'weekly',
          'bi-weekly',
          'monthly',
          'custom'
        ),
      },
      custom: {
        type: Sequelize.ENUM(
          'specific days in a week',
          'after a specific number of days',
          'after a specific number of weeks',
          'after a specific number of months'
        ),
      },
      customWeeks: {
        type: Sequelize.JSON,
        comment:
          "values can be 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'. must be an array",
      },
      customInterval: {
        type: Sequelize.ENUM(
          'weekly',
          'once every 2 weeks',
          'once every 3 weeks',
          'once every 1 month',
          'once every 2 months',
          'once every 3 months',
          'once every 6 months'
        ),
      },
      customPeriodQty: {
        type: Sequelize.INTEGER,
      },
      customPeriodUom: {
        type: Sequelize.ENUM('days', 'weeks', 'months'),
      },
      customStartDate: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('ReportSettings');
  },
};
