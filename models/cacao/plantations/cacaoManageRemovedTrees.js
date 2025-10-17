"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoManageRemovedTrees extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.CacaoPlantations, {
        foreignKey: 'plantation_id',
        targetKey: 'id',
        as: 'plantation'
      });
    }
  }
  CacaoManageRemovedTrees.init(
    {
      plantation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cacao_plantations',
            key: 'id',
          },
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      no_of_cacao_trees: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize,
      tableName: "cacao_manage_removed_trees",
      modelName: "CacaoManageRemovedTrees",
    }
  );
  return CacaoManageRemovedTrees;
};