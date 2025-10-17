'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoFermentationAndBatchVisual extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       this.hasOne(models.CacaoFermentationProcess,{
        sourceKey:"fermentationId",
        foreignKey:"id",
        as:"fermentationProcess"
      })

      this.hasOne(models.CacaoBatchVisualIdentification,{
        sourceKey:"batchVisualId",
        foreignKey:"id",
        as:"visualIdentification"
      })
    }
  }
  CacaoFermentationAndBatchVisual.init({
    fermentationId: DataTypes.INTEGER,
    batchVisualId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CacaoFermentationAndBatchVisual',
    tableName:'cacao_fermentation_and_batch_visual',
  });
  return CacaoFermentationAndBatchVisual;
};