'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CacaoSpecies extends Model {
    static associate(models) {
      this.hasMany(models.CacaoVariety, { foreignKey: 'cacao_species'});
    }
  }
  CacaoSpecies.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: 'cacao_species',
      modelName: 'CacaoSpecies'
    }
  );
  return CacaoSpecies;
};
