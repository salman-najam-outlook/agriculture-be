'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InboundWarehouseCupping extends Model {}
  InboundWarehouseCupping.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      inbound_warehouse_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      cupping_name: {
        type: DataTypes.STRING,
      },
      fragrance: {
        type: DataTypes.STRING,
      },
      cupping_time: {
        type: DataTypes.STRING,
      },
      aromas: {
        type: DataTypes.STRING,
      },
      flavour: {
        type: DataTypes.STRING,
      },
      acidity: {
        type: DataTypes.STRING,
      },
      acidity_range: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.STRING,
      },
      body_range: {
        type: DataTypes.STRING,
      },
      after_taste: {
        type: DataTypes.STRING,
      },
      balance: {
        type: DataTypes.STRING,
      },
      
      balance_range: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.STRING,
      },
      final_score: {
        type: DataTypes.STRING,
      },
      roasting_time: {
        type: DataTypes.STRING,
      },
      roasting_temperature: {
        type: DataTypes.STRING,
      },
      roasting_temperature_unit: {
        type: DataTypes.STRING,
      },
      qualities: {
        type: DataTypes.STRING,
      },
      uniformity: {
        type: DataTypes.STRING,
      },
      clean_cup: {
        type: DataTypes.STRING,
      },
      sweetness: {
        type: DataTypes.STRING,
      },
      defect_cups: {
        type: DataTypes.STRING,
      },
      defect_intensity: {
        type: DataTypes.STRING,
      },
      fragrance_break: {
        type: DataTypes.STRING,
      },
      fragrance_dry: {
        type: DataTypes.STRING,
      },
      fragrance_qualities: {
        type: DataTypes.STRING,
      },
      flavour_qualities: {
        type: DataTypes.STRING,
      },
      after_taste_qualities: {
        type: DataTypes.STRING,
      },
      acidity_intensity: {
        type: DataTypes.STRING,
      },
      acidity_qualities: {
        type: DataTypes.STRING,
      },
      body_level: {
        type: DataTypes.STRING,
      },
      body_qualities: {
        type: DataTypes.STRING,
      },
      overall: {
        type: DataTypes.STRING,
      },
      defect_value: {
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
      tableName: 'inbound_warehouse_cupping',
      modelName: 'InboundWarehouseCupping',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return InboundWarehouseCupping;
};
