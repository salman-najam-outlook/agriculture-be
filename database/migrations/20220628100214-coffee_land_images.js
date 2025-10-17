'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('coffee_land_images', { 
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
      file_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      s3_key: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('coffee_land_images');
  }
};
