'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapWeedGeofences extends Model {
    static associate() {

    }
  }
  MapWeedGeofences.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      geofenceId: DataTypes.INTEGER,
      weedId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid:true,
      deletedAt: 'deletedAt',
      tableName: 'map_weed_geofences',
      modelName: 'MapWeedGeofences',
    }
  );
  return MapWeedGeofences;
};
