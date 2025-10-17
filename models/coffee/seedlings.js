"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seedlings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
      });
      this.belongsTo(models.CoffeeSpecies, {
        foreignKey: 'coffee_species',
        targetKey: 'id',
        as: 'coffeeSpecies'
      });
      this.hasMany(models.ManageTrees, {
        foreignKey: 'seedling_id',
        as: 'manageTreesData'
      });
      this.belongsToMany(models.Plantations, {
        through: models.MapPlantationSeedling,
        foreignKey: 'seedlingId',
        otherKey: 'plantationId',
        as: 'plantations'
      });
      this.belongsToMany(models.CoffeeVariety, {
        through: models.CoffeeSeedingVarieties,
        foreignKey: 'coffee_seeding_id',
        otherKey: 'coffee_variety_id',
        as: 'coffeeVariety'
      })
    }
  }
  Seedlings.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
          },
      },
      seedling_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      coffee_species: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coffee_species',
          key: 'id',
        },
        allowNull: false,
      },
      no_of_seeds: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      origin_of_the_seeds: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seed_producer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      no_of_coffee_trees: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      time_to_bear_fruit: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      bearing_fruit_status: {
        type: DataTypes.ENUM('producing_fruits', 'need_more_time'),
        allowNull: true,
      },
      seedlingStatus: {
        type: DataTypes.ENUM('available', 'completed'),
      },
      recordId: {
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
      tableName: "seedlings",
      modelName: "Seedlings",
    }
  );
  return Seedlings;
};