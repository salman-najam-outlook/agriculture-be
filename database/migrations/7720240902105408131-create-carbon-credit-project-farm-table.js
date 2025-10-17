"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("carbon_credit_project_farm", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carbon_credit_projects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      farm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_farms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      digitally_signed_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      signage_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      farmer_photo_s3_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      digital_signature_s3_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          "in_progress",
          "in_review",
          "approved",
          "require_update"
        ),
        allowNull: false,
        defaultValue: "in_progress",
      },
      signed_agreement_s3_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("carbon_credit_project_farm");
  },
};