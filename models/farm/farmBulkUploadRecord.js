'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmBulkUploadRecord extends Model {
    static associate(models) {
      this.belongsTo(models.FarmBulkUpload, {
        foreignKey: 'userFarmBulkUploadId',
        targetKey: 'id',
        as: 'farmBulkUpload',
      });
    }
  }

  FarmBulkUploadRecord.init(
    {
      id: {
        type: DataTypes.BIGINT({ unsigned: true }),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userFarmBulkUploadId: {
        type: DataTypes.BIGINT({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'user_farm_bulk_uploads',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      errorMessage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payloadJsonData: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      recordedJsonData: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'user_farm_bulk_upload_records',
      modelName: 'FarmBulkUploadRecord',
    }
  );

  return FarmBulkUploadRecord;
};
