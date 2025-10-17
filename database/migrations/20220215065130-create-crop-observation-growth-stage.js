'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'crop_observation_growth_stage',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cropType: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'options',
            key: 'id',
          },
        },
      },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['name', 'cropType'],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crop_observation_growth_stage');
  },
};
