'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const translations = [
      {
        "english": "Pyrilla",
        "french": "Avec"
      },
      {
        "english": "Wooly aphid",
        "french": "Puceron laineux"
      },
      {
        "english": "White Grub",
        "french": "Bouche"
      },
      {
        "english": "Internode borer",
        "french": "Foreur"
      },
      {
        "english": "Early shoot borer",
        "french": "Ferme de prise de vue précoce"
      },
      {
        "english": "Stem fly",
        "french": "Mouche"
      },
      {
        "english": "Pod Borer",
        "french": "Foreur"
      },
      {
        "english": "White fly",
        "french": "Mouche blanche"
      },
      {
        "english": "Armyworm",
        "french": "Ver de l'armée"
      },
      {
        "english": "Coffee berry borer",
        "french": "Baies de café"
      },
      {
        "english": "Coffee White stem borer",
        "french": "Café Bore Borers"
      },
      {
        "english": "Coffee Shot hole borer",
        "french": "Force de trou de café"
      },
      {
        "english": "Coffee Red borer",
        "french": "Café Borers"
      },
      {
        "english": "Start date",
        "french": "Date de début"
      },
      {
        "english": "End date",
        "french": "Date de fin"
      },
      {
        "english": "Your date of irrigation",
        "french": "Votre date d'irrigation"
      },
      {
        "english": "Your water volume",
        "french": "Votre volume d'eau"
      },
      {
        "english": "agriculture lime",
        "french": "chaux agricole"
      },
      {
        "english": "dolomite",
        "french": "dolomie"
      },
      {
        "english": "Sandy loam soil",
        "french": "Terre de limonique sableux"
      },
      {
        "english": "Clay loam soil",
        "french": "Terre de limonique en argile"
      },
      {
        "english": "Silt loam soil",
        "french": "Terre de limon"
      },
      {
        "english": "Manure",
        "french": "Fumier"
      },
      {
        "english": "dolomite",
        "french": "dolomie"
      },
      {
        "english": "Mango (Brazil)",
        "french": "Mangue (Brésil)"
      },
      {
        "english": "Hydraulic nozzles/sprayers",
        "french": "Builles / pulvérisateurs hydrauliques"
      },
      {
        "english": "Electrostatically charged sprayers",
        "french": "Pulvérisateurs chargés par électrostatiquement"
      },
      {
        "english": "Aerial spraying",
        "french": "Pulvérisation aérienne"
      },
      {
        "english": "Fumigation",
        "french": "Fumigation"
      },
      {
        "english": "Cultural/Natural",
        "french": "Culturel / naturel"
      },
      {
        "english": "none",
        "french": "aucune"
      },
      {
        "english": "Deep ploughing",
        "french": "Labour profond"
      },
      {
        "english": "Natural enemies/parasitism",
        "french": "Ennemis / parasitisme naturels"
      },
      {
        "english": "Push and pull",
        "french": "Pousser et tirer"
      },
      {
        "english": "Ash and chilli",
        "french": "Cendre et piment"
      },
      {
        "english": "Plant extracts",
        "french": "Extraits de plantes"
      },
      {
        "english": "Use of mesh",
        "french": "Utilisation du maillage"
      },
      {
        "english": "Uprooting of infested plants by hand",
        "french": "Déraciner les plantes infestées à la main"
      },
      {
        "english": "Traps and bagging",
        "french": "Pièges et sacs"
      },
      {
        "english": "Bio pesticides",
        "french": "Pesticides bio"
      },
      {
        "english": "Bio fumigation",
        "french": "Fumigation bio"
      },
      {
        "english": "Scarecrows",
        "french": "Épouvantail"
      },
      {
        "english": "Tillage",
        "french": "Labour"
      },
      {
        "english": "Pruning",
        "french": "Taille"
      },
      {
        "english": "Hand picking of pests",
        "french": "Cueillette à la main des ravageurs"
      },
      {
        "english": "Leaves",
        "french": "Feuilles"
      },
      {
        "english": "Stem",
        "french": "Tige"
      },
      {
        "english": "Grain",
        "french": "Graine"
      },
      {
        "english": "Tuber",
        "french": "Tubercule"
      },
      {
        "english": "Bulb",
        "french": "Ampoule"
      },
      {
        "english": "Fruit",
        "french": "Fruit"
      },
      {
        "english": "Roots",
        "french": "Racines"
      },
      {
        "english": "Flowers",
        "french": "Fleurs"
      },
      {
        "english": "Cultural/Mechanical/Biological",
        "french": "Culturel / mécanique / biologique"
      },
      {
        "english": "Remove diseased plant",
        "french": "Retirer la plante malade"
      },
      {
        "english": "Mulching",
        "french": "Paillage"
      },
      {
        "english": "Crop rotation",
        "french": "Rotation des cultures"
      },
      {
        "english": "Planting resistant cultivars",
        "french": "Plantation de cultivars résistants"
      },
      {
        "english": "Use of oils and soaps",
        "french": "Utilisation d'huiles et de savons"
      },
      {
        "english": "Use of bio fumigants",
        "french": "Utilisation de fumigants bio"
      },
      {
        "english": "Others",
        "french": "Autres"
      },
      {
        "english": "Inflorescence  stage",
        "french": "Étape d'inflorescence"
      },
      {
        "english": "Ripening  stage",
        "french": "Étape de maturation"
      },
      {
        "english": "Ammonium phosphate sulphate(20-20-0)",
        "french": "Sulfate de phosphate d'ammonium (20-20-0)"
      },
      {
        "english": "Ammonium sulphate(20-0-0)",
        "french": "Sulfate d'ammonium (20-0-0)"
      },
      {
        "english": "Borax",
        "french": "Borax"
      },
      {
        "english": "Calcium ammonium nitrate(20-0-0)",
        "french": "Nitrate de calcium ammonium (20-0-0)"
      },
      {
        "english": "Chelated iron",
        "french": "Fer chélé"
      },
      {
        "english": "Chelated Zinc",
        "french": "Zinc chélé"
      },
      {
        "english": "Manganese sulphate",
        "french": "Sulfate de manganèse"
      },
      {
        "english": "NPK (10-26-26)",
        "french": "NPK (10-26-26)"
      },
      {
        "english": "NPK(12-32-16)",
        "french": "NPK (12-32-16)"
      },
      {
        "english": "NPK (20-20-10)",
        "french": "NPK (20-20-10)"
      },
      {
        "english": "Potassium chloride (0-0-60)",
        "french": "Chlorure de potassium (0-0-60)"
      },
      {
        "english": "SSP",
        "french": "SSP"
      },
      {
        "english": "TSP",
        "french": "Cuillère à café"
      },
      {
        "english": "Urea ammonium phosphate(28-28-0)",
        "french": "Phosphate d'urée ammonium (28-28-0)"
      },
      {
        "english": "DAP(18-46-0)",
        "french": "DAP (18-46-0)"
      },
      {
        "english": "Ferrous sulphate",
        "french": "Sulfate ferreux"
      },
      {
        "english": "Neem coated urea",
        "french": "Urée enrobée de neem"
      },
      {
        "english": "NPK(15-15-15)",
        "french": "NPK (15-15-15)"
      },
      {
        "english": "NPK (19-19-19)(water soluble)",
        "french": "NPK (19-19-19) (eau soluble)"
      },
      {
        "english": "Potassium nitrate(13-0-45)(water soluble)",
        "french": "Nitrate de potassium (13-0-45) (soluble dans l'eau)"
      },
      {
        "english": "Sulphur",
        "french": "Soufre"
      },
      {
        "english": "Zincated urea",
        "french": "Urée zincée"
      },
      {
        "english": "Nano urea",
        "french": "Nano ure"
      },
      {
        "english": "NPK mixed fertilizer with boron(10-20-10:0.3)",
        "french": "Engrais mixte NPK avec bore (10-20-10: 0,3)"
      },
      {
        "english": "Mixed fertilizer fortified with Zinc(20-20-0:1.0)",
        "french": "Engrais mixte fortifié avec du zinc (20-20-0: 1.0)"
      },
      {
        "english": "Hairy catterpiller",
        "french": "Chat celle poilue"
      },
      {
        "english": "Soybean",
        "french": "Soja"
      },
      {
        "english": "Infected stems are often red inside (sometimes pale) and a distinct zig-zag tunnel may be observed – with maggots or pupae inside.",
        "french": "Les tiges infectées sont souvent rouges à l'intérieur (parfois pâles) et un tunnel zig-zag distinct peut être observé - avec des asticots ou des pupes à l'intérieur."
      },
      {
        "english": "May even cause plant death, especially in younger plants particularly if damage occurs in the plant’s hypocotyl (basal stem) region.",
        "french": "Peut même provoquer la mort des plantes, en particulier dans les plantes plus jeunes, en particulier si des dommages se produisent dans la région hypocotyle de la plante (tige basale)."
      },
      {
        "english": "Large infestations (3 or more maggots per plant) may cause wilting",
        "french": "De grandes infestations (3 asticots ou plus par plante) peuvent provoquer un flétrissement"
      },
      {
        "english": "The young larvae feeds on the chlorophyll of young leaves and skeletonize it",
        "french": "Les jeunes larves se nourrissent de la chlorophylle des jeunes feuilles et la squelette"
      },
      {
        "english": "Light pale brownish yellow stout moth",
        "french": "Moth stout jaune brunâtre pâle clair"
      },
      {
        "english": "Forewings are olive green to pale brown with a dark brown circular spot in the centre",
        "french": "Les anotes sont le vert olive à brun pâle avec une tache circulaire brun foncé au centre"
      },
      {
        "english": "Due to attack of the insect the leaves turn yellow and become curled",
        "french": "En raison de l'attaque de l'insecte, les feuilles deviennent jaunes et deviennent bouclées"
      },
      {
        "english": "Chlorotic spots and sooty molds develop on the affected tissues",
        "french": "Les taches chlorotiques et les moules suieux se développent sur les tissus affectés"
      },
      {
        "english": "During heavy infections, these spots may come together and spread over the whole leaf, apart from the area around the veins.",
        "french": "Pendant les infections lourdes, ces taches peuvent se réunir et se propager sur toute la feuille, à l'exception de la zone autour des veines."
      },
      {
        "english": "Scrapping of leaves, pin holes or small to medium elongated holes",
        "french": "Démontage des feuilles, des trous d'épingle ou des trous allongés petits à moyens"
      },
      {
        "english": "Singular, or closely grouped circular to irregularly shaped holes in foliage",
        "french": "Circulaires singulières ou étroitement groupés à des trous de forme irrégulière dans le feuillage"
      },
      {
        "english": "Can cause serious damage to maize at all stages",
        "french": "Peut causer de graves dommages au maïs à toutes les étapes"
      },
      {
        "english": "Leaves look like brownish-yellow in colour.",
        "french": "Les feuilles ressemblent à une couleur brunâtre-jaune."
      },
      {
        "english": "The final instar larvae feed on the leaves from the margin",
        "french": "Les larves finales finales se nourrissent des feuilles de la marge"
      },
      {
        "english": "The damaged leaves of the plant appear in skeletonised/ net/ web form",
        "french": "Les feuilles endommagées de la plante apparaissent sous forme squelette / nette / web"
      },
      {
        "english": "Tan or reddish-brown lesions (spots) develop first on the underside of leaves",
        "french": "Les lésions bruns bronzées ou rougeâtre (taches) se développent en premier sur le dessous des feuilles"
      },
      {
        "english": "Symptoms begin on leaves in the lower plant canopy",
        "french": "Les symptômes commencent sur les feuilles de la canopée de la plante inférieure"
      },
      {
        "english": "Small pustules (blisters) develop in the lesions, which break open and release masses of tan spores",
        "french": "Les petites pustules (cloques) se développent dans les lésions, qui s'ouvrent et libèrent des masses de spores bronzées"
      },
      {
        "english": "Mottling appears as light and dark green patches on individual leaves",
        "french": "Les marbrages apparaissent sous forme de plaques claires et vert foncé sur les feuilles individuelles"
      },
      {
        "english": "Symptoms are most obvious on young, rapidly growing leaves",
        "french": "Les symptômes sont les plus évidents sur les jeunes feuilles en croissance rapide"
      },
      {
        "english": "The disease is characterized by light and day green mottling on the leaves often accompanied by wilting of young leaves in sunny days when plants first become infected.",
        "french": "La maladie est caractérisée par des marbrures vertes légères et jour sur les feuilles souvent accompagnées de flétrissement des jeunes feuilles dans les jours ensoleillés lorsque les plantes sont infectées pour la première fois."
      },
      {
        "english": "Symptoms usually begin in the upper canopy because young leaves are most susceptible",
        "french": "Les symptômes commencent généralement dans la canopée supérieure car les jeunes feuilles sont les plus sensibles"
      },
      {
        "english": "Small, angular, reddish-brown lesions are surrounded by a yellow halo.",
        "french": "Les petites lésions angulaires et brun rougeâtre sont entourées d'un halo jaune."
      },
      {
        "english": "As the disease progresses, lesions often grow together to produce large, irregularly shaped dead areas",
        "french": "À mesure que la maladie progresse, les lésions se développent souvent ensemble pour produire de grandes zones mortes de forme irrégulière"
      },
      {
        "english": "Foliar symptoms can be similar to those of sudden death syndrome and stem canker and appear after early pod set",
        "french": "Les symptômes foliaires peuvent être similaires à ceux du syndrome de mort subite et du chancre de la tige et apparaissent après un jeu de nappe"
      },
      {
        "english": "Stem symptoms usually occur prior to leaf symptoms",
        "french": "Les symptômes de la STEM se produisent généralement avant les symptômes des feuilles"
      },
      {
        "english": "Can occur even if foliar symptoms never appear",
        "french": "Peut se produire même si les symptômes foliaires n'apparaissent jamais"
      },
      {
        "english": "Coffee berry borer is the most serious pest of coffee worldwide.",
        "french": "Berry Berry Borers est le ravageur le plus grave du monde dans le monde."
      },
      {
        "english": "The female beetle bores into the berries through the navel region and makes tunnels in the hard bean, laying about 15 eggs.",
        "french": "Le scarabée femelle se déroule dans les baies à travers la région du nombril et fait des tunnels dans le haricot dur, pondant environ 15 œufs."
      },
      {
        "english": "The larvae feed on the beans, making small tunnels. A typical pinhole at the tip of the berries indicates the presence of the pest, which damages young as well as ripe berries. In severe infestation, 30 to 80% of berries may be affected, resulting in heavy crop loss.",
        "french": "Les larves se nourrissent des haricots, faisant de petits tunnels. Un trou d'épingle typique à la pointe des baies indique la présence du ravageur, qui endommage les jeunes et les baies mûres. Dans une infestation sévère, 30 à 80% des baies peuvent être affectées, entraînant une forte perte de cultures."
      },
      {
        "english": "Serious pest of Arabica coffee.",
        "french": "Pest sérieux du café Arabica."
      },
      {
        "english": "Infested plants show external ridges around the stem.",
        "french": "Les plantes infestées montrent des crêtes externes autour de la tige."
      },
      {
        "english": "Affected plants also show yellowing and wilting of leaves.",
        "french": "Les plantes touchées montrent également le jaunissement et le flétrissement des feuilles."
      },
      {
        "english": "Withered (faster in young branches and delayed in older twigs) or dried branches, attacked leaves fall prematurely.",
        "french": "Flétri (plus rapide dans les jeunes branches et retardé dans les rameaux plus âgés) ou les branches séchées, les feuilles attaquées tombent prématurément."
      },
      {
        "english": "Terminal leaves wilt, droop, and dry up.",
        "french": "Les feuilles terminales se flétrissent, traient et séchent."
      },
      {
        "english": "Severe infestation can result in the loss of a considerable number of productive branches.",
        "french": "Une infestation sévère peut entraîner la perte d'un nombre considérable de branches productives."
      },
      {
        "english": "The larva causes damage in Arabica and Robusta coffee by boring into young stems, primary and secondary branches to feed on the wood.",
        "french": "La larve cause des dommages à l'arabica et au café robuste en ennuyant dans les jeunes tiges, les branches primaires et secondaires se nourrissent du bois."
      },
      {
        "english": "In the early stages of attack, young plants or branches show signs of wilting. Infested parts bear one or two holes through which pellet-like excrement of the larva hangs out and accumulates at the base of the plant.",
        "french": "Dans les premiers stades de l'attaque, les jeunes plantes ou branches montrent des signes de flétrissement. Les pièces infestées portent un ou deux trous à travers lesquels des excréments en forme de granulés de la larve traînent et s'accumulent à la base de la plante."
      },
      {
        "english": "In advanced cases, the branch or the whole plant dries up.",
        "french": "Dans les cas avancés, la branche ou la plante entière sèche."
      },
      {
        "english": "Berry Borer",
        "french": "Bercer"
      },
      {
        "english": "White Stem Borer",
        "french": "Foreur de tige blanche"
      },
      {
        "english": "Shot Hole Borer",
        "french": "Force"
      },
      {
        "english": "Red Borer",
        "french": "Foreur"
      },
      {
        "english": "This is an important disease causing economic loss particularly in arabica coffee.",
        "french": "Il s'agit d'une maladie importante provoquant une perte économique, en particulier dans le café Arabica."
      },
      {
        "english": "On the lower surface of the infected leaves, small pale yellowish spots appear early after the first rains in the season.",
        "french": "Sur la surface inférieure des feuilles infectées, de petites taches jaunâtres pâles apparaissent tôt après les premières pluies de la saison."
      },
      {
        "english": "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation.severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
        "french": "Ces taches augmentent rapidement en taille et en nombre, et de nombreux endroits de ce type fusionnent à la gravité, provoquant une défoliation prématurée. La défoliation de la sévère entraîne une débilitation des buissons et entraîne une mauvaise récolte au cours des saisons suivantes."
      },
      {
        "english": "Necrotic spots on the exposed surface of green berries enlarge and cover the major portion.",
        "french": "Les taches nécrotiques sur la surface exposée des baies vertes agrandissent et couvrent la partie majeure."
      },
      {
        "english": "Fruit skin shrivels and sticks fast to the parchment.",
        "french": "La peau de fruits se rétrécit et colle rapidement au parchemin."
      },
      {
        "english": "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2–0.6 inches in diameter) of brown tissue",
        "french": "Les centres des taches deviennent du blanc grisâtre et sont entourés d'un anneau distinct (0,2 à 0,6 pouce de diamètre) de tissu brun"
      },
      {
        "english": "Circular brown spots with light-brown/grey centers, surrounded by a wide dark brown ring and and yellow halos, around 15 mm wide appear on leaves",
        "french": "Des taches brunes circulaires avec des centres brun légers / gris, entourés d'un large anneau brun foncé et de halos jaunes, environ 15 mm de large apparaissent sur les feuilles"
      },
      {
        "english": "The spots mostly occur between the veins and also on the margins. Sometimes spots grow into large blotches, and a leaf bligh occurs.",
        "french": "Les taches se produisent principalement entre les veines et également sur les marges. Parfois, les taches se transforment en grosses taches et un Bligh à feuilles se produit."
      },
      {
        "english": "This usually happens in cooler, wet areas above 600 m altitude. Infections on the berries are generally smaller, around 5 mm wide, but sometimes they cover the whole berry.",
        "french": "Cela se produit généralement dans des zones humides plus froides supérieures à 600 m d'altitude. Les infections sur les baies sont généralement plus petites, d'environ 5 mm de large, mais parfois elles couvrent toute la baie."
      },
      {
        "english": "Monitor for this disease and treat at early stages of development on berries and branches.",
        "french": "Surveillez cette maladie et traitez aux premiers stades du développement sur les baies et les branches."
      },
      {
        "english": "Early symptoms may be leaf yellowing and drop of leaves that are found mid-branch, small \\",
        "french": "Les symptômes précoces peuvent être le jaunissement des feuilles et une goutte de feuilles qui se trouvent à mi-branche, petite \\"
      },
      {
        "english": "Dark browning of lateral or vertical stem(s), vertical tip die-back, and premature berry death.",
        "french": "Browning foncé des tiges latérales ou verticales, la mort de la pointe verticale et la mort des baies prématurées."
      },
      {
        "english": "Berry Blotch",
        "french": "Tache"
      },
      {
        "english": "Anthracnose / Dieback",
        "french": "Anthracnose / dépérissement"
      },
      {
        "english": "Drying of entire crown.",
        "french": "Séchage de la couronne entière."
      },
      {
        "english": "Cause extensive damage to roots and base of shoot.",
        "french": "Causer des dommages importants aux racines et à la base de la pousse."
      },
      {
        "english": "Leaves become yellow.",
        "french": "Les feuilles deviennent jaunes."
      },
      {
        "english": "Covered with black sooty mold.",
        "french": "Recouvert de moisissure de suie noire."
      },
      {
        "english": "Top leaves get dried up and lateral buds germinate.",
        "french": "Les feuilles supérieures sont séchées et les bourgeons latéraux germent."
      },
      {
        "english": "In severe cases, it looks like fiery appearance.",
        "french": "Dans les cas graves, cela ressemble à une apparence ardente."
      },
      {
        "english": "It shows very slow growth of the plant.",
        "french": "Il montre une croissance très lente de la plante."
      },
      {
        "english": "Infested leaves look white with black dots.",
        "french": "Les feuilles infestées ont l'air blanches avec des points noirs."
      },
      {
        "english": "Large number of white-colored nymphs and adults on the undersurface of the leaf.",
        "french": "Grand nombre de nymphes et d'adultes de couleur blanche sur la sous-parole de la feuille."
      },
      {
        "english": "Heavy secretion of honeydew leads to the development of sooty mold.",
        "french": "Une forte sécrétion de miellat conduit au développement de moisissures de suie."
      },
      {
        "english": "Leaves become brittle and dry completely.",
        "french": "Les feuilles deviennent cassantes et sèchent complètement."
      },
      {
        "english": "Internodes constricted and shortened, with a number of boreholes.",
        "french": "Internaux restreintes et raccourcies, avec un certain nombre de forages."
      },
      {
        "english": "Boreholes are plugged with fresh excreta in the nodal region.",
        "french": "Les forages sont branchés avec des excréments frais dans la région nodale."
      },
      {
        "english": "Frass materials are present on the affected portion.",
        "french": "Des matériaux de précurseur sont présents sur la partie affectée."
      },
      {
        "english": "Stalks become discoloured and hollow.",
        "french": "Les tiges deviennent décolorées et creuses."
      },
      {
        "english": "Internal tissues are reddened with intermingled transverse white spots",
        "french": "Les tissus internes sont rougis de taches blanches transversales entremêlées"
      },
      {
        "english": "A sour smell emanates.",
        "french": "Une odeur aigre émane."
      },
      {
        "english": "Whip like structure of 25 – 150 cm.Whip covered by translucent silvery membrane enclosing mass of black powdery spores.",
        "french": "Whip comme une structure de 25 à 150 cm recouverte d'une membrane argentée translucide enferment de la masse de spores poudreuses noires."
      },
      {
        "english": "Initial thin canes with elongated internodes later become reduced in length.",
        "french": "Les cannes minces initiales avec des entre-nœuds allongés deviennent plus tard de la longueur."
      },
      {
        "english": "Profuse sprouting of lateral buds with narrow, erect leaves especially in ratoon crop",
        "french": "Germination abondante des bourgeons latéraux avec des feuilles étroites et dressées surtout dans la culture du raton"
      },
      {
        "english": "Rusty appearance on leaves",
        "french": "Apparence rouillée sur les feuilles"
      },
      {
        "english": "Premature death of the leaf.",
        "french": "Mort prématurée de la feuille."
      },
      {
        "english": "These spots are turn red-brown to brown in color",
        "french": "Ces taches sont tournées vers le brun rouge en couleur brune"
      },
      {
        "english": "Proliferation of vegetative buds",
        "french": "Prolifération des bourgeons végétatifs"
      },
      {
        "english": "The tillers bear pale yellow to completely chlorotic leaves",
        "french": "Les talles portent du jaune pâle à des feuilles complètement chlorotiques"
      },
      {
        "english": "The canes are thin with short internodes",
        "french": "Les cannes sont minces avec des entre-nés courts"
      },
      {
        "english": "Yellowing of the leaf midrib on the underside of the leaf",
        "french": "Jaunissement de la crosse médiane sur le dessous de la feuille"
      },
      {
        "english": "Discoloration of leaves",
        "french": "Décoloration des feuilles"
      },
      {
        "english": "Bunchy appearance of the plant",
        "french": "Apparence groupée de la plante"
      },
      {
        "english": "Smut (fungal)",
        "french": "Smut (fongique)"
      },
      {
        "english": "Grassy shoot",
        "french": "Pousse herbeuse"
      },
      {
        "english": "Yellow leaf disease(virus)",
        "french": "Maladie des feuilles jaunes (virus)"
      },
      {
        "english": "Mango Hopper",
        "french": "Trémie de mangue"
      },
      {
        "english": "Mango Mealy Bug",
        "french": "Mango Mealy Bug"
      },
      {
        "english": "Mango Bark Eating Caterpillar",
        "french": "Mangue d'écorce mangeant la chenille"
      },
      {
        "english": "Mango Fruit Fly",
        "french": "Mango Fruit Fly"
      },
      {
        "english": "Inflorescence Midge",
        "french": "Céra-inflorescence"
      },
      {
        "english": "Mango Stem Borer",
        "french": "Foreur de la mangue"
      },
      {
        "english": "Mango Seed Weevil",
        "french": "Wevil de graines de mangue"
      },
      {
        "english": "Mango Leaf Webber",
        "french": "Webber mango leaf"
      },
      {
        "english": "Mango Shoot Gall Psylla",
        "french": "Mango Shoot Gall Psylla"
      },
      {
        "english": "Mango malformation",
        "french": "Malformation de la mangue"
      },
      {
        "english": "Bacterial Canker",
        "french": "Chancre bactérien"
      },
      {
        "english": "Mango Dieback",
        "french": "Dépérissement de la mangue"
      },
      {
        "english": "Phoma Blight",
        "french": "Phoma Blight"
      },
      {
        "english": "Mango Black Tip",
        "french": "Astuce noire de mangue"
      },
      {
        "english": "Adults and nymphs suck sap from tender shoots and flowers, causing drying of flowers and subsequent dropping. It secretes honeydew that develops sooty mold, reducing photosynthesis.",
        "french": "Les adultes et les nymphes aspirent la sève des pousses tendres et des fleurs, provoquant des fleurs et une baisse ultérieure. Il sécrète du miellat qui développe des moisissures de suie, réduisant la photosynthèse."
      },
      {
        "english": "Heavy puncturing and continuous draining of the sap cause curling and drying of the infested tissue.",
        "french": "Une forte perforation et un drainage continu de la sève provoquent le curling et le séchage du tissu infesté."
      },
      {
        "english": "Hoppers shelter in the cracks and crevices of the bark or underside the leaves of the trees during the off season.",
        "french": "Hoppers s'abrit dans les fissures et les crevasses de l'écorce ou sous les feuilles des arbres pendant la saison morte."
      },
      {
        "english": "Nymphs and adults suck plant sap and it secretes honey dew that develops sooty mould.",
        "french": "Les nymphes et les adultes sucent la sève des plantes et il sécrète une rosée de miel qui développe des moisissures de suie."
      },
      {
        "english": "Grub tunnels in the sapwood on the trunk or branches.",
        "french": "Tunnels de larves dans le sapwood sur le coffre ou les branches."
      },
      {
        "english": "Grub bore into the sapwood and making irregular tunnels.",
        "french": "Grub a fait l'objet de sapwood et de fabriquer des tunnels irréguliers."
      },
      {
        "english": "Caterpillars bore into the trunk or junction of branches make zig zag galleries. Presence of gallery made out of silk and frass is the key symptom.",
        "french": "Les chenilles alésaient dans le tronc ou la jonction des branches font des galeries zig zag. La présence d'une galerie faite de soie et d'alcoolisme est le symptôme clé."
      },
      {
        "english": "Caterpillars remain hidden in the tunnel during day time, come out at night and feed on the bark.",
        "french": "Les chenilles restent cachées dans le tunnel pendant la journée, sortent la nuit et se nourrissent de l'écorce."
      },
      {
        "english": "Due to infestation, flow of sap is hindered, plant growth arrested and fruit formation is drastically reduced",
        "french": "En raison de l'infestation, le débit de SAP est entravé, la croissance des plantes arrêtée et la formation de fruits est considérablement réduite"
      },
      {
        "english": "The female punctures fruits with its pointed ovipositor and insert eggs inside.",
        "french": "La femelle ponctuait les fruits avec son ovipositeur pointu et insère des œufs à l'intérieur."
      },
      {
        "english": "Infested fruits exhibit puncture marks & oozing.",
        "french": "Les fruits infestés présentent des marques de perforation et suinter."
      },
      {
        "english": "After hatching, maggot feeds on the pulp of fruit which result in dropping & rottening of frui",
        "french": "Après l'éclosion, les asticots se nourrissent de la pulpe de fruits qui entraînent une baisse et un pourries de frui"
      },
      {
        "english": "After hatching, the maggot feeds on the pulp of the fruit, resulting in dropping and rotting of the fruit.",
        "french": "Après l'éclosion, la mouche se nourrit de la pulpe des fruits, entraînant une baisse et une pourriture des fruits."
      },
      {
        "english": "It attacks floral buds, tender fruits & tender leaves.",
        "french": "Il attaque les bourgeons floraux, les fruits tendres et les feuilles tendres."
      },
      {
        "english": "The Infested mango buds, shoots and young fruits develop many small blister galls, about 3-4 mm long, each containing a yellow maggot.",
        "french": "Les bourgeons de mangues infestés, les pousses et les jeunes fruits développent de nombreuses petites galles, environ 3 à 4 mm de long, chacune contenant une grosse bouche jaune."
      },
      {
        "english": "In severe attacks the affected plant parts shrivel and die also small emergence holes may be detected on galls",
        "french": "Dans des attaques graves, les parties de la plante affectées se rattrapent et meurent également de petits trous d'émergence peuvent être détectés sur les galles"
      },
      {
        "english": "In severe attacks the affected plant parts shrivel and die also small emergence holes may be detected on galls.",
        "french": "Dans des attaques graves, les parties de la plante affectées se rattrapent et meurent également de petits trous d'émergence peuvent être détectés sur les galles."
      },
      {
        "english": "Grubs start feeding below the bark of branches making tunnels, subsequently bore into the main stem.",
        "french": "Les larves commencent à se nourrir en dessous de l'écorce de branches faisant des tunnels, à l'abri dans la tige principale."
      },
      {
        "english": "Frass coming out of the entry point indicates presence of trunk borer.",
        "french": "Les effractures sortant du point d'entrée indiquent la présence de la painceur de tronc."
      },
      {
        "english": "Damage results in yellowing of leaves followed by drying of terminal shoots and branches, leading to the death of whole tree.",
        "french": "Les dommages entraînent le jaunissement des feuilles suivis d'un séchage des pousses terminales et des branches, conduisant à la mort de l'arbre entier."
      },
      {
        "english": "Grub makes zigzag tunnels in pulp",
        "french": "Grub fabrique des tunnels en zigzag en pulpe"
      },
      {
        "english": "Eats unripe tissue and bore into cotyledon",
        "french": "Mange des tissus non mûrs et entraîner dans le cotylédon"
      },
      {
        "english": "Fruit dropping at marble stage",
        "french": "Fruits tombant au stade en marbre"
      },
      {
        "english": "Oviposition injuries on marble sized fruits",
        "french": "Blessures de ponte sur les fruits de la taille d'un marbre"
      },
      {
        "english": "Larva is pale green with brown head and prothoracic shield.",
        "french": "La larve est vert pâle avec une tête brune et un bouclier prothoracique."
      },
      {
        "english": "Adult is brownish moth with wavy lines on forewings.Initially caterpillars feed on leaf surface gregariously by scrapping.Later they make web on tender shoots and leaves together and feed within.",
        "french": "L'adulte est un papillon brunâtre avec des lignes ondulées sur les antérieur. Les chenilles initiales se nourrissent de la surface des feuilles de manière grégaire en supprimant.La la fratere, ils font du Web sur des pousses tendres et des feuilles ensemble et se nourrissent à l'intérieur."
      },
      {
        "english": "Several caterpillars may be found in a single webbed up cluster of leaves.",
        "french": "Plusieurs chenilles peuvent être trouvées dans un seul groupe de feuilles en ligne."
      },
      {
        "english": "Nymphs suck cell sap from adjacent buds.",
        "french": "Les nymphes sucent la sève cellulaire des bourgeons adjacents."
      },
      {
        "english": "As a result of feeding, buds develop into hard conical green galls",
        "french": "À la suite de l'alimentation, les bourgeons se transforment en galles vertes coniques dures"
      },
      {
        "english": "Consequently, there is no flowering and fruit setting. Nymphs over winter inside the galls.",
        "french": "Par conséquent, il n'y a pas de floraison et de navire aux fruits. Nymphes pendant l'hiver à l'intérieur des galles."
      },
      {
        "english": "Large infestations (3 or more maggots per plant) may cause wilting.",
        "french": "De grandes infestations (3 asticots ou plus par plante) peuvent provoquer un flétrissement."
      },
      {
        "english": "The young larvae feed on the chlorophyll of young leaves and skeletonize them.",
        "french": "Les jeunes larves se nourrissent de la chlorophylle des jeunes feuilles et les squeletonisent."
      },
      {
        "english": "Light pale brownish yellow stout moth.",
        "french": "Moth stout jaune brunâtre pâle clair."
      },
      {
        "english": "Forewings are olive green to pale brown with a dark brown circular spot in the center.",
        "french": "Les anotes sont du vert olive à brun pâle avec une tache circulaire brun foncé au centre."
      },
      {
        "english": "Due to attack by the insect, the leaves turn yellow and become curled.",
        "french": "En raison de l'attaque par l'insecte, les feuilles deviennent jaunes et se recroquevillent."
      },
      {
        "english": "Chlorotic spots and sooty molds develop on the affected tissues.",
        "french": "Les taches chlorotiques et les moules suieux se développent sur les tissus affectés."
      },
      {
        "english": "Scrapping of leaves, pinholes, or small to medium elongated holes.",
        "french": "Démontage des feuilles, des trous d'épingle ou des trous allongés petits à moyens."
      },
      {
        "english": "Singular or closely grouped circular to irregularly shaped holes in foliage.",
        "french": "Circulaires singuliers ou étroitement groupés à des trous de forme irrégulière dans le feuillage."
      },
      {
        "english": "Can cause serious damage to soybean at all stages.",
        "french": "Peut causer de graves dommages au soja à toutes les étapes."
      },
      {
        "english": "Leaves look brownish-yellow in color.",
        "french": "Les feuilles ont l'air brunâtre jaune."
      },
      {
        "english": "The final instar larvae feed on the leaves from the margin.",
        "french": "Les larves finales finales se nourrissent des feuilles de la marge."
      },
      {
        "english": "The damaged leaves of the plant appear in a skeletonized/net/web form.",
        "french": "Les feuilles endommagées de la plante apparaissent sous une forme squelette / nette / web."
      },
      {
        "english": "It attacks the leaves, flowers, stalks of panicle and fruits, causing superficial white powdery appearance on it",
        "french": "Il attaque les feuilles, les fleurs, les tiges de panicule et de fruits, provoquant une apparence poudreuse blanche superficielle dessus"
      },
      {
        "english": "The disease spread by wind very rapidly. Generally the infection starts from the inflorescence and spreads downwards covering the floral axis, tender leaves and soft stem.",
        "french": "La maladie s'est propagée par le vent très rapidement. Généralement, l'infection commence à partir de l'inflorescence et se propage vers le bas couvrant l'axe floral, les feuilles tendres et la tige douce."
      },
      {
        "english": "Flowers fail to open, blacken or become brown, dry and may fall from panicles",
        "french": "Les fleurs ne parviennent pas à s'ouvrir, à noircir ou à devenir brunes, à sec et peuvent tomber des panicules"
      },
      {
        "english": "On leaves, lesions start as small, angular, brown to black spots that can enlarge to form extensive dead areas.",
        "french": "Sur les feuilles, les lésions commencent comme de petites taches angulaires, brunes à noires qui peuvent agrandir pour former de vastes zones mortes."
      },
      {
        "english": "The first symptoms on panicles are small black or dark-brown spots, which can enlarge coalesce and kill the flowers before fruits are produced. Petioles, twigs, and stems are also susceptible and develop into typical black colour.",
        "french": "Les premiers symptômes sur les panicules sont de petits taches noires ou brun foncé, qui peuvent agrandir et tuer les fleurs avant la production de fruits. Les pétioles, les brindilles et les tiges sont également sensibles et se développent en couleur noire typique."
      },
      {
        "english": "Twig dieback occurs when severe, elongated, blackened lesions form on stems and twigs die back apically.",
        "french": "Le dépérissement des brindilles se produit lorsque des lésions sévères, allongées et noircies se forment sur des tiges et que les brindilles meurent apicalement."
      },
      {
        "english": "Vegetative Malformation: It is more commonly found on young seedlings. It is characterized by disrupting of apical growth resulting in several small flushes..",
        "french": "Malformation végétative: il se trouve plus couramment sur les jeunes semis. Il se caractérise par la perturbation de la croissance apicale, ce qui entraîne plusieurs petites rinçages."
      },
      {
        "english": "The multi-branching of shoot apex with scaly leaves is known as “Bunchy Top” or “Witches’ Broom”. The malformed seedlings, remain stunted and die.",
        "french": "Le multi-ramification de l'apex de pousse avec des feuilles écailleuses est connue sous le nom de «top bunchy» ou «balai des sorcières». Les semis malformés, restent rabougris et meurent."
      },
      {
        "english": "Floral Malformation: In malformation of inflorescens, shows variation in the panicle. Malformed head dries up in black mass and persist for long time",
        "french": "Malformation florale: dans la malformation des inflorescens, montre une variation de la panicule. La tête mal formée se règne dans la masse noire et persiste longtemps"
      },
      {
        "english": "The disease is noticed on leaves, leaf stalks, stems, twigs, branches and fruits, initially producing water-soaked lesions, later turning into typical canker.",
        "french": "La maladie est remarquée sur les feuilles, les tiges des feuilles, les tiges, les brindilles, les branches et les fruits, produisant initialement des lésions imbibées d'eau, se transformant plus tard en chancre typique."
      },
      {
        "english": "Water-soaked irregular satellites to angular raised lesions measuring 1-4 mm in diameter are formed. These lesions are light yellow in colour, initially with yellow halo but with age enlarge or coalesce to form irregular necrotic cankerous patches with dark brown colour.",
        "french": "Des satellites irréguliers imbibés d'eau aux lésions surélevées angulaires mesurant 1 à 4 mm de diamètre sont formées. Ces lésions sont de couleur jaune clair, initialement avec un halo jaune mais avec une agrandissement ou une fusion pour former des plaques cankères nécrotiques irrégulières avec une couleur brun foncé."
      },
      {
        "english": "Water-soaked, dark brown to black-coloured lesions are observed which gradually developed into cankerous, raised or flat spots. These spots often, burst extruding gummy substances containing highly contagious bacterial cells",
        "french": "Des lésions trempées à l'eau, brun foncé à noir sont observées qui se sont progressivement développées en points cankurés, surélevés ou plats. Ces taches souvent, éclatent des substances gommeuses contenant des cellules bactériennes hautement contagieuses"
      },
      {
        "english": "The pathogen causing dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle etc.",
        "french": "L'agent pathogène provoquant le dépérissement, la dépérissement de la pointe, la brûlure de l'union du greffon, la brûlure des brindilles, la pourriture des semis, la coloration en bois, la pourriture de la tige, la pourriture des racines noires, la pourriture des fruits, la pourriture sèche, la pourriture brune de la panicule, etc."
      },
      {
        "english": "It is characterized by drying back of twigs from top to downwards, particularly in older trees followed by drying of leaves which gives an appearance of fire scorch.",
        "french": "Il se caractérise par le séchage en arrière des brindilles de haut en bas vers le bas, en particulier dans les arbres plus anciens suivis d'un séchage de feuilles qui donne une apparence de brûlure de feu."
      },
      {
        "english": "Internal browning in wood tissue is observed when it is slit open along with the long axis.",
        "french": "Le brunissement interne dans le tissu en bois est observé lorsqu'il est ouvert avec l'axe long."
      },
      {
        "english": "Symptoms of the disease are noticeable only on old leaves",
        "french": "Les symptômes de la maladie ne sont perceptibles que sur les vieilles feuilles"
      },
      {
        "english": "Initially, the lesions are angular, minute, irregular, yellow to light brown, scattered over leaf lamina.",
        "french": "Initialement, les lésions sont angulaires, minuscules, irrégulières, jaunes à brun clair, dispersées sur la lame des feuilles."
      },
      {
        "english": "As the lesions enlarge their colour changes from brown to cinnamon and they become almost irregular.",
        "french": "Au fur et à mesure que les lésions agrandissent, leur couleur passe du brun à la cannelle et qu'ils deviennent presque irréguliers."
      },
      {
        "english": "Symptoms become visible when the mango fruits attain marbel size",
        "french": "Les symptômes deviennent visibles lorsque les fruits de la mangue atteignent la taille de Marbel"
      },
      {
        "english": "Small etiolated area develops near the distal end of the fruit which gradually spreads, turns nearly black and covers the tip of the fruit completely",
        "french": "La petite zone étiolé se développe près de l'extrémité distale du fruit qui se propage progressivement, devient presque noir et couvre complètement la pointe du fruit"
      },
      {
        "english": "The black area remains hard and the growth of the fruit is checked.",
        "french": "La zone noire reste difficile et la croissance du fruit est vérifiée."
      },
      {
        "english": "Hoppers shelter in the cracks and crevices of the bark or underside of the leaves of the trees during the off season.",
        "french": "Les trémies s'abritent dans les fissures et les crevasses de l'écorce ou du dessous des feuilles des arbres pendant la saison morte."
      },
      {
        "english": "Nymphs and adults suck plant sap and secrete honeydew that develops sooty mold.",
        "french": "Les nymphes et les adultes sucent la sève des plantes et sécrètent le miellat qui développe des moisissures de suie."
      },
      {
        "english": "Grubs tunnel in the sapwood on the trunk or branches, making irregular tunnels.",
        "french": "Grubs tunnel dans le sapwood sur le coffre ou les branches, faisant des tunnels irréguliers."
      },
      {
        "english": "Caterpillars bore into the trunk or junction of branches, making zigzag galleries. Presence of galleries made out of silk and frass is the key symptom.",
        "french": "Les chenilles ont eu le tronc ou la jonction des branches, faisant des galeries en zigzag. La présence de galeries en soie et des fras est le symptôme clé."
      },
      {
        "english": "Caterpillars remain hidden in the tunnel during the daytime, come out at night, and feed on the bark.",
        "french": "Les chenilles restent cachées dans le tunnel pendant la journée, sortent la nuit et se nourrissent de l'écorce."
      },
      {
        "english": "Due to infestation, the flow of sap is hindered, plant growth is arrested, and fruit formation is drastically reduced.",
        "french": "En raison de l'infestation, le flux de SAP est entravé, la croissance des plantes est arrêtée et la formation des fruits est considérablement réduite."
      },
      {
        "english": "The female punctures fruits with its pointed ovipositor and inserts eggs inside.",
        "french": "La femelle ponctuait les fruits avec son ovipositeur pointu et insère des œufs à l'intérieur."
      },
      {
        "english": "Infested fruits exhibit puncture marks and oozing.",
        "french": "Les fruits infestés présentent des marques de perforation et suintant."
      },
      {
        "english": "It attacks floral buds, tender fruits, and tender leaves.",
        "french": "Il attaque les bourgeons floraux, les fruits tendres et les feuilles tendres."
      },
      {
        "english": "The infested mango buds, shoots, and young fruits develop many small blister galls, each containing a yellow maggot.",
        "french": "Les bourgeons de mangues infestés, les pousses et les jeunes fruits développent de nombreuses petites galles, chacune contenant une escarpété jaune."
      },
      {
        "english": "Grubs start feeding below the bark of branches, making tunnels, and subsequently bore into the main stem.",
        "french": "Les larves commencent à se nourrir en dessous de l'écorce des branches, à faire des tunnels, puis à se lancer dans la tige principale."
      },
      {
        "english": "Frass coming out of the entry point indicates the presence of the trunk borer.",
        "french": "Les fras qui sortaient du point d'entrée indiquent la présence de l'agrileur du tronc."
      },
      {
        "english": "Damage results in yellowing of leaves, followed by drying of terminal shoots and branches, leading to the death of the whole tree.",
        "french": "Les dommages entraînent le jaunissement des feuilles, suivi du séchage des pousses terminales et des branches, entraînant la mort de tout l'arbre."
      },
      {
        "english": "Grubs make zigzag tunnels in pulp, eat unripe tissue, and bore into cotyledon.",
        "french": "Les larves fabriquent des tunnels en zigzag dans la pulpe, mangent des tissus non mûrs et s'enroulent dans du cotylédon."
      },
      {
        "english": "Fruit dropping at the marble stage.",
        "french": "Les fruits tombant au stade en marbre."
      },
      {
        "english": "Oviposition injuries on marble-sized fruits.",
        "french": "Blessures de ponte sur les fruits de la taille du marbre."
      },
      {
        "english": "As a result of feeding, buds develop into hard conical green galls.",
        "french": "À la suite de l'alimentation, les bourgeons se transforment en galles vertes coniques dures."
      },
      {
        "english": "Coffee Berry blotch",
        "french": "Tampon de baies de café"
      },
      {
        "english": "Coffee cercospora leaf spot",
        "french": "Café Cercospora."
      },
      {
        "english": "Yellow to brown spots on the upper leaf surface  which have white dust-like spores on the corresponding under leaf surface.",
        "french": "Des taches jaunes à brunes sur la surface des feuilles supérieures qui ont des spores blanches en forme de poussière sur la surface de feuille correspondante."
      },
      {
        "english": "The spots coalesce and the leaves shrivel and dries up prematurel",
        "french": "Les taches fusionnent et les feuilles se rattrapent et sèche prématurel"
      },
      {
        "english": "Bags per Manzana",
        "french": "Sacs par pomme"
      },
      {
        "english": "Bushels per Manzana",
        "french": "Boisseaux par pomme"
      },
      {
        "english": "Tonnes per Manzana",
        "french": "Tonnes par pomme"
      },
      {
        "english": "Kilogram per Manzana",
        "french": "Kilogramme pour manzana"
      },
      {
        "english": "Tonne per Manzana",
        "french": "Tonne par pomme"
      },
      {
        "english": "Manzana",
        "french": "Pomme"
      },
      {
        "english": "Gram per centimeter cube",
        "french": "Gram pour ce cube"
      },
      {
        "english": "Kilogram per meter cube",
        "french": "Kilogramme par cube de mètre"
      },
      {
        "english": "Pound per meter cube",
        "french": "Livre par cube de mètre"
      },
      {
        "english": "Pound per centimeter cube",
        "french": "Pouvre pour le cube"
      },
      {
        "english": "Machete",
        "french": "Machette"
      },
      {
        "english": "Hoe",
        "french": "Comment"
      },
      {
        "english": "Mower",
        "french": "Tondeuse"
      },
      {
        "english": "Soil Information",
        "french": "Informations sur le sol"
      },
      {
        "english": "Crop Observation",
        "french": "Observation des cultures"
      },
      {
        "english": "Raw Cacao Beans",
        "french": "Haricots cacao crus"
      },
      {
        "english": "Fermented And Dried Cacao Beans",
        "french": "Haricots de cacao fermentés et séchés"
      },
      {
        "english": "Cacao Nibs",
        "french": "Nibs de cacao"
      },
      {
        "english": "Cacao Mass (Liquid)",
        "french": "Masse de cacao (liquide)"
      },
      {
        "english": "Cacao Mass (Solid)",
        "french": "Masse de cacao (solide)"
      },
      {
        "english": "Cacao Butter",
        "french": "Beurre de cacao"
      },
      {
        "english": "Cacao Powder",
        "french": "Poudre de cacao"
      },
      {
        "english": "Chocolate Liquor",
        "french": "Liqueur de chocolat"
      },
      {
        "english": "Chocolate Products",
        "french": "Produits au chocolat"
      },
      {
        "english": "Fair Trade Or Specialty Deliveries",
        "french": "Livraison de commerce équitable ou de spécialité"
      },
      {
        "english": "You have been invited to the survey",
        "french": "Vous avez été invité à l'enquête"
      },
      {
        "english": "Husk",
        "french": "Décortiquer"
      },
      {
        "english": "Land Evaluation",
        "french": "Évaluation des terres"
      },
      {
        "english": "Unsuitable",
        "french": "Inappropriée"
      },
      {
        "english": "Marginally Suitable",
        "french": "Marginalement approprié"
      },
      {
        "english": "Moderately Suitable",
        "french": "Modérément adapté"
      },
      {
        "english": "Highly Suitable",
        "french": "Très adapté"
      },
      {
        "english": "Slope (%)",
        "french": "Pente (%)"
      },
      {
        "english": "Soil texture (USDA class)",
        "french": "Texture du sol (classe USDA)"
      },
      {
        "english": "Land",
        "french": "Atterrir"
      },
      {
        "english": "Artificial surfaces (type)",
        "french": "Surfaces artificielles (type)"
      },
      {
        "english": "Proximity to Type 1 and 2 Roads (meters)",
        "french": "Proximité avec les routes de type 1 et 2 (mètres)"
      },
      {
        "english": "Soil Chemical Properties",
        "french": "Propriétés chimiques du sol"
      },
      {
        "english": "Soil Physical Properties",
        "french": "Propriétés physiques du sol"
      },
      {
        "english": "Coarse fragments (vol%)",
        "french": "Fragments grossiers (Vol%)"
      },
      {
        "english": "Soil organic carbon (%)",
        "french": "Carbon organique du sol (%)"
      },
      {
        "english": "Soil pH",
        "french": "PH du sol"
      },
      {
        "english": "Soil salinity (ECe))",
        "french": "Salinité du sol (ECE))"
      },
      {
        "english": "Overall Score for Land Suitability",
        "french": "Score global pour l'aptitude des terres"
      },
      {
        "english": "Mean annual temperature (°C)",
        "french": "Température annuelle moyenne (° C)"
      },
      {
        "english": "Weather",
        "french": "Météo"
      },
      {
        "english": "Mean minimum temperature of coldest month (°C)",
        "french": "Température minimale moyenne du mois le plus froid (° C)"
      },
      {
        "english": "Mean annual precipitation (mm)",
        "french": "Précipitations annuelles moyennes (MM)"
      },
      {
        "english": "Weather Report",
        "french": "Rapport météo"
      },
      {
        "english": "More than 4000",
        "french": "Plus de 4000"
      },
      {
        "english": "Between 2000-4000",
        "french": "Entre 2000 et 4000"
      },
      {
        "english": "Between 1000-2000",
        "french": "Entre 1000-2000"
      },
      {
        "english": "Between 10-1000",
        "french": "Entre 10-1000"
      },
      {
        "english": "More than 47",
        "french": "Plus de 47"
      },
      {
        "english": "Between 37-47",
        "french": "Entre 37 et 47"
      },
      {
        "english": "Between 10-37",
        "french": "Entre 10-37"
      },
      {
        "english": "Between 0-10",
        "french": "Entre 0-10"
      },
      {
        "english": "Any one of 1,10,12",
        "french": "N'importe lequel des 1,10,12"
      },
      {
        "english": "8 or 9",
        "french": "8 ou 9"
      },
      {
        "english": "Any one of 2,3,4,5,6,7",
        "french": "N'importe lequel des 2,3,4,5,6,7"
      },
      {
        "english": "More than 55",
        "french": "Plus de 55"
      },
      {
        "english": "Between 35-55",
        "french": "Entre 35-55"
      },
      {
        "english": "Between 15-35",
        "french": "Entre 15 et 35"
      },
      {
        "english": "Between 0-15",
        "french": "Entre 0-15"
      },
      {
        "english": "Less than 0.6",
        "french": "Moins de 0,6"
      },
      {
        "english": "Between 0.8 - 1.5",
        "french": "Entre 0,8 et 1,5"
      },
      {
        "english": "More than 1.5",
        "french": "Plus de 1,5"
      },
      {
        "english": "Less than 4 or More than 8.5",
        "french": "Moins de 4 ou plus de 8,5"
      },
      {
        "english": "Between 4-5 or Between 7.5-8.5",
        "french": "Entre 4 et 5 ou entre 7,5 et 8,5"
      },
      {
        "english": "Between 5-5.5 or Between 6.5-7.5",
        "french": "Entre 5 et 5,5 ou entre 6,5-7,5"
      },
      {
        "english": "Between 5.5-6.5",
        "french": "Entre 5,5 et 6,5"
      },
      {
        "english": "More than 5",
        "french": "Plus de 5"
      },
      {
        "english": "Between 4-5",
        "french": "Entre 4-5"
      },
      {
        "english": "Between 3-4",
        "french": "Entre 3-4"
      },
      {
        "english": "Between 0-3",
        "french": "Entre 0-3"
      },
      {
        "english": "Any one of 1, 10, 11",
        "french": "N'importe lequel des 1, 10, 11"
      },
      {
        "english": "Any one of 6, 7, 9",
        "french": "N'importe lequel des 6, 7, 9"
      },
      {
        "english": "Any one of 2,3,4,5",
        "french": "N'importe lequel des 2,3,4,5"
      },
      {
        "english": "More than 30",
        "french": "Plus de 30"
      },
      {
        "english": "Between 16-30",
        "french": "Entre 16 et 30"
      },
      {
        "english": "Between 8-16",
        "french": "Entre 8-16"
      },
      {
        "english": "Between 0-8",
        "french": "Entre 0-8"
      },
      {
        "english": "Any one of 4,5,6,7,8,9,10,11,12",
        "french": "N'importe lequel des 4,5,6,7,8,9,10,11,12"
      },
      {
        "english": "2 or 3",
        "french": "2 ou 3"
      },
      {
        "english": "Less than 0.8",
        "french": "Moins de 0,8"
      },
      {
        "english": "Between 0.8-1.2",
        "french": "Entre 0,8-1,2"
      },
      {
        "english": "More than 1.2",
        "french": "Plus de 1,2"
      },
      {
        "english": "Less than 4.3 or More than 8.3",
        "french": "Moins de 4,3 ou plus de 8,3"
      },
      {
        "english": "Between 4.3-4.5 or Between 7.5-8.3",
        "french": "Entre 4.3-4,5 ou entre 7,5-8.3"
      },
      {
        "english": "Between 4.5-5 or Between 6.5-7.5",
        "french": "Entre 4,5 et 5 ou entre 6,5-7,5"
      },
      {
        "english": "Between 5-6.5",
        "french": "Entre 5-6,5"
      },
      {
        "english": "Grassland",
        "french": "Prairie"
      },
      {
        "english": "Artificial surfaces",
        "french": "Surfaces artificielles"
      },
      {
        "english": "Tree covered areas",
        "french": "Zones couvertes d'arbres"
      },
      {
        "english": "Shrubs covered areas",
        "french": "Arbustes couverts"
      },
      {
        "english": "Herbaceous vegetation, aquatic or regularly flooded",
        "french": "Végétation herbacée, aquatique ou régulièrement inondé"
      },
      {
        "english": "Bare soil / sparse vegetation",
        "french": "Sol nu / végétation clairsemée"
      },
      {
        "english": "Mangroves",
        "french": "Mangroves"
      },
      {
        "english": "Snow and glaciers",
        "french": "Neige et glaciers"
      },
      {
        "english": "Water bodies",
        "french": "Plans d'eau"
      },
      {
        "english": "Moss and lichen",
        "french": "Mousse et lichen"
      },
      {
        "english": "Clay",
        "french": "Argile"
      },
      {
        "english": "Silty clay",
        "french": "Argile limoneuse"
      },
      {
        "english": "Sandy clay",
        "french": "Argile sableuse"
      },
      {
        "english": "Clay loam",
        "french": "Loam argileux"
      },
      {
        "english": "Silty clay loam",
        "french": "Limon argileux limoneux"
      },
      {
        "english": "Sandy clay loam",
        "french": "Limon argile sablonneux"
      },
      {
        "english": "Loam",
        "french": "Terreau"
      },
      {
        "english": "Silty loam",
        "french": "Limon limoneux"
      },
      {
        "english": "Sandy loam",
        "french": "Loam sableux"
      },
      {
        "english": "Silt",
        "french": "Limon"
      },
      {
        "english": "Loamy sand",
        "french": "De sable limoneux"
      },
      {
        "english": "Sand",
        "french": "Sable"
      },
      {
        "english": "Less than 10 or More than 45",
        "french": "Moins de 10 ou plus de 45"
      },
      {
        "english": "Between 30-45 or Between 10-15",
        "french": "Entre 30 et 45 ou entre 10 et 15"
      },
      {
        "english": "Between 15-18 or Between 26-30",
        "french": "Entre 15 et 18 ou entre 26 et 30"
      },
      {
        "english": "Between 18-26",
        "french": "Entre 18-26"
      },
      {
        "english": "Less than 8",
        "french": "Moins de 8"
      },
      {
        "english": "Between 8-13",
        "french": "Entre 8-13"
      },
      {
        "english": "Between 13-16",
        "french": "Entre 13 et 16"
      },
      {
        "english": "More than 16",
        "french": "Plus de 16"
      },
      {
        "english": "Less than 750 or More than 2500",
        "french": "Moins de 750 ou plus de 2500"
      },
      {
        "english": "Between 750-1000 or Between 2000-2500",
        "french": "Entre 750-1000 ou entre 2000-2500"
      },
      {
        "english": "Between 1800-2000 or Between 1000-1200",
        "french": "Entre 1800-2000 ou entre 1000-1200"
      },
      {
        "english": "Between 1200-1800",
        "french": "Entre 1200 et 1800"
      },
      {
        "english": "Area too Large. Maximum area limit is 1000 hectares",
        "french": "Zone trop grande. La limite de surface maximale est de 1000 hectares"
      },
      {
        "english": "My Farm Activity",
        "french": "Mon activité agricole"
      },
      {
        "english": "Application Cost",
        "french": "Coût de la demande"
      },
      {
        "english": "Cost",
        "french": "Coût"
      },
      {
        "english": "Farm/Zone Name",
        "french": "Nom de la ferme / de la zone"
      },
      {
        "english": "Area Planted",
        "french": "Zone plantée"
      },
      {
        "english": "Crop Type",
        "french": "Type de culture"
      },
      {
        "english": "Soil Type",
        "french": "Type de sol"
      },
      {
        "english": "You have been invited to",
        "french": "Vous avez été invité à"
      },
      {
        "english": "Fair Trade",
        "french": "Commerce équitable"
      },
      {
        "english": "Rain Forest",
        "french": "Forêt tropicale"
      },
      {
        "english": "Led By Woman",
        "french": "Dirigé par une femme"
      },
      {
        "english": "Demonstration Plot",
        "french": "Terrain de démonstration"
      },
      {
        "english": "Imo Cert",
        "french": "CERT IMO"
      },
      {
        "english": "Produccion Limpa",
        "french": "Production propre"
      },
      {
        "english": "Palleiro",
        "french": "Palette"
      },
      {
        "english": "Kidney Bean",
        "french": "Haricot rouge"
      },
      {
        "english": "Strawberry",
        "french": "Fraise"
      },
      {
        "english": "Papaya",
        "french": "Papaye"
      },
      {
        "english": "Blueberry",
        "french": "Myrtille"
      },
      {
        "english": "Colheita Manual (Mão)",
        "french": "Récolte manuelle (main)"
      },
      {
        "english": "Total Fresh Yield",
        "french": "Contour frais total"
      },
      {
        "english": "Total Dry Yield",
        "french": "Rendement sec total"
      },
      {
        "english": "Buy Sell Overview",
        "french": "Acheter un aperçu de la vente"
      },
      {
        "english": "Compliance Certifications",
        "french": "Certifications de conformité"
      },
      {
        "english": "Land Suitability",
        "french": "Aptitude"
      },
      {
        "english": "Cocoa",
        "french": "Cacao"
      },
      {
        "english": "Cocoa Beans",
        "french": "Fèves de cacao"
      },
      {
        "english": "Cacao Buying Station",
        "french": "Station d'achat de cacao"
      },
      {
        "english": "Cacao Fermentation",
        "french": "Fermentation du cacao"
      },
      {
        "english": "Cacao Buying Station Production",
        "french": "Production de la station d'achat de Cacao"
      },
      {
        "english": "Cacao Purchase Order",
        "french": "Bon de commande cacao"
      },
      {
        "english": "Cacao Buying Station Report",
        "french": "Rapport de station d'achat de Cacao"
      },
      {
        "english": "Cacao Warehouse",
        "french": "Entrepôt de cacao"
      },
      {
        "english": "Cacao InBound Warehouse",
        "french": "Entrepôt entrant de cacao"
      },
      {
        "english": "Cacao OutBound Warehouse",
        "french": "Cacao Entrepôt sortant"
      },
      {
        "english": "Cacao Warehouse Report",
        "french": "Rapport d'entrepôt de Cacao"
      },
      {
        "english": "Forest Report",
        "french": "Rapport forestier"
      },
      {
        "english": "Cacao Dry Milling",
        "french": "Moulin à sec cacao"
      },
      {
        "english": "Cacao Dry Milling Production Chart",
        "french": "Cacao Dry Milling Production Tableau"
      },
      {
        "english": "Cacao Dry Milling Register Dry",
        "french": "Cacao Dry Milling Registre sec"
      },
      {
        "english": "Crop Health Report",
        "french": "Rapport de santé des cultures"
      },
      {
        "english": "Weather Analysis Report",
        "french": "Rapport d'analyse météorologique"
      },
      {
        "english": "Batch Management",
        "french": "Gestion par lots"
      },
      {
        "english": "Production Chart",
        "french": "Graphique de production"
      },
      {
        "english": "Purchase Confirmations",
        "french": "Confirmatives d'achat"
      },
      {
        "english": "Weather Analysis",
        "french": "Analyse météorologique"
      },
      {
        "english": "Farm Activities",
        "french": "Activités agricoles"
      },
      {
        "english": "Avocado Trees",
        "french": "Avocats"
      },
      {
        "english": "Due Diligence Guide",
        "french": "Guide de diligence raisonnable"
      },
      {
        "english": "Profile",
        "french": "Profil"
      },
      {
        "english": "Manage Farm",
        "french": "Gérer la ferme"
      },
      {
        "english": "Producers",
        "french": "Productrices"
      },
      {
        "english": "Operator",
        "french": "Opératrice"
      },
      {
        "english": "Configuration",
        "french": "Configuration"
      },
      {
        "english": "Deforestation Compliance Reports ",
        "french": "Rapports de conformité de la déforestation"
      },
      {
        "english": "Deforestation Certification",
        "french": "Certification de déforestation"
      },
      {
        "english": "Due Diligence EUDR",
        "french": "Diligence raisonnable Eudr"
      },
      {
        "english": "Activity Keys",
        "french": "Clés d'activité"
      },
      {
        "english": "Surver Builder",
        "french": "Surver"
      },
      {
        "english": "Your GeoJson file is ready to be downloaded.",
        "french": "Votre fichier Geojson est prêt à être téléchargé."
      },
      {
        "english": "Your file is ready!",
        "french": "Votre fichier est prêt!"
      },
      {
        "english": "PDF report generation failed.",
        "french": "La génération de rapport PDF a échoué."
      },
      {
        "english": "Survey ID is required",
        "french": "L'identification d'enquête est requise"
      },
      {
        "english": "data is required",
        "french": "Les données sont requises"
      },
      {
        "english": "Survey not found",
        "french": "Enquête non trouvée"
      },
      {
        "english": "At least one question is required for published survey",
        "french": "Au moins une question est requise pour une enquête publiée"
      },
      {
        "english": "User Entity id is required",
        "french": "L'ID de l'entité utilisateur est requis"
      },
      {
        "english": "Question ID is required",
        "french": "L'identification de la question est requise"
      },
      {
        "english": "Survey response download successfully queued",
        "french": "Téléchargement de réponse à l'enquête Télécharger avec succès la file d'attente"
      },
      {
        "english": "Cannot publish empty survey",
        "french": "Impossible de publier un sondage vide"
      },
      {
        "english": "Survey updated successfully",
        "french": "Enquête mise à jour avec succès"
      },
      {
        "english": "High production Alert! Farm:",
        "french": "Alerte de production élevée! Ferme:"
      },
      {
        "english": "Farmer:",
        "french": "Fermier:"
      },
      {
        "english": "Crop: Cacao, Total reported:",
        "french": "Crop: Cacao, Total rapporté:"
      },
      {
        "english": "Max allowed:",
        "french": "Max autorisé:"
      },
      {
        "english": "High production Alert! Farmer:",
        "french": "Alerte de production élevée! Fermier:"
      },
      {
        "english": "High production Alert!",
        "french": "Alerte de production élevée!"
      },
      {
        "english": "months ago",
        "french": "il y a des mois"
      },
      {
        "english": "days ago",
        "french": "il y a des jours"
      },
      {
        "english": "year ago",
        "french": "il y a l'année"
      },
      {
        "english": "Farm data has been successfully uploaded. Tap here to review.",
        "french": "Les données de la ferme ont été téléchargées avec succès. Appuyez ici pour examiner."
      },
      {
        "english": "High production Alert! Farm",
        "french": "Alerte de production élevée! Ferme"
      },
      {
        "english": "Your GeoJson file have been downloaded successfully.",
        "french": "Votre fichier Geojson a été téléchargé avec succès."
      },
      {
        "english": "Deforestation report generate. Tap here to review.",
        "french": "Le rapport de déforestation génère. Appuyez ici pour examiner."
      },
      {
        "english": "Deforestation report generated. Tap here to review.",
        "french": "Rapport de déforestation généré. Appuyez ici pour examiner."
      },
      {
        "english": "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discolouration of the rind resulting in rotting.",
        "french": "Dans le cas de la pourriture des fruits, l'infection commence à partir du pédicelle sous forme de lésions sombres et se propage progressivement aux fruits, provoquant la décoloration brune de la croûte entraînant une pourriture."
      },
      {
        "english": "Blends",
        "french": "Mélanges"
      },
      {
        "english": "EUDR-Exempt Products",
        "french": "Produits exonérés de l'EUDR"
      },
      {
        "english": "Manage Products",
        "french": "Gérer les produits"
      }
    ]
    try {
      const records = await queryInterface.sequelize.query(
        "SELECT id, english FROM global_translation_metadata WHERE french IS NULL",
        { type: Sequelize.QueryTypes.SELECT }
      );

      const translationMap = new Map(
        translations.map((t) => [t.english, t.french])
      );

      for (const record of records) {
        const frenchTranslation = translationMap.get(record.english);
        if (frenchTranslation) {
          await queryInterface.bulkUpdate(
            "global_translation_metadata",
            { french: frenchTranslation },
            { id: record.id }
          );
        }
      }

    } catch (error) {
      console.error("Error updating French translations:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      for (const translation of translations) {
        await queryInterface.bulkUpdate(
          "global_translation_metadata",
          { french: null },
          { english: translation.english }
        );
      }
    } catch (error) {
      console.error("Error rolling back French translations:", error);
      throw error;
    }
  }
};
