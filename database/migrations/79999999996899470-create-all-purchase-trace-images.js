"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("all_purchase_traceability_images", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      batch_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'batch_processing_management',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      final_product_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: 'final_product_management',
              key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      purchase_order_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: 'purchase_order_management',
              key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      file_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      s3_key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("all_purchase_traceability_images");
  },
};
