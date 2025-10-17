'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Sugarcane-Colombia';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation:
      '[ "Plough immediately after the preceding crop is harvested or just after a good shower of rain. Land should be left exposed to the atmosphere for a month."  ]',
  },
  {
    moduleAttrId: 2,
    recommendation:
      '["Sugarcane stands in the field for more than one year hence, land is prepared by giving two deep ploughing. After harvesting the plants of the previous sowing, tractor plowing of the area is carried out to the depth of 25 – 30 cm. Cross sub-soiling is an advanced method of field preparation for sugarcane cultivation. First ploughing is given immediately after the harvesting of previous crop with mould board plough or tractor. The land is exposed to sun for one to two months. The clods are crushed with clod crusher or harrow. 35-50 tons FYM/ha. is added to soil.Plowing and harrowing is typically done after the application of limestone + gypsum to incorporate the products into the soil. In most small farms, subsoiling (decompacting soils or breaking compacted layers) has been recommended after plowing and harrowing. This recommendation is based on the land use history of the area, the traffic of machines, implements and animals, the presence of crusts on the surface of the land, and the shallow root system of the natural vegetation"]',
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
