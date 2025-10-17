"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update content for my_profile
    await queryInterface.bulkUpdate(
      "faq_sections",
      {
        nl: `[{"question":"Hoe kan ik mijn persoonlijke informatie invoeren in het profiel?","answer":"Klik op het pictogram in de linkerbovenhoek van het startscherm op uw apparaat. U vindt een ruimte om uw naam en e-mailadres in te voeren. U moet ook alle nodige gegevens invullen om uw account aan te maken."},{"question": "Hoe kan ik mijn profiel bewerken?","answer":"Om uw gegevens in het profiel te bekijken en bewerken, klikt u op uw naam of op de bewerkingsknop naast uw naam bovenaan het scherm."},{"question": "Hoe kan ik mijn profielupdates opslaan?","answer":"Telkens wanneer u informatie in uw account aanmaakt of bijwerkt, kunt u de wijzigingen bevestigen door op de knop Opslaan onderaan het scherm te klikken. Zodra opgeslagen, wordt de informatie automatisch bijgewerkt in het systeem."}]`,
      },
      {
        name: "my_profile",
      }
    );

    // Update content for my_farm
    await queryInterface.bulkUpdate(
      "faq_sections",
      {
        nl: `[{"question": "Hoe kan ik mijn boerderij registreren?","answer":"Klik op de sectie Mijn Boerderij en selecteer Boerderij Registratie. U kunt de gevraagde informatie invoeren in het getoonde formulier."},{"question": "Hoe kan ik mijn boerderij registratiegegevens bewerken?","answer":"U kunt uw boerderij registratiegegevens bekijken in de module Mijn Boerderij nadat het formulier is ingevuld. Om de details te bewerken, klik op de bewerkingsknop op het bevestigingsscherm."},{"question": "Hoe vind ik de locatie van mijn boerderij?","answer":"De locatie of het fysieke adres van uw boerderij, evenals de meer nauwkeurige fysieke grenzen van uw boerderij (Geohekken), moeten worden verstrekt tijdens het registratieproces van de boerderij. U kunt de details bekijken via de secties Mijn Locatie of Mijn Geohekken van Mijn Boerderij, waar u de ingevoerde informatie kunt bekijken en indien nodig updates kunt maken."},{"question": "Waarom moet ik mijn doelen invoeren?","answer":"Door informatie over uw doelen toe te voegen, helpt u bij het monitoren van uw voortgang in vergelijking met uw vooraf gedefinieerde criteria en geeft u ons een breder begrip van de beste manier om u te helpen aan uw behoeften te voldoen."},{"question": "Waarom moet ik het Auditformulier van de Boerderij invullen?","answer":"Het doel van de sectie Auditformulier van de Boerderij is om te bepalen of de boer goed presteert in vergelijking met specifieke criteria en gerelateerd aan verschillende gebieden van de boerderij. We helpen u bij het identificeren van gebieden die moeten worden verbeterd en gebieden waar u goed presteert. U kunt ons online auditformulier invullen of een van de bestaande audits uploaden ter referentie."},{"question": "Wat is het doel van de sectie Mijn Documenten?","answer":"U kunt verschillende bestanden en documenten uploaden onder de sectie Mijn Documenten om het ophalen of toekomstige referenties te vergemakkelijken. U kunt uw documenten organiseren in mappen, zoeken en filteren om de juiste bestanden te vinden. U kunt bestanden uploaden die verband houden met verschillende secties van de applicatie vanaf uw apparaat."}]`,
      },
      {
        name: "my_farm",
      }
    );

    // Update content for my_crops
    await queryInterface.bulkUpdate(
      "faq_sections",
      {
        nl: `[{"question":"Hoe kan ik mijn gewassen registreren?","answer":"U kunt toegang krijgen tot de module Mijn Gewassen en Registratie van Gewassen selecteren. Voer de vermelde gegevens in het formulier in om uw gewassen in het systeem te registreren."},{"question":"Hoe bekijk en bewerk ik mijn registratiedetails van gewassen?","answer":"Nadat u de details met betrekking tot uw gewassen heeft ingevuld onder het registratiescherm van gewassen, kunt u de details bekijken op het bevestigingsscherm waar u ook de informatie kunt bewerken door te klikken op de bewerkingsknop op hetzelfde scherm."},{"question":"Hoe kan ik het type en de variëteit van het gewas specificeren?","answer":"Het type en de variëteiten van het gewas moeten worden geregistreerd tijdens het registratieproces van het gewas waar u kunt selecteren uit de lijst met momenteel beschikbare types en variëteiten om uit te kiezen."},{"question":"Wat moet ik invoeren in de sectie Opmerkingen over het gewas?","answer":"U kunt de groeiomstandigheden van het gewas, voedingsstoffentekorten en algemene details met betrekking tot de gezondheid registreren in de sectie Opmerkingen over het Gewas om enkele aanvullende relevante details over de prestaties en conditie van het gewas te verzamelen. U kunt deze sectie gebruiken als dagboek voor uw periodieke observaties waar u ook extra notities kunt toevoegen en foto's kunt bijvoegen om het monitoren van de omstandigheden in de loop van de tijd te helpen."}]`,
      },
      {
        name: "my_crops",
      }
    );

    // Update content for my_livestock
    await queryInterface.bulkUpdate(
      "faq_sections",
      {
        nl: `[{"question":"Hoe kan ik mijn vee registreren?","answer":"U kunt toegang krijgen tot de sectie Mijn Vee en Registratie van Vee selecteren. Op deze manier voert u het type dier, naam, identificatienummer en andere vermelde informatie in het formulier in om de details van het dier correct te registreren."},{"question":"Hoe kan ik mijn doel(en) toevoegen?","answer":"U kunt uw doel(en) op twee manieren invoeren: door te klikken op de sectie Mijn Doelen onder de module Mijn Boerderij waar u ook kunt kiezen of u een specifiek doel wilt invoeren met betrekking tot uw gewassen of vee. U kunt ook de functionaliteit van uw doelen vinden onder de modules Mijn vee of Mijn gewassen om specifieke informatie in het respectievelijke module in te voeren. U kunt meerdere doelen invoeren."},{"question":"Hoe kan ik observaties toevoegen over mijn dier/dieren?","answer":"De sectie Observaties van het Dier, gelegen onder de module Mijn Vee, is de beste plek om details over observaties van uw dier toe te voegen. U kunt observatiedetails toevoegen voor slechts één dier (individueel) of dieren of een groep dieren (kudde)."},{"question":"Welke informatie over mijn vee moet ik invoeren voor een correcte registratie van het dier?","answer":"Volg de vragen die worden gepresenteerd in het formulier Registratie van Vee. Verplichte velden zijn gemarkeerd met een rode asterisk en vertegenwoordigen de belangrijkste velden. We raden u aan zoveel mogelijk informatie in te voeren, zodat we nauwkeurigere aanbevelingen en rapporten kunnen verstrekken die aan uw behoeften voldoen."}]`,
      },
      {
        name: "my_livestock",
      }
    );

    // Update content for technical_issues
    await queryInterface.bulkUpdate(
      "faq_sections",
      {
        nl: `[{"question":"Voor elk technisch probleem kunt u contact met ons opnemen via help@dimitra.io met een uitleg van uw probleem, of vul ons online formulier in dat te vinden is in de sectie Neem contact met ons op.","answer": "",}]`,
      },
      {
        name: "technical_issues",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // You can implement the rollback logic if needed
    // This is just a placeholder
  },
};
