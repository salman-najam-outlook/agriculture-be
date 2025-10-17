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
    ALTER TABLE user_crop_goal_seasons DROP FOREIGN KEY user_crop_goal_seasons_ibfk_1;
  `);
    await queryInterface.removeConstraint('user_crop_goal_seasons', 'uniq_SeasonName_User')
    await queryInterface.addConstraint('user_crop_goal_seasons', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_crop_goal_seasons_ibfk_2',
      references: {
        table: 'users',
        field: 'id'
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
