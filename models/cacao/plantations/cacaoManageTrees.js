"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoManageTrees extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.CacaoPlantations, {
        foreignKey: 'plantation_id',
        targetKey: 'id',
        as: 'plantation'
      });
      this.belongsTo(models.CacaoSpecies, {
        foreignKey: 'cacao_species',
        targetKey: 'id',
        as: 'cacaoSpecies'
      });
      this.belongsToMany(models.CacaoVariety, {
        through: models.ManageCacaoTreesVarieties,
        foreignKey: 'manage_cacao_trees_id',
        otherKey: 'cacao_variety_id',
        as: 'cacaoVariety'
      })
    }
  }
  CacaoManageTrees.init(
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
      cacao_species: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'cacao_species',
          key: 'id',
        },
      },
      no_of_cacao_trees: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cacao_manage_trees",
      modelName: "CacaoManageTrees",
    }
  );
  return CacaoManageTrees;
};