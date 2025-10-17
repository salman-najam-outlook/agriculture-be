"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParentModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Modules, {
        foreignKey: 'parent_module_id',
        as: 'modules',
      });
    }
  }
  ParentModules.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          module_type: DataTypes.ENUM(('admin', 'app_user')),
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          }
    },
    {
      sequelize,
      tableName: "parent_modules",
      modelName: "ParentModules",
    }
  );
  return ParentModules;
};
