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
        // Update factor for existing records for SulphurUnit
        await queryInterface.bulkUpdate(
          'units_list',
          {
            factor: 1
          },
          {
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
