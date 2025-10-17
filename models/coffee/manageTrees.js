"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ManageTrees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Plantations, {
        foreignKey: 'plantation_id',
        targetKey: 'id',
        as: 'plantation'
      });
      this.belongsTo(models.Seedlings, {
        foreignKey: 'seedling_id',
        targetKey: 'id',
        as: 'seedling'
      });
      this.belongsTo(models.CoffeeSpecies, {
        foreignKey: 'coffee_species',
        targetKey: 'id',
        as: 'coffeeSpecies'
      });
      this.belongsToMany(models.CoffeeVariety, {
        through: models.ManageTreesVarieties,
        foreignKey: 'manage_trees_id',
        otherKey: 'coffee_variety_id',
        as: 'CoffeeVariety'
      })
    }
  }
  ManageTrees.init(
    {
      plantation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'plantations',
            key: 'id',
          },
      },
      seedling_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'seedlings',
            key: 'id',
          },
      },
      date: {
        allowNull: true,
        type: DataTypes.DATE
      },
      coffee_species: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coffee_species',
          key: 'id',
        },
      },
      no_of_coffee_trees: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: "manage_trees",
      modelName: "ManageTrees",
    }
  );
  return ManageTrees;
};