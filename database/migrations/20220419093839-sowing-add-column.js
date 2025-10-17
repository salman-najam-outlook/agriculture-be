'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('sowing', 'recordId', {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('sowing', 'recordId');
  },
};
