"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FarmSizeRange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.GlobalSetting, {
        foreignKey: "globalSettingId",
        as: "globalSetting",
      });
    }
  }
  FarmSizeRange.init(
    {
      globalSettingId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'GlobalSettings',
          key: 'id',
        },
      },
      from: DataTypes.INTEGER,
      to: {
        type: DataTypes.INTEGER,
        validate: {
          isGreaterThanFrom(value) {
            if (value <= this.from) {
              throw new Error("Field: 'To' should be greater than field 'From'");
            }
          },
        },
      },
      isInclusive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "FarmSizeRange",
      timestamps: false
    }
  );
  return FarmSizeRange;
};
