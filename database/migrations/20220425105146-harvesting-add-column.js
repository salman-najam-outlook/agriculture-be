'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('harvest', 'recordId', {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
    });

    await queryInterface.addConstraint('harvest', {
      fields: ['recordId'],
      type: 'unique',
      name: 'recordIdUniq',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('harvest', 'recordId');
  },
};
