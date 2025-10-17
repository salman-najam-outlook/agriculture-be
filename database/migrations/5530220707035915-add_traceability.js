'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'traceability',
      'organization_id',
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
      'traceability',
      'organization_id'
    );
  },
};
