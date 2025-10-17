'use strict';
const translations = {
  english: 'Facility Output',
  hindi: 'सुविधा उत्पादन',
  marathi: 'सुविधा उत्पादन',
  spanish: 'Salida de la instalación',
  indonesian: 'Keluaran Fasilitas',
  portugese: 'Saída da Instalação',
  nepali: 'सुविधा उत्पादन',
  french: 'Sortie de l\'installation',
  arabic: 'ناتج المنشأة',
  swahili: 'Pato la Kituo',
  bengali: 'সুবিধা আউটপুট',
  oromo: 'Baay\'ina Bu\'aa',
  somali: 'Soo saarista Xarunta',
  vietnamese: 'Đầu ra của cơ sở',
  amharic: 'የተቋማ ውጤት',
  greek: 'Παραγωγή Εγκατάστασης',
  mandarin: '设施输出',
  japanese: '施設の出力',
  turkish: 'Tesis Çıkışı',
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Update the existing entry
      await queryInterface.bulkUpdate(
        'global_translation_metadata',
        { english: 'Facility Output' },
        { english: 'Final Product' },
        { transaction }
      );

      // Add the respective translations
      const existingEntry = await queryInterface.sequelize.query(
        'SELECT * FROM global_translation_metadata WHERE english = :english',
        {
          replacements: { english: 'Facility Output' },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        }
      );

      if (existingEntry.length > 0) {
        const entryId = existingEntry[0].id;
        await queryInterface.bulkUpdate(
          'global_translation_metadata',
          translations,
          { id: entryId },
          { transaction }
        );
      } else {
        await queryInterface.bulkInsert(
          'global_translation_metadata',
          [{ ...translations, createdAt: new Date(), updatedAt: new Date() }],
          { transaction }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
