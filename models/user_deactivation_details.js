'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_deactivation_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
    
    }
  }
  user_deactivation_details.init({
    userId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    details: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserDeativationDetails',
    tableName:'user_deactivation_details'
  });
  return user_deactivation_details;
};