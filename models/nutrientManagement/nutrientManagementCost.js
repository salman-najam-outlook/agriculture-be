"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NutrientManagementCost extends Model {
    static associate(models) {
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  NutrientManagementCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nutrientManagementId: {
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
      tableName: "nutrient_management_cost",
      modelName: "NutrientManagementCost",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return NutrientManagementCost;
};
