'use strict';

const translations = [
  {
    english: 'Mango Hopper',
    spanish: 'Tolva de mango',
    portugese: 'Funil de manga',
  },
  {
    english: 'Mango Mealy Bug',
    spanish: 'Chinche harinosa del mango',
    portugese: 'Cochonilha de Manga',
  },
  {
    english: 'Mango Bark Eating Caterpillar',
    spanish: 'Corteza de mango comiendo oruga',
    portugese: 'Lagarta comendo casca de manga',
  },
  {
    english: 'Mango fruit fly',
    spanish: 'Mosca de la fruta del mango',
    portugese: 'Mosca da manga',
  },
  {
    english: 'Inflorescence Midge',
    spanish: 'Mosquito de inflorescencia',
    portugese: 'Inflorescência mosquito',
  },
  {
    english: 'Mango stem borer',
    spanish: 'Barrenador del tallo del mango',
    portugese: 'Broca do caule da manga',
  },
  {
    english: 'Mango seed weevil',
    spanish: 'Gorgojo de la semilla del mango',
    portugese: 'Gorgulho da semente de manga',
  },
  {
    english: 'Mango Leaf Webber',
    spanish: 'Webber de hoja de mango',
    portugese: 'Mango Leaf Webber',
  },
  {
    english: 'Mango shoot gall psylla',
    spanish: 'Psila de agalla de brote de mango',
    portugese: 'Galha de broto de manga psylla',
  },
  {
    english: 'Powdery Mildew',
    spanish: 'Oídio',
    portugese: 'Oídio',
  },
  {
    english: 'Anthracnose',
    spanish: 'Antracnosis',
    portugese: 'Antracnose',
  },
  {
    english: 'Mango malformation',
    spanish: 'Malformación del mango',
    portugese: 'Malformação de manga',
  },
  {
    english: 'Bacterial Canker',
    spanish: 'Cancro bacteriano',
    portugese: 'Cancro bacteriano',
  },
  {
    english: 'Mango Dieback',
    spanish: 'Muerte regresiva del mango',
    portugese: 'Mango Dieback',
  },
  {
    english: 'Phoma Blight',
    spanish: 'Tizón Phoma',
    portugese: 'Phoma Blight',
  },
  {
    english: 'Mango Black Tip',
    spanish: 'Mango Negro Punta',
    portugese: 'Manga Black Tip',
  },
  {
    english: 'Adults and nymphs suck sap from tender shoots and flowers, causing drying of flowers and subsequent dropping. It secretes honeydew that develops sooty mold, reducing photosynthesis.',
    spanish: 'Los adultos y las ninfas chupan la savia de los brotes tiernos y las flores, provocando el secado de las flores y la caída posterior. Secreta melaza que desarrolla fumagina, reduciendo la fotosíntesis.',
    portugese: 'Adultos e ninfas sugam a seiva de brotos e flores tenras, causando a secagem das flores e posterior queda. Ele secreta melada que desenvolve fuligem, reduzindo a fotossíntese.',
  },
  {
    english: 'Heavy puncturing and continuous draining of the sap cause curling and drying of the infested tissue.',
    spanish: 'La perforación intensa y el drenaje continuo de la savia provocan el rizado y secado del tejido infestado.',
    portugese: 'A perfuração intensa e a drenagem contínua da seiva causam ondulações e ressecamento do tecido infestado.',
  },
  {
    english: 'Hoppers shelter in the cracks and crevices of the bark or underside the leaves of the trees during the off season.',
    spanish: 'Los saltamontes se refugian en las grietas y hendiduras de la corteza o debajo de las hojas de los árboles durante la temporada baja.',
    portugese: 'Os funis se abrigam nas rachaduras e fendas da casca ou sob as folhas das árvores durante a entressafra.',
  },
  {
    english: 'Nymphs and adults suck plant sap and it secretes honey dew that develops sooty mould.',
    spanish: 'Las ninfas y los adultos chupan la savia de la planta y secretan un rocío de miel que desarrolla fumagina.',
    portugese: 'Ninfas e adultos sugam a seiva das plantas e secretam orvalho de mel que desenvolve bolor fuliginoso.',
  },
  {
    english: 'Grub tunnels in the sapwood on the trunk or branches.',
    spanish: 'Grub túneles en la albura del tronco o ramas.',
    portugese: 'Túneis de larvas no alburno no tronco ou galhos.',
  },
  {
    english: 'Grub bore into the sapwood and making irregular tunnels.',
    spanish: 'Grub perfora la albura y hace túneles irregulares.',
    portugese: 'Larva perfurava o alburno e fazia túneis irregulares.',
  },
  {
    english: 'Caterpillars bore into the trunk or junction of branches make zig zag galleries. Presence of gallery made out of silk and frass is the key symptom.',
    spanish: 'Las orugas perforan el tronco o la unión de las ramas y forman galerías en zigzag. La presencia de una galería hecha de seda y excrementos es el síntoma clave.',
    portugese: 'Lagartas furadas no tronco ou na junção de galhos formam galerias em zigue-zague. A presença de uma galeria feita de seda e excremento é o principal sintoma.',
  },
  {
    english: 'Caterpillars remain hidden in the tunnel during day time, come out at night and feed on the bark.',
    spanish: 'Las orugas permanecen escondidas en el túnel durante el día, salen por la noche y se alimentan de la corteza.',
    portugese: 'As lagartas ficam escondidas no túnel durante o dia, saem à noite e se alimentam da casca.',
  },
  {
    english: 'Due to infestation, flow of sap is hindered, plant growth arrested and fruit formation is drastically reduced',
    spanish: 'Debido a la infestación, se obstaculiza el flujo de savia, se detiene el crecimiento de las plantas y se reduce drásticamente la formación de frutos',
    portugese: 'Devido à infestação, o fluxo de seiva é prejudicado, o crescimento da planta é interrompido e a formação de frutos é drasticamente reduzida',
  },
  {
    english: 'The female punctures fruits with its pointed ovipositor and insert eggs inside.',
    spanish: 'La hembra pincha los frutos con su puntiagudo ovipositor e introduce los huevos en su interior.',
    portugese: 'A fêmea perfura os frutos com seu ovipositor pontiagudo e insere os ovos em seu interior.',
  },
  {
    english: 'Infested fruits exhibit puncture marks & oozing.',
    spanish: 'Las frutas infestadas exhiben marcas de pinchazos y supuración.',
    portugese: 'Frutos infestados exibem marcas de perfuração e exsudação.',
  },
  {
    english: 'After hatching, maggot feeds on the pulp of fruit which result in dropping & rottening of frui',
    spanish: 'Después de la eclosión, el gusano se alimenta de la pulpa de la fruta, lo que provoca que la fruta se caiga y se pudra.',
    portugese: 'Após a eclosão, a larva se alimenta da polpa da fruta, o que resulta na queda e apodrecimento da fruta',
  },
  {
    english: 'After hatching, the maggot feeds on the pulp of the fruit, resulting in dropping and rotting of the fruit.',
    spanish: 'Después de la eclosión, el gusano se alimenta de la pulpa de la fruta, lo que provoca que la fruta se caiga y se pudra.',
    portugese: 'Após a eclosão, a larva se alimenta da polpa da fruta, resultando na queda e apodrecimento da fruta.',
  },
  {
    english: 'It attacks floral buds, tender fruits & tender leaves.',
    spanish: 'Ataca botones florales, frutos tiernos y hojas tiernas.',
    portugese: 'Ataca botões florais, frutos tenros e folhas tenras.',
  },
  {
    english: 'The Infested mango buds, shoots and young fruits develop many small blister galls, about 3-4 mm long, each containing a yellow maggot.',
    spanish: 'Los brotes, brotes y frutos jóvenes del mango infestado desarrollan muchas ampollas pequeñas, de unos 3-4 mm de largo, cada una con un gusano amarillo.',
    portugese: 'Os brotos de manga infestados, brotos e frutos jovens desenvolvem muitas pequenas vesículas com cerca de 3-4 mm de comprimento, cada uma contendo uma larva amarela.',
  },
  {
    english: 'In severe attacks the affected plant parts shrivel and die also small emergence holes may be detected on galls',
    spanish: 'En ataques severos, las partes afectadas de la planta se marchitan y mueren, también se pueden detectar pequeños agujeros de emergencia en las agallas.',
    portugese: 'Em ataques severos, as partes afetadas da planta murcham e morrem, e pequenos buracos de emergência podem ser detectados nas galhas.',
  },
  {
    english: 'In severe attacks the affected plant parts shrivel and die also small emergence holes may be detected on galls.',
    spanish: 'En ataques severos, las partes afectadas de la planta se marchitan y mueren, también se pueden detectar pequeños agujeros de emergencia en las agallas.',
    portugese: 'Em ataques severos, as partes afetadas da planta murcham e morrem, e pequenos buracos de emergência podem ser detectados nas galhas.',
  },
  {
    english: 'Grubs start feeding below the bark of branches making tunnels, subsequently bore into the main stem.',
    spanish: 'Los gusanos comienzan a alimentarse debajo de la corteza de las ramas haciendo túneles y posteriormente perforan el tallo principal.',
    portugese: 'As larvas começam a se alimentar abaixo da casca dos galhos fazendo túneis, posteriormente perfurando o caule principal.',
  },
  {
    english: 'Frass coming out of the entry point indicates presence of trunk borer.',
    spanish: 'Los excrementos que salen del punto de entrada indican la presencia del barrenador del tronco.',
    portugese: 'O excremento saindo do ponto de entrada indica a presença da broca do tronco.',
  },
  {
    english: 'Damage results in yellowing of leaves followed by drying of terminal shoots and branches, leading to the death of whole tree.',
    spanish: 'El daño resulta en el amarillamiento de las hojas seguido por el secado de los brotes y ramas terminales, lo que lleva a la muerte de todo el árbol.',
    portugese: 'Os danos resultam no amarelecimento das folhas, seguido pela secagem dos brotos e galhos terminais, levando à morte de toda a árvore.',
  },
  {
    english: 'Grub makes zigzag tunnels in pulp',
    spanish: 'Grub hace túneles en zigzag en pulpa',
    portugese: 'Grub faz túneis em zigue-zague em polpa',
  },
  {
    english: 'Eats unripe tissue and bore into cotyledon',
    spanish: 'Come tejido inmaduro y perfora el cotiledón',
    portugese: 'Come tecido imaturo e perfura o cotilédone',
  },
  {
    english: 'Fruit dropping at marble stage',
    spanish: 'Caída de frutas en el escenario de mármol',
    portugese: 'Fruta caindo no estágio de mármore',
  },
  {
    english: 'Oviposition injuries on marble sized fruits',
    spanish: 'Lesiones por oviposición en frutos del tamaño de una canica',
    portugese: 'Lesões de oviposição em frutos do tamanho de mármore',
  },
  {
    english: 'Larva is pale green with brown head and prothoracic shield.',
    spanish: 'La larva es de color verde pálido con cabeza marrón y escudo protorácico.',
    portugese: 'A larva é verde pálida com cabeça marrom e escudo protorácico.',
  },
  {
    english: 'Adult is brownish moth with wavy lines on forewings.Initially caterpillars feed on leaf surface gregariously by scrapping.Later they make web on tender shoots and leaves together and feed within.',
    spanish: 'El adulto es una polilla de color marrón con líneas onduladas en las alas anteriores. Inicialmente, las orugas se alimentan de la superficie de la hoja de forma gregaria mediante el desguace.',
    portugese: 'O adulto é uma mariposa acastanhada com linhas onduladas nas asas anteriores. Inicialmente, as lagartas alimentam-se da superfície das folhas de forma gregária, raspando-as.',
  },
  {
    english: 'Several caterpillars may be found in a single webbed up cluster of leaves.',
    spanish: 'Se pueden encontrar varias orugas en un solo grupo de hojas palmeadas.',
    portugese: 'Várias lagartas podem ser encontradas em um único aglomerado de folhas com teias.',
  },
  {
    english: 'Nymphs suck cell sap from adjacent buds.',
    spanish: 'Las ninfas chupan la savia celular de los brotes adyacentes.',
    portugese: 'As ninfas sugam a seiva das gemas adjacentes.',
  },
  {
    english: 'As a result of feeding, buds develop into hard conical green galls',
    spanish: 'Como resultado de la alimentación, los brotes se convierten en agallas verdes cónicas duras',
    portugese: 'Como resultado da alimentação, os botões se desenvolvem em galhas verdes cônicas duras',
  },
  {
    english: 'Consequently, there is no flowering and fruit setting. Nymphs over winter inside the galls.',
    spanish: 'En consecuencia, no hay floración ni cuajado. Ninfas durante el invierno dentro de las agallas.',
    portugese: 'Consequentemente, não há floração e frutificação. Ninfas durante o inverno dentro das galhas.',
  },
  {
    english: 'Large infestations (3 or more maggots per plant) may cause wilting.',
    spanish: 'Grandes infestaciones (3 o más gusanos por planta) pueden causar marchitez.',
    portugese: 'Grandes infestações (3 ou mais larvas por planta) podem causar murcha.',
  },
  {
    english: 'The young larvae feed on the chlorophyll of young leaves and skeletonize them.',
    spanish: 'Las larvas jóvenes se alimentan de la clorofila de las hojas jóvenes y las esqueletizan.',
    portugese: 'As larvas jovens se alimentam da clorofila das folhas jovens e as esqueletizam.',
  },
  {
    english: 'Light pale brownish yellow stout moth.',
    spanish: 'Polilla robusta de color amarillo pardusco pálido claro.',
    portugese: 'Traça robusta amarelo-acastanhada clara.',
  },
  {
    english: 'Forewings are olive green to pale brown with a dark brown circular spot in the center.',
    spanish: 'Las alas delanteras son de color verde oliva a marrón pálido con una mancha circular de color marrón oscuro en el centro.',
    portugese: 'As asas anteriores são verde-oliva a marrom claro com uma mancha circular marrom-escura no centro.',
  },
  {
    english: 'Due to attack by the insect, the leaves turn yellow and become curled.',
    spanish: 'Debido al ataque del insecto, las hojas se vuelven amarillas y se rizan.',
    portugese: 'Devido ao ataque do inseto, as folhas ficam amareladas e enroladas.',
  },
  {
    english: 'Chlorotic spots and sooty molds develop on the affected tissues.',
    spanish: 'Se desarrollan manchas cloróticas y fumagina en los tejidos afectados.',
    portugese: 'Manchas cloróticas e fuligem se desenvolvem nos tecidos afetados.',
  },
  {
    english: 'Scrapping of leaves, pinholes, or small to medium elongated holes.',
    spanish: 'Desguace de hojas, agujeros de alfiler o agujeros alargados de pequeños a medianos.',
    portugese: 'Raspagem de folhas, orifícios ou orifícios alongados de pequeno a médio.',
  },
  {
    english: 'Singular or closely grouped circular to irregularly shaped holes in foliage.',
    spanish: 'Agujeros singulares o estrechamente agrupados de forma circular a irregular en el follaje.',
    portugese: 'Orifícios circulares a de forma irregular, singulares ou agrupados de perto, na folhagem.',
  },
  {
    english: 'Can cause serious damage to soybean at all stages.',
    spanish: 'Puede causar daños graves a la soja en todas las etapas.',
    portugese: 'Pode causar sérios danos à soja em todas as fases.',
  },
  {
    english: 'Leaves look brownish-yellow in color.',
    spanish: 'Las hojas se ven de color amarillo parduzco.',
    portugese: 'As folhas parecem amarelo-acastanhadas.',
  },
  {
    english: 'The final instar larvae feed on the leaves from the margin.',
    spanish: 'Las larvas del estadio final se alimentan de las hojas del margen.',
    portugese: 'As larvas do instar final se alimentam das folhas da margem.',
  },
  {
    english: 'The damaged leaves of the plant appear in a skeletonized/net/web form.',
    spanish: 'Las hojas dañadas de la planta aparecen en forma de esqueleto/red/telaraña.',
    portugese: 'As folhas danificadas da planta aparecem em uma forma esqueletizada/rede/teia.',
  },
  {
    english: 'It attacks the leaves, flowers, stalks of panicle and fruits, causing superficial white powdery appearance on it',
    spanish: 'Ataca a las hojas, flores, tallos de la panoja y frutos, provocando sobre ella un aspecto pulverulento blanco superficial',
    portugese: 'Ataca as folhas, flores, talos de panículas e frutos, causando sobre eles aspecto pulverulento branco superficial',
  },
  {
    english: 'The disease spread by wind very rapidly. Generally the infection starts from the inflorescence and spreads downwards covering the floral axis, tender leaves and soft stem.',
    spanish: 'La enfermedad se propagó por el viento muy rápidamente. Generalmente la infección comienza desde la inflorescencia y se extiende hacia abajo cubriendo el eje floral, las hojas tiernas y el tallo blando.',
    portugese: 'A doença se espalhou pelo vento muito rapidamente. Geralmente a infecção começa a partir da inflorescência e se espalha para baixo cobrindo o eixo floral, folhas tenras e caule mole.',
  },
  {
    english: 'Flowers fail to open, blacken or become brown, dry and may fall from panicles',
    spanish: 'Las flores no se abren, se ennegrecen o se vuelven marrones, se secan y pueden caerse de las panículas',
    portugese: 'As flores não abrem, escurecem ou ficam marrons, secas e podem cair das panículas',
  },
  {
    english: 'On leaves, lesions start as small, angular, brown to black spots that can enlarge to form extensive dead areas.',
    spanish: 'En las hojas, las lesiones comienzan como manchas pequeñas, angulosas, de color marrón a negro, que pueden agrandarse para formar extensas áreas muertas.',
    portugese: 'Nas folhas, as lesões começam como manchas pequenas, angulares, marrons a pretas, que podem aumentar para formar extensas áreas mortas.',
  },
  {
    english: 'The first symptoms on panicles are small black or dark-brown spots, which can enlarge coalesce and kill the flowers before fruits are produced. Petioles, twigs, and stems are also susceptible and develop into typical black colour.',
    spanish: 'Los primeros síntomas en las panículas son pequeñas manchas negras o de color marrón oscuro, que pueden agrandarse, fusionarse y matar las flores antes de que se produzcan los frutos. Los pecíolos, las ramitas y los tallos también son susceptibles y adquieren el típico color negro.',
    portugese: 'Os primeiros sintomas nas panículas são pequenas manchas pretas ou marrom-escuras, que podem aumentar, coalescer e matar as flores antes que os frutos sejam produzidos. Pecíolos, galhos e caules também são suscetíveis e desenvolvem a cor preta típica.',
  },
  {
    english: 'Twig dieback occurs when severe, elongated, blackened lesions form on stems and twigs die back apically.',
    spanish: 'La muerte regresiva de las ramitas ocurre cuando se forman lesiones severas, alargadas y ennegrecidas en los tallos y las ramitas mueren apicalmente.',
    portugese: 'A morte dos galhos ocorre quando lesões severas, alongadas e enegrecidas se formam nos caules e os galhos morrem apicalmente.',
  },
  {
    english: 'Vegetative Malformation: It is more commonly found on young seedlings. It is characterized by disrupting of apical growth resulting in several small flushes..',
    spanish: 'Malformación vegetativa: se encuentra más comúnmente en plántulas jóvenes. Se caracteriza por la interrupción del crecimiento apical que resulta en varios rubores pequeños.',
    portugese: 'Malformação Vegetativa: É mais comumente encontrada em mudas jovens. É caracterizada pela interrupção do crescimento apical, resultando em vários pequenos fluxos.',
  },
  {
    english: 'The multi-branching of shoot apex with scaly leaves is known as “Bunchy Top” or “Witches’ Broom”. The malformed seedlings, remain stunted and die.',
    spanish: 'La ramificación múltiple del ápice de los brotes con hojas escamosas se conoce como "Bunchy Top" o "Witches’ Broom". Las plántulas malformadas, permanecen atrofiadas y mueren.',
    portugese: 'A multi-ramificação do ápice caulinar com folhas escamosas é conhecida como “Bunchy Top” ou “Witches’ Broom”. As mudas malformadas permanecem atrofiadas e morrem.',
  },
  {
    english: 'Floral Malformation: In malformation of inflorescens, shows variation in the panicle. Malformed head dries up in black mass and persist for long time',
    spanish: 'Malformación Floral: En malformación de inflorescencias, presenta variación en la panícula. La cabeza malformada se seca en una masa negra y persiste durante mucho tiempo',
    portugese: 'Malformação floral: Na malformação das inflorescentes, apresenta variação na panícula. Cabeça malformada seca em massa negra e persiste por muito tempo',
  },
  {
    english: 'The disease is noticed on leaves, leaf stalks, stems, twigs, branches and fruits, initially producing water-soaked lesions, later turning into typical canker.',
    spanish: 'La enfermedad se nota en hojas, tallos, tallos, ramitas, ramas y frutos, produciendo inicialmente lesiones acuosas, transformándose luego en la típica cancrosis.',
    portugese: 'A doença é observada em folhas, talos de folhas, caules, galhos, galhos e frutos, produzindo inicialmente lesões encharcadas de água, evoluindo posteriormente para o cancro típico.',
  },
  {
    english: 'Water-soaked irregular satellites to angular raised lesions measuring 1-4 mm in diameter are formed. These lesions are light yellow in colour, initially with yellow halo but with age enlarge or coalesce to form irregular necrotic cankerous patches with dark brown colour.',
    spanish: 'Se forman satélites irregulares empapados de agua a lesiones angulares elevadas que miden 1-4 mm de diámetro. Estas lesiones son de color amarillo claro, inicialmente con un halo amarillo, pero con la edad aumentan de tamaño o se unen para formar parches cancrosos irregulares necróticos de color marrón oscuro.',
    portugese: 'Satélites irregulares encharcados de água para lesões angulares elevadas medindo 1-4 mm de diâmetro são formados. Essas lesões são de cor amarelo claro, inicialmente com halo amarelo, mas com a idade aumentam ou coalescem para formar manchas cancerosas necróticas irregulares com cor marrom escura.',
  },
  {
    english: 'Water-soaked, dark brown to black-coloured lesions are observed which gradually developed into cankerous, raised or flat spots. These spots often, burst extruding gummy substances containing highly contagious bacterial cells',
    spanish: 'Se observan lesiones acuosas, de color marrón oscuro a negro, que gradualmente se convirtieron en manchas cancrosas, elevadas o planas. Estas manchas a menudo revientan y expulsan sustancias gomosas que contienen células bacterianas altamente contagiosas',
    portugese: 'Observam-se lesões encharcadas, marrom-escuras a pretas, que gradualmente se desenvolvem em manchas cancerosas, elevadas ou planas. Essas manchas geralmente estouram expelindo substâncias gomosas contendo células bacterianas altamente contagiosas',
  },
  {
    english: 'The pathogen causing dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle etc.',
    spanish: 'El patógeno que causa la muerte regresiva, la muerte regresiva de las puntas, el tizón de la unión del injerto, el tizón de las ramitas, la pudrición de las plántulas, la mancha de la madera, la pudrición del extremo del tallo, la pudrición negra de la raíz, la pudrición de la fruta, la pudrición seca, la pudrición marrón de la panícula, etc.',
    portugese: 'O patógeno que causa morte, morte das pontas, ferrugem da união do enxerto, ferrugem dos galhos, podridão das mudas, mancha de madeira, podridão da extremidade do caule, podridão negra da raiz, podridão da fruta, podridão seca, podridão marrom da panícula etc.',
  },
  {
    english: 'It is characterized by drying back of twigs from top to downwards, particularly in older trees followed by drying of leaves which gives an appearance of fire scorch.',
    spanish: 'Se caracteriza por el secado hacia atrás de las ramitas de arriba hacia abajo, particularmente en los árboles más viejos, seguido por el secado de las hojas, lo que da una apariencia de quemadura por fuego.',
    portugese: 'Caracteriza-se pelo ressecamento dos galhos de cima para baixo, principalmente nas árvores mais velhas, seguido pelo ressecamento das folhas que dá uma aparência de queimadura de fogo.',
  },
  {
    english: 'Internal browning in wood tissue is observed when it is slit open along with the long axis.',
    spanish: 'El pardeamiento interno en el tejido de la madera se observa cuando se abre a lo largo del eje largo.',
    portugese: 'O escurecimento interno no tecido da madeira é observado quando é aberto ao longo do eixo longo.',
  },
  {
    english: 'Symptoms of the disease are noticeable only on old leaves',
    spanish: 'Los síntomas de la enfermedad solo se notan en las hojas viejas',
    portugese: 'Os sintomas da doença são perceptíveis apenas nas folhas velhas',
  },
  {
    english: 'Initially, the lesions are angular, minute, irregular, yellow to light brown, scattered over leaf lamina.',
    spanish: 'Inicialmente, las lesiones son angulares, diminutas, irregulares, de color amarillo a marrón claro, esparcidas sobre la lámina de la hoja.',
    portugese: 'Inicialmente, as lesões são angulosas, diminutas, irregulares, amarelas a marrom-claras, espalhadas pela lâmina foliar.',
  },
  {
    english: 'As the lesions enlarge their colour changes from brown to cinnamon and they become almost irregular.',
    spanish: 'A medida que las lesiones aumentan de tamaño, su color cambia de marrón a canela y se vuelven casi irregulares.',
    portugese: 'À medida que as lesões aumentam, sua cor muda de marrom para canela e elas se tornam quase irregulares.',
  },
  {
    english: 'Symptoms become visible when the mango fruits attain marbel size',
    spanish: 'Los síntomas se vuelven visibles cuando los frutos de mango alcanzan el tamaño de mármol.',
    portugese: 'Os sintomas tornam-se visíveis quando os frutos da manga atingem o tamanho de marbel',
  },
  {
    english: 'Small etiolated area develops near the distal end of the fruit which gradually spreads, turns nearly black and covers the tip of the fruit completely',
    spanish: 'Se desarrolla una pequeña área etiolada cerca del extremo distal de la fruta que se extiende gradualmente, se vuelve casi negra y cubre completamente la punta de la fruta',
    portugese: 'Pequena área estiolada se desenvolve perto da extremidade distal do fruto que gradualmente se espalha, torna-se quase preta e cobre completamente a ponta do fruto',
  },
  {
    english: 'The black area remains hard and the growth of the fruit is checked.',
    spanish: 'La zona negra permanece dura y se frena el crecimiento del fruto.',
    portugese: 'A área preta permanece dura e o crescimento da fruta é controlado.',
  },
  {
    english: 'Hoppers shelter in the cracks and crevices of the bark or underside of the leaves of the trees during the off season.',
    spanish: 'Los saltamontes se refugian en las grietas y hendiduras de la corteza o en la parte inferior de las hojas de los árboles durante la temporada baja.',
    portugese: 'As cigarrinhas se abrigam nas rachaduras e fendas da casca ou na parte inferior das folhas das árvores durante a entressafra.',
  },
  {
    english: 'Nymphs and adults suck plant sap and secrete honeydew that develops sooty mold.',
    spanish: 'Las ninfas y los adultos chupan la savia de la planta y secretan melaza que desarrolla fumagina.',
    portugese: 'As ninfas e os adultos sugam a seiva das plantas e secretam melada que desenvolve o mofo fuliginoso.',
  },
  {
    english: 'Grubs tunnel in the sapwood on the trunk or branches, making irregular tunnels.',
    spanish: 'Las larvas hacen túneles en la albura del tronco o las ramas, formando túneles irregulares.',
    portugese: 'As larvas fazem túneis no alburno do tronco ou galhos, fazendo túneis irregulares.',
  },
  {
    english: 'Caterpillars bore into the trunk or junction of branches, making zigzag galleries. Presence of galleries made out of silk and frass is the key symptom.',
    spanish: 'Las orugas perforan el tronco o la unión de las ramas, formando galerías en zigzag. La presencia de galerías hechas de seda y excrementos es el síntoma clave.',
    portugese: 'As lagartas perfuram o tronco ou junção de galhos, formando galerias em zigue-zague. A presença de galerias feitas de seda e excremento é o principal sintoma.',
  },
  {
    english: 'Caterpillars remain hidden in the tunnel during the daytime, come out at night, and feed on the bark.',
    spanish: 'Las orugas permanecen escondidas en el túnel durante el día, salen por la noche y se alimentan de la corteza.',
    portugese: 'As lagartas permanecem escondidas no túnel durante o dia, saem à noite e se alimentam da casca.',
  },
  {
    english: 'Due to infestation, the flow of sap is hindered, plant growth is arrested, and fruit formation is drastically reduced.',
    spanish: 'Debido a la infestación, el flujo de savia se ve obstaculizado, el crecimiento de las plantas se detiene y la formación de frutos se reduce drásticamente.',
    portugese: 'Devido à infestação, o fluxo de seiva é prejudicado, o crescimento da planta é interrompido e a formação de frutos é drasticamente reduzida.',
  },
  {
    english: 'The female punctures fruits with its pointed ovipositor and inserts eggs inside.',
    spanish: 'La hembra perfora los frutos con su puntiagudo ovipositor e inserta los huevos en su interior.',
    portugese: 'A fêmea perfura os frutos com seu ovipositor pontiagudo e insere os ovos dentro.',
  },
  {
    english: 'Infested fruits exhibit puncture marks and oozing.',
    spanish: 'Las frutas infestadas exhiben marcas de pinchazos y supuración.',
    portugese: 'Frutos infestados exibem marcas de punção e exsudação.',
  },
  {
    english: 'It attacks floral buds, tender fruits, and tender leaves.',
    spanish: 'Ataca botones florales, frutos tiernos y hojas tiernas.',
    portugese: 'Ataca botões florais, frutos tenros e folhas tenras.',
  },
  {
    english: 'The infested mango buds, shoots, and young fruits develop many small blister galls, each containing a yellow maggot.',
    spanish: 'Los capullos, brotes y frutos jóvenes del mango infestado desarrollan muchas ampollas pequeñas, cada una de las cuales contiene un gusano amarillo.',
    portugese: 'Os brotos, brotos e frutos jovens da manga infestados desenvolvem muitas vesículas pequenas, cada uma contendo uma larva amarela.',
  },
  {
    english: 'Grubs start feeding below the bark of branches, making tunnels, and subsequently bore into the main stem.',
    spanish: 'Los gusanos comienzan a alimentarse debajo de la corteza de las ramas, haciendo túneles y posteriormente perforando el tallo principal.',
    portugese: 'As larvas começam a se alimentar abaixo da casca dos galhos, fazendo túneis e, posteriormente, perfurando o caule principal.',
  },
  {
    english: 'Frass coming out of the entry point indicates the presence of the trunk borer.',
    spanish: 'Los excrementos que salen del punto de entrada indican la presencia del barrenador del tronco.',
    portugese: 'O excremento saindo do ponto de entrada indica a presença da broca do tronco.',
  },
  {
    english: 'Damage results in yellowing of leaves, followed by drying of terminal shoots and branches, leading to the death of the whole tree.',
    spanish: 'El daño da como resultado el amarillamiento de las hojas, seguido por el secado de los brotes terminales y las ramas, lo que lleva a la muerte de todo el árbol.',
    portugese: 'Os danos resultam no amarelecimento das folhas, seguido pela secagem dos brotos e galhos terminais, levando à morte de toda a árvore.',
  },
  {
    english: 'Grubs make zigzag tunnels in pulp, eat unripe tissue, and bore into cotyledon.',
    spanish: 'Los gusanos hacen túneles en zigzag en la pulpa, comen tejido inmaduro y perforan el cotiledón.',
    portugese: 'As larvas fazem túneis em zigue-zague na polpa, comem tecido verde e perfuram o cotilédone.',
  },
  {
    english: 'Fruit dropping at the marble stage.',
    spanish: 'Caída de frutas en el escenario de mármol.',
    portugese: 'Frutos caindo no estágio de mármore.',
  },
  {
    english: 'Oviposition injuries on marble-sized fruits.',
    spanish: 'Lesiones por oviposición en frutos del tamaño de una canica.',
    portugese: 'Lesões de oviposição em frutos do tamanho de mármore.',
  },
  {
    english: 'As a result of feeding, buds develop into hard conical green galls.',
    spanish: 'Como resultado de la alimentación, los brotes se convierten en agallas verdes cónicas duras.',
    portugese: 'Como resultado da alimentação, os botões se desenvolvem em galhas verdes cônicas duras.',
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
        await queryInterface.bulkUpdate('global_translation_metadata', translation, {
          id: { [Sequelize.Op.in]: existingTranslations.map((translation) => translation.id) },
        });
      } else {
        await queryInterface.insert(null, 'global_translation_metadata', translation);
      }
    }
  },

  async down(queryInterface, Sequelize) {},
};
