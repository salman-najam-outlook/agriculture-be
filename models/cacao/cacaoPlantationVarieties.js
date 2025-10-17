'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoPlantationVarieties extends Model {
    static associate(models) {
    }
  }
  CacaoPlantationVarieties.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      cacao_plantation_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cacao_plantations',
          key: 'id',
        },
      },
      cacao_variety_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cacao_variety',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CacaoPlantationVarieties',
      tableName: 'cacao_plantation_varieties',
    }
  );
  return CacaoPlantationVarieties;
};
