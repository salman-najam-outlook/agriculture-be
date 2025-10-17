'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoalCropVarietyMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCropGoalCropVarietyMap.init(
    {
      userCropGoalSeasonId: DataTypes.INTEGER,
      cropVarietyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserCropGoalCropVarietyMap',
      tableName: 'user_crop_goal_crop_variety_maps',
    }
  );
  return UserCropGoalCropVarietyMap;
};
