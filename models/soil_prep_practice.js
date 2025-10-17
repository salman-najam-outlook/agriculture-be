'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Soil_prep_practice extends Model {
    static associate(models) {
      this.belongsToMany(models.Geofence, {
        as: 'segments',
        through: models.Soil_prep_practice_geofences,
        foreignKey: 'soil_prep_practiceId'
      });

      this.belongsToMany(models.Crop, {
        through: models.MapSoilPrepPracticeCrop,
        foreignKey: 'soil_prep_practiceId'
      });

      this.belongsTo(models.UnitsList, {
        as: 'areaunit',
        foreignKey: 'areaUnitId'
      });


      this.belongsToMany(models.user_farm, {
        through: models.MapSoilPrepPracticeFarms,
        foreignKey: 'soil_prep_practiceId'
      });

      this.belongsToMany(models.Soil_prep_activity, {
        through: models.MapSoilPrepPracticeActivity,
        foreignKey: 'soil_prep_practiceId',
        otherKey: 'activityId',
        as: 'soilPrepActivities'
      });

      this.belongsToMany(models.Equipment, {
        through: models.Soil_prep_practice_equipments,
        foreignKey: 'soil_prep_practiceId'
      });

      this.belongsToMany(models.SoilType, {
        through: models.Soil_prep_practice_soil_type,
        foreignKey: 'soil_prep_practiceId'
      });

      this.belongsTo(models.user, { foreignKey: 'userId'});
      this.belongsTo(models.Soil_prep_activity, { as: 'activities', foreignKey: 'activityId'});
      this.belongsTo(models.Option, { foreignKey: 'cropId'});
      this.hasOne(models.SoilPrepPracticeCost, {
        foreignKey: 'soil_prep_practiceId',
        as: 'cost',
      });
    }
  }
  Soil_prep_practice.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      days: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      area: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      areaUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userId: DataTypes.INTEGER,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      cropId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { model: 'crops', key: 'id' },
        onDelete: 'CASCADE'
      },
      activityId: {
        type: DataTypes.INTEGER
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'soil_prep_practice',
      modelName: 'Soil_prep_practice'
    }
  );
  return Soil_prep_practice;
};
