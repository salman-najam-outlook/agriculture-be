'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationGrowthStage extends Model {
    static associate(models) {
      this.belongsTo(models.Option, {
        foreignKey: 'cropType',
        as: 'cropObservation_cropType',
      });
    }
  }
  CropObservationGrowthStage.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cropType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Option',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropObservationGrowthStage',
      tableName: 'crop_observation_growth_stage',
      timestamps: false,
    }
  );
  return CropObservationGrowthStage;
};
