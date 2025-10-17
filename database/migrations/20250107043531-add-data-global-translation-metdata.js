'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const translationData = [
        {
          english: "Regional Risk Assessment",
          hindi: "क्षेत्रीय जोखिम मूल्यांकन",
          marathi: "प्रादेशिक जोखमीचे मूल्यांकन",
          nepali: "क्षेत्रीय जोखिम मूल्यांकन",
          spanish: "Evaluación de Riesgo Regional",
          swahili: "Tathmini ya Hatari ya Kanda",
          indonesian: "Penilaian Risiko Regional",
          french: "Évaluation Régionale des Risques",
          portugese: "Avaliação de Risco Regional",
          arabic: "تقييم المخاطر الإقليمي",
          bengali: "আঞ্চলিক ঝুঁকি মূল্যায়ন",
          oromo: "Yaadannoo Qorannoo Qorannoo Naannoo",
          somali: "Qiimaynta Khataraha Gobolka",
          vietnamese: "Đánh giá Rủi ro Khu vực",
          amharic: "ክልል አደጋ ጥናት",
          greek: "Περιφερειακή Αξιολόγηση Κινδύνου",
          mandarin: "区域风险评估",
          turkish: "Bölgesel Risk Değerlendirmesi",
          japanese: "地域リスク評価",
          dutch: "Regionale Risicobeoordeling",
          italian: "Valutazione del Rischio Regionale"
        }
      ];

      await queryInterface.bulkInsert('global_translation_metadata', translationData, { transaction });
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    
  }
};