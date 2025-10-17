'use strict';

const translations = [
  {
    english: 'Start date',
    spanish: 'Fecha de inicio',
    portugese: 'Data de início',
  },
  {
    english: 'End date',
    spanish: 'Fecha final',
    portugese: 'Data de término',
  },
  {
    english: 'Your date of irrigation',
    spanish: 'Tu fecha de riego',
    portugese: 'Sua data de irrigação',
  },
  {
    english: 'Your water volume',
    spanish: 'Tu volumen de agua',
    portugese: 'Seu volume de água',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const translation of translations) {
      const existingTranslations = await queryInterface.sequelize.query(
        'SELECT * FROM global_translation_metadata where english = :english',
        {
          replacements: { english: translation.english },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (existingTranslations && existingTranslations.length > 0) {
        await queryInterface.bulkUpdate('global_translation_metadata', translation, {
          id: { [Sequelize.Op.in]: existingTranslations.map((translation) => translation.id) },
        });
      } else {
        await queryInterface.insert(null, 'global_translation_metadata', translation);
      }
    }
  },

  async down(queryInterface, Sequelize) {},
};
