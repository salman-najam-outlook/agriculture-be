'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropStorageBagsStored extends Model {
    static associate(models) {
      this.belongsTo(models.UnitsList, { foreignKey: 'bagUom', as: 'bag_uom' });
    }
  }
  CropStorageBagsStored.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      cropStorageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'crop_storage',
          key: 'id',
        },
      },
      bagQty: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      bagUom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bagCount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'CropStorageBagsStored',
      tableName: 'crop_storage_bags_stored',
    }
  );
  return CropStorageBagsStored;
};
