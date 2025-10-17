'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoalTypeMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCropGoalTypeMap.init(
    {
      // userId: DataTypes.INTEGER,
      // userCropGoalId: DataTypes.INTEGER,
      userCropGoalSeasonId: DataTypes.INTEGER,
      cropGoalTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserCropGoalTypeMap',
      tableName: 'user_crop_goal_type_maps',
    }
  );
  return UserCropGoalTypeMap;
};
