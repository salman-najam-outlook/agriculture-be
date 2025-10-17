'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('soil_management_organic_inputs', {
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
      totalPoultryLitterAmount: {
        type: Sequelize.DOUBLE,
      },
      totalPoultryLitterAmountUnit: {
        type: Sequelize.STRING,
      },
      applicationRate: {
        type: Sequelize.DOUBLE,
      },
      applicationRateUnit: {
        type: Sequelize.STRING,
      },
      applicationMethod: {
        type: Sequelize.JSON,
      },
      applicationFrequency: {
        type: Sequelize.INTEGER,
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

    await queryInterface.dropTable('soil_management_organic_inputs');
  }
};
