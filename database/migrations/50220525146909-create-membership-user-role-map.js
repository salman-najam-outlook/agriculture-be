'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_role_membership_map', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      membership_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_membership',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      user_role_id: {
        type: Sequelize.STRING,
        references: {
          model: 'user_role',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
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
    await queryInterface.dropTable('user_role_membership_map');
  }
};
