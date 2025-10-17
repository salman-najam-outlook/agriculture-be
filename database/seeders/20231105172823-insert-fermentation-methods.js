'use strict';

/** @type {import('sequelize-cli').Migration} */
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

    const methods=[
      {
        name:'Boxes',
      },
      {
        name:'Piles',
      },
      {
        name:'Bags',
      }
    ];
    
    await queryInterface.bulkInsert('cacao_fermentation_methods',methods,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('cacao_fermentation_methods',null,{})
  }
};
