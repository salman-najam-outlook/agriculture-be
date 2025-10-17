'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn(
        'profile_authentication_settings',
        'auto_log_off_value',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
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
