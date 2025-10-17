'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('packaging_units', {
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
            packing_unit_type: {
                type: Sequelize.ENUM('case', 'bag', 'box'),
                allowNull: true,
            },
            packing_unit_value: {
                type: Sequelize.DECIMAL,
                allowNull: true,
            },
            no_of_units: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            pallet_size: {
                type: Sequelize.DECIMAL,
                allowNull: true,
            },
            number_of_pallets: {
                type: Sequelize.INTEGER,
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
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('packaging_units');
    }
};
