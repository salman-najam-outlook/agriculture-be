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
    ALTER TABLE user_crop_goal_type_maps DROP FOREIGN KEY user_crop_goal_type_maps_ibfk_1;
  `);
    await queryInterface.sequelize.query(`
  ALTER TABLE user_crop_goal_type_maps DROP FOREIGN KEY user_crop_goal_type_maps_ibfk_2;
`);
    await queryInterface.removeConstraint(
      "user_crop_goal_type_maps",
      "uniqCrop_goalAndGoal_type"
    );
    await queryInterface.addConstraint("user_crop_goal_type_maps", {
      fields: ["userCropGoalSeasonId"],
      type: "foreign key",
      name: "user_crop_goal_type_maps_ibfk_1",
      references: {
        table: "user_crop_goal_seasons",
        field: "id",
      },
    });
    await queryInterface.addConstraint("user_crop_goal_type_maps", {
      fields: ["cropGoalTypeId"],
      type: "foreign key",
      name: "user_crop_goal_type_maps_ibfk_2",
      references: {
        table: "options",
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
