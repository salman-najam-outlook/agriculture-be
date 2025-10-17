'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropSegment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Geofence, {
        foreignKey: 'segmentId',
        as: 'userCropSegment',
      });
      this.belongsTo(models.UserfarmCrop, {
        foreignKey: 'userFarmCropId',
        as: 'userFarmCrop',
      });
    }
  }
  UserCropSegment.init(
    {
      segmentId: DataTypes.INTEGER,
      userFarmCropId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'user_crop_segments',
      modelName: 'UserCropSegment',
    }
  );
  return UserCropSegment;
};
