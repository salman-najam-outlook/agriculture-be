'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ManageCacaoTreesVarieties extends Model {
    static associate(models) {}
  }
  ManageCacaoTreesVarieties.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      manage_cacao_trees_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cacao_manage_trees',
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
      modelName: 'ManageCacaoTreesVarieties',
      tableName: 'manage_cacao_trees_varieties',
    }
  );
  return ManageCacaoTreesVarieties;
};
