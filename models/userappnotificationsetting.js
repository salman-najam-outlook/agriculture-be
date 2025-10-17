'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAppNotificationSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAppNotificationSetting.init(
    {
      userId: DataTypes.INTEGER,
      pushNotificationType: DataTypes.JSON,
      emailNotificationType: DataTypes.JSON,
      soundSetting: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'UserAppNotificationSetting',
      tableName: 'user_app_notification_settings',
    }
  );
  return UserAppNotificationSetting;
};
