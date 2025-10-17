'use strict';

const { QueryTypes } = require('sequelize');

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

    let userRes = await queryInterface.sequelize.query('select * from users',{ type: QueryTypes.SELECT })

    await queryInterface.bulkInsert('shade_tree',[
      { name: "Inga sp (Guama)", created_by: userRes[0].id, status:'active' },
      { name: "Erythrina Fusca (Bucaro)", created_by: userRes[0].id, status:'active' },
      { name: "Musa x paradisiaca (Banana tree)", created_by: userRes[0].id, status:'active' },
    ])
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
