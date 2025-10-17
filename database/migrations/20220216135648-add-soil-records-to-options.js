'use strict';

module.exports = {
  up: async (queryInterface) => {
    let groupName = 'soil-record';
    await queryInterface.bulkInsert('options', [
      { groupName, name: 'Soil inputs purchase orders', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Fertilizer application schedule', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Types of soil amendments used and quantity', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Soil test results', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Irrigation records', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  down: async () => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
