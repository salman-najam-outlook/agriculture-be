"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("carbon_credit_crop_growing_crops", "crop_variety", {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addConstraint("carbon_credit_crop_growing_crops", {
      fields: ["crop_variety"],
      type: "foreign key",
      name: "fk_carbon_credit_crop_growing_crops_crop_variety",
      references: {
        table: "crop_variety",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "carbon_credit_crop_growing_crops",
      "fk_carbon_credit_crop_growing_crops_crop_variety"
    );

    await queryInterface.changeColumn("carbon_credit_crop_growing_crops", "crop_variety", {
      type: Sequelize.STRING,
      allowNull: true
    });
  },
};
