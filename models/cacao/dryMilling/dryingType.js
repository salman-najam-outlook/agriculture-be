'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DryingType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DryingType.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    tableName: 'drying_type',
    modelName: 'DryingType'
  });
  return DryingType;
};