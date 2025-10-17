// models/CarbonCreditProjectVintage.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditProjectVintage extends Model {
    static associate(models) {
      // define association here
      CarbonCreditProjectVintage.belongsTo(models.CarbonCreditProject, {
        foreignKey: 'project_id',
        as: 'project'
      });
    }
  }
  
  CarbonCreditProjectVintage.init({
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
    vintage_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_of_credits_estimated: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_per_credit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recordId'
    },
  }, {
    sequelize,
    modelName: 'CarbonCreditProjectVintage',
    tableName: 'carbon_credit_project_vintages',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return CarbonCreditProjectVintage;
};