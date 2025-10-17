'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoffeeSpecies extends Model {
    static associate(models) {
      this.hasMany(models.CoffeeVariety, { foreignKey: 'coffee_species'});
      this.belongsTo(models.user, {
        foreignKey: 'created_by',
        targetKey: 'id',
        as: 'user'
      });
    }
  }
  CoffeeSpecies.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'coffee_species',
      modelName: 'CoffeeSpecies'
    }
  );
  return CoffeeSpecies;
};
