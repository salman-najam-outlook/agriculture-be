'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationFarm extends Model {
    static associate(models) {}
  }
  CropObservationFarm.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      farm: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_farms',
          key: 'id',
        },
      },
      observation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropObservationFarm',
      tableName: 'crop_observation_farm',
      timestamps: false,
    }
  );
  return CropObservationFarm;
};
