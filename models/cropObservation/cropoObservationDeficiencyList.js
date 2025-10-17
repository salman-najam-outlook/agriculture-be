'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationDeficiencyList extends Model {
    static associate(models) {}
  }
  CropObservationDeficiencyList.init(
    {
      observation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
      deficiency: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation_deficiencies',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropObservationDeficiencyList',
      tableName: 'crop_observation_deficiency_list',
      timestamps: false,
    }
  );
  return CropObservationDeficiencyList;
};
