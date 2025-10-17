"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const data = [
      {
        english: "Coffee Farmer",
        hindi: "कॉफी किसान",
        marathi: "कॉफी शेतकरी",
        spanish: "Agricultor de Café",
        indonesian: "Petani Kopi",
        portugese: "Agricultor de Café",
        nepali: "कफी किसान",
        french: "Agriculteur de Café",
        arabic: "مزارع البن",
        swahili: "Mkulima wa Kahawa",
        bengali: "কফি কৃষক",
        oromo: "Jaarmoti Gaarii",
        somali: "Beeraha Qabo",
        vietnamese: "Nông dân cà phê",
        amharic: "ቡና ተረጋግጧል",
        greek: "Καφετζής",
        mandarin: "咖啡农夫",
        japanese: "コーヒー農家",
        turkish: "Kahve Çiftçisi",
      },
      {
        english: "Farmer",
        hindi: "किसान",
        marathi: "शेतकरी",
        spanish: "Agricultor",
        indonesian: "Petani",
        portugese: "Agricultor",
        nepali: "किसान",
        french: "Agriculteur",
        arabic: "مزارع",
        swahili: "Mkulima",
        bengali: "কৃষক",
        oromo: "Gaarii",
        somali: "Beeraha",
        vietnamese: "Nông dân",
        amharic: "ተረጋግጧል",
        greek: "Γεωργός",
        mandarin: "农夫",
        japanese: "農家",
        turkish: "Çiftçi",
      },
      {
        english: "Buying Station",
        hindi: "खरीद स्थल",
        marathi: "खरेदी केंद्र",
        spanish: "Estación de Compra",
        indonesian: "Stasiun Pembelian",
        portugese: "Estação de Compra",
        nepali: "खरिद केन्द्र",
        french: "Station d'Achat",
        arabic: "محطة الشراء",
        swahili: "Kituo cha Ununuzi",
        bengali: "ক্রয় স্থান",
        oromo: "Xalayaandiisii Naannoo",
        somali: "Hawl-maalmeedka Xarumaha",
        vietnamese: "Trạm Mua Sắm",
        amharic: "ትልቅ መጠዝያ",
        greek: "Σταθμός Αγοράς",
        mandarin: "购买站",
        japanese: "購買ステーション",
        turkish: "Alım İstasyonu",
      },
      {
        english: "Dry Milling",
        hindi: "सूखी पिसाई",
        marathi: "कोकणणी",
        spanish: "Molienda en Seco",
        indonesian: "Penggilingan Kering",
        portugese: "Moagem a Seco",
        nepali: "खरानी पिसाई",
        french: "Mouture à Sec",
        arabic: "الطحن الجاف",
        swahili: "Kusaga Kavu",
        bengali: "শুকনো মিলিং",
        oromo: "Miila Xuruf",
        somali: "Dab-ka-shan-qaaday",
        vietnamese: "Xay Khô",
        amharic: "ዝቅ ጠበዝበዛ",
        greek: "Ξήρα Αλεστική",
        mandarin: "干磨",
        japanese: "乾式粉砕",
        turkish: "Kuru Öğütme",
      },
      {
        english: "Cacao Farmer",
        hindi: "कैको किसान",
        marathi: "कॅकाओ शेतकरी",
        spanish: "Agricultor de Cacao",
        indonesian: "Petani Kakao",
        portugese: "Agricultor de Cacau",
        nepali: "काकाओ किसान",
        french: "Agriculteur de Cacao",
        arabic: "مزارع الكاكاو",
        swahili: "Mkulima wa Kakao",
        bengali: "কাকাও কৃষক",
        oromo: "Jaarmoti Kaakoo",
        somali: "Beeraha Kaakow",
        vietnamese: "Nông dân cacao",
        amharic: "ካኮ ተረጋግጧ",
      },
    ];

    for (const row of data) {
      let sql =
        "SELECT * FROM global_translation_metadata WHERE english = :english";
      const global_trans = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.english },
      });

      // update case
      if (global_trans && global_trans.length > 0) {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkUpdate("global_translation_metadata", item, {
          id: global_trans?.map((item) => item.id),
        });
      } else {
        // Insert Case
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, "global_translation_metadata", item);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
