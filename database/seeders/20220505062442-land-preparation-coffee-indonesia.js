'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Coffee-Indonesia';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify([
      'Sumatra kharif  march - april',
      'Bali    kharif  march - april',
      'Sulawesi    kharif  march - april',
      'jawa    kharif  April - may',
      'flores  kharif  April - may',
    ]),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'During this preparation, we remove any stones/debris and weeds which are present in the soil.',
      'Commercial coffee growers should consider soil testing to measure the soil fertility and its suitability.',
      'Based on soil test reports, any nutrients required should be added to the soil before planting the seedlings.',
      'In the case of adding fertilizers such as phosphorus and lime,they should be thoroughly incorporated into the soil by ploughing and disking the soil several months before transplanting the coffee seedlings in the field.',
      'Growing:- For better coffee orchard establishment, the land should be prepared very well by giving 4 or 5 ploughings and harrowing to bring the soil to fine tilth stage. As part of this preparation, remove any stones/debris/ and weeds from previous crops. Commercial coffee growers should consider soil testing to measure soil fertility and suitability. Based on soil test reports, any nutrients and micronutrients should be supplemented in the soil before planting the seedlings. In the case of fertilizers applications such as phosphorus and lime, these should be thoroughly incorporated by plowing and disking the soil several months before transplanting the coffee seedlings in the field.',
    ]),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const { id: cropTypeId } = await queryInterface.sequelize.query(
        'SELECT * FROM options WHERE name=? and groupName=?',
        {
          replacements: [cropType, 'crop-type'],
          type: queryInterface.sequelize.QueryTypes.SELECT,
          plain: true,
        }
      );

      const set = recommendation.map(({ moduleAttrId, recommendation }) => ({
        cropTypeId,
        cropVarietyId,
        moduleId,
        moduleAttrId,
        recommendation,
      }));

      await queryInterface.bulkInsert('CropRecommendations', set, {});
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      const { id: cropTypeId } = await queryInterface.sequelize.query(
        'SELECT * FROM options WHERE name=? and groupName=?',
        {
          replacements: [cropType, 'crop-type'],
          type: queryInterface.sequelize.QueryTypes.SELECT,
          plain: true,
        }
      );
      const moduleAttrId = recommendation.map(
        ({ moduleAttrId }) => moduleAttrId
      );
      const where = { cropTypeId, moduleId, moduleAttrId };
      await queryInterface.bulkDelete('CropRecommendations', where, {});
    } catch (err) {
      console.log(err);
    }
  },
};
