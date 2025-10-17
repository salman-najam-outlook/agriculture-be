'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminSidebarMenu extends Model {
    static associate(models) {

      this.belongsTo(models.Roles, {
        foreignKey: 'role_id',
        targetKey: 'id',
      });

    }
  }
  AdminSidebarMenu.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.STRING,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      sidebar_menu_id: {
        type: DataTypes.STRING,
      },
      sidebar_menu_name: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'AdminSidebarMenu',
      tableName: 'admin_sidebar_menu',
    }
  );
  return AdminSidebarMenu;
};
