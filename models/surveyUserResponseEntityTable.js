"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveyUserResponseEntityList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.surveysList, {
        as: 'survey',
        foreignKey: 'surveyId',
      });
      this.belongsTo(models.surveyUsersList, {
        as: 'surveyEntity',
        foreignKey: 'surveyUserListId',
      });
      this.hasMany(models.surveyQuestionsResponse, {
        as: 'response',
        foreignKey: 'surveyUserResponseEntityId',
      });
      this.belongsTo(models.user, {
        as: "farm",
        foreignKey: "farmId",
      });
      this.belongsTo(models.user_farm, {
        as: "farms",
        foreignKey: "farmId",
      })
    }
  }
  surveyUserResponseEntityList.init(
    {
      uuid: DataTypes.STRING,
      surveyId: DataTypes.INTEGER,
      surveyUserListId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      surveyStatus: DataTypes.BOOLEAN,
      status: DataTypes.ENUM("active", "inprogress", "submitted"),
      startDate: DataTypes.DATE,
      submittedDate: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "survey_user_response_entiity",
      modelName: "surveyUserResponseEntityList",
    }
  );
  return surveyUserResponseEntityList;
};