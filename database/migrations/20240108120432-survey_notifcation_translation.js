'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "You have been invited to the survey",
        spanish: "Has sido invitado a la encuesta.",
        swahili: "Umealikwa kwenye utafiti",
        portugese: "Você foi convidado para a pesquisa",
        arabic: "لقد تمت دعوتك إلى الاستطلاع",
        amharic: "ወደ ጥናቱ ተጋብዘዋል",
        nepali: "तपाईंलाई सर्वेक्षणमा आमन्त्रित गरिएको छ",
        hindi: "आपको सर्वेक्षण के लिए आमंत्रित किया गया है"
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
