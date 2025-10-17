'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let groupName = 'pest-application-methods';
    await queryInterface.bulkInsert('options', [
      { groupName, name: 'Fumigation', createdAt: new Date(), updatedAt: new Date()},
    ]);
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
