'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSoilFertilityAuditGeofences extends Model {
    static associate() {

    }
  }
  MapSoilFertilityAuditGeofences.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      geofenceId: DataTypes.INTEGER,
      soilFertilityAuditId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid:true,
      deletedAt: 'deletedAt',
      tableName: 'map_soil_fertility_audit_geofences',
      modelName: 'MapSoilFertilityAuditGeofences',
    }
  );
  return MapSoilFertilityAuditGeofences;
};
