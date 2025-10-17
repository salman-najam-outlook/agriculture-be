'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weeddata_method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  weeddata_method.init({
    weedMethodId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'weed_methods',
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
    modelName: 'weeddata_method',
  });
  return weeddata_method;
};