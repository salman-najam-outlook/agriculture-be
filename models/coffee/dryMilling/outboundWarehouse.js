'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DryMillingOutboundWarehouse extends Model {
    static associate(models) {
      this.hasMany(models.Cupping, {
        foreignKey: 'module_id',
        constraints: false,
        scope: {
          module_type: 'OUTBOUND_WAREHOUSE'
        },
        as: 'cuppingData'
      });
    }
  }
  DryMillingOutboundWarehouse.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      clientName: {
        type: DataTypes.STRING,
      },
      warehouseProductNameId: {
        type: DataTypes.INTEGER,
      },
      warehouseProductName: {
        type: DataTypes.STRING,
      },
      inboundLotId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'dry_milling_inbound_warehouse',
          key: 'id',
        },
      },
      unitSize: {
        type: DataTypes.FLOAT,
      },
      unitCount: {
        type: DataTypes.INTEGER,
      },
      unitUom: {
        type: DataTypes.JSON,
      },
      totalQty: {
        type: DataTypes.FLOAT,
      },
      totalQtyUom: {
        type: DataTypes.JSON,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      amountUom: {
        type: DataTypes.JSON,
      },
      isdeleted: {
        type: DataTypes.DATE,
      },
      recordId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'dry_milling_outbound_warehouse',
      modelName: 'DryMillingOutboundWarehouse',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return DryMillingOutboundWarehouse;
};

