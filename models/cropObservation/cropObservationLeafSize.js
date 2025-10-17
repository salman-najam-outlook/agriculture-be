'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationLeafSize extends Model {
    static associate(models) {}
  }
  CropObservationLeafSize.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CropObservationLeafSize',
      tableName: 'crop_observation_leaf_size',
      timestamps: false,
    }
  );
  return CropObservationLeafSize;
};
