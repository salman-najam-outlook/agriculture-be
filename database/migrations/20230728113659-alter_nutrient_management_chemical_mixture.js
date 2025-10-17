"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "nutrient_management_fertilizer_mixture",
      "nutrient_management_fertilizer_mixture_ibfk_1"
    );
    await queryInterface.removeColumn(
      "nutrient_management_fertilizer_mixture",
      "nutrientManagementId"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "nutrient_management_fertilizer_mixture",
      "nutrientManagementId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );

    await queryInterface.addConstraint(
      "nutrient_management_fertilizer_mixture",
      {
        fields: ["nutrientManagementId"],
        type: "foreign key",
        name: "nutrient_management_fertilizer_mixture_ibfk_1",
        references: {
          table: "nutrient_managements",
          field: "id",
        },
        onDelete: "CASCADE", // Modify this according to your requirements
        onUpdate: "CASCADE", // Modify this according to your requirements
      }
    );
  },
};
