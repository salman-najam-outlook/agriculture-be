"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "pest_management_chemical_mixture",
      "pest_management_chemical_mixture_ibfk_2"
    );

    await queryInterface.removeColumn(
      "pest_management_chemical_mixture",
      "pestManagementId"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "pest_management_chemical_mixture",
      "pestManagementId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );

    await queryInterface.addConstraint("pest_management_chemical_mixture", {
      fields: ["pestManagementId"],
      type: "foreign key",
      name: "pest_management_chemical_mixture_ibfk_2",
      references: {
        table: "pest_managements",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
};
