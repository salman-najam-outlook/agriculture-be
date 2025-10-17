"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementChemicalMixture extends Model {
    static associate(models) {
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
      this.belongsTo(models.UnitsList, {
        as: "quantityUnit",
        foreignKey: "quantityUnitId",
      });
    }
  }

  DiseaseManagementChemicalMixture.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      diseaseManagementChemicalTypeId:{
        allowNull:false,
        type: DataTypes.INTEGER
      },
      ingredientName: {
        type: DataTypes.STRING,
      },
      percentage: {
        type: DataTypes.FLOAT,
      },
      cost: {
        type: DataTypes.DOUBLE,
      },
      currencyId: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
      quantityUnitId: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      tableName: "disease_management_chemical_mixture",
      modelName: "DiseaseManagementChemicalMixture",
      paranoid: true,
      deletedAt: 'deletedAt'
    }
  );

  return DiseaseManagementChemicalMixture;
};