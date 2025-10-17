'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipment_name_equipment_activity', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      equipmentNameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'equipment_name',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      equipmentActivityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'equipment_activity',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    
    // Safety removal of index if exists
    // await queryInterface.query('DROP INDEX IF EXISTS equipment_name_equipment_activity_equipment_name_id ON equipment_name_equipment_activity');
    // await queryInterface.query('DROP INDEX IF EXISTS equipment_name_equipment_activity_equipment_activity_id ON equipment_name_equipment_activity');
    
    // await queryInterface.addIndex('equipment_name_equipment_activity', ['equipmentNameId']);
    // await queryInterface.addIndex('equipment_name_equipment_activity', ['equipmentActivityId']);
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.query('DROP INDEX IF EXISTS equipment_name_equipment_activity_equipment_name_id ON equipment_name_equipment_activity');
    // await queryInterface.query('DROP INDEX IF EXISTS equipment_name_equipment_activity_equipment_activity_id ON equipment_name_equipment_activity');
    
    await queryInterface.dropTable('equipment_name_equipment_activity');
  },
};