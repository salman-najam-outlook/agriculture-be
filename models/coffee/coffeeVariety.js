'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoffeeVariety extends Model {
    static associate(models) {
      this.belongsTo(models.CoffeeSpecies, { foreignKey: 'coffee_species'});
      this.belongsTo(models.user, {
        foreignKey: 'created_by',
        targetKey: 'id',
        as: 'user'
      });
      this.belongsToMany(models.Plantations, {
        through: models.CoffeePlantationVarieties,
        foreignKey: 'coffee_variety_id',
        otherKey: 'coffee_plantation_id',
        as: 'plantations'
      }) 
      this.belongsToMany(models.ManageTrees, {
        through: models.ManageTreesVarieties,
        foreignKey: 'coffee_variety_id',
        otherKey: 'manage_trees_id',
        as: 'manage_trees'
      })
      this.belongsToMany(models.Seedlings, {
        through: models.CoffeeSeedingVarieties,
        foreignKey: 'coffee_variety_id',
        otherKey: 'coffee_seeding_id',
        as: 'seedlings'
      }) 
    }
  }
  CoffeeVariety.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      coffee_species: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coffee_species',
          key: 'id',
        },
        allowNull: false,
      },
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
      tableName: 'coffee_variety',
      modelName: 'CoffeeVariety'
    }
  );
  return CoffeeVariety;
};