'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sensor.init({
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    installationDate: DataTypes.DATE,
    expirationDate: DataTypes.DATE,
    sensorId: DataTypes.INTEGER,
    serialNumber: DataTypes.STRING,
    model: DataTypes.STRING,
    sensorLocation: DataTypes.TEXT,
    sensorType: DataTypes.ENUM('type1', 'type2'),
    sensorFor: DataTypes.ENUM('livestock', 'crop'),
  }, {
    sequelize,
    modelName: 'sensor',
  });
  return Sensor;
};