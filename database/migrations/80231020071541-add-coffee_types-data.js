'use strict';

const coffeeTypesTranslations = [
  {
    english: 'Traditional',
    hindi: 'पारंपरिक',
    marathi: 'पारंपरिक',
    nepali: 'पारंपरिक',
    spanish: 'Tradicional',
    swahili: 'Jadi',
    indonesian: 'Tradisional',
    french: 'Traditionnel',
    portugese: 'Tradicional',
    arabic: 'تقليدي',
    bengali: 'পারম্পরিক',
    oromo: 'Gurraacha',
    somali: 'Qabiil',
    vietnamese: 'Truyền thống',
    amharic: 'ባንኪ',
    greek: 'Παραδοσιακός',
    mandarin: '传统',
    turkish: 'Geleneksel',
    japanese: '伝統的',
  },
  {
    english: 'Organic',
    hindi: 'कार्बनिक',
    marathi: 'कार्बनिक',
    nepali: 'कार्बनिक',
    spanish: 'Orgánico',
    swahili: 'Organiki',
    indonesian: 'Organik',
    french: 'Biologique',
    portugese: 'Orgânico',
    arabic: 'عضوي',
    bengali: 'জৈব',
    oromo: 'Korma',
    somali: 'Biolojiyad',
    vietnamese: 'Hữu cơ',
    amharic: 'ቦታዎች',
    greek: 'Βιολογικός',
    mandarin: '有机',
    turkish: 'Organik',
    japanese: 'オーガニック',
  },
  {
    english: 'In Transition',
    hindi: 'संक्रमण में',
    marathi: 'संक्रमणात्मक',
    nepali: 'संक्रमण',
    spanish: 'En Transición',
    swahili: 'Katika Mpito',
    indonesian: 'Dalam Transisi',
    french: 'En Transition',
    portugese: 'Em Transição',
    arabic: 'قيد التحول',
    bengali: 'পরিণতিতে',
    oromo: 'Garaa Garaa',
    somali: 'Dhimisho Dhaba',
    vietnamese: 'Trong Quá Trình Chuyển Đổi',
    amharic: 'በምዝገባ',
    greek: 'Σε Μετάβαση',
    mandarin: '过渡中',
    turkish: 'Geçişte',
    japanese: '移行中',
  },
];

const coffeeTypes = ['Traditional', 'Organic', 'In Transition'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const englishTranslations = coffeeTypesTranslations.map((data) => data.english);
      await queryInterface.bulkDelete(
        'global_translation_metadata',
        {
          english: {
            [Sequelize.Op.in]: englishTranslations,
          },
        },
        { transaction }
      );

      await queryInterface.bulkInsert('global_translation_metadata', coffeeTypesTranslations, { transaction });
      await queryInterface.bulkInsert(
        'coffee_types',
        coffeeTypes.map((type) => ({ name: type })),
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('coffee_types', {
      name: {
        [Sequelize.Op.in]: coffeeTypes,
      },
    });
  },
};
