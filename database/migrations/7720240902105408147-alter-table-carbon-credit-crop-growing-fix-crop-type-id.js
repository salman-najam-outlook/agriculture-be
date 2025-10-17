"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "carbon_credit_crop_growing_crops",
      "carbon_credit_crop_growing_crops_ibfk_2"
    );
    await queryInterface.removeColumn("carbon_credit_crop_growing_crops", "crop_id");
    await queryInterface.addColumn("carbon_credit_crop_growing_crops", "crop_type_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'options',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("carbon_credit_crop_growing_crops", "crop_type_id");
    await queryInterface.addColumn("carbon_credit_crop_growing_crops", "crop_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'crops',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};

