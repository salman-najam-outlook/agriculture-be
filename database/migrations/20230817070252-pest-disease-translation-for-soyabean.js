'use strict';

const translations = [
  {
    english: 'Stem fly',
    spanish: 'Mosca del tallo',
    portugese: 'Mosca da haste',
  },
  {
    english: 'Pod borer',
    spanish: 'Barrenador de vainas',
    portugese: 'Broca da vagem',
  },
  {
    english: 'White fly',
    spanish: 'Mosca blanca',
    portugese: 'Mosca branca',
  },
  {
    english: 'Armyworm',
    spanish: 'Gusano cogollero',
    portugese: 'Lagarta do Exército',
  },
  {
    english: 'Hairy catterpiller',
    spanish: 'Oruga peluda',
    portugese: 'Lagarta peluda',
  },
  {
    english: 'Soybean',
    spanish: 'Haba de soja',
    portugese: 'Soja',
  },
  {
    english: 'Soybean rust',
    spanish: 'Roya de la soja',
    portugese: 'Ferrugem da soja',
  },
  {
    english: 'Soybean mosaic',
    spanish: 'Mosaico de soja',
    portugese: 'Mosaico de soja',
  },
  {
    english: 'Bacterial blight',
    spanish: 'Tizón bacteriano',
    portugese: 'Ferrugem bacteriana',
  },
  {
    english: 'Soybean brown stem rot',
    spanish: 'Podredumbre parda del tallo de la soja',
    portugese: 'Podridão marrom do caule da soja',
  },

  {
    english:
      'Infected stems are often red inside (sometimes pale) and a distinct zig-zag tunnel may be observed – with maggots or pupae inside.',
    spanish:
      'Los tallos infectados a menudo son rojos por dentro (a veces pálidos) y se puede observar un túnel en zig-zag distintivo, con gusanos o pupas en el interior.',
    portugese:
      'As hastes infectadas geralmente são vermelhas por dentro (às vezes pálidas) e um túnel em zigue-zague distinto pode ser observado - com larvas ou pupas no interior.',
  },
  {
    english:
      'May even cause plant death, especially in younger plants particularly if damage occurs in the plant’s hypocotyl (basal stem) region.',
    spanish:
      'Incluso puede causar la muerte de la planta, especialmente en las plantas más jóvenes, especialmente si se produce daño en la región del hipocótilo (tallo basal) de la planta.',
    portugese:
      'Pode até causar a morte da planta, especialmente em plantas mais jovens, principalmente se ocorrer dano na região do hipocótilo (caule basal) da planta.',
  },
  {
    english: 'Large infestations (3 or more maggots per plant) may cause wilting',
    spanish: 'Grandes infestaciones (3 o más gusanos por planta) pueden causar marchitez',
    portugese: 'Grandes infestações (3 ou mais larvas por planta) podem causar murcha',
  },
  {
    english: 'The young larvae feeds on the chlorophyll of young leaves and skeletonize it',
    spanish: 'Las larvas jóvenes se alimentan de la clorofila de las hojas jóvenes y la esqueletizan',
    portugese: 'As larvas jovens se alimentam da clorofila das folhas jovens e as esqueletizam',
  },
  {
    english: 'Light pale brownish yellow stout moth',
    spanish: 'Polilla robusta de color amarillo pardusco pálido claro',
    portugese: 'Mariposa robusta de cor amarelo acastanhado claro',
  },
  {
    english: 'Forewings are olive green to pale brown with a dark brown circular spot in the centre',
    spanish:
      'Las alas delanteras son de color verde oliva a marrón pálido con una mancha circular de color marrón oscuro en el centro',
    portugese: 'As asas anteriores são verde-oliva a marrom claro com uma mancha circular marrom-escura no centro',
  },

  {
    english: 'Due to attack of the insect the leaves turn yellow and become curled',
    spanish: 'Debido al ataque del insecto las hojas se vuelven amarillas y se rizan',
    portugese: 'Devido ao ataque do inseto, as folhas ficam amarelas e enroladas',
  },
  {
    english: 'Chlorotic spots and sooty molds develop on the affected tissues',
    spanish: 'Se desarrollan manchas cloróticas y fumagina en los tejidos afectados',
    portugese: 'Manchas cloróticas e fuligem se desenvolvem nos tecidos afetados',
  },
  {
    english:
      'During heavy infections, these spots may come together and spread over the whole leaf, apart from the area around the veins.',
    spanish:
      'Durante infecciones graves, estas manchas pueden juntarse y extenderse por toda la hoja, además del área alrededor de las nervaduras.',
    portugese:
      'Durante infecções intensas, essas manchas podem se unir e se espalhar por toda a folha, exceto na área ao redor das nervuras.',
  },
  {
    english: 'Scrapping of leaves, pin holes or small to medium elongated holes',
    spanish: 'Desguace de hojas, orificios de alfiler o orificios alargados de pequeños a medianos',
    portugese: 'Raspagem de folhas, orifícios de pinos ou orifícios alongados de pequeno a médio',
  },
  {
    english: 'Singular, or closely grouped circular to irregularly shaped holes in foliage',
    spanish: 'Agujeros singulares o estrechamente agrupados de forma circular a irregular en el follaje',
    portugese: 'Orifícios circulares a irregulares singulares ou agrupados de perto na folhagem',
  },
  {
    english: 'Can cause serious damage to maize at all stages',
    spanish: 'Puede causar daños graves al maíz en todas las etapas',
    portugese: 'Pode causar sérios danos ao milho em todos os estágios',
  },
  {
    english: 'Leaves look like brownish-yellow in colour.',
    spanish: 'Las hojas se ven de color amarillo parduzco.',
    portugese: 'As folhas parecem amarelo-acastanhadas.',
  },
  {
    english: 'The final instar larvae feed on the leaves from the margin',
    spanish: 'Las larvas del estadio final se alimentan de las hojas del margen',
    portugese: 'As larvas do ínstar final se alimentam das folhas da margem',
  },
  {
    english: 'The damaged leaves of the plant appear in skeletonised/ net/ web form',
    spanish: 'Las hojas dañadas de la planta aparecen en forma de esqueleto/ red/ telaraña',
    portugese: 'As folhas danificadas da planta aparecem na forma esqueletizada/rede/teia',
  },
  {
    english: 'Tan or reddish-brown lesions (spots) develop first on the underside of leaves',
    spanish:
      'Las lesiones (manchas) de color canela o marrón rojizo se desarrollan primero en la parte inferior de las hojas',
    portugese:
      'Lesões bronzeadas ou marrom-avermelhadas (manchas) se desenvolvem primeiro na parte inferior das folhas',
  },
  {
    english: 'Symptoms begin on leaves in the lower plant canopy',
    spanish: 'Los síntomas comienzan en las hojas en el dosel inferior de la planta.',
    portugese: 'Os sintomas começam nas folhas na copa inferior da planta',
  },
  {
    english: 'Small pustules (blisters) develop in the lesions, which break open and release masses of tan spores',
    spanish:
      'Se desarrollan pequeñas pústulas (ampollas) en las lesiones, que se abren y liberan masas de esporas de color canela',
    portugese:
      'Pequenas pústulas (bolhas) se desenvolvem nas lesões, que se abrem e liberam massas de esporos bronzeados',
  },
  {
    english: 'Mottling appears as light and dark green patches on individual leaves',
    spanish: 'El moteado aparece como parches de color verde claro y oscuro en hojas individuales',
    portugese: 'O mosqueado aparece como manchas verdes claras e escuras em folhas individuais',
  },
  {
    english: 'Symptoms are most obvious on young, rapidly growing leaves',
    spanish: 'Los síntomas son más evidentes en las hojas jóvenes de rápido crecimiento',
    portugese: 'Os sintomas são mais evidentes em folhas jovens e de crescimento rápido',
  },
  {
    english:
      'The disease is characterized by light and day green mottling on the leaves often accompanied by wilting of young leaves in sunny days when plants first become infected.',
    spanish:
      'La enfermedad se caracteriza por un moteado verde claro y diurno en las hojas, a menudo acompañado por el marchitamiento de las hojas jóvenes en los días soleados cuando las plantas se infectan por primera vez.',
    portugese:
      'A doença é caracterizada por manchas verdes claras e diurnas nas folhas, muitas vezes acompanhadas de murchamento das folhas jovens em dias ensolarados, quando as plantas são infectadas pela primeira vez.',
  },
  {
    english: 'Symptoms usually begin in the upper canopy because young leaves are most susceptible',
    spanish:
      'Los síntomas generalmente comienzan en la parte superior del dosel porque las hojas jóvenes son más susceptibles',
    portugese: 'Os sintomas geralmente começam no dossel superior porque as folhas jovens são mais suscetíveis',
  },
  {
    english: 'Small, angular, reddish-brown lesions are surrounded by a yellow halo.',
    spanish: 'Las lesiones pequeñas, angulosas, de color marrón rojizo están rodeadas por un halo amarillo.',
    portugese: 'Lesões pequenas, angulares, marrom-avermelhadas, circundadas por um halo amarelo.',
  },
  {
    english: 'As the disease progresses, lesions often grow together to produce large, irregularly shaped dead areas',
    spanish:
      'A medida que avanza la enfermedad, las lesiones a menudo crecen juntas para producir grandes áreas muertas de forma irregular',
    portugese:
      'À medida que a doença progride, as lesões geralmente crescem juntas para produzir grandes áreas mortas de formato irregular',
  },
  {
    english:
      'Foliar symptoms can be similar to those of sudden death syndrome and stem canker and appear after early pod set',
    spanish:
      'Los síntomas foliares pueden ser similares a los del síndrome de muerte súbita y el cancro del tallo y aparecen después del cuajado temprano de vainas',
    portugese:
      'Os sintomas foliares podem ser semelhantes aos da síndrome da morte súbita e cancro do caule e aparecem após o início da formação das vagens',
  },
  {
    english: 'Stem symptoms usually occur prior to leaf symptoms',
    spanish: 'Los síntomas del tallo generalmente ocurren antes que los síntomas de la hoja',
    portugese: 'Os sintomas do caule geralmente ocorrem antes dos sintomas das folhas',
  },
  {
    english: 'Can occur even if foliar symptoms never appear',
    spanish: 'Puede ocurrir incluso si los síntomas foliares nunca aparecen',
    portugese: 'Pode ocorrer mesmo que os sintomas foliares nunca apareçam',
  },
];

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

  async down(queryInterface, Sequelize) {},
};
