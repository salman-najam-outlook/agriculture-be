"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Drying of entire crown.",
        spanish: "Secado de toda la corona.",
        portugese: "Secagem de toda a coroa.",
      },
      {
        english: "Cause extensive damage to roots and base of shoot.",
        spanish: "Causar un daño extenso a las raíces y la base del brote.",
        portugese: "Causar danos extensos às raízes e base da parte aérea.",
      },
      {
        english: "Leaves become yellow.",
        spanish: "Las hojas se vuelven amarillas.",
        portugese: "As folhas ficam amarelas.",
      },
      {
        english: "Covered with black sooty mold.",
        spanish: "Cubierto de fumagina negra.",
        portugese: "Coberto com fuligem negra.",
      },
      {
        english: "Top leaves get dried up and lateral buds germinate.",
        spanish:
          "Las hojas superiores se secan y los cogollos laterales germinan.",
        portugese: "As folhas superiores secam e os brotos laterais germinam.",
      },
      {
        english: "In severe cases, it looks like fiery appearance.",
        spanish: "En casos severos, parece una apariencia ardiente",
        portugese: "Em casos graves, parece uma aparência de fogo.",
      },
      {
        english: "It shows very slow growth of the plant.",
        spanish: "Muestra un crecimiento muy lento de la planta.",
        portugese: "Apresenta um crescimento muito lento da planta.",
      },
      {
        english: "Infested leaves look white with black dots.",
        spanish: "Las hojas infestadas se ven blancas con puntos negros.",
        portugese: "As folhas infestadas parecem brancas com pontos pretos.",
      },
      {
        english:
          "Large number of white-colored nymphs and adults on the undersurface of the leaf.",
        spanish:
          "Gran número de ninfas y adultos de color blanco en el envés de la hoja.",
        portugese:
          "Grande número de ninfas e adultos de coloração branca na face inferior da folha.",
      },
      {
        english:
          "Heavy secretion of honeydew leads to the development of sooty mold.",
        spanish:
          "La fuerte secreción de melaza conduce al desarrollo de fumagina",
        portugese:
          "A secreção pesada de melada leva ao desenvolvimento de fuligem.",
      },
      {
        english: "Leaves become brittle and dry completely.",
        spanish: "Las hojas se vuelven quebradizas y se secan por completo.",
        portugese: "As folhas ficam quebradiças e secam completamente.",
      },
      {
        english:
          "Internodes constricted and shortened, with a number of boreholes.",
        spanish:
          "Entrenudos contraídos y acortados, con una serie de perforaciones.",
        portugese: "Internós contraídos e encurtados, com vários furos.",
      },
      {
        english:
          "Boreholes are plugged with fresh excreta in the nodal region.",
        spanish:
          "Los pozos están tapados con excrementos frescos en la región nodal",
        portugese:
          "Os poços são obstruídos com excrementos frescos na região nodal.",
      },
      {
        english: "Frass materials are present on the affected portion.",
        spanish: "Hay materiales excrementos presentes en la parte afectada.",
        portugese: "Materiais de frass estão presentes na parte afetada.",
      },
      {
        english: "Stalks become discoloured and hollow.",
        spanish: "Los tallos se decoloran y se vuelven huecos.",
        portugese: "Talos ficam descoloridos e ocos.",
      },
      {
        english:
          "Internal tissues are reddened with intermingled transverse white spots",
        spanish:
          "Los tejidos internos están enrojecidos con manchas blancas transversales entremezcladas",
        portugese:
          "Os tecidos internos estão avermelhados com manchas brancas transversais misturadas",
      },
      {
        english: "A sour smell emanates.",
        spanish: "Emana un olor agrio.",
        portugese: "Exala um cheiro azedo.",
      },
      {
        english:
          "Whip like structure of 25 – 150 cm.Whip covered by translucent silvery membrane enclosing mass of black powdery spores.",
        spanish:
          "Estructura similar a un látigo de 25 a 150 cm. Látigo cubierto por una membrana plateada translúcida que encierra una masa de esporas de polvo negro",
        portugese:
          "Estrutura semelhante a um chicote de 25 – 150 cm. Chicote coberto por uma membrana prateada translúcida envolvendo uma massa de esporos pulverulentos pretos.",
      },
      {
        english:
          "Initial thin canes with elongated internodes later become reduced in length.",
        spanish:
          "Los bastones delgados iniciales con entrenudos alargados luego se reducen en longitud",
        portugese:
          "Caminhos iniciais finos com internódios alongados mais tarde tornam-se reduzidos em comprimento.",
      },
      {
        english:
          "Profuse sprouting of lateral buds with narrow, erect leaves especially in ratoon crop",
        spanish:
          "Profusa brotación de yemas laterales con hojas estrechas y erectas especialmente en cultivo de retoños",
        portugese:
          "Brotamento abundante de gemas laterais com folhas estreitas e eretas, especialmente em soqueiras",
      },
      {
        english: "Rusty appearance on leaves",
        spanish: "Aspecto oxidado en las hojas",
        portugese: "Aparência enferrujada nas folhas",
      },
      {
        english: "Premature death of the leaf.",
        spanish: "Muerte prematura de la hoja.",
        portugese: "Morte prematura da folha.",
      },
      {
        english: "These spots are turn red-brown to brown in color",
        spanish: "Estas manchas se vuelven de color marrón rojizo a marrón",
        portugese: "Essas manchas ficam marrom-avermelhadas a marrons",
      },
      {
        english: "Proliferation of vegetative buds",
        spanish: "Proliferación de brotes vegetativos",
        portugese: "Proliferação de brotos vegetativos",
      },
      {
        english: "The tillers bear pale yellow to completely chlorotic leaves",
        spanish:
          "Los tallos dan hojas de color amarillo pálido a completamente clorótico",
        portugese:
          "Os perfilhos apresentam folhas amarelas pálidas a completamente cloróticas",
      },
      {
        english: "The canes are thin with short internodes",
        spanish: "Las cañas son finas con entrenudos cortos",
        portugese: "As canas são finas com entrenós curtos",
      },
      {
        english: "Yellowing of the leaf midrib on the underside of the leaf",

        spanish:
          "Amarilleamiento de la nervadura central de la hoja en el envés de la hoja",
        portugese:
          "Amarelecimento da nervura central da folha na parte inferior da folha",
      },
      {
        english: "Discoloration of leaves",
        spanish: "Decoloración de las hojas",
        portugese: "Descoloração das folhas",
      },
      {
        english: "Bunchy appearance of the plant",
        spanish: "Apariencia agrupada de la planta",
        portugese: "Aparência volumosa da planta",
      },
      {
        english: "Red rot",
        spanish: "podredumbre roja",
        portugese: "Podridão vermelha",
      },
      {
        english: "Smut (fungal)",
        spanish: "La obscenidad (hongos)",
        portugese: "Carvão (fúngico)",
      },
      {
        english: "Rust",
        spanish: "Óxido",
        portugese: "Ferrugem",
      },
      {
        english: "Grassy shoot",
        spanish: "brote de hierba",
        portugese: "Tiro gramado",
      },
      {
        english: "Yellow leaf disease(virus)",
        spanish: "Enfermedad de la hoja amarilla (virus)",
        portugese: "Doença da folha amarela (vírus)",
      },
      {
        english: "White Grub",
        spanish: "Larva blanca",
        portugese: "Grub Branco",
      },
      {
        english: "Pyrilla",
        spanish: "Pirilla",
        portugese: "Pirila",
      },
      {
        english: "Whiteflies",
        spanish: "moscas blancas",
        portugese: "Moscas brancas",
      },
      {
        english: "Wooly aphid",
        spanish: "pulgón lanudo",
        portugese: "Afídio lanoso",
      },
      {
        english: "Internode borer",
        spanish: "barrenador de entrenudos",
        portugese: "Perfurador Internó",
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
