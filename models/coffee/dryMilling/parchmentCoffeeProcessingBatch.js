'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParchmentCoffeeProcessingBatch extends Model {
    static associate(models) {
        this.belongsTo(models.ParchmentCoffee, {
            as: 'parchmentCoffee',
            foreignKey: 'parchmentCoffeeId',
            sourceKey: 'id',
        });
        this.belongsTo(models.BuyingStationProcessingBatch, {
            as: 'buyingStationProcessingBatch',
            foreignKey: 'buyingStationParchmentId',
            otherKey: 'batchCode',
            sourceKey: 'batchCode',
            targetKey: 'batchCode',
        });
    }
  }
  ParchmentCoffeeProcessingBatch.init(
    {
        parchmentCoffeeId: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        buyingStationParchmentId: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        huskCode: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        quantity: {
          allowNull: true,
          type: DataTypes.FLOAT,
        },
        quantityUnit: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        isdeleted: {
          type: DataTypes.DATE,
        },
    },
    {
      sequelize,
      tableName: 'parchment_coffee_processing_batches',
      modelName: 'ParchmentCoffeeProcessingBatch',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return ParchmentCoffeeProcessingBatch;
};
