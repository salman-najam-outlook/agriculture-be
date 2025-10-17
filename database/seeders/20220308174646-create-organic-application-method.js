('use strict');
const { organicApplicationMethod: options } = require('../../helpers/consts');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const set = options.map((category) => {
      return {
        name: category,
        groupName: 'organic-application-method',
      };
    });
    return queryInterface.bulkInsert('options', set);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'options',
      { groupName: 'organic-application-method' },
      null
    );
  },
};
