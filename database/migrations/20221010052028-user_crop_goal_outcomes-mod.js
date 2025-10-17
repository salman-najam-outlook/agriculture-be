'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'user_crop_goal_outcomes',
      'parentSeasonId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'user_crop_goal_seasons', key: 'id' },
        comment: 'for mapping season history data',
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'user_crop_goal_outcomes',
      'parentSeasonId'
    );
  },
};
