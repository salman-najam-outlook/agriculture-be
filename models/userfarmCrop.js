'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserfarmCrop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.UserfarmCropVariety, {
        foreignKey: 'userFarmCropId',
        as: 'cropVariety',
      });
      this.hasOne(models.Option, {
        foreignKey: 'id',
        sourceKey: 'cropTypeOptId',
        as: 'showCropTypes',
      });
      this.hasOne(models.user, {
        foreignKey: 'id',
        sourceKey: 'userId',
        as: 'user',
      });
      this.belongsToMany(models.user_farm, {
        as: 'userCropFarms',
        through: models.UserCropFarm,
        foreignKey: 'userFarmCropId',
        otherKey: 'farmId',
      });
      this.belongsToMany(models.Geofence, {
        as: 'userCropSegments',
        through: models.UserCropSegment,
        foreignKey: 'userFarmCropId',
        otherKey: 'segmentId',
      });
    }
  }
  UserfarmCrop.init(
    {
      userId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER, // deprecated
      segmentId: DataTypes.INTEGER,
      cropTypeOptId: DataTypes.INTEGER,
      propagationType: DataTypes.STRING,
      vegetativePropagationTypeOptId: DataTypes.INTEGER,
      expectedYield: DataTypes.INTEGER,
      cropSeasonOptId: DataTypes.INTEGER,
      cropLifecycleOptId: DataTypes.INTEGER,
      cropWaterMgmtOptId: DataTypes.INTEGER,
      recordId:DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'user_farm_crops',
      modelName: 'UserfarmCrop',
    }
  );
  return UserfarmCrop;
};
