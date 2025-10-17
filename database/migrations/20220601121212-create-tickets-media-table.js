'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     */
     await queryInterface.createTable('tickets_multimedia', { 
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
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
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
     * await queryInterface.dropTable('users');
     */
  }
};
