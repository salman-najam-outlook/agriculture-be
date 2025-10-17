'use strict';

const moment = require('moment');

const unitTypes = [
  { name: 'harvesting-fresh-yield', label: 'Harvesting Fresh Yield' },
  { name: 'harvesting-yield-household', label: 'Harvesting Yield Household' },
  { name: 'herbicide-dose-rate', label: 'Herbicide Dose Rate' },
  { name: 'Volume-Area', label: 'Volume Area' },
  { name: 'Weight-Area', label: 'Weight Area' },
  { name: 'Irrigation-Area', label: 'Irrigation Area' },
  { name: 'Irrigation-Volume', label: 'Irrigation Volume' },
  { name: 'Storage-Area', label: 'Storage Area' },
  { name: 'Storage-Yield', label: 'Storage Yield' },
  { name: 'herbicide-used', label: 'Herbicide Used' },
  { name: 'Energy-consumption', label: 'Energy Consumption' },
  { name: 'Weight', label: 'Weight' },
  { name: 'Length', label: 'Length' },
  { name: 'Area', label: 'Area' },
  { name: 'Perimeter', label: 'Perimeter' },
  { name: 'Thickness', label: 'Thickness' },
  { name: 'PotassiumUnit', label: 'Potassium Unit' },
  { name: 'LimingRateWeightAreaUnit', label: 'Liming Rate Weight Area Unit' },
  { name: 'TotalLimeWeightUnit', label: 'Total Lime Weight Unit' },
  {
    name: 'SyntheticFertilizerApplicationRateWeightAreaUnit',
    label: 'Synthetic Fertilizer Application Rate Weight Area Unit',
  },
  {
    name: 'TotalSyntheticFertilizerUsedWeightUnit',
    label: 'Total Synthetic Fertilizer Used Weight Unit',
  },
  {
    name: 'OrganicInputApplicationRateWeightAreaUnit',
    label: 'Organic Input Application Rate Weight Area Unit',
  },
  {
    name: 'TotalOrganicInputAppliedWeightUnit',
    label: 'Total Organic Input Applied Weight Unit',
  },
  { name: 'PhosphorusUnit', label: 'Phosphorus Unit' },
  { name: 'BulkDensity', label: 'Bulk Density' },
  { name: 'NitrogenUnit', label: 'Nitrogen Unit' },
  { name: 'SulphurUnit', label: 'Sulphur Unit' },
  {
    name: 'SythenticFertilizerNitrogenUnit',
    label: 'Sythentic Fertilizer Nitrogen Unit',
  },
  {
    name: 'SythenticFertilizerPhosphorousUnit',
    label: 'Sythentic Fertilizer Phosphorous Unit',
  },
  {
    name: 'SythenticFertilizerPotassiumUnit',
    label: 'Sythentic Fertilizer Potassium Unit',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const setData = unitTypes?.map((rows) => ({
        ...rows,
        createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      }));
      await queryInterface.bulkInsert('unit_types', setData, {
        updateOnDuplicate: ['label'],
      });
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
