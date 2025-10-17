"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MapWeedingAndHerbicideInputs extends Model {
    static associate(models) {
      this.belongsTo(models.Weed, {
        as: "weeding",
        foreignKey: "weedId",
      });
      this.belongsTo(models.WeedingHerbicideInputs, {
        as: "input",
        foreignKey: "weedingHerbicideInputId",
      });
    }
  }

  MapWeedingAndHerbicideInputs.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      weedId: {
        type: DataTypes.INTEGER,
      },
      weedingHerbicideInputId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "map_weeding_and_herbicide_inputs",
      modelName: "MapWeedingAndHerbicideInputs",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return MapWeedingAndHerbicideInputs;
};
