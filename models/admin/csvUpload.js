'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CsvUpload extends Model {

    static associate(models) {
     this.belongsTo(models.Organization, {
        foreignKey: 'subOrgId',
        as: 'subOrg',
        allowNull: true
      })

      this.belongsTo(models.Organization, {
        foreignKey: 'org_id',
        as: 'org',
        allowNull: true
      })
    }

  }
  CsvUpload.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      job_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      csv_url: {
        type: DataTypes.STRING,
        allowNull: true,

      },
      sales_manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      progress: {
        type: DataTypes.STRING,
        allowNull: true
      },
      s3_key: {
        type: DataTypes.STRING,
        allowNull: true
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },
      data_type: {
        type: DataTypes.ENUM(['user_uploaded', 'system_generated', 'key_assign_progress']),
        allowNull: false,
        defaultValue: 'user_uploaded'
      },
      org_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },
      },
      subOrgId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organizations',
          key: 'id',
        },
      },
      createdAt: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: true,
          type: DataTypes.DATE,
        },
    },
    {
      sequelize,
      modelName: 'csvUpload',
      tableName: 'csv_upload_jobs',
    }
  );
  return CsvUpload;
};
