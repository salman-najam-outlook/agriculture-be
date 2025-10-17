'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservation extends Model {
    static associate(models) {
      this.belongsTo(models.Option, {
        foreignKey: 'cropType',
        as: 'cropObservation_cropType',
      });
      this.belongsTo(models.Option, {
        foreignKey: 'cropSeason',
        as: 'cropObservation_cropSeason',
      });
      this.belongsTo(models.CropObservationGrowthStage, {
        foreignKey: 'growthStage',
        as: 'cropObservation_growthStage',
      });
      this.belongsTo(models.CropObservationLeafSize, {
        foreignKey: 'leafSize',
        as: 'cropObservation_leafSize',
      });
      this.belongsTo(models.CropObservationJointType, {
        foreignKey: 'jointType',
        as: 'cropObservation_jointType',
      });
      this.belongsToMany(models.user_farm, {
        through: 'CropObservationFarm',
        foreignKey: 'observation',
        otherKey: 'farm',
        as: 'cropObservation_farm',
      });
      this.belongsToMany(models.Geofence, {
        through: 'CropObservationSegment',
        foreignKey: 'observation',
        otherKey: 'segment',
        as: 'cropObservation_segment',
      });
      this.belongsToMany(models.CropObservationDisease, {
        through: 'CropObservationDiseaseList',
        foreignKey: 'observation',
        otherKey: 'disease',
        as: 'cropObservation_diseases',
      });
      this.belongsToMany(models.CropObservationDeficiency, {
        through: 'CropObservationDeficiencyList',
        foreignKey: 'observation',
        otherKey: 'deficiency',
        as: 'cropObservation_deficiency',
      });
      this.belongsToMany(models.CropObservationPestInfestation, {
        through: 'CropObservationPestInfestationList',
        foreignKey: 'observation',
        otherKey: 'pestInfestation',
        as: 'cropObservation_pestInfestation',
      });
      this.belongsToMany(models.CropObservationToxicity, {
        through: 'CropObservationToxicityList',
        foreignKey: 'observation',
        otherKey: 'toxicity',
        as: 'cropObservation_toxicity',
      });
      this.belongsToMany(models.Crop, {
        through: 'CropObservationVariety',
        foreignKey: 'observation',
        otherKey: 'cropVariety',
        as: 'cropObservation_cropVariety',
      });
      this.hasOne(models.CropObservationCost, {
        foreignKey: 'observationId',
        as: 'cost',
      });
    }
  }
  CropObservation.init(
    {
      recordId: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      areaPlanted: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      cropType: {
        type: DataTypes.INTEGER,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      cropSeason: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      dateOfObservation: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      growthStage: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation_growth_stage',
          key: 'id',
        },
      },
      germinationRate: {
        type: DataTypes.DOUBLE,
      },
      leafColor: DataTypes.STRING,
      leafSize: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation_leaf_size',
          key: 'id',
        },
      },
      stemColor: DataTypes.STRING,
      stemThickness: DataTypes.DOUBLE,
      plantHeight: DataTypes.DOUBLE,
      tillerNumber: DataTypes.DOUBLE,
      appreanceOfFlower: DataTypes.STRING,
      jointType: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation_joint_type',
          key: 'id',
        },
      },
      notes: DataTypes.TEXT,
      doc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CropObservation',
      tableName: 'crop_observation',
    }
  );
  return CropObservation;
};
