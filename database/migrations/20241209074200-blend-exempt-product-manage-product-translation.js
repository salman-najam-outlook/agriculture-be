'use strict';

const newTranslations = [
  {
    english: "Blends",
    spanish: "Mezclas",
    indonesian: "Campuran",
    italian: "Miscele",
    dutch: "Mengsels",
    portugese: "Misturas",
    swahili: "Mchanganyiko"
  },
  {
    english: "EUDR-Exempt Products",
    spanish: "Productos Exentos de EUDR",
    indonesian: "Produk Bebas EUDR",
    italian: "Prodotti Esenti da EUDR",
    dutch: "EUDR-vrijgestelde Producten",
    portugese: "Produtos Isentos de EUDR",
    swahili: "Bidhaa zisizo na EUDR"
  },
  {
    english: "Manage Products",
    spanish: "Gestionar Productos",
    indonesian: "Kelola Produk",
    italian: "Gestisci Prodotti",
    dutch: "Producten Beheren",
    portugese: "Gerenciar Produtos",
    swahili: "Dhibiti Bidhaa"
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const englishTranslations = newTranslations.map(data => data.english);

    // Delete existing translations for the terms if any
    await queryInterface.bulkDelete('global_translation_metadata', {
      english: {
        [Sequelize.Op.in]: englishTranslations
      }
    });

    // Insert new translations
    await queryInterface.bulkInsert('global_translation_metadata', newTranslations);
  },

  async down(queryInterface, Sequelize) {
    const englishTranslations = newTranslations.map(data => data.english);

    // Remove the inserted translations during the down process
    await queryInterface.bulkDelete('global_translation_metadata', {
      english: {
        [Sequelize.Op.in]: englishTranslations
      }
    });
  }
};
