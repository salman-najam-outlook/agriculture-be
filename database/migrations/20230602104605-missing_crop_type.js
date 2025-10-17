"use strict";

let nepaliTranslation = {
  "वीरेन्द्र सागर": "Birendra sagar",
  पाल्पा: "Palpa",
  धनकुटा: "Dhankuta ",
  ताप्लेजुङ: "Taplejung ",
  डिक्टेल: "Diktel ",
  "बसराई बौना": "Basrai dwarf",
  "बौना क्याभेन्डिस": "dwarf cavendish",
  रोबस्टा: "robusta",
  "विलियम हाइब्रिड": "william hybrid",
  मालभोग: "malbhog",
  धुसरे: "dhusre",
  मुंग्रे: "mungre",
  मार्च: "marche",
  ढोसे: "dhose",
  हजारी: "hazari",
  "काठमाडौं स्थानीय": "Kathmandu local",
  "पहिलो सुरजो": "Pahilo Surjo",
  "SS-72 (सुपर शक्ति 72)": "SS-72 (Super Shakti 72)",
  "KFSH-1 (कञ्चन F1)": "KFSH-1 (Kanchan F1)",
  "पोशिलो जावा प्रहरी": "Poshilo makai jawa",
  "सिर्जना–१": "Srijan-1",
  "सिर्जना-२": "Srijan-2",
  "सिर्जना–३": "Srijan-3",
  "सिर्जना–४": "Srijan-4",
  माधुरी: "Madhuri",
  कल्याण: "Kalyan ",
  प्रतिक्षा: "Pratiksha ",
  प्रतिज्ञा: "Pratigya",
  "जिंक गहुन": "Zinc Gahun 1",
  "जिंक गहुन": "Zinc Gahun 2",
  "बियर-गंगा": "Bheri-Ganga",
  साहसिक: "Himganga",
  "खुमल-शक्ति": "Khumal-Shakti",
  "बोरलाग २०२०": "Borlaug 2020",
  "पुसा रुबी": "Pusa Ruby",
  "अर्का आभा:": "Arka Abha:",
  सृजना: "Srijana",
  "रोमा VF": "Roma VF",
  "नेपाली ओक्सहार्ट": "Nepali Oxheart",
  लिस्बन: "Lisbon",
  "नेपाली गोल": "Nepali round",
  निबुवा: "Nibuwa",
  युरेका: "Eureka",
  सिट्रोन: "Citron",
  "झम्बिरी (खराब कागती)": "Jhambiri (rough lemon)",
  "नेपाली आयताकार": "Nepali oblong",
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let transArr = [];

      for (let k in nepaliTranslation) {
        transArr.push({
          nepali: k,
          english: nepaliTranslation[k],
        });
      }

      await queryInterface.bulkInsert("global_translation_metadata", transArr, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction?.rollback();
      console.log(error, "=============================");
    }
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Currencies', null, {});
  },
};
