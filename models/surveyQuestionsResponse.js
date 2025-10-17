"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveyQuestionsResponse extends Model {
    static associate(models) {
      this.belongsTo(models.surveyQuestions, {
        as: "responseQuestion",
        foreignKey: "questionId",
      });
      this.belongsTo(models.surveyQuestionOptions, {
        as: "option",
        foreignKey: "optionId",
      });
      this.belongsTo(models.user, {
        as: "user",
        foreignKey: "userId",
      });
      this.belongsTo(models.user, {
        as: "farm",
        foreignKey: "farmId",
      });
      this.belongsTo(models.surveysList, {
        as: "survey",
        foreignKey: "surveyId",
      });
      this.belongsTo(models.Option, {
        as: "crop",
        foreignKey: "cropId",
      });
      this.belongsTo(models.Geofence, {
        as: "geofence",
        foreignKey: "geofenceId",
      });
      this.belongsTo(models.Equipment, {
        as: "equipment",
        foreignKey: "equipmentId",
      });
      this.belongsTo(models.surveyUserResponseEntityList, {
        as: "response",
        targetKey: 'uuid',
        foreignKey: {
          type: DataTypes.STRING,
          name: 'surveyUserResponseEntityId'
        },
      });
    }
  }
  surveyQuestionsResponse.init(
    {
      surveyUserResponseEntityId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      surveyId: DataTypes.INTEGER,
      optionId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      geofenceId: DataTypes.INTEGER,
      equipmentId: DataTypes.INTEGER,
      cropId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      submittedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'deletedAt',
      tableName: "survey_questions_response",
      modelName: "surveyQuestionsResponse",
    }
  );
  return surveyQuestionsResponse;
};
