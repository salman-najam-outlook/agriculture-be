'use strict';

const translations = [
  {
    english: 'Nutrient Management',
    hindi: 'पोषण प्रबंधन',
    marathi: 'पोषण प्रबंधन',
    spanish: 'Gestión de Nutrientes',
    indonesian: 'Manajemen Nutrisi',
    portugese: 'Gestão de Nutrientes',
    nepali: 'पोषण प्रबन्धन',
    french: 'Gestion des Nutriments',
    arabic: 'إدارة العناصر الغذائية',
    swahili: 'Usimamizi wa Virutubisho',
    bengali: 'পুষ্টি ব্যবস্থাপনা',
    oromo: 'Nutrient Management',
    somali: 'Nutrient Management',
    vietnamese: 'Quản lý Dinh dưỡng',
    amharic: 'ለውጥ ንብረቶች ማስተላለፊያ',
    greek: 'Διαχείριση Θρεπτικών Συστατικών',
    mandarin: '养分管理',
    japanese: '栄養管理',
    turkish: 'Besin Yönetimi',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const englishTranslations = translations.map((data) => data.english);

    await queryInterface.bulkDelete('global_translation_metadata', {
      english: {
        [Sequelize.Op.in]: englishTranslations,
      },
    });

    await queryInterface.bulkInsert('global_translation_metadata', translations);
  },

  async down(queryInterface, Sequelize) {},
};
