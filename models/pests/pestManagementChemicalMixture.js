"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PestManagementChemicalMixture extends Model {
    static associate(models) {
      this.belongsTo(models.PestManagementChemicalPesticidesType, {
        as: "pestManagementChemicalType",
        foreignKey: "pestManagementChemicalTypeId",
      });
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

  PestManagementChemicalMixture.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pestManagementChemicalTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
      quantityUnitId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "pest_management_chemical_mixture",
      modelName: "PestManagementChemicalMixture",
    }
  );

  return PestManagementChemicalMixture;
};
