'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('soil_management_synthetic_fertilizers', {
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
      totalNPKAmount: {
        type: Sequelize.DOUBLE,
      },
      totalNPKAmountUnit: {
        type: Sequelize.STRING,
      },
      npkApplicationRate: {
        type: Sequelize.DOUBLE,
      },
      npkApplicationRateUnit: {
        type: Sequelize.STRING,
      },
      nitrogenContent: {
        type: Sequelize.DOUBLE,
      },
      nitrogenContentUnit: {
        type: Sequelize.STRING,
      },
      phosphorusContent: {
        type: Sequelize.DOUBLE,
      },
      phosphorusContentUnit: {
        type: Sequelize.STRING,
      },
      potassiumContent: {
        type: Sequelize.DOUBLE,
      },
      potassiumContentUnit: {
        type: Sequelize.STRING,
      },
      applicationMethod: {
        type: Sequelize.JSON,
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('soil_management_synthetic_fertilizers');
  }
};
