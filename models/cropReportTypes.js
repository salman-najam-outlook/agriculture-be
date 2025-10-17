'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropReportType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CropReportType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: "crop_report_types",
    modelName: "CropReportType",
  });
  return CropReportType;
};