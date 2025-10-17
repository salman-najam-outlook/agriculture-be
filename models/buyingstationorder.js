'use strict';
const moment = require('moment');
const _ = require('lodash');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuyingStationOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.user, {
        sourceKey: 'farmerId',
        foreignKey: 'id',
        as: 'farmer',
      });

      this.belongsTo(models.user_farm, {
        foreignKey: 'farmId',
        targetKey: 'id',
        as: 'userFarms'
      });

      this.belongsTo(models.Geofence, {
        foreignKey: 'segmentId',
        targetKey: 'id',
        as: 'segments'
      });

      this.belongsTo(models.Plantations, {
        foreignKey: 'plantationId',
        targetKey: 'id',
        as: 'plantations'
      });
      this.belongsTo(models.CoffeeSpecies, {
        foreignKey: 'speciesId',
        targetKey: 'id',
        as: 'coffeeSpecies'
      });
      this.belongsTo(models.CoffeeVariety, {
        foreignKey: 'varietyId',
        targetKey: 'id',
        as: 'coffeeVarietyDirect'
      });
      this.belongsTo(models.CoffeeType, {
        foreignKey: 'coffeeTypeId',
        targetKey: 'id',
        as: 'coffeeType',
      });
      this.belongsToMany(models.BuyingStationProcessingBatch, {
        through: 'BuyingStationProcessingBatchAndOrder',
        foreignKey: 'orderId',
        otherKey: 'processingBatchId',
        as: 'processingBatch',
      });

      this.hasOne(models.user, {
        sourceKey: 'buyingStationId',
        foreignKey: 'id',
        as: 'buyingStation',
      });

      this.belongsTo(models.Currency, {
        sourceKey: 'currency_id',
        foreignKey: 'currency_id',
        as: 'currency',
      });

      this.hasOne(models.CacaoCoffeePurchaseBuyer, {
        sourceKey: "buyer",
        foreignKey: "id",
        as: "coffeePurchaseBuyer",
      });
      
      this.belongsToMany(models.CoffeeVariety, {
        through: models.CoffeePurchaseOrderVarieties,
        foreignKey: 'coffee_purchase_id',
        otherKey: 'coffee_variety_id',
        as: 'coffeeVariety'
      }) 
    }
  }
  BuyingStationOrder.init(
    {
      orderCode: DataTypes.STRING,
      farmerId: DataTypes.INTEGER,
      farmId: {
        type: DataTypes.INTEGER
      },
      plantationId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      speciesId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      varietyId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      buyingStationId: DataTypes.INTEGER,
      currency_id: DataTypes.INTEGER,
      coffeeCherryQty: DataTypes.FLOAT,
      coffeeCherryQlty: DataTypes.ENUM('A', 'B', 'C', 'D', 'E'),
      coffeeCherryPic: DataTypes.JSON,
      perKgPrice: DataTypes.FLOAT,
      grandTotal: DataTypes.FLOAT,
      buyer:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      availableWeight: DataTypes.FLOAT,
      status: {
        type: DataTypes.ENUM('local', 'global', 'merged', 'new_user'),
        defaultValue: null,
      },
      purchasedAt: {
        type: DataTypes.DATEONLY,
        get() {
          const purchasedAt = this.getDataValue('purchasedAt');
          if (_.isEmpty(purchasedAt)) return null;
          return moment
            .utc(purchasedAt, process.env.DB_ONLYDATE_FORMAT)
            .format(process.env.ACCEPT_DATE_FORMAT);
        },
      },
      recordId: {type: DataTypes.STRING,  unique: true,},
      external_id: {
        type: DataTypes.STRING(20),
      },
      dateOfEntry: {
        type: DataTypes.VIRTUAL,
        get() {
          const createdAt = this.getDataValue('createdAt');
          if (!createdAt) return null;
          return moment.utc(createdAt).format(process.env.ACCEPT_DATE_FORMAT);
        },
      },
    },
    {
      sequelize,
      tableName: 'BuyingStationOrders',
      modelName: 'BuyingStationOrder',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return BuyingStationOrder;
};
