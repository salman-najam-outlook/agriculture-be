'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FertilizerInputType extends Model {
    static associate() {

    }
  }
  FertilizerInputType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'fertilizer_input_type',
      modelName: 'FertilizerInputType',
    }
  );
  return FertilizerInputType;
};
