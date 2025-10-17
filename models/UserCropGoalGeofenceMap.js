'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoalGeofenceMap extends Model {
    static associate(models) {

      this.belongsTo(models.UserCropGoal, {
        foreignKey: 'user_crop_goal_id',
        targetKey: 'id',
        as: 'cropGoalsMapGeofence'
      });

      this.belongsTo(models.Geofence, {
        foreignKey: 'geofence_id',
        targetKey: 'id',
        as: 'geofenceMapCropGoals'
      });

    }
  }
  UserCropGoalGeofenceMap.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_crop_goal_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'UserCropGoal',
          key: 'id',
        },
      },
      geofence_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Geofence',
            key: 'id',
          },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserCropGoalGeofenceMap',
      tableName: 'user_crop_goal_geofence_map',
    }
  );
  return UserCropGoalGeofenceMap;
};
