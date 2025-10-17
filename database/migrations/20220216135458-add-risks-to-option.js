'use strict';

module.exports = {
  up: async (queryInterface) => {
    let groupName = 'soil-risk';
    await queryInterface.bulkInsert('options', [
      { groupName, name: 'Soil erosion', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Salinity', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Sodicity', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Soil pollution due to untreated organic inputs', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Water pollution', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Reduced effectiveness of fertilizers', createdAt: new Date(), updatedAt: new Date()}
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
