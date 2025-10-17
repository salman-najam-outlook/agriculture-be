'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Soil_prep_practice_geofences extends Model {
    static associate() {
    }
  }
  Soil_prep_practice_geofences.init(
    {
      geofenceId: DataTypes.INTEGER,
      soil_prep_practiceId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      paranoid:true,
      deletedAt:'deletedAt',
      tableName: 'soil_prep_practice_geofences',
      modelName: 'Soil_prep_practice_geofences'
    }
  );
  return Soil_prep_practice_geofences;
};
