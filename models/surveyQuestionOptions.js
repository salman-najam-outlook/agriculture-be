"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveyQuestionOptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.surveyQuestionsResponse, {
        as: 'surveyQuestionsResponse',
        foreignKey: 'optionId',
      });
      this.belongsTo(models.surveyQuestions, {
        as: 'question',
        foreignKey: 'questionId',
      });
      this.belongsTo(models.surveyQuestions, {
        as: 'nestedQuestions',
        foreignKey: 'nestedQuestionId',
      });
      this.hasOne(models.surveyQuestionsResponse, {
        as: "option",
        foreignKey: "optionId",
      });
    }
  }
  surveyQuestionOptions.init(
    {
      questionId: DataTypes.INTEGER,
      surveyId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      scores: DataTypes.INTEGER,
      isDisabled: DataTypes.BOOLEAN,
      nestedQuestionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "survey_question_options",
      modelName: "surveyQuestionOptions",
    }
  );
  return surveyQuestionOptions;
};
