'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('soil_management', 'soilHealth', {
      type: Sequelize.ENUM('Fertile', 'Medium fertile', 'Low fertile'),
      after: 'ph',
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('soil_management', 'soilHealth')
  }
};
