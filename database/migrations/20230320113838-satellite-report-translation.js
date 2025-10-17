'use strict';
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const translation = [{
      english: "Satellite Reports are ready for download",
      hindi: "सैटेलाइट रिपोर्ट डाउनलोड के लिए तैयार हैं",
      marathi: "उपग्रह अहवाल डाउनलोडसाठी तयार आहेत",
      nepali: "स्याटेलाइट रिपोर्टहरू डाउनलोडका लागि तयार छन्",
      spanish: "Los informes satelitales están listos para descargar",
      swahili: "Ripoti za Setilaiti ziko tayari kupakuliwa",
      indonesian: "Laporan Satelit siap diunduh",
      french: "Les rapports satellites sont prêts à être téléchargés",
      portugese: "Relatórios de satélite estão prontos para download",
      arabic: "تقارير الأقمار الصناعية جاهزة للتحميل",
      bengali: "স্যাটেলাইট রিপোর্ট ডাউনলোডের জন্য প্রস্তুত",
      oromo: "Gabaasa Saatalaayitii buufachuuf qophaa'eera",
      somali: "Warbixinnada Satellite-ka ayaa diyaar u ah soo dejinta",
      vietnamese: "Báo cáo vệ tinh đã sẵn sàng để tải xuống",
      amharic: "የሳተላይት ሪፖርቶች ለመውረድ ዝግጁ ናቸው።",
      greek: "Οι Satellite Reports είναι έτοιμες για λήψη",
      mandarin: "卫星报告可供下载",
      turkish: "Uydu Raporları indirilmeye hazır",
      japanese: "サテライト レポートをダウンロードできます",
      createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      english: "You can download the report by clicking here",
      hindi: "आप यहां क्लिक करके रिपोर्ट डाउनलोड कर सकते हैं",
      marathi: "तुम्ही येथे क्लिक करून अहवाल डाउनलोड करू शकता",
      nepali: "तपाईं यहाँ क्लिक गरेर रिपोर्ट डाउनलोड गर्न सक्नुहुन्छ",
      spanish: "Puede descargar el informe haciendo clic aquí",
      swahili: "Unaweza kupakua ripoti hiyo kwa kubofya hapa",
      indonesian: "Anda dapat mengunduh laporan dengan mengklik di sini",
      french: "Vous pouvez télécharger le rapport en cliquant ici",
      portugese: "Você pode baixar o relatório clicando aqui",
      arabic: "يمكنك تنزيل التقرير بالضغط هنا",
      bengali: "আপনি এখানে ক্লিক করে প্রতিবেদনটি ডাউনলোড করতে পারেন",
      oromo: "Gabaasa kana tuquun buufachuu dandeessu",
      somali: "Waxaad kala soo bixi kartaa warbixinta adigoo gujinaya halkan",
      vietnamese: "Bạn có thể tải xuống báo cáo bằng cách nhấp vào đây",
      amharic: "እዚህ በመጫን ዘገባውን ማውረድ ትችላላችሁ",
      greek: "Μπορείτε να κατεβάσετε την έκθεση κάνοντας κλικ εδώ",
      mandarin: "您可以点击此处下载报告",
      turkish: "Raporu buraya tıklayarak indirebilirsiniz",
      japanese: "レポートはこちらからダウンロードできます",
      createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    }]
    await queryInterface.bulkInsert("global_translation_metadata", translation, {});
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
