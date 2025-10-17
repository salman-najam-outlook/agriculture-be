'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('soil_prep_practice_equipments', {
      fields: ['equipmentId', 'soil_prep_practiceId'],
      type: 'unique',
      name: 'unique_equipmentId_soil_prep_practiceId',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'soil_prep_practice_equipments',
      'unique_equipmentId_soil_prep_practiceId'
    );
  }
};
