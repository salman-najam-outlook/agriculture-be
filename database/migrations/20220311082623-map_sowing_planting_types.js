'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_sowing_planting_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sowingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sowing',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      plantingTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'planting_types',
          key: 'id',
        },
        onDelete: 'CASCADE'
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('map_sowing_planting_type');
  },
};
