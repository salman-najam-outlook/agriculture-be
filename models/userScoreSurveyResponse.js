'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserScoreSurveyResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserScore, {
        foreignKey: 'userScoreId',
        sourceKey: 'id',
        as: 'score',
      });
    }
  }
  UserScoreSurveyResponse.init(
    {
      userScoreId: {
        type: DataTypes.BIGINT({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'user_scores',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      questionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answerIdOrValue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'user_score_survey_responses',
      modelName: 'UserScoreSurveyResponse',
    }
  );
  return UserScoreSurveyResponse;
};
