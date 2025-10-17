"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
    ALTER TABLE user_crop_goal_farms DROP FOREIGN KEY user_crop_goal_farms_ibfk_1;
  `);
    await queryInterface.removeConstraint("user_crop_goal_farms", "seasonId");

    await queryInterface.addConstraint("user_crop_goal_farms", {
      fields: ["seasonId"],
      type: "foreign key",
      name: "user_crop_goal_farms_ibfk_1",
      references: {
        table: "user_crop_goal_seasons",
        field: "id",
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
