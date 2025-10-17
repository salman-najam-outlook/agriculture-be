'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportSettingMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReportSettingMap.init(
    {
      userId: DataTypes.INTEGER,
      reportType: DataTypes.ENUM('crop', 'weather', 'satellite'),
      cropReportId: DataTypes.INTEGER,
      recordId: {
        type: DataTypes.STRING,
      },
      isdeleted: {
        type: DataTypes.DATE,
      },
    },
    {
      scopes: {
        crop: {
          where: {
            reportType: 'crop',
          },
        },
      },
      sequelize,
      modelName: 'ReportSettingMap',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return ReportSettingMap;
};
