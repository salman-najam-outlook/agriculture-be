'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GeofenceCoordinate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GeofenceCoordinate.init({
    geoFenceId: DataTypes.INTEGER,
    lat: DataTypes.DOUBLE,
    log: DataTypes.DOUBLE
  }, {
    sequelize,
    paranoid: true,
    deletedAt: 'deletedAt',
    tableName:"geofence_coordinates",
    modelName: 'GeofenceCoordinate',
  });
  return GeofenceCoordinate;
};