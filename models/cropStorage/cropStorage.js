'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropStorage extends Model {
    static associate(models) {
      this.belongsToMany(models.user_farm, {
        through: 'CropStorageFarm',
        foreignKey: 'cropStorage',
        otherKey: 'farm',
        as: 'crop_storage_farm',
      });
      this.belongsToMany(models.Geofence, {
        through: 'CropStorageSegment',
        foreignKey: 'cropStorage',
        otherKey: 'segment',
        as: 'crop_storage_segment',
      });
      this.belongsTo(models.Option, {
        foreignKey: 'cropId',
        as: 'crop_storage_cropType',
      });
      this.belongsToMany(models.Crop, {
        through: 'StorageCropVariety',
        foreignKey: 'storage',
        otherKey: 'cropVariety',
        as: 'storage_cropVariety',
      });
      this.belongsTo(models.CropStorageMethod, {
        foreignKey: 'storageMethod',
        as: 'cropStorage_method',
      });
      this.belongsTo(models.CropStorageType, {
        foreignKey: 'storageType',
        as: 'cropStorage_type',
      });
      this.hasMany(models.CropStorageBagsStored, {
        foreignKey: 'cropStorageId',
        sourceKey: 'id',
        as: 'bags_stored',
      });
      this.hasOne(models.CropStorageCost, {
        foreignKey: 'cropStorage',
        as: 'cost',
      });
    }
  }
  CropStorage.init(
    {
      area: DataTypes.NUMBER,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      cropId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Option',
          key: 'id',
        },
      },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      durationOfStorage: DataTypes.NUMBER,
      yieldStored: DataTypes.NUMBER,
      didYieldStoredInBags: DataTypes.BOOLEAN,
      storageMethod: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_storage_method',
          key: 'id',
        },
      },
      storageType: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_storage_type',
          key: 'id',
        },
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
    },
    {
      sequelize,
      modelName: 'CropStorage',
      tableName: 'crop_storage',
    }
  );
  return CropStorage;
};
