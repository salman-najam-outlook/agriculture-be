'use strict';

const translations = [
  { english: 'Mungbean ( Brazil )', arabic: 'فاصوليا مونج (البرازيل)' },
  { english: 'Mungbean ( India )', arabic: 'فاصوليا مونج (الهند)' },
  { english: 'Mungbean ( Ethiopia )', arabic: 'فاصوليا مونج (إثيوبيا)' },
  { english: 'Nutmeg&mace (Indonesia)', arabic: 'جوزة الطيب وقشرها (إندونيسيا)' },
  { english: 'Ginger', arabic: 'زنجبيل' },
  { english: 'Tobacco ( Canada )', arabic: 'تبغ (كندا)' },
  { english: 'Mango', arabic: 'مانجو' },
  { english: 'Cauliflower (India)', arabic: 'قرنبيط (الهند)' },
  { english: 'Kidney bean (Brazil)', arabic: 'فاصوليا حمراء (البرازيل)' },
  { english: 'Kidney bean (India)', arabic: 'فاصوليا حمراء (الهند)' },
  { english: 'Nutmeg & mace', arabic: 'جوزة الطيب وقشرها' },
  { english: 'Papaya (India)', arabic: 'بابايا (الهند)' },
  { english: 'Grape', arabic: 'عنب' },
  { english: 'Mango (India)', arabic: 'مانجو (الهند)' },
  { english: 'Cocoa (Colombia)', arabic: 'كاكاو (كولومبيا)' },
  { english: 'Cocoa (Peru)', arabic: 'كاكاو (بيرو)' },
  { english: 'Garlic (India)', arabic: 'ثوم (الهند)' },
  { english: 'Apple (Brazil)', arabic: 'تفاح (البرازيل)' },
  { english: 'Wheat (Nepal)', arabic: 'قمح (نيبال)' },
  { english: 'Sorghum (Nepal)', arabic: 'ذرة سورغم (نيبال)' },
  { english: 'Nutmeg&mace (Nepal)', arabic: 'جوزة الطيب وقشرها (نيبال)' },
  { english: 'Tomato (Nepal)', arabic: 'طماطم (نيبال)' },
  { english: 'Orange', arabic: 'برتقال' },
  { english: 'Lemon (Nepal)', arabic: 'ليمون (نيبال)' },
  { english: 'Banana (Nepal)', arabic: 'موز (نيبال)' },
  { english: 'Onion (Nepal)', arabic: 'بصل (نيبال)' },
  { english: 'Strawberry (India)', arabic: 'فراولة (الهند)' },
  { english: 'Strawberry (Brazil)', arabic: 'فراولة (البرازيل)' },
  { english: 'Turmeric (India)', arabic: 'كركم (الهند)' },
  { english: 'Pearl millet (Nepal)', arabic: 'دخن (نيبال)' },
  { english: 'Papaya (Brazil)', arabic: 'بابايا (البرازيل)' },
  { english: 'Ginger (Nepal)', arabic: 'زنجبيل (نيبال)' },
  { english: 'Ginger (India)', arabic: 'زنجبيل (الهند)' },
  { english: 'Pearl Millet (India)', arabic: 'دخن (الهند)' },
  { english: 'Broccoli (India)', arabic: 'بروكلي (الهند)' },
  { english: 'Garlic (Nepal)', arabic: 'ثوم (نيبال)' },
  { english: 'Rapeseed ( Nepal )', arabic: 'بذور اللفت (نيبال)' },
  { english: 'Apple (Nepal)', arabic: 'تفاح (نيبال)' },
  { english: 'Blueberry (Brazil)', arabic: 'توت أزرق (البرازيل)' },
  { english: 'Mango (Brazil)', arabic: 'مانجو (البرازيل)' },
  { english: 'Oil palm (Colombia)', arabic: 'نخيل الزيت (كولومبيا)' },
  { english: 'Rice (Indonesia)', arabic: 'أرز (إندونيسيا)' },
  { english: 'Grape (Libya)', arabic: 'عنب (ليبيا)' },
  { english: 'Sugarcane (Tanzania)', arabic: 'قصب السكر (تنزانيا)' },
  { english: 'Pigeon pea (Peru)', arabic: 'عدس الحمام (بيرو)' },
  { english: 'Alfalfa (Libya)', arabic: 'الفالفا (ليبيا)' },
  { english: 'Grape (Brazil)', arabic: 'عنب (البرازيل)' },
  { english: 'Tobacco (Tanzania)', arabic: 'تبغ (تنزانيا)' },
  { english: 'Cocoa (Honduras)', arabic: 'كاكاو (هندوراس)' },
  { english: 'Rice (Nigeria)', arabic: 'أرز (نيجيريا)' },
  { english: 'Barley (Libya)', arabic: 'شعير (ليبيا)' },
  { english: 'Orange (Kenya)', arabic: 'برتقال (كينيا)' },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const translation of translations) {
      const sql = 'SELECT COUNT(id) as ct FROM global_translation_metadata WHERE english = :english';
      const translationCounts = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: translation.english },
      });
      if (translationCounts && translationCounts.length > 0 && translationCounts[0].ct > 0) {
        await queryInterface.bulkUpdate('global_translation_metadata', translation, { english: translation.english });
      } else {
        await queryInterface.insert(null, 'global_translation_metadata', translation);
      }
    }
  },

  async down(queryInterface, Sequelize) {},
};
