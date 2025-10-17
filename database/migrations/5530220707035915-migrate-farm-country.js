'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'user_farms',
      { country: 'Brazil' },
      { country: 'Brasil' }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'user_farms',
      { country: 'Brasil' },
      { country: 'Brazil' }
    );
  }
};
