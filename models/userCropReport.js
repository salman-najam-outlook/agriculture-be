'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserCropReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  UserCropReport.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      comprehensiveCropTypeIds: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        comment: 'Array of crop type IDs used for comprehensive analysis',
      },
      comparisonCropTypeIds: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        comment: 'Array of crop type IDs used for comparison/recommendation',
      },
      reportType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'comprehensive',
        comment: 'Type of report generated (comprehensive, recommendation)',
      },
      reportData: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: 'The complete generated report data',
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en',
        comment: 'Language used for the report',
      },
    },
    {
      sequelize,
      tableName: 'user_crop_reports',
      modelName: 'UserCropReport',
    }
  );
  return UserCropReport;
}; 