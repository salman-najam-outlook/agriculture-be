"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("survey_users_list", "status", {
      type: Sequelize.ENUM(["active", "inprogress", "submitted"]),
      allowNull: false,
      defaultVlue: "active",
    });
    await queryInterface.addColumn("survey_users_list", "startDate", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("survey_users_list", "status");
    await queryInterface.removeColumn("survey_users_list", "startDate");
  },
};
