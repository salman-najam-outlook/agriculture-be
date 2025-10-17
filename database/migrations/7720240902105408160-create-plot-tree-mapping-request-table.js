'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tree_mapping_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      farmer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      farm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_farms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pending', 'in_progress', 'submitted', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      },
      deleted_at: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATE
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    await queryInterface.addIndex('tree_mapping_requests', ['request_id']);
    await queryInterface.addIndex('tree_mapping_requests', ['status']);

    // 2. Update existing records
    await queryInterface.sequelize.query(
      "UPDATE tree_mapping_requests SET status = 'in_progress' WHERE status = 'partially_submitted';"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tree_mapping_requests');

    // Revert ENUM definition
    await queryInterface.sequelize.query(
      "ALTER TABLE tree_mapping_requests CHANGE COLUMN status status ENUM('pending', 'partially_submitted', 'submitted', 'completed', 'cancelled') NOT NULL DEFAULT 'pending';"
    );
    // Revert records
    await queryInterface.sequelize.query(
      "UPDATE tree_mapping_requests SET status = 'partially_submitted' WHERE status = 'in_progress';"
    );
  }
};