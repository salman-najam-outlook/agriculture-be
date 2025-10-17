'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('plantations', {
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
      commodity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'commodity',
          key: 'id',
        },
      },
      coffee_variety: {
        type: Sequelize.INTEGER,
        references: {
          model: 'coffee_variety',
          key: 'id',
        },
        allowNull: false,
      },
      coffee_species: {
        type: Sequelize.INTEGER,
        references: {
          model: 'coffee_species',
          key: 'id',
        },
        allowNull: false,
      },
      harvested_trees_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      expected_yield: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(["pending", "approved", "rejected"]),
        defaultValue: "pending"
      },
      rejection_reason: {
        type: Sequelize.STRING,
        allowNull: true
      },
      recordId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('plantations');
  }
};
