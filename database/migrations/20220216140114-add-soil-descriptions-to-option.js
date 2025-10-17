'use strict';

module.exports = {
  up: async (queryInterface) => {
    let groupName = 'soil-description';
    await queryInterface.bulkInsert('options', [
      { groupName, info: JSON.stringify({points: 1}), name: 'Dark coloured  soil (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Light coloured  soil', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Easy to work with (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Dense roots (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Sparse roots (1 point)', createdAt: new Date(), updatedAt: new Date()},

      { groupName, info: JSON.stringify({points: 1}), name: 'Moist soil (1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Water logged', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Earthworm/grub presence(1 point)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 2}), name: 'Crops vigour/healthy crops (2 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 1}), name: 'Presence of fertility weeds (chickweed, chicory, clover, dandelion, pigweed, mugwort)(1 point)', createdAt: new Date(), updatedAt: new Date()},

      { groupName, name: 'Dry compacted soil', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Loose sandy soil', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'White deposits on soil', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Poor crop growth', createdAt: new Date(), updatedAt: new Date()}
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
