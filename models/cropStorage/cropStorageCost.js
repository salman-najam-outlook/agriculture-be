"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CropStorageCost extends Model {
    static associate(models) {
      this.belongsTo(models.CropStorage, {
        as: "crop_storage",
        foreignKey: "cropStorage",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  CropStorageCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cropStorage: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_storage',
          key: 'id',
        },
      },
      currencyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalNumberOfWorkers: {
        type: DataTypes.INTEGER,
      },
      totalNumberOfHours: {
        type: DataTypes.DOUBLE,
      },
      totalCost: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      tableName: "crop_storage_costs",
      modelName: "CropStorageCost",
    }
  );

  return CropStorageCost;
};
