'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Weight",
        arabic: "الوزن"
      },
      {
        english: "Length",
        arabic: "الطول"
      },
      {
        english: "Volume-Area",
        arabic: "حجم-منطقة"
      },
      {
        english: "Weight-Area",
        arabic: "الوزن-المنطقة"
      },
      {
        english: "Area",
        arabic: "المنطقة"
      },
      {
        english: "Perimeter",
        arabic: "المحيط"
      },
      {
        english: "Irrigation-Area",
        arabic: "ري-منطقة"
      },
      {
        english: "Irrigation-Volume",
        arabic: "ري-حجم"
      },
      {
        english: "Storage-Area",
        arabic: "تخزين-منطقة"
      },
      {
        english: "Storage-Yield",
        arabic: "تخزين-إنتاج"
      },
      {
        english: "harvesting-fresh-yield",
        arabic: "حصاد-إنتاج طازج"
      },
      {
        english: "harvesting-yield-household-consumption",
        arabic: "حصاد-إنتاج للاستهلاك المنزلي"
      },
      {
        english: "herbicide-dose-rate",
        arabic: "معدل جرعة مبيد الأعشاب"
      },
      {
        english: "herbicide-used",
        arabic: "استخدام مبيد الأعشاب"
      },
      {
        english: "Energy-consumption",
        arabic: "استهلاك الطاقة"
      },
      {
        english: "Thickness",
        arabic: "السمك"
      },
      {
        english: "PotassiumUnit",
        arabic: "وحدة البوتاسيوم"
      },
      {
        english: "LimingRateWeightAreaUnit",
        arabic: "وحدة معدل التكلس - الوزن - المنطقة"
      },
      {
        english: "TotalLimeWeightUnit",
        arabic: "وحدة إجمالي وزن التكلس"
      },
      {
        english: "SyntheticFertilizerApplicationRateWeightAreaUnit",
        arabic: "وحدة معدل تطبيق الأسمدة الاصطناعية - الوزن - المنطقة"
      },
      {
        english: "TotalSyntheticFertilizerUsedWeightUnit",
        arabic: "وحدة إجمالي استخدام الأسمدة الاصطناعية - الوزن"
      },
      {
        english: "OrganicInputApplicationRateWeightAreaUnit",
        arabic: "وحدة معدل تطبيق المدخلات العضوية - الوزن - المنطقة"
      },
      {
        english: "TotalOrganicInputAppliedWeightUnit",
        arabic: "وحدة إجمالي تطبيق المدخلات العضوية - الوزن"
      },
      {
        english: "PhosphorusUnit",
        arabic: "وحدة الفوسفور"
      },
      {
        english: "BulkDensity",
        arabic: "كثافة السائل"
      },
      {
        english: "NitrogenUnit",
        arabic: "وحدة النيتروجين"
      },
      {
        english: "SulphurUnit",
        arabic: "وحدة الكبريت"
      },
      {
        english: "SythenticFertilizerNitrogenUnit",
        arabic: "وحدة النيتروجين للأسمدة الاصطناعية"
      },
      {
        english: "SythenticFertilizerPhosphorousUnit",
        arabic: "وحدة الفوسفور للأسمدة الاصطناعية"
      },
      {
        english: "SythenticFertilizerPotassiumUnit",
        arabic: "وحدة البوتاسيوم للأسمدة الاصطناعية"
      },
      {
        english: "CoffeeParchmentDensityUnit",
        arabic: "وحدة كثافة قشرة القهوة"
      },
      {
        english: "Gram",
        arabic: "غم"
      },
      {
        english: "Kilogram",
        arabic: "كيلوجرام"
      },
      {
        english: "Pound",
        arabic: "رطل"
      },
      {
        english: "Centimeter",
        arabic: "سنتيمتر"
      },
      {
        english: "Meter",
        arabic: "متر"
      },
      {
        english: "Liter-Per-Hectar",
        arabic: "لتر/هكتار"
      },
      {
        english: "Milliliters per Square Meter",
        arabic: "ميللتر/متر مربع"
      },
      {
        english: "Kilogram per Acre",
        arabic: "كيلوجرام/فدان"
      },
      {
        english: "Kilogram per Hectare",
        arabic: "كيلوجرام/هكتار"
      },
      {
        english: "Acre",
        arabic: "فدان"
      },
      {
        english: "Hectares",
        arabic: "هكتارات"
      },
      {
        english: "Millimetres",
        arabic: "مليمتر"
      },
      {
        english: "Centimeter",
        arabic: "سنتيمتر"
      },
      {
        english: "Meter",
        arabic: "متر"
      },
      {
        english: "Acre",
        arabic: "فدان"
      },
      {
        english: "Hectare",
        arabic: "هكتار"
      },
      {
        english: "Millileter",
        arabic: "مل"
      },
      {
        english: "Liter",
        arabic: "لتر"
      },
      {
        english: "Acre",
        arabic: "فدان"
      },
      {
        english: "Hectare",
        arabic: "هكتار"
      },
      {
        english: "Pounds",
        arabic: "رطل"
      },
      {
        english: "Kilograms",
        arabic: "كيلوجرام"
      },
      {
        english: "Tonnes",
        arabic: "أطنان"
      },
      {
        english: "Tonnes per Hectare",
        arabic: "أطنان/هكتار"
      },
      {
        english: "Bushels per Hectare",
        arabic: "بوشل/هكتار"
      },
      {
        english: "Bushels per Acre",
        arabic: "بوشل/فدان"
      },
      {
        english: "Bags per Hectare",
        arabic: "أكياس/هكتار"
      },
      {
        english: "Bags per Acre",
        arabic: "أكياس/فدان"
      },
      {
        english: "Tonnes per Acre",
        arabic: "أطنان/فدان"
      },
      {
        english: "Kg",
        arabic: "كيلوجرام"
      },
      {
        english: "Tonnes",
        arabic: "أطنان"
      },
      {
        english: "Kilogram per Acre",
        arabic: "كيلوجرام/فدان"
      },
      {
        english: "Kilogram per Hectare",
        arabic: "كيلوجرام/هكتار"
      },
      {
        english: "Tonnes per Acre",
        arabic: "أطنان/فدان"
      },
      {
        english: "Tonnes per Hectare",
        arabic: "أطنان/هكتار"
      },
      {
        english: "Milligram per Litter per Acre",
        arabic: "ملليجرام/لتر/فدان"
      },
      {
        english: "Milligram per Litter per Hectare",
        arabic: "ملليجرام/لتر/هكتار"
      },
      {
        english: "Milliliter per Litter per Acre",
        arabic: "ملليلتر/لتر/فدان"
      },
      {
        english: "Milliliter per Litter per Hectare",
        arabic: "ملليلتر/لتر/هكتار"
      },
      {
        english: "Litres",
        arabic: "لتر"
      },
      {
        english: "Ounces",
        arabic: "أونصة"
      },
      {
        english: "Milligram",
        arabic: "ملليجرام"
      },
      {
        english: "Kilogram",
        arabic: "كيلوجرام"
      },
      {
        english: "Gram",
        arabic: "غرام"
      },
      {
        english: "Gallons/acre",
        arabic: "جالون/فدان"
      },
      {
        english: "Gallons/hectare",
        arabic: "جالون/هكتار"
      },
      {
        english: "Liters/hectare",
        arabic: "لتر/هكتار"
      },
      {
        english: "Liters/acre",
        arabic: "لتر/فدان"
      },
      {
        english: "Centimeter",
        arabic: "سنتيمتر"
      },
      {
        english: "Meter",
        arabic: "متر"
      },
      {
        english: "kg/ha",
        arabic: "كيلوجرام/هكتار"
      },
      {
        english: "ppm",
        arabic: "جزء في المليون"
      },
      {
        english: "mg/l",
        arabic: "ملليجرام/لتر"
      },
      {
        english: "Kg per hectare",
        arabic: "كيلوجرام لكل هكتار"
      },
      {
        english: "Kg per acre",
        arabic: "كيلوجرام لكل فدان"
      },
      {
        english: "Tonne per hectare",
        arabic: "أطنان لكل هكتار"
      },
      {
        english: "Tonne per acre",
        arabic: "أطنان لكل فدان"
      },
      {
        english: "Pounds",
        arabic: "رطل"
      },
      {
        english: "Grams",
        arabic: "غرام"
      },
      {
        english: "Kilograms",
        arabic: "كيلوجرام"
      },
      {
        english: "Tonnes",
        arabic: "أطنان"
      },
      {
        english: "Tonne per acre",
        arabic: "أطنان لكل فدان"
      },
      {
        english: "Kg per hectare",
        arabic: "كيلوجرام لكل هكتار"
      },
      {
        english: "Kg per acre",
        arabic: "كيلوجرام لكل فدان"
      },
      {
        english: "Tonne per hectare",
        arabic: "أطنان لكل هكتار"
      },
      {
        english: "Kilograms",
        arabic: "كيلوجرام"
      },
      {
        english: "Tonnes",
        arabic: "أطنان"
      },
      {
        english: "Pounds",
        arabic: "رطل"
      },
      {
        english: "Tonne per hectare",
        arabic: "أطنان لكل هكتار"
      },
      {
        english: "Tonne per acre",
        arabic: "أطنان لكل فدان"
      },
      {
        english: "Kg per acre",
        arabic: "كيلوجرام لكل فدان"
      },
      {
        english: "Kg per hectare",
        arabic: "كيلوجرام لكل هكتار"
      },
      {
        english: "Kilograms",
        arabic: "كيلوجرام"
      },
      {
        english: "Tonnes",
        arabic: "أطنان"
      },
      {
        english: "Pounds",
        arabic: "رطل"
      },
      {
        english: "kg/ha",
        arabic: "كيلوجرام/هكتار"
      },
      {
        english: "ppm",
        arabic: "جزء في المليون"
      },
      {
        english: "mg/l",
        arabic: "ملليجرام/لتر"
      },
      {
        english: "kg/ml",
        arabic: "كيلوجرام/ملليلتر"
      },
      {
        english: "g/ml",
        arabic: "غرام/ملليلتر"
      },
      {
        english: "kg/ha",
        arabic: "كيلوجرام/هكتار"
      },
      {
        english: "ppm",
        arabic: "جزء في المليون"
      },
      {
        english: "mg/l",
        arabic: "ملليجرام/لتر"
      },
      {
        english: "mg/l",
        arabic: "ملليجرام/لتر"
      },
      {
        english: "kg/ha",
        arabic: "كيلوجرام/هكتار"
      },
      {
        english: "ppm",
        arabic: "جزء في المليون"
      },
      {
        english: "Milligrams (N)/Liter",
        arabic: "ملليجرام (نيتروجين)/لتر"
      },
      {
        english: "Kg (N)/hectare",
        arabic: "كيلوجرام (نيتروجين)/هكتار"
      },
      {
        english: "parts (N)/million",
        arabic: "أجزاء (نيتروجين)/مليون"
      },
      {
        english: "Milligrams (P2O5)/Liter",
        arabic: "ملليجرام (P2O5)/لتر"
      },
      {
        english: "Kg (P2O5)/hectare",
        arabic: "كيلوجرام (P2O5)/هكتار"
      },
      {
        english: "parts (P2O5)/million",
        arabic: "أجزاء (P2O5)/مليون"
      },
      {
        english: "Milligrams (K20)/Liter",
        arabic: "ملليجرام (K20)/لتر"
      },
      {
        english: "Kg (K20)/hectare",
        arabic: "كيلوجرام (K20)/هكتار"
      },
      {
        english: "parts (K20)/million",
        arabic: "أجزاء (K20)/مليون"
      },
      {
        english: "measurement",
        arabic: "قياس"
      },
      {
        english: "capacity",
        arabic: "القدرة"
      },
      {
        english: "area",
        arabic: "المنطقة"
      },
      {
        english: "weight",
        arabic: "الوزن"
      },
      {
        english: "acre",
        arabic: "فدان"
      },
      {
        english: "gram",
        arabic: "غرام"
      },
      {
        english: "Kilogram",
        arabic: "كيلوجرام"
      },
      {
        english: "yield",
        arabic: "إنتاج"
      },
      {
        english: "Kg per acre",
        arabic: "كيلوجرام لكل فدان"
      },
      {
        english: "Kg per hectare",
        arabic: "كيلوجرام لكل هكتار"
      },
      {
        english: "length",
        arabic: "الطول"
      },
      {
        english: "Square Meter",
        arabic: "متر مربع"
      },
      {
        english: "Square Yard",
        arabic: "ياردة مربعة"
      },
      {
        english: "parameter",
        arabic: "معلم"
      },
      {
        english: "meters",
        arabic: "أمتار"
      },
      {
        english: "mg/L/acre",
        arabic: "ملليجرام/لتر/فدان"
      },
      {
        english: "Litres",
        arabic: "لتر"
      },
      {
        english: "Ounces",
        arabic: "أونصة"
      },
      {
        english: "Milligram",
        arabic: "ملليجرام"
      },
      {
        english: "Gram",
        arabic: "غرام"
      },
      {
        english: "Kilogram",
        arabic: "كيلوجرام"
      },
      {
        english: "Milligram per litre per acre",
        arabic: "ملليجرام لكل لتر لكل فدان"
      },
      {
        english: "Milligram per litre per hectare",
        arabic: "ملليجرام لكل لتر لكل هكتار"
      }
    ]


    for (const row of data) {
      let sql = "SELECT * FROM global_translation_metadata WHERE english = :english";
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
