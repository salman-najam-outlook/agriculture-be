'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Sugarcane-India';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation:
      '[ "Plough immediately after the preceding crop is harvested or just after a good shower of rain. Land should be left exposed to the atmosphere for a month", "Early varieties - October to November", "Mid-late varieties - Feb to March", "Late varieties – November to March"  ]',
  },
  {
    moduleAttrId: 2,
    recommendation:
      '["As sugarcane crop stands in the field for more than a year, it is necessary to deep plough by mould board plough drawn by tractor to bring the soil to a fine tilth for proper germination of the sets and field emergence and root growth. The proper time for ploughing is immediately after the preceding crop is harvested or just after a good shower of rain received. The land is then exposed for a month. Then harrowing is done 3 to 4 times to break clods and to make the land smooth and even to facilitate uniform irrigation. Four to Six ploughings to produce good tilth is recommended. Each ploughing should be followed by planking to break the clods", "Cross sub-soiling is an advanced method of field preparation for sugarcane cultivation. The cross sub soiling at 1.0 m spacing should be done once in three to four years before preparing the land by a tractor drawn sub-soiler to the depth of 45 - 50 cm followed by planking to help in breaking the hard pan, increasing water infiltration rate and better penetration of sugarcane roots. It is recommended for enhancing plant as well as ratoon cane yields."]',
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
