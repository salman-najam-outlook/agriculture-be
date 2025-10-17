'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropStorageType extends Model {
    static associate(models) {}
  }
  CropStorageType.init(
    {
      name: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropStorageType',
      tableName: 'crop_storage_type',
      indexes: [
        {
          unique: true,
          fields: ['name', 'userId'],
        },
      ],
    }
  );
  return CropStorageType;
};
