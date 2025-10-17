"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveyUsersList extends Model {
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
      this.hasMany(models.surveyUserResponseEntityList, {
        as: "surveyEntity",
        foreignKey: "surveyUserListId",
      });
    }
  }
  surveyUsersList.init(
    {
      userId: DataTypes.INTEGER,
      surveyId: DataTypes.INTEGER,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      surveyListStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      tableName: "survey_users_list",
      modelName: "surveyUsersList",
    }
  );
  return surveyUsersList;
};
