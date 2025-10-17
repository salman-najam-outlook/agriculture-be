'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('user_crop_goals', 'recordId', {
        type: Sequelize.STRING,
        unique: true,
      });
      await queryInterface.addColumn('user_crop_goal_outcomes', 'recordId', {
        type: Sequelize.STRING,
        unique: true,
      });
      await queryInterface.addColumn('user_crop_goal_seasons', 'recordId', {
        type: Sequelize.STRING,
        unique: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('user_crop_goals', 'recordId');
      await queryInterface.removeColumn('user_crop_goal_outcomes', 'recordId');
      await queryInterface.removeColumn('user_crop_goal_seasons', 'recordId');
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
