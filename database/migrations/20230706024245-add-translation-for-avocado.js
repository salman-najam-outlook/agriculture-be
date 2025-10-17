'use strict';

const translations = [
  {
    english: 'Avocado',
    hindi: 'एवोकाडो',
    marathi: 'एवोकॅडो',
    nepali: 'एभोकाडो',
    spanish: 'Palta',
    swahili: 'Parachichi',
    indonesian: 'Alpukat',
    french: 'Avocat',
    portugese: 'Abacate',
    arabic: 'أفوكادو',
    bengali: 'অ্যাভোকাডো',
    oromo: 'Avokaadoo',
    somali: 'Avokado',
    vietnamese: 'Trái bơ',
    amharic: 'አቮካዶ',
    greek: 'Αβοκάντο',
    mandarin: '牛油果',
    turkish: 'Avokado',
    japanese: 'アボカド',
  },
  {
    english: 'Avocado (Kenya)',
    hindi: 'एवोकाडो (केन्या)',
    marathi: 'एवोकॅडो (केनिया)',
    nepali: 'एभोकाडो (केन्या)',
    spanish: 'Palta (Kenia)',
    swahili: 'Parachichi (Kenya)',
    indonesian: 'Alpukat (Kenya)',
    french: 'Avocat (Kenya)',
    portugese: 'Abacate (Quênia)',
    arabic: 'الأفوكادو (كينيا)',
    bengali: 'অ্যাভোকাডো (কেনিয়া)',
    oromo: 'Avokaadoo (Keeniyaa)',
    somali: 'Avokado (Kenya)',
    vietnamese: 'Trái bơ (Kê-ni-a)',
    amharic: 'አቮካዶ (ኬንያ)',
    greek: 'Αβοκάντο (Κενύα)',
    mandarin: '牛油果 （肯尼亚）',
    turkish: 'Avokado (Kenya)',
    japanese: 'アボカド (ケニア)',
  },
  {
    english: 'Reed',
    hindi: 'रीड',
    marathi: 'रीड',
    nepali: 'रीड',
    spanish: 'Caña',
    swahili: 'Mwanzi',
    indonesian: 'Gelagah',
    french: 'Roseau',
    portugese: 'Cana',
    arabic: 'قصب',
    bengali: 'খাগড়া',
    oromo: 'Reed',
    somali: 'Cawsduur',
    vietnamese: 'Cây sậy',
    amharic: 'ሸምበቆ',
    greek: 'καλάμι',
    mandarin: '芦苇',
    turkish: 'Kamış',
    japanese: 'アシ',
  },
  {
    english: 'Booth 8',
    hindi: 'बुथ ८',
    marathi: 'बुथ ८',
    nepali: 'बुथ ८',
    spanish: 'Stand 8',
    swahili: 'Kibanda 8',
    indonesian: 'Stan 8',
    french: 'Stand 8',
    portugese: 'Cabine 8',
    arabic: 'كشك 8',
    bengali: 'বুথ 8',
    oromo: 'Buufata 8',
    somali: 'Booth 8',
    vietnamese: 'gian hàng 8',
    amharic: 'ዳስ 8',
    greek: 'περίπτερο 8',
    mandarin: '8号展位',
    turkish: 'kabin 8',
    japanese: 'ブース8',
  },
  {
    english: 'Nabal',
    hindi: 'नाबाल',
    marathi: 'नाबाल',
    nepali: 'नाबल',
    spanish: 'Nabal',
    swahili: 'Nabali',
    indonesian: 'Nabal',
    french: 'Nabal',
    portugese: 'Nabal',
    arabic: 'نابال',
    bengali: 'নাবাল',
    oromo: 'Naabaal',
    somali: 'Nabal',
    vietnamese: 'Na-banh',
    amharic: 'ናባል',
    greek: 'Ναμπάλ',
    mandarin: '纳巴尔',
    turkish: 'Nabal',
    japanese: 'ナバル',
  },
  {
    english: 'Tonnage',
    hindi: 'टन भार',
    marathi: 'टनेज',
    nepali: 'टनेज',
    spanish: 'Tonelaje',
    swahili: 'Tani',
    indonesian: 'Tonase',
    french: 'Tonnage',
    portugese: 'Tonelagem',
    arabic: 'الحمولة',
    bengali: 'টনেজ',
    oromo: 'Tooniin',
    somali: 'Tonnage',
    vietnamese: 'Trọng tải',
    amharic: 'ቶንጅ',
    greek: 'Τονάζ',
    mandarin: '吨位',
    turkish: 'Tonaj',
    japanese: 'トン数',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
