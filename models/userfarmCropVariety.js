'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserfarmCropVariety extends Model {
    static associate(models) {
      // define association here
      this.hasOne(models.Crop, {
        sourceKey: 'cropId',
        foreignKey: 'id',
        as: 'crop',
      });
    }
  }
  UserfarmCropVariety.init(
    {
      userFarmCropId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_farm_crops',
          key: 'id',
        },
      },
      cropId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'user_farm_crops_variety',
      modelName: 'UserfarmCropVariety',
    }
  );
  return UserfarmCropVariety;
};
