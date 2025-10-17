"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Germination",
        hindi: "अंकुरण",
        marathi: "उगवण",
        spanish: "Germinación",
        indonesian: "Pengecambahan",
        portugese: "Germinação",
        nepali: "अंकुरण",
        french: "Germination",
        arabic: "إنبات",
        bengali: "অঙ্কুর",
        oromo: "Biqiluu",
        somali: "Biqilka",
        vietnamese: "nảy mầm",
      },
      {
        english: "Flag leaf",
        hindi: "झंडे का पत्ता",
        marathi: "ध्वजाचे पान",
        spanish: "hoja bandera",
        indonesian: "Daun bendera",
        portugese: "folha bandeira",
        nepali: "झण्डा पात",
        french: "Feuille de drapeau",
        arabic: "ورقة العلم",
        bengali: "পতাকা পাতা",
        oromo: "Baala alaabaa",
        somali: "Caleen caleen",
        vietnamese: "lá cờ",
      },
      {
        english: "Bulb formation",
        hindi: "बल्ब का निर्माण",
        marathi: "बल्ब निर्मिती",
        spanish: "Formación de bulbos",
        indonesian: "Pembentukan umbi",
        portugese: "formação de bulbo",
        nepali: "बल्ब गठन",
        french: "Formation de bulbes",
        arabic: "تشكيل اللمبة",
        bengali: "বাল্ব গঠন",
        oromo: "Uumamuu ampuulii",
        somali: "Samaynta nalalka",
        vietnamese: "hình thành bóng đèn",
      },
      {
        english: "Ripening/maturity",
        hindi: "पकना/परिपक्व होना",
        marathi: "पिकवणे/परिपक्वता",
        spanish: "Maduración/madurez",
        indonesian: "Pematangan / pematangan",
        portugese: "Amadurecimento/maturidade",
        nepali: "पकाउने / परिपक्वता",
        french: "Affinage/maturité",
        arabic: "النضج / النضج",
        bengali: "পাকা/পরিপক্কতা",
        oromo: "Bilchaachuu/bilchachuu",
        somali: "Bislaanshaha/koritaanka",
        vietnamese: "chín / trưởng thành",
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
      }
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, "global_translation_metadata", item);
      }
    }
  },

  async down(queryInterface, Sequelize) {},
};
