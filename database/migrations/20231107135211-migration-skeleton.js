'use strict';
const data = [
  {
    "english": "Creek",
    "swahili": "mto mdogo",
    "spanish": "arroyo"
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
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
          id: global_trans?.map(item => item.id)
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

    const firstQuery = `
        UPDATE global_translation_metadata
    SET
      english = REPLACE(english, 'Cocoa', 'Cacao'),
      spanish = REPLACE(spanish, 'Cocoa', 'Cacao'),
      indonesian = REPLACE(indonesian, 'Cocoa', 'Cacao'),
      french = REPLACE(french, 'Cocoa', 'Cacao'),
      portugese = REPLACE(portugese, 'Cocoa', 'Cacao'),
      somali = REPLACE(somali, 'Cocoa', 'Cacao')
    WHERE
      (LOWER(english) LIKE '%cocoa%' OR
      LOWER(spanish) LIKE '%cocoa%' OR
      LOWER(indonesian) LIKE '%cocoa%' OR
      LOWER(french) LIKE '%cocoa%' OR
      LOWER(somali) LIKE '%cocoa%' OR
      LOWER(portugese) LIKE '%cocoa%');
    `
    const secondQuery = `
        UPDATE options
    SET
      name = REPLACE(name, 'Cocoa', 'Cacao')
    WHERE
      groupName='crop-type' and
      LOWER(name) LIKE '%cocoa%' 
    `
    await queryInterface.sequelize.query(firstQuery)
    await queryInterface.sequelize.query(secondQuery)
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
