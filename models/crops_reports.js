'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class crops_reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  crops_reports.init({
    cropName: DataTypes.STRING,
    fileS3Key: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    report: {
      type: DataTypes.STRING,
      // get() {
      //   //console.log("inside get");
      //   const fileS3Key = this.getDataValue('fileS3Key');
      //   return fileS3Key ? s3.getAccessibleURL(fileS3Key) : null;
      // }
    }
  }, {
    sequelize,
    tableName:'crops_reports',
    modelName: 'crops_reports',
  });
  return crops_reports;
};