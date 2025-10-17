"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MapNutrientManagementAndFertilizerMixture extends Model {
    static associate(models) {
      this.belongsTo(models.NutrientManagementFertilizerInputs, {
        as: "nutrientManagementFertilizerInput",
        foreignKey: "nutrientManagementFertilizerInputId",
      });
      this.belongsTo(models.NutrientManagement, {
        as: "nutrientManagement",
        foreignKey: "nutrientManagementId",
      });
    }
  }

  MapNutrientManagementAndFertilizerMixture.init(
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
      nutrientManagementFertilizerInputId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "map_nutrient_management_and_fertilizer_mixture",
      modelName: "MapNutrientManagementAndFertilizerMixture",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return MapNutrientManagementAndFertilizerMixture;
};
