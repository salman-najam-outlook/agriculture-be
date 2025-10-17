'use strict';

const translations = [
  {
    english: 'Early shoot borer',
    portugese: 'Broca de tiro precoce',
    spanish: 'Barrenador de brotes temprano',
  },
  {
    english: 'Coffee berry borer',
    portugese: 'Broca do café',
    spanish: 'Barrenador del café',
  },
  {
    english: 'Coffee White stem borer',
    portugese: 'Broca branca do caule do café',
    spanish: 'Barrenador blanco del tallo del café',
  },
  {
    english: 'Coffee Shot hole borer',
    portugese: 'Furador de Coffee Shot',
    spanish: 'Barrenador de café Shot',
  },
  {
    english: 'Coffee Red borer',
    portugese: 'Broca vermelha do café',
    spanish: 'Barrenador rojo del café',
  },
  {
    english: 'Wooly Aphid',
    portugese: 'Pulgão lanoso',
    spanish: 'Pulgón lanudo',
  },
  {
    english: 'Internode Borer',
    portugese: 'Perfurador de nós internos',
    spanish: 'Barrenador de entrenudos',
  },
  {
    english: 'Yellow leaf disease',
    portugese: 'Doença das folhas amarelas',
    spanish: 'Enfermedad de la hoja amarilla',
  },
  {
    english: 'Red rot',
    portugese: 'Podridão vermelha',
    spanish: 'Podredumbre roja',
  },
  {
    english: 'Sett rot',
    portugese: 'Assento apodrecido',
    spanish: 'Pudrición de sedimentos',
  },
  {
    english: 'Smut',
    portugese: 'Obscenidade',
    spanish: 'Tizón',
  },
  {
    english: 'Coffee Leaf rust',
    portugese: 'Ferrugem da folha de café',
    spanish: 'Roya de la hoja de café',
  },
  {
    english: 'Coffee  Berry blotch',
    portugese: 'Mancha do Café',
    spanish: 'Mancha de bayas de café',
  },
  {
    english: 'Coffee cercospora leaf spot',
    portugese: 'Mancha foliar de cercóspora do café',
    spanish: 'Mancha foliar cercospora del café',
  },
  {
    english: 'Coffee Anthracnose',
    portugese: 'Antracnose do café',
    spanish: 'Antracnosis del Café',
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const translation of translations) {
      const existingTranslations = await queryInterface.sequelize.query(
        'SELECT * FROM global_translation_metadata where english = :english',
        {
          replacements: { english: translation.english },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (existingTranslations && existingTranslations.length > 0) {
        await queryInterface.bulkUpdate(
          'global_translation_metadata',
          translation,
          {
            id: { [Sequelize.Op.in]: existingTranslations.map((translation) => translation.id) },
          }
        );
      } else {
        await queryInterface.insert(null, 'global_translation_metadata', translation);
      }
    }
  },

  async down (queryInterface, Sequelize) {}
};
