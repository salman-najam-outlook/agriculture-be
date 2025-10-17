'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('units_list', {
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
      abbvr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unitType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'unit_types',
          key: 'id',
        },
      },
      factor: {
        type: Sequelize.DECIMAL(20, 10),
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
    await queryInterface.dropTable('units_list');
  },
};
