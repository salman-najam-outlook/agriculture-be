'use strict';

const pestControlTypes = [
  {
    name: 'Cultural/Natural',
  },
  {
    name: 'Chemical',
  },
  {
    name: 'None',
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
    await queryInterface.bulkInsert('pest_control_types', pestControlTypes, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('pest_control_types', null, {});
  }
};
