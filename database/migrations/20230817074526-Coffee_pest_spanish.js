"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english:
          "Coffee berry borer is the most serious pest of coffee worldwide.",
        spanish:
          "La broca del café es la plaga más grave del café en todo el mundo",
        portugese: "A broca do café é a praga mais séria do café no mundo.",
      },
      {
        english:
          "The female beetle bores into the berries through the navel region and makes tunnels in the hard bean, laying about 15 eggs.",
        spanish:
          "El escarabajo hembra perfora las bayas a través de la región del ombligo y hace túneles en el frijol duro, poniendo alrededor de 15 huevos",
        portugese:
          "O besouro fêmea perfura as bagas pela região do umbigo e faz túneis no grão duro, colocando cerca de 15 ovos.",
      },
      {
        english:
          "The larvae feed on the beans, making small tunnels. A typical pinhole at the tip of the berries indicates the presence of the pest, which damages young as well as ripe berries. In severe infestation, 30 to 80% of berries may be affected, resulting in heavy crop loss.",
        spanish:
          "Las larvas se alimentan de los frijoles, formando pequeños túneles. Un orificio típico en la punta de las bayas indica la presencia de la plaga, que daña tanto las bayas jóvenes como las maduras. En una infestación severa, entre el 30 y el 80 % de las bayas pueden verse afectadas. , lo que resulta en una gran pérdida de cultivos.",
        portugese:
          "As larvas alimentam-se dos grãos, fazendo pequenos túneis. Um buraquinho típico na ponta das bagas indica a presença da praga, que danifica tanto as bagas jovens como as maduras. Em infestação severa, 30 a 80% das bagas podem ser afectadas , resultando em grande perda de safra.",
      },
      {
        english: "Serious pest of Arabica coffee.",
        spanish: "Plaga grave del café arábica.",
        portugese: "Grave praga do café arábica.",
      },
      {
        english: "Infested plants show external ridges around the stem.",
        spanish:
          "Las plantas infestadas muestran crestas externas alrededor del tallo.",
        portugese:
          "As plantas infestadas apresentam sulcos externos ao redor do caule.",
      },
      {
        english: "Affected plants also show yellowing and wilting of leaves.",
        spanish:
          "Las plantas afectadas también muestran amarillamiento y marchitamiento de las hojas",
        portugese:
          "As plantas afetadas também apresentam amarelecimento e murchamento das folhas.",
      },
      {
        english:
          "Withered (faster in young branches and delayed in older twigs) or dried branches, attacked leaves fall prematurely.",
        spanish:
          "Marchitas (más rápido en las ramas jóvenes y más tardías en las más viejas) o ramas secas, las hojas atacadas caen prematuramente.",
        portugese:
          "Ramos murchos (mais rápido em galhos jovens e atrasados em galhos mais velhos) ou galhos secos, folhas atacadas caem prematuramente.",
      },
      {
        english: "Terminal leaves wilt, droop, and dry up.",
        spanish: "Las hojas terminales se marchitan, caen y se secan.",
        portugese: "As folhas terminais murcham, caem e secam.",
      },
      {
        english:
          "Severe infestation can result in the loss of a considerable number of productive branches.",
        spanish:
          "La infestación severa puede resultar en la pérdida de un número considerable de ramas productivas",
        portugese:
          "A infestação severa pode resultar na perda de um número considerável de ramos produtivos.",
      },
      {
        english:
          "The larva causes damage in Arabica and Robusta coffee by boring into young stems, primary and secondary branches to feed on the wood.",
        spanish:
          "La larva causa daños en el café Arábica y Robusta al perforar los tallos jóvenes y las ramas primarias y secundarias para alimentarse de la madera",
        portugese:
          "A larva causa danos nos cafés Arábica e Robusta ao perfurar os caules jovens, ramos primários e secundários para se alimentar da madeira.",
      },
      {
        english:
          "In the early stages of attack, young plants or branches show signs of wilting. Infested parts bear one or two holes through which pellet-like excrement of the larva hangs out and accumulates at the base of the plant.",
        spanish:
          "En las primeras etapas del ataque, las plantas jóvenes o las ramas muestran signos de marchitamiento. Las partes infestadas tienen uno o dos agujeros a través de los cuales cuelgan excrementos de la larva en forma de gránulos que se acumulan en la base de la planta",
        portugese:
          "Nos estágios iniciais do ataque, as plantas jovens ou galhos mostram sinais de murcha. As partes infestadas apresentam um ou dois orifícios através dos quais os excrementos da larva em forma de pellets saem e se acumulam na base da planta.",
      },
      {
        english: "In advanced cases, the branch or the whole plant dries up.",
        spanish: "En casos avanzados, la rama o toda la planta se seca.",
        portugese: "Em casos avançados, o galho ou a planta toda seca.",
      },
      {
        english: "Berry Borer",
        spanish: "Barrenador de bayas",
        portugese: "Broca de Berry",
      },
      {
        english: "White Stem Borer",

        spanish: "Barrenador blanco del tallo",
        portugese: "Braqueador Branco",
      },
      {
        english: "Shot Hole Borer",

        spanish: "Perforador de agujeros de tiro",
        portugese: "Perfurador de buraco de tiro",
      },
      {
        english: "Red Borer",
        spanish: "Perforador rojo",
        portugese: "Perfurador Vermelho",
      },
      {
        english:
          "This is an important disease causing economic loss particularly in arabica coffee.",
        spanish:
          "Esta es una enfermedad importante que causa pérdidas económicas, particularmente en el café arábica",
        portugese:
          "Trata-se de uma importante doença que causa perdas econômicas principalmente no café arábica.",
      },
      {
        english:
          "On the lower surface of the infected leaves, small pale yellowish spots appear early after the first rains in the season.",
        spanish:
          "En la superficie inferior de las hojas infectadas, aparecen pequeñas manchas de color amarillo pálido poco después de las primeras lluvias de la temporada",
        portugese:
          "Na superfície inferior das folhas infectadas, pequenas manchas amareladas pálidas aparecem logo após as primeiras chuvas da estação.",
      },
      {
        english:
          "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation.severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
        spanish:
          "Estas manchas pronto aumentan en tamaño y número, y muchas de esas manchas se fusionan con severidad causando una defoliación prematura. La defoliación severa conduce al debilitamiento de los arbustos y da como resultado una mala cosecha en las temporadas siguientes",
        portugese:
          "Essas manchas logo aumentam de tamanho e número, e muitas dessas manchas coalescem com a severidade, causando desfolha prematura. A desfolha severa leva à debilitação dos arbustos e resulta em colheitas ruins nas estações seguintes.",
      },
      {
        english:
          "Necrotic spots on the exposed surface of green berries enlarge and cover the major portion.",
        spanish:
          "Las manchas necróticas en la superficie expuesta de las bayas verdes se agrandan y cubren la mayor parte",
        portugese:
          "Os pontos necróticos na superfície exposta das bagas verdes aumentam e cobrem a maior parte.",
      },
      {
        english: "Fruit skin shrivels and sticks fast to the parchment.",
        spanish: "La piel de la fruta se arruga y se pega al pergamino.",
        portugese: "A casca da fruta murcha e gruda no pergaminho.",
      },
      {
        english:
          "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2–0.6 inches in diameter) of brown tissue",
        spanish:
          "Los centros de las manchas se vuelven de color blanco grisáceo y están rodeados por un anillo distintivo (de 0,2 a 0,6 pulgadas de diámetro) de tejido marrón",
        portugese:
          "Os centros das manchas ficam branco-acinzentados e são circundados por um anel distinto (0,2–0,6 polegadas de diâmetro) de tecido marrom",
      },
      {
        english:
          "Circular brown spots with light-brown/grey centers, surrounded by a wide dark brown ring and and yellow halos, around 15 mm wide appear on leaves",
        spanish:
          "En las hojas aparecen manchas circulares de color marrón con centros de color marrón claro/gris, rodeadas por un amplio anillo marrón oscuro y halos amarillos, de unos 15 mm de ancho",
        portugese:
          "Manchas circulares marrons com centro marrom-claro/acinzentado, circundadas por um largo anel marrom-escuro e halos amarelos, com cerca de 15 mm de largura aparecem nas folhas",
      },
      {
        english:
          "The spots mostly occur between the veins and also on the margins. Sometimes spots grow into large blotches, and a leaf bligh occurs.",

        spanish:
          "La mayoría de las manchas se producen entre las nervaduras y también en los márgenes. A veces, las manchas se convierten en manchas grandes y se produce una mancha en la hoja",
        portugese:
          "As manchas ocorrem principalmente entre as nervuras e também nas margens. Às vezes, as manchas se transformam em grandes manchas e ocorre um bligh nas folhas.",
      },
      {
        english:
          "This usually happens in cooler, wet areas above 600 m altitude. Infections on the berries are generally smaller, around 5 mm wide, but sometimes they cover the whole berry.",

        spanish:
          "Esto suele ocurrir en áreas más frescas y húmedas por encima de los 600 m de altitud. Las infecciones en las bayas son generalmente más pequeñas, alrededor de 5 mm de ancho, pero a veces cubren toda la baya",
        portugese:
          "Isso geralmente acontece em áreas mais frias e úmidas acima de 600 m de altitude. As infecções nas bagas são geralmente menores, com cerca de 5 mm de largura, mas às vezes cobrem toda a baga.",
      },
      {
        english:
          "Monitor for this disease and treat at early stages of development on berries and branches.",

        spanish:
          "Monitoree esta enfermedad y trate en las primeras etapas de desarrollo en bayas y ramas",
        portugese:
          "Monitore esta doença e trate nos estágios iniciais de desenvolvimento em bagas e ramos.",
      },
      {
        english:
          "Early symptoms may be leaf yellowing and drop of leaves that are found mid-branch, small 'spots or lesions' on ripening berries",

        spanish:
          "Los primeros síntomas pueden ser el amarillamiento de las hojas y la caída de las hojas que se encuentran en la mitad de la rama, pequeñas 'manchas o lesiones' en las bayas en maduración",
        portugese:
          "Os primeiros sintomas podem ser o amarelecimento das folhas e a queda das folhas que se encontram no meio do ramo, pequenas 'manchas ou lesões' nas bagas em amadurecimento",
      },
      {
        english:
          "Dark browning of lateral or vertical stem(s), vertical tip die-back, and premature berry death.",
        spanish:
          "Oscurecimiento de los tallos laterales o verticales, muerte regresiva de la punta vertical y muerte prematura de las bayas",
        portugese:
          "Acastanhamento escuro da(s) haste(s) lateral(is) ou vertical(is), morte vertical da ponta e morte prematura da baga.",
      },
      {
        english: "Leaf Rust",
        spanish: "Roya de la hoja",
        portugese: "Folha de ferrugem",
      },
      {
        english: "Berry Blotch",
        spanish: "Mancha de bayas",
        portugese: "Mancha de Berry",
      },
      {
        english: "Cercospora Leaf Spot",
        spanish: "Mancha foliar por cercospora",
        portugese: "Mancha foliar de Cercospora",
      },
      {
        english: "Anthracnose / Dieback",
        spanish: "antracnosis / muerte regresiva",
        portugese: "Antracnose / Dieback",
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
