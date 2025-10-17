'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("carbon_credit_projects", "is_deleted", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('carbon_credit_projects', 'is_deleted');
  },
};