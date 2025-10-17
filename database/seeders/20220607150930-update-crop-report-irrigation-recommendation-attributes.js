'use strict';

const cropRecommendationModuleAttr = {
  'Irrigation Report': [
    { type: 'none', name: 'Irrigation schedule/frequency' },
    { type: 'none', name: 'Date of irrigation (can be >1)' },
    { type: 'none', name: 'Number of days after sowing' },
    { type: 'none', name: 'Quantity of water used for irrigation (litres)' },
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
