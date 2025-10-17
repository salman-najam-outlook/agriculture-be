"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SoilInformationFarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_farm, {
        foreignKey: "farmId",
        as: "farm",
      });
      this.belongsTo(models.SoilInformation, {
        foreignKey: "soilInformationId",
        as: "soilInformation",
      });
    }
  }
  SoilInformationFarm.init(
    {
      farmId: DataTypes.INTEGER,
      soilInformationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "soil_information_farm",
      modelName: "SoilInformationFarm",
      paranoid:true,
      deletedAt: 'deletedAt'
    }
  );
  return SoilInformationFarm;
};
