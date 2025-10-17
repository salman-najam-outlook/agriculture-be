'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class harvest_variety extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  harvest_variety.init({
    varietyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'crops',
        key: 'id',
      },
    },
    harvestId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'harvest',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'harvest_variety',
  });
  return harvest_variety;
};