'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_farm_crops', 'recordId', {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_farm_crops', 'recordId');
  },
};