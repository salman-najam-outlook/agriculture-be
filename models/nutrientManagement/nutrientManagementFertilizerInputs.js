"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NutrientManagementFertilizerInputs extends Model {
    static associate(models) {
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
      this.belongsTo(models.FertilizerInputType, {
        as: "fertilizerType",
        foreignKey: "fertilizerTypeId",
      });
      this.belongsTo(models.SoilApplicationMethod, {
        as: "applicationMethod",
        foreignKey: "applicationMethodId",
      });
      this.belongsTo(models.UnitsList, {
        as: "applicationRateUnit",
        foreignKey: "applicationRateUnitId",
      });
      this.hasMany(models.NutrientManagementFertilizerMixture, {
        foreignKey: "nutrientManagementFertilizerInputId",
        as: "mixtures",
      });
    }
  }

  NutrientManagementFertilizerInputs.init(
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
      userId: {
        type: DataTypes.INTEGER,
      },
      fertilizerName: {
        type: DataTypes.STRING,
      },
      fertilizerTypeId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      currencyId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      cost: {
        type: DataTypes.DOUBLE,
      },
      applicationRate: {
        type: DataTypes.DOUBLE,
      },
      applicationRateUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      applicationMethodId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "nutrient_management_fertilizer_inputs",
      modelName: "NutrientManagementFertilizerInputs",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return NutrientManagementFertilizerInputs;
};
