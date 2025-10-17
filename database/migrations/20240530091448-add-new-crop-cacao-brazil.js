"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.bulkInsert(
      "options",
      [
        {
          name: "Cacao (Brazil)",
          region: "Brazil",
          countryCode: "BR",
          groupName: "crop-type",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    const [result] = await queryInterface.sequelize.query(
      "SELECT LAST_INSERT_ID() AS id"
    );
    await queryInterface.bulkInsert(
      "crops",
      [
        {
          cropTypeOptId: result[0].id,
          name: "Criollo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "Forasteiro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "Trinitário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: result[0].id,
          name: "Other",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );

    const langaugeObjects = [
      {
        english: "Cacao (Brazil)",
        hindi: "कोको (ब्राज़ील)",
        marathi: "काकाओ (ब्राझील)",
        spanish: "Cacao (Brasil)",
        indonesian: "Kakao (Brasil)",
        portugese: "Cacau (Brasil)",
        nepali: "काकाओ (ब्राजिल)",
        french: "Cacao (Brésil)",
        arabic: "الكاكاو (البرازيل)",
        swahili: "Kakao (Brazil)",
        bengali: "কাকাও (ব্রাজিল)",
        oromo: "Kaakaaw (Braazil)",
        somali: "Cacao (Brazil)",
        vietnamese: "Cacao (Brazil)",
        amharic: "ካካኦ (ብራዚል)",
        greek: "Κακάο (Βραζιλία)",
        mandarin: "可可（巴西）",
        japanese: "カカオ（ブラジル）",
        turkish: "Kakao (Brezilya)",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]

    for (const obj in langaugeObjects) {
      await queryInterface.insert(null, 'global_translation_metadata', langaugeObjects[obj]);
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
