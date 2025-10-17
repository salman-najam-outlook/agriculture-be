'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin_user_roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false
      },
      role_id: {
        type: Sequelize.STRING,
        references: {
          model: 'roles',
          key: 'id',
        },
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
          fields: ['user_id', 'role_id'],
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin_user_roles');
  }
};
