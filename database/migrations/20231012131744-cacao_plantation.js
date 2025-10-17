'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_plantations', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      plantation_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cacao_variety: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cacao_variety',
          key: 'id',
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      cacao_species: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cacao_species',
          key: 'id',
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      no_of_cacao_trees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expected_yield: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      bearing_fruit_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      time_to_bear_fruit: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      no_of_trees_bearing_fruit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      plantationStatus: {
        type: Sequelize.ENUM(['pending', 'active', 'unapproved']),
        defaultValue: "pending"
      },
      status: {
        type: Sequelize.ENUM(["pending", "approved", "rejected"]),
        defaultValue: "pending"
      },
      rejection_reason: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      recordId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cacao_plantations');
  }
};
