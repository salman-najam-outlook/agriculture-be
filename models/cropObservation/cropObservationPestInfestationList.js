'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationPestInfestationList extends Model {
    static associate(models) {}
  }
  CropObservationPestInfestationList.init(
    {
      observation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
      pestInfestation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation_pest_infestation',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropObservationPestInfestationList',
      tableName: 'crop_observation_pestInfestation_list',
    },
  );
  return CropObservationPestInfestationList;
};
