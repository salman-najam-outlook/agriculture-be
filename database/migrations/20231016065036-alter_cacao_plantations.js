'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cacao_plantations', 'expected_yield_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER, 
      after: 'expected_yield',
      references: { model: 'units_list', key: 'id' },
      onDelete: 'CASCADE'
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cacao_plantations', 'expected_yield_unit')
  }
};
