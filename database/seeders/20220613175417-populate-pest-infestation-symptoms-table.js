'use strict';

const pestInfestationSymptoms = [
  {
    name: 'Holes on leaves/fruits/grain',
  },
  {
    name: 'Rolled and curied leaves',
  },
  {
    name: 'Dead shoots',
  },
  {
    name: 'Stunted/poor growth',
  },
  {
    name: 'Distorted plants/leaves',
  },
  {
    name: 'Plant wilting',
  },
  {
    name: 'Irregular and chewed leaved/stems',
  },
  {
    name: 'Dying of the new leaves',
  },
  {
    name: 'Presence of larvae',
  },
  {
    name: 'Presence of droppings',
  },
  {
    name: 'Weak stems',
  },
  {
    name: 'Presences of webs',
  },
  {
    name: 'Weak roots',
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
    await queryInterface.bulkInsert('pest_infestation_symptoms', pestInfestationSymptoms, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('pest_infestation_symptoms', null, {});
  }
};
