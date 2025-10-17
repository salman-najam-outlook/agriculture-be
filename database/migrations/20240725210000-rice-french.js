const translations = [
    {
        "english": "Rice (Nepal)",
        "french": "Riz (Népal)"
    }
]


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
  
    async down(queryInterface, Sequelize) { }
  };