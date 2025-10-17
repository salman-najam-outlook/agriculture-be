'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('irrigation_cropVariety', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      irrigation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'irrigation',
          key: 'id',
        },
      },
      cropVariety: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('irrigation_cropVariety');
  },
};
