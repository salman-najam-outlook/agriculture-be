'use strict';

module.exports = {
  up: async (queryInterface) => {
    let groupName = 'liming-schedule';
    await queryInterface.bulkInsert('options', [
      { groupName, info: JSON.stringify({points: 5}), name: 'Once every cropping season(5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Annually (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Bi-annually (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Every two years (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Every five years (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'I don\'t have a schedule', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Randomly', createdAt: new Date(), updatedAt: new Date()}
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
