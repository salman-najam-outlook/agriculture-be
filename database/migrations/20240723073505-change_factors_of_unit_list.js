'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const unitTypes = [
        'IronUnit',
        'CalciumUnit',
        'ZincUnit',
        'BoronUnit',
        'MagnesiumUnit',
        'SoilOrganicCarbonUnit',
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

      // Extract the IDs for the unit types
      const unitTypeIdsArray = unitTypeIds.map(unitType => unitType.id);

      // Update the factor to 1 for the specified unit types
      await queryInterface.bulkUpdate(
        'units_list',
        { factor: 1 },
        {
          unitType: { [Sequelize.Op.in]: unitTypeIdsArray }
        },
        { transaction }
      );

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
