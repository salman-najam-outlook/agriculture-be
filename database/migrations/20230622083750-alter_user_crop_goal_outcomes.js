'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
    ALTER TABLE user_crop_goal_outcomes DROP FOREIGN KEY user_crop_goal_outcomes_ibfk_2;
  `);
  await queryInterface.removeConstraint(
    "user_crop_goal_outcomes",
    "userCropGoalSeasonId"
  );
  await queryInterface.addConstraint("user_crop_goal_outcomes", {
    fields: ["userCropGoalSeasonId"],
    type: "foreign key",
    name: "user_crop_goal_outcomes_ibfk_2",
    references: {
      table: "user_crop_goal_seasons",
      field: "id",
    },
  });
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
