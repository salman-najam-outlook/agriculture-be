'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'usermembership_modules_permissions',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userMembershipId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'user_membership',
            key: 'id',
          },
          allowNull: false,
          onDelete: 'CASCADE',
        },
        moduleId: {
          type: Sequelize.STRING,
          references: {
            model: 'modules',
            key: 'id',
          },
          allowNull: false,
          onDelete: 'CASCADE',
        },
        permissionId: {
          type: Sequelize.STRING,
          references: {
            model: 'permissions',
            key: 'id',
          },
          allowNull: false,
          onDelete: 'CASCADE',
        },
        permitted: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
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
      },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['userMembershipId', 'moduleId', 'permissionId'],
          },
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usermembership_modules_permissions');
  },
};
