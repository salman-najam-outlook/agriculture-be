'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weed_crop_vatiety extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  weed_crop_vatiety.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    varietyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'crops',
        key: 'id',
      },
    },
    weedId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'weed',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'weed_crop_vatieties',
    modelName: 'weed_crop_vatiety',
  });
  return weed_crop_vatiety;
};