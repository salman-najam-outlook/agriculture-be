'use strict';

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
    await queryInterface.bulkInsert('weed_methods', [
      {
        name: 'Machete', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Hoe', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'mower', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date(),
      },
  ])
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
