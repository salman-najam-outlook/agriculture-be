'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserNotification.init(
    {
      notificationId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      seen: DataTypes.ENUM('1', '0'),
    },
    {
      sequelize,
      tableName: 'user_notifications',
      modelName: 'UserNotification',
    }
  );
  return UserNotification;
};
