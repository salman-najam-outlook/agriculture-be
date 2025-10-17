'use strict';

const { Model } = require('sequelize');
const AWSS3 = require(rootPath + '/components/s3.js');

module.exports = (sequelize, DataTypes) => {
  class SoilFertilityAudit extends Model {
    static associate(models) {

      this.belongsTo(models.Option, {
        foreignKey: 'soilTestingOftenId',
        as: 'soilTestingOften'
      });

      this.belongsTo(models.Option, {
        foreignKey: 'limingSchedule',
        as: 'limingSchedules'
      });

      this.belongsToMany(models.Option, {
        through: 'MapSoilFertilityAuditOptions',
        foreignKey: 'soilFertilityAuditId'
      });

      this.belongsToMany(models.Crop, {
        as: 'cropVariety',
        through: models.MapSoilFertilityAuditCrop,
        foreignKey: 'soilFertilityAuditId'
      });

      this.belongsTo(models.Option, {
        as: 'crop',
        foreignKey: 'cropType'
      });

      this.belongsToMany(models.Geofence, {
        as: 'segments',
        through: models.MapSoilFertilityAuditGeofences,
        foreignKey: 'soilFertilityAuditId'
      });

      this.belongsToMany(models.user_farm, {
        through: models.MapSoilFertilityAuditFarms,
        foreignKey: 'soilFertilityAuditId'
      });

    }
  }
  SoilFertilityAudit.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          const imageS3Key = this.getDataValue('fileUrl');
          return imageS3Key ? AWSS3.getAccessibleURL(imageS3Key, '/soilauditfile') : null;
        }
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      cropType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          as: 'crop',
          model: 'options',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      soilTestingNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      soilTestingOftenId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          as: 'soilTestingOften',
          model: 'options',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      mitigativeMeasure: {
        type: DataTypes.TEXT,
        allowNull: true,
        get(){
          const value = this.getDataValue('mitigativeMeasure');
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        },
        set(value){
          try {
            let data = JSON.stringify(value);
            this.setDataValue('mitigativeMeasure', data);
          } catch (e) {
            this.setDataValue('mitigativeMeasure', value);
          }
        }
      },
      soilFertilizersNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      applyLimeNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      limingSchedule: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          as: 'limingSchedules',
          model: 'options',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      organicInputsNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      produceOrganicInput: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      soilRisksNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      soilRiskMitigate: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      soilRiskMitigateMeasures: {
        type: DataTypes.STRING,
        allowNull: true
      },
      soilPractices: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'SoilFertilityAudit',
      tableName: 'soil_fertility_audit',
      hooks: {
        afterDestroy: (instance) => {
          if(instance && instance.fileUrl){
            AWSS3.deleteObject(instance.fileUrl, '/soilauditfile');
          }
        }
      }
    }
  );
  return SoilFertilityAudit;
};
