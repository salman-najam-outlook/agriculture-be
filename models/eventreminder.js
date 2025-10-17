'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventReminder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventReminder.init(
    {
      eventId: DataTypes.INTEGER,
      eventCalendarId: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      time: DataTypes.TIME,
      timeBefore: DataTypes.INTEGER,
      timeBeforeUnit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EventReminder',
      tableName: 'user_event_reminders',
    }
  );
  return EventReminder;
};
