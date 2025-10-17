'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   this.belongsTo(models.User, {
    //     sourceKey: 'id',
    //     foreignKey: 'userId',
    //     as: 'user',
    //   });
    }
  }
  ReportSettings.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          reportDataType: {
            type: DataTypes.ENUM,
            values: ['cellular data', "wifi data", "both"],
          },
          cropReports: {
            type: DataTypes.STRING,
            allowNull: true
          },
          cropReportTypeIds: {
            type: DataTypes.STRING,
            allowNull: true
          },
          weatherReport: {
            type: DataTypes.STRING,
            allowNull: true
          },
          satelliteReport: {
            type: DataTypes.STRING,
            allowNull: true
          },
          scheduleReportDownload: {
            type: DataTypes.ENUM,
            values: ["automatically", "daily", "weekly", "biweekly", "monthly", "custom"],
    
          },
          specificNumber: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          specificNumberUnits: {
            type: DataTypes.STRING,
            allowNull: true
          },
          startingDate: {
            type: DataTypes.STRING,
            allowNull: true
          },
          specificDaysInWeek: {
            type: DataTypes.STRING,
            allowNull: true
          },
          specificDaysReportInterval:{
            type: DataTypes.STRING,
            allowNull: true
          }
    },
    {
      sequelize,
      modelName: 'ReportSettings',
      tableName: 'report_settings',
    }
  );
  return ReportSettings;
};
