'use strict';
const moment = require('moment');
const _ = require('lodash');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuyingStationProcessingBatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.BuyingStationOrder, {
        through: 'BuyingStationProcessingBatchAndOrder',
        foreignKey: 'processingBatchId',
        otherKey: 'orderId',
        as: 'buyingStationOrder',
      });

      this.hasOne(models.user, {
        sourceKey: 'buyingStationId',
        foreignKey: 'id',
        as: 'buyingStation',
      });
      this.belongsTo(models.ProcessingType, {
        foreignKey: 'processingTypeId',
        targetKey: 'id',
        as: 'processingType'
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'temperatureUnitId',
        targetKey: 'id',
        as: 'temperatureUnit'
      });
      this.hasMany(models.ParchmentCoffeeProcessingBatch, {
        foreignKey: 'buyingStationParchmentId',
        sourceKey: 'batchCode',
        as: 'parchmentCoffeeProcessingBatches',
      });
    }
  }
  BuyingStationProcessingBatch.init(
    {
      batchCode: DataTypes.STRING,
      buyingStationId: DataTypes.INTEGER,
      startDate: {
        type: DataTypes.DATEONLY,
        get() {
          const startDate = this.getDataValue('startDate');
          if (_.isEmpty(startDate)) return null;
          return moment
            .utc(startDate, process.env.DB_ONLYDATE_FORMAT)
            .format(process.env.ACCEPT_DATE_FORMAT);
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        get() {
          const endDate = this.getDataValue('endDate');
          if (_.isEmpty(endDate)) return null;
          return moment
            .utc(endDate, process.env.DB_ONLYDATE_FORMAT)
            .format(process.env.ACCEPT_DATE_FORMAT);
        },
      },
      totalCoffeeCherryQty: DataTypes.FLOAT,
      humidity: DataTypes.FLOAT,
      temperature: DataTypes.FLOAT,
      temperatureUnitId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      waterContent: DataTypes.FLOAT,
      batchRating: DataTypes.ENUM('Platinum', 'Gold', 'Silver', 'Bronze', 'A', 'B', 'C', 'D', 'E',),
      recordId: DataTypes.STRING,
      isdeleted: DataTypes.DATE,
      usedForWarehouse: DataTypes.BOOLEAN,
      parchmentTarget: {
        type: DataTypes.FLOAT,
      },
      processingTypeId: {
        type: DataTypes.INTEGER,
      },
      parchmentOut: {
        type: DataTypes.FLOAT,
      },
      density: {
        type: DataTypes.FLOAT,
      },
      wasHuskProduced: {
        type: DataTypes.BOOLEAN,
      },
      quantityOfHusk: {
        type: DataTypes.DOUBLE,
      },
      huskCode: DataTypes.STRING,
      external_id: {
        type: DataTypes.STRING(20),
      },
      husk_external_id: {
        type: DataTypes.STRING(20),
      },
      parchmentReady: {
        type: DataTypes.VIRTUAL,
        get() {
          const endDate = this.getDataValue('endDate');
          return (
            moment
              .utc()
              .isAfter(moment.utc(endDate, process.env.DB_ONLYDATE_FORMAT)) ||
            false
          );
        },
      },
    },
    {
      sequelize,
      modelName: 'BuyingStationProcessingBatch',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return BuyingStationProcessingBatch;
};