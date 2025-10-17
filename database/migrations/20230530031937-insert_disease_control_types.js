"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert("disease_control_types", [
      {
        name: "Cultural/Mechanical/Biological",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Chemical", createdAt: new Date(), updatedAt: new Date() },
      { name: "None", createdAt: new Date(), updatedAt: new Date() },
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
