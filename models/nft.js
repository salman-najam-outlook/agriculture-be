'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.NFTSnapshot, {
        foreignKey: 'nftId',
        sourceKey: 'id',
        as: 'snapshots',
      });
    }
  }
  NFT.init(
    {
      metadataFilePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'nfts',
      modelName: 'NFT',
    }
  );
  return NFT;
};
