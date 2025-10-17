'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('pallets', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            packing_unit_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'packaging_units', 
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            pallet_id: {
                type: Sequelize.STRING, // Manually entered identifier of pallet
                allowNull: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            no_of_boxes: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            used: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
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
              },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('pallets');
    }
};
