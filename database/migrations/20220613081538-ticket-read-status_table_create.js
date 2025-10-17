'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('ticket_read_status', {
        id: { 
         type: Sequelize.INTEGER,
         allowNull: false,
        autoIncrement: true,
        primaryKey: true
        },
        ticketId: {
          allowNull: false,
           type: Sequelize.INTEGER,
           references: { model: 'tickets', key: 'id' },
           onDelete: 'CASCADE'
         },  
       userId: {
          allowNull: false,
           type: Sequelize.INTEGER,
           references: { model: 'users', key: 'id' },
           onDelete: 'CASCADE'
         },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
     await queryInterface.dropTable('ticket_read_status');
  }
};
