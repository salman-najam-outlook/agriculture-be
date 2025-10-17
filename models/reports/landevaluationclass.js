'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LandEvaluationClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LandEvaluationClass.init({
    report_eval_id:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:'land_evaluation_details',
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
    modelName: 'LandEvaluationClass',
    tableName:'land_evaluation_classes',
  });
  return LandEvaluationClass;
};