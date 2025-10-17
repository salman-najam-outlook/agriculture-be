'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('disease_managements', 'diseaseControlOtherDate');
    await queryInterface.removeColumn('disease_managements', 'chemicalType');
    await queryInterface.removeColumn('disease_managements', 'chemicalAppliedArea');
    await queryInterface.removeColumn('disease_managements', 'chemicalAppliedAreaUnitId');
    await queryInterface.removeColumn('disease_managements', 'chemicalActiveIngredient');
    await queryInterface.removeColumn('disease_managements', 'totalChemicalUsed');
    await queryInterface.removeColumn('disease_managements', 'totalChemicalUsedUnitId');
    await queryInterface.removeColumn('disease_managements', 'chemicalApplicationRate');
    await queryInterface.removeColumn('disease_managements', 'chemicalApplicationRateUnitId');
    await queryInterface.removeColumn('disease_managements', 'chemicalEfficacy');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
