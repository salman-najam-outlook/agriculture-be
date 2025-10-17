'use strict';

const data = [
  {
    swahili: 'Kulegea',
    english: 'Loosening',
  },
  {
    swahili: 'Kuondoa kunyonya',
    english: 'De-suckering',
  },
  {
    swahili: 'Kubana',
    english: 'Pinching',
  },
  {
    swahili: 'Kuinua udongo',
    english: 'Earthing up',
  },
  {
    swahili: 'Kutandaza',
    english: 'Mulching',
  },
  {
    swahili: 'Kuinua juu',
    english: 'Lifting up',
  },
  {
    swahili: 'Msaada Kufuatilia & Kunyemelea',
    english: 'Support Trailing & Stalking',
  },
  {
    swahili: 'Koga ya unga',
    english: 'Powdery mildew',
  },
  {
    swahili: 'Doa nyeusi',
    english: 'Black spot',
  },
  {
    swahili: 'Virusi vya rose mosaic',
    english: 'Rose mosaic virus',
  },
  {
    swahili: 'Uchungu wa taji',
    english: 'Crown gall',
  },
  {
    swahili: 'Kuoza laini ya bakteria',
    english: 'Bacterial soft rot',
  },
  {
    swahili: 'Uharibifu wa majani',
    english: 'Leaf blight',
  },
  {
    swahili: 'Ugonjwa wa virusi vya viazi vitamu (SPVD)',
    english: 'Sweetpotato virus disease (SPVD)',
  },
  {
    swahili: 'Kuoza nyeusi',
    english: 'Black rot',
  },
  {
    swahili: 'Ugonjwa wa mapema',
    english: 'Early blight',
  },
  {
    swahili: 'Mweusi mweusi',
    english: 'Black scurf',
  },
  {
    swahili: 'Ugonjwa wa mosaic ya viazi',
    english: 'Potato mosaic disease',
  },
  {
    swahili: 'Ukungu wa Poda',
    english: 'Powdery Mildew',
  },
  {
    swahili: 'Kutu',
    english: 'Rust',
  },
  {
    swahili: 'Pod Spot na Ascochyta Blight',
    english: 'Pod Spot and Ascochyta Blight',
  },
  {
    swahili: 'Ugonjwa wa Downy',
    english: 'Downy mildew',
  },
  {
    swahili: 'Musa na Streak',
    english: 'Mosaic and Streak',
  },
  {
    swahili: 'Ugonjwa wa bakteria',
    english: 'Bacterial blight',
  },
  {
    swahili: 'Kunde mosaic',
    english: 'Cowpea mosaic',
  },
  {
    swahili: 'Kuoza kwa mizizi ya macrophomina',
    english: 'Macrophomina root rot',
  },
  {
    swahili: 'Vidukari',
    english: 'Aphids',
  },
  {
    swahili: 'Kiwango chekundu',
    english: 'Red scale',
  },
  {
    swahili: 'Misumari ya rose',
    english: 'Rose curculios',
  },
  {
    swahili: 'Minyoo',
    english: 'Cutworms',
  },
  {
    swahili: 'African Armyworm',
    english: 'African Armyworm',
  },
  {
    swahili: 'Aphid ya Maharage',
    english: 'Bean Aphid',
  },
  {
    swahili: 'Crown na Root Aphids',
    english: 'Crown and Root Aphids',
  },
  {
    swahili: 'Nondo ya Tuber',
    english: 'Tuber moth',
  },
  {
    swahili: 'Nzi weupe',
    english: 'White flies',
  },
  {
    swahili: 'Mchimbaji wa majani',
    english: 'Leaf Miner',
  },
  {
    swahili: 'Pea Shina kuruka',
    english: 'Pea Stem fly',
  },
  {
    swahili: 'Kipekecha cha ganda',
    english: 'Pod Borer',
  },
  {
    swahili: 'Pea nondo',
    english: 'Pea Moth',
  },
  {
    swahili: 'Vipekecha ganda',
    english: 'Pod borers',
  },
  {
    swahili: 'Minyoo ya jeshi',
    english: 'Armyworms',
  },
  {
    swahili: 'Mizizi sio nematodes',
    english: 'Root not nematodes',
  },
  {
    swahili: 'Maua ya thrips',
    english: 'Flower thrips',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const row of data) {
      let sql = 'SELECT * FROM global_translation_metadata WHERE english = :english';
      const global_trans = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.english },
      });

      if (global_trans && global_trans.length > 0) {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkUpdate('global_translation_metadata', item, {
          id: global_trans?.map((item) => item.id),
        });
      } else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, 'global_translation_metadata', item);
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
