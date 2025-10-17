const pestAndSymptomsData = [
  {
    name: "Potato",
    pests: [
      {
        name: "Aphids",
        symptoms: [
          "Small tubers",
          "Weakened plant",
          "Stunted and curled new growth",
        ],
      },
      {
        name: "Cut worms",
        symptoms: [
          "Bore holes symptoms on tubers",
          "Young plants and tubers affected",
          "Larvae cutting off younger plant stems",
        ],
      },
      {
        name: "Nematode",
        symptoms: [
          "Short and stunted roots",
          "Reddish brown lesions on roots",
          "Gall formations on tubers",
        ],
      },
    ],
  },
  {
    name: "Cocoa",
    pests: [
      {
        name: "Mealy bugs",
        symptoms: [
          "Colonizes on the tender parts of the plant",
          "Stunting, chlorosis, and defoliation",
        ],
      },
      {
        name: "Tea mosquitoe bugs",
        symptoms: [
          "Circular water-soaked spots around the feeding punctures",
          "Punctures appear as reddish brown spots",
          "Leaves curl up, badly deformed, and shoots dry up",
        ],
      },
      {
        name: "Flatid Plant hoppers",
        symptoms: [
          "Nymphs and adults suck the sap from flowers, tender shoots, and pods",
          "Excrete honey dew",
          "Development of sooty mold fungus on the leaves and pods",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "Colonize on the underside of tender leaves, succulent stem, flower buds, and small cherelles",
          "Premature shedding of flowers and curling of leaves",
          "Wilting and distortion of leaves and young shoots",
        ],
      },
      {
        name: "Stem Girdler",
        symptoms: [
          "Girdler the branches and inserts whitish spindle shaped eggs singly into the tissue in a slanting manner",
          "Branches above the girdle wither and dry",
          "Wilting of branches",
        ],
      },
    ],
  },
  {
    name: "Timothy",
    pests: [
      {
        name: "European skipper",
        symptoms: [
          "Leaves defoliation",
          "Damaged seed heads",
          "Crop stands bare",
        ],
      },
      {
        name: "Creal rust mite adults",
        symptoms: [
          "Stunted growth",
          "Discoloration of leaves",
          "Crop often appears to be under drought stress even if adequate moisture is available",
        ],
      },
      {
        name: "Wireworms",
        symptoms: [
          "Feed on seeds prior to or just after germination",
          "Bore into underground parts of plants",
          "Plant wilting",
        ],
      },
      {
        name: "Grasshopper",
        symptoms: [
          "Feed on leaves, seed heads, stems",
          "Appear as round to ragged holes in the leaves",
          "Defoliation",
        ],
      },
    ],
  },
  {
    name: "Rhodes",
    pests: [
      {
        name: "Mealy bug",
        symptoms: [
          "Stem turns brown to black",
          "Stunted growth with plant color turning green to yellow",
          "Whitish growth of fungus",
        ],
      },
      {
        name: "Armyworm",
        symptoms: [
          "Ragged-edged holes",
          "Extensive leaf damage",
          "Larvae cut the seedlings on a large scale",
        ],
      },
    ],
  },
  {
    name: "Rapeseed",
    pests: [
      {
        name: "Bihar hair caterpillar",
        symptoms: [
          "The newly hatched caterpillars remain in clusters on the lower surface of the leaves and feed on the epidermis",
          "They eat away entire leaf tissues leaving only the midribs",
          "If the attack occurs at the green pod stage, the entire green tissues of the pods are eaten up resulting in premature shriveling and drying of the seeds causing heavy loss to the crop",
        ],
      },
      {
        name: "Cabbage butterfly",
        symptoms: [
          "The full-grown larvae of this pest are 3 to 4 cm in length with bright yellowish-green color and small hairs on the dorsal side",
          "The plants are defoliated with the result the small plants die while the grown-up plants suffer in growth and yield",
          "The larvae of this pest feed voraciously on the leaves, branches, and pods of the crop",
        ],
      },
      {
        name: "Mustard aphid",
        symptoms: [
          "Both nymphs and adults suck the sap from leaves, buds, and pods",
          "Curling may occur in infested leaves and at an advanced stage, plants may wither and die",
          "Plants remain stunted and sooty molds grow on the honeydew excreted by the insect",
        ],
      },
      {
        name: "Mustard sawfly",
        symptoms: [
          "Initially, the larva nibbles leaves, later it feeds from the margins towards the midrib",
          "The grubs cause numerous shot holes and even riddle the entire leaves by voracious feeding",
          "They devour the epidermis of the shoot, resulting in the drying up of seedlings and failure to bear seeds in older plants",
        ],
      },
      {
        name: "Painted bug",
        symptoms: [
          "Young plants wilt and wither as a result of the attack",
          "Adult bugs excrete resinous substances which spoil the pods",
          "The nymphs and adult bugs also excrete a sort of resinous material which spoils the pods",
        ],
      },
    ],
  },
  {
    name: "Green gram",
    pests: [
      {
        name: "Bean Aphids",
        symptoms: [
          "Leaves, inflorescence stalk, and young pods covered with dark-colored aphids",
          "Leaf mottling and crinkling, and plant dwarfing",
          "Honeydew secretion with black ant movements",
        ],
      },
      {
        name: "Blister beetle",
        symptoms: [
          "The adult blister beetle primarily feeds on flowers",
          "Feeding damage can also be found on tender leaves and shoots",
          "The beetles often attack beans in swarms but generally in small patches within the field",
        ],
      },
      {
        name: "Blue butterfly",
        symptoms: [
          "Buds, flowers, and young pods with boreholes",
          "Presence of slug-like caterpillar",
          "Honeydew secretion with black ant movements",
        ],
      },
      {
        name: "Gram pod borer",
        symptoms: [
          "Defoliation in early stages",
          "Larva's head alone thrust inside the pods and the rest of the body hanging out",
          "Pods with round holes",
        ],
      },
      {
        name: "Grass blue butterfly",
        symptoms: [
          "Buds, flowers, and young pods with boreholes and presence of slug-like caterpillar",
          "Larval entry hole on the pod is plugged with excreta",
          "Pod damage is characterized by multiple holes per pod, made by individual larva",
        ],
      },
      {
        name: "Leafhopper",
        symptoms: [
          "Leaves mottled and yellowish in color",
          "Green color insects found under the surface of leaves",
          "Yellowing of leaves from tip to downwards",
        ],
      },
      {
        name: "Lab lab bug or Stink bug",
        symptoms: [
          "Both nymphs and adults cluster on the tender shoots and suck the sap",
          "Heavily infested vines dry and shed away",
          "Moderately infested plants remain weak and stunted in growth",
        ],
      },
      {
        name: "Pod bugs",
        symptoms: [
          "Pods with black spots",
          "Shedding of green pods",
          "Poorly filled pods with shriveled grains inside",
        ],
      },
      {
        name: "Spiny pod borer",
        symptoms: [
          "Dropping of flowers and young pods",
          "Older pods marked with a brown spot where a larva has entered",
          "Caterpillar first feeds on foliage, later bores into pods and feeds on seeds",
        ],
      },
      {
        name: "Spotted pod borer",
        symptoms: [
          "Defoliation in early stages",
          "Larva's head alone thrust inside the pods and the rest of the body hanging out",
          "Pods with round holes",
        ],
      },
    ],
  },
  {
    name: "Sesame",
    pests: [
      {
        name: "Leaf webber or roller and capsule borer",
        symptoms: [
          "Larvae web together a few top leaves and feed them",
          "In the early stage of infestation, the plant dies without producing any branch or shoot",
          "At flowering, larvae feed inside the flowers and on capsule formation, larvae bore into capsules and feed on developing seeds",
        ],
      },
      {
        name: "Gall fly",
        symptoms: [
          "Maggots feed inside the floral bud leading to the formation of a gall-like structure which does not develop into flower/capsule",
          "The pest remains active at the time of bud initiation",
          "Leading to the formation of a gall-like structure which does not develop into flower/capsules",
        ],
      },
      {
        name: "Sesame leafhopper",
        symptoms: [
          "Nymph and adults suck the sap of tender parts of the plants",
          "Infestation of the pest leads to curling of leaf edges, leaves turn red or brown and then dry up and drop",
          "The jassid or leafhopper is a serious pest of sesame and is known to transmit phyllody disease",
        ],
      },
      {
        name: "Hawk moth",
        symptoms: [
          "The pest remains active throughout the crop season on young and grown-up crop",
          "The damage is caused by the larvae which feed voraciously on leaves and defoliate the plants",
          "The moth is also harmful as it sucks honey from the honeydew",
        ],
      },
      {
        name: "Bihar hairy caterpillar",
        symptoms: [
          "In the early stages, larvae are gregarious feeders and are concentrated on a few plants",
          "Mature caterpillars migrate to other plants and feed voraciously leaving only the stem",
          "The pest incidence occurs from the vegetative stage and continues till maturity",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "Crinkling and curling of leaves",
          "Leaves appear shiny and sticky due to honeydew excreted by the insects",
          "Later, sooty mold grows on honeydew and leaves have a black coating",
        ],
      },
    ],
  },
  {
    name: "Onion",
    pests: [
      {
        name: "Onion Thrips",
        symptoms: [
          "Both nymphs and adults suck plant sap",
          "The leaves of attacked plants become curled, wrinkled, and gradually dry up",
          "The plants do not form bulbs nor do the flowers set seed",
        ],
      },
      {
        name: "Eriophyid mite",
        symptoms: [
          "Leaves do not open completely",
          "Whole plant shows curling",
          "Yellow molting is seen especially on the edges of the leaves",
        ],
      },
      {
        name: "Onion Maggot",
        symptoms: [
          "The maggots bore into the bulbs, causing the plants to become flabby and yellowish",
          "It causes withering in the field and rotting in storage",
          "Damage leads to the invasion of Bacillus carolovorus, which causes soft rot of onion",
        ],
      },
      {
        name: "Earwig",
        symptoms: [
          "Nymphs bore into the bulb and make cavities which lead to withering of plants",
          "Leaves have numerous irregular holes or are chewed around the edges",
          "Earwigs mainly attack on the soft part of the plant",
        ],
      },
      {
        name: "Red spider mites",
        symptoms: [
          "The upper surface of the leaves becomes stippled with little dots",
          "The mites tend to feed in 'pockets' often near the midrib and veins",
          "Silk webbing produced by these mites is usually visible",
        ],
      },
      {
        name: "Bulb mite",
        symptoms: [
          "Bulbs infested with bulb mites may rot and fail to produce new growth",
          "Once the mites are inside the bulb, they rapidly turn the bulbs into rotten pulp",
          "Bulb mites may enter prematurely opened tulip buds and cause bud necrosis",
        ],
      },
    ],
  },
  {
    name: "Tea",
    pests: [
      {
        name: "Tea mites and spider mites",
        symptoms: [
          "Corky areas are formed on the underside of leaves",
          "Attacked leaves may dry up and be prematurely shed",
          "They may cause serious defoliation",
        ],
      },
      {
        name: "Tea Cutworms",
        symptoms: [
          "Caterpillars of the common cutworm occasionally attack seedlings by feeding on the roots and cutting off the stems",
          "Cutting off the stems.",
          "Seedling failure",
        ],
      },
      {
        name: "Tea Crickets",
        symptoms: [
          "They cut seedlings and drag them into underground burrows",
          "Left them on the surface wilting for a few days before taking them into the burrow",
          "The African mole cricket can be a pest, especially at low altitudes and particularly in moist soil",
        ],
      },
      {
        name: "Tea mosquito bug",
        symptoms: [
          "Causing necrotic patches, seen as dark brown spots, on leaves and stems",
          "Leaves are twisted and the shoots can be severely stunted",
          "Die-back of young shoots is common under heavy attack",
        ],
      },
      {
        name: "Tea Aphids",
        symptoms: [
          "Large colonies of the aphids are mainly found feeding on seedlings, causing leaf curl and defoliation",
          "They can be a major pest of tea in the nurseries",
          "Additional damage is caused by the production of honeydew, with subsequent growth of sooty molds",
        ],
      },
      {
        name: "Tea Termites",
        symptoms: [
          "Termites feed on woody roots, branches and stems. The most damaging termites are those that attack living wood.",
          "They enter through the roots and work their way upward, finally destroying the heartwood",
          "Severely attacked plants wilt and die. Older plants may shed leaves",
        ],
      },
      {
        name: "Tea Black tea thrips",
        symptoms: [
          "Attacked buds are small, crisp, and brittle (easy to break)",
          "When the damaged bud unfolds, the leaves have a brown line of dry scars (like cork) along either side of the main rib",
          "Yellow mites cause similar corky lesions, but thrips feeding usually does not cause the leaves to curl up like yellow mite",
        ],
      },
      {
        name: "Tea Scales",
        symptoms: [
          "Their feeding may cause yellowing of leaves followed by leaf drop, poor growth, and dieback of branches",
          "Soft scales infest leaves and twigs, causing damage by sucking sap from the plant and by excreting honeydew, causing the growth of sooty mold",
          "In heavy infestations, leaves are heavily coated with sooty mold, turning black",
        ],
      },
      {
        name: "Tea Nematodes",
        symptoms: [
          "In some areas, nematodes reduce yields",
          "Root-knot nematodes can be a problem in nurseries",
          "Infested roots develop knots or galls",
        ],
      },
    ],
  },
  {
    name: "Alfalfa",
    pests: [
      {
        name: "Alfalfa Looper",
        symptoms: [
          "The larvae chew holes in leaves and may occasionally cause serious defoliation",
          "As caterpillars mature, their feeding intensifies, and they often move into the developing heads",
          "Larvae may also leave frass (fecal material) on plants",
        ],
      },
      {
        name: "Alfalfa Aphid",
        symptoms: [
          "Aphids feed on buds, leaves, flowers, stems, and fruits with piercing-sucking mouthparts",
          "Feeding causes plant structures to become stunted, yellowed, and distorted",
          "Aphid feeding results in an overall loss of plant vigor",
        ],
      },
      {
        name: "Armyworm",
        symptoms: [
          "Larvae feed on leaves with chewing mouthparts, causing skeletonized foliage, irregular holes, shredded leaves, or defoliation",
          "Larvae may tunnel into ears, bore into the head of leaves, and chew into stems, flower buds, and sometimes upper plant roots",
        ],
      },
      {
        name: "Cutworms",
        symptoms: [
          "Larvae can be seen as early as late January into April",
          "Look for seedlings (especially beans) cut off near the soil and use a trowel to look for larvae in the soil nearby",
          "Look for wilted plants that may indicate stem feeding injury",
        ],
      },
      {
        name: "False Chinch Bug",
        symptoms: [
          "Adults and nymphs feed with piercing-sucking mouthparts",
          "Large numbers of aggregating adults on individual plants can cause plants to wilt and die rapidly",
          "Outbreaks that destroy plantings usually occur early in the year. Later in the season, aggregations are commonly seen on developing seed heads",
        ],
      },
      {
        name: "Alfalfa Caterpillar",
        symptoms: [
          "Alfalfa caterpillars can consume entire leaves",
          "The larger larvae are most destructive",
          "In contrast to armyworms, alfalfa caterpillars do not skeletonize leaves and will also consume the midrib",
        ],
      },
      {
        name: "Blister Beetles",
        symptoms: [
          "Blister beetles do not cause widespread feeding damage to alfalfa",
          "However, they contain a chemical, cantharidin, which is toxic to livestock",
          "Cantharidin is contained in the hemolymph (blood) of the beetles and can contaminate forage directly when beetles killed during harvest are incorporated into baled hay or indirectly by transfer of the hemolymph from crushed beetles onto forage",
          "Horses are particularly susceptible to the toxic effects of cantharidin. Consuming as few as six beetles can kill a horse",
        ],
      },
      {
        name: "Clover Root Curculio",
        symptoms: [
          "Clover root curculio larvae injure the plant by severing the fibrous roots and scarring and tunneling the lateral and taproots",
          "Most of the scarring, on the lateral roots and taproot, penetrates to the cambium layer and into the vascular tissue, hence disrupting nutrient and water transport",
          "When populations are extremely high, the pest may nearly girdle the plant and within two to three years scar 30% to 60% of the taproot surface",
        ],
      },
      {
        name: "Grasshoppers",
        symptoms: [
          "Multiple species of grasshoppers (Melanoplus spp.) feed on alfalfa foliage, including the twostriped, differential, redlegged, packard, and migratory grasshoppers",
          "Grasshoppers move into alfalfa field margins from neighboring rangeland or uncultivated areas when food sources in those areas are depleted",
          "Grasshopper feeding can be extremely destructive when large populations cause severe defoliation. Seed fields and newly established plantings are particularly susceptible to grasshopper injury",
        ],
      },
      {
        name: "Weevil",
        symptoms: [
          "Young larvae damage alfalfa by feeding on terminal buds; larger larvae feed on the leaflets",
          "Feeding by older larvae is the most damaging and is characterized as skeletonization and bronzing of the leaves in spring",
          "Under severe pressure, complete defoliation can occur. Damage from both weevils is most commonly seen before the first cutting",
        ],
      },
    ],
  },
  {
    name: "Pearl Millet",
    pests: [
      {
        name: "White Grub",
        symptoms: [
          "The grubs attack the root of the growing seedlings and cause complete withering of the plants.",
          "Patchy gaps are formed due to death of plants which result in poor or uneven plant stand.",
          "Grubs cause maximum damage during initial period.",
        ],
      },
      {
        name: "Shoot fly",
        symptoms: [
          "A common pest of Gujarat and Tamilnadu State.",
          "Larvae cut the growing point causing 'dead heart' during the seedling stage whereas in advance stage, they feed on ear heads and cut down panicles.",
          "Infestation is more on late-sown crop.",
        ],
      },
      {
        name: "Grasshopper",
        symptoms: [
          "Eggs are laid in the soil 75-200 mm deep; hoppers and adults feed on foliage.",
          "At times causing severe defoliation of the crop.",
          "Adults are short-winged and can fly short distances only.",
        ],
      },
      {
        name: "Termites",
        symptoms: [
          "A social insect that lives underground in colonies, attacking young seedlings as well as grown-up plants.",
          "Infested plants wither and ultimately die.",
          "Cut the roots of the plants from the bottom and plants dry, apart from this they also destroy the crop by eating the stem of the plants.",
        ],
      },
      {
        name: "Grey Weevil",
        symptoms: [
          "A polyphagous insect.",
          "Adult beetles feed on green leaves.",
          "Cause serious damage when seedlings are infested.",
        ],
      },
      {
        name: "Ear Head Bug",
        symptoms: [
          "A common pest in southern parts of the country.",
          "Nymphs and adult bugs suck the sap from tender grains at the milk stage.",
          "Nymph and adult make the seed chaffy/shriveled at the end.",
        ],
      },
      {
        name: "Stem borer",
        symptoms: [
          "A nocturnal moth, dirty brownish in color.",
          "Caterpillars feed on foliage and bore into the stem causing 'Dead heart'.",
          "It also tunnels the stem and bores into ear heads.",
        ],
      },
    ],
  },
  {
    name: "Sugarcane",
    pests: [
      {
        name: "White Grub",
        symptoms: [
          "Drying of entire crown.",
          "Cause extensive damage to roots and base of shoot.",
        ],
      },
      {
        name: "Pyrilla",
        symptoms: [
          "Leaves become yellow.",
          "Covered with black sooty mold.",
          "Top leaves get dried up and lateral buds germinate.",
        ],
      },
      {
        name: "Whiteflies",
        symptoms: [
          "In severe cases, it looks like fiery appearance.",
          "It shows very slow growth of the plant.",
          "Infested leaves look white with black dots.",
        ],
      },
      {
        name: "Wooly aphid",
        symptoms: [
          "Large number of white-colored nymphs and adults on the undersurface of the leaf.",
          "Heavy secretion of honeydew leads to the development of sooty mold.",
          "Leaves become brittle and dry completely.",
        ],
      },
      {
        name: "Internode borer",
        symptoms: [
          "Internodes constricted and shortened, with a number of boreholes.",
          "Boreholes are plugged with fresh excreta in the nodal region.",
          "Frass materials are present on the affected portion.",
        ],
      },
    ],
  },
  {
    name: "Banana",
    pests: [
      {
        name: "Pseudostem weevil",
        symptoms: [
          "Reduced plant growth.",
          "Choking of bunch in the pseudostem.",
          "Death of plant.",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "Suck cell sap and devitalize plants.",
          "Affected parts become discolored and malformed.",
          "Observed on the lower surface of the leaves.",
        ],
      },
      {
        name: "Nematode",
        symptoms: [
          "Damaged root tissue.",
          "Small dark spot on the root.",
          "Number of fruits in the bunch is reduced.",
        ],
      },
      {
        name: "Thrips",
        symptoms: [
          "Water-soaked smokey areas.",
          "Rusty red to dark brown-black discoloration on the fingers.",
          "Cracks or splits on mature fruits.",
        ],
      },
    ],
  },
  {
    name: "Lettuce",
    pests: [
      {
        name: "Aphids",
        symptoms: [
          "Stunted growth.",
          "Distorted foliage.",
          "Black and sticky substance on the plant.",
        ],
      },
      {
        name: "Armyworms",
        symptoms: [
          "Severely stunt or kill seedlings.",
          "Small white patches on the underside of the leaves.",
          "Outer leaves are damaged.",
        ],
      },
      {
        name: "Greenflies",
        symptoms: [
          "Leaves and stem of the plant are eaten.",
          "Flies will congregate around the growing tips and young seedlings.",
          "New seedlings and young shoots are attacked especially.",
        ],
      },
      {
        name: "Slugs",
        symptoms: [
          "Silvery deposit on hard surfaces, leaves, stem.",
          "Oddly shaped holes in plant tissue, leaves.",
          "Seedlings can be killed.",
        ],
      },
    ],
  },
  {
    name: "Chilly",
    pests: [
      {
        name: "Thrips",
        symptoms: [
          "Leaves become crinkled, curled upward, and shed.",
          "Buds become brittle and drop down.",
          "In the early stage, infestation leads to stunted growth, flower production, and arrested fruit set.",
        ],
      },
      {
        name: "Mites",
        symptoms: [
          "The affected leaves become inverted boat-shaped.",
          "The leaves roll down along the margin with elongation of petioles.",
          "Younger leaves at the tip of the branch cluster.",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "The honeydew is very sweet, which attracts sooty mold growth, making the leaves turn black.",
          "The pods that develop a black color due to sooty mold lose quality and fetch a low price.",
          "They appear on the tender shoots, leaves, and on the lower surface of the leaves.",
        ],
      },
      {
        name: "Pod borer",
        symptoms: [
          "Bored fruits with round holes.",
          "Internal tissues are severely eaten and completely hollowed out.",
          "Fed leaves, shoots, and buds.",
        ],
      },
    ],
  },
  {
    name: "Lemon",
    pests: [
      {
        name: "Brown citrus aphid",
        symptoms: [
          "Distorted twigs and leaves.",
          "Wilting and yellowing of leaves.",
          "Honeydew promotes colonization by sooty mold.",
        ],
      },
      {
        name: "Citrus leaf miner",
        symptoms: [
          "Leaf deformation with a twisted or curled appearance.",
          "White or gray tunnels on the leaf surface.",
          "Stunted growth and reduced fruit size.",
        ],
      },
      {
        name: "Thrips",
        symptoms: [
          "Scabby, grayish, and silvery scars on the fruit rind.",
          "Insects feed under the sepals of young fruit.",
          "Damaged tissue grows larger as the fruit matures.",
        ],
      },
      {
        name: "Citricolla scale or soft scales",
        symptoms: [
          "Presence of black, brown, or gray flattened scales on leaves, twigs, and branches.",
          "Leaves covered in a sticky substance and may have the growth of sooty mold.",
          "Leaves and fruit dropping from plants.",
        ],
      },
      {
        name: "Citrus psyllid",
        symptoms: [
          "Both nymphs and adults suck sap from the plants and inject toxic saliva.",
          "Excrete honeydew, leading to the growth of sooty molds.",
          "Affected plant parts dry and die away.",
        ],
      },
    ],
  },
  {
    name: "Kidney bean",
    pests: [
      {
        name: "Leaf miner",
        symptoms: [
          "Severely mined leaves may turn yellow and drop.",
          "Severely attacked seedlings are stunted and may eventually die.",
          "It may be seen in the vegetative stage.",
        ],
      },
      {
        name: "Pod borer",
        symptoms: [
          "Early instar larvae scrap the chlorophyll of the leaves.",
          "Mature larvae head bore inside the pods, and the rest of the body remains hanging out.",
          "Pods with irregular big holes.",
        ],
      },
      {
        name: "Stem fly",
        symptoms: [
          "Stem becomes swollen and split, reducing the formation of lateral roots.",
          "Infested stems are often red inside (sometimes pale), and a distinct zig-zag tunnel may be observed, with maggots or pupae inside.",
          "Apart from the exit holes, the plants will initially appear healthy on the outside.",
        ],
      },
      {
        name: "Black aphids",
        symptoms: [
          "Aphids feed by sucking plant sap.",
          "Heavily infested plants usually have wrinkled leaves, stunted growth, and deformed pods.",
          "Plants, in particular young plants, may dry out and die under heavy aphid attack.",
        ],
      },
    ],
  },
  {
    name: "Orange",
    pests: [
      {
        name: "Aphids",
        symptoms: [
          "Leaves curling, and leaves and twigs covered in a sticky substance (honeydew) which may be growing sooty mold.",
          "Insects are small and soft-bodied and are black in color.",
          "Aphids transmit tristeza virus on citrus.",
        ],
      },
      {
        name: "Asian citrus psyllid",
        symptoms: [
          "Tips of leaves in new growth flushes are twisted, and affected leaves do not expand properly.",
          "Trees may show symptoms of citrus greening.",
          "The insect is tiny (4 mm in length) and has a mottled brown appearance. The insect feeds at an angle to the plant, which makes it resemble thorns on the plant leaves.",
        ],
      },
      {
        name: "Leaf miner",
        symptoms: [
          "Citrus leafminer larvae feed by creating shallow tunnels, or mines, in young leaves of citrus trees.",
          "Leaf deformation - twisted or curled appearance.",
          "White or gray tunnels on the leaf surface, stunted growth, and reduced fruit size.",
        ],
      },
    ],
  },
  {
    name: "Garlic",
    pests: [
      {
        name: "Thrips",
        symptoms: [
          "Both nymphs and adults suck plant sap.",
          "The leaves of attacked plants become curled, wrinkled, and gradually dry up.",
          "The plants do not form bulbs nor do the flowers set seed.",
        ],
      },
      {
        name: "Eriophyid mite",
        symptoms: [
          "Leaves do not open completely.",
          "The whole plant shows curling.",
          "Yellow molting is seen, especially on the edges of the leaves.",
        ],
      },
      {
        name: "Red spider mites",
        symptoms: [
          "The upper surface of the leaves becomes stippled with little dots.",
          "The mites tend to feed in 'pockets,' often near the midrib and veins.",
          "Silk webbing produced by these mites is usually visible.",
        ],
      },
      {
        name: "Garlic cutworm",
        symptoms: [
          "The tender plants are found damped at ground level during the night. Young larvae feed gregariously on foliage but later segregate and enter into the soil.",
          "Young larvae are yellowish-grey and later become brown, greasy to touch, and coil when disturbed.",
          "They cut the seedlings at ground level during the night and hide during the day.",
        ],
      },
    ],
  },
  {
    name: "Oil palm",
    pests: [
      {
        name: "Mealy bug",
        symptoms: [
          "Flattened oval to round disc-like insect covered in waxy substance on tree branches.",
          "Insects attract ants which may also be present.",
          "Insect colony may also be associated with the growth of sooty mold due to fungal colonization of sugary honeydew excreted by the insect.",
        ],
      },
      {
        name: "Rhinoceros beetle",
        symptoms: [
          "V-shaped cuts in palm fronds.",
          "Holes in leaf midribs caused by beetles boring into the crown to feed.",
          "Adult insect is a large black beetle with a curved spine on its head.",
        ],
      },
      {
        name: "Rodents",
        symptoms: [
          "Burrows in the fields.",
          "Eaten fruits by rats.",
          "Flower damages by rats.",
        ],
      },
    ],
  },
  {
    name: "Cabbage",
    pests: [
      {
        name: "Cabbage diamondback moth",
        symptoms: [
          "Young caterpillars cause small yellow mines on leaves.",
          "Scrapping of epidermal leaf tissues producing typical whitish patches on leaves.",
          "Full-grown larvae bite holes in the leaves and feed on curd.",
        ],
      },
      {
        name: "Leaf webber",
        symptoms: [
          "Caterpillar webs together the foliage and feeds on leaves.",
          "Caterpillar bears a red head with brown longitudinal stripes.",
          "Green caterpillars web up the leaves and live inside the knotted mass.",
        ],
      },
      {
        name: "Cabbage borer",
        symptoms: [
          "Caterpillars web the leaves and bore into the stem, stalk, or leaf veins.",
          "Bore into the cabbage head, making it unfit for consumption. The damage results in webbed leaves.",
          "Holes in cabbage head with fecal matter.",
        ],
      },
      {
        name: "Cabbage butterfly",
        symptoms: [
          "Damage to the outer leaves is also a clear sign of their presence.",
          "Besides the holes in the outer leaves, the damage to the cabbage head may be visible in the inner leaves when the heart is cut through.",
          "Caterpillars and their excrement are also often found on the plants.",
        ],
      },
    ],
  },
  {
    name: "Corn/maize",
    pests: [
      {
        name: "Stem borer",
        symptoms: [
          "The maggot feeds on the young growing shoots resulting in dead hearts.",
          "Prefers 3-5 leaf stage maize for egg laying.",
          "When the rolled leaves of the whorl unfurl, a series of pinholes and papery windows are visible, which are the first symptoms of spotted stem borer attack.",
        ],
      },
      {
        name: "Fall armyworm",
        symptoms: [
          "Scrapping of leaves, pinholes, or small to medium elongated holes.",
          "Parallel shot holes, loss of the top portion of leaves, or fecal pellets in the leaf whorl.",
          "Can cause serious damage to maize at all stages.",
        ],
      },
      {
        name: "Shoot fly",
        symptoms: [
          "Central shoot withering leading to 'dead heart' is the typical damage symptom.",
          "Bore holes are visible on the stem near the nodes.",
          "Young larva crawls and feeds on tender folded leaves causing a typical 'shot hole' symptom. Affected parts of the stem may show internally tunnelling caterpillars.",
        ],
      },
      {
        name: "Ear head bug",
        symptoms: [
          "Nymphs and adults suck the juice from within the grains when they are in the milky stage.",
          "Grains shrink and turn black in color and ill-filled (or) chaffy.",
          "Orange and pale green nymphs and adults are seen on the ear head.",
        ],
      },
    ],
  },
  {
    name: "Rice",
    pests: [
      {
        name: "Stem borer",
        symptoms: [
          "Presence of a brown-colored egg mass near the leaf tip.",
          "The larvae of these insects bore into the stem and cause damage.",
          "The affected young plants show dead-hearts (yellowing and drying of central shoot), whereas the old ones produce empty earheads which turn white and stand erect.",
        ],
      },
      {
        name: "Rice hispa",
        symptoms: [
          "Scraping of the upper surface of the leaf blade, leaving only the lower epidermis as white streaks parallel to the midrib.",
          "The grubs of this pest tunnel into the leaves, whereas the adults are exposed feeders.",
          "The grubs cause damage by producing bold, white streaks on the leaves.",
        ],
      },
      {
        name: "Leaf folder",
        symptoms: [
          "Leaves fold longitudinally, and larvae remain inside.",
          "Larva scrapes the green tissues of the leaves, becomes white and dry.",
          "During severe infestation, the whole field exhibits a scorched appearance.",
        ],
      },
      {
        name: "Plant hopper",
        symptoms: [
          "These hoppers include whitebacked planthopper and brown plant hopper.",
          "Hopper burn or yellowing, browning, and drying of plants.",
          "Circular patches of drying and lodging of matured plants.",
        ],
      },
      {
        name: "Bugs",
        symptoms: [
          "A mature rice bug seems to be brown mixed with green color, and its baby is green.",
          "If it attacks the rice leaf, the whole plant gets yellowish, whereas if it attacks on panicles, it results in unfilled or empty grains.",
          "A mature mealy bug is small, pink in color with a soft body and covered with wax-like content. Some of these have wings, whereas some of these are wingless.",
        ],
      },
      {
        name: "Mole cricket and ground cricket",
        symptoms: [
          "It is shiny black when it is an adult, and its larva looks brown in color.",
          "Both adults and larvae live under the soil.",
          "Mole cricket has thicker feet and stronger claws, whereas ground cricket is generally jumping types.",
        ],
      },
    ],
  },
  {
    name: "Soybean",
    pests: [
      {
        name: "Stem fly",
        symptoms: [
          "Infected stems are often red inside (sometimes pale) and a distinct zig-zag tunnel may be observed – with maggots or pupae inside.",
          "May even cause plant death, especially in younger plants particularly if damage occurs in the plant’s hypocotyl (basal stem) region.",
          "Large infestations (3 or more maggots per plant) may cause wilting.",
        ],
      },
      {
        name: "Pod borer",
        symptoms: [
          "The young larvae feed on the chlorophyll of young leaves and skeletonize them.",
          "Light pale brownish yellow stout moth.",
          "Forewings are olive green to pale brown with a dark brown circular spot in the center.",
        ],
      },
      {
        name: "White fly",
        symptoms: [
          "Due to attack by the insect, the leaves turn yellow and become curled.",
          "Chlorotic spots and sooty molds develop on the affected tissues.",
          "During heavy infections, these spots may come together and spread over the whole leaf, apart from the area around the veins.",
        ],
      },
      {
        name: "Armyworm",
        symptoms: [
          "Scrapping of leaves, pinholes, or small to medium elongated holes.",
          "Singular or closely grouped circular to irregularly shaped holes in foliage.",
          "Can cause serious damage to soybean at all stages.",
        ],
      },
      {
        name: "Hairy caterpillar",
        symptoms: [
          "Leaves look brownish-yellow in color.",
          "The final instar larvae feed on the leaves from the margin.",
          "The damaged leaves of the plant appear in a skeletonized/net/web form.",
        ],
      },
    ],
  },
  {
    name: "Wheat",
    pests: [
      {
        name: "Aphid",
        symptoms: [
          "Feed on leaves and grain spikes.",
          "While feeding, these aphids can transmit a toxin that causes discoloration and distortion of the plant.",
          "Heavily infested leaves will have white, purple, or yellow streaks, plant and head stunting, and poorly formed grains or no grains at all.",
        ],
      },
      {
        name: "Termites",
        symptoms: [
          "Termites damage the crop soon after sowing and sometimes near maturity.",
          "They feed on the roots, stems of growing plants, and even dead plant tissues feeding on cellulose.",
          "The damaged plants dry up completely and are easily pulled out.",
        ],
      },
      {
        name: "Pink stem borer",
        symptoms: [
          "Drying up of the growing point and formation of 'dead heart' in young plants as a result of larval feeding; sometimes the bottom internodes show circular ring-like cuts.",
          "At ear head stage, 'white ears' are produced.",
          "Presence of a brown-colored egg mass near the leaf tip. In the vegetative stage, the larva enters the stem and feeds on the growing shoot.",
        ],
      },
      {
        name: "Armyworm",
        symptoms: [
          "Leaves may look tattered from the eaten-out leaf margins.",
          "Armyworm generally do not require control during the vegetative stage.",
          "Fecal pellets around the base of plants are another indication of armyworm infestation.",
        ],
      },
    ],
  },
  {
    name: "Olives",
    pests: [
      {
        name: "Fruit fly",
        symptoms: [
          "Economic losses caused by the olive fly include direct damage through fruit drop and weight loss.",
          "Punctures with triangular shape are clearly visible on ripening fruits.",
          "They are first dark green but later turn yellowish-brown and damaged fruit flesh by feeding larvae.",
        ],
      },
      {
        name: "Moth",
        symptoms: [
          "The damage caused by the first generation is reduced yield when infestation is serious.",
          "The second generation can cause real damage and economic loss.",
          "The young larvae, which attack the olives in the pepper grain stage, cause a small amount of fruit to fall.",
        ],
      },
      {
        name: "Black scale",
        symptoms: [
          "Causes intense defoliation, withering of branches, and a general state of vegetative decline that reduces production and can lead to total crop loss in extreme cases.",
          "Young black scales excrete sticky, shiny honeydew on leaves of infested trees.",
          "At first, affected trees and leaves glisten and then become sooty and black in appearance as sooty mold fungus grows on the honeydew.",
        ],
      },
      {
        name: "Mites",
        symptoms: [
          "Olive mites feed on succulent stem and bud tissues and on the upper surface of leaves.",
          "Gross symptoms of mite damage include sickle-shaped leaves.",
          "Dead vegetative buds in spring, discoloration of flower buds, bud drop, blossom blasting, inflorescence abscission, and reduced shoot growth.",
        ],
      },
    ],
  },
  {
    name: "Cauliflower",
    pests: [
      {
        name: "Diamondback moth",
        symptoms: [
          "Young caterpillars cause small yellow mines on leaves.",
          "Scrapping of epidermal leaf tissues producing typical whitish patches on leaves.",
          "Full-grown larvae bite holes in the leaves and feed on the curd.",
        ],
      },
      {
        name: "Leaf webber",
        symptoms: [
          "Caterpillars web together the foliage and feed on leaves.",
          "Caterpillars bear a red head with brown longitudinal stripes.",
          "Green caterpillars live inside the knotted mass of webbed leaves.",
        ],
      },
      {
        name: "Borer",
        symptoms: [
          "Caterpillars web the leaves and bore into the stem, stalk, or leaf veins.",
          "Boring into the head also makes it unfit for consumption.",
          "The damage results in webbed leaves and holes in the head with fecal matter.",
        ],
      },
      {
        name: "Cauliflower butterfly",
        symptoms: [
          "Damage to the outer leaves is a clear sign of their presence.",
          "Besides holes in the outer leaves, damage to the cauliflower head may be visible in the inner leaves when the heart is cut through.",
          "Caterpillars and their excrement are often found on the plants.",
        ],
      },
    ],
  },
  {
    name: "Safflower",
    pests: [
      {
        name: "Aphid",
        symptoms: [
          "The aphids suck the sap from leaves, twigs, flowers, and capsules.",
          "In infested plants, the height, number of leaves, and shoots reduce significantly.",
          "The aphids secrete honeydew, which attracts a black sooty mold.",
        ],
      },
      {
        name: "Gram Pod Borer/ Capsule Borer",
        symptoms: [
          "In the early stage of crop growth, larvae feed on leaves and shoot apices.",
          "Later, the larvae shift to the developing capitula.",
          "The symptoms are perforated leaves, perforated involucral bracts, partially or completely eaten capitula in the bud stage, and bored developing capitula.",
        ],
      },
      {
        name: "Caterpillar",
        symptoms: [
          "Curling and yellowing of tender leaves.",
          "Secrete honeydew-like secretion on the upper surface of the leaves and plant parts, forming a black sooty mold that hinders photosynthetic activity resulting in stunted growth.",
          "Finally, the plants dry up.",
        ],
      },
      {
        name: "Bud Fly/Capsule Fly",
        symptoms: [
          "The maggots that feed on flower buds are destructive, and when fully grown, they are 5 mm long.",
          "The injury is caused by the maggots, which feed upon the floral parts, including the thalamus.",
          "The infested buds begin to rot, and an offensive-smelling fluid oozes at the apices, giving a soaked appearance to the buds. The pest causes a reduction in the yield of safflower seed.",
        ],
      },
    ],
  },
  {
    name: "Coffee",
    pests: [
      {
        name: "Berry Borer",
        symptoms: [
          "Coffee berry borer is the most serious pest of coffee worldwide.",
          "The female beetle bores into the berries through the navel region and makes tunnels in the hard bean, laying about 15 eggs.",
          "The larvae feed on the beans, making small tunnels. A typical pinhole at the tip of the berries indicates the presence of the pest, which damages young as well as ripe berries. In severe infestation, 30 to 80% of berries may be affected, resulting in heavy crop loss.",
        ],
      },
      {
        name: "White Stem Borer",
        symptoms: [
          "Serious pest of Arabica coffee.",
          "Infested plants show external ridges around the stem.",
          "Affected plants also show yellowing and wilting of leaves.",
        ],
      },
      {
        name: "Shot Hole Borer",
        symptoms: [
          "Withered (faster in young branches and delayed in older twigs) or dried branches, attacked leaves fall prematurely.",
          "Terminal leaves wilt, droop, and dry up.",
          "Severe infestation can result in the loss of a considerable number of productive branches.",
        ],
      },
      {
        name: "Red Borer",
        symptoms: [
          "The larva causes damage in Arabica and Robusta coffee by boring into young stems, primary and secondary branches to feed on the wood.",
          "In the early stages of attack, young plants or branches show signs of wilting. Infested parts bear one or two holes through which pellet-like excrement of the larva hangs out and accumulates at the base of the plant.",
          "In advanced cases, the branch or the whole plant dries up.",
        ],
      },
    ],
  },

  {
    name: "Cotton",
    pests: [
      {
        name: "American Boll Worm",
        symptoms: [
          "Bolls showing regular, circular bore holes.",
          "Larvae seen feeding on the boll by thrusting their heads alone inside and leaving the rest of the body outside.",
          "Presence of granular fecal pellets outside the bore hole. A single larva can damage 30-40 bolls.",
        ],
      },
      {
        name: "Spotted Boll Worm",
        symptoms: [
          "Drying and drooping of terminal shoots during the pre-flowering stage, shedding of squares and young bolls.",
          "Flaring up of bracts during square and young boll formation stage.",
          "Holes on bolls and rotting of bolls.",
        ],
      },
      {
        name: "Pink Boll Worm",
        symptoms: [
          "Rosetted flowers. The holes of entry plugged by excreta of larvae feeding inside the seed kernels.",
          "They cut window holes (interlocular burrowing) in the two adjoining seeds, thereby forming 'double seeds'.",
          "The attacked buds and immature bolls drop off. Discolored lint and burrowed seeds.",
        ],
      },
      {
        name: "Jassid",
        symptoms: [
          "Adults are small, like the tip of a lentil, and flat. Adults are usually yellowish-green or white with black spots on the front wings.",
          "The cotton jassid sucks sap from the underside of leaves and leaf buds. When jassids are abundant, cotton growth is stunted, the leaves turn downwards, and heavy fruit loss may occur on pre-flowering plants.",
          "Leaves turn pale, and a rust-red color develops at the edges. During a severe attack, leaf shedding occurs.",
        ],
      },
      {
        name: "Aphid",
        symptoms: [
          "Both adults and nymphs suck sap from the tender leaves, twigs, and buds, weakening the plants.",
          "Each aphid makes several punctures and excretes honeydew, which encourages the development of sooty mold on twigs and leaves, leaving a blackened look on the plants.",
          "Honeydew attracts ants, and sooty mold aids in the development of pathogenic bacteria.",
        ],
      },
    ],
  },
  {
    name: "Beans",
    pests: [
      {
        name: "Aphid",
        symptoms: [
          "Colonies of aphids clustered on young stems, leaves, and buds.",
          "A sticky substance on the plant or leaves, known as honeydew.",
          "Honeydew can attract ant colonies, black sooty mold, and premature leaf fall.",
        ],
      },
      {
        name: "Mexican Bean Beetle",
        symptoms: [
          "Irregular patches of feeding damage on the underside of leaves, causing the top surface of the leaf to dry out and giving the leaves a lacy appearance.",
          "Insect will also damage flowers and small pods; pods may be damaged so badly that they drop from the plant.",
          "Adult insect is an orange-brown beetle with black spots; larvae are fat-bodied grubs which taper at the end and have rows of conspicuous spines.",
        ],
      },
      {
        name: "Leafminers",
        symptoms: [
          "Thin, white, winding trails on leaves; heavy mining can result in white blotches on leaves and premature leaf drop.",
          "Early infestation can cause reduced fruit yield.",
          "Adult leafminer is a small black and yellow fly which lays its eggs in the leaf; larvae hatch and feed on the leaf interior.",
        ],
      },
      {
        name: "Corn Earworm",
        symptoms: [
          "Larvae damage leaves, buds, flowers, pods, and beans; young caterpillars are cream-white in color with a black head and black hairs.",
          "Older larvae may be yellow-green to almost black in color with fine white lines along their body and black spots at the base of hairs.",
          "Eggs are laid singly on both upper and lower leaf surfaces and are initially creamy white but develop a brown-red ring after 24 hours and darken prior to hatching.",
        ],
      },
      {
        name: "Stinkbugs",
        symptoms: [
          "Dark-colored pinpricks on fruit surrounded by a lighter area that turns yellow or remains light green.",
          "Stink bugs often carry pathogens in their mouthparts, which can cause secondary infections and decay of fruit.",
          "Adult insect is shield-shaped and brown or green in color; may have pink, red, or yellow markings.",
        ],
      },
    ],
  },
  {
    name: "Tomato",
    pests: [
      {
        name: "Gram Pod Borer",
        symptoms: [
          "Young larvae feed on tender foliage.",
          "Mature larvae bore circular holes.",
          "Thrust only a part of its body into fruit and eat the inner content.",
        ],
      },
      {
        name: "Leaf Eating Caterpillar",
        symptoms: [
          "The young larvae first feed gregariously and scrape the leaves.",
          "Older larvae spread out and may completely devour the leaves.",
          "Resulting in poor growth of plants.",
        ],
      },
      {
        name: "Whitefly",
        symptoms: [
          "Chlorotic spots and yellowing.",
          "Downward curling and drying of leaves.",
          "Vector of tomato leaf curl disease.",
        ],
      },
      {
        name: "Serpentine Leaf Miner",
        symptoms: [
          "Irregular or serpentine pale grey lines appear on both sides of the leaf blades as the larvae feed.",
          "These burrows are usually limited by the leaf veins and contain black fecal material visible as slim traces inside the tunnels.",
          "Entire leaves may be covered with mines. Damaged leaves may drop prematurely (defoliation).",
        ],
      },
      {
        name: "Thrips",
        symptoms: [
          "Silvery streaks on the leaf surface.",
          "Premature dropping of flowers.",
          "Vector of tomato spotted wilt virus.",
        ],
      },
      {
        name: "Pinworm",
        symptoms: [
          "This caterpillar feeds on leaves and creates blotch-type mines but causes most of its damage when it attacks the fruit.",
          "Where abundant, the tomato pinworm may seriously damage foliage and infest nearly 100% of the fruit.",
          "Larvae normally enter the fruit through the calyx, but when populations are high, they may enter at any point on the fruit's surface. They make dry burrows and do not penetrate very far into the fruit.",
        ],
      },
      {
        name: "Red Spider Mite",
        symptoms: [
          "Severe infestation larvae silken webbing on the leaves, wither, and dry.",
          "The tomato red spider mite can be found on both sides of leaves but it prefers the undersides near the leaf veins. Feeding causes leaves to become yellowish-white and mottled.",
          "Tomato red spider mite produces webbing, especially on the undersides of leaves. In high infestations, dense webbing can mummify plants. Leaf defoliation follows infestation, and plants may die in severe attacks.",
        ],
      },
    ],
  },
  {
    name: "Black Pepper",
    pests: [
      {
        name: "Anthracnose",
        symptoms: [
          "Adults feed on growing points, tender shoots, leaves, tender spikes, and berries.",
          "Grubs bore into the berries and cause black color, which crumbles when pressed.",
          "The infested berries turn yellow initially and then black, crumble when pressed.",
        ],
      },
      {
        name: "Top Shoot Borer",
        symptoms: [
          "The caterpillars of the moth bore into tender shoots, which turn black and dry up.",
          "When successive new shoots are attacked, the growth of the vine is affected.",
          "Basal half of the forewing black and distal half orange-red.",
        ],
      },
      {
        name: "Leaf Gall Thrips",
        symptoms: [
          "The feeding of thrips on tender leaves causes the leaf margins to curl down and inwards, resulting in the formation of marginal leaf galls.",
          "The infested leaves become thick, malformed, and crinkled.",
          "In severe cases of infestation, the growth of young vines is affected.",
        ],
      },
      {
        name: "Scale Insects",
        symptoms: [
          "Scale insects appear as encrustations on stems, leaves, and berries.",
          "They feed on plant sap, resulting in yellowing and drying of infested portions of the vines.",
          "In severe cases of infestation, the affected portions of vines dry up.",
        ],
      },
    ],
  },

  {
    name: "Nutmeg&Mace",
    pests: [
      {
        name: "Black Scale",
        symptoms: [
          "The black scale (Saissetia nigra) infests tender stems and leaves, especially in the nursery and sometimes young plants in the field.",
          "The scales are clustered together and are black, oval, and dome-shaped.",
          "They feed on plant sap, and severe infestations cause the shoots to wilt and dry.",
        ],
      },
      {
        name: "White Scale",
        symptoms: [
          "The white scale (Pseudaulacaspis cockerelli) is greyish white, flat, and shaped like a fish scale and occurs clustered together on the lower surface of leaves, especially in nursery seedlings.",
          "The pest infestation results in yellow streaks, spots on affected leaves, and in severe infestations, the leaves wilt and dry.",
        ],
      },
      {
        name: "Shield Scale",
        symptoms: [
          "The shield scale (Protopulvinaria mangiferae) is creamy brown and oval and occurs on tender leaves and stems, especially in nursery seedlings.",
          "The pest infestation results in wilting of leaves and shoots.",
        ],
      },
      {
        name: "Leaf Beetle",
        symptoms: [
          "Adults feed on both abaxial and adaxial sides of the leaves by scraping the green matter.",
          "They produce characteristic scars. Heavily-fed leaves dry up completely and fall off.",
          "Total drying up of branches was also observed.",
        ],
      },
    ],
  },
  {
    name: "Sunflower",
    pests: [
      {
        name: "Capitulum Borer",
        symptoms: [
          "The larva feeds on the developing seeds and bores into the head.",
          "Fungal development occurs, and the head starts rotting.",
          "The larva consumes leaves in the early stage of growth and then moves towards the capitulum, tunneling the head.",
        ],
      },
      {
        name: "Tobacco Caterpillar",
        symptoms: [
          "The larvae feed on tender leaves, shoots, bracts, and petals.",
          "Later, the larvae spread in the field, causing defoliation.",
          "The larvae also feed on developing seeds in the capitulum.",
        ],
      },
      {
        name: "Leaf Hopper",
        symptoms: [
          "The adult and nymphs suck the plant sap.",
          "The infected leaves show pale yellow coloration.",
          "In case of heavy infestation, the leaves turn inwards. The leaf edges may turn light pinkish-brown.",
        ],
      },
      {
        name: "Sunflower Beetle",
        symptoms: [
          "Defoliation Enlarged seeds that lack a kernel, Empty kernels, as it can completely consume seeds",
          "Reduced seed weight and oil content, Partially empty kernels, as it can consume about ⅓ of the kernel, ",
          "Reduced seed weight and oil content, Smaller holes on leaf surfaces from mature sunflower beetle feeding, Large “windows” on foliage from larvae feeding",
        ],
      },
    ],
  },
  {
    name: "Apple",
    pests: [
      {
        name: "Woolly Aphids",
        symptoms: [
          "Nymphs and adults suck cell sap from the bark of twigs and underground parts.",
          "Underground feeding produces large knots on roots.",
          "Heavily infested plants have a short fibrous root system and yellowish foliage that can be easily uprooted.",
        ],
      },
      {
        name: "San Jose Scale",
        symptoms: [
          "Nymph and female scales attack all above-ground parts.",
          "Feeding sites turn into a characteristic purplish-red color.",
          "Initially growth of plant is checked but as scale increases in number plant may die. Fruits will have distinct “measles” spots on the surface.",
        ],
      },
      {
        name: "Codling Moth",
        symptoms: [
          "It is a direct pest and hence causes severe damage to the fruit.",
          "Neonate larva enters the fruit through the calyx and feeds on the seed.",
          "Infested fruits lose their shape and fall prematurely.",
        ],
      },
      {
        name: "European Red Mite",
        symptoms: [
          "European red mites feed on leaves.",
          "Severe mite injury produces browning and loss of color in the leaves, i.e., bronzing.",
          "Followed by leaf drop and weakening of fruit buds.",
        ],
      },
    ],
  },
  {
    name: "Mango",
    pests: [
      {
        name: "Mango Hopper",
        symptoms: [
          "Adults and nymphs suck sap from tender shoots and flowers, causing drying of flowers and subsequent dropping. It secretes honeydew that develops sooty mold, reducing photosynthesis.",
          "Heavy puncturing and continuous draining of the sap cause curling and drying of the infested tissue.",
          "Hoppers shelter in the cracks and crevices of the bark or underside of the leaves of the trees during the off season.",
        ],
      },
      {
        name: "Mango Mealy Bug",
        symptoms: [
          "Nymphs and adults suck plant sap and secrete honeydew that develops sooty mold.",
          "Grubs tunnel in the sapwood on the trunk or branches, making irregular tunnels.",
        ],
      },
      {
        name: "Mango Bark Eating Caterpillar",
        symptoms: [
          "Caterpillars bore into the trunk or junction of branches, making zigzag galleries. Presence of galleries made out of silk and frass is the key symptom.",
          "Caterpillars remain hidden in the tunnel during the daytime, come out at night, and feed on the bark.",
          "Due to infestation, the flow of sap is hindered, plant growth is arrested, and fruit formation is drastically reduced.",
        ],
      },
      {
        name: "Mango Fruit Fly",
        symptoms: [
          "The female punctures fruits with its pointed ovipositor and inserts eggs inside.",
          "Infested fruits exhibit puncture marks and oozing.",
          "After hatching, the maggot feeds on the pulp of the fruit, resulting in dropping and rotting of the fruit.",
        ],
      },
      {
        name: "Inflorescence Midge",
        symptoms: [
          "It attacks floral buds, tender fruits, and tender leaves.",
          "The infested mango buds, shoots, and young fruits develop many small blister galls, each containing a yellow maggot.",
          "In severe attacks, the affected plant parts shrivel and die, and small emergence holes may be detected on galls.",
        ],
      },
      {
        name: "Mango Stem Borer",
        symptoms: [
          "Grubs start feeding below the bark of branches, making tunnels, and subsequently bore into the main stem.",
          "Frass coming out of the entry point indicates the presence of the trunk borer.",
          "Damage results in yellowing of leaves, followed by drying of terminal shoots and branches, leading to the death of the whole tree.",
        ],
      },
      {
        name: "Mango Seed Weevil",
        symptoms: [
          "Grubs make zigzag tunnels in pulp, eat unripe tissue, and bore into cotyledon.",
          "Fruit dropping at the marble stage.",
          "Oviposition injuries on marble-sized fruits.",
        ],
      },
      {
        name: "Mango Leaf Webber",
        symptoms: [
          "Larva is pale green with brown head and prothoracic shield.",
          "Adult is brownish moth with wavy lines on forewings.Initially caterpillars feed on leaf surface gregariously by scrapping.Later they make web on tender shoots and leaves together and feed within.",
          "Several caterpillars may be found in a single webbed up cluster of leaves.",
        ],
      },
      {
        name: "Mango Shoot Gall Psylla",
        symptoms: [
          "Nymphs suck cell sap from adjacent buds.",
          "As a result of feeding, buds develop into hard conical green galls.",
          "Consequently, there is no flowering and fruit setting. Nymphs over winter inside the galls.",
        ],
      },
    ],
  },
  {
    name: "Quinoa",
    pests: [
      {
        name: "Quinoa Moth",
        symptoms: [
          "Short and stunted roots",
          "The damage is mainly on the panicle.",
          "The larvae rasp or chew the foliage.",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "Colonize on the underside of tender leaves",
          "Premature shedding of flowers and curling of leaves",
          "Wilting and distortion of leaves and young shoots",
        ],
      },
      {
        name: "Leaf Miner Flies",
        symptoms: [
          "Bore hole symptoms",
          "Feeding punctures appear as white speckles",
          "Mines in affected leaves are usually white with dampened black and dried brown areas, and are usually associated with the midrib and lateral leaf veins",
        ],
      },
    ],
  },
  {
    name: "Cardamom",
    pests: [
      {
        name: "Shoot and Capsule Bore",
        symptoms: [
          "Bore hole symptoms on shoots",
          "Drying up of entire central leaf",
          "Empty capsules",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "Immature capsules",
          "Shredding of flowers",
          "Stunted panicles",
        ],
      },
      {
        name: "Shoot Fly",
        symptoms: [
          "Drying of shoot",
          "Tip of shoot becomes brown",
          "Bore hole symptoms on shoots",
        ],
      },
      {
        name: "Green Mite",
        symptoms: [
          "Small yellow chlorotic spots on leaves",
          "Dieback of leaves and tiny leaf production",
          "Candlestick appearance",
        ],
      },
      {
        name: "Mealy Bug",
        symptoms: [
          "Spread of viral disease",
          "Sooty mould on leaves",
          "Honeydew secretion",
        ],
      },
      {
        name: "Whitefly",
        symptoms: [
          "Development of sooty mould",
          "Leaves drying",
          "Chlorotic spots and yellowing",
        ],
      },
      {
        name: "Variegated Cricket",
        symptoms: [
          "Chews leaves, petioles, and green stems",
          "Defoliation",
          "Removal of bark from the stem",
        ],
      },
    ],
  },
  {
    name: "Sorghum",
    pests: [
      {
        name: "Earhead Bug",
        symptoms: [
          "Nymphs and adult suck the juice from within the grains when they are in the milky stage",
          "Grains shrink and turn black in colour and ill filled (or) chaffy",
          "Presence of large number of nymphs and adults are seen on the ear head",
        ],
      },
      {
        name: "Ear Head Caterpillar",
        symptoms: [
          "Earheads are partially eaten with chalky appearance",
          "Feacal pellets are visible within the ear heads",
        ],
      },
      {
        name: "Pink Stem Borer",
        symptoms: [
          "Central shoots dried and produce the dead hearts",
          "The pink larva bores into the stem and damages the central shoot resulting in dead heart",
        ],
      },
      {
        name: "Plant Lice (Aphids)",
        symptoms: [
          "Colonies of aphids are seen in central leaf whorl, stems, or in panicles",
          "The young and adults suck the plant juice",
          "This frequently causes yellowish mottling of the leaves and marginal leaf necrosis",
        ],
      },
      {
        name: "Shoot Bug",
        symptoms: [
          "Plants become unhealthy stunted and yellow",
          "The leaves wither from top downwards",
          "Panicle formation is inhibited and the plants die if attack is severe",
        ],
      },
      {
        name: "Shootfly",
        symptoms: [
          "The larva cuts the growing point, resulting in wilting and drying of the central leaf known as 'deadheart'",
          "The damaged plants produce side tillers, which may also be attacked",
          "During the rainy season, shoot fly damage is greater in crops planted 15-20 days later than the first monsoon rains or when the rainfall is erratic and farmers resort to staggered plantings",
        ],
      },
      {
        name: "Sorghum Cutworm",
        symptoms: [
          "Newly hatched larvae feed on weeds, and/or young maize plants if present, leaving small irregular holes in the leaves. Such early feeding is of little significance to plants",
          "Larger larvae may completely cut through stalks, which can cause plants to wilt and die",
          "They sometimes drag cut plants under soil clods or into small holes in the soil to continue their feeding during the daylight hours",
        ],
      },
      {
        name: "Sorghum Midge",
        symptoms: [
          "Maggot feed on the developing ovary inside the glumes: this results in empty or chaffy spikelets as shrivelled grains fail to develop",
          "During the grain filling or milk stage, if damaged spikelets are pressed between the finger and thumb or between a pair of forceps, they produce a red ooze: the body contents of the midge larva or pupa",
          "Damaged panicles have small, transparent midge pupal cases attached to the tip of the damaged spikelets",
        ],
      },
      {
        name: "Stem Borer",
        symptoms: [
          "Withering and drying of central shoot - 'dead heart'",
          "Red mining in the midrib",
          "Tender folded leaves have parallel 'shot hole'",
        ],
      },
    ],
  },
  {
    name: "Tobacco",
    pests: [
      {
        name: "Tobacco Caterpillar",
        symptoms: [
          "The young caterpillars are light green with black head or black spots and mine on the leaf tissues",
          "The young larvae first feed gregariously and scrape the leaves",
          "Older larvae spread out and may completely devour the leaves resulting in poor growth of plants",
        ],
      },
      {
        name: "Stem Borer",
        symptoms: [
          "The tiny caterpillars bore inside the stem and midribs and feed on internal tissues",
          "Due to larval feeding seedlings and young plants have stem galls and sprouted side branches; plants stunted, distorted and withered",
          "As a result, swelling appears where the borer stays",
        ],
      },
      {
        name: "Whitefly",
        symptoms: [
          "These tiny white flies cause leaf curl disease in both nursery and mainfield",
          "The leaves of curled plants are twisted, puckered, and thickened with abnormally prominent veins",
          "The plants show stunted growth and the yields are reduced",
        ],
      },
      {
        name: "Green Peach Aphid",
        symptoms: [
          "They secrete sugary juice known as 'honey dew' on the leaves due to which sooty mould develops rendering the leaves unfit for curing",
          "By constantly sucking the sap from leaves, they make the plant pale and sickly and thereby retard the growth",
          "The leaves curled and crinkled",
        ],
      },
      {
        name: "Capsule Borer",
        symptoms: [
          "During the vegetative phase larvae feed on bud leaves and surrounding leaves",
          "During flowering/capsule formation stage larvae feed on flower buds, flowers, and capsules",
          "Seeds are eaten severely and completely hollowed out",
          "Bored capsules with round holes",
        ],
      },
      {
        name: "Ground Beetles",
        symptoms: [
          "Cut the stem of newly transplanted seedlings",
          "This damage is usually noticed more in dry years and during prolonged hot spells immediately after planting",
          "In some years, the damage is so heavy that replanting becomes necessary",
        ],
      },
      {
        name: "Root Knot Nematode",
        symptoms: [
          "Roots branch profusely starting from the gall tissue causing a 'beard root' symptom",
          "Infected roots become knobby and knotty",
          "Plants wilt during the hot part of the day, especially under dry conditions, and are often stunted",
        ],
      },
    ],
  },
  {
    name: "Ginger",
    pests: [
      {
        name: "Shoot borer",
        symptoms: [
          "Yellowing and drying of infested shoots",
          "Boreholes on shoot",
          "Withered central shoot",
        ],
      },
      {
        name: "Rhizome flies",
        symptoms: [
          "Yellowing of plants",
          "Rotting of rhizomes",
          "Dead heart symptoms",
        ],
      },
      {
        name: "Thrips",
        symptoms: [
          "Leaves become crinkled, curled upward, and shed",
          "Leaves become pale and dries up",
          "Early-stage infestation leads to stunted growth",
        ],
      },
      {
        name: "Rhizome scales",
        symptoms: [
          "Adult (female) scales feed on sap",
          "The rhizomes are severely infested, they become shriveled and desiccated affecting its germination",
          "In the initial stage of infestation, the white-colored scales are seen scattered on rhizomes and later they congregate near the growing buds",
        ],
      },
    ],
  },
  {
    name: "Papaya",
    pests: [
      {
        name: "Mealy bug",
        symptoms: [
          "Flattened oval to round disc-like insect covered in waxy substance on tree branches",
          "Insects attract ants which may also be present",
          "Insect colony may also be associated with growth of sooty mold due to fungal colonization of sugary honeydew excreted by the insect",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "Colonize on the underside of tender leaves",
          "Premature shedding of flowers and curling of leaves",
          "Wilting and distortion of leaves and young shoots",
        ],
      },
      {
        name: "Fruit fly",
        symptoms: [
          "The female punctures outer wall of mature fruits with the help of its pointed ovipositor and insert eggs in small clusters inside mesocarp of mature fruits",
          "On hatching, the maggots feed on fruit pulp",
          "The infested fruits start rotting due to further secondary infection",
        ],
      },
      {
        name: "Grasshopper",
        symptoms: [
          "Both nymphs and adults suck the sap from the lower leaf surfaces which leads to yellowing",
          "When several insects suck the sap from the same leaf, yellow spots appear on the leaves",
          "Crinkling, curling, bronzing, and drying, or “hopper burn”",
        ],
      },
    ],
  },
  {
    name: "Grape",
    pests: [
      {
        name: "Grape Berry Moth",
        symptoms: [
          "First-generation larvae feed on single flower buds in late spring or early summer",
          "Second-generation larvae (mid summer) first feed externally on green berries. They later penetrate them and hollow them out, leaving only the skin and seed",
          "Third-generation larvae (late summer) cause the greatest damage by feeding inside the berries and within bunches, which then gradually dry",
        ],
      },
      {
        name: "Grape Thrips",
        symptoms: [
          "Small silver patches are seen on the upper side of leaf blades, an effect known as silvering",
          "The same patches can appear on petals where the pigment has been removed",
          "Yellowing of leaves, deformation of leaves, flowers and fruits",
        ],
      },
      {
        name: "Grape Leaf Miner Flies",
        symptoms: [
          "Tunnel-like grey lines on the leaves",
          "Tunnels delimited by leaf veins",
          "Leaf may drop prematurely",
        ],
      },
      {
        name: "Grape Mealy Bugs",
        symptoms: [
          "Nymphs and adults of mealy bugs suck sap from the leaves, tender shoots, and the fruits. Leaves show characteristic curling symptoms similar to that of a virus",
          "A heavy black sooty mould may develop on the honeydew like droplets secreted by mealy bugs. If the flower blooms are attacked the fruit set is affected",
          "When the fruits are infested they can be entirely covered with the mealy bug. The infestation may lead to fruit drop or the fruits remain on the shoots in a dried and shriveled condition",
        ],
      },
      {
        name: "Grape Stem borer",
        symptoms: [
          "The adult beetles lays eggs on the trunk, branches or the stem and the grubs, which hatch, bore into the stem directly. Wood dust and faecal matter at the base of the vine is indication of the borer activity",
          "The adults feed on the outer bark of the vine by scraping. The portion of vines above the damaged part has a sticky appearance",
          "The leaves turn yellow in patches that resemble micronutrient deficiency, which ultimately dry and drop down",
        ],
      },
    ],
  },
  {
    name: "Watermelon",
    pests: [
      {
        name: "Red pumpkin beetle",
        symptoms: [
          "Seedlings may be completely destroyed by adult feeding",
          "Older plants have foliage riddled with holes or completely defoliated, and the floral parts, including anthers are nibbled",
          "Feeding by larvae causes rotting and withering of the roots and stems",
        ],
      },
      {
        name: "Fruit fly",
        symptoms: [
          "The female fruit fly lays eggs under the skin of the fruit, which causes small puncture marks on the surface of the watermelon",
          "The damage caused by the fruit flies can cause rotting and premature dropping of fruits",
          "Infected fruits become distorted and malformed",
        ],
      },
      {
        name: "Thrips",
        symptoms: [
          "Thrips feed on the leaf surface and suck the plant juice causing small, silvery white or stippling spots on the leaves",
          "Under severe infestation, the leaves turn yellow, wither and become deformed. This can lead to reduced plant growth and yield",
          "They may feed on the flowers of the plant, causing them to drop prematurely, which can reduce the number of fruit that the plant produces",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "Infesting tender shoots and under surface of the leaves",
          "Curling and crinkling of leaves",
          "Development of black sooty mould due to the excretion of honeydew",
        ],
      },
      {
        name: "Whitefly",
        symptoms: [
          "Feeding activity of nymph and adult may lead to yellowing, downward curling and drying of leaves",
          "They also cause sooty mould development due to honeydew secretion causing restricted photosynthesis",
          "It can cause the leaves to turn yellow (chlorotic spots) and fall off prematurely",
        ],
      },
      {
        name: "Leaf eating caterpillar",
        symptoms: [
          "Caterpillars feed on the young and tender leaves of watermelon plants, which can result in holes and ragged edges on the leaves",
          "They fold the leaves and scrape the epidermal layer of leaves causing skeletonization of the leaves, where only the veins of the leaf remain intact",
          "Under severe infestation, it can cause defoliation of leaves, thus reducing plant growth and vigor, resulting in smaller plants and fruit",
        ],
      },
      {
        name: "Serpentine Leaf Miner",
        symptoms: [
          "Serpentine leaf miners create winding, snake-like tunnels on the leaves as they feed on the leaf tissue",
          "It can cause the infested leaves to turn yellow or brown",
          "Under severe infestation, these leaves dry and drop off from the plant",
        ],
      },
      {
        name: "Red Spider Mite",
        symptoms: [
          "This results, leading to the formation of white or yellow speckles on the leaves",
          "In severe infestations, leaves completely desiccate and drop off",
          "The mites also produce webbing on the leaf surfaces in severe conditions",
        ],
      },
      {
        name: "Cutworms",
        symptoms: [
          "Cutworms often feed on the stems of young watermelon plants, cutting them at or near the soil line. This can cause the plant to wilt or die",
          "They feed on the leaves, causing irregular holes or notches in the foliage",
          "They are nocturnal and may not be visible during the day, but emerge at night, by burrowing in the soil near the base of the plant",
        ],
      },
      {
        name: "Cucumber Beetle",
        symptoms: [
          "Larvae feed on the roots of the plants, causing wilting and stunting",
          "Adult cucumber beetles feed on the foliage of watermelon plants, causing defoliation and thus reduces photosynthesis",
          "They feed on the surface of the watermelon fruit, leaving shallow, irregularly shaped scars on the rind",
        ],
      },
    ],
  },
  {
    name: "Blueberry",
    pests: [
      {
        name: "Mites",
        symptoms: [
          "Blistered red scales on buds; misshapen flowers, small leaves and fruit",
          "Damage may lead to poor growth and yields",
          "Mites are microscopic and difficult to see with the naked eye",
        ],
      },
      {
        name: "Blueberry flea beetle",
        symptoms: [
          "Small holes or pits in leaves that give the foliage a characteristic “shothole” appearance.",
          "Young plants and seedlings are particularly susceptible",
          "Plant growth may be reduced; if damage is severe the plant may be killed",
        ],
      },
      {
        name: "Sharpnosed leafhopper",
        symptoms: [
          "Blueverry stunt",
          "Retard growth, leaves become whitened, stippled or mottled.",
          "Tips may wither and die",
        ],
      },
      {
        name: "Thrips",
        symptoms: [
          "Leaves curling around the stem beginning at stem tip",
          "Leaves may be distorted",
          "Flowers may be damaged",
        ],
      },
    ],
  },
  {
    name: "Broccoli",
    pests: [
      {
        name: "Aphid",
        symptoms: [
          "Aphids are small, soft-bodied, pear-shaped insects.",
          "Aphids can cause stunted growth with curled or distorted leaves and can weaken the plant.",
          "White cast skins of aphids can accumulate on the upper surface of leaves",
        ],
      },
      {
        name: "Cutworm",
        symptoms: [
          "The size caterpillar larva is about 3 to 4 cm long; they are gray or brown in colour.",
          "The larva may cut several plants in a single night.",
          "They hide in the daytime and feed at night",
        ],
      },
      {
        name: "Diamondback moth",
        symptoms: [
          "Young caterpillars cause small yellow mines on leaves.",
          "Scrapping of epidermal leaf tissues producing typical whitish patches on leaves.",
          "Full-grown larvae bite holes in the leaves and feeds on curd",
        ],
      },
      {
        name: "Butterfly",
        symptoms: [
          "Damage to the outer leaves is also a clear sign of their presence",
          "Beside the holes in the outer leaves, the damage to the broccoli may be visible in the inner leaves when the heart is cut through",
          "Caterpillars and their excrement are also often found on the plants",
        ],
      },
    ],
  },
  {
    name: "Avocado",
    pests: [
      {
        name: "False codling moth",
        symptoms: [
          "FCM larvae tunnel into the fruit, leaving behind a characteristic entry hole and a brown.",
          "Corky patch on the fruit surface feeding on the pulp and seeds.",
          "Larvae can cause fruit to drop prematurely from the tree.",
        ],
      },
      {
        name: "Thrips",
        symptoms: [
          "Thrips feed on the leaves of avocado trees, causing them to become distorted, curled, and discolored.",
          "The leaves may also have a silvery appearance.",
          " It can damage the flowers of avocado trees, resulting in reduced fruit set and yield.",
        ],
      },
      {
        name: "Scales",
        symptoms: [
          "Scales feed on the sap of avocado leaves, causing them to turn yellow and wilt.",
          "The leaves may also have a sticky residue on them and it can cause damage to the bark of avocado trees, resulting in cracks and lesions.",
          "This can lead to reduced tree vigor and yield.",
        ],
      },
      {
        name: "Fruit fly",
        symptoms: [
          "Fruit flies lay their eggs in the skin of the avocado fruit, resulting in small puncture marks on the surface, The eggs hatch into larvae, which feed on the flesh of the avocado fruit.",
          "This can result in the fruit becoming soft and mushy, and may also cause premature ripening and In severe cases of fruit fly infestation.",
          "The avocado fruit may drop prematurely from the tree.",
        ],
      },
    ],
  },
  {
    name: "Pineapple",
    pests: [
      {
        name: "Mealy bug",
        symptoms: [
          "Ants and mealy bugs pose a serious threat to pineapple production because the ants carry the mealy bugs from diseased plants onto healthy plants resulting in the spread of the disease throughout the field.",
          "Severe infestations can cause wilting of the leaves with the leaves eventually turning orange-brown and withering.",
          "Control becomes more difficult if there are weeds and other local plants acting as hosts for the mealy bug. Initial control should be directed against the ants to ensure success.",
        ],
      },
      {
        name: "Nematodes",
        symptoms: [
          "Pest nematodes are tiny slender unsegmented worms that infest plant roots, reducing root growth and causing root death thus reducing the plant’s ability to absorb water and nutrients.",
          "The result is a poorly developed root system causing stunting of plants.",
          "Leaves turn yellow  and then red and are less erect than those of healthy plants. Tips are withered.",
        ],
      },
      {
        name: "Butterfly larvae",
        symptoms: [
          "Butterfly larvae can damage flowers.",
          "The adult butterflies lay eggs when the plants are at the flowering stage.",
          "Fruits are also affected by larvae.",
        ],
      },
      {
        name: "Rodents",
        symptoms: [
          "Rats can be very destructive pests in pineapple fields and also pose a serious hazard to pineapples in storage",
          "Rats damage pineapples in the field when they bite, urinate and or defecate on the crop making the fruits unmarketable.",
          "Even higher crop loss due to rodent damage may occur where pineapples are stored",
        ],
      },
    ],
  },
  {
    name: "Turmeric",
    pests: [
      {
        name: "Shoot borer",
        symptoms: [
          "Yellowing and drying of infested shoots.",
          "Boreholes on shoot",
          "Withered central shoot",
        ],
      },
      {
        name: "Leaf roller",
        symptoms: [
          "Leaves become folded or rolled longitudinally",
          "Complete defoliation",
          "Webbing of leaves",
        ],
      },
      {
        name: "Thrips",
        symptoms: [
          "Leaves become crinkled, curled upward and shed.",
          "Leaves becomes pale and dries up",
          "Early-stage, infestation leads to stunted growth",
        ],
      },
      {
        name: "Rhizome scales",
        symptoms: [
          "Adult (female) scales feed on sap",
          "The rhizomes are severely infested, they become shriveled and desiccated affecting its germination.",
          "In initial stage of infestation, the white coloured scales are seen scattered on rhizomes and later they congregate near the growing buds.",
        ],
      },
    ],
  },
  {
    name: "Strawberry",
    pests: [
      {
        name: "Aphid",
        symptoms: [
          "Usually green or yellow in color, but may be pink, brown, red or black depending on species and host plant",
          "If aphid infestation is heavy it may cause leaves to yellow and/or distorted, necrotic spots on leaves and/or stunted shoots",
          "Aphids secrete a sticky, sugary substance called honeydew which encourages the growth of sooty mold on the plants",
        ],
      },
      {
        name: "Cyyclamen Mite",
        symptoms: [
          "Feeding causes wrinkled, distorted leaves, slightly darker in colour than uninfested leaves",
          "Heavily infested leaves become severely stunted and crinkled, resulting in a compact leaf mass in the center of the plant",
          "Fruit is small, bronzed, with prominent seeds",
        ],
      },
      {
        name: "Potato Leafhoppre",
        symptoms: [
          "Leafhoppers suck sap from the leaves, which causes yellow mottling around the edges.",
          "They also inject a toxin into the plant while they feed which reduces shoot vigour.",
          "Affected leaves turn pale green and curl downward at the margins.",
        ],
      },
      {
        name: "Root Weevil",
        symptoms: [
          "They are cream-coloured, or pinkish-white, legless, with c-shaped bodies and brown heads. Mature larvae range in size depending on species",
          "Adults are black or brown beetles with a characteristic long, probing mouthpart called a snout",
          "They feed on strawberry leaves causing characteristic c-shaped notches on the leaf edge",
        ],
      },
      {
        name: "Slugs",
        symptoms: [
          "Dark grey, black, yellow-grey or brown",
          "They produce small to moderate holes in fruit",
          "A slime-glistening trail is left on fruit and leaves",
        ],
      },
      {
        name: "Spittle Bugs",
        symptoms: [
          "Spittlebug nymphs pierce the plant stems and suck plant juices",
          "Leaves can be distorted and berries stunted if the populations are high",
          "The leaves develop a crinkled and dark green appearance",
        ],
      },
      {
        name: "SrawberryClipper (Bud) Weevil",
        symptoms: [
          "Larvae and eggs develop inside strawberry buds and are rarely seen",
          "Adults initially feed on pollen in strawberry buds and bloom, leaving round holes on buds and bloom as they do so",
          "Plants may compensate by putting out more flowers or increasing fruit weight, esp. if damage to primary or secondary buds",
        ],
      },
      {
        name: "Tarnished Plant Bug",
        symptoms: [
          "They feed on strawberry fruit and bloom, which causes misshapen fruit described as “catfacing” or “button berry”",
          "Damage on fruit from adults and nymphs feeding on flower buds, developing fruit, receptacle",
          "Feeding on berries can result in deformed and stunted berries with concentration of seeds at tip, called button berries or cat-faced berries",
        ],
      },
      {
        name: "Two - Spotted Mite",
        symptoms: [
          "Damaged leaves develop a bronzed hue, fruit and sepals may become bronzed if populations are very high.",
          "Mites feed on plant sap on underside of leaves in tangle of webbing",
          "Feeding can cause discoloration of leaves (bronzing), starting on underside of leaves Severely damaged leaves die and drop, resulting in reduced plant vigor, fruit size, and yield",
        ],
      },
      {
        name: "Western Flower Thrips",
        symptoms: [
          "The entire fruit may become bronzed and cracked.",
          "Both nymphs and adult thrips can injure the plant by rasping the plant bud, flower, leaf tissues and then sucking the exuding sap.",
          "Fruit damage includes surface russeting around planting materials from late green to ripe fruit. The fruit can take on a seedy bronze-like appearance.",
        ],
      },
      {
        name: "White Grubs (Japanese Beetle)",
        symptoms: [
          "Symptoms of white grub injury on strawberry plants include stunted growth and plant dieback.",
          "Plants affected by this insect can show early signs of wilting, remain small, weak, and both yield and fruit quality is affected.",
          "Soil disclosure at the bottom, the larve is seen gathering on the roots.",
        ],
      },
      {
        name: "Leaf Roller",
        symptoms: [
          "Damage caused by strawberry leafroller is confined to plant leaves; however, under heavy infestations fruit can become small and distorted due to severely affected plants.",
          "Larvae feed on and fold or roll leaves, causing shriveling and withering so that fields appear scorched or burnt when populations are high.",
          "Larvae can also create shelters by binding leaves or the sepals of the calyx to fruit and may feed from these sheltered areas on the surface or internal tissues of fruit.",
        ],
      },
      {
        name: "Cutworms and Armyworms",
        symptoms: [
          "Leaf feeding, severed plant stems and wilting plants.",
          "Early season damage by newly hatched cutworms generally appears as small, webless perforations in the newly expanding crown leaves.",
          "As larvae grow, they begin their characteristic stem cutting along with chewing larger, irregular holes in the foliage.",
        ],
      },
    ],
  },
  {
    name: "Pea",
    pests: [
      {
        name: "Pea Aphids",
        symptoms: [
          "A colony consists of winged and wingless adults and various sizes of nymphs. Aphids may be black, yellow, or pink, but mostly are various shades of green.",
          "Feeding by large numbers discolors foliage, curls leaves, and damages developing buds.",
          "They suck the sap of the cells, owing to which the leaves turn pale and yellow.",
        ],
      },
      {
        name: "Leaf Miner",
        symptoms: [
          "Larvae of the insect make a tunnel in the leaf, causing severe damage.",
          "The large number of tunnels made by the larvae between the lower and upper epidermis interferes with photosynthesis and the proper growth of the plants, making them look unattractive.",
          "Drying dropping of leaves in severe cases",
        ],
      },
      {
        name: "Pea Stem fly",
        symptoms: [
          "The maggot of the insect damages the internal tissue; consequently, the entire plant dies. The damage is more acute when the crop is sown early.",
          "The adults also cause damage by puncturing the leaves, and the injured parts turn yellow.",
          "The damage is more severe on seedlings than on the grown-up plants",
        ],
      },
      {
        name: "Pod Borer",
        symptoms: [
          "The caterpillar makes a hole in pods and feeds upon developing seed.",
          "In the early stages, they feed on the foliage and sometimes cause serious defoliation.",
          "During the reproductive stage, they bore the developing pod and feed on the seeds with their head typically thrust inside and most of the part of the body outside.",
        ],
      },
      {
        name: "Pea Moth",
        symptoms: [
          "The caterpillars feed on the developing peas in the pods; they also leave frass, which contaminates the end produce.",
          "Within each pod, 1 or 2 individual peas tend to be partially eaten, and attacked pods may develop a yellow appearance and ripen early.",
          "When pea pods are opened for shelling, one or more creamy white caterpillars, up to 14 mm long, with dark dots on the body may be found eating into the peas",
        ],
      },
      {
        name: "Pea Weevil/ bruchid",
        symptoms: [
          "Adults feed on blossoms and lay eggs on young pods.",
          "Larvae, after hatching from the eggs, burrow into green seed.",
          "The larvae burrow straight through the pods to feed on the seed, so they are not readily found for identification until the seed is mature (above), and it is too late for control.",
        ],
      },
      {
        name: "Pea Thrips",
        symptoms: [
          "Leaves fed upon by thrips often become dull green and later develop a silvery-white discoloration on the upper surface.",
          "The discolored areas are usually marked by many tiny black excrement spots.",
          "When thrips feed on developing tissues at the shoot tip or in flower buds, they can cause distorted growth.",
        ],
      },
    ],
  },
  {
    name: "Carrot",
    pests: [
      {
        name: "Cutworms",
        symptoms: [
          "Cutworms feed on the roots.",
          "Causing small and large superficial holes.",
          "Completely eat the leaves.",
        ],
      },
      {
        name: "African Armyworm",
        symptoms: [
          "The African army indirectly injures the carrot crop by destroying the stem or foliage. The crop cannot produce enough food when foliage is destroyed, reducing yields.",
          "The African armyworm is also known as a caterpillar.",
          "When the caterpillars are 3 cm long, they could have already caused massive losses.",
        ],
      },
      {
        name: "Bean Aphid",
        symptoms: [
          "Bean aphid may transmit celery mosaic but little is known in this regard.",
          "Bean aphid only occasionally builds up on carrots.",
          "It is known regarding economic thresholds and damage.",
        ],
      },
      {
        name: "Crown and Root Aphids",
        symptoms: [
          "These aphids occur infrequently and only occasionally cause injury.",
          "High populations may stunt growth.",
          "It is more serious that the tops may be weakened by their feeding and break off during harvest, leaving the carrot in the ground.",
        ],
      },
    ],
  },
  {
    name: "Sweet Potato",
    pests: [
      {
        name: "Weevil",
        symptoms: [
          "An infested tuber is often riddled with cavities or tunnels.",
          "Thickening and malformation of vines and often cracking of the tissue.",
          "Discoloration, cracking, or wilting of damaged vines.",
        ],
      },
      {
        name: "Tuber moth",
        symptoms: [
          "It is a pest of field and storage.",
          "Larva tunnels into foliage, stem, and tubers.",
          "Galleries are formed near tuber eyes.",
        ],
      },
      {
        name: "Aphids",
        symptoms: [
          "Damage the undersides of leaves by sucking their plant sap.",
          "They damage young and soft parts of plants such as new leaves and shoots.",
          "Leaves become rolled up and turn pale and gradually dry up.",
        ],
      },
      {
        name: "Whitefly",
        symptoms: [
          "Development of sooty mold on the plant.",
          "Blackening of the leaves that dry and fall off.",
          "Chlorotic spots, yellowing.",
        ],
      },
    ],
  },
  {
    name: "Rose",
    pests: [
      {
        name: "Aphids",
        symptoms: [
          "Distorted flower buds and leaves.",
          "Sticky honeydew substance that is secreted by the aphids.",
          "Black sooty mold growing on the honeydew.",
        ],
      },
      {
        name: "Curculios beetle",
        symptoms: [
          "Rose curculios are reddish-brown weevils with dark spots.",
          "Adult rose curculios feed on the flower buds, poking their long snouts inside.",
          "If the flowers open, they will be full of ragged holes.",
        ],
      },
      {
        name: "Rose scale insects",
        symptoms: [
          "Mainly found on the stems and branches of the plant, lack of control will allow the pest to spread to flower stalks and petioles.",
          "Plants would be stunted, spindly, and with a white, flaky crust of scales on the bark.",
          "Turn yellow and die back.",
        ],
      },
      {
        name: "Rose chaffer beetle",
        symptoms: [
          "They have a voracious appetite and can quickly skeletonize leaves, leaving only the veins behind.",
          "Create holes in the fruits, making them less attractive and reducing seed viability.",
          "They can consume the petals and damage the blooms, reducing the aesthetic value of the roses.",
        ],
      },
    ],
  },
  {
    name: "Cowpea",
    pests: [
      {
        name: "Pod borers",
        symptoms: [
          "Bore holes on the buds, flower or pods.",
          "Infested pods and flowers are webbed together.",
          "Defoliation in early stages & later feed on seed larvae thrust head inside the pods and the rest of the body hanging out & make round holes.",
        ],
      },
      {
        name: "Armyworms",
        symptoms: [
          "Damage by the worms comprises singular or grouped shaped holes on the leaves of infested plants.",
          "Under heavy infestations, windowing of leaves is observed.",
          "Egg clusters appear as cottony or fuzzy substance on the leaf surface.",
        ],
      },
      {
        name: "Root knot nematodes",
        symptoms: [
          "They usually appear sporadically within a cowpea field.",
          "Symptoms include stunting, yellowing, wilting, and formation of galls on host roots. Infected plants occur in patches in the field.",
          "Infected roots become knotty; in severely infected plants, the root system is reduced, and the rootlets are almost completely absent.",
        ],
      },
      {
        name: "Flower thrips",
        symptoms: [
          "Damage is prominent on petioles, leaves, and flowers that are heavily infested.",
          "Damaged petioles and leaves have tiny holes surrounded by discolored areas.",
          "Infested flowers are brown, dried, or completely distorted.",
        ],
      },
    ],
  },
];

module.exports = {
  pestAndSymptomsData,
};
