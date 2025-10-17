'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HarvestingFarm extends Model {
    static associate(models) {
      this.hasOne(models.Harvest, {
        foreignKey: 'id',
        sourceKey: 'harvestId',
        as: 'harvest',
      });
    }
  }
  HarvestingFarm.init(
    {
      farmId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_farms',
          key: 'id',
        },
      },
      harvestId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'harvest',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'HarvestingFarm',
      tableName: 'harvesting_farm',
    }
  );
  return HarvestingFarm;
};