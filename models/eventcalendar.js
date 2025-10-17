'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Event, { foreignKey: 'eventId', as: 'eventDetail' });
    }
  }
  EventCalendar.init(
    {
      eventId: DataTypes.INTEGER,
      startDateTime: DataTypes.DATE,
      endDateTime: DataTypes.DATE,
      dailyDate: DataTypes.DATE,
      reminders: DataTypes.JSON,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'EventCalendar',
      tableName: 'user_event_calendars',
    }
  );
  return EventCalendar;
};
