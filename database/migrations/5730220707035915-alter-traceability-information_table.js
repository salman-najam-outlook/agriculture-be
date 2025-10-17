'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('traceability_informations', 'recordId', {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
    });

    await queryInterface.addConstraint('traceability_informations', {
      fields: ['recordId'],
      type: 'unique',
      name: 'recordIdUniq',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('traceability_informations', 'recordId');
  },
};


