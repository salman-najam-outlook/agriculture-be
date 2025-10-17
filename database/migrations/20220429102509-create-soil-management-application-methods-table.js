'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('soil_management_application_methods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      soilManagementId: {
        allowNull: false,
        references: {
          model: 'soil_management',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      syntheticFertilizerId: {
        allowNull: true,
        references: {
          model: 'soil_management_synthetic_fertilizers',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      organicInputId: {
        allowNull: true,
        references: {
          model: 'soil_management_organic_inputs',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      applicationMethodId: {
        allowNull: false,
        references: {
          model: 'options',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('soil_management_application_methods');
  }
};
