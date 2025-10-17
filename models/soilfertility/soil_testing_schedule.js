'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoilTestingSchedule extends Model {
    static associate() {
    }
  }
  SoilTestingSchedule.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'SoilTestingSchedule',
      tableName: 'soil_testing_schedule',
    }
  );
  return SoilTestingSchedule;
};
