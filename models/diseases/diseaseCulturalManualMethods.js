'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseCulturalManualMethods extends Model {
    static associate(models) {

    }
  }

  DiseaseCulturalManualMethods.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'disease_cultural_manual_methods',
      modelName: 'DiseaseCulturalManualMethods',
    }
  );

  return DiseaseCulturalManualMethods;
}
