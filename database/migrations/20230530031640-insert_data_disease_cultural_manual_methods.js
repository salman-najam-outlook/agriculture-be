"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert("disease_cultural_manual_methods", [
      { name: "Remove diseased plant" , createdAt: new Date(), updatedAt: new Date()},
      { name: "Mulching", createdAt: new Date(), updatedAt: new Date() },
      { name: "Crop rotation" , createdAt: new Date(), updatedAt: new Date()},
      { name: "Planting resistant cultivars" , createdAt: new Date(), updatedAt: new Date()},
      { name: "Use of oils and soaps" , createdAt: new Date(), updatedAt: new Date()},
      { name: "Use of bio fumigants" , createdAt: new Date(), updatedAt: new Date()},
      { name: "Others" , createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
