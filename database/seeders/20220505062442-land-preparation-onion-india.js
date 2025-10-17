'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Onion-India';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation:
      '[ "Hilly areas Rabi (August - September); Summer (October - November)" ,"Punjab, Haryana, UP, Bihar, Rajasthan Kharif (April - June) Rabi (September - October)" ,"Orissa and West Bengal Kharif (April - June) Late Kharif (July - August) Rabi (August - September)" ,"Maharashtra and parts of Gujarat Early Kharif (January - February) Kharif (April - May) Late Kharif (July - August) Rabi (September - October)", "Andhra Pradesh, Tamil Nadu, Karnataka Early Kharif (January - February) Kharif (April - May) Rabi (August - September)" ]',
  },
  {
    moduleAttrId: 2,
    recommendation:
      '["One/first plough", "Harrowing to break soil clods into smaller mass and incorporate plant residue", "Levelling the surface"]',
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

      console.log(set);

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
      console.log(where);

      await queryInterface.bulkDelete('CropRecommendations', where, {});
    } catch (err) {
      console.log(err);
    }
  },
};
