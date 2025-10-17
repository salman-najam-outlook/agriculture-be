"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SoilInformationSoilType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.SoilType, {
        foreignKey: "soilTypeId",
        as: "soilType",
      });
      this.belongsTo(models.SoilInformation, {
        foreignKey: "soilInformationId",
        as: "soilInformation",
      });
    }
  }
  SoilInformationSoilType.init(
    {
      soilTypeId: DataTypes.INTEGER,
      soilInformationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "soil_information_soil_type",
      modelName: "SoilInformationSoilType",
      paranoid:true,
      deletedAt: 'deletedAt'
    }
  );
  return SoilInformationSoilType;
};
