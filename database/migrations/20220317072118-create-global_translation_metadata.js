'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('global_translation_metadata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      english: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hindi : {
        type: Sequelize.STRING,
        allowNull: false
      },
      marathi : {
        type: Sequelize.STRING,
        allowNull: false
      },
      nepali : {
        type: Sequelize.STRING,
        allowNull: false
      },
      spanish: {
        type: Sequelize.STRING,
        allowNull: false
      },
      swahili : {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('global_translation_metadata')
  }
};
