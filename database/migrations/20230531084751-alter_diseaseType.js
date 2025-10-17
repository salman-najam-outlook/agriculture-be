"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("disease_types", "userId", {
      after: "name",
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    });
    await queryInterface.addColumn("disease_symptoms", "userId", {
      after: "symptoms",
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    });
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
