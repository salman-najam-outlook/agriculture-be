'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Soil_prep_practice_equipments extends Model {
    static associate() {

    }
  }
  Soil_prep_practice_equipments.init(
    {
      equipmentId: DataTypes.INTEGER,
      soil_prep_practiceId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'soil_prep_practice_equipments',
      modelName: 'Soil_prep_practice_equipments'
    }
  );
  return Soil_prep_practice_equipments;
};
