'use strict';

const currencies = [
  {
    symbol: 'USh',
    abbreviation: 'UGX',
    name: 'Ugandan shilling',
  },
  {
    symbol: '₹',
    abbreviation: 'INR',
    name: 'Indian rupee',
  },
  {
    symbol: '$',
    abbreviation: 'USD',
    name: 'United States dollar',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Currencies', currencies, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Currencies', null, {});
  },
};
