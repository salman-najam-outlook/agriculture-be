'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_crop_goal_seasons', 'seasonName', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_crop_goal_seasons', 'seasonName', {
      type: Sequelize.STRING,
    });
  },
};
