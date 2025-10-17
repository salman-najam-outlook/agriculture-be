'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'crop_observation_deficiencies',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        element: {
          type: Sequelize.STRING,
        },
      },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['name', 'element'],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crop_observation_deficiencies');
  },
};
