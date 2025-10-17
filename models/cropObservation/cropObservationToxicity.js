'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationToxicity extends Model {
    static associate(models) {}
  }
  CropObservationToxicity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      element: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CropObservationToxicity',
      tableName: 'crop_observation_toxicity',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['name', 'element'],
        },
      ],
    }
  );
  return CropObservationToxicity;
};
