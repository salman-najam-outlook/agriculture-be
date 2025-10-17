'use strict';

module.exports = {
  up: async (queryInterface) => {
    let groupName = 'soil-practice';
    await queryInterface.bulkInsert('options', [
      { groupName, info: JSON.stringify({points: 1}), name: 'Reduced or zero tillage systems (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Planting cover crops (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Mulching (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Agroforestry (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Crop residue retention (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Targeted/precision fertilizer application (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Water management (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Addition of organic inputs (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Terracing (1 point)', createdAt: new Date(), updatedAt: new Date()}
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
