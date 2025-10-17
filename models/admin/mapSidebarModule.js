'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapSidebarModule extends Model {
    static associate(models) {

      this.belongsTo(models.AdminSidebarMenu, {
        foreignKey: 'sidebar_menu_id',
        targetKey: 'id',
        as: 'admin_sidebar_menu'
      });

      this.belongsTo(models.Modules, {
        foreignKey: 'module_id',
        targetKey: 'id',
        as: 'module'
      });

    }
  }
  MapSidebarModule.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      sidebar_menu_id: {
        type: DataTypes.STRING,
        references: {
          model: 'AdminSidebarMenu',
          key: 'id',
        },
      },
      module_id: {
        type: DataTypes.STRING,
        references: {
            model: 'Modules',
            key: 'id',
          },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'MapSidebarModule',
      tableName: 'map_sidebar_modules',
    }
  );
  return MapSidebarModule;
};
