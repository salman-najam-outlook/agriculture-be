'use strict';

const options = [
  'Organic',
 'FairTrade',
 'Rain Forest',
 'Led by woman',
 'Manos de Mujer'
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const set = options.map((item)=>{
      return {
        name:item,
        groupName:'certification',
        createdAt:new Date(),
        updatedAt:new Date(),
      }
    });

    await queryInterface.bulkInsert('options',set);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
