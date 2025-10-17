'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('units', [
      {unit_category_id: 2, unit_subCategory_id: 2, country_id: 1, abbreviation: 'L', field: 'Litres', createdAt: new Date(), updatedAt: new Date()},
      {unit_category_id: 2, unit_subCategory_id: 2, country_id: 1, abbreviation: 'O', field: 'Ounces', createdAt: new Date(), updatedAt: new Date()},
      {unit_category_id: 2, unit_subCategory_id: 2, country_id: 1, abbreviation: 'mg', field: 'Milligram', createdAt: new Date(), updatedAt: new Date()},
      {unit_category_id: 2, unit_subCategory_id: 2, country_id: 1, abbreviation: 'g', field: 'Gram', createdAt: new Date(), updatedAt: new Date()},
      {unit_category_id: 2, unit_subCategory_id: 2, country_id: 1, abbreviation: 'kg', field: 'Kilogram', createdAt: new Date(), updatedAt: new Date()},
      {unit_category_id: 3, unit_subCategory_id: 3, country_id: 1, abbreviation: 'mg/L/acre', field: 'Milligram per litre per acre', createdAt: new Date(), updatedAt: new Date()},
      {unit_category_id: 3, unit_subCategory_id: 3, country_id: 1, abbreviation: 'mg/L/hectare', field: 'Milligram per litre per hectare', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  down: async () => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
