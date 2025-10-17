'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationJointType extends Model {
    static associate(models) {}
  }
  CropObservationJointType.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CropObservationJointType',
      tableName: 'crop_observation_joint_type',
      timestamps: false,
    }
  );
  return CropObservationJointType;
};
