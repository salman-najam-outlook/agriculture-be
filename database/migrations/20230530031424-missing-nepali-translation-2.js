'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        "English": "Dehorner",
        "Hindi": "देहॉर्नर",
        "Marathi": "डीहॉर्नर",
        "Spanish": "Deshornera",
        "Indonesian": "Dehorner",
        "Portugese": "Dehorner",
        "Nepali": "सिंग्डाको नाका हटाउने औजार",
        "French": "Dehorner",
        "Arabic": "Dehorner",
        "Swahili": "देहॉर्नर",
        "Bengali": "ডিহর্নার",
        "Oromo": "",
        "Somali": "Deforner",
        "Vietnamese": "Dehorner",
        "Amharic": "ደፋር",
        "Greek": "Απολυτής",
        "Mandarin": "迪霍纳",
        "Japanese": "デホナー",
        "Turkish": "Dehorner"
      },
      {
        "English": "Hand hoe",
        "Hindi": "हाथ कुदाल",
        "Marathi": "हात hoe",
        "Spanish": "Azada",
        "Indonesian": "Cangkul tangan",
        "Portugese": "Branding iron",
        "Nepali": "हातको डाकु",
        "French": "Houe à la main",
        "Arabic": "مجرفة اليد",
        "Swahili": "हाथ कुदाल",
        "Bengali": "হাতের নিড়ানি",
        "Oromo": "",
        "Somali": "Gacanta hoe",
        "Vietnamese": "Tay cuốc",
        "Amharic": "እጅ ሆሞክ",
        "Greek": "Χεριών",
        "Mandarin": "手",
        "Japanese": "ハンドホー",
        "Turkish": "Elle"
      },
      {
        "English": "Branding iron",
        "Hindi": "ब्रांडिंग लोहा",
        "Marathi": "ब्रँडिंग लोह",
        "Spanish": "Hierro de marcar",
        "Indonesian": "Besi branding",
        "Portugese": "Hand hoe",
        "Nepali": "ब्राण्डिङ आयरन",
        "French": "Branding Iron",
        "Arabic": "العلامة التجارية الحديد",
        "Swahili": "ब्रांडिंग लोहा",
        "Bengali": "ব্র্যান্ডিং লোহা",
        "Oromo": "",
        "Somali": "Branct Birta",
        "Vietnamese": "Thương hiệu sắt",
        "Amharic": "ብረት ብረት",
        "Greek": "Σίδερο",
        "Mandarin": "烙铁",
        "Japanese": "ブランディングアイロン",
        "Turkish": "Dağlama demiri"
      },
      {
        "English": "Tuktuk",
        "Hindi": "टुक टुक",
        "Marathi": "Tuktuk",
        "Spanish": "Tuktuk",
        "Indonesian": "Tuk tuk",
        "Portugese": "Tuktuk",
        "Nepali": "टुकटुक",
        "French": "Tuktuk",
        "Arabic": "توك توك",
        "Swahili": "टुक टुक",
        "Bengali": "টুকটুক",
        "Oromo": "",
        "Somali": "Tukuk",
        "Vietnamese": "Xe lam",
        "Amharic": "Tuktuk",
        "Greek": "Δοχείο",
        "Mandarin": "笃笃",
        "Japanese": "トゥクトゥク",
        "Turkish": "Tuktuk"
      },
      {
        "English": "Incubators",
        "Hindi": "इनक्यूबेटर",
        "Marathi": "इनक्यूबेटर",
        "Spanish": "Incubadoras",
        "Indonesian": "Inkubator",
        "Portugese": "Incubadoras",
        "Nepali": "गर्मालो मात्रा तयार गर्ने यन्त्र",
        "French": "Incubateurs",
        "Arabic": "حاضنات",
        "Swahili": "इनक्यूबेटर",
        "Bengali": "ইনকিউবেটর",
        "Oromo": "",
        "Somali": "Eryayaasha",
        "Vietnamese": "Ươm tạo",
        "Amharic": "መከለያዎች",
        "Greek": "Εκκολαπτήρια",
        "Mandarin": "孵化器",
        "Japanese": "インキュベーター",
        "Turkish": "İnkübatörler"
      },
      {
        "English": "Defoamer",
        "Hindi": "defoamer",
        "Marathi": "डीफोमर",
        "Spanish": "Defoamer",
        "Indonesian": "Defoamer",
        "Portugese": "DeFoamer",
        "Nepali": "फोम नष्ट गर्ने औजार",
        "French": "Décorner",
        "Arabic": "Defoamer",
        "Swahili": "defoamer",
        "Bengali": "ডিফোমার",
        "Oromo": "",
        "Somali": "Ku xidid",
        "Vietnamese": "Defoamer",
        "Amharic": "ጥፍሮች",
        "Greek": "Σπεύδρος",
        "Mandarin": "异议者",
        "Japanese": "デフォーマー",
        "Turkish": "Ahlaksız kimse"
      },
      {
        "English": "Pailas or cauldrons",
        "Hindi": "पिलास",
        "Marathi": "पायलास किंवा कढई",
        "Spanish": "Pailas o caldero",
        "Indonesian": "Pailas atau kuali",
        "Portugese": "Palas ou caldeirões",
        "Nepali": "पैला वा भिन्डी",
        "French": "Pailas ou chaudrons",
        "Arabic": "Pailas أو المرجل",
        "Swahili": "पिलास",
        "Bengali": "পাইলাস বা কলা",
        "Oromo": "",
        "Somali": "Baadhitaan ama godrons",
        "Vietnamese": "Pailas hoặc vạc",
        "Amharic": "ፓላዎች ወይም ጣውላዎች",
        "Greek": "Pailas ή καζάνι",
        "Mandarin": "胸肌或大锅",
        "Japanese": "パイラまたは大釜",
        "Turkish": "Pailalar veya kazan"
      },
      {
        "English": "Manual Labour",
        "Hindi": "शारीरिक श्रम",
        "Marathi": "मानवी श्रम",
        "Spanish": "Labor manual",
        "Indonesian": "Tenaga kerja manual",
        "Portugese": "Trabalho manual",
        "Nepali": "मैन्युअल श्रम",
        "French": "Travail manuel",
        "Arabic": "عمل يدوي",
        "Swahili": "शारीरिक श्रम",
        "Bengali": "কায়িক শ্রম",
        "Oromo": "",
        "Somali": "Shaqada gacanta",
        "Vietnamese": "Thủ công",
        "Amharic": "የጉልበት ሥራ",
        "Greek": "Χειρωνακτική εργασία",
        "Mandarin": "手工劳力",
        "Japanese": "肉体労働",
        "Turkish": "El emeği"
      },
      {
        "English": "Pasteurifers",
        "Hindi": "पाश्चुरीफर्स",
        "Marathi": "पेस्टेरिफर्स",
        "Spanish": "Pasteurifers",
        "Indonesian": "Pasteurifers",
        "Portugese": "Pasteurifers",
        "Nepali": "पास्चराइजर",
        "French": "Pasteurifers",
        "Arabic": "البسترة",
        "Swahili": "पाश्चुरीफर्स",
        "Bengali": "পেস্টুরিফার্স",
        "Oromo": "",
        "Somali": "Pastechifers",
        "Vietnamese": "Pasteurifers",
        "Amharic": "ፓስፖርት",
        "Greek": "Παστέρ",
        "Mandarin": "巴氏菌",
        "Japanese": "パスチューリファー",
        "Turkish": "Pasteififler"
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
       if (global_trans && global_trans.length > 0) {
         for (const gTrans of global_trans) {
           let item = {}
           for (let key in row) {
             const language = key.toLocaleLowerCase().trim();
             if (row[key]) {
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
