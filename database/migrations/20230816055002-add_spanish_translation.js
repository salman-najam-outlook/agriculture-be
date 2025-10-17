"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Cultural/Natural",
        spanish: "Culturales/Naturales",
        portugese: "Culturais/Naturais",
        nepali: "सांस्कृतिक/प्राकृतिक",
      },
      {
        english: "None",
        spanish: "Ninguno",
        portugese: "Nenhum",
        nepali: "कुनै पनि छैन",
      },
      {
        english: "Cultural/Mechanical/Biological",
        spanish: "Cultural / Mecánica / Biológica",
        portugese: "Cultural/Mecânico/Biológico",
        nepali: "सांस्कृतिक/यान्त्रिक/जैविक",
      },
      {
        english: "Ammonium phosphate sulphate(20-20-0)",
        spanish: "Sulfato de fosfato de amonio (20-20-0)",
        portugese: "Sulfato de fosfato de amônio (20-20-0)",
        nepali: "अमोनियम फास्फेट सल्फेट (२०-२०-०)",
      },
      {
        english: "Ammonium sulphate(20-0-0)",
        spanish: "Sulfato de amonio (20-0-0)",
        portugese: "Sulfato de amônio (20-0-0)",
        nepali: "अमोनियम सल्फेट (२०-०-०)",
      },
      {
        english: "Borax",
        spanish: "Bórax",
        portugese: "Bórax",
        nepali: "बोराक्स",
      },
      {
        english: "Calcium ammonium nitrate(20-0-0)",
        spanish: "Nitrato de calcio y amonio (20-0-0)",
        portugese: "Nitrato de amônio e cálcio (20-0-0)",
        nepali: "क्याल्सियम अमोनियम नाइट्रेट (२०-०-०)",
      },
      {
        english: "Chelated iron",
        spanish: "Hierro quelado",
        portugese: "ferro quelatado",
        nepali: "चिलेटेड फलाम",
      },
      {
        english: "Chelated Zinc",
        spanish: "Zinc quelado",
        portugese: "Zinco Quelatado",
        nepali: "चेलेटेड जस्ता",
      },
      {
        english: "Manganese sulphate",
        spanish: "sulfato de manganeso",
        portugese: "sulfato de manganês",
        nepali: "म्यांगनीज सल्फेट",
      },
      {
        english: "NPK (10-26-26)",
        spanish: "NPK (10-26-26)",
        portugese: "NPK (10-26-26)",
        nepali: "NPK (१०-२६-२६)",
      },
      {
        english: "NPK(12-32-16)",
        spanish: "NPK(12-32-16)",
        portugese: "NPK(12-32-16)",
        nepali: "NPK(१२-३२-१६)",
      },
      {
        english: "NPK (20-20-10)",
        spanish: "NPK (20-20-10)",
        portugese: "NPK (20-20-10)",
        nepali: "NPK (२०-२०-१०)",
      },
      {
        english: "Potassium chloride (0-0-60)",
        spanish: "Cloruro de potasio (0-0-60)",
        portugese: "Cloreto de potássio (0-0-60)",
        nepali: "पोटासियम क्लोराइड (०-०-६०)",
      },
      {
        english: "Potassium sulphate",
        spanish: "sulfato de potasio",
        portugese: "sulfato de potássio",
        nepali: "पोटासियम सल्फेट",
      },
      {
        english: "SSP",
        spanish: "SSP",
        portugese: "SSP",
        nepali: "एसएसपी",
      },
      {
        english: "TSP",
        spanish: "TSP",
        portugese: "TSP",
        nepali: "TSP",
      },
      {
        english: "Urea",
        spanish: "Urea",
        portugese: "uréia",
        nepali: "युरिया",
      },
      {
        english: "Urea ammonium phosphate(28-28-0)",
        spanish: "Fosfato de urea y amonio (28-28-0)",
        portugese: "Fosfato de ureia e amônio (28-28-0)",
        nepali: "यूरिया अमोनियम फास्फेट (२८-२८-०)",
      },
      {
        english: "DAP(18-46-0)",
        spanish: "DAP(18-46-0)",
        portugese: "DAP(18-46-0)",
        nepali: "DAP(१८-४६-०)",
      },
      {
        english: "Ferrous sulphate",
        spanish: "Sulfato de hierro",
        portugese: "Sulfato ferroso",
        nepali: "फेरस सल्फेट",
      },
      {
        english: "Manganese sulphate",
        spanish: "sulfato de manganeso",
        portugese: "sulfato de manganês",
        nepali: "म्यांगनीज सल्फेट",
      },
      {
        english: "Neem coated urea",
        spanish: "Urea recubierta de neem",
        portugese: "Uréia revestida com Neem",
        nepali: "नीम लेपित युरिया",
      },
      {
        english: "NPK(15-15-15)",
        spanish: "NPK(15-15-15)",
        portugese: "NPK(15-15-15)",
        nepali: "NPK(१५-१५-१५)",
      },
      {
        english: "NPK (19-19-19)(water soluble)",
        spanish: "NPK (19-19-19)(soluble en agua)",
        portugese: "NPK (19-19-19)(solúvel em água)",
        nepali: "NPK (१९-१९-१९)(पानीमा घुलनशील)",
      },
      {
        english: "Potassium nitrate(13-0-45)(water soluble)",
        spanish: "Nitrato de potasio (13-0-45) (soluble en agua)",
        portugese: "Nitrato de potássio (13-0-45) (solúvel em água)",
        nepali: "पोटासियम नाइट्रेट(१३-०-४५)(पानीमा घुलनशील)",
      },
      {
        english: "Rock phosphate",
        spanish: "Fosfato de roca",
        portugese: "Fosfato de rocha",
        nepali: "रक फास्फेट",
      },
      {
        english: "Sulphur",
        spanish: "Azufre",
        portugese: "Enxofre",
        nepali: "सल्फर",
      },
      {
        english: "Zincated urea",
        spanish: "Urea zincada",
        portugese: "Uréia Zincada",
        nepali: "जिंक युरिया",
      },
      {
        english: "Nano urea",
        spanish: "Nano urea",
        portugese: "Nano uréia",
        nepali: "नानो युरिया",
      },
      {
        english: "NPK mixed fertilizer with boron(10-20-10:0.3)",
        spanish: "Fertilizante mixto NPK con boro (10-20-10:0.3)",
        portugese: "Fertilizante misto NPK com boro (10-20-10:0,3)",
        nepali: "NPK मिश्रित उर्वर बोरोन (१०-२०-१०:०.३)",
      },
      {
        english: "Mixed fertilizer fortified with Zinc(20-20-0:1.0)",
        spanish: "Fertilizante mixto fortificado con Zinc (20-20-0:1.0)",
        portugese: "Fertilizante misto enriquecido com zinco (20-20-0:1,0)",
        nepali: "जस्तासँग सुदृढ मिश्रित मल (२०-२०-०:१.०)",
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
