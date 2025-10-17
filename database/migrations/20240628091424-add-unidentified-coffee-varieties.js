'use strict';

const coffeeVarietiesTranslations = [
  {
    english: 'Unknown',
    hindi: 'अज्ञात',
    marathi: 'अज्ञात',
    spanish: 'Desconocido',
    indonesian: 'Tidak diketahui',
    portugese: 'Desconhecido',
    nepali: 'अज्ञात',
    french: 'Inconnu',
    arabic: 'غير معروف',
    swahili: 'Haijulikani',
    bengali: 'অজানা',
    oromo: 'Hin beekamne',
    somali: 'Lama yaqaan',
    vietnamese: 'Không rõ',
    amharic: 'ያልታወቀ',
    greek: 'Άγνωστο',
    mandarin: '未知',
    japanese: '未知',
    turkish: 'Bilinmeyen',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    english: 'Others',
    hindi: 'अन्य',
    marathi: 'इतर',
    spanish: 'Otros',
    indonesian: 'Lainnya',
    portugese: 'Outros',
    nepali: 'अन्य',
    french: 'Autres',
    arabic: 'آخرون',
    swahili: 'Wengine',
    bengali: 'অন্যান্য',
    oromo: 'Kanneen biroo',
    somali: 'Kuwa kale',
    vietnamese: 'Khác',
    amharic: 'ሌሎች',
    greek: 'Άλλα',
    mandarin: '其他',
    japanese: 'その他',
    turkish: 'Diğerleri',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const coffeeVarietyNames = coffeeVarietiesTranslations.map((translation) => translation.english);
const coffeeSpeciesNames = ['Robusta', 'Arabica', 'Liberica', 'Hybrid'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const coffeeSpecies = await queryInterface.sequelize.query(
        'SELECT * FROM coffee_species WHERE name IN (:coffeeSpeciesNames)',
        {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { coffeeSpeciesNames },
        }
      );
      const coffeeSpeciesIds = coffeeSpecies.map((item) => item.id);
      const coffeeVarietiesData = [];
      for (const speciesId of coffeeSpeciesIds) {
        for (const name of coffeeVarietyNames) {
          coffeeVarietiesData.push({
            name,
            coffee_species: speciesId,
            status: 1,
            isDeleted: 0,
            created_by: null,
          });
        }
      }

      await queryInterface.bulkInsert('coffee_variety', coffeeVarietiesData, {
        transaction,
      });
      await queryInterface.bulkInsert('global_translation_metadata', coffeeVarietiesTranslations, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('coffee_variety', {
      name: { [Sequelize.Op.in]: coffeeVarietyNames },
      created_by: null,
    });
  },
};
