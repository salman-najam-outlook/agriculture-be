'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Soil_prep_practice_soil_type extends Model {
    static associate() {
    }
  }
  Soil_prep_practice_soil_type.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      soilTypeId: DataTypes.INTEGER,
      soil_prep_practiceId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'map_soil_prep_practice_soil_type',
      modelName: 'Soil_prep_practice_soil_type'
    }
  );
  return Soil_prep_practice_soil_type;
};
