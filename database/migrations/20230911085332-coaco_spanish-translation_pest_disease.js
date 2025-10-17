"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Black Pod Rot",
        spanish: "Podredumbre de la vaina negra",
      },
      {
        english: "Mealy bugs",
        spanish: "Cochinillas",
      },
      {
        english: "Stem canker",
        spanish: "cancro del tallo",
      },
      {
        english: "Tea mosquitoe bugs",
        spanish: "Mosquitos del té",
      },
      {
        english: "Vascular streak dieback",
        spanish: "Muerte regresiva por racha vascular",
      },
      {
        english: "Whitish growth of fungus",
        spanish: "Crecimiento blanquecino de hongos",
      },
      {
        english: "Pods turn brown to black",
        spanish: "Las vainas se vuelven de color marrón a negro",
      },
      {
        english: "Flatid Plant hoppers",
        spanish: "Saltamontes planos",
      },
      {
        english: "Aphids",
        spanish: "pulgones",
      },
      {
        english: "Stem Girdler",
        spanish: "Cinturón de tallo",
      },
      {
        english: "Beans become discolored as a result of infection",
        spanish: "Los frijoles se decoloran debido a una infección",
      },
      {
        english:
          "Earliest symptom is the appearance of a greyish brown water soaked lesion on the outer bark",
        spanish:
          "El primer síntoma es la aparición de una lesión acuosa de color marrón grisáceo en la corteza exterior",
      },
      {
        english:
          "Cankers appear either on the main trunk, jorquettes or fan branches",
        spanish:
          "Los cancros aparecen ya sea en el tronco principal, en jorquetas o en ramas de abanico",
      },
      {
        english:
          "A reddish brown liquid oozes out from these lesions, which later dries up to form rusty deposits",
        spanish:
          "De estas lesiones rezuma un líquido marrón rojizo que luego se seca formando depósitos oxidados",
      },
      {
        english:
          "First indication of the disease is a characteristic yellowing of one or two leaves on the second or third flush behind the growing tip",
        spanish:
          "El primer indicio de la enfermedad es un color amarillento característico de una o dos hojas en el segundo o tercer brote detrás de la punta en crecimiento",
      },
      {
        english:
          "Diseased leaves fall within a few days of turning yellow and the other leaves on the shoot show similar symptoms",
        spanish:
          "Las hojas enfermas caen a los pocos días de volverse amarillas y las demás hojas del brote muestran síntomas similares",
      },
      {
        english:
          "When the infected shoot is split lengthwise there is always a characteristic brown streaking",
        spanish:
          "Cuando el brote infectado se parte longitudinalmente queda siempre una característica raya marrón",
      },
      {
        english: "Colonizes on the tender parts of the plant",
        spanish: "Coloniza en las partes tiernas de la planta",
      },
      {
        english: "Stunting, chlorosis, and defoliation",
        spanish: "Retraso del crecimiento, clorosis y defoliación",
      },
      {
        english: "Circular water-soaked spots around the feeding punctures",
        spanish:
          "Manchas circulares empapadas de agua alrededor de los puntos de alimentación",
      },
      {
        english: "Punctures appear as reddish brown spots",
        spanish: "Los pinchazos aparecen como manchas de color marrón rojizo",
      },
      {
        english: "Leaves curl up, badly deformed, and shoots dry up",
        spanish:
          "Las hojas se enrollan, se deforman gravemente y los brotes se secan",
      },
      {
        english:
          "Nymphs and adults suck the sap from flowers, tender shoots, and pods",
        spanish:
          "Las ninfas y los adultos chupan la savia de las flores, de los brotes tiernos y de las vainas",
      },
      {
        english: "Excrete honey dew",
        spanish: "Excretar rocío de miel",
      },
      {
        english: "Development of sooty mold fungus on the leaves and pods",
        spanish: "Desarrollo de fumagina en hojas y vainas",
      },
      {
        english:
          "Colonize on the underside of tender leaves, succulent stem, flower buds, and small cherelles",
        spanish:
          "Coloniza en el envés de las hojas tiernas, tallos suculentos, botones florales y pequeños cherelles",
      },
      {
        english: "Premature shedding of flowers and curling of leaves",
        spanish: "Caída prematura de flores y enrollamiento de hojas",
      },
      {
        english: "Wilting and distortion of leaves and young shoots",
        spanish: "Marchitez y distorsión de hojas y brotes jóvenes",
      },
      {
        english:
          "Girdler the branches and inserts whitish spindle shaped eggs singly into the tissue in a slanting manner",
        spanish:
          "Cinta las ramas e inserta huevos blanquecinos en forma de huso uno por uno en el tejido de forma inclinada",
      },
      {
        english: "Branches above the girdle wither and dry",
        spanish: "Las ramas por encima del cinturón se marchitan y se secan",
      },
      {
        english: "Wilting of branches",
        spanish: "Marchitamiento de las ramas",
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
  },

  async down(queryInterface, Sequelize) {},
};
