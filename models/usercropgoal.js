'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserCropGoalSeason, {
        foreignKey: 'seasonId',
        as: 'cropGoalSeason',
      });
      // this.belongsTo(models.user_farm, {
      //   foreignKey: 'farmId',
      //   as: 'userFarm',
      // });
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });

      this.belongsToMany(models.user_farm, {
        through: models.UserCropGoalFarmMap,
        foreignKey: 'user_crop_goal_id',
        otherKey: 'user_farm_id'
      });

      this.belongsToMany(models.Geofence, {
        through: models.UserCropGoalGeofenceMap,
        foreignKey: 'user_crop_goal_id',
         otherKey: 'geofence_id'
      });

      // this.belongsTo(models.Geofence, {
      //   foreignKey: 'zoneId',
      //   as: 'zone',
      // });
      // this.belongsTo(models.Option, {
      //   foreignKey: 'cropTypeId',
      //   as: 'cropType',
      // });
      // this.belongsTo(models.Crop, {
      //   foreignKey: 'cropVarietyId',
      //   as: 'cropVariety',
      // });
      this.hasOne(models.UserCropGoalOutcome, {
        foreignKey: 'userCropGoalSeasonId',
        sourceKey: 'seasonId',
        as: 'cropGoal',
      });
      this.hasMany(models.UserCropGoalTypeMap, {
        foreignKey: 'userCropGoalSeasonId',
        sourceKey: 'seasonId',
        as: 'cropGoalType',
      });
    }
  }
  UserCropGoal.init(
    {
      // farmId: DataTypes.INTEGER,
      // zoneId: DataTypes.INTEGER,
      // farmSize: DataTypes.FLOAT,
      // farmSizeUom: DataTypes.JSON,
      seasonId: DataTypes.INTEGER,
      // cropTypeId: DataTypes.INTEGER,
      // cropVarietyId: DataTypes.INTEGER,
      recordId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      harvestedYieldTarget: DataTypes.FLOAT,
      harvestedYieldTargetUom: DataTypes.JSON,
      incomeTarget: DataTypes.FLOAT,
      incomeTargetUom: DataTypes.JSON,
      syntheticFertilizerUsageTarget: DataTypes.FLOAT,
      syntheticFertilizerUsageTargetUom: DataTypes.JSON,
      goalStatus: DataTypes.ENUM('ongoing', 'complete'),
    },
    {
      sequelize,
      modelName: 'UserCropGoal',
      tableName: 'user_crop_goals',
    }
  );
  return UserCropGoal;
};
