'use strict';

const { Model } = require('sequelize');
const s3 = require(rootPath + '/components/s3');

module.exports = (sequelize, DataTypes) => {
  class SoilType extends Model {
    static associate() {

    }
  }
  SoilType.init(
    {
      name: DataTypes.STRING,
      imageS3Key: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
    },
    {
      sequelize,
      tableName: 'soil_types',
      modelName: 'SoilType',
    }
  );
  return SoilType;
};
