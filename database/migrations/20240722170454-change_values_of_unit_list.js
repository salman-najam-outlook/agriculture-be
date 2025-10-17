'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const unitTypes = [
        'NitrogenUnit',
        'PhosphorusUnit',
        'PotassiumUnit'
      ];

      // Fetch unit type IDs dynamically
      const unitTypeIds = await queryInterface.sequelize.query(
        `SELECT id, name FROM unit_types WHERE name IN (:names)`,
        {
          replacements: { names: unitTypes },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      // Create a map for quick lookup
      const unitTypeMap = unitTypeIds.reduce((acc, type) => {
        acc[type.name] = type.id;
        return acc;
      }, {});

      // Define the updates for specific unit types
      const updates = [
        // NitrogenUnit
        {
          where: {
            abbvr: 'kg/ha',
            unitType: unitTypeMap['NitrogenUnit']
          },
          values: {
            name: 'Kilograms per hectare'
          }
        },
        {
          where: {
            abbvr: 'ppm',
            unitType: unitTypeMap['NitrogenUnit']
          },
          values: {
            name: 'Parts per million'
          }
        },
        {
          where: {
            abbvr: 'mg/kg',
            unitType: unitTypeMap['NitrogenUnit']
          },
          values: {
            name: 'Milligrams per kilogram',
            abbvr: 'mg/kg'
          }
        },
        // PhosphorusUnit
        {
          where: {
            abbvr: 'kg/ha',
            unitType: unitTypeMap['PhosphorusUnit']
          },
          values: {
            name: 'Kilograms per hectare'
          }
        },
        {
          where: {
            abbvr: 'ppm',
            unitType: unitTypeMap['PhosphorusUnit']
          },
          values: {
            name: 'Parts per million'
          }
        },
        {
          where: {
            abbvr: 'mg/kg',
            unitType: unitTypeMap['PhosphorusUnit']
          },
          values: {
            name: 'Milligrams per kilogram',
            abbvr: 'mg/kg'
          }
        },
        // PotassiumUnit
        {
          where: {
            abbvr: 'kg/ha',
            unitType: unitTypeMap['PotassiumUnit']
          },
          values: {
            name: 'Kilograms per hectare'
          }
        },
        {
          where: {
            abbvr: 'ppm',
            unitType: unitTypeMap['PotassiumUnit']
          },
          values: {
            name: 'Parts per million'
          }
        },
        {
          where: {
            abbvr: 'mg/kg',
            unitType: unitTypeMap['PotassiumUnit']
          },
          values: {
            name: 'Milligrams per kilogram',
            abbvr: 'mg/kg'
          }
        }
      ];

      // Update records
      for (const update of updates) {
        await queryInterface.bulkUpdate(
          'units_list',
          update.values,
          update.where,
          { transaction }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
