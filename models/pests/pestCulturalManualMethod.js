'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestCulturalManualMethod extends Model {
    static associate(models) {
    }
  }

  PestCulturalManualMethod.init(
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
      tableName: 'pest_cultural_manual_methods',
      modelName: 'PestCulturalManualMethod',
    }
  );

  return PestCulturalManualMethod;
}
