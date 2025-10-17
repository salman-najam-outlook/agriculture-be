'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cacao_plantations', 'isExistingPlantation', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: 'plantationStatus'
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cacao_plantations', 'isExistingPlantation')
  }
};
