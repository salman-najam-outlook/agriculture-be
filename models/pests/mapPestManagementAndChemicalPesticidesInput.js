"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MapPestManagementAndChemicalPesticides extends Model {
    static associate(models) {
      this.belongsTo(models.PestManagementChemicalPesticidesType, {
        as: "pestManagementChemicalPesticideInput",
        foreignKey: "pestManagementChemicalPesticideInputId",
      });
      this.belongsTo(models.PestManagement, {
        as: "pestManagement",
        foreignKey: "pestManagementId",
      });
    }
  }

  MapPestManagementAndChemicalPesticides.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pestManagementId: {
        type: DataTypes.INTEGER,
      },
      pestManagementChemicalPesticideInputId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "map_pest_management_and_chemical_pesticide",
      modelName: "MapPestManagementAndChemicalPesticides",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return MapPestManagementAndChemicalPesticides;
};
