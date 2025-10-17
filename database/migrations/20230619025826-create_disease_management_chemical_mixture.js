'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.createTable('disease_management_chemical_mixture', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        diseaseManagementChemicalTypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "disease_management_chemical_type",
            key: "id",
          },
        },
        diseaseManagementId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "disease_managements",
            key: "id",
          },
        },
        ingredientName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        percentage: {
          type: Sequelize.FLOAT,
        },
        cost: {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
        currencyId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Currencies",
            key: "id",
          },
        },
        quantity: {
          type: Sequelize.FLOAT,
        },
        quantityUnitId: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          ),
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.dropTable('disease_management_chemical_mixture')
    ])
  }
};
