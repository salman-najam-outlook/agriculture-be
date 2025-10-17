'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('global_translation_metadata', {
      english: 'These fields are invalid',
    });

    await queryInterface.insert(null, 'global_translation_metadata', {
      english: 'These data are invalid',
      hindi: 'ये डेटा अमान्य हैं',
      marathi: 'हे डेटा अवैध आहेत',
      spanish: 'Estos datos son inválidos',
      indonesian: 'Data ini tidak valid',
      portugese: 'Estes dados são inválidos',
      nepali: 'यी डाटा अमान्य छन्',
      french: 'Ces données sont invalides',
      arabic: 'هذه البيانات غير صالحة',
      swahili: 'Hizi data ni batili',
      bengali: 'এই ডেটা অবৈধ',
      oromo: 'Maalaa inni akkaataa irratti dhiyaate',
      somali: 'These data are invalid',
      vietnamese: 'Các dữ liệu này không hợp lệ',
      amharic: 'ይህ መረጃዎች አይደሉም',
      greek: 'Αυτά τα δεδομένα δεν είναι έγκυρα',
      mandarin: '这些数据无效',
      japanese: 'これらのデータは無効です',
      turkish: 'Bu veriler geçersizdir',
    });
  },

  async down(queryInterface, Sequelize) {},
};
