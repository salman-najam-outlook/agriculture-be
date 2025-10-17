'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('tickets_comments', { 
        id: {
          type: Sequelize.INTEGER ,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        ticketId: {
          type: Sequelize.INTEGER ,
          allowNull: false,
          references: {
            model: 'tickets',
            key: 'id',
          }
        },
        comment_type: {
          type: Sequelize.ENUM(['string', 'file', 'both']),
          allowNull: false,
          defaultValue: 'string'
        },
        comment: {
          type: Sequelize.TEXT('long'),
          allowNull: true
        },
        file_url: {
          type: Sequelize.STRING,
          allowNull: true
        },
        userId: {
          type: Sequelize.INTEGER ,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          }
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('tickets_comments');
  }
};
