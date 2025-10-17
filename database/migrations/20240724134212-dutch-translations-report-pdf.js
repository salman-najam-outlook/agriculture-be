const translations = [
  {
    english: "My Farm Activity",
    dutch: "Mijn boerderijactiviteit",
  },
  {
    english: "Land Preparation",
    dutch: "Landvoorbereiding",
  },
  {
    english: "Application Cost",
    dutch: "Toepassingskosten",
  },
  {
    english: "Cost",
    dutch: "Kosten",
  },
  {
    english: "Date",
    dutch: "Datum",
  },
  {
    english: "Farm/Zone Name",
    dutch: "Boerderij / Zone naam",
  },
  {
    english: "Area Planted",
    dutch: "Geplante oppervlakte",
  },
  {
    english: "Crop Type",
    dutch: "Gewastype",
  },
  {
    english: "Soil Type",
    dutch: "Bodemtype",
  },
  {
    english: "Soil Information",
    dutch: "Bodem informatie",
  },
  {
    english: "Nutrient Management",
    dutch: "Nutriëntenbeheer",
  },
  {
    english: "Weeding",
    dutch: "Wieden",
  },
  {
    english: "Harvesting",
    dutch: "Oogsten",
  },
  {
    english: "Irrigation",
    dutch: "Irrigatie",
  },
  {
    english: "Storage",
    dutch: "Opslag",
  },
  {
    english: "Sowing/Planting",
    dutch: "Zaaien/Planten",
  },
  {
    english: "Disease Management",
    dutch: "Ziektebeheer",
  },
  {
    english: "Pest Management",
    dutch: "Plaagbestrijding",
  },
  {
    english: "Crop Observation",
    dutch: "Gewasobservatie",
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const translation of translations) {
      const existingTranslations = await queryInterface.sequelize.query(
        'SELECT * FROM global_translation_metadata where english = :english',
        {
          replacements: { english: translation.english },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (existingTranslations && existingTranslations.length > 0) {
        await queryInterface.bulkUpdate(
          'global_translation_metadata',
          translation,
          {
            id: { [Sequelize.Op.in]: existingTranslations.map((translation) => translation.id) },
          }
        );
      } else {
        await queryInterface.insert(null, 'global_translation_metadata', translation);
      }
    }
  },

  async down(queryInterface, Sequelize) { }
};