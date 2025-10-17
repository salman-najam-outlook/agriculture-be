'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoalSeasonHistoryMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCropGoalSeasonHistoryMap.init(
    {
      seasonId: DataTypes.INTEGER,
      parentSeasonId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserCropGoalSeasonHistoryMap',
      tableName: 'user_crop_goal_season_history_maps',
    }
  );
  return UserCropGoalSeasonHistoryMap;
};
