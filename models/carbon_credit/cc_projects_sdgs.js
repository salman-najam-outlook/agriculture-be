// models/CarbonCreditProjectSDG.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditProjectSDG extends Model {
    static associate(models) {}
  }
  
  CarbonCreditProjectSDG.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carbon_credit_projects',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    sdg_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carbon_credit_sdgs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recordId'
    },
  }, {
    sequelize,
    modelName: 'CarbonCreditProjectSDG',
    tableName: 'carbon_credit_projects_sdgs',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return CarbonCreditProjectSDG;
};