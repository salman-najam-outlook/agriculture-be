'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Crop extends Model {
    // Crop table belongs to crop variety - i.e not crop type
    static associate(models) {
      this.hasMany(models.Sowing, {
        foreignKey: 'cropId'
      });
      this.hasMany(models.Soil_prep_practice, { foreignKey: 'cropId'});
      this.hasMany(models.CropVariety, { foreignKey: 'cropId', as: 'varieties'});
      this.hasOne(models.EventCropVarietyMap, {
        foreignKey: 'cropVarietyId',
        sourceKey: 'id',
        as: 'cropEventMap',
      });
    }
  }
  Crop.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      countryId: DataTypes.INTEGER,
      cropTypeOptId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'crops',
      modelName: 'Crop'
    }
  );

  Crop.addHook('afterBulkCreate', (instances, options) => {
    const createdIds = instances.map(instance => instance.id);

    // Add your custom logic here, such as logging, notifications, or other processing
  });
  return Crop;
};
