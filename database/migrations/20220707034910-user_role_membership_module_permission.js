'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_role_membership_module_permission', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
   
      user_role_id: {
        type: Sequelize.STRING,
        references: {
          model: 'user_role',
          key: 'id',
        },
        allowNull: false,
      },
      module_id: {
        type: Sequelize.STRING,
        references: {
          model: 'modules',
          key: 'id',
        },
        allowNull: false,
      },
      membership_plan_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_membership',
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
      isdeleted: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_role_membership_module_permission');
  }
};
