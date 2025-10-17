"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoPlantationSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CacaoPlantationSetting.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      approvalOption: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      autoApprovalLimit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "admin_cacao_plantation_setting",
    }
  );
  return CacaoPlantationSetting;
};
