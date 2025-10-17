'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('horticulture_information_map_data', { 
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
      horticulture_information_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'horticulture_information',
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
    await queryInterface.dropTable('horticulture_information_map_data');
  }
};
