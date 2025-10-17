'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'irrigation_type_updated',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Main category like Ground Water, Surface Water, etc.',
        },
        parentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'irrigation_type_updated',
            key: 'id',
          },
          comment: 'Reference to parent category (null for main categories)',
        },
        isCategory: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: 'True if this is a main category, false if it\'s a subcategory',
        },
        isUserSpecific: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: 'True if this is a user-specific custom entry',
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
          comment: 'User ID for user-specific entries (null for system defaults)',
        },
        sortOrder: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: 'Order within the category',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ['name', 'category', 'userId'],
            where: {
              userId: null
            }
          },
          {
            fields: ['parentId']
          },
          {
            fields: ['category']
          },
          {
            fields: ['isCategory']
          }
        ],
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('irrigation_type_updated');
  },
}; 