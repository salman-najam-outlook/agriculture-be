"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Deep ploughing",
        spanish: "Arado profundo",
        portugese: "Lavragem profunda",
      },
      {
        english: "Natural enemies/parasitism",
        spanish: "Enemigos naturales/parasitismo",
        portugese: "Inimigos naturais/parasitismo",
      },
      {
        english: "Push and pull",
        spanish: "Empujar y jalar",
        portugese: "Empurre e Puxe",
      },
      {
        english: "Ash and chilli",
        spanish: "Ceniza y chile",
        portugese: "Cinzas e pimenta",
      },
      {
        english: "Plant extracts",
        spanish: "Extractos de plantas",
        portugese: "Extratos de plantas",
      },
      {
        english: "Weeding",
        spanish: "Deshierbe",
        portugese: "Capina",
      },
      {
        english: "Use of mesh",
        spanish: "Uso de malla",
        portugese: "Uso de malha",
      },
      {
        english: "Uprooting of infested plants by hand",
        spanish: "Arranque de plantas infestadas a mano",
        portugese: "Desenraizamento manual de plantas infestadas",
      },
      {
        english: "Traps and bagging",
        spanish: "Trampas y embolsado",
        portugese: "Armadilhas e ensacamento",
      },
      {
        english: "Bio pesticides",
        spanish: "Biopesticidas",
        portugese: "Biopesticidas",
      },
      {
        english: "Bio fumigation",
        spanish: "Bio fumigación",
        portugese: "Biofumigação",
      },
      {
        english: "Scarecrows",
        spanish: "Espantapájaros",
        portugese: "Espantalhos",
      },
      {
        english: "Tillage",
        spanish: "Labranza",
        portugese: "Lavoura",
      },
      {
        english: "Pruning",
        spanish: "Poda",
        portugese: "Poda",
      },
      {
        english: "Hand picking of pests",
        spanish: "Recolección manual de plagas",
        portugese: "Colheita manual de pragas",
      },
      {
        english: "Remove diseased plant",
        spanish: "Quitar planta enferma",
        portugese: "Remover planta doente",
      },
      {
        english: "Mulching",
        spanish: "Triturado",
        portugese: "Mulching",
      },
      {
        english: "Crop rotation",
        spanish: "La rotación de cultivos",
        portugese: "Rotação de colheitas",
      },
      {
        english: "Planting resistant cultivars",
        spanish: "Plantación de cultivares resistentes",
        portugese: "Plantando cultivares resistentes",
      },
      {
        english: "Use of oils and soaps",
        spanish: "Uso de aceites y jabones",
        portugese: "Uso de óleos e sabonetes",
      },
      {
        english: "Use of bio fumigants",
        spanish: "Uso de biofumigantes",
        portugese: "Uso de biofumigantes",
      },
      {
        english: "Others",
        spanish: "Otros",
        portugese: "Outros",
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
