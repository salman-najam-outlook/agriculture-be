'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AgronomicCalendarMetadata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here, if any
      this.belongsTo(models.Option, {
        foreignKey: 'cropTypeId',
        as: 'cropType',
      });

      this.belongsTo(models.Modules, {
        foreignKey: 'moduleId',
        as: 'module',
      });
    }
  }
  AgronomicCalendarMetadata.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cropTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      cropName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      triggerActivity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      moduleId: {
        type: DataTypes.STRING,
        references: {
          model: 'modules',
          key: 'id',
        },
        allowNull: true,
      },
      triggerActivityStartDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      triggerActivityEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      subActivity: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,

      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,

      },
      deletedAt: {
        allowNull: false,
        type: DataTypes.DATE,

      },
    },
    {
      sequelize,
      modelName: 'AgronomicCalendarMetadata',
      tableName: 'agronomic_calendar_metadata',
    }
  );
  return AgronomicCalendarMetadata;
};
