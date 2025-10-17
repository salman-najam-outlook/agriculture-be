"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MapSoilpreparationTillage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapSoilpreparationTillage.init(
    {
      soilPreparationId: DataTypes.INTEGER,
      tillageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "map_soilpreparation_tillage",
      modelName: "MapSoilpreparationTillage",
    }
  );
  return MapSoilpreparationTillage;
};
