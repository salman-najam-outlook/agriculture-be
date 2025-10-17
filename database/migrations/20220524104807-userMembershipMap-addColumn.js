'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users_user_membership_map', 'id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    });
  },

  async down(queryInterface, Sequelize) {},
};
