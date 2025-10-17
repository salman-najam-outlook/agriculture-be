'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const translation = [
      {
        english: 'Drying trays',
        hindi: 'सुखाने की ट्रे',
        marathi: 'शुष्कीकरण ट्रे',
        spanish: 'Bandejas de secado',
        indonesian: 'Nampan pengeringan',
        portugese: 'Tabuleiros de secagem',
        nepali: 'सुखाउन ट्रे',
        french: 'Plateaux de séchage',
        arabic: 'صواني التجفيف',
        swahili: 'Makabati ya kukausha',
        bengali: 'শুকনো ট্রে',
        oromo: 'Dhirbaa suukane',
        somali: 'Daboolayaal suuxi',
        vietnamese: 'Khay sấy',
        amharic: 'የማጭዎች እንቅስቃሴ',
        greek: 'Ταψιά ξήρανσης',
        mandarin: '晾干盘',
        japanese: '乾燥トレイ',
        turkish: 'Kurutma tepsileri'
      },
      {
        english: 'Elbas (movable dryers)',
        hindi: 'एलबास (चलते सुखाने)',
        marathi: 'एलबस (हलक्या बांधकाम)',
        spanish: 'Elbas (secadores móviles)',
        indonesian: 'Elbas (pengering bergerak)',
        portugese: 'Elbas (secadores móveis)',
        nepali: 'एल्बास (हलका शुष्ककरण)',
        french: 'Elbas (séchoirs mobiles)',
        arabic: 'إلباس (مجففات متنقلة)',
        swahili: 'Elbas (makavu yanayoweza kusonga)',
        bengali: 'এলবাস (চলমান শুকানো)',
        oromo: 'Elbas (farfannaa dhabamuudhaan)',
        somali: 'Elbas (fadlan la fura dheefiyo)',
        vietnamese: 'Elbas (máy sấy di động)',
        amharic: 'ኤልባስ (አገልግሎቶች በመሰል ያሉት)',
        greek: 'Elbas (κινητά στεγνωτήρια)',
        mandarin: 'Elbas (可移动烘干机)',
        japanese: 'エルバス（可動式乾燥機）',
        turkish: 'Elbas (taşınabilir kurutucular)'
      },
      {
        english: 'Drying Tunnels',
        hindi: 'सुखाने की सुरंगें',
        marathi: 'शुष्कीकरण टनल्स',
        spanish: 'Túneles de Secado',
        indonesian: 'Tunel Pengeringan',
        portugese: 'Túneis de Secagem',
        nepali: 'अपशिक्षा गुफाहरू',
        french: 'Tunnels de Séchage',
        arabic: 'أنفاق التجفيف',
        swahili: 'Mataa ya Kukausha',
        bengali: 'শুকানোর নালারা',
        oromo: 'Baraabara Gabaabaa',
        somali: 'Tunnels Daboolid',
        vietnamese: 'Đường Hầm Sấy',
        amharic: 'ማቆሚያ ቆንጆዎች',
        greek: 'Σήραγγες Ξήρανσης',
        mandarin: '烘干隧道',
        japanese: '乾燥トンネル',
        turkish: 'Kurutma Tünelleri'
      },
      {
        english: 'Cement',
        hindi: 'सीमेंट',
        marathi: 'सीमेंट',
        spanish: 'Cemento',
        indonesian: 'Sememtan',
        portugese: 'Cimento',
        nepali: 'सिमेन्ट',
        french: 'Ciment',
        arabic: 'اسمنت',
        swahili: 'Simenti',
        bengali: 'সিমেন্ট',
        oromo: 'Simentii',
        somali: 'Simeento',
        vietnamese: 'Xi măng',
        amharic: 'ሴመንት',
        greek: 'Τσιμέντο',
        mandarin: '水泥',
        japanese: 'セメント',
        turkish: 'Çimento'
      },
      {
        english: 'Orange',
        hindi: 'नारंगी',
        marathi: 'संत्रप्ती',
        spanish: 'Naranja',
        indonesian: 'Jeruk',
        portugese: 'Laranja',
        nepali: 'सुन्तला',
        french: 'Orange',
        arabic: 'برتقالي',
        swahili: 'Chungwa',
        bengali: 'কমলা',
        oromo: 'Amaroo',
        somali: 'Layla',
        vietnamese: 'Cam',
        amharic: 'ተረካ',
        greek: 'Πορτοκάλι',
        mandarin: '橙子',
        japanese: 'オレンジ',
        turkish: 'Portakal'
      },
      {
        english: 'Almonds',
        hindi: 'बादाम',
        marathi: 'बदाम',
        spanish: 'Almendras',
        indonesian: 'Almond',
        portugese: 'Amêndoas',
        nepali: 'बादाम',
        french: 'Amandes',
        arabic: 'لوز',
        swahili: 'Almonds',
        bengali: 'বাদাম',
        oromo: 'Almonds',
        somali: 'Loos',
        vietnamese: 'Hạnh nhân',
        amharic: 'አልመንድ',
        greek: 'Αμύγδαλα',
        mandarin: '杏仁',
        japanese: 'アーモンド',
        turkish: 'Badem'
      }
    ]
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
