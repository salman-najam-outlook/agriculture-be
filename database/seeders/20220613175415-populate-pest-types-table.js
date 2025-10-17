'use strict';

const pestTypes = [
  { name: 'Aphids' },
  { name: 'Bollworm' },
  { name: 'Fall armyworm' },
  { name: 'Mites' },
  { name: 'Whitefly' },
  { name: 'Caterpillars' },
  { name: 'Leafhopper' },
  { name: 'Weevils' },
  { name: 'Cutworm' },
  { name: 'Thrips' },
  { name: 'Locusts' },
  { name: 'Birds' },
  { name: 'Pod borer' },
  { name: 'Stalk borers' },
  { name: 'Moth' },
  { name: 'Stink bugs' },
  { name: 'Potato beetle' },
  { name: 'Corn root worm' },
  { name: 'Mormon crickets' },
  { name: 'Japanese Beetle' },
  { name: 'Fruitfly' },
  { name: 'Nematode' },
  { name: 'Leaf folder' },
  { name: 'Mealy bug' },
  { name: 'Leaf hopper' },
  { name: 'Leaf webber' },
  { name: 'Stem fly' },
  { name: 'Midge' },
  { name: 'San-Jose-scale' },
  { name: 'Capsule borer' },
  { name: 'Gall fly' },
  { name: 'White grub' },
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
    await queryInterface.bulkInsert('pest_types', pestTypes, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('pest_types', null, {});
  }
};
