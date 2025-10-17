// models/CarbonCreditProject.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditProject extends Model {
    static associate(models) {
      // define association here
      CarbonCreditProject.hasMany(models.CarbonCreditProjectAttachment, {
        foreignKey: 'project_id',
        as: 'attachments'
      });
      
      CarbonCreditProject.hasMany(models.CarbonCreditProjectVintage, {
        foreignKey: 'project_id',
        as: 'vintages'
      });

      CarbonCreditProject.hasMany(models.CarbonCreditProjectModule, {
        foreignKey: 'project_id',
        as: 'modules'
      });
      
      CarbonCreditProject.belongsToMany(models.CarbonCreditSDG, {
        through: models.CarbonCreditProjectSDG,
        foreignKey: 'project_id',
        otherKey: 'sdg_id',
        as: 'sdgs'
      });

      CarbonCreditProject.belongsToMany(models.user_farm, {
        through: models.CarbonCreditProjectFarm,
        foreignKey: 'project_id',
        otherKey: 'farm_id',
        as: 'farms'
      });

      CarbonCreditProject.belongsToMany(models.Organization, {
        through: models.CarbonCreditProjectOrganization,
        foreignKey: 'project_id',
        otherKey: 'organization_id',
        as: 'organizations'
      });

      CarbonCreditProject.belongsTo(models.DimitraOffice, {
        foreignKey: "dimitra_office_id",
        as: "office"
      });
    }
  }
  
  CarbonCreditProject.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    project_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_type: {
      type: DataTypes.ENUM(
        "agroforestry",
        "regenerative_agriculture",
        "forestry"
      ),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(
        "proposed",
        "planned",
        "in_progress",
        "operational",
        "deactivate"
      ),
      allowNull: false
    },
    credit_type: {
      type: DataTypes.ENUM("removal", "avoided"),
      allowNull: false
    },
    credit_start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    credit_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    standard_methodology: {
      type: DataTypes.STRING,
      allowNull: true
    },
    validation_documentation: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "S3 Key to uploaded validation document"
    },
    agreement: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "S3 Key to uploaded agreement pdf"
    },
    header_image: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "S3 Key to uploaded header image"
    },
    vintage_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USD",
      comment: "Currency for vintage prices"
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recordId'
    },
    total_credit_generated: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dimitra_office_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "dimitra_offices",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  }, {
    sequelize,
    modelName: 'CarbonCreditProject',
    tableName: 'carbon_credit_projects',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return CarbonCreditProject;
};