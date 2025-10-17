'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class satellite_report_coordinates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.satellite_report, {
        as : "coordinates"
      })
    }
  };
  satellite_report_coordinates.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    satelliteReportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "satellite_reports",
        key: "id"
      }
    },
    latitude : {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    longitude : {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'satellite_report_coordinates',
  });
  return satellite_report_coordinates;
};