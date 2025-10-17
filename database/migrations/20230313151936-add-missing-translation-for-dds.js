"use strict";

const moment = require("moment");

const languageObjects = [
  {
    english: "EUDR Due Diligence",
    dutch: "EUDR-due diligence",
    italian: "Due Diligence EUDR",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Due Diligence Report",
    dutch: "Due Diligence Rapport",
    italian: "Rapporto di Due Diligence",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Dispute Resolution",
    dutch: "Geschillenbeslechting",
    italian: "Risoluzione delle Controversie",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Suppliers",
    dutch: "Leveranciers",
    italian: "Fornitori",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Shipments",
    dutch: "Zendingen",
    italian: "Spedizioni",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Assessment Builder",
    dutch: "Beoordelingsbouwer",
    italian: "Costruttore di Valutazioni",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Due Diligence Guide",
    dutch: "Gids voor Due Diligence",
    italian: "Guida alla Due Diligence",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Settings",
    dutch: "Instellingen",
    italian: "Impostazioni",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Dashboard",
    dutch: "Dashboard",
    italian: "Cruscotto",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Profile",
    spanish: "Perfil",
    indonesian: "Profil",
    portugese: "Perfil",
    arabic: "الملف الشخصي",
    swahili: "Profaili",
    dutch: "Profiel",
    italian: "Profilo",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Manage Farm",
    spanish: "Gestionar Granja",
    indonesian: "Kelola Peternakan",
    portugese: "Gerir Fazenda",
    arabic: "إدارة المزرعة",
    swahili: "Dhibiti Shamba",
    dutch: "Beheer Boerderij",
    italian: "Gestisci Fattoria",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Producers",
    spanish: "Productores",
    indonesian: "Produsen",
    portugese: "Produtores",
    arabic: "المنتجون",
    swahili: "Watengenezaji",
    dutch: "Producenten",
    italian: "Produttori",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Operator",
    spanish: "Operador",
    indonesian: "Operator",
    portugese: "Operador",
    arabic: "مشغل",
    swahili: "Mwendesha",
    dutch: "Operator",
    italian: "Operatore",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const row of languageObjects) {
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
            const language = key.toLowerCase().trim();
            item[language] = row[key];
          }
          await queryInterface.bulkUpdate("global_translation_metadata", item, {
            id: global_trans?.map(item => item.id)
          });
        }
        // insert case
        else {
          let item = {};
          for (let key in row) {
            const language = key.toLowerCase().trim();
            item[language] = row[key] != null ? row[key] : ''; // Default to an empty string
          }
          await queryInterface.bulkInsert("global_translation_metadata", [item]);
        }
      }
    } catch (err) {
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    for (const obj of languageObjects) {
      await queryInterface.bulkDelete(
        "global_translation_metadata",
        { english: obj.english },
        {},
        {}
      );
    }
  },
};
