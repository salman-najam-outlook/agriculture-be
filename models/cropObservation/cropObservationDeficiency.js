'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationDeficiency extends Model {
    static associate(models) {}
  }
  CropObservationDeficiency.init(
    {
      name: DataTypes.STRING,
      element: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CropObservationDeficiency',
      tableName: 'crop_observation_deficiencies',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['name', 'element'],
        },
      ],
    }
  );
  return CropObservationDeficiency;
};
