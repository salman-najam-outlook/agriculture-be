'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CacaoScreenedBeans extends Model {
    static associate(models) {
      this.belongsTo(models.CacaoDryingProcess, {
        foreignKey: 'dryProcessId',
        as: 'dryingProcess'
      });
    }
  }
  
  CacaoScreenedBeans.init({
    dryProcessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CacaoDryingProcess',
        key: 'id'
      }
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CacaoScreenedBeans',
    tableName: 'cacao_screened_beans'
  });

  return CacaoScreenedBeans;
};