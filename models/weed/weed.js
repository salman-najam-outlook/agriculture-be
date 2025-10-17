'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weed extends Model {
    static associate(models) {

      this.belongsTo(models.Option, {
        foreignKey: 'cropTypeId',
        as: 'weed_cropType',
      });
      this.belongsToMany(models.Crop, {
        through: 'weed_crop_vatiety',
        foreignKey: 'weedId',
        otherKey: 'varietyId',
        as: 'weed_variety',
      });
      this.belongsToMany(models.WeedType, {
        through: 'weeddata_type',
        foreignKey: 'weedId',
        otherKey: 'weedTypeId',
        as: 'weed_data_type',
      });
      this.belongsToMany(models.WeedStage, {
        through: 'weeddata_stage',
        foreignKey: 'weedId',
        otherKey: 'weedStageId',
        as: 'weed_data_stage',
      });
      this.belongsToMany(models.WeedMethod, {
        through: 'weeddata_method',
        foreignKey: 'weedId',
        otherKey: 'weedMethodId',
        as: 'weed_data_manual_method',
      });
      this.belongsTo(models.WeedMethod, {
        foreignKey: 'weed_method_id',
        as: 'weed_method',
      });

      this.belongsToMany(models.Geofence, {
        as: 'segments',
        through: models.MapWeedGeofences,
        foreignKey: 'weedId'
      });

      this.belongsToMany(models.user_farm, {
        through: models.MapWeedFarms,
        foreignKey: 'weedId'
      });
      this.hasMany(models.weed_date, {
        foreignKey: 'weed_id',
        as: 'weed_dates',
      });
      this.hasMany(models.MapWeedingAndHerbicideInputs, {
        foreignKey: 'weedId',
        as: 'weedingHerbicideInputs',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'area_unit_id',
        as: 'weed_area_unit_id',
      });
      this.hasOne(models.WeedCost, {
        foreignKey: 'weedId',
        as: 'cost',
      });
      this.hasMany(models.PlantationTraceability, {
        foreignKey: 'activity_id',
        as: 'traceability',
        scope: {
          activity_type: 'WEED_CONTROL',
        },
      });
    }
  }
  Weed.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      area: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      cropTypeId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Option',
          key: 'id',
        },
      },
      // date: {
      //   allowNull: false,
      //   type: DataTypes.DATE
      // },
      weedingDays: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      weed_method_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'weed_methods',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      area_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'units_list',
          key: 'id',
        },
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
    },
    {
      sequelize,
      modelName: 'Weed',
      tableName: 'weed'
    }
  );
  return Weed;
};
