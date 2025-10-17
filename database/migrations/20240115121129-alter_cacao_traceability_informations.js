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
    await queryInterface.removeColumn("cacao_traceability_informations", "cacaoLandArea")
    await queryInterface.removeColumn("cacao_traceability_informations", "annualProduction")
    await queryInterface.removeColumn("cacao_traceability_informations", "farmAndZone")
    await queryInterface.renameColumn("cacao_traceability_informations", "farmer_history", "plantation_history")

    await queryInterface.addColumn(
      "cacao_traceability_informations",
      "cacaoSpecies",
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    );
    await queryInterface.addColumn(
      "cacao_traceability_informations",
      "cacao_plantation_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "cacao_plantations",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    );
    await queryInterface.addColumn("cacao_traceability_informations", "photos", {
      allowNull: true,
      type: Sequelize.JSON,
    });
    await queryInterface.addColumn("cacao_traceability_informations", "videos", {
      allowNull: true,
      type: Sequelize.JSON,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
