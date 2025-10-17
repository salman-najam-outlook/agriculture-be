'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('generated_keys', 'csv_url', {
          type: Sequelize.STRING,
          allowNull: true,
    });
    await queryInterface.addColumn('generated_keys', 'pdf_url', {
          type: Sequelize.STRING,
          allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
          await queryInterface.removeColumn('generated_keys', 'csv_url');
          await queryInterface.removeColumn('generated_keys', 'pdf_url');
  }
};
