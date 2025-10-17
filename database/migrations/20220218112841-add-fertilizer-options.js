'use strict';

module.exports = {
  up: async (queryInterface) => {
    let groupName = 'soil-fertilizer';
    await queryInterface.bulkInsert('options', [
      { groupName, name: 'Urea', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Compound NPK', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'CAN', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'DAP', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Potassium chloride', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Monoammonium phosphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Diammonium phosphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Ammonium nitrate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Ammonium sulphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Triple superphosphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Single superphosphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Potassium sulphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Potassium magnesium sulphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Muriate of potash', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Rock phosphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Potassium phosphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Super phosphate', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Inhibitors', createdAt: new Date(), updatedAt: new Date()}
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
