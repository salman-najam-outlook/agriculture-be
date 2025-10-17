'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        "English": "Mapped",
        "Hindi": "मैप किए गए",
        "Marathi": "मॅप केलेले",
        "Spanish": "Mapeado",
        "Indonesian": "Dipetakan",
        "Portugese": "Mapeado",
        "Nepali": "मापन",
        "French": "Cartographié",
        "Arabic": "تعيين",
        "Swahili": "मैप किए गए",
        "Bengali": "ম্যাপড",
        "Oromo": "",
        "Somali": "Gatay",
        "Vietnamese": "Ánh xạ",
        "Amharic": "ካርታ",
        "Greek": "Χαρτογραφημένος",
        "Mandarin": "映射",
        "Japanese": "マッピング",
        "Turkish": "Haritalanmış"
      },
      {
        "English": "Personal",
        "Hindi": "निजी",
        "Marathi": "वैयक्तिक",
        "Spanish": "Personal",
        "Indonesian": "Pribadi",
        "Portugese": "Pessoal",
        "Nepali": "व्यक्तिगत",
        "French": "Personnel",
        "Arabic": "شخصي",
        "Swahili": "निजी",
        "Bengali": "ব্যক্তিগত",
        "Oromo": "",
        "Somali": "Shakhsi ahaan",
        "Vietnamese": "Riêng tư",
        "Amharic": "የግል",
        "Greek": "Προσωπικός",
        "Mandarin": "个人的",
        "Japanese": "個人的",
        "Turkish": "Kişisel"
      },
      {
        "English": "Unmapped",
        "Hindi": "तुच्छ",
        "Marathi": "अनपॅप केलेले",
        "Spanish": "Sin mapeado",
        "Indonesian": "Belum dipetakan",
        "Portugese": "Não mapeado",
        "Nepali": "अनगिन्ती",
        "French": "Non cartographié",
        "Arabic": "غير محفور",
        "Swahili": "तुच्छ",
        "Bengali": "আনম্যাপড",
        "Oromo": "",
        "Somali": "Aan la soo koobi karin",
        "Vietnamese": "Unlaps",
        "Amharic": "አልተለወጠም",
        "Greek": "Άκαμπτος",
        "Mandarin": "未铺装",
        "Japanese": "マップされていない",
        "Turkish": "Kesilmemiş"
      },
      {
        "English": "Equipments",
        "Hindi": "उपकरणों",
        "Marathi": "उपकरणे",
        "Spanish": "Equipos",
        "Indonesian": "Peralatan",
        "Portugese": "Equipamentos",
        "Nepali": "सुविधाहरू",
        "French": "Équipements",
        "Arabic": "المعدات",
        "Swahili": "उपकरणों",
        "Bengali": "সরঞ্জাম",
        "Oromo": "",
        "Somali": "Qalab qalafinaya",
        "Vietnamese": "Thiết bị",
        "Amharic": "መሣሪያዎች",
        "Greek": "Εξοπλισμός",
        "Mandarin": "设备",
        "Japanese": "機器",
        "Turkish": "Ekipman"
      },
      {
        "English": "Group equipment",
        "Hindi": "समूह -उपस्कर",
        "Marathi": "गट उपकरणे",
        "Spanish": "Equipo grupal",
        "Indonesian": "Peralatan grup",
        "Portugese": "Equipamento em grupo",
        "Nepali": "समुह उपकरण",
        "French": "Équipement de groupe",
        "Arabic": "معدات المجموعة",
        "Swahili": "समूह -उपस्कर",
        "Bengali": "গ্রুপ সরঞ্জাম",
        "Oromo": "",
        "Somali": "Qalabka Kooxda",
        "Vietnamese": "Thiết bị nhóm",
        "Amharic": "የቡድን መሣሪያዎች",
        "Greek": "Ομαδικός εξοπλισμός",
        "Mandarin": "组设备",
        "Japanese": "グループ機器",
        "Turkish": "Grup ekipmanı"
      },
      {
        "English": "summer",
        "Hindi": "गर्मी",
        "Marathi": "उन्हाळा",
        "Spanish": "verano",
        "Indonesian": "musim panas",
        "Portugese": "verão",
        "Nepali": "गर्मी",
        "French": "été",
        "Arabic": "صيف",
        "Swahili": "गर्मी",
        "Bengali": "গ্রীষ্ম",
        "Oromo": "",
        "Somali": "xagaa",
        "Vietnamese": "mùa hè",
        "Amharic": "ክረምት",
        "Greek": "καλοκαίρι",
        "Mandarin": "夏天",
        "Japanese": "夏",
        "Turkish": "yaz"
      },
      {
        "English": "autumn",
        "Hindi": "पतझड़",
        "Marathi": "शरद .तूतील",
        "Spanish": "otoño",
        "Indonesian": "musim gugur",
        "Portugese": "outono",
        "Nepali": "शरद ऋतु",
        "French": "automne",
        "Arabic": "خريف",
        "Swahili": "पतझड़",
        "Bengali": "শরত্কাল",
        "Oromo": "",
        "Somali": "deyr",
        "Vietnamese": "mùa thu",
        "Amharic": "መከር",
        "Greek": "φθινόπωρο",
        "Mandarin": "秋天",
        "Japanese": "秋",
        "Turkish": "sonbahar"
      },
      {
        "English": "No Loan",
        "Hindi": "ऋण",
        "Marathi": "कर्ज नाही",
        "Spanish": "Sin préstamo",
        "Indonesian": "Tidak ada pinjaman",
        "Portugese": "Sem empréstimo",
        "Nepali": "ऋण छैन",
        "French": "Pas de prêt",
        "Arabic": "لا قرض",
        "Swahili": "ऋण",
        "Bengali": "কোন loan ণ নেই",
        "Oromo": "",
        "Somali": "Deyn la'aan",
        "Vietnamese": "Không cho vay",
        "Amharic": "ብድር የለም",
        "Greek": "Χωρίς δάνειο",
        "Mandarin": "没有贷款",
        "Japanese": "ローンなし",
        "Turkish": "Kredi Yok"
      },
      {
        "English": "Semen freezing tank",
        "Hindi": "वीर्य ठंड टैंक",
        "Marathi": "वीर्य अतिशीत टाकी",
        "Spanish": "Tanque de congelación de semen",
        "Indonesian": "Tangki pembekuan semen",
        "Portugese": "Tanque de congelamento do sêmen",
        "Nepali": "वीर्य जम्ने ट्याङ्की",
        "French": "Réservoir de congélation de sperme",
        "Arabic": "السائل المنوي دبابة تجميد",
        "Swahili": "वीर्य ठंड टैंक",
        "Bengali": "বীর্য হিমশীতল ট্যাঙ্ক",
        "Oromo": "",
        "Somali": "Teenda loo yaqaan 'Semen haanta la qaboojiyo",
        "Vietnamese": "Bể đông lạnh tinh dịch",
        "Amharic": "የፍሳሽ ማስወገጃ ማጠራቀሚያ",
        "Greek": "Δεξαμενή κατάψυξης σπέρματος",
        "Mandarin": "精液冷冻罐",
        "Japanese": "精液凍結タンク",
        "Turkish": "Semen Dondurucu Tank"
      },
      {
        "English": "Juice tank",
        "Hindi": "जूस टैंक",
        "Marathi": "रस टाकी",
        "Spanish": "Tanque de jugo",
        "Indonesian": "Tangki jus",
        "Portugese": "Tanque de suco",
        "Nepali": "रस ट्याङ्की",
        "French": "Réservoir de jus",
        "Arabic": "خزان عصير",
        "Swahili": "जूस टैंक",
        "Bengali": "রস ট্যাঙ্ক",
        "Oromo": "",
        "Somali": "Haanta casiir",
        "Vietnamese": "Bể nước trái cây",
        "Amharic": "ጭማቂ ታንክ",
        "Greek": "Δεξαμενή χυμού",
        "Mandarin": "果汁罐",
        "Japanese": "ジュースタンク",
        "Turkish": "Meyve suyu"
      }
     ]
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
