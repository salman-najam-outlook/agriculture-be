'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationToxicityList extends Model {
    static associate(models) {}
  }
  CropObservationToxicityList.init(
    {
      observation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
        allowNull: false,
      },
      toxicity: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation_toxicity',
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CropObservationToxicityList',
      tableName: 'crop_observation_toxicity_list',
      timestamps: false,
    }
  );
  return CropObservationToxicityList;
};
