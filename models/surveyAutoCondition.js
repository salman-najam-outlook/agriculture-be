"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveyAutoCondition extends Model {
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
    }
  }
  surveyAutoCondition.init(
    {
      userId: DataTypes.INTEGER,
      membershipTypeId: DataTypes.INTEGER,
      membershipValidity: DataTypes.STRING(100),
      remainingDays: DataTypes.INTEGER,
      condtionStatus: DataTypes.BOOLEAN,
      accountProgress: DataTypes.INTEGER
    },
    {
      sequelize,
      tableName: "survey_auto_condition",
      modelName: "surveyAutoCondition"
    }
  );
  return surveyAutoCondition;
};
