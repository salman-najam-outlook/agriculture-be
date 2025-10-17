'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     queryInterface.addColumn('organic_inputs', 'userId', {
      type: Sequelize.INTEGER,
      default: 0,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE'
     })
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
