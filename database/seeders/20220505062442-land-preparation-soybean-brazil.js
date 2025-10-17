'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Soybean-Brazil';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify([]),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'One deep ploughing followed by 2-3 shallow ploughing and laddering is necessary to obtain good tilth, For Soybean cultivation, the field should be deeply ploughed in early summer to kill harmful insects and flies. Followed by spreading cow manure (natural fertilizer), to enrich the field. The practice of reduced- or no tillage is also considered to be more eco-friendly, as it reduces soil erosion, use of fuel and machinery, soil moisture loss and soil compaction. Herbicide tolerant and insect resistant GM crops make no-till practices more accessible to farmers. Soyabean farming requires well drained soils.',
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
