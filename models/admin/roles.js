"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       this.belongsTo(models.Organization, {
        foreignKey: 'organization',
        targetKey: 'id',
        as: 'organizationDetails'
      });
    }
  }
  Roles.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_type: {
        type: DataTypes.ENUM("admin", "app_user"),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organization: {
        type: DataTypes.INTEGER,
        references: {
          model: 'organization',
          key: 'id'
        },
        allowNull: false
      },
      subOrgId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organizations',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    editable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: "roles",
      modelName: "Roles",
    }
  );
  return Roles;
};