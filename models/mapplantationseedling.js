'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapPlantationSeedling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapPlantationSeedling.init(
    {
      plantationId: DataTypes.INTEGER,
      seedlingId: DataTypes.INTEGER,
      timeToBearFruitStatus: DataTypes.BOOLEAN,
      date: DataTypes.DATEONLY,
      bearingFruitStatus: DataTypes.ENUM('producing_fruits', 'need_more_time'),
      timeToBearFruit: DataTypes.DATEONLY,
      producedCoffeeTreeCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MapPlantationSeedling',
      tableName: 'map_plantation_seedlings',
    }
  );
  return MapPlantationSeedling;
};
