'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CacaoVariety extends Model {
    static associate(models) {
      this.belongsTo(models.CacaoSpecies, { foreignKey: 'cacao_species'});
      this.belongsToMany(models.CacaoPlantations, {
        through: models.CacaoPlantationVarieties,
        foreignKey: 'cacao_variety_id',
        otherKey: 'cacao_plantation_id',
        as: 'cacaoPlantations'
      }) 
      this.belongsToMany(models.CacaoManageTrees, {
        through: models.ManageCacaoTreesVarieties,
        foreignKey: 'cacao_variety_id',
        otherKey: 'manage_cacao_trees_id',
        as: 'manageCacaoTrees'
      })
    }
  }
  CacaoVariety.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      cacao_species: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cacao_species',
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'cacao_variety',
      modelName: 'CacaoVariety'
    }
  );
  return CacaoVariety;
};