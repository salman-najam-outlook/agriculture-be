// models/CarbonCreditSDG.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditSDG extends Model {
    static associate(models) {
      // define association here
      CarbonCreditSDG.belongsToMany(models.CarbonCreditProject, {
        through: models.CarbonCreditProjectSDG,
        foreignKey: 'sdg_id',
        otherKey: 'project_id',
        as: 'projects'
      });
    }
  }
  
  CarbonCreditSDG.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Path or URL to the SDG icon'
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recordId'
    },
  }, {
    sequelize,
    modelName: 'CarbonCreditSDG',
    tableName: 'carbon_credit_sdgs',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return CarbonCreditSDG;
};