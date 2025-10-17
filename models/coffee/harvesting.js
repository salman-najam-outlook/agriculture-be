'use strict';

const { Model } = require('sequelize');
const db = require(rootPath + '/models');

module.exports = (sequelize, DataTypes) => {
  class CoffeeHarvesting extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      });
      this.belongsTo(models.Plantations, {
        foreignKey: 'plantationId',
        targetKey: 'id',
        as: 'plantation'
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'coffeeYieldUnitId',
        targetKey: 'id',
        as: 'yieldUnit'
      });
      this.belongsTo(models.harvest_reason_for_loss, {
        foreignKey: 'reasonForLossId',
        targetKey: 'id',
        as: 'reasonForLoss'
      });
    }
  }
  CoffeeHarvesting.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      harvestingDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      plantationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      noOfTrees: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      quality: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      coffeeYield: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      coffeeYieldUnitId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      yieldLosses: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      reasonForLossId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      recordId: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
      tableName: 'CoffeeHarvesting',
      modelName: 'CoffeeHarvesting',
      // paranoid: true,
      // deletedAt: 'isDeleted',
    }
  );
  return CoffeeHarvesting;
};
