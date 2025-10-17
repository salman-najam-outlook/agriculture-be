'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('disease_management_chemical_mixture', 'diseaseManagementId');
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('disease_management_chemical_mixture', 'diseaseManagementId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'disease_managements',
        key: 'id'
      }
    });
  }
};
