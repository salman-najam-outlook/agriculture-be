'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('seedlings_wind_breaker_tree_map_data', { 
      id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      seedling_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'seedlings',
          key: 'id',
        }
      },
      wind_breaker_tree_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'wind_breaker_tree',
          key: 'id',
        }
      },
      number_of_trees: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('seedlings_wind_breaker_tree_map_data');
  }
};
