// models/CarbonCreditProjectAttachment.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditProjectAttachment extends Model {
    static associate(models) {
      // define association here
      CarbonCreditProjectAttachment.belongsTo(models.CarbonCreditProject, {
        foreignKey: 'project_id',
        as: 'project'
      });
    }
  }
  
  CarbonCreditProjectAttachment.init({
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
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Original name of the uploaded file'
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recordId'
    },
    file_type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Type of file (e.g., image/jpeg, application/pdf)'
    },
    s3_url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'URL to the file in S3'
    }
  }, {
    sequelize,
    modelName: 'CarbonCreditProjectAttachment',
    tableName: 'carbon_credit_project_attachments',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return CarbonCreditProjectAttachment;
};
