"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "cacao_plantations",
      "external_traceability_id",
      {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      {
        collate: "utf8mb4_0900_ai_ci",
      }
    );
    await queryInterface.addColumn(
      "cacao_drying_process",
      "external_traceability_id",
      {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      {
        collate: "utf8mb4_0900_ai_ci",
      }
    );
    await queryInterface.addColumn(
      "cacao_fermentation_process",
      "external_traceability_id",
      {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      {
        collate: "utf8mb4_0900_ai_ci",
      }
    );
    await queryInterface.addColumn(
      "cacao_purchase_orders",
      "external_traceability_id",
      {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      {
        collate: "utf8mb4_0900_ai_ci",
      }
    );

    await queryInterface.addConstraint('cacao_plantations', {
      fields: ['external_traceability_id'],
      type: 'foreign key',
      name: 'cacao_plantations_external_traceability_id_fk',
      references: {
        table: 'traceability_external_ids',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // cacao_drying_process
    await queryInterface.addConstraint('cacao_drying_process', {
      fields: ['external_traceability_id'],
      type: 'foreign key',
      name: 'cacao_drying_process_external_traceability_id_fk',
      references: {
        table: 'traceability_external_ids',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // cacao_fermentation_process
    await queryInterface.addConstraint('cacao_fermentation_process', {
      fields: ['external_traceability_id'],
      type: 'foreign key',
      name: 'cacao_fermentation_process_external_traceability_id_fk',
      references: {
        table: 'traceability_external_ids',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // cacao_purchase_orders
    await queryInterface.addConstraint('cacao_purchase_orders', {
      fields: ['external_traceability_id'],
      type: 'foreign key',
      name: 'cacao_purchase_orders_external_traceability_id_fk',
      references: {
        table: 'traceability_external_ids',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
