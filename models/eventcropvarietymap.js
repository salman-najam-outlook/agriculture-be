'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventCropVarietyMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.Event, {
        foreignKey: 'eventId',
        targetKey: 'id',
        as: 'eventCrop'
      });

      this.belongsTo(models.Crop, {
        foreignKey: 'cropVarietyId',
        targetKey: 'id',
        as: 'cropEvent'
      });
    }
  }
  EventCropVarietyMap.init(
    {
      eventId: DataTypes.INTEGER,
      cropVarietyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'EventCropVarietyMap',
      tableName: 'user_event_crop_variety_maps',
    }
  );
  return EventCropVarietyMap;
};
