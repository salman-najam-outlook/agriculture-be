'use strict';

const { Model } = require('sequelize');
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParchmentCoffee extends Model {
    static associate(models) {
        this.belongsTo(models.UnitsList, {
            foreignKey: 'parchmentCheckingUnitId',
            as: 'parchmentCheckingUnit',
        });
        this.belongsTo(models.ParchmentProductType, {
            foreignKey: 'productTypeId',
            as: 'productType',
        });
        this.hasOne(models.user, {
          sourceKey: 'dryMillingUserId',
          foreignKey: 'id',
          as: 'dryMilling',
        });
        this.hasMany(models.ParchmentQualityGrading, {
          foreignKey: 'parchmentCoffeeId',
          as: 'qualityGradings',
        });
        this.hasMany(models.ParchmentCupping, {
          foreignKey: 'parchmentCoffeeId',
          as: 'parchmentCuppings',
        });
        this.hasMany(models.ParchmentCoffeeProcessingBatch, {
          foreignKey: 'parchmentCoffeeId',
          as: 'parchmentBatchMap',
        });
        this.belongsTo(models.BuyingStationOrder, {
            as: 'buyingStationOrder',
            foreignKey: 'buyingStationParchmentId',
            targetKey: 'id',
        });
        this.belongsTo(models.BuyingStationProcessingBatch, {
            as: 'buyingStationProcessingBatch',
            foreignKey: 'buyingStationParchmentId',
            targetKey: 'id',
        });
        this.hasMany(models.Cupping, {
          foreignKey: 'module_id',
          constraints: false,
          scope: {
            module_type: 'PARCHMENT_COFFEE'
          },
          as: 'cuppingData'
        });
    }
  }
  ParchmentCoffee.init(
    {
        dryMillingUserId: {
            type: DataTypes.INTEGER,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productTypeId: {
          type: DataTypes.INTEGER
        },
        buyingStationParchmentId: {
          type: DataTypes.STRING,
        },
        purchaseDate: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },
        barcode: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        parchmentChecking: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        parchmentCheckingUnitId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        qualityControlHumidity: {
          allowNull: true,
          type: DataTypes.DOUBLE,
        },
        qualityControlDensity: {
          allowNull: true,
          type: DataTypes.DOUBLE,
        },
        qualityControlDensityUnit: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        parchmentQualityScore: {
          allowNull: true,
          type: DataTypes.ENUM('A', 'B', 'C', 'D', 'E'),
        },
        batchProductionKilogramAsalan: {
          allowNull: true,
          type: DataTypes.DOUBLE,
        },
        batchProductionDensity: {
          allowNull: true,
          type: DataTypes.DOUBLE,
        },
        batchProductionDensityUnit: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        batchProductionPrimaryDefect: {
          allowNull: true,
          type: DataTypes.DOUBLE,
        },
        batchProductionSecondaryDefect: {
          allowNull: true,
          type: DataTypes.DOUBLE,
        },
        greenBeansTotal: {
          allowNull: true,
          type: DataTypes.DOUBLE,
        },
        greenBeansBags: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        greenBeansId: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        greenBeansExpiry: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        greenBeansLabel: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        totalWaste: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.ENUM('Completed', 'Parchment Coffee', 'Quality Control', 'Batch Production', 'Green Beans', 'Cupping'),
        },
        recordId: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        isdeleted: {
          type: DataTypes.DATE,
        },
        usedForWarehouse: {
          default: false,
          type: DataTypes.BOOLEAN,
        },
        outboundSent: {
          default: false,
          type: DataTypes.BOOLEAN,
        },
        labelUrl: {
          type: DataTypes.VIRTUAL,
          get() {
            const external_id = this.getDataValue('external_id');
            return `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${external_id}`
          },
        },
        external_id: {
          type: DataTypes.STRING(20),
        },
    },
    {
      sequelize,
      tableName: 'parchment_coffees',
      modelName: 'ParchmentCoffee',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return ParchmentCoffee;
};