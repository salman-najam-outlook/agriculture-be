'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Step 1: Add 'in_progress' to the ENUM (alongside 'partially_submitted')
    await queryInterface.sequelize.query(`
      ALTER TABLE tree_mapping_requests 
      CHANGE COLUMN status status ENUM('pending', 'partially_submitted', 'in_progress', 'submitted', 'completed', 'cancelled') 
      NOT NULL DEFAULT 'pending'
    `);

    // Step 2: Update any existing 'partially_submitted' records to 'in_progress'
    await queryInterface.sequelize.query(`
      UPDATE tree_mapping_requests 
      SET status = 'in_progress' 
      WHERE status = 'partially_submitted'
    `);

    // Step 3: Remove 'partially_submitted' from the ENUM
    await queryInterface.sequelize.query(`
      ALTER TABLE tree_mapping_requests 
      CHANGE COLUMN status status ENUM('pending', 'in_progress', 'submitted', 'completed', 'cancelled') 
      NOT NULL DEFAULT 'pending'
    `);
  },

  async down (queryInterface, Sequelize) {
    // Step 1: Add 'partially_submitted' back to the ENUM
    await queryInterface.sequelize.query(`
      ALTER TABLE tree_mapping_requests 
      CHANGE COLUMN status status ENUM('pending', 'partially_submitted', 'in_progress', 'submitted', 'completed', 'cancelled') 
      NOT NULL DEFAULT 'pending'
    `);

    // Step 2: Update any existing 'in_progress' records back to 'partially_submitted'
    await queryInterface.sequelize.query(`
      UPDATE tree_mapping_requests 
      SET status = 'partially_submitted' 
      WHERE status = 'in_progress'
    `);

    // Step 3: Remove 'in_progress' from the ENUM (back to original)
    await queryInterface.sequelize.query(`
      ALTER TABLE tree_mapping_requests 
      CHANGE COLUMN status status ENUM('pending', 'partially_submitted', 'submitted', 'completed', 'cancelled') 
      NOT NULL DEFAULT 'pending'
    `);
  }
};
