"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FarmLocation extends Model {

    static associate(models) {
      this.belongsTo(models.user_farm, {
        foreignKey: 'farmId',
        targetKey: 'id',
      });

      this.hasOne(models.Geofence, {
        foreignKey: 'farmLocationId',
        as: 'mainGeofence'
      });

      this.hasMany(models.Geofence, {
        foreignKey: 'farmLocationId',
        as: 'zones'
      });
    }
   
  }

  FarmLocation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      address: {
        type: DataTypes.TEXT
      },
      area: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      areaUomId: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      },
      farmNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lat: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      log: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      parameter: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      farmId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: "user_farm_locations",
      modelName: "FarmLocation",
    }
  );

  return FarmLocation;
};
