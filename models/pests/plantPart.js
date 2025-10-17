'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlantPart extends Model {
    static associate(models) {
    }
  }

  PlantPart.init(
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
      tableName: 'plant_parts',
      modelName: 'PlantPart',
    }
  );

  return PlantPart;
}
