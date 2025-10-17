const diseasesAndSymptomsData = [
  {
    name: "Potato",
    diseases: [
      {
        name: "Late blight",
        symptoms: [
          "Yellow leaves",
          "Circular to irregular-shaped water-soaked spots on leaves.",
          "Broad yellow hollow may be seen around lesions.",
        ],
      },
      {
        name: "Early blight",
        symptoms: [
          "Round black spots on leaves",
          "Spots enlarged and concentric rings in a bull's eye pattern seen in the center of the diseased area",
          "Infected tubers shows a brown, corky dry rot.",
        ],
      },
      {
        name: "Brown rot",
        symptoms: [
          "Plants shows dwarfing",
          "If affected tubers cut across, the browning of the xylem vessel is seen, and upon squeezing, the whitish bacterial oozes out.",
          "Plant shows wilting",
        ],
      },
      {
        name: "Black scurf",
        symptoms: [
          "Arial tubers",
          "On tubers, black sclerotial bodies are formed.",
          "Raised, hard, black patches on the surface of the tuber",
        ],
      },
      {
        name: "Viral diseases",
        symptoms: ["Wilting", "Wilting of leaves", "Stunted growth"],
      },
    ],
  },
  {
    name: "Cocoa",
    diseases: [
      {
        name: "Black Pod Rot",
        symptoms: [
          "Whitish growth of fungus",
          "Pods turn brown to black",
          "Beans become discolored as a result of infection",
        ],
      },
      {
        name: "Stem canker",
        symptoms: [
          "Earliest symptom is the appearance of a greyish brown water soaked lesion on the outer bark",
          "Cankers appear either on the main trunk, jorquettes or fan branches",
          "A reddish brown liquid oozes out from these lesions, which later dries up to form rusty deposits",
        ],
      },
      {
        name: "Vascular streak dieback",
        symptoms: [
          "First indication of the disease is a characteristic yellowing of one or two leaves on the second or third flush behind the growing tip",
          "Diseased leaves fall within a few days of turning yellow and the other leaves on the shoot show similar symptoms",
          "When the infected shoot is split lengthwise there is always a characteristic brown streaking",
        ],
      },
    ],
  },
  {
    name: "Timothy",
    diseases: [
      {
        name: "Ergot",
        symptoms: [
          "Light-brown honey dew in the head just after flowering",
          "The black purple, cattle-horn like, ergots covered with white sphacelia are produced in the infected flowers replacing the seeds",
          "Sugary droplets on the infected flower parts.",
        ],
      },
      {
        name: "Helminthosporium Leaf Spot",
        symptoms: [
          "The lesions are drab, rectangular to long oval and about 2-5 x 1-2 mm in size.",
          "Leaf Lesion",
          "Yellow leaves",
        ],
      },
      {
        name: "Stem rust",
        symptoms: [
          "Swelling lessions at early spring",
          "Reddish brown to iron rust colour lessions",
          "Blackened stems and shrivelled grain",
        ],
      },
      {
        name: "Purple eye spot",
        symptoms: [
          "The lesions are at first purplish black small spots and then become round and ash white",
          "Leaf blight with rolling from leaf tip",
          "Death of immature leaves",
        ],
      },
    ],
  },
  {
    name: "Rhodes",
    diseases: [
      {
        name: "Root rot",
        symptoms: [
          "Branch dieback",
          "Thinning of the canopy.",
          "Wilted, yellowed, or browned leaves.",
        ],
      },
    ],
  },
  {
    name: "Rapeseed",
    diseases: [
      {
        name: "Alternaria black spot",
        symptoms: [
          "The stems develop water-soaked spots which later may be covered with a cottony white growth.",
          "As the disease progresses, affected portions of the stem develop a bleached appearance, and eventually the tissues shred.",
          "Girdling of the stem results in premature ripening and in lodging of plants.",
        ],
      },
      {
        name: "Bacterial blight/ black rot",
        symptoms: [
          "Stem become hollow due to internal rotting.",
          "Midrib cracking of lower leaves, browning of veins and withering is observed.",
          "In severe cases, the vesicular bundles of the stem also turn brown and the plant collapses.",
        ],
      },
      {
        name: "Club rot",
        symptoms: [
          "Patches of the crop wilt, exhibit stunted growth and have swollen, misshapen roots which decay by rotting.",
          "Tiny nodules to large club shaped outgrowths develop in root system.",
          "Leaves turn pale green or yellow followed by wilting and under severe conditions the plants die",
        ],
      },
      {
        name: "Downy mildew",
        symptoms: [
          "Leaf spots initially are angular, translucent, light green, later developing into grayish-white irregular necrotic (dead) patches.",
          "The stems of flower clusters become swollen.",
          "Frequently associated with white rust. May develop late in the season on turnip-type (Polish) canola varieties.",
        ],
      },
      {
        name: "Phoma & Stem canker",
        symptoms: [
          "Damping-off may occur if plants are infected at the seedling stage due to infected seed.",
          "Plants affected after the seedling stage may be stunted. Generalized leaf spots, becoming numerous across the field, have been observed in fall-planted crops after initial windblown spore (ascospore) infections.",
          "Brown-to-black rot can be found inside affected stems. Vascular tissues may turn black in color prior to external rot symptoms.",
        ],
      },
      {
        name: "Sclerotinia stem rot",
        symptoms: [
          "The stems develop water-soaked spots which later may be covered with a cottony white growth.",
          "Hard black bodies, the sclerotia, are formed inside the stem and occasionally on the stem surface.",
          "Girdling of the stem results in premature ripening and in lodging of plants.",
        ],
      },
      {
        name: "Turnip yellow virus",
        symptoms: [
          "First signs are red, yellow or purple colours at the ends or edges of older leaves, then yellowing in the middle of the leaf.",
          "Late infected plants show leaf symptoms but are not stunted and have lower yield loss.",
          "Colours are more intense between leaf veins and on the upper side of the leaf.",
        ],
      },
      {
        name: "Verticillium wilt",
        symptoms: [
          "Verticillium wilt in canola most often appear near the end of the season as the plants begin to ripen.",
          "While the stem is still green, a vertical yellow or brown band extending up one side of the stem may be visible.",
          "Infected plants are often stunted and pale, and produce fewer flowers, branches and pods.",
        ],
      },
      {
        name: "White blister",
        symptoms: [
          "Yellow to brown spots on the upper leaf surface  which have white dust-like spores on the corresponding under leaf surface.",
          "Swellings on roots and stems",
          "Flowers get malformed and become sterile.",
        ],
      },
      {
        name: "White rust",
        symptoms: [
          "First symptoms may appear as small, light green spots, which later turn white and finally result in blister-like, raised, white pustules, usually on the lower leaf surface.",
          "Seed pedicels may terminate and form staghorns without seeds developing. Seed yield and quality are severely reduced.",
          "Pustules can develop on the upper or lower leaf surfaces or on stems and consist of masses of sporangia.",
        ],
      },
    ],
  },
  {
    name: "Green gram",
    diseases: [
      {
        name: "Anthracnose",
        symptoms: [
          "The fungus attacks all aerial part parts and at any stage of plant growth.",
          "Symptoms are circular, black, sunken spots with dark center and bright red orange margins on leaves and pods.",
          "Irregular spots, and dead areas on leaves that often follow the veins of the leaves",
        ],
      },
      {
        name: "Cercospora leaf spot",
        symptoms: [
          "Spots produced are small, numerous in number with pale brown centre and reddish brown margin.",
          "Small necrotic flecks that enlarge to form circular, tan or grey spots.",
          "The center of the lesions dry out and has a white appearance",
        ],
      },
      {
        name: "Dry Root Rot and Leaf Blight",
        symptoms: [
          "The affected leaves turn yellow in colour and brown irregular lesions appear on leaves.",
          "The affected plants dry up gradually. When the tap root of the affected plant is split open, reddening of internal tissues is visible.",
          "In the initial stages, the fungus causes seed rot, seedling blight and root rot symptoms.",
        ],
      },
      {
        name: "Leaf Crinkle",
        symptoms: [
          "The earliest symptoms appear on youngest leaves as chlorosis around some lateral veins and its branches near the margin.",
          "The leaves show curling of margin downwards.",
          "The veins show reddish brown discolouration on the under surface which also extends to the petiole.",
        ],
      },
      {
        name: "Powdery Mildew",
        symptoms: [
          "White powdery patches appear on leaves and other green parts which later become dull coloured.",
          "In severe infections, foliage becomes yellow causing premature defoliation.",
          "When the infection is severe, both the surfaces of the leaves are completely covered by whitish powdery growth.",
        ],
      },
      {
        name: "Rust",
        symptoms: [
          "Spots produced are small, numerous in number with pale brown centre and reddish brown margin.",
          "Similar spots also occur on branches and pods.",
          "Under favourable environmental conditions, severe leaf spotting and defoliation occurs at the time of flowering and pod formation.",
          "ther",
        ],
      },
      {
        name: "Stem canker",
        symptoms: [
          "These enlarge gradually and turn as raised brown streaks spreading upwards.",
          "Plants are stunted and leaves dark green, mottled and reduced in size.",
          "Normal leaves on the affected plants drop suddenly and dry.",
        ],
      },
      {
        name: "Yellow Mosaic",
        symptoms: [
          "Initially mild scattered yellow spots appear on young leaves.",
          "The next trifoliate leaves emerging from the growing apex show irregular yellow and green patches alternating with each other.",
          "Spots gradually increase in size and ultimately some leaves turn completely yellow.",
        ],
      },
    ],
  },
  {
    name: "Sesame",
    diseases: [
      {
        name: "Phyllody",
        symptoms: [
          "All floral parts are transformed into green leafy structures followed by abundant vein clearing in different flower parts.",
          "In severe infection, the entire inflorescences is replaced by short twisted leaves closely arranged on a stem with short internodes, abundant abnormal branches bend down",
          "Finally, plants look like witches broom.",
        ],
      },
      {
        name: "Bacterial blight",
        symptoms: [
          "Plants of all stage are affected.",
          "Water soaked, small and irregular spots are formed on the leaves which later increases and turn brown, under favourable conditions.",
          "Leaves become dry and brittle, severely infected leaves defoliate",
        ],
      },
      {
        name: "Cercospora leaf spot / White spot",
        symptoms: [
          "Disease appears as small, angular brown leaf spots of 3 mm diameter with gray centre and dark margin delimited by veins.",
          "In severity of the disease defoliation occurs.",
          "Under favourable conditions, the disease spreads to leaf petiole, stem and capsules producing linear dark coloured deep seated lesions.",
        ],
      },
      {
        name: "Damping off / Root Rot: Macrophomina phaseolina",
        symptoms: [
          "The fungus attacks young seedling, their stem become water soaked soft and incapable of supporting the seedling which falls over and dies.",
          "On older seedlings elongated brownish black lesions appear which increase in length and width girdling",
          "The stem and plant dies.",
        ],
      },
    ],
  },
  {
    name: "Onion",
    diseases: [
      {
        name: "Basal Rot",
        symptoms: [
          "The leaves turn yellow and then dry up slowly.",
          "Begin drying of leaf tip downwards.",
          "The entire plant shows complete drying of the foliage",
        ],
      },
      {
        name: "Downy mildew",
        symptoms: [
          "Leaves turn to pale green.",
          "On leaves, cottony white mycelial growth develops and appears white.",
          "White downy growth appears on the surface of the leaves.",
        ],
      },
      {
        name: "Leaf Blight",
        symptoms: [
          "Botrytis is the major disease of onions in cool climate areas.",
          "Light infections do not affect yields but heavy infections causing major yield reductions can occur.",
          "Hundreds of white specks are seen on the foliage.",
        ],
      },
      {
        name: "Damping Off",
        symptoms: [
          "Seedlings topple after emerging from soil.",
          "It occurs at ground or below ground level.",
          "Infected tissues appear soft and water soaked.",
        ],
      },
      {
        name: "Smut",
        symptoms: [
          "Black smut sori are seen at the base of the leaves and leaf surface.",
          "Black powdery mass is seen after rupturing of sorus wall.",
          "The infection progresses inward from leaf to leaf",
        ],
      },
      {
        name: "White rot",
        symptoms: [
          "The initial symptoms are yellowing and dieback of leaf tips.",
          "Later, scales, stem plates and roots get destroyed.",
          "The bulbs become soft and water soaked.",
        ],
      },
      {
        name: "Purple Blotch",
        symptoms: [
          "Begins as small, elliptical lesions.",
          "Lesions turn purplish-brown progressively surrounded by chlorotic margins.",
          "Lesions begin at tip of older leaves and accumulate on the leaves making it fall off",
        ],
      },
      {
        name: "Stemphylium blight",
        symptoms: [
          "Yellow to orange colored small flecks develop in the middle of the leaf.",
          "Flecks spread to form elongated, spindle shaped to ovate, diffused spots.",
          "Flecks are surrounded by a characteristic pink margin.",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Abnormal elongation of the neck.",
          "Abnormal elongation of the neck.",
          "Water-soaked lesions that are pale yellow in colour appear initially on leaf blades.",
        ],
      },
      {
        name: "Onion Yellow Dwarf",
        symptoms: [
          "Infected leaves develop yellow streaks that spread progressively leading to yellow leaves.",
          "Leaves curl and plants wilt.",
          "Bulbs do not grow to full size although they are firm and solid.",
        ],
      },
      {
        name: "Iris Yellow Spot",
        symptoms: [
          "Leaves show lesions that maybe diamond or spindle-shaped.",
          "They are straw-colored and sometimes have distinct green center with yellow borders.",
          "Flower stalks are infected in later stages.",
        ],
      },
      {
        name: "Pink root rot",
        symptoms: [
          "Reduced bulb size",
          "Roots turn pink or maroon when infected.",
          "In severe cases the roots may die and the plants become weakened",
        ],
      },
      {
        name: "Black mould",
        symptoms: [
          "Infection usually is through neck tissues as foliage dies down at maturity.",
          "Infected bulbs are discoloured black around the neck, and affected scales shrivel.",
          "Masses of powdery black spores develop as streaks along veins on and between outer dry scale",
        ],
      },
      {
        name: "Green mould",
        symptoms: [
          "Infection usually is through neck tissues as foliage dies down at maturity.",
          "Infected bulbs are discoloured green around the neck, and affected scales shrivel.",
          "Masses of powdery green spores generally are arranged as streaks along veins on",
        ],
      },
      {
        name: "Bacterial soft rot",
        symptoms: [
          "Bacterial soft rot is mainly a problem on mature bulbs.",
          "Affected scales first appear water-soaked and pale yellow to light brown.",
          "As the soft rot progresses, invaded fleshy scales become soft",
        ],
      },
    ],
  },
  {
    name: "Tea",
    diseases: [
      {
        name: "Tea Armillaria root rot",
        symptoms: [
          "Leaves turn yellow",
          "Main root system rots away.",
          "Tea bush eventually dies.",
        ],
      },
      {
        name: "Tea Wood rot",
        symptoms: [
          "Decline of the bush",
          "Wood bears superficial irregular dark‐grey to black raised patches",
          "Dead branches carry small black patches.",
        ],
      },
      {
        name: "Tea Branch and collar canker",
        symptoms: [
          "Yellow or brown foliage on affected branches",
          "lesions at the collar region of the bush",
          "Dead wood can be seen by scraping back the bark",
        ],
      },
      {
        name: "Tea Brown and Grey Blight",
        symptoms: [
          "Small, oval, pale yellow-green spots appearing on young leaves.",
          "Spots are surrounded by a narrow, yellow zone.",
          "Eventually the dried tissue falls, leading to defoliation",
        ],
      },
    ],
  },
  {
    name: "Alfalfa",
    diseases: [
      {
        name: "Aphanomyces Root Rot (Aphanomyces euteiches)",
        symptoms: [
          "Seedlings develop yellowish cotyledons and may be reddish on underside; seedlings may die within two to four weeks after planting.",
          "Leaves may have bluish-green cast.",
          "Roots are grayish or light brown, water soaked, and have reduced mass.",
        ],
      },
      {
        name: "Mycoleptodiscus Crown and Root Rot",
        symptoms: [
          "Plants appear stunted and yellow.",
          "Lateral and fibrous roots are reduced.",
          "Existing roots may be black and rotted.",
        ],
      },
      {
        name: "Phytophthora Damping Off and Root Rot",
        symptoms: [
          "Seedlings fail to emerge or die soon after emergence.",
          "Plants appear stunted, yellow or reddish-purple lower leaves, may be wilted.",
          "Taproots have tan to brown or red-brown to black lesions and can be rotted just below crown",
        ],
      },
      {
        name: "Pythium",
        symptoms: [
          "Seedlings fail to emerge or die soon after emergence.",
          "If emergence occurs, plants appear stunted, yellowish, may be wilted.",
          "Roots appear water soaked, mushy, rotted.",
        ],
      },
      {
        name: "Bacterial Wilt",
        symptoms: [
          "Stunted plants have many spindly, shortened stems and small, light green to yellow leaflets.",
          "Outer vascular taproot tissue becomes yellow to dark golden brown.",
          "Leaves may be cupped.",
        ],
      },
      {
        name: "Rhizoctonia",
        symptoms: [
          "Seedlings fail to emerge or die soon after emergence.",
          "Tan, sunken, and elliptical lesions develop on taproot where lateral roots emerge",
          "During the winter, existing root lesions turn black.",
        ],
      },
      {
        name: "Fusarium Wilt",
        symptoms: [
          "Scattered, wilted plants are first evidence.",
          "One side of the stem may wilt and die or whole plant may be affected.",
          "Stems and leaves appear bleached",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Stem tips wilt and bend forming a “shepherd’s crook”",
          "Diamond shaped, ash-gray lesions with dark-brown to purple borders develop on lower stems.",
          "Lesions may girdle the stem causing plants to wilt, drop leaves, and have straw-colored shoots.",
        ],
      },
    ],
  },
  {
    name: "Pearl Millet",
    diseases: [
      {
        name: "Downy mildew",
        symptoms: [
          "Systemic symptoms as chlorosis generally appear on the second leaf and all the subsequent leaves and panicles of infected plant show symptoms.",
          "Leaf symptoms begin as chlorosis at the base of the leaf lamina and successively higher leaves show a progression of greater leaf area coverage by the symptoms",
          "Infected chlorotic area produce massive amount of asexual spores, generally on the lower surface giving the leave a ‘downy’ appearance.",
        ],
      },
      {
        name: "Rust",
        symptoms: [
          "Rust symptoms first appear on lower leaves as typical pustules containing reddish brown powder (uredospores).",
          "Later, dark brown teliospores are produced. Symptoms can occur on both upper and lower surface of the leaves but mostly on upper surface and also on stem. Highly susceptible cultivars develop large pustules on leaf blades and sheaths.",
          "It appear, generally after the grain-filling stage, causing little or no loss in grain yield.",
        ],
      },
      {
        name: "Smut",
        symptoms: [
          "In the infected florets, ovariesare converted into structurescalled sori.",
          "The sori are largerthan grains and appear asenlarged, oval to conical bodiesprojecting somewhat beyond theglumes in place of grains.Initially.",
          "The sori are bright greenbut later turn brown to black",
        ],
      },
      {
        name: "Ergot",
        symptoms: [
          "The disease is easily identified as a honeydew substance of creamy to light pinkish ooze out of the infected florets which contains numerous conidia.",
          "Within two weeks these droplets dry out as hard dark black structures larger than seeds, protruding out from the florets in place of grain, which are called sclerotia.",
          "Here the loss in grain yield is directly proportional to the percentage of infection as the infected seed is fully transformed into sclerotium.",
        ],
      },
    ],
  },
  {
    name: "Sugarcane",
    diseases: [
      {
        name: "Red rot",
        symptoms: [
          "Stalks become discoloured and hollow.",
          "Internal tissues are reddened with intermingled transverse white spots",
          "A sour smell emanates.",
        ],
      },
      {
        name: "Smut (fungal)",
        symptoms: [
          "Whip like structure of 25 – 150 cm.Whip covered by translucent silvery membrane enclosing mass of black powdery spores.",
          "Initial thin canes with elongated internodes later become reduced in length.",
          "Profuse sprouting of lateral buds with narrow, erect leaves especially in ratoon crop",
        ],
      },
      {
        name: "Rust",
        symptoms: [
          "Rusty appearance on leaves",
          "Premature death of the leaf.",
          "These spots are turn red-brown to brown in color",
        ],
      },
      {
        name: "Grassy shoot",
        symptoms: [
          "Proliferation of vegetative buds",
          "The tillers bear pale yellow to completely chlorotic leaves",
          "The canes are thin with short internodes",
        ],
      },
      {
        name: "Yellow leaf disease(virus)",
        symptoms: [
          "Yellowing of the leaf midrib on the underside of the leaf",
          "Discoloration of leaves",
          "Bunchy appearance of the plant",
        ],
      },
    ],
  },
  {
    name: "Banana",
    diseases: [
      {
        name: "Bunchy top virus (viral)",
        symptoms: [
          "Stunted growth",
          "Affected leaves are brittle with their margins rolled upwards.",
          "Do not produce bunch of any commercial value	",
        ],
      },
      {
        name: "Panama wilt",
        symptoms: [
          "Yellowing of  lower leaves,including leaf blades and petioles.",
          "Yellowish to reddish streaks are noted with intensification of colour towards the rhizome.",
          "Longitudinal splitting of pseudostem.",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Infected fruits become black and rotten.",
          "Black lesions on the pedicel.",
          "Fruit shrivelled",
        ],
      },
      {
        name: "Yellow sigatoka (fungal)",
        symptoms: [
          "Reduced bunch size and uneven ripening of fruit",
          "Reduces the plant photosynthetic potential.",
          "Defoliation",
        ],
      },
    ],
  },
  {
    name: "Lettuce",
    diseases: [
      {
        name: "Anthracnose",
        symptoms: [
          "Small water-soaked tan spots on outer leaves",
          "Shot-hole appearance on the plant",
          "Outer leaves often break off",
        ],
      },
      {
        name: "Leaf drop (fungal)",
        symptoms: [
          "Soft watery lesions on leaves",
          "Leaves collapse and lie on soil surface",
          "Black fungal structures on infected leaf tissue",
        ],
      },
      {
        name: "Powdery mildew",
        symptoms: [
          "White fungal growth on both sides of leaves",
          "Leaves turning yellow or brown",
          "Small black fruiting bodies may be visible",
        ],
      },
      {
        name: "Septoria leaf spot",
        symptoms: [
          "Small chlorotic spots on old leaves",
          "Lessions may fall out creating holes",
          "Wilting leaves and plant death",
        ],
      },
      {
        name: "Big vein (viral)",
        symptoms: [
          "Veins enlarged and clear",
          "Puckered or ruffled leaves",
          "Upright outer leaves",
        ],
      },
    ],
  },
  {
    name: "Chilly",
    diseases: [
      {
        name: "Anthracnose (fungal)",
        symptoms: [
          "Circular lesions and black patches on chilli pods",
          "Irregular brown spots with dark brown holes on leaves and stems",
          "The affected fruits may fall off subsequently",
        ],
      },
      {
        name: "Phytophthora",
        symptoms: [
          "Black lesions on stems",
          "Circular gray-brown lesions on leaves and wilting the plant",
          "Dark lesions on fruit which may be covered in white sporangia",
        ],
      },
      {
        name: "Leaf curl virus (viral)",
        symptoms: [
          "Upward curling in the leaves, crinkling appearance",
          "Shortening of petioles, internodes and bunchy leaves",
          "Severe stunting in plants",
        ],
      },
      {
        name: "Fusarium wilt",
        symptoms: [
          "The leaves turn yellow and die",
          "Initial slight yellowing of the foliage and wilting of the upper leaves",
          "The vascular system of the plant is discoloured",
        ],
      },
    ],
  },
  {
    name: "Lemon",
    diseases: [
      {
        name: "Anthracnose (fungal)",
        symptoms: [
          "Dieback of twigs",
          "Premature leaf drop",
          "Dark staining on fruit",
        ],
      },
      {
        name: "Citrus canker (bacterial)",
        symptoms: [
          "The disease causes small, round blister-like formations on leaves, branches, stems, new shoots and fruit",
          "Crater-like lesions form on the surface surrounded by an oily, water-soaked margin or yellow halo",
          "In young fruit an ooze of resinous substance may be observed.",
        ],
      },
      {
        name: "Citrus scab (fungal)",
        symptoms: [
          "Citrus scab attacks the fruit, leaves and twigs, producing slightly raised, irregular scabby or wart like outgrowths.",
          "The scabs are grey or pinkish at first and become darker with age. They are more common on lemon fruits than leaves.",
          "The raised lumps associated with scab can be confused with symptoms caused by the disease botrytis or with windrub abrasions.",
        ],
      },
      {
        name: "Citrus tristeza (viral)",
        symptoms: [
          "Light green foliage, poor new growth, leaves may be dropping from tree",
          "Severely infected trees are stunted and bushy in appearance with chlorotic leaves and brittle twigs",
          "Some strains of the virus cause elongated pits in the trunk and branches which give the wood a rope-like appearance.",
        ],
      },
      {
        name: "Citrus greening (bacterial)",
        symptoms: [
          "Yellowing of leaf veins, blotchy mottling on leaf blades",
          "Twig and limb dieback and fruits dropping prematurely",
          "Small, misshapen fruit and fruit very bitter.",
        ],
      },
    ],
  },
  {
    name: "Kidney bean",
    diseases: [
      {
        name: "Anthracnose",
        symptoms: [
          "Pale brown sunken spots may appear on the cotyledons of infected seedlings.",
          "Lesions on leaves are dark brown.",
          "They are restricted to the veins on lower leaf surface. On stems, lesions are elongated and sunken.",
        ],
      },
      {
        name: "Angular leaf spot",
        symptoms: [
          "Fungus produces a grey mould on the lower surface of the spots.",
          "Infected pods have brown blotches",
          "The spots may increase in size, join together, and cause yellowing and necrosis of the affected leaves",
        ],
      },
      {
        name: "Rust",
        symptoms: [
          "Rust-colored pustules form on the lower leaf surfaces.",
          "Severely infected leaves turn yellow, wilt, and then drop off of the plant.",
          "Stems and pods may also be infected. It affects most types of beans under humid conditions",
        ],
      },
      {
        name: "Bean mosaic virus",
        symptoms: [
          "Symptoms of bean common mosaic virus (BCMV) are cupping and twisting of leaves with a light and dark green mosaic pattern.",
          "The dark green tissue is often bubbled and/or in bands next to the veins.",
          "Affected plants produce smaller, curled pods with a greasy appearance resulting in poor yields.",
        ],
      },
    ],
  },
  {
    name: "Orange",
    diseases: [
      {
        name: "Orange scab",
        symptoms: [
          "The initial symptoms of sweet orange scab form on very young fruit as lesions that are slightly raised and pink to light brown.",
          "The lesion color changes to yellowish brown and eventually to dark gray.",
          "Orange scab can cause premature fruit drop and stunt young nursery trees and new field plantings, but has little impact on fruit quality.",
        ],
      },
      {
        name: "Citrus tristeza virus",
        symptoms: [
          "Trees infected with tristeza show light green foliage, and some leaf drop.",
          "Feeder roots die from the tip towards the main root.",
          "Yellow seedlings,Stem pitting,poor fruit quality",
        ],
      },
      {
        name: "Citrus greening",
        symptoms: [
          "Lopsided, bitter, hard fruit with small, dark aborted seeds",
          "Fruit that remains green even when ripe",
          "Asymmetrical blotchy mottling of leaves, yellow shoots, twig dieback",
        ],
      },
    ],
  },

  {
    name: "Garlic",
    diseases: [
      {
        name: "Downy mildew",
        symptoms: [
          "Leaves turn to pale green.",
          "On leaves, cottony white mycelial growth develops and appears white.",
          "White downy growth appears on the surface of the leaves.",
          "White downy growth appears on the surface of the leaves.",
        ],
      },
      {
        name: "Damping Off",
        symptoms: [
          "Seedlings topple after emerging from soil.",
          "It occurs at ground or below ground level.",
          "Infected tissues appear soft and water soaked.",
        ],
      },
      {
        name: "Bacterial soft rot",
        symptoms: [
          "Bacterial soft rot is mainly a problem on mature bulbs.",
          "Affected scales first appear water-soaked and pale yellow to light brown.",
          "As the soft rot progresses, invaded fleshy scales become soft",
        ],
      },
      {
        name: "Black mould",
        symptoms: [
          "Infection usually is through neck tissues as foliage dies down at maturity.",
          "Infected bulbs are discoloured black around the neck, and affected scales shrivel.",
          "Masses of powdery black spores develop as streaks along veins on and between outer dry scale",
        ],
      },
      {
        name: "Green mould",
        symptoms: [
          "Infection usually is through neck tissues as foliage dies down at maturity.",
          "Infected bulbs are discoloured green around the neck, and affected scales shrivel.",
          "Masses of powdery green spores generally are arranged as streaks along veins on",
        ],
      },
      {
        name: "White rot",
        symptoms: [
          "The initial symptoms are yellowing and dieback of leaf tips.",
          "Later, scales, stem plates and roots get destroyed.",
          "The bulbs become soft and water soaked.",
        ],
      },
      {
        name: "Iris Yellow Spot",
        symptoms: [
          "Leaves show lesions that maybe diamond or spindle-shaped.",
          "They are straw-colored and sometimes have distinct green center with yellow borders.",
          "Flower stalks are infected in later stages.",
        ],
      },
      {
        name: "Rust",
        symptoms: [
          "The earliest symptom of garlic rust is small, circular to elongate white flecks that occur on both sides of leaves.",
          "As the disease progresses, these small spots expand, and the leaf tissue covering the lesions ruptures and masses of orange, powdery spores (uredospores) then become visible as pustules.",
          "Severely infected leaves are almost entirely covered with pustules, resulting in extensive yellowing, wilting and premature drying of leaves.",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Abnormal elongation of the neck.",
          "Twisting, curling of leaves.",
          "Water-soaked lesions that are pale yellow in colour appear initially on leaf blades.",
        ],
      },
    ],
  },
  {
    name: "Oil palm",
    diseases: [
      {
        name: "Bacterial bud rot",
        symptoms: [
          "Parts of spear leaf petiole or rachi turning brown",
          "Discoloration may be associated with a wet rot",
          "Spear leaf may be wilted and/or chlorotic",
        ],
      },
      {
        name: "Ganoderma rot",
        symptoms: [
          "Reduced growth of palm and older fronds turning chlorotic or necrotic",
          "Pale green foliage",
          "Drooping fronds",
        ],
      },
      {
        name: "Oil palm wilt",
        symptoms: [
          "Field palms may exhibit a bright yellow chlorosis of leaves in the mid-canopy which starts at the tip pf the pinnae and moves towards petioles before affecting adjacent fronds and spreading to older leaves in the canopy.",
          "In older palms, lower leaves wilt and dry out and fronds break close to the base of the trunk; new fronds are chlorotic and stunted.",
          "Drying of leaves",
        ],
      },
      {
        name: "Pestalotiopsis leaf spot",
        symptoms: [
          "Tiny black spots on leaves which enlarge into 2 mm long elliptical, elongated lesions",
          "Lesions may expand and be surrounded by black tissue and chlorosis between lesions",
          "Lesions may be present on leaf petioles and rachis",
        ],
      },
    ],
  },
  {
    name: "Cabbage",
    diseases: [
      {
        name: "Alternaria leaf spot",
        symptoms: [
          "Leaf symptoms include round, brown spots with concentric rings",
          "Spots often have a yellow halo, and can crack through the middle",
          "As the disease spreads, leaves can develop enough spots that they begin to meld together to create large necrotic areas on leaves",
        ],
      },
      {
        name: "Damping off",
        symptoms: [
          "The young radical and the plumule are killed and there is complete rotting of the seedlings",
          "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level",
          "The seedlings topple over or  collapse",
        ],
      },
      {
        name: "Black rot",
        symptoms: [
          "First appear as chlorotic or yellow (angular) areas near the leaf margins",
          "Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black",
          "Veins and veinlets turn brown and finally black",
        ],
      },
      {
        name: "Downy mildew",
        symptoms: [
          "Small purplish brown spots on under surface of leaves",
          "Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface",
          "The spots coalesce and the leaves shrivel and dries up prematurel",
        ],
      },
    ],
  },
  {
    name: "Corn/maize",
    diseases: [
      {
        name: "Bacterial stalk rot",
        symptoms: [
          "Leaves sometime show signs of wilting or water loss",
          "The stalk near the ground become water-soaked with brownish discolouration and are easily breakable.",
          "The rotting tissues emit a putrid smell.",
        ],
      },
      {
        name: "Maydis leaf blight",
        symptoms: [
          "Small yellowish round or oval spots appear on the leaves",
          "Yellowish spots enlarge and become elliptical",
          "Center becomes straw coloured with a reddish brown margin",
        ],
      },
      {
        name: "Banded leaf and sheath blight",
        symptoms: [
          "Disease appears at pre-flowering stage in 40-50 days old plants but can also occur on younger plants",
          "Symptoms develop on leaves, sheaths and stalks and can later spread to ears",
          "On leaves and sheaths, a number of soaked, discolored concentric bands and rings are visible, often brown, tan or gray in color",
        ],
      },
      {
        name: "Brown stripe downy mildew",
        symptoms: [
          "It is characterized by the presence of long, narrow, brownish, interveinal stripes on leaves",
          "Whitish downy fungal growth may be observed on close examination on underside of the stripes",
          "Early-stage symptoms are visible as flecks or blobs on the lowermost leaves, giving them a burnt appearance",
        ],
      },
    ],
  },
  {
    name: "Rice",
    diseases: [
      {
        name: "Leaf or neck blast",
        symptoms: [
          "Entire crop give a blasted or burnt appearance",
          "Neck region of panicle develops a black color and shrivels completely / partially grain set inhibited, panicle breaks at the neck and hangs",
          "Nodal Blast: Nodes become black and break up",
        ],
      },
      {
        name: "Bacterial leaf blight",
        symptoms: [
          "Water-soaked to yellowish stripes on leaf blades or starting at leaf tips",
          "Appearance of bacterial ooze that looks like a milky or opaque dewdrop on young lesions early in the morning",
          "Lessions turn yellow to white as the disease advances",
        ],
      },
      {
        name: "Rice tungro virus",
        symptoms: [
          "Leaves become yellow or orange-yellow, may also have rust-colored spots",
          "Discoloration begins from leaf tip and extends down to the blade or the lower leaf portion",
          "Delayed flowering, - panicles small and not completely exerted",
        ],
      },
      {
        name: "Sheath rot",
        symptoms: [
          "Irregular spots or lesions, with dark reddish brown margins and gray center",
          "Discoloration in the flag leaf sheath",
          "Lesions enlarge and often coalesce and may cover the entire leaf sheath",
        ],
      },
    ],
  },
  {
    name: "Soybean",
    diseases: [
      {
        name: "Soybean rust",
        symptoms: [
          "Tan or reddish-brown lesions (spots) develop first on the underside of leaves",
          "Symptoms begin on leaves in the lower plant canopy",
          "Small pustules (blisters) develop in the lesions, which break open and release masses of tan spores",
        ],
      },
      {
        name: "Soybean mosaic",
        symptoms: [
          "Mottling appears as light and dark green patches on individual leaves",
          "Symptoms are most obvious on young, rapidly growing leaves",
          "The disease is characterized by light and day green mottling on the leaves often accompanied by wilting of young leaves in sunny days when plants first become infected.",
        ],
      },
      {
        name: "Bacterial blight",
        symptoms: [
          "Symptoms usually begin in the upper canopy because young leaves are most susceptible",
          "Small, angular, reddish-brown lesions are surrounded by a yellow halo.",
          "As the disease progresses, lesions often grow together to produce large, irregularly shaped dead areas",
        ],
      },
      {
        name: "Soybean brown stem rot",
        symptoms: [
          "Foliar symptoms can be similar to those of sudden death syndrome and stem canker and appear after early pod set",
          "Stem symptoms usually occur prior to leaf symptoms",
          "Can occur even if foliar symptoms never appear",
        ],
      },
    ],
  },
  {
    name: "Wheat",
    diseases: [
      {
        name: "Yellow or stripe rust",
        symptoms: [
          "Yellow powdery pustules appear on leaves, forming stripes",
          "Minimum temperature in the range of 7-13 degree C coupled with 85-100% relative humidity during night and maximum temperature in the range of 15-24 degree C during day are congenial for infection, development and spread of disease.",
          "The characteristic symptom of yellow rust is of parallel rows of yellowish orange coloured pustules on the leaves of adult plants",
        ],
      },
      {
        name: "Loose smut",
        symptoms: [
          "Mild symptoms may be present prior to heading, including yellowish leaf streaks and stiff, dark green leaves",
          "Olives",
          "The fungus destroys the ears completely, turning them into a black loose powdery mass consisting of spores and leaving behind the rachis only.",
        ],
      },
      {
        name: "Brown rust",
        symptoms: [
          "Leaf rust attacks foliage only",
          "This rust disease occurs wherever wheat, barley and other cereal crops are grown",
          "Identifying symptoms are dusty, reddish-orange to reddish-brown fruiting bodies that appear on the leaf surface.",
        ],
      },
      {
        name: "Leaf spot",
        symptoms: [
          "An early symptom of bacterial leaf spot is small, water-soaked leaf spots on the older leaves of the plant",
          "They can be caused by one or a combination of leaf spotting pathogens. Pyrenophora tritici-repentis causes tan spot on leaves and can also infect wheat kernels causing red or pink smudge and black point",
          "Severely infected kernels can result in significant down grading of seed quality.",
        ],
      },
    ],
  },
  {
    name: "Olives",
    diseases: [
      {
        name: "Olive knot",
        symptoms: [
          "Olive knot can cause the death of small branches and twigs as well as the progressive debilitation of the tree, although it rarely kills it",
          "Crop production is reduced in terms of both fruit quantity and size",
          "Olives from infected branches have an unpleasant smell and a bitter, rancid taste",
        ],
      },
      {
        name: "Olive leaf spot",
        symptoms: [
          "The symptoms of this disease are generally lesions on the leaf blade, petiole, fruit peduncle and fruit.",
          "These occur on the upper surface of the leaves in the form of small round blotches with a grey or muddy spot in the centre 6–10 mm in diameter, reminiscent of a peacock’s eye.",
          "Defoliation, twig death and bloom failure may ensue",
        ],
      },
      {
        name: "Armillaria Root Rot",
        symptoms: [
          "Infected trees have slowly thinning canopies and appear weak",
          "This symptom often develops first on one side of the tree and then progresses over several years to involve the whole tree",
          "The bark and outer wood of the upper roots and crown show discoloration",
        ],
      },
      {
        name: "Phytophthora Root and Crown Rot",
        symptoms: [
          "Phytophthora-infected trees have reduced growth, thin canopies, and often die.",
          "If the disease progresses rapidly, trees may die in 1 or 2 years",
          "Roots rotted by Phytophthora are dark and trees affected for long periods by Phytophthora root rot may have few root hairs",
        ],
      },
    ],
  },
  {
    name: "Cauliflower",
    diseases: [
      {
        name: "Sclerotinia white mold",
        symptoms: [
          "Symptoms Disease is most commonly observed on aboveground plant parts",
          "Diseased tissues may first appear as water-soaked areas",
          "Turn a bleached white or brownish color with fluffy, cottony-white mycelium generally present",
        ],
      },
      {
        name: "Damping off",
        symptoms: [
          "The young radical and the plumule are killed and there is complete rotting of the seedlings",
          "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level",
          "The seedlings topple over or  collapse",
        ],
      },
      {
        name: "Black rot",
        symptoms: [
          "First appear as chlorotic or yellow (angular) areas near the leaf margins",
          "Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black",
          "Veins and veinlets turn brown and finally black",
        ],
      },
      {
        name: "Downy mildew",
        symptoms: [
          "Small purplish brown spots on under surface of leaves",
          "Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface",
          "The spots coalesce and the leaves shrivel and dries up prematurel",
        ],
      },
    ],
  },
  {
    name: "Safflower",
    diseases: [
      {
        name: "Sclerotinia Stem Rot",
        symptoms: [
          "Stem infections by sclerotia first appear just after flowering and are accompanied by a soft, watery rot of basal stems.",
          "These lesions enlarge into a watery, rotten mass of tissue that is covered by a white moldy growth.",
          "Dark, irregularly-shaped sclerotia are often found in and around infected stems. Infection of stems and branches will cause affected plant parts to wilt and later die, taking on a bleached and dried.",
        ],
      },
      {
        name: "Cercospora Leaf Spot",
        symptoms: [
          "Safflower plants a few weeks after planting or at flowering stage are commonly attacked",
          "Circular to irregular brown sunken spots of 3-10 mm diameter are formed on leaves",
          "In severe infections bracts are also affected with reddish brown spots.affected flower buds turn brown and die.",
        ],
      },
      {
        name: "Powdery Mildew",
        symptoms: [
          "A white powder-like powder is deposited on the leaves,twigs and stems of safflower.",
          "Due to its effect, the process of photosynthesis is inhibited",
          "The affected part of the plant turns black and dries up.",
        ],
      },
      {
        name: "Alternaria Leaf Blight",
        symptoms: [
          "Dark necrotic lesions 2-5 mm in diameter are formed first on hypocotyls and cotyledons.",
          "In mature plants, small brown to dark brown concentric spots of 1-2 mm appear on leaves.",
          "Symptoms also appear on the stem and severely infected plants get blighted.",
        ],
      },
    ],
  },
  {
    name: "Coffee",
    diseases: [
      {
        name: "Leaf Rust",
        symptoms: [
          "This is an important disease causing economic loss particularly in arabica coffee.",
          "On the lower surface of the infected leaves, small pale yellowish spots appear early after the first rains in the season.",
          "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation.severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
        ],
      },
      {
        name: "Berry Blotch",
        symptoms: [
          "Necrotic spots on the exposed surface of green berries enlarge and cover the major portion.",
          "Fruit skin shrivels and sticks fast to the parchment.",
          "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2–0.6 inches in diameter) of brown tissue",
        ],
      },
      {
        name: "Cercospora Leaf Spot",
        symptoms: [
          "Circular brown spots with light-brown/grey centers, surrounded by a wide dark brown ring and and yellow halos, around 15 mm wide appear on leaves",
          "The spots mostly occur between the veins and also on the margins. Sometimes spots grow into large blotches, and a leaf bligh occurs.",
          "This usually happens in cooler, wet areas above 600 m altitude. Infections on the berries are generally smaller, around 5 mm wide, but sometimes they cover the whole berry.",
        ],
      },
      {
        name: "Anthracnose / Dieback",
        symptoms: [
          "Monitor for this disease and treat at early stages of development on berries and branches.",
          "Early symptoms may be leaf yellowing and drop of leaves that are found mid-branch, small 'spots or lesions' on ripening berries",
          "Dark browning of lateral or vertical stem(s), vertical tip die-back, and premature berry death.",
        ],
      },
    ],
  },
  {
    name: "Cotton",
    diseases: [
      {
        name: "Black Arm/ Angular Leaf Spot",
        symptoms: [
          "Water-soaked spots on leaves which are delimited by leaf veins, giving them an angular appearance;",
          "Lesions Increase in size and turn black and necrotic;",
          "Leaves Drop from the plant; disease may also cause elongated gray-black lesions extending from the leaves to petioles and stem which are known as the 'blackarm' phase;",
        ],
      },
      {
        name: "Fusarium Wilt",
        symptoms: [
          "Initial symptoms on young seedlings are yellowing and browning of cotyledons, followed by brown ring on the petiole.",
          "Finally wilting & drying of the seedling occurs. Symptom at later stages includes loss of turgidity, yellowing, drooping and wilting starting from older leaves.",
          "Browning or blackening of vascular tissues occur on the stem and spreads upwards and downwards. Infected plants appear stunted with fewer bolls.",
        ],
      },
      {
        name: "Alterneria Leaf Spot",
        symptoms: [
          "The disease may occur in all stages but more severe when plants are 45-60 days old.",
          "Each spot has a central lesion surrounded by concentric rings.several spots coalesce together to form blighted areas.the affected leaves become brittle and fall off.",
          "Sometimes stem lesions are also seen.in severe cases, the spots may appear on bracts and bolls.",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Anthracnose in cotton can occur in all growth stages of the plant and it can affect all tissues.",
          "It produces small reddish to light brown circular spots with black necrotic margins on the cotyledons and primary leaves.",
          "If the lesions develop on the collar region, the stem may be girdled, causing seedling or young plants to wilt and die.",
        ],
      },
      {
        name: "Verticillium Wilt",
        symptoms: [
          "It affects the crop in square and boll formation stages Bronzing of veins followed by interveinal chlorosis, yellowing and scorching of leaves",
          "Leaves exhibit drying of leaf margins and areas between veins known as “tiger stripe symptom”",
          "Affected plants remain barren showing pinkish discolouration in stem and wood. It may produce smaller bolls",
        ],
      },
    ],
  },
  {
    name: "Beans",
    diseases: [
      {
        name: "Alternaria Leaf Spot",
        symptoms: [
          "Small irregular brown lesions on leaves which expand and turn gray-brown or dark brown with concentric zones",
          "Older areas of lesions may dry out and drop from leaves causing shot hole",
          "Lesions Coalesce to form large necrotic patches",
        ],
      },
      {
        name: "Bacterial Brown Spot",
        symptoms: [
          "Small, dark brown necrotic spots on leaves which may be surrounded by a zone of yellow tissue",
          "Water soaked spots on pods which turn brown and necrotic",
          "Pods may twist and distort in area of infection.",
        ],
      },
      {
        name: "Rust disease",
        symptoms: [
          "Initially the symptoms appear as small yellow/white spots on leaves.",
          "Later the spots become enlarged and shows raised brick red rust pustules (uredinia).",
          "Normally this pustules are surrounded by a yellow halo. Premature leaf drop may occur if the disease is severe.",
        ],
      },
      {
        name: "White Mold",
        symptoms: [
          "Flowers covered in white, cottony fungal growth;",
          "Small, circular, dark green, water-soaked lesions on pods leaves and branches which enlarge and become slimy",
          "Cottony white growth may be visible on lesions during periods of high humidity; death of branches and/or entire plant.",
        ],
      },
      {
        name: "Bacterial Blight",
        symptoms: [
          "Water-soaked spots on leaves which enlarge and become necrotic",
          "Spots may be surrounded by a zone of yellow discoloration; lesions coalesce and give plant a burned appearance",
          "Leaves That die remain attached to plant; circular, sunken, red-brown lesion may be present on pods; pod lesions may ooze during humid conditions.",
        ],
      },
    ],
  },
  {
    name: "Tomato",
    diseases: [
      {
        name: "Blossom End Rot Disease",
        symptoms: [
          "On tomato, the affected area may be mistaken for sunscald.sunscald develops as a white discoloration, but it occurs on the upper portions of the fruit, often the shoulders.",
          "Blossom end rot may also occur on the sides of the pepper fruit near the blossom end.",
          "Molds often colonize the damaged area of affected fruit, resulting in a dark brown or black appearance.",
        ],
      },
      {
        name: "Leaf Curl Virus (Tolcv).",
        symptoms: [
          "The new growth of plants with tomato yellow leaf curl has reduced internodes, giving the plant a stunted appearance",
          "The new leaves are also greatly reduced in size and wrinkled, are yellowed between the veins, and have margins that curl upward, giving them a cup-like appearance.",
          "Flowers may appear but usually will drop before fruit is set",
        ],
      },
      {
        name: "Early Blight",
        symptoms: [
          "The fungus attacks the foliage causing characteristic leaf spots and blight. Early blight is first observed on the plants as small, black lesions mostly on the older foliage.",
          "Spots enlarge, and by the time they are one-fourth inch in diameter or larger, concentric rings in a bull's eye pattern can be seen in the center of the diseased area.",
          "Tissue surrounding the spots may turn yellow. If high temperature and humidity occur at this time, much of the foliage is killed.",
        ],
      },
      {
        name: "Late Blight",
        symptoms: [
          "Brownish-green spots appear on the leaf margins and leaf tops. Later, large areas of the leaves turn brown completely.",
          "During wet weather, lesions on the lower side of the leaves may be covered with a gray to white moldy growth, making it easier to distinguish healthy from dead leaf tissue.",
          "Greyish-green to dirty-brown and wrinkled stains appear on the fruits. At these spots, the fruit flesh is hardened.",
        ],
      },
      {
        name: "Bacterial Wilt",
        symptoms: [
          "Characteristic symptoms of bacterial wilt are the rapid and complete wilting of normal grown up plants.",
          "Lower leaves may drop before wilting. Pathogen is mostly confined to vascular region; in advantage cases, it may invade the cortex and pith and cause yellow brown discolouration of tissues.",
          "Infected plant parts when cut and immersed in clear water, a white streak of bacterial ooze is seen coming out from cut ends.",
        ],
      },
      {
        name: "Fusarium Wilt",
        symptoms: [
          "The first symptom of the disease is clearing of the veinlets and chlorosis of the leaves.",
          "The younger leaves may die in succession and the entire may wilt and die in a course of few days. Soon the petiole and the leaves droop and wilt.",
          "In young plants, symptom consists of clearing of veinlet and dropping of petioles. In field, yellowing of the lower leaves first and affected leaflets wilt and die.",
        ],
      },
      {
        name: "Mosaic Disease",
        symptoms: [
          "The disease is characterized by light and day green mottling on the leaves often accompanied by wilting of young leaves in sunny days when plants first become infected.",
          "The leaflets of affected leaves are usually distorted, puckered and smaller than normal. Sometimes the leaflets become indented resulting in 'fern leaf' symptoms.",
          "The virus is spread by contact with clothes, hand of working labour, touching of infected plants with healthy ones, plant debris and implements.",
        ],
      },
    ],
  },
  {
    name: "Black pepper",
    diseases: [
      {
        name: "Phytophthora Foot Rot",
        symptoms: [
          "Black Spot On leaves are formed which enlarge rapidly and cause fall of the leaf. When the main stem at the base is damaged, the entire vine wilts and shed all the leaves and spikes.",
          "The tender leaves and succulent shoot tips of freshly emerging runner shoots trailing on the soil turn black when infected.",
          "The disease spreads to the entire vine, from these infected runner shoots and leaves, during intermittent showers due to rain splash.",
        ],
      },
      {
        name: "Pollu disease (Anthracnose)",
        symptoms: [
          "It can be distinguished from the pollu (hollow berry) caused by the beetle by the presence of characteristic cracks on the infected berries.",
          "The affected berries show brown sunken patches during early stages and their further development is affected.",
          "In later stages, the discolouration gradually increases and the berries show the characteristic cross splitting.finally, the berries turn black and dry. The fungus also causes angular to irregular brownish lesions with a chlorotic halo on the leaves.",
        ],
      },
      {
        name: "Basal Wilt",
        symptoms: [
          "Infected cuttings show greyish lesions on leaves and stems.",
          "White-Colored Mycelium appears which later girdle the stem, causing rotting and wilting.",
          "Small whitish to cream coloured grain like sclerotial bodies appear on the mature lesions.",
        ],
      },
      {
        name: "Slow Decline/pepper yellow disease",
        symptoms: [
          "Root necrosis and galling are the primary symptom of the disease.",
          "Foliar yellowing (mild to moderate), followed by defoliation, die-back is seen",
          "In more pronounced conditions whole vine die. Browning of vascular tissue is seen if Fusarium sp. Is associated with the disease.",
        ],
      },
    ],
  },
  {
    name: "Nutmeg&mace",
    diseases: [
      {
        name: "Die back",
        symptoms: [
          "The disease is characterized by drying up of mature and immature branches from the tip downwards.",
          "A few other fungi have been isolated from such trees.",
          "The infected branches should be cut and removed and the cut end pasted with Bordeaux mixture 1%",
        ],
      },
      {
        name: "Thread blight",
        symptoms: [
          "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan shaped or irregular manner causing blight in the affected portions.",
          "The second type of blight is called horse hair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
          "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a birds nest, when viewed from a distance.",
        ],
      },
      {
        name: "Fruit rot",
        symptoms: [
          "Immature fruit split, fruit rot and fruit drop are serious in a majority of nutmeg, Immature fruit splitting and shed- ding are noticed in some trees without any apparent infection.",
          "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discolouration of the rind resulting in rotting.",
          "In advanced stages, the mace also rots emitting a foul smell. Phytophthora sp. And Diplodia natalensis have been isolated from affected fruits.",
        ],
      },
      {
        name: "Leaf spot and shot hole",
        symptoms: [
          "Necrotic spots develop on the lamina which are encircled by a chlorotic halo.",
          "In advanced stages the necrotic spots become brittle and fall off resulting in shot holes.",
          "The infected branches should be cut and removed. The cut end should be pasted with Bordeaux paste",
        ],
      },
    ],
  },
  {
    name: "Sunflower",
    diseases: [
      {
        name: "Alternaria Blight",
        symptoms: [
          "The disease is a destructive one, widely distributed wherever the crop is grown.",
          "The most affected components are number of seeds per head and the seed yield per plant.",
          "Spots first appear on lower leaves, later spread to middle and upper leaves. At later stages, spots may be formed on petioles, stem and ray florets.",
        ],
      },
      {
        name: "Leaf Rust",
        symptoms: [
          "It is more prominent in the rabi season and in the kharif season the appearance is usually late.",
          "Uredo pustules appear first on the lower leaves. Uredo pustules appear on the younger leaves and later spread over the entire vegetative surface covering stems, petioles, floral bracts and petals.",
          "Uredia often coalesce to cover large areas on the affected plant parts.",
        ],
      },
      {
        name: "Downy Mildew",
        symptoms: [
          "Symptoms of the disease are evident as seedling damping off, systemic infection, local foliar lesions and basal root or stem galls.",
          "First symptoms are yellowing of the first pair of true leaves.",
          "Sunflower plants carrying systemic infection are severely stunted and leaves are entirely chlorotic.",
        ],
      },
      {
        name: "Septoria leaf spot",
        symptoms: [
          "Water-soaked circular or angular spots on leaves with a greasy,",
          "Greenish appearance on lower leaves",
          "Lesions are usually gray with a darker margin; some lesions may have a narrow yellow border; tiny black fungal fruiting bodies may be present in the lesions",
        ],
      },
    ],
  },
  {
    name: "Apple",
    diseases: [
      {
        name: "Scab disease",
        symptoms: [
          "Yellow or chlorotic spots on leaves.",
          "Dark olive green spots on leaves and fruit; may be a velvety growth on spots on undersides of leaves; twisting of leaves",
          "Distorted leaves; severely infected leaves turn yellow and drop from tree.",
        ],
      },
      {
        name: "Fire Blight",
        symptoms: [
          "Fire blight symptoms may appear on the blossoms, shoots, branches, trunk and rootstock.",
          "Watery exudate may be present on infected areas.",
          "Blighted blossoms appear wilted, shriveled and brown. Young fruitlets are also very susceptible",
        ],
      },
      {
        name: "Cedar apple rust",
        symptoms: [
          "Leaf spots are first yellow then turn bright orange-red, often with a bright red border.",
          "Small, raised, black dots form in the center of leaf spots on the upper leaf surface when the leaf spots mature.",
          "Rarely, green to brown irregular spots with black dots form on the fruit surface. Fruit spots do not extend deep into the fruit.",
        ],
      },
      {
        name: "Black rot",
        symptoms: [
          "Large brown rotten areas can form anywhere on the fruit but are most common on the blossom end.",
          "Brown to black concentric rings can often be seen on larger infections.",
          "The flesh of the apple is brown but remains firm. Small, black spots can be seen on older fruit infections.",
        ],
      },
    ],
  },
  {
    name: "Mango",
    diseases: [
      {
        name: "Powdery Mildew",
        symptoms: [
          "It attacks the leaves, flowers, stalks of panicle and fruits, causing superficial white powdery appearance on it",
          "The disease spread by wind very rapidly. Generally the infection starts from the inflorescence and spreads downwards covering the floral axis, tender leaves and soft stem.",
          "Flowers fail to open, blacken or become brown, dry and may fall from panicles",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "On leaves, lesions start as small, angular, brown to black spots that can enlarge to form extensive dead areas.",
          "The first symptoms on panicles are small black or dark-brown spots, which can enlarge coalesce and kill the flowers before fruits are produced. Petioles, twigs, and stems are also susceptible and develop into typical black colour.",
          "Twig dieback occurs when severe, elongated, blackened lesions form on stems and twigs die back apically.",
        ],
      },
      {
        name: "Mango malformation",
        symptoms: [
          "Vegetative Malformation: It is more commonly found on young seedlings. It is characterized by disrupting of apical growth resulting in several small flushes..",
          "The multi-branching of shoot apex with scaly leaves is known as “Bunchy Top” or “Witches’ Broom”. The malformed seedlings, remain stunted and die.",
          "Floral Malformation: In malformation of inflorescens, shows variation in the panicle. Malformed head dries up in black mass and persist for long time",
        ],
      },
      {
        name: "Bacterial Canker",
        symptoms: [
          "The disease is noticed on leaves, leaf stalks, stems, twigs, branches and fruits, initially producing water-soaked lesions, later turning into typical canker.",
          "Water-soaked irregular satellites to angular raised lesions measuring 1-4 mm in diameter are formed. These lesions are light yellow in colour, initially with yellow halo but with age enlarge or coalesce to form irregular necrotic cankerous patches with dark brown colour.",
          "Water-soaked, dark brown to black-coloured lesions are observed which gradually developed into cankerous, raised or flat spots. These spots often, burst extruding gummy substances containing highly contagious bacterial cells",
        ],
      },
      {
        name: "Mango Dieback",
        symptoms: [
          "The pathogen causing dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle etc.",
          "It is characterized by drying back of twigs from top to downwards, particularly in older trees followed by drying of leaves which gives an appearance of fire scorch.",
          "Internal browning in wood tissue is observed when it is slit open along with the long axis.",
        ],
      },
      {
        name: "Phoma Blight",
        symptoms: [
          "Symptoms of the disease are noticeable only on old leaves",
          "Initially, the lesions are angular, minute, irregular, yellow to light brown, scattered over leaf lamina.",
          "As the lesions enlarge their colour changes from brown to cinnamon and they become almost irregular.",
        ],
      },
      {
        name: "Mango Black Tip",
        symptoms: [
          "Symptoms become visible when the mango fruits attain marbel size",
          "Small etiolated area develops near the distal end of the fruit which gradually spreads, turns nearly black and covers the tip of the fruit completely",
          "The black area remains hard and the growth of the fruit is checked.",
        ],
      },
    ],
  },
  {
    name: "Quinoa",
    diseases: [
      {
        name: "Damping off",
        symptoms: [
          "Yellow leaves",
          "Pale or yellow choloric lesions on leaves surface",
          "Lesions turn pink, red, purple, or light-brown, depending on the plant’s pigments",
        ],
      },
      {
        name: "Downey mildew",
        symptoms: [
          "Round black spots on leaves",
          "Pale or yellow choloric lesions on leaves surface",
          "White downy growth appears on the surface of the leaves.",
        ],
      },
      {
        name: "Stalk rot",
        symptoms: [
          "Initial symptoms are small, humid spots on the upper-third part of the stalk.",
          "The foliage becomes chlorotic and wilts",
          "Panicle does not form grain and the stalk bends downward and tends to break easily.",
        ],
      },
      {
        name: "Leaf spot",
        symptoms: [
          "Dwarfing and bronze discolouration of the leaflets.",
          "Lesions on the leaves are of irregular shape, and are bronze to reddish-brown with darker edges.",
          "Stems shows necrosis",
        ],
      },
      {
        name: "Bacterial leaf spot",
        symptoms: [
          "Small irregular spots in leaves and stems",
          "Wilting",
          "Cankers on old twings and brances",
        ],
      },
    ],
  },
  {
    name: "Cardamom",
    diseases: [
      {
        name: "Foorkey viral disease",
        symptoms: [
          "Stunted growth",
          "Stunted sterile bushy shoots",
          "Drying of entire clump",
        ],
      },
      {
        name: "Chirkey viral disease",
        symptoms: [
          "Drying of plants",
          "Mosaic apprearance on leaves",
          "Drying, withering of leaves and finally plants die",
        ],
      },
      {
        name: "Blight",
        symptoms: [
          "Leaves becomes necrotic and dries",
          "Brittle pseudostem",
          "Lodging",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Water soaked lesions on leaves",
          "Entire bush appreas burnt",
          "Blackish brownish coloration of leaf sheath",
        ],
      },
    ],
  },
  {
    name: "Cardamom",
    diseases: [
      {
        name: "Africa cassava mosaic virus",
        symptoms: [
          "Deformed leaves",
          "Yellow or pale green leaf spots",
          "Reduced vegetative growth",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Cankers on young stems",
          "Brown necrosis on leaves",
          "Drying stems",
        ],
      },
      {
        name: "Bacterial blight",
        symptoms: ["Angular spots on limb", "Foliage burns", "Leaves wilt"],
      },
      {
        name: "Cassava brown streak",
        symptoms: ["Necrosis of roots", "Knots in the roots", "Root rot"],
      },
    ],
  },
  {
    name: "Sorghum",
    diseases: [
      {
        name: "Anthracnose and Red Rot",
        symptoms: [
          "The disease appears as small red coloured spots on both surfaces of the leaf.",
          "The centre of the spot is white in colour encircled by red, purple or brown margin.",
          "Numerous small black dots like acervuli are seen on the white surface of the lesions.",
        ],
      },
      {
        name: "Sorghum grain mould",
        symptoms: [
          "Develop a fluffy white or pinkish coloration. C. lunata colours the grain black.",
          "Grain infected with these fungi develop a fluffy white or pinkish coloration.",
          "Curvularia lunata is also frequently encountered and this fungus colors the grains black.",
        ],
      },
      {
        name: "Covered Kernel Smut",
        symptoms: [
          "The individual grains are replaced by smut sori. Sori are covered with creamy skin.",
          "Sori can be localized at a particular part of the head, or can occur over the entire inflorescence.",
          "Ratoon crops exhibit a higher disease incidence",
        ],
      },
      {
        name: "Sorghum downy mildew",
        symptoms: [
          "It invades the growing points of young plants, either through oospore or conidial infection.",
          "As the leaves unfold they exhibit green or yellow colouration.",
          "Abundant downy white growth is produced on the lower surface of the leaves, which consists of sporangiophores and sporangia.",
        ],
      },
      {
        name: "Head Smut",
        symptoms: [
          "The entire ear head is either completely or partially replaced by a large whitish gall.",
          "The spores are blown away, exposing the dark filaments",
        ],
      },
      {
        name: "Long Smut",
        symptoms: [
          "Relatively small proportion of the florets are infected.",
          "The sori or spore sacs are cylindrical, elongate, usually slightly curved with a relatively thick creamy-brown covering membrane.",
        ],
      },
      {
        name: "Loose smut",
        symptoms: [
          "The sori, which vary in length from 3 to 18 mm, is the solid long black (often curved) pointed columella which extends almost the full length of the sorus and which remains conspicuous after the smut spores have been blown away",
        ],
      },
      {
        name: "Rust",
        symptoms: [
          "The first symptoms are small flecks on the lower leaves (purple, tan or red depending upon the cultivar).",
          "Pustules (uredosori) appear on both surfaces of leaf as purplish spots which rupture to release reddish powdery masses of uredospores.",
          "The pustules may also occur on the leaf sheaths and on the stalks of inflorescence",
        ],
      },
    ],
  },
  {
    name: "Tobacco",
    diseases: [
      {
        name: "Damping off",
        symptoms: [
          "The young radical and the plumule are killed and there is complete rotting of the seedlings.",
          "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level.",
          "The infected tissues become soft and water soaked. The seedlings topple over or collapse.",
        ],
      },
      {
        name: "Leaf blight",
        symptoms: [
          "The disease is characterized by scattered, rapidly enlarging, irregular, brown, water-soaked lesions with characteristic gray-green borders.",
          "During mid nursery period causing leaf blight and blackening of roots and stems leading to death of seedlings. Water soaked brown to black lesions appear on the leaf.",
          "These patches enlarge and coalesce leading to wet rot of leaf tissue and midribs.",
        ],
      },
      {
        name: "Collar rot",
        symptoms: [
          "Just like damping off, sudden death of seedlings in patches is noticed in seed beds.",
          "Blackening of the collar region, wilting and rotting of leaves are the symptoms.",
          "Yellowing (chlorosis) of older leaves, wilting of plants, or flagging of leaf tips",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Symptom appears as small water soaked spots with sunken center on leaves.",
          "Spots become white with brown margin.",
          "Lesions occur also on midribs, petioles and lateral veins causing distortion and ragged.",
        ],
      },
      {
        name: "Frog eye leaf spot",
        symptoms: [
          "Several small, round brown lesions with 2-10 mm diameter on lower and mature leaves occur.",
          "Typical lesion with white parchment centre surrounded by brown or tan colored margin resembling eye of frog.",
          "Different spots coalesce causing drying of leaves which wither prematurely.",
        ],
      },
      {
        name: "Tobacco ring spot disease",
        symptoms: [
          "Infected leaves show mottling veins show shortened internodes with small, distorted leaves.",
          "In later growth of plant stunted and limited to basal suckers, and the vine eventually dies.",
          "Dead and dying vines are usually present in a roughly circular pattern in the vineyard.",
        ],
      },
      {
        name: "Cucumber mosaic disease",
        symptoms: [
          "Disease plants show leaves with mottling or mosaic pattern of light green and dark-green areas.",
          "Vein clearing, greenish yellow mottling occur as primary symptoms on newly formed young leaves.",
          "Infection on young plants results in stunted growth, malformation, distortion and puckering of leaves. Dark-green blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.",
        ],
      },
      {
        name: "Black shank",
        symptoms: [
          "The disease is characterized by scattered, rapidly enlarging, irregular, brown, water-soaked lesions with characteristic gray-green borders.",
          "Symptom development occurs particularly during and immediately following periods of heavy rains and high relative humidity.",
          "Wilting during the heat of the day.",
        ],
      },
      {
        name: "Brown spot",
        symptoms: [
          "Initially it appears on lower and older leaves as small brown, concentric circular lesions, which spread, to upper leaves, petioles, stalks and capsules even.",
          "In warm weather under high humidity, the leaf spots enlarge, 1-3 cm in diameter, centers are necroses and turn brown with characteristic marking giving target board appearance with a definite outline.",
          "In severe infection spots enlarge, coalesce and damage large areas making leaf dark-brown, ragged and worthless",
        ],
      },
      {
        name: "Broomrape (Orobanche)",
        symptoms: [
          "It is a complete root parasite affecting the yield and quality of tobacco.",
          "The shoots emerge in clusters and their basal portion is attached to tobacco roots through which it draws nourishment and depletes the host resulting in yield loss of 24 to 52%. Affected plants become stunted, leaves turn pale and wilt.",
          "Initially leaf tips droop and as the attack intensifies, all the leaves wilt.",
        ],
      },
      {
        name: "Leaf curl virus",
        symptoms: [
          "Disease is characterized by downward curling & rolling of leaves; thickening; dark green in colour with vein clearing effect; brittle; enation (cup like or frill like outgrowth), reduction in size.",
          "Infected plants become stunted due to shortening of internodes and formation of more lateral branches.",
          "Flowers are deformed; partly or completely sterile.",
        ],
      },
      {
        name: "Tobacco Mosaic Virus",
        symptoms: [
          "Affected plants show leaves with mottling or mosaic pattern of light green and dark-green areas.",
          "Primary symptoms appear on newly formed young leaves as vein clearing, greenish yellow mottling.",
          "Darkgreen blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.",
        ],
      },
      {
        name: "Powdery Mildew",
        symptoms: [
          "Initially greyish white spots (about 0.5-lcm in diameter) appear at the base of the lower leaves of the maturing plant.",
          "Sometimes leaves with incipient infection result in blemished on curing which reduce the commercial value of leaves.",
          "Such leaves on curing get scorched and show brown patches rendering them unfit for marketing.",
        ],
      },
    ],
  },
  {
    name: "Ginger",
    diseases: [
      {
        name: "Soft rot",
        symptoms: [
          "The leaves of the affected plants become yellow.",
          "Water soaked appearance is found at the base of the pseudostem and rotting takes place at the basal portion.",
          "The affected rhizomes become soft and pulpy and plants easily collapse on pressing.",
        ],
      },
      {
        name: "Bacterial wilt",
        symptoms: [
          "Mild drooping and curling of leaf margins of lower leaf and it is progressively spread through lower leaves to upper leaves.",
          "At the severe condition, yellowing and wilting symptoms can be seen.",
          "Milky ooze would be secreted from the affected pseudo stem and rhizome when they are gently pressed by fingers.",
        ],
      },
      {
        name: "Leaf spot",
        symptoms: [
          "The symptoms of the disease start as a water-soaked spot and later turns as a white spot surrounded by dark brown margins and a yellow halo.",
          "Yellow halo",
          "The lesions enlarge and adjacent lesions coalesce to form necrotic areas.",
        ],
      },
      {
        name: "Viral diseases",
        symptoms: ["Wilting", "Wilting of leaves", "Stunted growth"],
      },
    ],
  },
  {
    name: "Papaya",
    diseases: [
      {
        name: "Powdery mildew",
        symptoms: [
          "On the undersurface of disease leaves are found patches of whitish powder growth",
          "On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near vein, surrounded by normally colored tissue.",
          "Occasionally, fungus may attack the stem of young seedling when grown under reduced light condition.",
        ],
      },
      {
        name: "Foot rot",
        symptoms: [
          "It is characterized by the appearance of water-soaked patches on the stem near the ground level.",
          "These patches enlarge rapidly and girdle the stem, causing rotting of the tissues, which then turn dark brown or black. If the disease attack is mild, only one side of the stem rots and the plants remain stunted.",
          "Fruit if formed are shriveled and malformed. Gradually the plant dies.",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "The disease occurs both in the field and in storage conditions.",
          "The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in dia.",
          "Gradually the lesions coalesce and sparse mycelia growth appears on the margins of the spots.",
        ],
      },
      {
        name: "Papaya ring spot",
        symptoms: [
          "Infected plant initially shows chlorosis on youngest leaves followed by vein clearing, rugosity and prominent mottling of laminae.",
          "Malformation and reduction of the lamina which may become extremely filiform.",
          "Characteristically elongated dark green streak develop on petiole and upper half of the stems, infected fruits show circular concentric rings causes upto 56-60 % yield loss.",
        ],
      },
    ],
  },
  {
    name: "Grape",
    diseases: [
      {
        name: "Grapes Downy mildew",
        symptoms: [
          "Roughly circular yellowish discolorations, called oil spots. White down (sporulation of the fungus), particularly on the lower leaf surface.",
          "The spots turn brown with time and severely infected leaves may drop.",
          "Infected shoot tips curl ('shepherd's crook') and a white down occurs on the stem (sporulation of the fungus)",
        ],
      },
      {
        name: "Grapes Powdery Mildew",
        symptoms: [
          "The first powdery mildew lesions are frequently found on the undersides of leaves.",
          "Very small orange to black spherical structures called cleistothecia develop on the upper and lower surfaces of leaves",
          "The gradual degeneration of the fungus over the course of the season",
        ],
      },
      {
        name: "Grape Anthracnose",
        symptoms: [
          "The fungus will cause small round spots",
          "As they age, they give way to small holes (leaving a 'shot-hole' appearance)",
          "Shoots: Deep elongated cankers, greyish in the centre with a black edge",
        ],
      },
      {
        name: "Grape Grey Mold",
        symptoms: [
          "It can infect the green leaves and cause necrotic brown spots",
          "Infected berries become covered with a greyish felt-like substance consisting of spores of the fungus",
          "Inflorescences can also be infected (b), causing the inflorescences to dry out or latent infections visible only at veraison.",
        ],
      },
      {
        name: "Grapes black rot",
        symptoms: [
          "Leaves: presence of small brown lesions (2 to 10 mm in diameter) surrounded by a darker margin a ring of small black fruiting bodies (black pustules)",
          "Berries: At first, the berries become whitish then purple to black",
          "Berries: At the end of the season, berries will be covered by black pustules",
        ],
      },
    ],
  },
  {
    name: "Watermelon",
    diseases: [
      {
        name: "Anthracnose",
        symptoms: [
          "Foliage spots first appear as small brown spots that are circular to angular in shape.",
          "Foliage spots are irregular and turn dark brown or black. Stem lesions can girdle the stem and cause vines to wilt.",
          "The most striking diagnostic symptoms are produced on the fruit, where circular, black, sunken cankers appear.",
        ],
      },
      {
        name: "Alternaria leaf spot",
        symptoms: [
          "The disease starts as small, yellow spots which enlarge to form concentric rings on the upper leaf surfaces.",
          "The pathogen also may cause fruit injury.",
          "Plants weakened by lack of proper fertilizer or poor soils are more likely to be attacked than young, vigorously growing plants.",
        ],
      },
      {
        name: "Bacterial fruit blotch",
        symptoms: [
          "Early symptoms of fruit blotch on foliage are useful in diagnosis. Small, water-soaked areas (a few millimeters in diameter) on cotyledons or leaves may develop, but they are easily overlooked.",
          "These later turn brown, but they remain small and do not severely damage leaves. However, the leaf spots serve as a source of the pathogen to infect fruit.",
          "Fruit infections first appear as small, water-soaked areas on the upper surface of melons.",
          "Initially, the blotches do not extend into the rind, but affected rinds eventually crack and become invaded by secondary pathogens.",
        ],
      },
      {
        name: "Cercospora leaf spot",
        symptoms: [
          "The disease is mostly confined to leaves, but stems and petioles may become diseased.",
          "Leaf spots first appear on younger leaves as small circular spots having dark green to purple margins, becoming white to light tan in the center.",
          "The leaf lamina around the spots may become chlorotic and eventually the entire leaf may turn yellow and fall off.",
        ],
      },
      {
        name: "Cucumber mosaic disease",
        symptoms: [
          "Symptoms of mosaic appear on the youngest leaves when infection occurs at 6 – 8 leaves stage.",
          "Leaves curl downwards and become mottled, distorted, wrinkled and reduced in size.",
          "Veins appear bunchy because of shortening of internodes.",
        ],
      },
      {
        name: "Downy mildew",
        symptoms: [
          "It is evident as a superficial, powdery, grayish-white growth on upper leaf surfaces, petioles, and even main stems of infected plants.",
          "Affected areas turn yellow then brown and die.",
          "Some early disease results from spores produced on overwintering cucurbit debris or weeds but the major source of disease inoculum is windblown spores from southern crops.",
        ],
      },
      {
        name: "Fusarium wilt",
        symptoms: [
          "Symptoms first appear as dull, greyish green appearance to the foliage.",
          "Affected vines wilt, become dry, turn brown and die.",
          "Elongated brown lesions (dead areas) may develop along stems near the crown.",
        ],
      },
      {
        name: "Gummy stem blight",
        symptoms: [
          "Infected stems first appear water-soaked and then become dry, coarse, and tan.",
          "Older stem lesions (dead tissue) reveal small black fruiting bodies (pycnidia) within the affected tissues.",
          "Stem lesions on melons exude a gummy, red-brown substance which may be mistaken for a symptom of Fusarium wilt.",
        ],
      },
      {
        name: "Powdery mildew",
        symptoms: [
          "Powdery mildew first appears on the oldest leaves as yellow areas on the upper leaf surface.",
          "The white mildew on the underside of the leaf often can only be seen with the aid of a hand lens.",
          "As the disease increases, the areas of whitish, powdery growth become more apparent and can cover both upper and lower leaf surfaces.",
        ],
      },
      {
        name: "Sudden Wilt",
        symptoms: [
          "Initial symptoms are a slight flagging of the plants in midday even when abundant moisture is present.",
          "This flagging will continue to worsen so that, by the third or fourth day, many of the plants are completely wilted.",
          "Affected plants appear to lack feeder roots; other roots become slightly misshapen and thick.",
        ],
      },
      {
        name: "Virus diseases (PRSV, WMV and ZYMV)",
        symptoms: [
          "Symptoms are most striking on the new growth of young, rapidly growing plants.",
          "Leaves are dwarfed, misshapen, puckered, pale green in color, and exhibit mosaic patterns of light and dark green color.",
          "Infected plants remain stunted throughout the season and may fail to set fruit or it will be small in size and poor in quality.",
          "Sometimes the vine terminals of infected plants become erect and hover over the canopy.",
        ],
      },
      {
        name: "Yellow vine",
        symptoms: [
          "Affected plants are often most numerous near edges of fields and appear in patches. Plants turn yellow and die back.",
          "Numerous squash bugs may be present or there will be evidence of their prior feeding.",
          "When basal stems of affected plants are cross-sectioned, a ring of light brown discoloration is evident around the outer part (phloem) of the vascular core.",
        ],
      },
      {
        name: "Root-knot nematode",
        symptoms: [
          "Aboveground, plants affected by root-knot nematode appear yellowed, stunted, or generally unthrifty.",
          "Affected areas often occur as patchy areas in a field or along a row of plants.",
          "Affected roots are disfigured, swollen, and stubby in appearance.",
        ],
      },
      {
        name: "Verticillium wilt",
        symptoms: [
          "Symptoms first appear as yellowed wedge-shaped areas on older leaves, which eventually develop brown sectors.",
          "Crown leaves collapse and wilt extends along individual vines.",
          "Wilt symptoms often are one-sided, in that individual vines wilt before the entire plant dies.",
        ],
      },
    ],
  },
  {
    name: "Blueberry",
    diseases: [
      {
        name: "Botrytis blossom blight (Gray mold)",
        symptoms: [
          "Corollas of expanded blossoms appear blighted; brown lesions on leaves which have come into contact with infected blossoms.",
          "Infected blossoms do not produce fruit",
          "In large fields, severe infections are often visible as brown patches",
        ],
      },
      {
        name: "Mummy berry (Fungal)",
        symptoms: [
          "Infected berries are cream or pink in color and turn tan or gray",
          "Berries become shriveled and hard; shriveled skin of fruit breaks down to expose black rind of fungal tissue",
          "Death of infected shoots,leaves and flowers",
        ],
      },
      {
        name: "Powdery mildew",
        symptoms: [
          "White fluffy growth on upper surfaces of leaves or lower leaf surface",
          "Leaves may be puckered in appearance; leaves may develop chlorotic spots with red borders",
          "Leaves may drop from plant",
        ],
      },
      {
        name: "Blueberry shoestring virus",
        symptoms: [
          "Elongated reddish streaks on green stems,purplish red leaves,cupped leaves.",
          "Leaves may be elongated or strap-like.",
          "Reddish-purple fruit",
        ],
      },
    ],
  },
  {
    name: "Broccoli",
    diseases: [
      {
        name: "White rust",
        symptoms: [
          "It is a soil-borne disease caused by the fungus Sclerotiniascelorotiorum.",
          "The white rust fungus attacks the lower surface of the outer leaves, and plants suddenly die.",
          "White rust is an obligate parasite that attacks vegetative and flowering structures of the plants and can cause yellow lesions on the upper surface",
        ],
      },
      {
        name: "Damping off",
        symptoms: [
          "The young radical and the plumule are killed and there is complete rotting of the seedlings",
          "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level",
          "The seedlings topple over or  collapse",
        ],
      },
      {
        name: "Black rot",
        symptoms: [
          "First appear as chlorotic or yellow (angular) areas near the leaf margins",
          "Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black",
          "Veins and veinlets turn brown and finally black",
        ],
      },
      {
        name: "Downy mildew",
        symptoms: [
          "Small purplish brown spots on under surface of leaves",
          "Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface",
          "The spots coalesce and the leaves shrivel and dries up prematurel",
        ],
      },
    ],
  },
  {
    name: "Avocado",
    diseases: [
      {
        name: "Root rot",
        symptoms: [
          "The first signs of the disease are observed in the tree canopy.",
          "Leaves are small, pale green, often wilted with brown tips, and drop readily.",
          "Shoots die back from the tips, and eventually the tree is reduced to a bare framework of dying branches.",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Plants can get anthracnose at any stage, but it causes the most damage between flowering and harvesting.",
          "Dry spots, dark brown in color, form on the skin, leading to abnormal development.",
          "In severe attacks, the young fruits drop.",
        ],
      },
      {
        name: "Cercospora Fruit Spot",
        symptoms: [
          "Symptoms occur on leaves, fruit, twigs and fruit stems at any time during the growing season",
          "Small, light-yellow spots later changing to reddish-brown appear on fruits and leaves which eventually become hard and crack.",
          "On fruit, the first sign of infection is a darkening of the epidermis followed by swelling of the underlying tissues which raises a small dark spot.",
        ],
      },
      {
        name: "Scab disease",
        symptoms: [
          "Symptoms on fruit initially appear as corky, raised, oval or irregular shaped brown to purplish-brown spots.",
          "As the disease progresses, spots enlarge and coalesce to form large rough areas over the fruit surface.",
          "Cracking of these rough areas may allow secondary organisms to penetrate and rot the fruit.",
        ],
      },
    ],
  },
  {
    name: "Pineapple",
    diseases: [
      {
        name: "Mealybug wilt",
        symptoms: [
          "The most visible symptom is a bright bronze to red colouration of the leaves of the young plant or a pinkish and/or yellowish colouration of the older leaves.",
          "Wilting starts at the tip of the leaves.",
          "If the plants continue to grow, the leaves lose turgidity and curl outwards",
        ],
      },
      {
        name: "Root Rot",
        symptoms: [
          "These fungal problems are caused by various Phytophthora and Pythium species.",
          "The symptoms of root rots are a reduction in plant growth with the development of reddish coloured leaves and the browning of the leaf margins.",
          "Affected plants eventually die",
        ],
      },
      {
        name: "Phytophthora heart rot",
        symptoms: [
          "The symptoms are rotting at the base of the leaves in the centre of the leaf whorl (heart) of young non-flowering plants.",
          "In a more developed stage, young leaves can easily be pulled from the plant.",
          "The base of the leaves eventually rots and has a bad smell.",
        ],
      },
      {
        name: "Fruitlet core rot",
        symptoms: [
          "Fruitlet Core Rot is caused by a combination of Penicillium and Fusarium spp.",
          "Although the symptoms of this disease generally appear during storage, infection starts in the field. Mites are thought to be associated with this disease, through causing injury to the fruitlets.",
          "The infected tissue of the fruit has a water-soaked appearance which eventually discolours becoming light to dark brown.",
        ],
      },
    ],
  },
  {
    name: "Turmeric",
    diseases: [
      {
        name: "Soft rot",
        symptoms: [
          "The leaves of the affected plants become yellow.",
          "Water soaked appearance is found at the base of the pseudostem and rotting takes place at the basal portion.",
          "The affected rhizomes become soft and pulpy and plants easily collapse on pressing.",
        ],
      },
      {
        name: "Leaf blotch",
        symptoms: [
          "The spots of 1-2mm diameter appear in more numbers, covering both sides of leaf.",
          "The attacked leaf presents a reddish brown appearance instead of the normal green colour.",
          "These spots coalesce to form irregular bigger patches.",
        ],
      },
      {
        name: "Leaf spot",
        symptoms: [
          "The symptoms of the disease start as a water-soaked spot and later turns as a white spot surrounded by dark brown margins and a yellow halo.",
          "Yello halo",
          "The lesions enlarge and adjacent lesions coalesce to form necrotic areas.",
        ],
      },
      {
        name: "Viral diseases",
        symptoms: ["Wilting", "Wilting of leaves", "Stunted growth"],
      },
    ],
  },
  {
    name: "Strawberry",
    diseases: [
      {
        name: "Botrytis Rot (Gray Mold)",
        symptoms: [
          "Small brown lesions near top of berries (early on)",
          "Powdery dead young leaves",
          "Soft and mushy rotten holes or areas on fruit",
        ],
      },
      {
        name: "Powdery Mildew",
        symptoms: [
          "An early symptom of the disease is upward curling of the leaf margins.",
          "White powdery splotches on the top of leaves or stems",
          "Leaves look like they’re dusted with white powder (especially the underside)",
        ],
      },
      {
        name: "Leaf Spot",
        symptoms: [
          "Spots may later turn into tan or white centers with rusty-brown margins",
          "Spots may merge together and kill whole leaves",
          "Black or brown leathery texture on fruits near spots",
        ],
      },
      {
        name: "Fusarium Wilt",
        symptoms: [
          "It is fast acting as strawberry plants can suddenly wilt and die.",
          "This disease affects the outer leaves first; they become yellow and eventually take on a scorched appearance.",
          "It enters through roots and affects the water-conducting tissues in the crown",
        ],
      },
      {
        name: "Charcoal Rot",
        symptoms: [
          "Wilting foliage in spite of ample water",
          "Older leaves drying and dying off while younger leaves remain green",
          "Orange or reddish-brown coloration in center of crowns",
        ],
      },
      {
        name: "Leaf Scorch",
        symptoms: [
          "Irregular dark purple or brown spots scattered over leaf surface",
          "Spots with purple centers and no defined border (the leaf spot disease has a clear margin)",
          "Dead leaves, flowers, or fruit (in severe infections)",
        ],
      },
      {
        name: "Alternaria Fruit Spot",
        symptoms: [
          'Lesions or "spots" are more numerous on upper leaf surfaces and appear circular to irregular in shape.',
          "These lesions often have definite reddish-purple to rusty-brown borders that surround a necrotic area.",
          "Susceptible varieties can be defoliated partly or completely by late summer.",
        ],
      },
      {
        name: "Leaf Blotch",
        symptoms: [
          "Gray and tan lesions that begin at leaf margins",
          "Blotches spread to cover first new leaves of spring plants",
          "Brownish decay of the fruit calyx (green leaves on top of berries) that is purely cosmetic",
        ],
      },
      {
        name: "Verticillium Wilt",
        symptoms: [
          "Rapid wilting and death of lots of plants",
          "Leaves turn dry, yellow, reddish, or brown at the margins and in the veins. New leaves stop developing",
          "Bluish or brownish-black blotches on runners",
        ],
      },
      {
        name: "Red Stele/Red Core",
        symptoms: [
          "Infected plants are stunted, with few runners and few fruit.",
          "New leaves are with bluish-green and may wilt",
          "Older leaves may be reddish orange to yellow tinged",
        ],
      },
      {
        name: "Phomopsis Leaf Blight",
        symptoms: [
          "Blotches are delineated by leaf veins",
          "Central dark brown to purple zone with reddish or lighter brown outer areas",
          "They have formed in older, necrotic diseased tissue and are diagnostic for Phomopsis leaf blight.",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "Brown or black colored spots on green and ripe berries",
          "Spots appear water-soaked",
          "There are several spots on each berry ",
        ],
      },
      {
        name: "Leather Rot",
        symptoms: [
          "Infects strawberry bloom and green or mature fruit.",
          "Infected blossom clusters turn brown and die.",
          "Green fruit become hard and leathery.",
        ],
      },
      {
        name: "Sime Moulds",
        symptoms: [
          "Slimy or crusty beadlike structures that cover straw, lower leaves, sometimes petioles.",
          "Creamy-white, grey, purple or yellow.",
          "Eventually produce fruiting structures that are marshmallow-like in texture and produce powdery dry black spores.",
        ],
      },
      {
        name: "Nematodes",
        symptoms: [
          "Fewer fine feeder roots and a bushy appearance",
          "Reddish-brown lesions on feeder roots (root lesion nematode), swells or galls on feeder roots (root knot nematode).",
          "Uneven plant growth",
        ],
      },
    ],
  },
  {
    name: "Pea",
    diseases: [
      {
        name: "Wilt",
        symptoms: [
          "Yellowing of lower leaves and stunting of plants.",
          "The stem may be slightly swollen and brittle near the soil.",
          "Externally, the root system appears healthy; however, secondary root rots are likely to occur on plants wilted for long periods.",
        ],
      },
      {
        name: "Powdery Mildew",
        symptoms: [
          "It attacks leaves first, producing faint, slightly discolored specks from which grayish white powdery growth of mycelium develops.",
          "Powdery growth spreads over leaf, stem, and pod.",
          "The leaves turn yellow and die.",
        ],
      },
      {
        name: "Rust",
        symptoms: [
          "The stem of the plant becomes malformed and the affected plant dies out.",
          "Yellow spots having aecia in round or elongated clusters.",
          "Then the uredopustules develop which are powdery and light brown in appearance.",
        ],
      },
      {
        name: "Root rot",
        symptoms: [
          "Reddish brown to black streaks appear on primary and secondary roots.",
          "These streaks coalesce at later stages, leading to girdling of the lower stem.",
          "Red discoloration of the vascular system can be seen, especially near cotyledon attachment.",
        ],
      },
      {
        name: "Pod Spot and Ascochyta Blight",
        symptoms: [
          "Black to purplish streaks on stems reaching from the root zone to about 25 cm up the stem.",
          "Leaf spots are gray-purplish.",
          "Foot and stem lesions girdle and weaken the stem, leading to crop lodging and yield loss.",
        ],
      },
      {
        name: "Downy mildew",
        symptoms: [
          "A grayish white, moldy growth appears on the lower leaf surface, and a yellowish area appears on the opposite side of the leaf.",
          "Infected leaves can turn yellow and die if the weather is cool and damp.",
          "Stems may be distorted and stunted.",
          "Brown blotches appear on pods, and mold may grow inside pods.",
        ],
      },
      {
        name: "Mosaic and Streak",
        symptoms: [
          "Mottled patterns on leaves.",
          "Yellow leaf veins.",
          "Downward curling of leaflets as well as a transient clearing and swelling of leaf veins in most cultivars.",
        ],
      },
    ],
  },
  {
    name: "Carrot",
    diseases: [
      {
        name: "Bacterial soft rot",
        symptoms: [
          "The disease generally appears as a soft, watery, and slimy decay of the taproot. The decay rapidly consumes the core of the carrot, often leaving the epidermis/peel intact.",
          "Rotted tissues retain their natural color until they completely decay. The infected carrot is not fit for consumption and unsellable.",
          "A foul odor may be associated with soft rot.",
        ],
      },
      {
        name: "Powdery mildew",
        symptoms: [
          "Whitish powdery growth on the undersurface of the leaves.",
          "As the disease progresses, powdery spots appear on both surfaces of the leaves and on stems.",
          "Under severe disease pressure, the leaves turn brown, twisted, and brittle before shriveling and dying.",
        ],
      },
      {
        name: "Leaf blight",
        symptoms: [
          "Older leaves are attacked first.",
          "Dark grey to brown spots, angular, with yellow margins, occur on the leaves and petioles.",
          "Under favorable conditions, the spots merge and the leaves rapidly blacken, wither, and die.",
        ],
      },
    ],
  },
  {
    name: "Sweet Potato",
    diseases: [
      {
        name: "Sweet Potato Virus disease",
        symptoms: [
          "Stunted vines.",
          "Narrow yellow leaves with deformed edges.",
          "Yield reductions in roots.",
        ],
      },
      {
        name: "Black rot",
        symptoms: [
          "Symptoms generally are seen at harvest, after curing or after storage.",
          "A dry, firm, dark-colored rot that does not extend into the cortex of the sweet potato root.",
          "Dark sunken, darkish spots on the roots and the lower parts of the stem.",
        ],
      },
      {
        name: "Early blight",
        symptoms: [
          "Necrotic spots observed on lower leaves.",
          "Discoloring, wilting, and death of foliage and, eventually, the death of the sweet potato vine.",
          "It rapidly spreads in high moisture and low temperature.",
        ],
      },
      {
        name: "Black scurf",
        symptoms: [
          "Black specks observed on tubers.",
          "Affected plants show drying up.",
          "In infected tubers, at the time of sprouting, black, brown color appears on eyes.",
        ],
      },
      {
        name: "Potato mosaic virus",
        symptoms: [
          "Unhealthy plants with leaf discoloration.",
          "Wilting leaves.",
          "Stunted growth.",
        ],
      },
    ],
  },
  {
    name: "Rose",
    diseases: [
      {
        name: "Powdery mildew",
        symptoms: [
          "White powdery growth is visible on the plant.",
          "Infected leaves turn purplish and drop.",
          "Flower buds may fail to open.",
        ],
      },
      {
        name: "Black spot",
        symptoms: [
          "Conspicuous circular black spots with fringed margins appear on either side of leaves.",
          "Leaves become chlorotic.",
          "Leaves dry up and drop prematurely.",
        ],
      },
      {
        name: "Rose mosaic virus",
        symptoms: [
          "Yellowing in a mosaic pattern. Chlorotic (yellow) rings or wavy lines (which can look similar to leaf miner damage).",
          "Yellowing of the veins.",
          "Mottled flower color.",
        ],
      },
      {
        name: "Crown gall",
        symptoms: [
          "New crown galls are usually pale colored and somewhat round.",
          "As they enlarge, they become rough, irregularly shaped, and hard.",
          "Crown gall can easily be confused with the graft union, but the graft union will not continue to grow larger.",
        ],
      },
    ],
  },
  {
    name: "Cowpea",
    diseases: [
      {
        name: "Bacterial blight",
        symptoms: [
          "The germinating seedling turns brown-red and dies.",
          "Irregular to round brown spots with chlorotic halos appear on leaves, and later spread to the stem.",
          "Stem may break, pods are also infected leading to shriveled seeds.",
        ],
      },
      {
        name: "Cowpea mosaic",
        symptoms: [
          "It is caused by a virus transmitted by aphids.",
          "The affected leaves become pale yellow and exhibit mosaic, vein banding symptoms.",
          "The affected leaves become reduced in size and show puckering. Pods are also reduced and become twisted.",
        ],
      },
      {
        name: "Powdery mildew",
        symptoms: [
          "Powdery mildew is visible on all the aerial parts of the affected plants.",
          "Symptoms first start from leaves and then spread to stem, branches, and pods.",
          "This white growth consists of the fungus and its spores.",
        ],
      },
      {
        name: "Anthracnose",
        symptoms: [
          "The fungus attacks all aerial parts and at any stage of plant growth.",
          "Symptoms include circular, black, sunken spots with a dark center and bright red-orange margins on leaves and pods.",
          "In severe infections, the affected parts wither off.",
        ],
      },
      {
        name: "Macrophomina root rot",
        symptoms: [
          "Symptoms begin appearing at 4 weeks as raised white cankers at the base of the stem.",
          "The affected plants become stunted with dark green and mottled leaves that are reduced in size.",
          "Leaves of affected plants dry and drop.",
        ],
      },
    ],
  },
];

module.exports = {
  diseasesAndSymptomsData,
};
