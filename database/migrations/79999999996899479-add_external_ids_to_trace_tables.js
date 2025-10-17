'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.sequelize.query('ALTER TABLE traceability_external_ids MODIFY type ENUM("coffee_plantation","coffee_purchase_order","coffee_processing_batch","parchment_coffee","cacao_plantation","cacao_purchase_order","cacao_processing_batch","dry_milling_cacao","husk_processing_batch","purchase_confirmation", "batch_mgmt", "final_product");');

      await queryInterface.addColumn('purchase_order_management', 'external_id', {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "traceability_external_ids",
          key: "id",
        },
      });

      await queryInterface.addColumn('batch_processing_management', 'external_id', {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "traceability_external_ids",
          key: "id",
        },
      });

      await queryInterface.addColumn('final_product_management', 'external_id', {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "traceability_external_ids",
          key: "id",
        },
      });

      
  },

  down: async (queryInterface, Sequelize) => {
    // To revert the change, you can create a new type without the new value
    // and change the column type to this new type.
  }
};
