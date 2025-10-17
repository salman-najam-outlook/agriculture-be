"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("weeding_herbicide_inputs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      herbicideName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      herbicideActiveIngredient: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      currencyId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Currencies",
          key: "id",
        },
      },
      herbicideQuantity: {
        type: Sequelize.INTEGER,
      },
      herbicideQuantityUnitId: {
        type: Sequelize.INTEGER,
      },
      cost: {
        allowNull: true,
        type: Sequelize.DOUBLE,
      },
      herbicideRate: {
        allowNull: true,
        type: Sequelize.DOUBLE,
      },
      herbicideRateUnitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      applicationMethodId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "weed_methods",
          key: "id",
        },
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
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("weeding_herbicide_inputs");
  },
};
