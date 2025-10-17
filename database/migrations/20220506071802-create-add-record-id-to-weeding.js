'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('weed', 'recordId', {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('weed', 'recordId');
  },
};