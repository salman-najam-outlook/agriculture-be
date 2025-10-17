'use strict';

const options = [
  'Cassava-Uganda',
  'Olive-Lybia',
  'Potato-India',
  'Potato-Usa',
  'Soybean-Argentina',
  'Soybean-India',
  'Soybean-Usa',
  'Tea-Uganda',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const set = options.map((category) => {
      return {
        name: category,
        groupName: 'crop-type',
      };
    });
    return queryInterface.bulkInsert('options', set);
  },

  async down(queryInterface, Sequelize) {
  },
};
