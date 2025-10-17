"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SoilInformationCost extends Model {
    static associate(models) {
      this.belongsTo(models.SoilInformation, {
        foreignKey: "soilInformationId",
        as: "soilInformation",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  SoilInformationCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      soilInformationId: {
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
      tableName: "soil_information_cost",
      modelName: "SoilInformationCost",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return SoilInformationCost;
};
