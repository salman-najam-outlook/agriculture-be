"use strict";

const moment = require("moment");

const languageObjects = [
  {
    english: "deforestation",
    hindi: "वनों की कटाई",
    italian: "deforestazione",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Cacao Overview",
    hindi: "कैको अवलोकन",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Buy Sell Overview",
    hindi: "खरीद बेच अवलोकन",
    spanish: "Comprar Vender Resumen",
    indonesian: "Beli Jual Ikhtisar",
    swahili: "Kununua Kuuza Muhtasari",
    dutch: "Koop Verkoop Overzicht",
    italian: "Acquista Vendi Panoramica",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Cacao Data",
    hindi: "कैको डेटा",
    swahili: "Data ya Kakao",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Dry Cacao",
    hindi: "सूखा कैको",
    swahili: "Kakao Kavu",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Deforestation Compliance Reports ",
    hindi: "वनों की कटाई अनुपालन रिपोर्ट",
    italian: "Rapporti di Conformità alla Deforestazione",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Deforestation Certification",
    hindi: "वनों की कटाई प्रमाणीकरण",
    italian: "Certificazione della Deforestazione",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Due Diligence Guide",
    hindi: "उचित जांच मार्गदर्शिका",
    spanish: "Guía de Diligencia Debida",
    indonesian: "Panduan Kewajiban Kepada Pihak Ketiga",
    swahili: "Mwongo wa Uangalifu wa Kutosha",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Manage Farm",
    hindi: "फार्म प्रबंधित करें",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Farm Activities",
    hindi: "फार्म गतिविधियाँ",
    spanish: "Actividades de la Granja",
    indonesian: "Aktivitas Pertanian",
    dutch: "Boerderijactiviteiten",
    italian: "Attività Agricole",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Crops Overview",
    italian:"Panoramica delle colture",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Traceability",
    italian:"Tracciabilità",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Coffee Overview",
    italian:"Panoramica del caffè",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"plantations",
    italian:"pianure",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Green Beans",
    italian:"Fagioli verdi",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Coffee Data",
    italian:"Dati sul caffè",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Reports",
    italian:"Rapporti",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Cacao Overview",
    italian:"Panoramica del cacao",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Cacao Data",
    italian:"Dati sul cacao",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Dry Cacao",
    italian:"Cacao secco",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  
  {
    english:"Farm Management",
    italian:"Gestione della fattoria",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Farms",
    italian:"Fattorie",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Farmers",
    italian:"Agricoltori",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"User Management",
    italian:"Gestione utenti",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Users",
    italian:"Utenti",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Membership Plan",
    italian:"Piano di adesione",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Permissions",
    italian:"Permessi",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Activity Keys",
    italian:"Chiavi di attività",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },

  {
    english:"Role Requests",
    italian:"Richieste di ruolo",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Tickets",
    italian:"Biglietti",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Activity Log",
    italian:"Registro attività",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"member data",
    italian:"pianure",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Manage Offline Farmers",
    italian:"Gestisci agricoltori offline",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Buying Station",
    italian:"Stazione di acquisto",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Pesticides",
    italian:"Pesticidi",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english:"Admin Roles",
    italian:"Ruoli amministrativi",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },

  {
    english:"Admin Roles",
    italian:"Ruoli amministrativi",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Survey Builder",
    italian: "Costruttore di surver",
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