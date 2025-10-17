'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoalOutcome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserCropGoalSeason, {
        sourceKey: 'userCropGoalSeasonId',
        foreignKey: 'id',
        as: 'cropGoalSeasonHistory',
      });
    }
  }
  UserCropGoalOutcome.init(
    {
      recordId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      parentSeasonId: DataTypes.INTEGER,
      userCropGoalSeasonId: DataTypes.INTEGER,
      yieldHarvested: DataTypes.FLOAT,
      yieldHarvestedUom: DataTypes.JSON,
      marketValue: DataTypes.FLOAT,
      marketValueUom: DataTypes.JSON,
      syntheticFertilizerUsed: DataTypes.FLOAT,
      syntheticFertilizerUsedUom: DataTypes.JSON,
      maximizingYieldNote: DataTypes.TEXT,
      maximizingIncomeNote: DataTypes.TEXT,
      syntheticFertilizerUsedNote: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'UserCropGoalOutcome',
      tableName: 'user_crop_goal_outcomes',
    }
  );
  return UserCropGoalOutcome;
};
