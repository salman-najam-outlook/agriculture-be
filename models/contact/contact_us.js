'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact_us extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  contact_us.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    categoryId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'contact_us_category',
        key: 'id',
      },
    },
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'contact_us',
  });
  return contact_us;
};