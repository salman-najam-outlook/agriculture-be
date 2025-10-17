'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NFTSnapshotAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.NFTSnapshot, {
        as: 'snapshot',
        foreignKey: 'snapshotId',
        targetKey: 'id',
      });
    }
  }

  NFTSnapshotAttribute.init(
    {
      snapshotId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      traitType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxValue: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null,
      },
      displayType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: 'nft_snapshot_attributes',
      modelName: 'NFTSnapshotAttribute',
      indexes: [
        {
          fields: ['snapshotId', 'traitType'],
          unique: true,
          name: 'snapshotId_traitType_unique',
        },
      ],
    }
  );
  return NFTSnapshotAttribute;
};
