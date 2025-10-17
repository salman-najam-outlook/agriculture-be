'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditProjectModule extends Model {
    static associate(models) {
      // Define association here
      CarbonCreditProjectModule.belongsTo(models.CarbonCreditProject, {
        foreignKey: 'project_id',
        as: 'project'
      });
    }
  }
  
  CarbonCreditProjectModule.init({
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
    module_name: {
      type: DataTypes.ENUM(
        "sowing",
        "seeding", 
        "harvesting",
        "fertilizers",
        "equipment"
      ),
      allowNull: false
    },
    recurring_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recurring_period: {
      type: DataTypes.ENUM(
        "Y",
        "M"
      ),
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    approval: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CarbonCreditProjectModule',
    tableName: 'carbon_credit_projects_modules',
    timestamps: false,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return CarbonCreditProjectModule;
};