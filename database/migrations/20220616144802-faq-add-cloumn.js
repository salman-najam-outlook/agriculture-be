'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('faq_sections','display', {
        type: Sequelize.BOOLEAN,
         defaultValue: true
     })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * 
     */
     await queryInterface.dropColumn('faq_sections', 'display', {});
  }
};
