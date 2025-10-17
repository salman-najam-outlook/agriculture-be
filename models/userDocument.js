"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userDocument.init(
    {
      userId: DataTypes.INTEGER,
      documentType: DataTypes.ENUM(
        "farm registration",
        "permit",
        "observation",
        "inspection form"
      ),
      fileName: DataTypes.STRING(100),
      documentName: DataTypes.STRING(300),
      extension: DataTypes.STRING(10),
      s3Key: DataTypes.STRING(200),
      docFor: DataTypes.ENUM("livestock", "farm", "crop", "none"),
    },
    {
      sequelize,
      modelName: "user_document",
    }
  );
  return userDocument;
};
