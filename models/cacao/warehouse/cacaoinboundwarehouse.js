'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoInBoundWarehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.CacaoWarehouseProduct, {
        sourceKey: 'productNameId',
        foreignKey: 'id',
        as: 'cacaowarehouseProduct',
      });
      this.hasOne(models.user, {
        sourceKey: 'senderId',
        foreignKey: 'id',
        as: 'cacaowarehouseSender',
      });

      this.hasOne(models.user, {
        sourceKey: 'userId',
        foreignKey: 'id',
        as: 'warehouseOwner',
      });

      this.hasMany(models.CacaoOutBoundWarehouse, {
        foreignKey: 'inboundLotId',
        sourceKey: 'id'
      });
    }
  }
  CacaoInBoundWarehouse.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'users',
        key:'id'
      }
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
      type: DataTypes.FLOAT,
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
    type:{
      type:DataTypes.STRING,
      allowNull:true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'CacaoInBoundWarehouse',
    paranoid:true,
    deletedAt:'isdeleted',
    tableName: 'cacao_inbound_warehouse'
  });
  return CacaoInBoundWarehouse;
};