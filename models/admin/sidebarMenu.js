'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SidebarMenu extends Model {
    static associate(models) {
    }
  }
  SidebarMenu.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      parent_menu_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      route_path_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      organization: {
        type: DataTypes.STRING,
        references: {
          model: 'organization',
          key: 'id',
        },
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SidebarMenu',
      tableName: 'sidebar_menu',
    }
  );
  return SidebarMenu;
};
