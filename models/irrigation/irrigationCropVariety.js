'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationCropVariety extends Model {
    static associate(models) {}
  }
  IrrigationCropVariety.init(
    {
      irrigation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'irrigation',
          key: 'id',
        },
      },
      cropVariety: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'IrrigationCropVariety',
      tableName: 'irrigation_cropVariety',
    }
  );
  return IrrigationCropVariety;
};
