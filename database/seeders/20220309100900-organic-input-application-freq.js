('use strict');
const options = [
  'Once every crop season',
  'Twice every crop season',
  'Thrice every crop season',
  'Four times every crop season',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const set = options.map((category) => {
      return {
        name: category,
        groupName: 'organic-input-application-freq',
      };
    });
    return queryInterface.bulkInsert('options', set);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'options',
      { groupName: 'organic-input-application-freq' },
      null
    );
  },
};
