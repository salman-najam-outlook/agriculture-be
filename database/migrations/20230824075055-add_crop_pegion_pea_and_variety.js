'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert(
      "options",
      [
        {
          name: "Pigeon pea (Peru)",
          groupName: "crop-type",
          region: "Peru",
          countryCode: "PE",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    )
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
