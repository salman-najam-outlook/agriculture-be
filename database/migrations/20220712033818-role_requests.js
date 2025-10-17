'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('role_requests', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
     role_assigned: {
      type: Sequelize.STRING,
      references: {
        model: 'user_role',
        key: 'id',
      },
      allowNull: false,
     },
     role_requested: {
      type: Sequelize.STRING,
      references: {
        model: 'user_role',
        key: 'id',
      },
      allowNull: false,
     },
      status: {
        type: Sequelize.ENUM(["pending", "approved", "rejected"]),
        defaultValue: "pending"
      },
      rejection_reason: {
        type: Sequelize.STRING,
        allowNull: true
      },

      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('role_requests');
  }
};
