'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * 
     */
     return [
      queryInterface.addColumn(
        'faq_sections',
        'pt',
        Sequelize.TEXT
      ),
      queryInterface.addColumn(
        'faq_sections',
        'ar',
        Sequelize.TEXT
      ),
      queryInterface.addColumn(
        'faq_sections',
        'fr',
        Sequelize.TEXT
      )
  ];
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return [
      queryInterface.removeColumn(
        'faq_sections',
        'pt'
      ),
      queryInterface.removeColumn(
        'faq_sections',
        'ar'
      ),
      queryInterface.removeColumn(
        'faq_sections',
        'fr'
      )
  ];
  }
};
