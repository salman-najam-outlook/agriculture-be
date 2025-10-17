"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CropObservationCost extends Model {
    static associate(models) {
      this.belongsTo(models.CropObservation, {
        as: "cropObservation",
        foreignKey: "observationId",
      });
      this.belongsTo(models.Currency, {
        as: "currency",
        foreignKey: "currencyId",
      });
    }
  }

  CropObservationCost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      observationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'CropObservation',
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
      tableName: "crop_observation_cost",
      modelName: "CropObservationCost",
    }
  );

  return CropObservationCost;
};
