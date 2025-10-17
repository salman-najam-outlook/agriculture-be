'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StorageCropVariety extends Model {
    static associate(models) {}
  }
  StorageCropVariety.init(
    {
      storage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'crop_storage',
          key: 'id',
        },
      },
      cropVariety: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'StorageCropVariety',
      tableName: 'crop_storage_variety',
    }
  );
  return StorageCropVariety;
};
