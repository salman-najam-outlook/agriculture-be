'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoalFarmMap extends Model {
    static associate(models) {

      this.belongsTo(models.UserCropGoal, {
        foreignKey: 'user_crop_goal_id',
        targetKey: 'id',
        as: 'cropGoalsMapFarm'
      });

      this.belongsTo(models.user_farm, {
        foreignKey: 'user_farm_id',
        targetKey: 'id',
        as: 'farmMapCropGoals'
      });

    }
  }
  UserCropGoalFarmMap.init(
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
      user_farm_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'UserFarm',
            key: 'id',
          },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserCropGoalFarmMap',
      tableName: 'user_crop_goal_farm_map',
    }
  );
  return UserCropGoalFarmMap;
};
