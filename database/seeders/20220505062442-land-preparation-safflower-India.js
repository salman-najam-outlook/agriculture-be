'use strict';
const moduleId = 1,
  cropVarietyId = null,
  cropType = 'Safflower-India';

const recommendation = [
  {
    moduleAttrId: 1,
    recommendation: JSON.stringify([
      'Maharastra - Rabi  (Oct- Nov)',
      'Karnataka   -  Rabi  (Oct - Nov)',
    ]),
  },
  {
    moduleAttrId: 2,
    recommendation: JSON.stringify([
      'With the help of local tractor or local plough, give 1 or 2 deep ploughings followed by 2 or 3 harrowing.',
      'Break the clods in between the ploughings to bring the soil to a fine tilth stage.',
      'Levelling the surface.',
      'Remove any weeds or dried branches from previous crops.',
      'Deep summer ploughing to control juveniles and adults of nematodes, and resting stages of insect pests.',
      'Follow crop rotation with non-host crops.',
      'Destroy the alternate host plants.',
      'Sow the ecological engineering plants.',
      'Sow sorghum/maize/bajra in 4 rows all around the main crop as a guard/barrier crop.',
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
