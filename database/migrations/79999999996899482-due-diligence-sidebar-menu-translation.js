'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Due Diligence Report",
        spanish: "Informe de Diligencia Debida",
        dutch: "Rapport van Zorgvuldigheid",
        portugese: "Relatório de Diligência Devida",
        swahili: "Ripoti ya Uangalizi wa Kina",
        indonesian: "Laporan Uji Tuntas",
      },
      {
        english: "Dispute Resolution",
        spanish: "Resolución de Disputas",
        dutch: "Geschillenbeslechting",
        portugese: "Resolução de Disputas",
        swahili: "Utatuzi wa Migogoro",
        indonesian: "Penyelesaian Sengketa"
      },
      {
        english: "Suppliers",
        spanish: "Proveedores",
        dutch: "Leveranciers",
        portugese: "Fornecedores",
        swahili: "Wauzaji",
        indonesian: "Pemasok"
      },
      {
        english: "Shipments",
        spanish: "Envíos",
        dutch: "Zendingen",
        portugese: "Remessas",
        swahili: "Usafirishaji",
        indonesian: "Pengiriman"
      },
      {
        english: "Assessment Builder",
        spanish: "Constructor de Evaluación",
        dutch: "Beoordelingsbouwer",
        portugese: "Construtor de Avaliações",
        swahili: "Mjengaji wa Tathmini",
        indonesian: "Pembuat Penilaian"
      },
      {
        english: "Configuration",
        spanish: "Configuración",
        dutch: "Configuratie",
        portugese: "Configuração",
        swahili: "Usanidi",
        indonesian: "Konfigurasi"
      },
    ];
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
          id: global_trans.map((item) => item.id),
        });
      }
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkInsert("global_translation_metadata", [item]);
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