'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoBuyingStationProduction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CacaoBuyingStationProduction.init({
    buyingStationId: DataTypes.INTEGER,
    targetVal:DataTypes.FLOAT,
    year:DataTypes.SMALLINT,
    recordId:DataTypes.STRING,
    isdeleted:DataTypes.DATE,
  }, {
    sequelize,
    paranoid:true,
    deletedAt:"isdeleted",
    tableName: 'cacao_buying_station_productions',
    modelName: 'CacaoBuyingStationProduction',
  });
  return CacaoBuyingStationProduction;
};