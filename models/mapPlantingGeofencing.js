"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MapPlantingGeofencing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapPlantingGeofencing.init(
    {
      plantingId: DataTypes.INTEGER,
      geoFenceId: DataTypes.INTEGER
    },
    {
      sequelize,
      paranoid:true,
      deletedAt: 'deletedAt',
      tableName: "map_planting_geofencing",
      modelName: "MapPlantingGeofencing",
    }
  );
  return MapPlantingGeofencing;
};
