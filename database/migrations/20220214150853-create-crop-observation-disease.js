'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'crop_observation_disease',
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
        organism: {
          type: Sequelize.ENUM('virus', 'bacteria', 'fungi'),
        },
      },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['name', 'organism'],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crop_observation_disease');
  },
};
