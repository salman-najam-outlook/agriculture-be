'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapUserGoalGeofences extends Model {
    static associate() {
      // define association here
    }
  }
  MapUserGoalGeofences.init(
    {
      userGoalId: DataTypes.INTEGER,
      geoFenceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid:true,
      deletedAt: 'deletedAt',
      tableName: 'map_user_goal_geofences',
      modelName: 'MapUserGoalGeofences',
    }
  );
  return MapUserGoalGeofences;
};
