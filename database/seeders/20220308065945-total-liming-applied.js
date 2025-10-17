('use strict');
const options = ['Grams', 'Kilograms', 'Tonnes', 'Pounds'];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const set = options.productCategories.map((category) => {
      return {
        name: category,
        groupName: 'total-liming-applied',
      };
    });
    return queryInterface.bulkInsert('options', set);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'options',
      { groupName: 'total-liming-applied' },
      null
    );
  },
};
