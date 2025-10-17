'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('shade_tree_map_data', { 
      id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      plantation_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'plantations',
          key: 'id',
        }
      },
      shade_tree_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'shade_tree',
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
    await queryInterface.dropTable('shade_tree_map_data');
  }
};
