"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NutrientManagementFarm extends Model {
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
    }
  }
  NutrientManagementFarm.init(
    {
      farmId: DataTypes.INTEGER,
      nutrientManagementId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "nutrient_management_farm",
      modelName: "NutrientManagementFarm",
      paranoid:true,
      deletedAt: 'deletedAt'
    }
  );
  return NutrientManagementFarm;
};
