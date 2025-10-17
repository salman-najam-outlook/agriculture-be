"use strict";

/** @type {import('sequelize-cli').Migration} */
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
        english: "Bags per Manzana",
        spanish: "Bolsas por Manzana",
        swahili: "Mifuko kwa Manzana",
        portugese: "Sacos por Manzana",
        arabic: "أكياس لكل مانزانا",
      },
      {
        english: "Bushels per Manzana",
        spanish: "Bushels por manzana",
        swahili: "Vichaka kwa Manzana",
        portugese: "Alqueires por Manzana",
        arabic: "بوشل لكل مانزانا",
      },
      {
        english: "Tonnes per Manzana",
        spanish: "Toneladas por manzana",
        swahili: "Tani kwa Manzana",
        portugese: "Toneladas por Manzana",
        arabic: "طن لكل مانزانا",
      },
      {
        english: "Kilogram per Manzana",
        spanish: "Kilogramo por manzana",
        swahili: "Kilo kwa Manzana",
        portugese: "Quilograma por Manzana",
        arabic: "كيلوغرام لكل مانزانا",
      },
      {
        english: "Bushels per Manzana",
        spanish: "Bushels por manzana",
        swahili: "Vichaka kwa Manzana",
        portugese: "Alqueires por Manzana",
        arabic: "بوشل لكل مانزانا",
      },
      {
        english: "Tonne per Manzana",
        spanish: "Tonelada por manzana",
        swahili: "Tani kwa Manzana",
        portugese: "Tonelada por Manzana",
        arabic: "طن لكل مانزانا",
      },
      {
        english: "Kilogram per Manzana",
        spanish: "Kilogramo por manzana",
        swahili: "Kilo kwa Manzana",
        portugese: "Quilograma por Manzana",
        arabic: "كيلوغرام لكل مانزانا",
      },
      {
        english: "Manzana",
        spanish: "manzana",
        swahili: "Manzana",
        portugese: "Manzana",
        arabic: "مانزانا",
      },
      {
        english: "Gram per centimeter cube",
        spanish: "gramo por centímetro cúbico",
        swahili: "Gramu kwa mchemraba wa sentimita",
        portugese: "Grama por centímetro cúbico",
        arabic: "جرام لكل سنتيمتر مكعب",
      },
      {
        english: "Kilogram per meter cube",
        spanish: "Kilogramo por metro cúbico",
        swahili: "Kilo kwa mchemraba wa mita",
        portugese: "Quilograma por metro cúbico",
        arabic: "كيلوغرام لكل متر مكعب",
      },
      {
        english: "Pound per meter cube",
        spanish: "Libra por metro cúbico",
        swahili: "Pound kwa mchemraba wa mita",
        portugese: "Libra por metro cúbico",
        arabic: "جنيه لكل متر مكعب",
      },
      {
        english: "Pound per centimeter cube",
        spanish: "Libra por centímetro cúbico",
        swahili: "Pound kwa mchemraba wa sentimita",
        portugese: "Libra por centímetro cúbico",
        arabic: "جنيه لكل سنتيمتر مكعب",
      },
      {
        english: "Kilogram per meter cube",
        spanish: "Kilogramo por metro cúbico",
        swahili: "Kilo kwa mchemraba wa mita",
        portugese: "Quilograma por metro cúbico",
        arabic: "كيلوغرام لكل متر مكعب",
      },
      {
        english: "Kilogram per Tree",
        spanish: "Kilogramo por árbol",
        swahili: "Kilo kwa mti",
        portugese: "Quilograma por árvore",
        arabic: "كيلوغرام لكل شجرة",
      },
      {
        english: "Kilogram per Tree",
        spanish: "Kilogramo por árbol",
        swahili: "Kilo kwa mti",
        portugese: "Quilograma por árvore",
        arabic: "كيلوغرام لكل شجرة",
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
