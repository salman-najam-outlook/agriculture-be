'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crop_observation_deficiency_list', {
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
      deficiency: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crop_observation_deficiencies',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crop_observation_deficiency_list');
  },
};
