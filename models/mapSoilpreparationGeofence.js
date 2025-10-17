"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MapSoilpreparationGeofence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapSoilpreparationGeofence.init(
    {
      soilPreparationId: DataTypes.INTEGER,
      geoFenceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'deletedAt',
      tableName: "map_soilpreparation_geofence",
      modelName: "MapSoilpreparationGeofence",
    }
  );
  return MapSoilpreparationGeofence;
};
