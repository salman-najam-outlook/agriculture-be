'use strict';
const moment = require("moment");
const { gasUnits } = require("../../helpers/consts");


  let reports_parent = [
    {english:"Disease Management"          , spanish: "Manejo de enfermedad"                                      },
    {english:"Pest Management"          , spanish: "Manejo de plagas"                                      }
    
  ]
  




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

    await queryInterface.bulkInsert('global_translation_metadata', reports_parent, {});
  try {
    
  } catch (error) {
    
  }
     
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
