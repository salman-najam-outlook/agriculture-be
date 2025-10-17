'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserGoal extends Model {
    static associate(models) {
      this.belongsToMany(models.Crop, {
        through: models.MapUserGoalsCrop,
        foreignKey: 'userGoalId',
        as: 'cropVariety',
      });

      this.belongsToMany(models.Geofence, {
        as: 'segments',
        through: models.MapUserGoalGeofences,
        foreignKey: 'userGoalId'
      });

      this.belongsToMany(models.user_farm, {
        through: models.MapUserGoalFarms,
        foreignKey: 'userGoalId'
      });
    }
  }
  UserGoal.init(
    {
      userId: DataTypes.INTEGER,
      goalName: DataTypes.STRING,
      goalTarget: DataTypes.STRING,
      userFarmId: DataTypes.INTEGER,
      segmentId: DataTypes.INTEGER,
      cropTypeOptId: DataTypes.INTEGER,
      soilTypeId: DataTypes.INTEGER,
      soilPhId: DataTypes.INTEGER,
      sowingDate: DataTypes.STRING,
      note: DataTypes.TEXT,
      harvestingDate: DataTypes.STRING,
      recordId: DataTypes.STRING,
      expectedYield: DataTypes.DOUBLE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'user_goals',
      modelName: 'UserGoal'
    }
  );
  return UserGoal;
};
