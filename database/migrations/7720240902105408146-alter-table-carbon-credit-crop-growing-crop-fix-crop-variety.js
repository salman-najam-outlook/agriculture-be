"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "carbon_credit_crop_growing_crop_varieties",
      "carbon_credit_crop_growing_crop_varieties_ibfk_2"
    );

    await queryInterface.addConstraint("carbon_credit_crop_growing_crop_varieties", {
      fields: ["crop_variety_id"],
      type: "foreign key",
      name: "carbon_credit_crop_growing_crop_varieties_ibfk_3",
      references: {
        table: "crops",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "carbon_credit_crop_growing_crop_varieties",
      "carbon_credit_crop_growing_crop_varieties_ibfk_3"
    );

    await queryInterface.addConstraint("carbon_credit_crop_growing_crop_varieties", {
      fields: ["crop_variety_id"],
      type: "foreign key",
      name: "carbon_credit_crop_growing_crop_varieties_ibfk_2",
      references: {
        table: "crop_variety",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
};
