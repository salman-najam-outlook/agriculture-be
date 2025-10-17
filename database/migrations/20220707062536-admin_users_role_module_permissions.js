'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin_users_roles_modules_permissions', {
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
        allowNull: false
      },
      module_id: {
        type: Sequelize.STRING,
        references: {
          model: 'modules',
          key: 'id',
        },
        allowNull: false,
      },
      permission_id: {
        type: Sequelize.STRING,
        references: {
          model: 'permissions',
          key: 'id',
        },
        allowNull: false,
      },
      permitted: {
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
   
    },   {
      uniqueKeys: {
        Items_unique: {
          fields: ['role_id', 'module_id','permission_id' ],
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin_users_roles_modules_permissions');
  }
};
