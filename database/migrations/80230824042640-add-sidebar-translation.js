'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const translations = [
      {
        english: "Manage Offline Farmers",
        hindi: "ऑफ़लाइन किसानों को प्रबंधित करें",
        marathi: "ऑफलाइन शेतकरी व्यवस्थापित करा",
        spanish: "Administrar agricultores sin conexión",
        indonesian: "Kelola Petani Offline",
        portugese: "Gerenciar agricultores off-line",
        nepali: "अफलाइन किसानहरू प्रबन्ध गर्नुहोस्",
        french: "Gérer les agriculteurs hors ligne",
        arabic: "إدارة المزارعين غير متصل",
        swahili: "Dhibiti Wakulima wa Nje ya Mtandao",
        bengali: "অফলাইন কৃষকদের পরিচালনা করুন",
        oromo: "Qonnaan Bultoota Toora Alaa Bulchuu",
        somali: "Maamul beeralayda khadka tooska ah",
        vietnamese: "Quản lý nông dân ngoại tuyến",
        amharic: "ከመስመር ውጭ ገበሬዎችን ያስተዳድሩ",
        greek: "Διαχείριση Offline Farmers",
        mandarin: "管理線下農民",
        japanese: "オフラインファーマーの管理",
        turkish: "Çevrimdışı Çiftçileri Yönet",
      }
    ];
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
