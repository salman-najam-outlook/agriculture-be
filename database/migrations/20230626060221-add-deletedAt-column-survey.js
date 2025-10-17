'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('surveys_list', 'deletedAt', {
      type: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('surveys_list', 'deletedAt');
  }
};
