'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('equipment', 'recordId', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('equipment', 'recordId');
  },
};
