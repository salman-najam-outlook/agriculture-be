'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const translations = [
      {
        english: "Mango (Brazil)",
        portugese: "Manga (Brasil)"
      }
    ]
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const englishTranslations = translations.map((translation) => translation.english);
    const existingTranslations = await queryInterface.sequelize.query(
      'SELECT * FROM global_translation_metadata WHERE english IN(:englishTranslations)',
      {
        replacements: { englishTranslations },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    for (let existingTranslation of existingTranslations) {
      const matchingTranslation = translations.find(
        (translation) => translation.english.toLowerCase() === existingTranslation.english.toLowerCase()
      );
      if (matchingTranslation) {
        await queryInterface.bulkUpdate('global_translation_metadata', matchingTranslation, {
          id: existingTranslation.id,
        });
      }
    }

    const newTranslations = translations.filter((translation) => {
      const matchingTranslationIdx = existingTranslations.findIndex(
        (existingTranslation) => translation.english.toLowerCase() === existingTranslation.english.toLowerCase()
      );
      return matchingTranslationIdx === -1;
    });

    await queryInterface.bulkInsert('global_translation_metadata', newTranslations);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
