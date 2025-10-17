'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('irrigation_farm', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      farm: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_farms',
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
    await queryInterface.dropTable('irrigation_farm');
  },
};
