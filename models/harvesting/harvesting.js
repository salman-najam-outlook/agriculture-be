'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Harvest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsToMany(models.Crop, {
        through: 'harvest_variety',
        foreignKey: 'harvestId',
        otherKey: 'varietyId',
        as: 'harvesting_variety',
      });
      this.belongsToMany(models.user_farm, {
        through: 'HarvestingFarm',
        foreignKey: 'harvestId',
        otherKey: 'farmId',
        as: 'harvest_farm',
      });
      this.belongsToMany(models.Geofence, {
        through: 'HarvestingSegment',
        foreignKey: 'harvestId',
        otherKey: 'segment',
        as: 'harvest_segment',
      });
      this.belongsTo(models.HarvestMethod, {
        foreignKey: 'methodForHarvesting',
        as: 'method_for_harvesting',
      });

      this.belongsToMany(models.harvest_reason_for_loss, {
        through: 'MapHarvestReasonForLoss',
        foreignKey: 'harvestId',
        otherKey: 'resonForLoss',
        as: 'harvest_reason_for_loss',
      });

      // this.belongsTo(models.Crop, {
      //   foreignKey: 'cropVariety',
      //   as: 'harvest_cropVariety',
      // });
      this.belongsTo(models.Option, {
        foreignKey: 'cropType',
        as: 'harvest_cropType',
      });
      // this.belongsTo(models.HarvestMethodType, {
      //   foreignKey: 'manualHarvesting',
      //   as: 'harvest_method_type',
      // });

      // // this.belongsTo(models.HarvestMethodType, {
      // //   foreignKey: 'mechanicalHarvesting',
      // //   as: 'harvest_mechanical_method_type',
      // // });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'area_unit_id',
        as: 'harvest_area_unit_id',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'total_fresh_yield_unit_id',
        as: 'harvest_total_fresh_yield_unit_id',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'total_dry_yield_unit_id',
        as: 'harvest_total_dry_yield_unit_id',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'total_planned_fresh_yield_unit_id',
        as: 'harvest_total_planned_fresh_yield_unit_id',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'total_planned_dry_yield_unit_id',
        as: 'harvest_total_planned_dry_yield_unit_id',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'yield_for_sale_unit_id',
        as: 'harvest_yield_for_sale_unit_id',
      });
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });
      this.hasOne(models.HarvestCost, {
        foreignKey: 'harvestId',
        as: 'cost',
      });
    }
  }
  Harvest.init(
    {      
      userId: DataTypes.INTEGER,
      recordId: DataTypes.STRING,
      area: DataTypes.FLOAT,
      cropType: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Option',
          key: 'id',
        },
      },
      // cropVariety: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'crops',
      //     key: 'id',
      //   },
      // },
      // cropType: DataTypes.STRING(30),
      // cropVariety: DataTypes.STRING(100),
      start_date_harvesting: DataTypes.DATE,
      end_date_harvesting: DataTypes.DATE,
      daysHarvesting: DataTypes.INTEGER,
      totalFreshYield: DataTypes.INTEGER,
      totalDryYield: DataTypes.INTEGER,
      total_planned_fresh_yield: DataTypes.INTEGER,
      total_planned_dry_yield: DataTypes.INTEGER,
      yieldForHouseholdConsumption: DataTypes.STRING(30),
      yieldForSale: DataTypes.INTEGER,
      methodForHarvesting: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'harvest_method',
          key: 'id',
        },
      },
      manualHarvesting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'harvestMethodType',
          key: 'id',
        },
      },
      mechanicalHarvesting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'harvestMethodType',
          key: 'id',
        },
      },
      // manualHarvesting: DataTypes.STRING(70),
      // mechanicalHarvesting: DataTypes.STRING(70),
      yieldLosses: DataTypes.INTEGER,
      cropResidueManagement: DataTypes.INTEGER,
      area_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'units_list',
          key: 'id',
        },
      },
      total_fresh_yield_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'units_list',
          key: 'id',
        },
      },
      total_dry_yield_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'units_list',
          key: 'id',
        },
      },
      total_planned_fresh_yield_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'units_list',
          key: 'id',
        },
      },
      total_planned_dry_yield_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'units_list',
          key: 'id',
        },
      },
      yield_for_sale_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'units_list',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: "harvest",
      modelName: "Harvest",
    }
  );
  return Harvest;
};
