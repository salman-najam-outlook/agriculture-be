'use strict';

const plantParts = [
  {
    name: 'Leaves',
  },
  {
    name: 'Stem',
  },
  {
    name: 'Grain',
  },
  {
    name: 'Tuber',
  },
  {
    name: 'Bulb',
  },
  {
    name: 'Fruit',
  },
  {
    name: 'Roots',
  },
  {
    name: 'Flowers',
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('plant_parts', plantParts, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('plant_parts', null, {});
  }
};
