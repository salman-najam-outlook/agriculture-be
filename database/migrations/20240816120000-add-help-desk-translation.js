'use strict';

const translation = {
  english: 'Help Desk',
  hindi: 'हेल्प डेस्क',
  marathi: 'मदत डेस्क',
  nepali: 'मद्दत डेस्क',
  spanish: 'Mesa de ayuda',
  swahili: 'Dawati la Msaada',
  indonesian: 'Pusat Bantuan',
  french: 'Assistance',
  portugese: 'Central de Ajuda',
  arabic: 'مكتب المساعدة',
  bengali: 'সহায়তা ডেস্ক',
  oromo: 'Gargaarsa Teessoo',
  somali: 'Miiska Caawinta',
  vietnamese: 'Bàn trợ giúp',
  amharic: 'የእርዳታ ዴስክ',
  greek: 'Γραφείο Βοήθειας',
  mandarin: '服务台',
  turkish: 'Yardım Masası',
  japanese: 'ヘルプデスク',
  dutch: 'Helpdesk',
  italian: 'Assistenza'
};

module.exports = {
  async up(queryInterface, Sequelize) {
    let sql = 'SELECT * FROM global_translation_metadata WHERE english = :english';
    const global_trans = await queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { english: translation.english },
    });

    if (global_trans && global_trans.length > 0) {
      // Update existing
      await queryInterface.bulkUpdate('global_translation_metadata', translation, { id: global_trans[0].id });
    } else {
      // Insert new
      await queryInterface.insert(null, 'global_translation_metadata', translation);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('global_translation_metadata', { english: translation.english });
  }
}; 