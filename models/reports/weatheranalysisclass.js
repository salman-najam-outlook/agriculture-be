'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeatherAnalysisClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WeatherAnalysisClass.init({
    weather_eval_id:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:'weather_analysis_detail',
        key:'id'
      }
    },
    class: {
      type: DataTypes.STRING,
      allowNull:true
    },
    range:{
      type:DataTypes.STRING,
      allowNull:true,
    }
   
  }, {
    sequelize,
    modelName: 'WeatherAnalysisClass',
    tableName:'weather_analysis_classes',
  });
  return WeatherAnalysisClass;
};