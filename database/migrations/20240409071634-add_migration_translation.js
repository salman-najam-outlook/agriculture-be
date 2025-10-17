'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        "English": "Heap Method",
        "Hindi": "ढेर विधि",
        "Marathi": "ढिगारा पद्धत",
        "Spanish": "Montón",
        "Indonesian": "Metode Tumpukan",
        "Portugese": "Método de Pilha",
        "Nepali": "थुप्रो विधि",
        "French": "Méthode de Tas",
        "Arabic": "طريقة الكومة",
        "Swahili": "Njia ya Rundo",
        "Bengali": "স্তূপ পদ্ধতি",
        "Oromo": "Qaama Method",
        "Somali": "Habka Taalada",
        "Vietnamese": "Phương pháp Đống",
        "Amharic": "ክምር መንገድ",
        "Greek": "Μέθοδος Σωρού",
        "Mandarin": "堆方法",
        "Japanese": "ヒープメソッド",
        "Turkish": "Yığın Yöntemi",
        "Dutch": "Hoop Methode"
      },
      {
        "English": "Tray Method",
        "Hindi": "ट्रे विधि",
        "Marathi": "ट्रे पद्धत",
        "Spanish": "Bandeja",
        "Indonesian": "Metode Nampan",
        "Portugese": "Método de bandeja",
        "Nepali": "ट्रे विधि",
        "French": "Méthode de plateau",
        "Arabic": "طريقة الصينية",
        "Swahili": "Njia ya Treyi",
        "Bengali": "ট্রে পদ্ধতি",
        "Oromo": "Waajjira Method",
        "Somali": "Habka Saxan",
        "Vietnamese": "Phương pháp Khay",
        "Amharic": "መሳሪያ መንገድ",
        "Greek": "Μέθοδος Δίσκου",
        "Mandarin": "托盘方法",
        "Japanese": "トレイメソッド",
        "Turkish": "Tepsi Yöntemi",
        "Dutch": "Dienblad Methode"
      },
      {
        "English": "Box Method",
        "Hindi": "बॉक्स विधि",
        "Marathi": "बॉक्स पद्धत",
        "Spanish": "Caja",
        "Indonesian": "Metode Kotak",
        "Portugese": "Método de caixa",
        "Nepali": "बाकस विधि",
        "French": "Méthode de boîte",
        "Arabic": "طريقة الصندوق",
        "Swahili": "Njia ya Sanduku",
        "Bengali": "বাক্স পদ্ধতি",
        "Oromo": "Sanduuqa Method",
        "Somali": "Habka Sanduuqa",
        "Vietnamese": "Phương pháp Hộp",
        "Amharic": "ሳጥን መንገድ",
        "Greek": "Μέθοδος Κουτιού",
        "Mandarin": "盒子方法",
        "Japanese": "ボックスメソッド",
        "Turkish": "Kutu Yöntemi",
        "Dutch": "Doos Methode"
      },
      {
        "English": "Basket Method",
        "Hindi": "टोकरी विधि",
        "Marathi": "टोपली पद्धत",
        "Spanish": "Cesta",
        "Indonesian": "Metode Keranjang",
        "Portugese": "Método de cesto",
        "Nepali": "डोको विधि",
        "French": "Méthode de panier",
        "Arabic": "طريقة السلة",
        "Swahili": "Njia ya Kikapu",
        "Bengali": "ঝুড়ি পদ্ধতি",
        "Oromo": "Basket Method",
        "Somali": "Habka Dambiisha",
        "Vietnamese": "Phương pháp Giỏ",
        "Amharic": "ቅርጫት መንገድ",
        "Greek": "Μέθοδος Καλαθιού",
        "Mandarin": "篮子方法",
        "Japanese": "バスケットメソッド",
        "Turkish": "Sepet Yöntemi",
        "Dutch": "Mand Methode"
      },
      {
        "English": "Gunny Bags",
        "Hindi": "बोरा बैग",
        "Marathi": "गोणी बॅग",
        "Spanish": "Bolsa",
        "Indonesian": "Kantong Goni",
        "Portugese": "Sacos de aniagem",
        "Nepali": "गनी झोला",
        "French": "Sacs en toile de jute",
        "Arabic": "أكياس الخيش",
        "Swahili": "Mifuko ya Gunia",
        "Bengali": "গুনি ব্যাগ",
        "Oromo": "Gunny Bags",
        "Somali": "Boorsooyinka Gunny",
        "Vietnamese": "Bao tải",
        "Amharic": "ጉኒ ከረጢቶች",
        "Greek": "Σάκοι Γκάνι",
        "Mandarin": "麻袋",
        "Japanese": "ガニーバッグ",
        "Turkish": "Jüt Çuvallar",
        "Dutch": "Jute Zakken"
      },
      {
        "English": "Sun Drying",
        "Hindi": "सूरज में सुखाना",
        "Marathi": "सूर्यप्रकाशात सुकवणे",
        "Spanish": "Secado al sol",
        "Indonesian": "Pengeringan Matahari",
        "Portugese": "Secagem ao sol",
        "Nepali": "सूर्यमा सुकाउने",
        "French": "Séchage au soleil",
        "Arabic": "التجفيف بالشمس",
        "Swahili": "Kukausha kwa Jua",
        "Bengali": "সূর্যে শুকানো",
        "Oromo": "Sun Drying",
        "Somali": "Qallajinta Qorraxda",
        "Vietnamese": "Phơi nắng",
        "Amharic": "ፀሐይ ማደሪያ",
        "Greek": "Αποξήρανση με τον ήλιο",
        "Mandarin": "阳光晾干",
        "Japanese": "日干し",
        "Turkish": "Güneşte Kurutma",
        "Dutch": "Zon Drogen"
      },
      {
        "English": "Mechanical Drying",
        "Hindi": "मैकेनिकल सुखाने की प्रक्रिया",
        "Marathi": "यांत्रिक सुकवणे",
        "Spanish": "Secado mecánico",
        "Indonesian": "Pengeringan Mekanis",
        "Portugese": "Secagem mecânica",
        "Nepali": "यान्त्रिक सुकाउने",
        "French": "Séchage mécanique",
        "Arabic": "التجفيف الميكانيكي",
        "Swahili": "Kukausha kwa Mashine",
        "Bengali": "যান্ত্রিক শুকানো",
        "Oromo": "Mechanical Drying",
        "Somali": "Qalajinta Mishiinada",
        "Vietnamese": "Sấy cơ học",
        "Amharic": "ማሽነሪ መደሪያ",
        "Greek": "Μηχανική Αποξήρανση",
        "Mandarin": "机械干燥",
        "Japanese": "機械乾燥",
        "Turkish": "Mekanik Kurutma",
        "Dutch": "Mechanisch Drogen"
      },
      {
        "English": "Earthy",
        "Hindi": "मिट्टी की सुगंध वाला",
        "Marathi": "मातीचा",
        "Spanish": "Terroso",
        "Indonesian": "Bertanah",
        "Portugese": "Terroso",
        "Nepali": "पृथ्वीजस्तो",
        "French": "Terreux",
        "Arabic": "أرضي",
        "Swahili": "Kama Udongo",
        "Bengali": "মাটির",
        "Oromo": "Earthy",
        "Somali": "Dhulka",
        "Vietnamese": "Mùi đất",
        "Amharic": "የምድር ጣፋጭ",
        "Greek": "Γήινο",
        "Mandarin": "泥土味的",
        "Japanese": "土っぽい",
        "Turkish": "Toprak gibi",
        "Dutch": "Aards"
      },
      {
        "English": "Slightly nutty",
        "Hindi": "थोड़ा नटी",
        "Marathi": "थोडे नटी",
        "Spanish": "Ligeramente a nuez",
        "Indonesian": "Sedikit beraroma kacang",
        "Portugese": "Ligeiramente a noz",
        "Nepali": "अलिकति नटी",
        "French": "Légèrement noisette",
        "Arabic": "قليلاً مكسرات",
        "Swahili": "Kidogo kama karanga",
        "Bengali": "সামান্য বাদামি",
        "Oromo": "Slightly nutty",
        "Somali": "Yar oo lows ah",
        "Vietnamese": "Hơi hạt",
        "Amharic": "ትንሽ እንክርዳኝ",
        "Greek": "Ελαφρώς ξηροί καρποί",
        "Mandarin": "略带坚果味",
        "Japanese": "少しナッティー",
        "Turkish": "Biraz fındık gibi",
        "Dutch": "Licht nootachtig"
      },
      {
        "English": "Fruity",
        "Hindi": "फलों का स्वाद",
        "Marathi": "फळांचा स्वाद",
        "Spanish": "Frutal",
        "Indonesian": "Buah",
        "Portugese": "Frutado",
        "Nepali": "फलदार",
        "French": "Fruité",
        "Arabic": "فواكه",
        "Swahili": "Matunda",
        "Bengali": "ফলের",
        "Oromo": "Fruity",
        "Somali": "Midho leh",
        "Vietnamese": "Hương trái cây",
        "Amharic": "ፍሬ ጣፋጭ",
        "Greek": "Φρουτώδες",
        "Mandarin": "果味的",
        "Japanese": "フルーティー",
        "Turkish": "Meyvemsi",
        "Dutch": "Fruitig"
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
