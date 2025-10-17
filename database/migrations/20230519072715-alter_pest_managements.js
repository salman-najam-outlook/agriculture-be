'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('pest_managements', 'insecticideEfficacy');
    await queryInterface.removeColumn('pest_managements', 'chemicalAppliedArea');
    await queryInterface.removeColumn('pest_managements', 'chemicalAppliedAreaUnitId');
    await queryInterface.removeColumn('pest_managements', 'culturalManualMethodArea');
    await queryInterface.removeColumn('pest_managements', 'culturalManualMethodAreaUnitId');
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
