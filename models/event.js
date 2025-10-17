'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.AppUserModuleRecommMap, {
        sourceKey: 'subModuleId',
        foreignKey: 'moduleId',
        as: 'moduleRecommendation',
      });
      this.hasMany(models.EventReminder, {
        foreignKey: 'eventId',
        as: 'eventReminders',
      })

      this.belongsToMany(models.Crop, {
        through: 'EventCropVarietyMap',
        foreignKey: 'eventId',
        otherKey: 'cropVarietyId',
      });

      this.hasOne(models.user_farm, {
        sourceKey: 'farmId',
        foreignKey: 'id',
      });

      this.hasOne(models.Geofence, {
        sourceKey: 'zoneId',
        foreignKey: 'id',
      });

      this.hasOne(models.Option, {
        sourceKey: 'cropTypeId',
        foreignKey: 'id',
        as: "cropType"
      });

      this.hasOne(models.AgronomicCalendarMetadata, {
        sourceKey: 'calendarMetadataId',
        foreignKey: 'id',
      });

      this.belongsTo(models.user, {
        foreignKey: "userId",
      });
    }
  }
  Event.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      moduleId: DataTypes.INTEGER,
      subModuleId: DataTypes.INTEGER,
      cropTypeId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      zoneId: DataTypes.INTEGER,
      tz: DataTypes.TEXT,
      calendarMetadataId: DataTypes.INTEGER,
      triggerDate: DataTypes.DATE,
      description: DataTypes.TEXT,
      colorPreference: DataTypes.STRING,
      addToGCal: DataTypes.BOOLEAN,
      repeat: DataTypes.ENUM(
        'no_repeat',
        'every_day',
        'every_week',
        'every_month',
        'every_year'
      ),
      reminder: DataTypes.JSON,
      startDateTime: DataTypes.DATE,
      endDateTime: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
      allDay: DataTypes.BOOLEAN,
      // dateForAlert: DataTypes.DATE, // hotfix for prod, uncomment later
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'user_events',
    }
  );
  return Event;
};
