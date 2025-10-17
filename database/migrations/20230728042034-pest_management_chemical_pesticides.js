"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn(
      "pest_management_chemical_pesticides_type",
      "pestManagementId",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );

    await queryInterface.removeConstraint(
      "pest_management_chemical_pesticides_type",
      "pest_management_chemical_pesticides_type_ibfk_1"
    );

    await queryInterface.addConstraint(
      "pest_management_chemical_pesticides_type",
      {
        fields: ["pestManagementId"],
        type: "foreign key",
        name: "pest_management_chemical_pesticides_type_ibfk_1",
        references: {
          table: "pest_managements",
          field: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "RESTRICT",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "pest_management_chemical_pesticides_type",
      "pestManagementId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );

    await queryInterface.removeConstraint(
      "pest_management_chemical_pesticides_type",
      "pest_management_chemical_pesticides_type_ibfk_1"
    );

    await queryInterface.addConstraint(
      "pest_management_chemical_pesticides_type",
      {
        fields: ["pestManagementId"],
        type: "foreign key",
        name: "pest_management_chemical_pesticides_type_ibfk_1",
        references: {
          table: "pest_managements",
          field: "id",
        },
      }
    );
  },
};
