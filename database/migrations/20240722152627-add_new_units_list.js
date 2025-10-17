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

      // Create a map for quick lookup
      const unitTypeMap = unitTypeIds.reduce((acc, type) => {
        acc[type.name] = type.id;
        return acc;
      }, {});

      // Define the new records with dynamic unitType IDs
      const records = [
        // IronUnit
        { name: 'Milligrams per kilogram', abbvr: 'mg/kg', unitType: unitTypeMap['IronUnit'], factor: 1000000, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Parts per million', abbvr: 'ppm', unitType: unitTypeMap['IronUnit'], factor: 1.001142303, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Kilograms per hectare', abbvr: 'kg/ha', unitType: unitTypeMap['IronUnit'], factor: 0.1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Pounds per acre', abbvr: 'lbs/acre', unitType: unitTypeMap['IronUnit'], factor: 0.221846, createdAt: new Date(), updatedAt: new Date() },


        // ZincUnit
        { name: 'Milligrams per kilogram', abbvr: 'mg/kg', unitType: unitTypeMap['ZincUnit'], factor: 1000000, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Parts per million', abbvr: 'ppm', unitType: unitTypeMap['ZincUnit'], factor: 1.001142303, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Kilograms per hectare', abbvr: 'kg/ha', unitType: unitTypeMap['ZincUnit'], factor: 0.1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Pounds per acre', abbvr: 'lbs/acre', unitType: unitTypeMap['ZincUnit'], factor: 0.221846, createdAt: new Date(), updatedAt: new Date() },

        // BoronUnit
        { name: 'Milligrams per kilogram', abbvr: 'mg/kg', unitType: unitTypeMap['BoronUnit'], factor: 1000000, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Parts per million', abbvr: 'ppm', unitType: unitTypeMap['BoronUnit'], factor: 1.001142303, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Kilograms per hectare', abbvr: 'kg/ha', unitType: unitTypeMap['BoronUnit'], factor: 0.1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Pounds per acre', abbvr: 'lbs/acre', unitType: unitTypeMap['BoronUnit'], factor: 0.221846, createdAt: new Date(), updatedAt: new Date() },

        // MagnesiumUnit
        { name: 'Milligrams per kilogram', abbvr: 'mg/kg', unitType: unitTypeMap['MagnesiumUnit'], factor: 1000000, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Parts per million', abbvr: 'ppm', unitType: unitTypeMap['MagnesiumUnit'], factor: 1.001142303, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Kilograms per hectare', abbvr: 'kg/ha', unitType: unitTypeMap['MagnesiumUnit'], factor: 0.1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Pounds per acre', abbvr: 'lbs/acre', unitType: unitTypeMap['MagnesiumUnit'], factor: 0.221846, createdAt: new Date(), updatedAt: new Date() },
        
        // CalciumUnit
        { name: 'Milligrams per kilogram', abbvr: 'mg/kg', unitType: unitTypeMap['CalciumUnit'], factor: 1000000, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Parts per million', abbvr: 'ppm', unitType: unitTypeMap['CalciumUnit'], factor: 1.001142303, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Kilograms per hectare', abbvr: 'kg/ha', unitType: unitTypeMap['CalciumUnit'], factor: 0.1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Pounds per acre', abbvr: 'lbs/acre', unitType: unitTypeMap['CalciumUnit'], factor: 0.221846, createdAt: new Date(), updatedAt: new Date},


        // SoilOrganicCarbonUnit
        { name: 'Percentage', abbvr: '%', unitType: unitTypeMap['SoilOrganicCarbonUnit'], factor: 1, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Grams per kilogram', abbvr: 'g/kg', unitType: unitTypeMap['SoilOrganicCarbonUnit'], factor: 1000, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Milligrams per kilogram', abbvr: 'mg/kg', unitType: unitTypeMap['SoilOrganicCarbonUnit'], factor: 1000000, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Milligrams per hectare', abbvr: 'mg/ha', unitType: unitTypeMap['SoilOrganicCarbonUnit'], factor: 1000000000, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Tons per hectare', abbvr: 't/ha', unitType: unitTypeMap['SoilOrganicCarbonUnit'], factor: 10, createdAt: new Date(), updatedAt: new Date() },

      // NitrogenUnit
        { name: 'Pounds per acre', abbvr: 'lbs/acre', unitType: unitTypeMap['NitrogenUnit'], factor: 0.221846, createdAt: new Date(), updatedAt: new Date() },
        //PhosphorusUnit
        { name: 'Pounds per acre', abbvr: 'lbs/acre', unitType: unitTypeMap['PhosphorusUnit'], factor: 0.221846, createdAt: new Date(), updatedAt: new Date() },
      //PotassiumUnit
        { name: 'Pounds per acre', abbvr: 'lbs/acre', unitType: unitTypeMap['PotassiumUnit'], factor: 0.221846, createdAt: new Date(), updatedAt: new Date() }
      ];


      // Bulk insert with `updateOnDuplicate`
      await queryInterface.bulkInsert('units_list', records, {
        updateOnDuplicate: ['name', 'factor', 'createdAt', 'updatedAt'],
        transaction
      });

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
