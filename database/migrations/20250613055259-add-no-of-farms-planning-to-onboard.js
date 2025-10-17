'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'NoOfFarmsPlanningtoonboard', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Number of farms planning to onboard'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'NoOfFarmsPlanningtoonboard');
  }
};
