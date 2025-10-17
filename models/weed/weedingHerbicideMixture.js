"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WeedingHerbicideMixture extends Model {
    static associate(models) {
      this.belongsTo(models.WeedingHerbicideInputs, {
        as: "weedingHerbicideInput",
        foreignKey: "weedingHerbicideInputId",
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

  WeedingHerbicideMixture.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      weedingHerbicideInputId: {
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
      tableName: "weeding_herbicide_mixture",
      modelName: "WeedingHerbicideMixture",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return WeedingHerbicideMixture;
};
