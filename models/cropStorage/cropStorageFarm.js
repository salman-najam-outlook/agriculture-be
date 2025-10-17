'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropStorageFarm extends Model {
    static associate(models) {}
  }
  CropStorageFarm.init(
    {
      cropStorage: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_storage',
          key: 'id',
        },
      },
      farm: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_farms',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropStorageFarm',
      tableName: 'crop_storage_farm',
    }
  );
  return CropStorageFarm;
};
