"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HarvestCost extends Model {
    static associate(models) {
      this.belongsTo(models.Harvest, {
        as: "harvest",
        foreignKey: "harvestId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  HarvestCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      harvestId: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      tableName: "harvest_costs",
      modelName: "HarvestCost",
    }
  );

  return HarvestCost;
};
