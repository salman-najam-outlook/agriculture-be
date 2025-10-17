"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "english",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "hindi",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "marathi",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "nepali",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "spanish",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "indonesian",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "arabic",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "portugese",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "french",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "swahili",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "bengali",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "oromo",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "somali",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "amharic",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "vietnamese",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "greek",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "mandarin",
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      "global_translation_metadata",
      "turkish",
      {
        type: Sequelize.TEXT,
      }
    );
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
