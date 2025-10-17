'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserNotification, {
        foreignKey: 'notificationId',
        sourceKey: 'id',
        as: 'notificationTo',
      });
      this.belongsToMany(models.user, {
        through: 'UserNotification',
        foreignKey: 'notificationId',
        otherKey: 'userId',
        as: 'notificationFor',
      });
      this.hasOne(models.user, {
        foreignKey: 'id',
        sourceKey: 'userId',
        as: 'notificationBy',
      });
    }
  }
  Notification.init(
    {
      notify: DataTypes.ENUM('user', 'admin'),
      message: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      type:DataTypes.STRING,
      title:DataTypes.STRING,
      data: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'notifications',
      modelName: 'Notification',
    }
  );
  return Notification;
};
