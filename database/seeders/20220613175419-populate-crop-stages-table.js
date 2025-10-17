'use strict';

const cropStages = [
  {
    name: 'Days after sowing when pest was detected',
  },
  {
    name: 'Germination',
  },
  {
    name: 'Three leaf stage',
  },
  {
    name: 'Stem elongation',
  },
  {
    name: 'Tillering',
  },
  {
    name: 'Flag leaf',
  },
  {
    name: 'Branching',
  },
  {
    name: 'Bulb initiation',
  },
  {
    name: 'Bulb formation',
  },
  {
    name: 'Budding',
  },
  {
    name: 'Flowering',
  },
  {
    name: 'Grain filling',
  },
  {
    name: 'Ripening/maturity',
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
    await queryInterface.bulkInsert('crop_stages', cropStages, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('crop_stages', null, {});
  }
};
