'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "First Vegetative phase",
        arabic: "المرحلة الخضرية الأولى",
      },
      {
        english: "Second Vegetative phase",
        arabic: "المرحلة الخضرية الثانية",
      },
      {
        english: "Flowering / Reproductive phase",
        arabic: "مرحلة التزهير / الإنجاب",
      },
      {
        english: "Harvest / Reproductive phase",
        arabic: "مرحلة الحصاد / الإنجاب",
      },
      {
        english: "Emergence stage",
        arabic: "مرحلة الظهور",
      },
      {
        english: "Stolon formation stage",
        arabic: "مرحلة تشكيل الرئد",
      },
      {
        english: "Tuber formation stage",
        arabic: "مرحلة تكوين الدرنات",
      },
      {
        english: "Tuber developement stage",
        arabic: "مرحلة تطور الدرنات",
      },
      {
        english: "Tuber development stage",
        arabic: "مرحلة تطور الدرنات",
      },
      {
        english: "Harvest stage",
        arabic: "مرحلة الحصاد",
      },
      {
        english: "Sprouting, emergence of the bud",
        arabic: "الإنبات، ظهور البرعم",
      },
      {
        english: "Flowering",
        arabic: "المزهرة",
      },
      {
        english: "Fruit formation",
        arabic: "تكوين الفاكهة",
      },
      {
        english: "Fruit development",
        arabic: "تطوير الفاكهة",
      },
      {
        english: "Maturation",
        arabic: "إنضاج",
      },
      {
        english: "Harvesting",
        arabic: "حصاد",
      },
    ]
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
