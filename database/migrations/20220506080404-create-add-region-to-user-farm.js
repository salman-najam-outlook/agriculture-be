'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_farms', 'region', {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: 'Region of a User Farm ',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_farms', 'region');
  },
};
