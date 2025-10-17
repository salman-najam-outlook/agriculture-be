"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MapHarvestReasonForLoss extends Model {
    static associate(models) {
      this.belongsTo(models.Harvest, {
        as: "harvest",
        foreignKey: "harvestId",
      });
      this.belongsTo(models.harvest_reason_for_loss, {
        foreignKey: 'resonForLoss',
        as: 'harvest_reason_for_loss',
      });
    }
  }

  MapHarvestReasonForLoss.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      harvestId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      resonForLoss: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "map_harvest_reason_for_loss",
      modelName: "MapHarvestReasonForLoss",
    }
  );

  return MapHarvestReasonForLoss;
};
