'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NFTSnapshot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.NFT, {
        as: 'NFT',
        foreignKey: 'nftId',
        targetKey: 'id',
      });

      this.hasMany(models.NFTSnapshotAttribute, {
        as: 'extraAttributes',
        foreignKey: 'snapshotId',
        sourceKey: 'id',
      });

      this.belongsTo(models.user, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user',
      });

      this.belongsTo(models.user_farm, {
        foreignKey: 'userFarmId',
        targetKey: 'id',
        as: 'farm',
      });

      this.belongsTo(models.Geofence, {
        foreignKey: 'geofenceId',
        targetKey: 'id',
        as: 'geofence',
      });
    }
  }
  NFTSnapshot.init(
    {
      nftId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null,
      },
      snapshottedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      submittedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      lng: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('Requested', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'Requested',
      },
      altitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      userFarmId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'user_farms',
          key: 'id',
        },
      },
      geofenceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'geofences',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'nft_snapshots',
      modelName: 'NFTSnapshot',
    }
  );
  return NFTSnapshot;
};
