'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LandSuitabilityResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
    }
  }
  LandSuitabilityResult.init({
    report_eval_id:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:'land_evaluation_details',
        key:'id'
      }
    },
    name:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'LandSuitabilityResult',
    tableName:'land_suitability_results'
  });
  return LandSuitabilityResult;
};