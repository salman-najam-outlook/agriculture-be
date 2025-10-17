'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationDiseaseList extends Model {
    static associate(models) {}
  }
  CropObservationDiseaseList.init(
    {
      observation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
      disease: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation_disease',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropObservationDiseaseList',
      tableName: 'crop_observation_disease_list',
      timestamps: false,
    }
  );
  return CropObservationDiseaseList;
};
