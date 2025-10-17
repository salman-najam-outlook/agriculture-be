'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmBulkUpload extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'uploadedByUserId',
        targetKey: 'id',
        as: 'uploader',
      });

      this.hasMany(models.FarmBulkUploadRecord, {
        foreignKey: 'userFarmBulkUploadId',
        sourceKey: 'id',
        as: 'records',
      });
    }
  }

  FarmBulkUpload.init(
    {
      id: {
        type: DataTypes.BIGINT({ unsigned: true }),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      s3FileKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      uploadedByUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      totalRecordsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      failedRecordsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'user_farm_bulk_uploads',
      modelName: 'FarmBulkUpload',
    }
  );

  return FarmBulkUpload;
};
