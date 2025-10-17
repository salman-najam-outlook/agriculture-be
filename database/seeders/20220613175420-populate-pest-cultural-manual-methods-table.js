'use strict';

const pestCulturalManualMethods = [
  { name: 'Deep ploughing' },
  { name: 'Natural enemies/parasitism' },
  { name: 'Push and pull' },
  { name: 'Ash and chilli' },
  { name: 'Plant extracts' },
  { name: 'Weeding' },
  { name: 'Use of mesh' },
  { name: 'Uprooting of infested plants by hand' },
  { name: 'Traps and bagging' },
  { name: 'Bio pesticides' },
  { name: 'Bio fumigation' },
  { name: 'Scarecrows' },
  { name: 'Tillage' },
  { name: 'Pruning' },
  { name: 'Hand picking of pests' },
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
    await queryInterface.bulkInsert('pest_cultural_manual_methods', pestCulturalManualMethods, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('pest_cultural_manual_methods', null, {});
  }
};
