'use strict';

module.exports = {
  up: async (queryInterface) => {
    let groupName = 'organic-inputs';
    await queryInterface.bulkInsert('options', [
      { groupName, info: JSON.stringify({points: 5}), name: 'Treated compost (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Untreated compost', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Treated manure (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Untreated manure', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Biosolids (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Biochar (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Vermicompost (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Green manure (5 points)', createdAt: new Date(), updatedAt: new Date()}
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
