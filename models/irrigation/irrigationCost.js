"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class IrrigationCost extends Model {
    static associate(models) {
      this.belongsTo(models.Irrigation, {
        as: "irrigation",
        foreignKey: "irrigationId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  IrrigationCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      irrigationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'irrigation',
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
      tableName: "irrigation_costs",
      modelName: "IrrigationCost",
    }
  );

  return IrrigationCost;
};
