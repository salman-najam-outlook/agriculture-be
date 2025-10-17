"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveysList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        as: 'CreatedBy',
        foreignKey: 'userId',
      });
      this.hasMany(models.surveyUsersList, {
        as: 'surveySelectedUsers',
        foreignKey: 'surveyId',
      });     
      this.hasMany(models.surveyQuestions, {
        as: 'surveyQuestions',
        foreignKey: 'surveyId',
      });
      this.hasMany(models.surveyQuestionsResponse, {
        as: 'surveyResponse',
        foreignKey: 'surveyId',
      });
    }
  }
  surveysList.init(
    {
      userId: DataTypes.INTEGER,
      parentId: DataTypes.INTEGER,
      organization: {
        type: DataTypes.INTEGER,
        references: {
          model: 'organization',
          key: 'id',
        },
      },
      title: DataTypes.STRING(100),
      description: DataTypes.TEXT,
      isScheduled: DataTypes.BOOLEAN,
      scheduledDate: DataTypes.STRING(100),
      isMultistep: DataTypes.BOOLEAN,
      questionForEachStep: DataTypes.INTEGER,
      surveyStatus: DataTypes.BOOLEAN,
      status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Completed'),
        allowNull: false,
        defaultValue: 'Inactive'
      },
      isSelectedUsers: DataTypes.BOOLEAN,
      linkedWithFarms: DataTypes.BOOLEAN,
      isDeleted: DataTypes.BOOLEAN,
      scheduledEndDate: DataTypes.STRING(100),
    },
    {
      sequelize,
      tableName: "surveys_list",
      modelName: "surveysList",
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );
  return surveysList;
};
