"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SoilPrepPracticeCost extends Model {
    static associate(models) {
      this.belongsTo(models.Soil_prep_practice, {
        as: "soilPrepPractice",
        foreignKey: "soil_prep_practiceId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  SoilPrepPracticeCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      soil_prep_practiceId: {
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
      tableName: "soil_prep_practice_costs",
      modelName: "SoilPrepPracticeCost",
    }
  );

  return SoilPrepPracticeCost;
};
