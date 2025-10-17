('use strict');
const { organicInputs: options } = require('../../helpers/consts');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const set = options.map((category) => {
      return {
        name: category,
        groupName: 'soil-organic-input',
      };
    });
    return queryInterface.bulkInsert('options', set);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'options',
      { groupName: 'soil-organic-input' },
      null
    );
  },
};
