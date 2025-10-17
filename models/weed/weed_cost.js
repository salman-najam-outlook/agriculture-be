"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WeedCost extends Model {
    static associate(models) {
      this.belongsTo(models.Weed, {
        as: "weed",
        foreignKey: "weedId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  WeedCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      weedId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'weed',
          key: 'id',
        },
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
      tableName: "weed_costs",
      modelName: "WeedCost",
    }
  );

  return WeedCost;
};
