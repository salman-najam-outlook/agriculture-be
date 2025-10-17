"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WeedingHerbicideInputs extends Model {
    static associate(models) {
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
      this.belongsTo(models.WeedMethod, {
        as: "applicationMethod",
        foreignKey: "applicationMethodId",
      });
      this.belongsTo(models.UnitsList, {
        as: "herbicideQuantityUnit",
        foreignKey: "herbicideQuantityUnitId",
      });
      this.belongsTo(models.UnitsList, {
        as: "herbicideRateUnit",
        foreignKey: "herbicideRateUnitId",
      });
      this.hasMany(models.WeedingHerbicideMixture, {
        foreignKey: "weedingHerbicideInputId",
        as: "mixtures",
      });
    }
  }

  WeedingHerbicideInputs.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      herbicideName: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.DOUBLE,
      },
      currencyId: {
        type: DataTypes.INTEGER,
      },
      herbicideQuantity: {
        type: DataTypes.INTEGER,
      },
      herbicideQuantityUnitId: {
        type: DataTypes.INTEGER,
      },
      herbicideActiveIngredient: {
        type: DataTypes.STRING,
      },
      herbicideRate: {
        type: DataTypes.DOUBLE,
      },
      herbicideRateUnitId: {
        type: DataTypes.INTEGER,
      },
      applicationMethodId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "weeding_herbicide_inputs",
      modelName: "WeedingHerbicideInputs",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return WeedingHerbicideInputs;
};
