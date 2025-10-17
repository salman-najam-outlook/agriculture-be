'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     queryInterface.removeConstraint('seedlings', 'seedlings_ibfk_4');
     queryInterface.removeConstraint('seedlings', 'seedlings_ibfk_5');
  },

  async down (queryInterface, Sequelize) {    
     await queryInterface.addConstraint('seedlings', {
      type: 'foreign key',
      fields: ['coffee_variety'],
      name: 'seedlings_ibfk_4',
      references: {
        table: 'coffee_variety',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('seedlings', {
      type: 'foreign key',
      fields: ['coffee_species'],
      name: 'seedlings_ibfk_5',
      references: {
        table: 'coffee_species',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  }
};
