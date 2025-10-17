"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Plantations extends Model {
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
      this.hasMany(models.CoffeeLandImages, {
        foreignKey: 'plantation_id',
        as: 'coffeeLandImages'
      })
      this.hasMany(models.ManageTrees, {
        foreignKey: 'plantation_id',
        as: 'manageTreesData'
      })
      this.belongsToMany(models.ShadeTree, {
        through: 'ShadeTreeMapData',
        foreignKey: 'plantation_id',
        otherKey: 'shade_tree_id',
        as: 'shadeTree',
      })
      this.belongsToMany(models.WindBreaker, {
        through: 'WindBreakerTreeMapData',
        foreignKey: 'plantation_id',
        otherKey: 'wind_breaker_tree_id',
        as: 'windBreakerTree',
      })
      this.belongsToMany(models.HorticultureInformation, {
        through: 'HorticultureInformationMapData',
        foreignKey: 'plantation_id',
        otherKey: 'horticulture_information_id',
        as: 'horticultureInformation',
      })
      this.belongsToMany(models.user_farm, {
        through: 'PlantationsUserFarmsMap',
        foreignKey: 'plantation_id',
        otherKey: 'farm_id',
        as: 'userFarms',
      });
      this.hasMany(models.PlantationsUserFarmsMap, {
        foreignKey: 'plantation_id',
        as: 'plantationUserFarmsMap'
      })
      this.hasMany(models.PlantationsGeofenceMap, {
        foreignKey: 'plantation_id',
        as: 'plantationsGeofenceMap'
      })
      this.belongsToMany(models.Geofence, {
        through: 'PlantationsGeofenceMap',
        foreignKey: 'plantation_id',
        otherKey: 'segment_id',
        as: 'segments'
      });
      this.belongsToMany(models.Seedlings, {
        through: models.MapPlantationSeedling,
        foreignKey: 'plantationId',
        otherKey: 'seedlingId',
        as: 'seedlings'
      });
      this.belongsToMany(models.CoffeeVariety, { //need both
        through: models.CoffeePlantationVarieties,
        foreignKey: 'coffee_plantation_id',
        otherKey: 'coffee_variety_id',
        as: 'CoffeeVariety'
      }) 
      this.belongsToMany(models.CoffeeVariety, { //need both
        through: models.CoffeePlantationVarieties,
        foreignKey: 'coffee_plantation_id',
        otherKey: 'coffee_variety_id',
        as: 'coffeeVariety'
      }) 
    }
  }
  Plantations.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      plantation_name: {
        type: DataTypes.STRING,
        allowNull: false
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
      expected_yield: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      bearing_fruit_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      time_to_bear_fruit: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      no_of_trees_bearing_fruit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      plantationStatus: {
        type: DataTypes.ENUM('pending', 'active', 'unapproved'),
      },
      isExistingPlantation: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM(["pending", "approved", "rejected"])
      },
      rejection_reason: {
        type: DataTypes.STRING,
      },
      external_traceability_id: {
        type: DataTypes.STRING(20),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: "plantations",
      modelName: "Plantations",
    }
  );
  return Plantations;
};