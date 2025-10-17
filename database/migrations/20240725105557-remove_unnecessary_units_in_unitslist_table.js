'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const unitTypes = [
        'SulphurUnit',
        'CalciumUnit',
        'MagnesiumUnit',
        'IronUnit',
        'ZincUnit',
        'BoronUnit'
      ];

      const unitTypeIds = await queryInterface.sequelize.query(
        `SELECT id FROM unit_types WHERE name IN (:names)`,
        {
          replacements: { names: unitTypes },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      const unitTypeIdsList = unitTypeIds.map(type => type.id);

      // Find the ids of units to delete
      const unitsToDelete = await queryInterface.sequelize.query(
        `SELECT id FROM units_list WHERE abbvr = 'lbs/acre' AND unitType IN (:unitTypes)`,
        {
          replacements: { unitTypes: unitTypeIdsList },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      const unitIdsToDelete = unitsToDelete.map(unit => unit.id);

      // Clean up dependent records
      await queryInterface.bulkDelete('user_unit_configurations', {
        unitId: {
          [Sequelize.Op.in]: unitIdsToDelete
        }
      }, { transaction });

      // Delete records from units_list
      await queryInterface.bulkDelete('units_list', {
        id: {
          [Sequelize.Op.in]: unitIdsToDelete
        }
      }, { transaction });

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
