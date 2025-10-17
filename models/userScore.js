'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'users',
      });
      this.hasMany(models.UserScoreSurveyResponse, {
        as: 'responses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'userScoreId',
        sourceKey: 'id',
      });
    }
  }
  UserScore.init(
    {
      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: 'user_scores',
      modelName: 'UserScore',
    }
  );
  return UserScore;
};
