'use strict';
module.exports = {
  up: async (queryInterface) => {
    let groupName = 'soil-testing-schedule';
    await queryInterface.bulkInsert('options', [
      { groupName, info: JSON.stringify({points: 5}), name: 'Every crop season (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Annually (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, info: JSON.stringify({points: 5}), name: 'Every two years (5 points)', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'Every five years', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'When i can afford it', createdAt: new Date(), updatedAt: new Date()},
      { groupName, name: 'No specific timing', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },
  down: async () => {

  }
};
