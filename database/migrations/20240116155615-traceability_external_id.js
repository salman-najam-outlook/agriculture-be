'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('traceability_external_ids', {
      id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM(
          'coffee_plantation',
          'coffee_purchase_order',
          'coffee_processing_batch',
          'parchment_coffee',
          'cacao_plantation',
          'cacao_purchase_order',
          'cacao_processing_batch',
          'dry_milling_cacao'
        ),
        allowNull: false
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('traceability_external_ids');
  },
};

