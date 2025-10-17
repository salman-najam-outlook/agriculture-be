"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SowingCost extends Model {
    static associate(models) {
      this.belongsTo(models.Sowing, {
        as: "sowing",
        foreignKey: "sowingId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  SowingCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sowingId: {
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
      tableName: "sowing_costs",
      modelName: "SowingCost",
    }
  );

  return SowingCost;
};
