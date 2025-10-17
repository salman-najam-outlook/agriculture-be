'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_sidebar_modules', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      sidebar_menu_id: {
        type: Sequelize.STRING,
        references: {
          model: 'admin_sidebar_menu',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      module_id: {
        type: Sequelize.STRING,
        references: {
          model: 'modules',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },   {
      uniqueKeys: {
        Items_unique: {
          fields: ['sidebar_menu_id', 'module_id'],
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('map_sidebar_modules');
  }
};
