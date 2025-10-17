('use strict');
const options = ['Kg per acre', 'Hectare', 'Tonnes per acre'];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const set = options.productCategories.map((category) => {
      return {
        name: category,
        groupName: 'liming-rate',
      };
    });
    return queryInterface.bulkInsert('options', set);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'options',
      { groupName: 'liming-rate' },
      null
    );
  },
};
