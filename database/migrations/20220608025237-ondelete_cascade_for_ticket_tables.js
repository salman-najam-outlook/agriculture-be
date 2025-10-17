'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.removeColumn('ticket_selected_users', 'ticketId');
     await queryInterface.removeColumn('tickets_multimedia', 'ticketId');
     await queryInterface.removeColumn('tickets_comments', 'ticketId');

     await queryInterface.addColumn('ticket_selected_users', 'ticketId', {
      allowNull: false,
       type: Sequelize.INTEGER,
       references: { model: 'tickets', key: 'id' },
       onDelete: 'CASCADE'
     });
     await queryInterface.addColumn('tickets_multimedia', 'ticketId', {
      allowNull: false,
       type: Sequelize.INTEGER,
       references: { model: 'tickets', key: 'id' },
       onDelete: 'CASCADE'
     });
     await queryInterface.addColumn('tickets_comments', 'ticketId', {
      allowNull: false,
       type: Sequelize.INTEGER,
       references: { model: 'tickets', key: 'id' },
       onDelete: 'CASCADE'
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
