'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ReportSettingMap.scope('crop'), {
        sourceKey: 'userId',
        foreignKey: 'userId',
        as: 'cropReports',
      });
      this.belongsToMany(models.ComprehensnsiveAnalysisReport, {
        through: models.ReportSettingMap,
        otherKey: 'cropReportId',
        foreignKey: 'userId',
        as: 'reports',
      });
    }
  }
  ReportSetting.init(
    {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      enableOfflineReport: DataTypes.BOOLEAN,
      downloadingPreference: DataTypes.ENUM(
        'cellular data',
        'with data',
        'wifi data',
        'both'
      ),
      scheduleType: {
        type: DataTypes.ENUM(
          'when automatically connected',
          'daily',
          'weekly',
          'bi-weekly',
          'monthly',
          'custom'
        ),
      },
      custom: {
        type: DataTypes.ENUM(
          'specific days in a week',
          'after a specific number of days',
          'after a specific number of weeks',
          'after a specific number of months'
        ),
      },
      customWeeks: {
        type: DataTypes.JSON,
        comment:
          "values can be 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'. must be an array",
      },
      customInterval: {
        type: DataTypes.ENUM(
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
        type: DataTypes.INTEGER,
      },
      customPeriodUom: {
        type: DataTypes.ENUM('days', 'weeks', 'months'),
      },
      customStartDate: {
        type: DataTypes.DATEONLY,
      },
      recordId: {
        type: DataTypes.STRING,
      },
      isdeleted: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'ReportSetting',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return ReportSetting;
};
