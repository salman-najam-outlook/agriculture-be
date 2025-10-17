'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_scores', 'metadata', {
      allowNull: true,
      type: Sequelize.JSON,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_scores', 'metadata');
  },
};
