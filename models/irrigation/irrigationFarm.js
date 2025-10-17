'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationFarm extends Model {
    static associate(models) {}
  }
  IrrigationFarm.init(
    {
      farm: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_farms',
          key: 'id',
        },
      },
      irrigation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'irrigation',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'IrrigationFarm',
      tableName: 'irrigation_farm',
    }
  );
  return IrrigationFarm;
};
