'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoilApplicationStage extends Model {
    static associate() {

    }
  }
  SoilApplicationStage.init(
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
      tableName: 'soil_application_stage',
      modelName: 'SoilApplicationStage',
    }
  );
  return SoilApplicationStage;
};
