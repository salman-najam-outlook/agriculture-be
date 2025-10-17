'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cacaoDryMillingProduction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cacaoDryMillingProduction.init({
    buyingStationId: DataTypes.INTEGER,
    targetVal:DataTypes.FLOAT,
    year:DataTypes.SMALLINT,
    recordId:DataTypes.STRING,
    isdeleted:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'cacaoDryMillingProduction',
    tableName: 'cacao_dry_milling_productions'
  });
  return cacaoDryMillingProduction;
};