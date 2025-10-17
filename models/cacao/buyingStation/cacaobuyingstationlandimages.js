'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoBuyingStationLandImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CacaoPurchaseOrder,{
        foreignKey:"purchase_id",
        targetKey:"id",
        as:"cacaoPurchaseOrder"
      })
    }
  }
  CacaoBuyingStationLandImages.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
    },
    purchase_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"CacaoPurchaseOrder",
        key:"id"
      }
    },
    file_name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    s3_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'cacao_buying_station_land_images',
    modelName: 'CacaoBuyingStationLandImages',
  });
  return CacaoBuyingStationLandImages;
};