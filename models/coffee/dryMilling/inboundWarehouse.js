'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DryMillingInboundWarehouse extends Model {
    static associate(models) {
      this.hasOne(models.WarehouseProductName, {
        sourceKey: 'productNameId',
        foreignKey: 'id',
        as: 'warehouseProduct',
      });
      this.hasOne(models.user, {
        sourceKey: 'senderId',
        foreignKey: 'id',
        as: 'warehouseSender',
      });
      this.hasMany(models.Cupping, {
        foreignKey: 'module_id',
        constraints: false,
        scope: {
          module_type: 'INBOUND_WAREHOUSE'
        },
        as: 'cuppingData'
      });
    }
  }
  DryMillingInboundWarehouse.init(
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
        references: {
          model: 'users',
          key: 'id',
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      productNameId: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
      quantityUom: {
        type: DataTypes.JSON,
      },
      unitSize: {
        type: DataTypes.FLOAT,
      },
      unitUom: {
        type: DataTypes.JSON,
      },
      unitCount: {
        type: DataTypes.JSON,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      amountUom: {
        type: DataTypes.JSON,
      },
      productED: {
        type: DataTypes.DATEONLY,
      },
      images: {
        type: DataTypes.JSON,
      },
      isdeleted: {
        type: DataTypes.DATE,
      },
      recordId: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'dry_milling_inbound_warehouse',
      modelName: 'DryMillingInboundWarehouse',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return DryMillingInboundWarehouse;
};
