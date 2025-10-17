'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_role_modules', {
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
    await queryInterface.dropTable('user_role_modules');
  }
};
