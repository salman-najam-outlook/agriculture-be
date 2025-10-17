'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_point.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    cropRegId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_farm_crops',
        key: 'id',
      },
    },
    point: {
      type : DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type : DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'user_point',
  });
  return user_point;
};