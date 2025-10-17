'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('plantations_user_farms_map', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      plantation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'plantations',
          key: 'id',
        },
        allowNull: false,
      },
      farm_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_farms',
          key: 'id',
        },
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
    await queryInterface.dropTable('plantations_user_farms_map');
  }
};
