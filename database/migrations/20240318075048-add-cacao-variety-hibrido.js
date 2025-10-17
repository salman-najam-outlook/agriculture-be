'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const cropTypes = await queryInterface.select(null, 'options', {
        where: {
          [Sequelize.Op.or]: [
            { name: { [Sequelize.Op.like]: '%Cacao (Peru)%' } },
            { name: { [Sequelize.Op.like]: '%Cacao (Colombia)%' } },
            { name: { [Sequelize.Op.like]: '%Cocoa (Peru)%' } },
            { name: { [Sequelize.Op.like]: '%Cocoa (Colombia)%' } },
          ],
        },
      });

      if (cropTypes.length) {
        const cropVarieties = cropTypes.map((cropType) => {
          return {
            name: 'Hybrid',
            cropTypeOptId: cropType.id,
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });

        await Promise.all([
          await queryInterface.bulkInsert('crops', cropVarieties, { transaction }),
          await queryInterface.bulkInsert(
            'global_translation_metadata',
            [
              {
                english: 'Hybrid',
                hindi: 'हाइब्रिड',
                marathi: 'हायब्रिड',
                spanish: 'Híbrido',
                indonesian: 'Hibrida',
                portugese: 'Híbrido',
                nepali: 'हाइब्रिड',
                french: 'Hybride',
                arabic: 'هجين',
                swahili: 'Mseto',
                bengali: 'হাইব্রিড',
                oromo: 'Hybrid',
                somali: 'Hibrayd',
                vietnamese: 'Lạp ghép',
                amharic: 'ሕብሪድ',
                greek: 'Υβρίδιο',
                mandarin: '杂交',
                japanese: 'ハイブリッド',
                turkish: 'Melez',
                dutch: 'Hybride',
              },
            ],
            { transaction }
          ),
          await queryInterface.bulkUpdate('cacao_variety', { name: 'Hybrid' }, { name: 'Hibrido' }, { transaction }),
        ]);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {},
};
