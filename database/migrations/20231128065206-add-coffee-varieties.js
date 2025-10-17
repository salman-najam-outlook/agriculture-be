'use strict';

const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    try {
      const coffeeSpeciesData = await queryInterface.sequelize.query(
        "SELECT * FROM coffee_species WHERE name = 'Arabica'",
        {
          type: QueryTypes.SELECT,
        }
      );

      let coffeeSpecies = coffeeSpeciesData[0];

      const coffeeVarietyData = [
        {
          name: 'Café Lempira',
          coffee_species: coffeeSpecies.id,
          status: 'Active',
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ihcafe 90',
          coffee_species: coffeeSpecies.id,
          status: 'Active',
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Parainema',
          coffee_species: coffeeSpecies.id,
          status: 'Active',
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Obata',
          coffee_species: coffeeSpecies.id,
          status: 'Active',
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]

      await queryInterface.bulkInsert('coffee_variety', coffeeVarietyData)

      console.log('coffee varieties seeded successfully.')
    }
    catch (error) {
      console.error('Error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
