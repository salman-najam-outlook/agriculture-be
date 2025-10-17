"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementCost extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseManagement, {
        as: "diseaseManagement",
        foreignKey: "diseaseManagementId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  DiseaseManagementCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      diseaseManagementId: {
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
      tableName: "disease_managements_costs",
      modelName: "DiseaseManagementCost",
    }
  );

  return DiseaseManagementCost;
};
