"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PestManagementCost extends Model {
    static associate(models) {
      this.belongsTo(models.PestManagement, {
        as: "pestManagement",
        foreignKey: "pestManagementId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  PestManagementCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pestManagementId: {
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
      tableName: "pest_managements_costs",
      modelName: "PestManagementCost",
    }
  );

  return PestManagementCost;
};
