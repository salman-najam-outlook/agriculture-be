"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NutrientManagementFertilizerMixture extends Model {
    static associate(models) {
      this.belongsTo(models.PestManagementChemicalPesticidesType, {
        as: "nutrientManagementFertilizerInput",
        foreignKey: "nutrientManagementFertilizerInputId",
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

  NutrientManagementFertilizerMixture.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nutrientManagementFertilizerInputId: {
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
      tableName: "nutrient_management_fertilizer_mixture",
      modelName: "NutrientManagementFertilizerMixture",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return NutrientManagementFertilizerMixture;
};
