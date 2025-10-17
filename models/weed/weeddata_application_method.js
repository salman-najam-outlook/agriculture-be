'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weeddata_application_method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  weeddata_application_method.init({
    weedApplicationMethodId: {
      type: DataTypes.INTEGER,
      field: 'weedApplicationMethodId',
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
    modelName: 'weeddata_application_method',
  });
  return weeddata_application_method;
};
