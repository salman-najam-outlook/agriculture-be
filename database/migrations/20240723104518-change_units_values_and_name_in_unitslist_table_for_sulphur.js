'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Fetch unit type ID for SulphurUnit
      const [unitTypeIdResult] = await queryInterface.sequelize.query(
        `SELECT id FROM unit_types WHERE name = 'SulphurUnit'`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      const sulphurUnitId = unitTypeIdResult ? unitTypeIdResult.id : null;

      if (sulphurUnitId) {
        // Update existing records for SulphurUnit
        await queryInterface.bulkUpdate(
          'units_list',
          {
            name: 'Milligrams per kilogram',
            abbvr: 'mg/kg'
          },
          {
            abbvr: 'mg/l',
            unitType: sulphurUnitId
          },
          { transaction }
        );

        await queryInterface.bulkUpdate(
          'units_list',
          {
            name: 'Kilograms per hectare'
          },
          {
            abbvr: 'kg/ha',
            unitType: sulphurUnitId
          },
          { transaction }
        );

        await queryInterface.bulkUpdate(
          'units_list',
          {
            name: 'Parts per million'
          },
          {
            abbvr: 'ppm',
            unitType: sulphurUnitId
          },
          { transaction }
        );

        // Add new record for lbs/acre
        await queryInterface.bulkInsert(
          'units_list',
          [
            {
              name: 'Pounds per acre',
              abbvr: 'lbs/acre',
              unitType: sulphurUnitId,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
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
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Fetch unit type ID for SulphurUnit
      const [unitTypeIdResult] = await queryInterface.sequelize.query(
        `SELECT id FROM unit_types WHERE name = 'SulphurUnit'`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      const sulphurUnitId = unitTypeIdResult ? unitTypeIdResult.id : null;

      if (sulphurUnitId) {
        // Revert changes for SulphurUnit
        await queryInterface.bulkUpdate(
          'units_list',
          {
            name: 'mg/l',
            abbvr: 'mg/l'
          },
          {
            abbvr: 'mg/kg',
            unitType: sulphurUnitId
          },
          { transaction }
        );

        await queryInterface.bulkUpdate(
          'units_list',
          {
            name: 'kg/ha'
          },
          {
            abbvr: 'kg/ha',
            unitType: sulphurUnitId
          },
          { transaction }
        );

        await queryInterface.bulkUpdate(
          'units_list',
          {
            name: 'ppm'
          },
          {
            abbvr: 'ppm',
            unitType: sulphurUnitId
          },
          { transaction }
        );

        // Remove the new record for lbs/acre
        await queryInterface.bulkDelete(
          'units_list',
          {
            abbvr: 'lbs/acre',
            unitType: sulphurUnitId
          },
          { transaction }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
