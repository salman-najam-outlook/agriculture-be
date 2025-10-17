'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoalSeason extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.UserCropGoal, {
        foreignKey: 'seasonId',
        as: 'cropGoals',
      });
      this.belongsToMany(models.Option, {
        through: models.UserCropGoalTypeMap,
        foreignKey: 'userCropGoalSeasonId',
        otherKey: 'cropGoalTypeId',
        as: 'cropGoalType',
      });
      this.belongsToMany(models.Crop, {
        through: models.UserCropGoalCropVarietyMap,
        foreignKey: 'userCropGoalSeasonId',
        otherKey: 'cropVarietyId',
        as: 'cropVarieties',
      });
      this.hasOne(models.UserCropGoalOutcome, {
        foreignKey: 'userCropGoalSeasonId',
        as: 'outcome',
      });
      this.hasOne(models.UserCropGoalFarm, {
        foreignKey: 'seasonId',
        as: 'farm',
      });
      this.belongsToMany(models.UserCropGoalSeason, {
        through: models.UserCropGoalSeasonHistoryMap,
        foreignKey: 'parentSeasonId',
        otherKey: 'seasonId',
        as: 'prevCropHistory',
      });
    }
  }
  UserCropGoalSeason.init(
    {
      recordId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      seasonName: DataTypes.STRING,
      seasonStartDate: DataTypes.DATE,
      seasonEndDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserCropGoalSeason',
      tableName: 'user_crop_goal_seasons',
    }
  );
  return UserCropGoalSeason;
};
