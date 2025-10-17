'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sowing', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cropId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'crops', key: 'id' },
        onDelete: 'CASCADE'
      },
      cropVariety: {
        allowNull: true,
        type: Sequelize.STRING
      },
      plantingTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'planting_types', key: 'id' },
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      seedingRate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      seedingUnitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { as: 'seedingunit', model: 'units', key: 'id' },
        onDelete: 'CASCADE'
      },
      rowSpacing: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rowSpacingUnitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { as: 'rowspacing', model: 'units', key: 'id' },
        onDelete: 'CASCADE'
      },
      inRowSpacing: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      inRowSpacingUnitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { as: 'inrowspacing', model: 'units', key: 'id' },
        onDelete: 'CASCADE'
      },
      density: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      depth: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      depthUnitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { as: 'depthspacing', model: 'units', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sowing');
  }
};
