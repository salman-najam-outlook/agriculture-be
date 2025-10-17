'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class harvest_reason_for_loss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  harvest_reason_for_loss.init({
    userId: DataTypes.INTEGER,     
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'harvest_reason_for_loss',
  });
  return harvest_reason_for_loss;
};