'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PurchaseTraceabilityCropVarProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if necessary
      this.belongsTo(models.PurchaseOrderManagement, {
        foreignKey: 'purchase_order_id',
        as: 'purchaseOrder',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      this.belongsTo(models.Crop, {
        foreignKey: 'crop_variety_id',

      });
    }
  }

  PurchaseTraceabilityCropVarProduct.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      purchase_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'purchase_order_management',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      crop_variety_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'crops',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      tableName: 'purchase_trace_crop_var', // replace with your table name
      modelName: 'PurchaseTraceabilityCropVarProduct', // replace with your model name
    }
  );

  return PurchaseTraceabilityCropVarProduct;
};
