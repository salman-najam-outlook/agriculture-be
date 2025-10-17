'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeIndex('parent_modules', 'name');
    await queryInterface.addConstraint('parent_modules', {
      type: 'UNIQUE',
      fields: ['id', 'name']
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('parent_modules', 'parent_modules_id_name_uk');
  }
};
