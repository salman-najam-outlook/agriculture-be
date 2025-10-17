'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carbon_credit_crop_growing_equipments_fuel_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carbon_credit_crop_growing_equipment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carbon_credit_crop_growing_equipments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      equipment_fuel_record_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'equipment_fuel_records',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addConstraint('carbon_credit_crop_growing_equipments_fuel_records', {
      fields: ['carbon_credit_crop_growing_equipment_id', 'equipment_fuel_record_id'],
      type: 'unique',
      name: 'unique_crop_growing_equipment_fuel_record'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('carbon_credit_crop_growing_equipments_fuel_records');
  }
};