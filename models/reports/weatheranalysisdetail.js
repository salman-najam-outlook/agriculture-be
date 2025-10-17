'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeatherAnalysisDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.WeatherAnalysisClass,{
        foreignKey:'weather_eval_id',
        sourceKey:'id',
        as:'weather_eval_class'
      })
    }
  }
  WeatherAnalysisDetail.init({
    weather_report_id:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:'weather_analysis_reports',
        key:'id'
      }
    },
    name:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    group: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'WeatherAnalysisDetail',
    tableName:'weather_analysis_detail'
  });
  return WeatherAnalysisDetail;
};