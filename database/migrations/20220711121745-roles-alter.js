'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'roles',
      'organization',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'organization',
          key: 'id'
        }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'roles',
      'organization'
    );
  },
};
