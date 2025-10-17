'use strict';

const cropRecommendationModuleAttr = {
  'Soil Management Report': [
    { type: 'none', name: 'Soil type' },
    { type: 'none', name: 'Soil health status' },
    { type: 'scale', name: 'pH' },
    { type: 'scale', name: 'Soil Organic Carbon(%)' },
    { type: 'scale', name: 'Sulfur (mg/Kg)(ppm)' },
    { type: 'none', name: 'Organic inputs (tonnes/ha)' },
    { type: 'none', name: 'Nitrogen fertilizer rate (kg N/ha)' },
    { type: 'none', name: 'Phosphorus fertilizer rate (kg P2O5/ha)' },
    { type: 'none', name: 'Potassium fertilizer rate (kg K2O/ha)' },
  ],
};

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      let attributes = [];

      for (const key in cropRecommendationModuleAttr) {
        const moduleId = await queryInterface.rawSelect(
          'CropRecommendationModules',
          { where: { name: key } },
          ['id']
        );
        const set = cropRecommendationModuleAttr[key].map((obj) => {
          return { moduleId, ...obj };
        });
        attributes = [...attributes, ...set];
      }

      await queryInterface.bulkInsert(
        'CropRecommendationModuleAttributes',
        attributes,
        {}
      );
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'CropRecommendationModuleAttributes',
      null,
      {}
    );
  },
};
