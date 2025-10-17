'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Update all occurrences of 'FAQ' in the 'name' field to 'Help Desk' in sidebar_menu
    await queryInterface.sequelize.query(
      "UPDATE sidebar_menu SET name = 'Help Desk' WHERE name = 'FAQ';"
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert 'Help Desk' back to 'FAQ' in the 'name' field
    await queryInterface.sequelize.query(
      "UPDATE sidebar_menu SET name = 'FAQ' WHERE name = 'Help Desk';"
    );
  },
}; 