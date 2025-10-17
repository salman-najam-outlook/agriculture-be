'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        "English": "Weeding date",
        "Hindi": "निराई तिथि",
        "Marathi": "तारखेची तारीख",
        "Spanish": "Fecha de desmalezado",
        "Indonesian": "Tanggal penyiangan",
        "Portugese": "Data de ervas daninhas",
        "Nepali": "झारपात मिति",
        "French": "Date de désherbage",
        "Arabic": "تاريخ الأعشاب الضارة",
        "Swahili": "निराई तिथि",
        "Bengali": "আগাছা তারিখ",
        "Oromo": "",
        "Somali": "Taariikhda haramaha",
        "Vietnamese": "Ngày làm cỏ",
        "Amharic": "የማሰባሰብ ቀን",
        "Greek": "Ημερομηνία απορριμμάτων",
        "Mandarin": "除草日期",
        "Japanese": "除草日",
        "Turkish": "Ayıklama tarihi"
      },
      {
        "English": "Weeding Method",
        "Hindi": "निराई पद्धति",
        "Marathi": "वीडिंग पद्धत",
        "Spanish": "Método de desmalezado",
        "Indonesian": "Metode penyiangan",
        "Portugese": "Método de ervas daninhas",
        "Nepali": "झारपात विधि",
        "French": "Méthode de désherbage",
        "Arabic": "طريقة الأعشاب الضارة",
        "Swahili": "निराई पद्धति",
        "Bengali": "আগাছা পদ্ধতি",
        "Oromo": "",
        "Somali": "Qaabka loo yaqaan 'haration'",
        "Vietnamese": "Phương pháp làm cỏ",
        "Amharic": "የማሰባሰብ ዘዴ",
        "Greek": "Μέθοδος απορριμμάτων",
        "Mandarin": "除草法",
        "Japanese": "除草方法",
        "Turkish": "Ayıklama yöntemi"
      },
      {
        "English": "Herbicide used",
        "Hindi": "हर्बिसाइड का इस्तेमाल किया",
        "Marathi": "औषधी वनस्पती वापरली",
        "Spanish": "Herbicidio utilizado",
        "Indonesian": "Herbisida digunakan",
        "Portugese": "Herbicida usada",
        "Nepali": "जडिबुटी प्रयोग गरियो",
        "French": "Herbicide utilisé",
        "Arabic": "مبيدات الأعشاب المستخدمة",
        "Swahili": "हर्बिसाइड का इस्तेमाल किया",
        "Bengali": "ভেষজনাশক ব্যবহৃত",
        "Oromo": "",
        "Somali": "Digaag lagu isticmaalay",
        "Vietnamese": "Thuốc diệt cỏ được sử dụng",
        "Amharic": "ምስጢራዊነት ጥቅም ላይ ውሏል",
        "Greek": "Χρησιμοποιήθηκε ζιζανιοκτόνο",
        "Mandarin": "除草剂使用",
        "Japanese": "除草剤を使用しました",
        "Turkish": "Herbisit kullanıldı"
      },
      {
        "English": "Your herbicide dose/rate (litres/ha)",
        "Hindi": "आपकी हर्बिसाइड खुराक/दर (लीटर/हेक्टेयर)",
        "Marathi": "आपला औषधी वनस्पती डोस/दर (लिटर/हेक्टर)",
        "Spanish": "Su dosis/tasa de herbicidas (litros/ha)",
        "Indonesian": "Dosis/tingkat herbisida Anda (liter/ha)",
        "Portugese": "Sua dose/taxa de herbicida (litros/ha)",
        "Nepali": "तपाईंको जडिबुटी खुराक / दर (लिटरहरू / हेक्टर)",
        "French": "Votre dose / taux d'herbicide (litres / ha)",
        "Arabic": "جرعة/معدل مبيدات الأعشاب (لتر/هكتار)",
        "Swahili": "आपकी हर्बिसाइड खुराक/दर (लीटर/हेक्टेयर)",
        "Bengali": "আপনার ভেষজনাশক ডোজ/হার (লিটার/হেক্টর)",
        "Oromo": "",
        "Somali": "Qiyaastaada Cunto-kaadiyahaaga / Qiyaasta (litir / ha)",
        "Vietnamese": "Liều lượng thuốc diệt cỏ/tỷ lệ của bạn (lít/ha)",
        "Amharic": "የ hysbicide Doe / መጠን (ሊት / ሄክ)",
        "Greek": "Η δόση/τιμή του ζιζανιοκτόνου (λίτρα/εκτάριο)",
        "Mandarin": "您的除草剂剂量/费率（升/公顷）",
        "Japanese": "あなたの除草剤の用量/レート（リットル/ha）",
        "Turkish": "Herbisit dozunuz/oranınız (litre/ha)"
      },
      {
        "English": "Method of application",
        "Hindi": "अनुप्रयोग पद्धति",
        "Marathi": "अनुप्रयोगाची पद्धत",
        "Spanish": "Metodo de APLICACION",
        "Indonesian": "Metode aplikasi",
        "Portugese": "Método de aplicação",
        "Nepali": "अनुप्रयोगको विधि",
        "French": "Méthode d'application",
        "Arabic": "طريقة التطبيق",
        "Swahili": "अनुप्रयोग पद्धति",
        "Bengali": "আবেদনের পদ্ধতি",
        "Oromo": "",
        "Somali": "Habka loo codsado",
        "Vietnamese": "Phương pháp áp dụng",
        "Amharic": "የትግበራ ዘዴ",
        "Greek": "Μέθοδος εφαρμογής",
        "Mandarin": "应用方法",
        "Japanese": "適用方法",
        "Turkish": "Uygulama metodu"
      },
      {
        "English": "Type of cultural/mechanical/manual method",
        "Hindi": "सांस्कृतिक/यांत्रिक/मैनुअल विधि का प्रकार",
        "Marathi": "सांस्कृतिक/यांत्रिक/मॅन्युअल पद्धतीचा प्रकार",
        "Spanish": "Tipo de método cultural/mecánico/manual",
        "Indonesian": "Jenis Metode Budaya/Mekanik/Manual",
        "Portugese": "Tipo de método cultural/mecânico/manual",
        "Nepali": "सांस्कृतिक / मेकानिकल / म्यानुअल विधिको प्रकार",
        "French": "Type de méthode culturelle / mécanique / manuelle",
        "Arabic": "نوع الطريقة الثقافية/الميكانيكية/اليدوية",
        "Swahili": "सांस्कृतिक/यांत्रिक/मैनुअल विधि का प्रकार",
        "Bengali": "সাংস্কৃতিক/যান্ত্রিক/ম্যানুয়াল পদ্ধতির ধরণ",
        "Oromo": "",
        "Somali": "Nooca dhaqanka / qaab farsamo / hagitaan",
        "Vietnamese": "Loại phương pháp văn hóa/cơ học/thủ công",
        "Amharic": "የባህል / ሜካኒካል / መመሪያ ዘዴ",
        "Greek": "Τύπος πολιτιστικής/μηχανικής/χειροκίνητης μεθόδου",
        "Mandarin": "文化/机械/手动方法的类型",
        "Japanese": "文化的/機械的/手動方法の種類",
        "Turkish": "Kültürel/mekanik/manuel yöntem türü"
      },
      {
        "English": "Your yield (tonnes/ha)",
        "Hindi": "आपकी उपज (टन/हेक्टेयर)",
        "Marathi": "आपले उत्पन्न (टन/हेक्टर)",
        "Spanish": "Tu rendimiento (toneladas/ha)",
        "Indonesian": "Hasil Anda (ton/ha)",
        "Portugese": "Seu rendimento (toneladas/ha)",
        "Nepali": "तपाईंको उपज (टोन / हेक्टर)",
        "French": "Votre rendement (tonnes / ha)",
        "Arabic": "عائدك (أطنان/هكتار)",
        "Swahili": "आपकी उपज (टन/हेक्टेयर)",
        "Bengali": "আপনার ফলন (টন/হেক্টর)",
        "Oromo": "",
        "Somali": "Dhalidaada (tan '/ ha)",
        "Vietnamese": "Năng suất của bạn (tấn/ha)",
        "Amharic": "የእርስዎ ምርት (ቶን / ሄክታር)",
        "Greek": "Η απόδοση σας (τόνοι/ha)",
        "Mandarin": "您的产量（吨/公顷）",
        "Japanese": "あなたの利回り（トン/ha）",
        "Turkish": "Veriminiz (ton/ha)"
      },
      {
        "English": "Your harvesting date",
        "Hindi": "आपकी कटाई की तारीख",
        "Marathi": "आपली कापणीची तारीख",
        "Spanish": "Tu fecha de cosecha",
        "Indonesian": "Tanggal panen Anda",
        "Portugese": "Sua data de colheita",
        "Nepali": "तपाईंको कटनी मिति",
        "French": "Votre date de récolte",
        "Arabic": "تاريخ الحصاد الخاص بك",
        "Swahili": "आपकी कटाई की तारीख",
        "Bengali": "আপনার ফসল কাটার তারিখ",
        "Oromo": "",
        "Somali": "Taariikhdaada goosashada",
        "Vietnamese": "Ngày thu hoạch của bạn",
        "Amharic": "የመከር ቀንዎ",
        "Greek": "Η ημερομηνία συγκομιδής σας",
        "Mandarin": "您的收获日期",
        "Japanese": "あなたの収穫日",
        "Turkish": "Hasat Tarihiniz"
      },
      {
        "English": "Yield losses",
        "Hindi": "उपज हानि",
        "Marathi": "उत्पन्न नुकसान",
        "Spanish": "Pérdidas de rendimiento",
        "Indonesian": "Hasil kerugian",
        "Portugese": "Perdas de rendimento",
        "Nepali": "उपज घाटा",
        "French": "Pertes de rendement",
        "Arabic": "خسائر العائد",
        "Swahili": "उपज हानि",
        "Bengali": "ফলন ক্ষতি",
        "Oromo": "",
        "Somali": "Khasaaraha khasaaraha",
        "Vietnamese": "Năng suất tổn thất",
        "Amharic": "የስርዓቶች",
        "Greek": "Απόδοση ζημιών",
        "Mandarin": "产量损失",
        "Japanese": "積極的な損失",
        "Turkish": "Verim Kayıpları"
      },
      {
        "English": "Reason",
        "Hindi": "कारण",
        "Marathi": "कारण",
        "Spanish": "Razón",
        "Indonesian": "Alasan",
        "Portugese": "Razão",
        "Nepali": "कारण",
        "French": "Raison",
        "Arabic": "سبب",
        "Swahili": "कारण",
        "Bengali": "কারণ",
        "Oromo": "",
        "Somali": "Sabab",
        "Vietnamese": "Lý do",
        "Amharic": "ምክንያት",
        "Greek": "Λόγος",
        "Mandarin": "原因",
        "Japanese": "理由",
        "Turkish": "Sebep"
      }
     ];
    let count = 0;
    for (const row of data) {
      let sql = 'SELECT * FROM global_translation_metadata WHERE english = :english';
      const global_trans = await queryInterface.sequelize.query(sql, { 
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.English }
      });

      // update case
      if(global_trans && global_trans.length > 0) {
        for ( const gTrans of global_trans) {
          let item = {}
          for (let key in row) {
            const language = key.toLocaleLowerCase().trim();
            if(row[key]) {
              item[language] = row[key];
            }
          }
          await queryInterface.bulkUpdate('global_translation_metadata', item, { id: gTrans.id });
          count++;
        }
      } 
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, 'global_translation_metadata', item);
        count++;
      }

     }
     console.log('Records: ', count);
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
