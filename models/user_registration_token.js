'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_registration_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_registration_token.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    device_registration_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserRegistrationToken',
    tableName: 'user_registration_tokens'
  });
  return user_registration_token;
};