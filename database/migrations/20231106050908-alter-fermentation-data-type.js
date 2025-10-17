'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('cacao_fermentation_process', 'fermentationMethod')
    await queryInterface.addColumn('cacao_fermentation_process', 'fermentationMethod', {
      type:Sequelize.INTEGER,
      references:{
        model:'cacao_fermentation_methods',
        key:'id',
      },
      allowNull:true,
      after: 'fermentationPercentage'
    });
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
