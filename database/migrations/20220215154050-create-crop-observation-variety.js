'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_observation_variety', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      observation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
      cropVariety: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crop_observation_variety');
  },
};
