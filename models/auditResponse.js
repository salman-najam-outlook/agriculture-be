"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuditResponse.init(
    {
      userId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      category: DataTypes.ENUM("livestock", "crop"),
      auditId: DataTypes.INTEGER,
      question: DataTypes.STRING,
      auditStatus: DataTypes.ENUM("1", "0"),
    },
    {
      sequelize,
      tableName: "audit_responses",
      modelName: "AuditResponse",
    }
  );
  return AuditResponse;
};
