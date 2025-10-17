'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LandEvaluationDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.LandEvaluationClass,{
        foreignKey:'report_eval_id',
        sourceKey:'id',
        as:'land_eval_class'
      })

      this.hasMany(models.LandSuitabilityResult,{
        foreignKey:'report_eval_id',
        sourceKey:'id',
        as:'land_suitability_results'
      })
    }
  }
  LandEvaluationDetail.init({
    land_report_id:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:'land_suitability_reports',
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
    modelName: 'LandEvaluationDetail',
    tableName:'land_evaluation_details'
  });
  return LandEvaluationDetail;
};