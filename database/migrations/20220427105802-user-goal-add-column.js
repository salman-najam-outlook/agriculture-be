'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_goals', 'recordId', {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
    });

    await queryInterface.addConstraint('user_goals', {
      fields: ['recordId'],
      type: 'unique',
      name: 'recordIdUniq',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_goals', 'recordId');
  },
};
