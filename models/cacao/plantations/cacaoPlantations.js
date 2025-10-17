"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoPlantations extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user",
      });
      this.belongsTo(models.CacaoSpecies, {
        foreignKey: "cacao_species",
        targetKey: "id",
        as: "cacaoSpecies",
      });
      this.belongsToMany(models.CacaoVariety, {
        through: models.CacaoPlantationVarieties,
        foreignKey: 'cacao_plantation_id',
        otherKey: 'cacao_variety_id',
        as: 'cacaoVariety'
      }) 
      this.hasMany(models.CacaoLandImages, {
        foreignKey: 'plantation_id',
        as: 'cacaoLandImages'
      })
      this.hasMany(models.CacaoManageTrees, {
        foreignKey: "plantation_id",
        as: "manageCacaoTreesData",
      });
      this.hasMany(models.CacaoManageRemovedTrees, {
        foreignKey: "plantation_id",
        as: "manageCacaoRemovedTreesData",
      });
      this.belongsToMany(models.ShadeTree, {
        through: 'CacaoShadeTreeMapData',
        foreignKey: 'plantation_id',
        otherKey: 'shade_tree_id',
        as: 'shadeTree',
      })
      this.belongsToMany(models.WindBreaker, {
        through: 'CacaoWindBreakerTreeMapData',
        foreignKey: 'plantation_id',
        otherKey: 'wind_breaker_tree_id',
        as: 'windBreakerTree',
      })
      this.belongsToMany(models.HorticultureInformation, {
        through: 'CacaoHorticultureInformationMapData',
        foreignKey: 'plantation_id',
        otherKey: 'horticulture_information_id',
        as: 'horticultureInformation',
      })
      this.belongsToMany(models.user_farm, {
        through: 'CacaoPlantationsUserFarmsMap',
        foreignKey: 'plantation_id',
        otherKey: 'farm_id',
        as: 'userFarms',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'expected_yield_unit_id',
        as: 'expectedYieldUnitId',
      });
      this.hasMany(models.CacaoPlantationsUserFarmsMap, {
        foreignKey: 'plantation_id',
        as: 'plantationUserFarmsMap'
      })
      this.hasMany(models.CacaoPlantationsGeofenceMap, {
        foreignKey: 'plantation_id',
        as: 'plantationsGeofenceMap'
      })
      this.belongsToMany(models.Geofence, {
        through: 'CacaoPlantationsGeofenceMap',
        foreignKey: 'plantation_id',
        otherKey: 'segment_id',
        as: 'segments'
      });
    }
  }
  CacaoPlantations.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      plantation_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cacao_species: {
        type: DataTypes.INTEGER,
        references: {
          model: "cacao_species",
          key: "id",
        },
      },
      no_of_cacao_trees: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expected_yield: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      expected_yield_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bearing_fruit_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      time_to_bear_fruit: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      no_of_trees_bearing_fruit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      plantationStatus: {
        type: DataTypes.ENUM("pending", "active", "unapproved"),
      },
      isExistingPlantation: {
        type: DataTypes.BOOLEAN,
      },
      status: {
        type: DataTypes.ENUM(["pending", "approved", "rejected"]),
      },
      rejection_reason: {
        type: DataTypes.STRING,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      external_traceability_id: {
        type: DataTypes.STRING(20),
      },
    },
    {
      sequelize,
      tableName: "cacao_plantations",
      modelName: "CacaoPlantations",
    }
  );
  return CacaoPlantations;
};
