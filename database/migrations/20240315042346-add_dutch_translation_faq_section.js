'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the 'nl' column to the 'faq_sections' table
    await queryInterface.addColumn('faq_sections', 'nl', {
      type: Sequelize.TEXT, // Assuming JSON data type is suitable for storing the provided data
      allowNull: true,
    });

    // Update 'nl' column based on 'name' column values
    await queryInterface.sequelize.query(`
      UPDATE faq_sections
      SET nl = CASE
        WHEN name = 'my_profile' THEN '[{"question": "Hoe kan ik mijn persoonlijke profielgegevens invoeren?", "antwoord": "Op uw apparaat klikt u op het pictogram in de linkerhoek van uw startpagina. U vindt een ruimte om uw naam in te vullen en e-mailadres voor contact. U moet ook alle gegevens invullen die nodig zijn om uw account aan te maken"},{"question": "Hoe bewerk ik mijn profiel?", "antwoord": "Om uw profielgegevens te bekijken en te bewerken, moet u kunt u op uw naam klikken of op de knop \\'Bewerken\\' direct naast uw naam bovenaan het scherm"},{"question": "Hoe bewaar ik mijn profielupdates?", "antwoord": "Wanneer u een profiel maakt of maakt updates van uw accountgegevens, kunt u uw wijzigingen bevestigen door op de knop Opslaan onder aan uw scherm te klikken. Eenmaal opgeslagen, wordt de informatie automatisch bijgewerkt in het systeem"}]'
        WHEN name = 'my_farm' THEN '[{"question": "Hoe kan ik mijn bedrijf registreren?", "antwoord": "U kunt op het gedeelte Mijn bedrijf klikken en Bedrijfsregistratie selecteren. U kunt de gevraagde informatie invoeren in het weergegeven formulier."},{"question": "Hoe bewerk ik de registratie-informatie van mijn boerderij?", "antwoord": "De gegevens van uw boerderijregistratie kunnen worden bekeken onder de module Mijn bedrijf zodra u het formulier heeft ingevuld. Om de details te bewerken, kunt u klikken op de knop \\'Bewerken\\' op het detailbevestigingsscherm"}]'
        WHEN name = 'my_crops' THEN '[{"question": "Hoe kan ik mijn gewassen registreren?", "antwoord": "U kunt naar de module Mijn gewassen gaan en Gewasregistratie selecteren. Voer de gegevens in die in het formulier staan ​​vermeld om uw gewassen te registreren in het systeem"},{"question": "Hoe kan ik mijn gewasregistratiegegevens bekijken en bewerken?", "antwoord": "Zodra u de gegevens over uw gewassen heeft ingevuld onder het scherm Gewasregistratie, kunt u de details bekijken in het scherm \\'Gewasregistratie\\'. bevestigingsscherm waar u de informatie ook kunt bewerken door op de knop Bewerken te klikken die zich op hetzelfde scherm bevindt"}]'
        WHEN name = 'my_livestock' THEN '[{"question": "Hoe kan ik mijn doel(en) toevoegen?", "antwoord": "U kunt uw doel(en) op twee manieren invoeren: door te klikken op het gedeelte Mijn doelen onder de module Mijn boerderij waar u verder kunt kiezen of u een specifiek doel met betrekking tot uw gewassen of vee wilt invoeren. U kunt ook de functionaliteit voor mijn doelen vinden onder de module Mijn vee of Mijn gewassen om informatie in te voeren die specifiek is voor de betreffende module. meerdere doelen."}]'
        WHEN name = 'technical_issues' THEN '[{"question": "Neem voor technische problemen contact met ons op via help@dimitra.io met de uitleg van uw probleem of vul ons online formulier in dat u kunt vinden in de sectie \\'Contact\\'", "antwoord": ""}]'
        ELSE '[]'
      END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'nl' column from the 'faq_sections' table
    await queryInterface.removeColumn('faq_sections', 'nl');
  }
};
