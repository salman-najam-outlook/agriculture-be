'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropModulesReport extends Model {
    static associate(models) {
      // define association here
    }
  }
  CropModulesReport.init(
    {
      cropType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      cropVariety: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
      organization: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'organization',
          key: 'id',
        },
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      module: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CropModulesReport',
      tableName: 'crop_modules_report',
    },
  );
  return CropModulesReport;
};
