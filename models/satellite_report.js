'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class satellite_report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Option, {
        foreignKey: 'cropType',
        as: 'cropObservation_cropType',
      });

      this.belongsTo(models.user_farm, {
        foreignKey: 'farmId',
        as: 'farm',
      });

      this.belongsTo(models.Geofence, {
        foreignKey: 'geofenceId',
        as: 'geofence',
      });
    }
  };
  satellite_report.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    reportType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dateOfInterest: {
        allowNull: false,
        type: DataTypes.DATE
      },
      cropType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'options',
          key: 'id',
        }
      },
      zoomLevel: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      centerLatitude : {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      centerLongitude : {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      radius : {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      sowingDate: {
        allowNull: true,
        type: DataTypes.STRING
      },
      harvestingDate: {
        allowNull: true,
        type: DataTypes.STRING
      },
      satelliteSource : {
        type: DataTypes.STRING,
        allowNull: true
      },
      inputImage: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      inputImgS3Key: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      geoImagePath: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      shortImagePath: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      reportPDFPath: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cropTypeName: {
        allowNull: true,
        type: DataTypes.STRING
      },
      reportS3Key: {
        allowNull: true,
        type: DataTypes.STRING
      },
      cropVariety: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      farmId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      geofenceId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      cropVarietyName: {
        allowNull: true,
        type: DataTypes.STRING
      },
      reportName: {
        allowNull: true,
        type: DataTypes.STRING
      },
      requestId: {
        allowNull: true,
        type: DataTypes.STRING
      },
      locationName: {
        allowNull: true,
        type: DataTypes.STRING
      },
      segment: {
        allowNull: true,
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM(
          'FAILED',
          'PENDING',
          'IN-PROGRESS',
          'COMPLETED',
          'INVALID-LOCATION',
          'DATA-NOT-AVAILABLE',
          'DATA-DOWNLOAD-FAILED'
        ),
        defaultValue: 'PENDING',
        allowNull: true
      },
      ingestionDate: {
        type: DataTypes.DATEONLY,
      },
      language: {
        type: DataTypes.STRING,
      },
      reportGroup: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Satellite Report',
      },
      maxCloudCoverage: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      generatedByUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      pngS3Key: {
        type: DataTypes.STRING,
        allowNull: true
      },
      message: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
      },
  }, {
    sequelize,
    modelName: 'satellite_report',
  });
  return satellite_report;
};