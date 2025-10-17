"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PestManagementPestType extends Model {
    static associate(models) {
      this.belongsTo(models.PestManagement, {
        as: "pestManagement",
        foreignKey: "pestManagementId",
      });
      this.belongsTo(models.PestType, {
        as: "pest",
        foreignKey: "pestTypeId",
      });
    }
  }

  PestManagementPestType.init(
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
      pestTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "pest_management_pest_type",
      modelName: "PestManagementPestType",
    }
  );

  return PestManagementPestType;
};