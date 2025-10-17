"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PdfReports extends Model {
    static associate(models) {
      // define association here
    }
  }
  PdfReports.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      storageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserStorageSettings',
          key: 'id',
        },
      },
      saveCropReport: DataTypes.BOOLEAN,
      saveSateliteReport: DataTypes.BOOLEAN,
      saveWeatherReport: DataTypes.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'PdfReports',
      tableName: 'pdf_reports',
    }
  );
  return PdfReports;
};
