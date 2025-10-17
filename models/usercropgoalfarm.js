'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropGoalFarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_farm, {
        foreignKey: 'farmId',
        as: 'userFarm',
      });
      this.belongsTo(models.Geofence, {
        foreignKey: 'zoneId',
        as: 'userFarmZone',
      });
      this.belongsTo(models.Option, {
        foreignKey: 'cropTypeId',
        as: 'crop_type',
      });
      this.hasMany(models.UserCropGoalTypeMap, {
        foreignKey: 'userCropGoalSeasonId',
        sourceKey: 'seasonId',
        as: 'user_crop_goal_type_map',
      });
      this.belongsTo(models.UserCropGoalSeason, {
        foreignKey: 'seasonId',
        as: 'user_crop_goal_season',
      });
    }
  }
  UserCropGoalFarm.init(
    {
      seasonId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      zoneId: DataTypes.INTEGER,
      farmSize: DataTypes.FLOAT,
      farmSizeUom: DataTypes.JSON,
      cropTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserCropGoalFarm',
      tableName: 'user_crop_goal_farms',
    }
  );
  return UserCropGoalFarm;
};
