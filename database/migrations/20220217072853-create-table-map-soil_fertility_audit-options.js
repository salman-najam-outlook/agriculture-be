'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_soil_fertility_audit_options',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        optionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'options',
            key: 'id',
          },
          onDelete: 'CASCADE'
        },
        soilFertilityAuditId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'soil_fertility_audit',
            key: 'id'
          },
          onDelete: 'CASCADE'
        }
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('map_soil_fertility_audit_options');
  }
};
