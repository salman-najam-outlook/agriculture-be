'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoFermentationMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CacaoFermentationMethod.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
  }, {
    sequelize,
    modelName: 'CacaoFermentationMethod',
    tableName: 'cacao_fermentation_methods',
    timestamps: false,
  });
  return CacaoFermentationMethod;
};