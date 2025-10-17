'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      notificationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'notifications', key: 'id' },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      seen: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '0',
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
    await queryInterface.addConstraint('user_notifications', {
      type: 'UNIQUE',
      fields: ['notificationId', 'userId'],
      name: 'userIdNotificationIdUniq',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_notifications');
  },
};
