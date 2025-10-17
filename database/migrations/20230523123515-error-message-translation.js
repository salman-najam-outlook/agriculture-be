'use strict';

/** @type {import('sequelize-cli').Migration} */

const langaugeObjects = [
  {
    english: 'New report requests can be submitted after completing current report requests',
    hindi: 'वर्तमान रिपोर्ट अनुरोधों को पूरा करने के बाद नई रिपोर्ट अनुरोध सबमिट किया जा सकता है',
    marathi: 'वर्तमान अहवाल विनंती पूर्ण करण्यानंतर नवीन अहवाल विनंती सबमिट केली जाऊ शकते',
    spanish: 'Se pueden enviar nuevas solicitudes de informes después de completar las solicitudes de informes actuales',
    indonesian: 'Permintaan laporan baru dapat diajukan setelah menyelesaikan permintaan laporan saat ini',
    portugese: 'Novas solicitações de relatório podem ser enviadas após a conclusão das solicitações de relatório atuais',
    nepali: 'हालका रिपोर्ट अनुरोधहरू पूरा गरेको पछि नयाँ रिपोर्ट अनुरोध सबमिट गर्न सकिन्छ',
    french: 'Les nouvelles demandes de rapport peuvent être soumises après avoir terminé les demandes de rapport en cours',
    arabic: 'يمكن تقديم طلبات تقارير جديدة بعد إكمال طلبات التقارير الحالية',
    swahili: 'Maombi mapya ya ripoti yanaweza kuwasilishwa baada ya kumaliza maombi ya ripoti ya sasa',
    bengali: 'বর্তমান রিপোর্ট অনুরোধগুলি সম্পূর্ণ করার পরে নতুন রিপোর্ট অনুরোধ জমা দেওয়া যাবে',
    oromo: 'New report requests can be submitted after completing current report requests',
    somali: 'Codsiga warbixinteeda cusub waxaa lagu sameeyaa kaddib markii la dhamaystirayo codsiyada warbixinta hadda jira',
    vietnamese: 'Các yêu cầu báo cáo mới có thể được gửi sau khi hoàn thành các yêu cầu báo cáo hiện tại',
    amharic: 'አዲስ የሚጠይቁ ሪፖርት ጥያቄዎች በየትምህርት ስር አይደለም',
    greek: 'Οι νέες αιτήσεις αναφοράς μπορούν να υποβληθούν μετά την ολοκλήρωση των τρεχουσών αιτήσεων αναφοράς',
    mandarin: '在完成當前報告請求之後，可以提交新的報告請求',
    japanese: '現在の報告依頼を完了した後、新しい報告依頼を提出できます',
    turkish: 'Mevcut rapor talepleri tamamlandıktan sonra yeni rapor talepleri gönderilebilir'
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      for (const obj in langaugeObjects) {
        await queryInterface.insert(null, 'global_translation_metadata', langaugeObjects[obj]);
      }
    } catch (err) {
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    for (const obj of langaugeObjects) {
      await queryInterface.bulkDelete('global_translation_metadata', { english: langaugeObjects[obj].english }, {}, {});
    }
  }
};
