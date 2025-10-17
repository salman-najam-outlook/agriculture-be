'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCropFarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_farm, {
        foreignKey: 'farmId',
        targetKey: 'id',
        as: 'farm',
      });
      this.belongsTo(models.UserfarmCrop, {
        foreignKey: 'userFarmCropId',
        targetKey: 'id',
        as: 'userFarmCrop',
      });
    }
  }
  UserCropFarm.init(
    {
      farmId: DataTypes.INTEGER,
      userFarmCropId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'user_crop_farms',
      modelName: 'UserCropFarm',
    }
  );
  return UserCropFarm;
};
