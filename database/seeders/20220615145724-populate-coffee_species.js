'use strict';
const { QueryTypes } = require('sequelize');
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
    let coffeeVarietyRes = []
    coffeeVarietyRes =  await queryInterface.sequelize.query('select * from coffee_variety', { type: QueryTypes.SELECT })
    let userRes =  await queryInterface.sequelize.query('select * from users', { type: QueryTypes.SELECT })


    let coffeeSpeciesInsert = []

    coffeeSpeciesInsert = coffeeVarietyRes.map((coff, index) => {
      return {
        name :`coffee_species_${index}`,
        coffee_variety: coff.id,
        created_by: userRes[0].id
      }
    })

    queryInterface.bulkInsert('coffee_species', 
      coffeeSpeciesInsert
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
