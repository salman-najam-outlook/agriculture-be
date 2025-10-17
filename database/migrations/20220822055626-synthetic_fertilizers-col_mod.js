'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'synthetic_fertilizers',
      'requestId',
      'recordId'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'synthetic_fertilizers',
      'recordId',
      'requestId'
    );
  },
};
