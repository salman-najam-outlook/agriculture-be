'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('irrigation_segment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      segment: {
        type: Sequelize.INTEGER,
        references: {
          model: 'geofences',
          key: 'id',
        },
      },
      irrigation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'irrigation',
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
    await queryInterface.dropTable('irrigation_segment');
  },
};
