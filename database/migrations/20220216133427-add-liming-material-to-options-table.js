'use strict';

module.exports = {
  up: async (queryInterface) => {
    let groupName = 'liming-material';
    await queryInterface.bulkInsert('options', [
      { groupName, name: 'Gypsum', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Dolomite', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Agricultural lime (calcium carbonate)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Burnt lime', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Magnesite', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Cement kiln dust', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Crushed shells', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
