'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSowingGeofences extends Model {
    static associate() {

    }
  }
  MapSowingGeofences.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      geofenceId: DataTypes.INTEGER,
      sowingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid:true,
      deletedAt: 'deletedAt',
      tableName: 'map_sowing_geofences',
      modelName: 'MapSowingGeofences',
    }
  );
  return MapSowingGeofences;
};
