'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('pest_managements', 'pestTypeId');
    await queryInterface.removeColumn('pest_managements', 'chemicalInsecticides');
    await queryInterface.removeColumn('pest_managements', 'insecticideActiveIngredients');
    await queryInterface.removeColumn('pest_managements', 'totalInsecticideUsed');
    await queryInterface.removeColumn('pest_managements', 'totalInsecticideUsedUnitId');
    await queryInterface.removeColumn('pest_managements', 'insecticideDose');
    await queryInterface.removeColumn('pest_managements', 'insecticideDoseUnitId');
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
