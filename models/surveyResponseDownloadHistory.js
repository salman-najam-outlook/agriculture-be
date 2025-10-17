"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveyResponseDownloadHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        as: "users",
        foreignKey: "userId",
      });
      this.belongsTo(models.surveysList, {
        as: "survey",
        foreignKey: "surveyId",
      });

    }
  }
  surveyResponseDownloadHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    surveyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'surveys_list',
            key: 'id'
        }
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    jobId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,

    }
    },
    {
      sequelize,
      tableName: "survey_response_download_history",
      modelName: "surveyResponseDownloadHistory",
    }
  );
  return surveyResponseDownloadHistory;
};
