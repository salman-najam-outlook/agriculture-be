'use strict';
const { soilApplicationStage: options } = require('../../helpers/consts');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const set = options.map((category) => {
      return {
        name: category,
        groupName: 'soil-application-stage',
      };
    });
    return queryInterface.bulkInsert('options', set);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'options',
      { groupName: 'soil-application-stage' },
      null
    );
  },
};
