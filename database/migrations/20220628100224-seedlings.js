'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('seedlings', {
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
      seedling_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      plantation_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'plantations',
          key: 'id',
        }
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
      source_of_seeds: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_of_trees: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('seedlings');
  }
};
