'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Alter the table and add the new enum value
      await queryInterface.changeColumn(
        'traceability_external_ids',
        'type',
        {
          type: Sequelize.ENUM('coffee_plantation','coffee_purchase_order','coffee_processing_batch','parchment_coffee','cacao_plantation','cacao_purchase_order','cacao_processing_batch','dry_milling_cacao','husk_processing_batch'),
          allowNull: false,
        },
      );
  },

  down: async (queryInterface, Sequelize) => {
    
  },
};
