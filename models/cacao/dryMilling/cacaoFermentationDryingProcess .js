'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoFermentationDryingProcess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.CacaoFermentationProcess, {
        as: 'fermentation',
        foreignKey: 'fermentationCode',
        sourceKey: 'fermentationId',
    });
    this.belongsTo(models.CacaoDryingProcess, {
        as: 'dryRegister',
        foreignKey: 'dryRegisterId',
        sourceKey: 'id',
    });
    }
  }
  CacaoFermentationDryingProcess.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fermentationId: {
      type:DataTypes.STRING(10),
      allowNull:false,
    },
    dryRegisterId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'cacao_drying_process',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },

  }, {
    sequelize,
    tableName: 'cacao_fermentation_drying_process',
    modelName: 'CacaoFermentationDryingProcess'
  });
  return CacaoFermentationDryingProcess;
};