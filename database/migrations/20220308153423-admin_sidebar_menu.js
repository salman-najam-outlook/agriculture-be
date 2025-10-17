'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin_sidebar_menu', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.STRING,
        references: {
          model: 'roles',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      sidebar_menu_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sidebar_menu_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sidebar_submenu_obj: {
        type: Sequelize.STRING,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
   
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin_sidebar_menu');
  }
};
