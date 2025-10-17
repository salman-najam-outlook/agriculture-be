const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {

    let elementsList = {
      "Phosphorus": ["mg/dm³", "Milligrams per cubic decimeter"],
      "Calcium": ["cmol c/dm³", "Centimoles of charge per cubic decimeter"],
      "Magnesium": ["cmol c/dm³", "Centimoles of charge per cubic decimeter"],
      "Zinc": ["mg/dm³", "Milligrams per cubic decimeter"],
      "Boron": ["mg/dm³", "Milligrams per cubic decimeter"],
      "Potassium": ["mg/dm³", "Milligrams per cubic decimeter"],
      "Sulphur": ["mg/dm³", "Milligrams per cubic decimeter"],
      "Iron": ["mg/dm³", "Milligrams per cubic decimeter"],
      "Aluminium": ["cmol c/dm³", "Centimoles of charge per cubic decimeter"],
      "SoilOrganicCarbonUnit": ["dag/kg", "Dag per kilogram"],

    }



    for (let key in elementsList) {
      let unitAbbvr = elementsList[key][0]
      let unitName = elementsList[key][1]

      let existingUnit = await queryInterface.select(null, 'unit_types', {
        where: {
          name: { [Sequelize.Op.like]: `%${key}%` },
        }
      })

      if (existingUnit.length > 0) {

        let existingUnitId = existingUnit[0].id

        await queryInterface.insert(null, 'units_list', {
          abbvr: unitAbbvr,
          name: unitName,
          unitType: existingUnitId,
          factor: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {transaction})
      } else {
        let newUnit = await queryInterface.insert(null, 'unit_types', {
          name: key + "Unit",
          label: key + " Unit",
          createdAt: new Date(),
          updatedAt: new Date()

        }, {transaction})

        let newUnitId = newUnit[0]
        await queryInterface.insert(null, 'units_list', {
          abbvr: unitAbbvr,
          name: unitName ,
          unitType: newUnitId,
          factor: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {transaction})


      }

    }
    transaction.commit()

    // translations
    const translations = [
      {
        english: "Aluminium Unit",
        hindi: "एल्युमीनियम इकाई",
        marathi: "अॅल्युमिनियम युनिट",
        spanish: "Unidad de Aluminio",
        indonesian: "Unit Aluminium",
        portugese: "Unidade de Alumínio",
        nepali: "एल्युमिनियम एकाइ",
        french: "Unité d'Aluminium",
        arabic: "وحدة الألومنيوم",
        swahili: "Kitengo cha Alumini",
        bengali: "অ্যালুমিনিয়াম ইউনিট",
        oromo: "Yuniti Aluminiyemii",
        somali: "Cutubka Aluminium",
        vietnamese: "Đơn vị Nhôm",
        amharic: "አልሚኒየም ክፍል",
        greek: "Μονάδα Αλουμινίου",
        mandarin: "铝单位",
        japanese: "アルミニウム単位",
        turkish: "Alüminyum Birimi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        english: "Sulfur Unit",
        hindi: "सल्फर इकाई",
        marathi: "सल्फर युनिट",
        spanish: "Unidad de Azufre",
        indonesian: "Unit Belerang",
        portugese: "Unidade de Enxofre",
        nepali: "सल्फर एकाइ",
        french: "Unité de Soufre",
        arabic: "وحدة الكبريت",
        swahili: "Kitengo cha Kiberiti",
        bengali: "সালফার ইউনিট",
        oromo: "Yuniti Sulfurii",
        somali: "Cutubka Salfar",
        vietnamese: "Đơn vị Lưu huỳnh",
        amharic: "ጭፍራ ክፍል",
        greek: "Μονάδα Θείου",
        mandarin: "硫单位",
        japanese: "硫黄単位",
        turkish: "Kükürt Birimi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        english: "Milligrams per cubic decimeter",
        hindi: "घन डेसीमीटर प्रति मिलीग्राम",
        marathi: "घन डेसीमीटर प्रति मिलिग्रॅम",
        spanish: "Miligramos por decímetro cúbico",
        indonesian: "Miligram per desimeter kubik",
        portugese: "Miligramas por decímetro cúbico",
        nepali: "घन डेसीमीटर प्रति मिलीग्राम",
        french: "Milligrammes par décimètre cube",
        arabic: "ميليغرام لكل ديسيمتر مكعب",
        swahili: "Milligramu kwa desimita ya ujazo",
        bengali: "ঘন ডেসিমিটার প্রতি মিলিগ্রাম",
        oromo: "Miligiraamii fi desimetira kubii",
        somali: "Milligram halkii decimeter cubic",
        vietnamese: "Miligam trên decimét khối",
        amharic: "ሚሊግራም በኩባዊ ዲሲሜትር",
        greek: "Μιλιγραμμάρια ανά κυβικό δεκατόμετρο",
        mandarin: "每立方分米毫克",
        japanese: "立方デシメートルあたりのミリグラム",
        turkish: "Miligram / desimetreküp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        english: "Centimoles of charge per cubic decimeter",
        hindi: "घन डेसीमीटर प्रति सेंटीमोल चार्ज",
        marathi: "घन डेसीमीटर प्रति सेंटीमोल चार्ज",
        spanish: "Centimoles de carga por decímetro cúbico",
        indonesian: "Sentimol muatan per desimeter kubik",
        portugese: "Centimoles de carga por decímetro cúbico",
        nepali: "घन डेसीमीटर प्रति सेमीमोल चार्ज",
        french: "Centimoles de charge par décimètre cube",
        arabic: "سنتيمول شحنة لكل ديسيمتر مكعب",
        swahili: "Sentimoli ya chaji kwa desimita ya ujazo",
        bengali: "ঘন ডেসিমিটার প্রতি সেন্টিমোল চার্জ",
        oromo: "Sentimooli fi kubii desimetira",
        somali: "Centimoles ee xisaabta halkii decimeter cubic",
        vietnamese: "Centimol điện tích trên decimét khối",
        amharic: "ሴንቲሞል አካሄድ በኩባዊ ዲሲሜትር",
        greek: "Εκατομόλια φορτίου ανά κυβικό δεκατόμετρο",
        mandarin: "每立方分米电荷厘米摩尔",
        japanese: "立方デシメートルあたりの電荷センチモル",
        turkish: "Santimol yük / desimetreküp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    

    await queryInterface.bulkInsert(
      "global_translation_metadata",
      translations
    );
    } catch (error) {
      console.log('Error in migrating', error);
      transaction.rollback()
      throw new Error(error)
    
    }
    
    
  },

  down: async (queryInterface, Sequelize) => {

  },
};