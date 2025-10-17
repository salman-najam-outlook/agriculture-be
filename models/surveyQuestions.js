"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveyQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.surveysList, {
        as: "surveysTitle",
        foreignKey: "surveyId",
      });
      this.hasMany(models.surveyQuestionOptions, {
        as: "questionOptions",
        foreignKey: "questionId",
      });
      this.hasMany(models.surveyQuestionOptions, {
        as: "nestedQuestionOptions",
        foreignKey: "nestedQuestionId",
      });
      this.hasOne(models.surveyQuestionOptions, {
        as: "nestedQuestion",
        foreignKey: "nestedQuestionId",
      });
      this.hasMany(models.surveyQuestionsResponse, {
        as: "surveyQuestionsResponse",
        foreignKey: "questionId",
      });
    }
  }
  surveyQuestions.init(
    {
      surveyId: DataTypes.INTEGER,
      question: DataTypes.STRING,
      questionType: DataTypes.STRING(100),
      resource: DataTypes.STRING(100),
      isMultiSelection: DataTypes.BOOLEAN,
      isDisabled: DataTypes.BOOLEAN,
      mandatory: DataTypes.BOOLEAN,
      isQuestionScore: DataTypes.BOOLEAN,
      isNestedQuestion: DataTypes.BOOLEAN,
      scores: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "survey_questions",
      modelName: "surveyQuestions",
    }
  );
  return surveyQuestions;
};
