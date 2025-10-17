'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weeddata_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  weeddata_type.init({
    weedTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'weed_type',
        key: 'id',
      }
    },
    weedId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'weed',
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'weeddata_type',
  });
  return weeddata_type;
};