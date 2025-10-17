'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropStorageMethod extends Model {
    static associate(models) {}
  }
  CropStorageMethod.init(
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
      modelName: 'CropStorageMethod',
      tableName: 'crop_storage_method',
      indexes: [
        {
          unique: true,
          fields: ['name', 'userId'],
        },
      ],
    }
  );
  return CropStorageMethod;
};
