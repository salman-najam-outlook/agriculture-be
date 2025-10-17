'use strict';

const speciesData = [
  {
    "symbol": "ABHI",
    "genus": "Abies",
    "species": "hickelii",
    "name": "Oyamel"
  },
  {
    "symbol": "ABRE",
    "genus": "Abies",
    "species": "religiosa",
    "name": "Oyamel"
  },
  {
    "symbol": "ACAN",
    "genus": "Acacia",
    "species": "angustissima",
    "name": "Cantemo"
  },
  {
    "symbol": "ACCO",
    "genus": "Acacia",
    "species": "cornigera",
    "name": "Subin"
  },
  {
    "symbol": "ACDO",
    "genus": "Acacia",
    "species": "dolichostachya",
    "name": "Yaax chname"
  },
  {
    "symbol": "ACFA",
    "genus": "Acacia",
    "species": "farnesiana",
    "name": "Sak k'ix"
  },
  {
    "symbol": "ACGA",
    "genus": "Acacia",
    "species": "gaumeri",
    "name": "Boxcatzin"
  },
  {
    "symbol": "ACGL",
    "genus": "Acacia",
    "species": "glomerosa",
    "name": "Hupich"
  },
  {
    "symbol": "ACME",
    "genus": "Acrocomia",
    "species": "mexicananameKarw. ex Mart.",
    "name": "Cocoyol"
  },
  {
    "symbol": "ACPA",
    "genus": "Acosmium",
    "species": "panamense",
    "name": "Cencerro"
  },
  {
    "symbol": "ACPE",
    "genus": "Acacia",
    "species": "pennatula",
    "name": "Tepame, Chimay"
  },
  {
    "symbol": "ACRE",
    "genus": "Acacia",
    "species": "retinoides",
    "name": "Acacia plateada"
  },
  {
    "symbol": "ACSK",
    "genus": "Acalypha",
    "species": "Skutchii",
    "name": ""
  },
  {
    "symbol": "ACSP",
    "genus": "Acacia",
    "species": "sp.",
    "name": "Chak"
  },
  {
    "symbol": "ACWR",
    "genus": "Acoelorrhapne",
    "species": "wrightii",
    "name": "tasiste"
  },
  {
    "symbol": "ADBE",
    "genus": "Adelia",
    "species": "berbinervis. & Cham.",
    "name": "Sak ox"
  },
  {
    "symbol": "AEAM",
    "genus": "Aeschynomene",
    "species": "americana L.",
    "name": "Tamarindillo"
  },
  {
    "symbol": "AGMA",
    "genus": "Agonandra",
    "species": "macrocarpa",
    "name": "Naranjillo"
  },
  {
    "symbol": "AGRA",
    "genus": "Agonandra",
    "species": "racemosaname",
    "name": "Chilillo"
  },
  {
    "symbol": "AGUC",
    "genus": "Cinnamomum",
    "species": "cinnamomifolium",
    "name": "Aguacatillo"
  },
  {
    "symbol": "AILE",
    "genus": "Alnus",
    "species": "acuminata",
    "name": "Aile"
  },
  {
    "symbol": "ALAM",
    "genus": "Alvaradoa",
    "species": "amorphoides ssp. Amorphpodes",
    "name": "Bel sinik che'"
  },
  {
    "symbol": "ALAR",
    "genus": "Alnus",
    "species": "arguta",
    "name": "Ailite"
  },
  {
    "symbol": "ALCO",
    "genus": "Allophylus",
    "species": "cominia",
    "name": "Palo chachalaca"
  },
  {
    "symbol": "ALFI",
    "genus": "Alnus",
    "species": "firmifolia",
    "name": "Aile"
  },
  {
    "symbol": "ALGU",
    "genus": "Albizia",
    "species": "guachapele (Kunth) Dugand",
    "name": "Siete colmenas"
  },
  {
    "symbol": "ALJO",
    "genus": "Alnus",
    "species": "jorullensis",
    "name": "Aile"
  },
  {
    "symbol": "ALLA",
    "genus": "Alchornea",
    "species": "latifolia",
    "name": "canaque"
  },
  {
    "symbol": "ALNI",
    "genus": "Albizia",
    "species": "niopoides (Spruce ex Benth.) Burkart",
    "name": "Cantemname"
  },
  {
    "symbol": "ALTO",
    "genus": "Albizia",
    "species": "tomentosaname(Micheli) Standl.",
    "name": "Arrocillo"
  },
  {
    "symbol": "ALYU",
    "genus": "Alseis",
    "species": "yucatanensis",
    "name": "Tabaquillo"
  },
  {
    "symbol": "AMAD",
    "genus": "Amphipterygium",
    "species": "adstringens",
    "name": "Cuachalalate"
  },
  {
    "symbol": "AMDE",
    "genus": "Amelanchier",
    "species": "denticulata",
    "name": "Tlaxistle"
  },
  {
    "symbol": "AMEL",
    "genus": "Amyris",
    "species": "elemiferanameL.",
    "name": "K'aan ch'am"
  },
  {
    "symbol": "AMSP",
    "genus": "Amelanchier",
    "species": "sp.",
    "name": "Rosal"
  },
  {
    "symbol": "AMSY",
    "genus": "Amyris",
    "species": "sylvatica Jacq.",
    "name": "Palo gas"
  },
  {
    "symbol": "ANGL",
    "genus": "Annona",
    "species": "glabraname",
    "name": "Corcho"
  },
  {
    "symbol": "ANLO",
    "genus": "Annona",
    "species": "longiflora",
    "name": "Anona"
  },
  {
    "symbol": "ANPR",
    "genus": "Annona",
    "species": "primigenia",
    "name": "Anonilla"
  },
  {
    "symbol": "ANSP",
    "genus": "Annona",
    "species": "sp.",
    "name": "Anona"
  },
  {
    "symbol": "APMO",
    "genus": "Aphananthe",
    "species": "monoica",
    "name": "Cerezalname"
  },
  {
    "symbol": "APPA",
    "genus": "Apoplanesia",
    "species": "paniculata",
    "name": "Chuulul"
  },
  {
    "symbol": "APSP",
    "genus": "Aphelandra",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "ARCO",
    "genus": "Ardisia",
    "species": "compressa",
    "name": "SNC"
  },
  {
    "symbol": "ARGL",
    "genus": "Arbutus",
    "species": "glandulosa",
    "name": "Madrono"
  },
  {
    "symbol": "ARMA",
    "genus": "Arbutus",
    "species": "madrensis",
    "name": "Madronameo de la Sierra Madre Occidental"
  },
  {
    "symbol": "ARMO",
    "genus": "Arbutus",
    "species": "mollis",
    "name": "Madronameo de agua"
  },
  {
    "symbol": "ARNE",
    "genus": "Arce",
    "species": "negundo",
    "name": "Arce"
  },
  {
    "symbol": "ARPU",
    "genus": "Arctostaphylos",
    "species": "pungens",
    "name": "Pingnameica"
  },
  {
    "symbol": "ARSI",
    "genus": "Arnica",
    "species": "montana",
    "name": "Arnica Silvestre"
  },
  {
    "symbol": "ARSP",
    "genus": "Ardisia",
    "species": "sp.",
    "name": "pata de paloma"
  },
  {
    "symbol": "ARTE",
    "genus": "Arbutus",
    "species": "tessellata",
    "name": "Madronameo Mexicano"
  },
  {
    "symbol": "ASGR",
    "genus": "Astronium",
    "species": "graveolens",
    "name": "K'ulensiis"
  },
  {
    "symbol": "ASME",
    "genus": "Aspidosperma",
    "species": "megalocarpon",
    "name": "Pelmax, bayo blanco, peel manameax"
  },
  {
    "symbol": "ASTR",
    "genus": "Astrocasia",
    "species": "tremula",
    "name": "Pixtnamen kaax"
  },
  {
    "symbol": "ATBU",
    "genus": "Attalea",
    "species": "butyracea (Mutis ex L. f.) Wess. Boer",
    "name": "Corozo"
  },
  {
    "symbol": "AVBI",
    "genus": "Avicennia",
    "species": "bicolor",
    "name": "Magle salado"
  },
  {
    "symbol": "AVGE",
    "genus": "Avicennia",
    "species": "germinansname",
    "name": "Mangle negro o prieto"
  },
  {
    "symbol": "BEGU",
    "genus": "Bertiera",
    "species": "guianensis",
    "name": ""
  },
  {
    "symbol": "BIOR",
    "genus": "Bixa",
    "species": "orellana",
    "name": "k'uxu che'"
  },
  {
    "symbol": "BLCU",
    "genus": "Blomia",
    "species": "cupanioides",
    "name": "Ts'ool"
  },
  {
    "symbol": "BOMA",
    "genus": "Bonellia",
    "species": "macrocarpa (Cav.) B. Stnamehl & Knamellersjname",
    "name": "Chak siik"
  },
  {
    "symbol": "BOMO",
    "genus": "Bourreria",
    "species": "mollis Standl.",
    "name": "Ju'uche"
  },
  {
    "symbol": "BOPU",
    "genus": "Bourreria",
    "species": "pulchra",
    "name": "Kopo, bakalbo', bakalche', x-bakalche', x-bakache', sak bakalche', uakache', sa'ax koopo'"
  },
  {
    "symbol": "BRAL",
    "genus": "Brosimum",
    "species": "alicastrum",
    "name": "Sak oox"
  },
  {
    "symbol": "BRDU",
    "genus": "Brahea",
    "species": "dulcis",
    "name": "Palma"
  },
  {
    "symbol": "BRIN",
    "genus": "Bravaisia",
    "species": "integerrima",
    "name": ""
  },
  {
    "symbol": "BRME",
    "genus": "Brunellia",
    "species": "mexicananame",
    "name": "Caleguaname(Cedrillo)"
  },
  {
    "symbol": "BRSE",
    "genus": "Brosimum",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "BRSP",
    "genus": "Bursera",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "BUAR",
    "genus": "Bursera",
    "species": "arborea",
    "name": "Papelillo"
  },
  {
    "symbol": "BUBC",
    "genus": "Bucida",
    "species": "buceras L.",
    "name": "Puctname"
  },
  {
    "symbol": "BUBI",
    "genus": "Bursera",
    "species": "bipinnata",
    "name": "Copal chino o copal santo"
  },
  {
    "symbol": "BUBU",
    "genus": "Wiwilisca",
    "species": "Unknown",
    "name": "Unkown"
  },
  {
    "symbol": "BUCO",
    "genus": "Buddleja",
    "species": "cordata",
    "name": "Tepoja"
  },
  {
    "symbol": "BUEX",
    "genus": "Bursera",
    "species": "excelsa",
    "name": "Copal"
  },
  {
    "symbol": "BUFA",
    "genus": "Bursera",
    "species": "fagaroides",
    "name": "Papelillo"
  },
  {
    "symbol": "BUGR",
    "genus": "Bunchosia",
    "species": "gracilis",
    "name": ""
  },
  {
    "symbol": "BUGU",
    "genus": "Bunchosia",
    "species": "guatemalensis",
    "name": ""
  },
  {
    "symbol": "BUMU",
    "genus": "Bursera",
    "species": "multijuga",
    "name": "Copal pirul"
  },
  {
    "symbol": "BUPA",
    "genus": "Buddleja",
    "species": "parviflora",
    "name": "Tepoznamen"
  },
  {
    "symbol": "BUPE",
    "genus": "Bursera",
    "species": "penicillata",
    "name": "Copal"
  },
  {
    "symbol": "BUSC",
    "genus": "Bursera",
    "species": "schlechtendalii",
    "name": "Chakname blanca"
  },
  {
    "symbol": "BUSI",
    "genus": "Bursera",
    "species": "simaruba",
    "name": "Chakname"
  },
  {
    "symbol": "BUSP",
    "genus": "Bunchosia",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "BUSW",
    "genus": "Bunchosia",
    "species": "swartziana",
    "name": "sip che'"
  },
  {
    "symbol": "BYBU",
    "genus": "Byrsonima",
    "species": "bucidifolia",
    "name": "Sak paj"
  },
  {
    "symbol": "BYCR",
    "genus": "Byrsonima",
    "species": "crassifolia",
    "name": "Nance"
  },
  {
    "symbol": "CABE",
    "genus": "Calliandra",
    "species": "belisensis (Standl) Standl",
    "name": "Tamarindillo"
  },
  {
    "symbol": "CABO",
    "genus": "Caesalpinia",
    "species": "bonduc (L.) Roxb.",
    "name": "Taray"
  },
  {
    "symbol": "CABR",
    "genus": "Calophyllum",
    "species": "brasiliense",
    "name": "bari"
  },
  {
    "symbol": "CACO",
    "genus": "Casearia",
    "species": "corymbosa Kunth",
    "name": "Ixilim che"
  },
  {
    "symbol": "CAEL",
    "genus": "Castilla",
    "species": "elastica",
    "name": "Hule"
  },
  {
    "symbol": "CAEM",
    "genus": "Casearia",
    "species": "emarginata C. Wright ex Griseb.",
    "name": "Amche"
  },
  {
    "symbol": "CAEQ",
    "genus": "Casuarina",
    "species": "equisetifolia",
    "name": "Casurarnia"
  },
  {
    "symbol": "CAER",
    "genus": "Caesalpinia",
    "species": "eriostachys",
    "name": "Songua"
  },
  {
    "symbol": "CAFL",
    "genus": "Capparis",
    "species": "flexuosa (L.) L.",
    "name": "Choch che"
  },
  {
    "symbol": "CAGA",
    "genus": "Caesalpinia",
    "species": "gaumeri",
    "name": "Kitam che'"
  },
  {
    "symbol": "CAGR",
    "genus": "Cassia",
    "species": "grandis L. f.",
    "name": "Canamea fnamestula"
  },
  {
    "symbol": "CAIN",
    "genus": "Capparis",
    "species": "incana",
    "name": "Matagallina"
  },
  {
    "symbol": "CALA",
    "genus": "Cameraria",
    "species": "latifolia",
    "name": "Sak chechnamen"
  },
  {
    "symbol": "CAMA",
    "genus": "Calycophyllum",
    "species": "candidissimum",
    "name": "Palo Camarnamen"
  },
  {
    "symbol": "CAMO",
    "genus": "Caesalpinia",
    "species": "mollis",
    "name": "Chacteviga"
  },
  {
    "symbol": "CAPA",
    "genus": "Calyptranthes",
    "species": "pallens",
    "name": "Chak ni"
  },
  {
    "symbol": "CAPC",
    "genus": "Capparis",
    "species": "pachaca sbsp. Oxysepala",
    "name": "Chooch kitam"
  },
  {
    "symbol": "CAPL",
    "genus": "Caesalpinia",
    "species": "platyloba",
    "name": "Alejo"
  },
  {
    "symbol": "CAPU",
    "genus": "Prunus",
    "species": "persica",
    "name": "Capu"
  },
  {
    "symbol": "CAQU",
    "genus": "Capparis",
    "species": "quiringuensis Standl.",
    "name": "Tres marias"
  },
  {
    "symbol": "CASP",
    "genus": "Calyptranthes",
    "species": "sp",
    "name": "Sak chakni"
  },
  {
    "symbol": "CATE",
    "genus": "Casimiroa",
    "species": "tetrameria",
    "name": "Yuuy"
  },
  {
    "symbol": "CAVE",
    "genus": "Caesalpinia",
    "species": "vesicaria",
    "name": "toxob"
  },
  {
    "symbol": "CAVI",
    "genus": "Caesalpinia",
    "species": "violacea",
    "name": "chakte"
  },
  {
    "symbol": "CAYA",
    "genus": "Casearia",
    "species": "yucatanensisname(Standl.) T. Samar. & M.H. Alford",
    "name": "Napche"
  },
  {
    "symbol": "CAYU",
    "genus": "Caesalpinia",
    "species": "yucatanensis",
    "name": "Pelonchname"
  },
  {
    "symbol": "CEAE",
    "genus": "Ceiba",
    "species": "aesculifolia",
    "name": "Algodoncillo"
  },
  {
    "symbol": "CEMA",
    "genus": "Cercocarpus",
    "species": "macrophyllus",
    "name": ""
  },
  {
    "symbol": "CENO",
    "genus": "Cestrum",
    "species": "nocturnum",
    "name": "Dama de noche"
  },
  {
    "symbol": "CEOD",
    "genus": "Cedrela",
    "species": "odorata",
    "name": "Cedro"
  },
  {
    "symbol": "CEPE",
    "genus": "Ceiba",
    "species": "pentandra (L.) Gaertn.",
    "name": "Ceiba (o)"
  },
  {
    "symbol": "CEPL",
    "genus": "Cecropia",
    "species": "peltata",
    "name": "Guarumbo"
  },
  {
    "symbol": "CESC",
    "genus": "Ceiba",
    "species": "schottii Britten & Baker f.",
    "name": "Pochote"
  },
  {
    "symbol": "CHAL",
    "genus": "Chamissoa",
    "species": "altissima (Jacq.) Kunth. var. rubella Suess.",
    "name": "Xpaay che"
  },
  {
    "symbol": "CHAM",
    "genus": "Atriplex",
    "species": "canescens",
    "name": "Chamizo"
  },
  {
    "symbol": "CHIC",
    "genus": "Cnidoscolus",
    "species": "sp",
    "name": "Chichicaxtle"
  },
  {
    "symbol": "CHME",
    "genus": "Chrysophyllum",
    "species": "mexicanum",
    "name": "Chi'knameej"
  },
  {
    "symbol": "CHOC",
    "genus": "Acacia",
    "species": "Polyphylla",
    "name": "Chocolatillo"
  },
  {
    "symbol": "CHSP",
    "genus": "Chamaedorea",
    "species": "sp",
    "name": "Palmilla"
  },
  {
    "symbol": "CHTE",
    "genus": "Chamaedorea",
    "species": "tepejilote",
    "name": "pacaya"
  },
  {
    "symbol": "CIEF",
    "genus": "Cinnamomum",
    "species": "effusumname",
    "name": "Aretilloname(Canelito)"
  },
  {
    "symbol": "CIEH",
    "genus": "Cinnamomum",
    "species": "ehrenbergii",
    "name": "Aguacatillo"
  },
  {
    "symbol": "CINE",
    "genus": "Lantana",
    "species": "Sp",
    "name": "Siete negritos"
  },
  {
    "symbol": "CISA",
    "genus": "Cinnamomum",
    "species": "salicifolium",
    "name": "Aguacatillo"
  },
  {
    "symbol": "CISI",
    "genus": "Citrus",
    "species": "sinensis",
    "name": "Azahar"
  },
  {
    "symbol": "CISP",
    "genus": "Cinnamomum",
    "species": "sp.",
    "name": "Peciolo rojo"
  },
  {
    "symbol": "CLIN",
    "genus": "Cleyera",
    "species": "integrifolia",
    "name": "Flor de Tila"
  },
  {
    "symbol": "CLSP",
    "genus": "Clethra",
    "species": "sp.",
    "name": "Marangola"
  },
  {
    "symbol": "CNSP",
    "genus": "Cnidoscolus",
    "species": "spinosus",
    "name": "Chaya"
  },
  {
    "symbol": "COAB",
    "genus": "Colubrina",
    "species": "arborescens",
    "name": "Chak bojon"
  },
  {
    "symbol": "COAC",
    "genus": "Coccoloba",
    "species": "acapulcencis",
    "name": "Toyub"
  },
  {
    "symbol": "COAL",
    "genus": "Cordia",
    "species": "alliodora",
    "name": "Bojon, lolnamen"
  },
  {
    "symbol": "COAR",
    "genus": "Coffea",
    "species": "arabica",
    "name": "cafname"
  },
  {
    "symbol": "COAU",
    "genus": "Comarostaphylis",
    "species": "arbutoides",
    "name": "Narnamez de chucho"
  },
  {
    "symbol": "COBA",
    "genus": "Coccoloba",
    "species": "barbadensis Jacq.",
    "name": "Volchiche"
  },
  {
    "symbol": "COCO",
    "genus": "Cordia",
    "species": "collococa",
    "name": "Bojon"
  },
  {
    "symbol": "COCZ",
    "genus": "Coccoloba",
    "species": "cozumelensis",
    "name": "Boob ch'iich'"
  },
  {
    "symbol": "CODI",
    "genus": "Cornus",
    "species": "disciflora",
    "name": "Botoncillo, ciruelo silvestre"
  },
  {
    "symbol": "CODO",
    "genus": "Cordia",
    "species": "dodecandra",
    "name": "Siricote"
  },
  {
    "symbol": "CODS",
    "genus": "Comarostaphylis",
    "species": "discolor",
    "name": "Madronameo"
  },
  {
    "symbol": "CODV",
    "genus": "Coccoloba",
    "species": "diversifolia Jacq.",
    "name": "Sak boob"
  },
  {
    "symbol": "COEL",
    "genus": "Colubrina",
    "species": "elliptica",
    "name": "Sak na'che"
  },
  {
    "symbol": "COER",
    "genus": "Conocarpus",
    "species": "erectus",
    "name": "Mangle botoncillo"
  },
  {
    "symbol": "COES",
    "genus": "Coccoloba",
    "species": "espicata",
    "name": "Boop"
  },
  {
    "symbol": "COFE",
    "genus": "Cordia",
    "species": "ferruginea",
    "name": "sulvia"
  },
  {
    "symbol": "COFR",
    "genus": "Cotoneaster",
    "species": "franchetii",
    "name": "Cotoneaster"
  },
  {
    "symbol": "COGE",
    "genus": "Cordia",
    "species": "gerascanthus",
    "name": "Bojom"
  },
  {
    "symbol": "COGL",
    "genus": "Cordia",
    "species": "globosaname(Jacq.) Kunth",
    "name": "Jaw che"
  },
  {
    "symbol": "COGR",
    "genus": "Colubrina",
    "species": "greggii",
    "name": "Churu' zub"
  },
  {
    "symbol": "COHE",
    "genus": "Coutarea",
    "species": "hexandraname(Jacq.) K. Schum.",
    "name": "Haname che"
  },
  {
    "symbol": "COIC",
    "genus": "Conostegia",
    "species": "icosandra",
    "name": ""
  },
  {
    "symbol": "COME",
    "genus": "Condalia",
    "species": "mexicana",
    "name": "Vinto"
  },
  {
    "symbol": "COMU",
    "genus": "Conzattia",
    "species": "multiflora",
    "name": "Arbol de nameguila"
  },
  {
    "symbol": "CONU",
    "genus": "Cocos",
    "species": "nucifera",
    "name": "Cocos"
  },
  {
    "symbol": "COPO",
    "genus": "Couepia",
    "species": "polyandra",
    "name": "zapotillo"
  },
  {
    "symbol": "COSC",
    "genus": "Coccoloba",
    "species": "spicata",
    "name": "Boop"
  },
  {
    "symbol": "COSE",
    "genus": "Cosmocalyx",
    "species": "spectabilis",
    "name": "Palo de rosa"
  },
  {
    "symbol": "COSI",
    "genus": "Cordia",
    "species": "sp.",
    "name": "Laurel"
  },
  {
    "symbol": "COSP",
    "genus": "Coccoloba",
    "species": "sp.",
    "name": "Uvilla"
  },
  {
    "symbol": "COSS",
    "genus": "Coccoloba",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "COVI",
    "genus": "Cochlospermum",
    "species": "vitifoliumname(Willd.) Spreng.",
    "name": "Chu'um"
  },
  {
    "symbol": "CPUL",
    "genus": "Caesalpinia",
    "species": "pulcherrima",
    "name": "Toxok"
  },
  {
    "symbol": "CRAR",
    "genus": "Croton",
    "species": "arboreusnameMillsp.",
    "name": "Peres kuuch"
  },
  {
    "symbol": "CRCA",
    "genus": "Croton",
    "species": "campechianus Standl.",
    "name": "Susub yuk"
  },
  {
    "symbol": "CRCH",
    "genus": "Croton",
    "species": "chichenensis Lundell.",
    "name": "Xikin burro"
  },
  {
    "symbol": "CRCO",
    "genus": "Croton",
    "species": "cortesianusnameKunth",
    "name": "Box perezkutz"
  },
  {
    "symbol": "CRCU",
    "genus": "Crescentia",
    "species": "cujete L.",
    "name": "Jicaro"
  },
  {
    "symbol": "CRDR",
    "genus": "Croton",
    "species": "draconame",
    "name": "Sangregadoname"
  },
  {
    "symbol": "CRGA",
    "genus": "Croton",
    "species": "glandulosepalus Millsp.",
    "name": "Sak perezcutz"
  },
  {
    "symbol": "CRGL",
    "genus": "Croton",
    "species": "glabellus",
    "name": "Ko'ok che'"
  },
  {
    "symbol": "CRMA",
    "genus": "Crossopetalum",
    "species": "managuatillo",
    "name": "Managuatillo"
  },
  {
    "symbol": "CRME",
    "genus": "Crataegus",
    "species": "mexicana",
    "name": "Tejocote"
  },
  {
    "symbol": "CRNI",
    "genus": "Croton",
    "species": "niveus Jacq.",
    "name": "chak perezkutz"
  },
  {
    "symbol": "CROE",
    "genus": "Croton",
    "species": "oerstedianus Mnamell. Arg.",
    "name": "Kuxu che"
  },
  {
    "symbol": "CRPU",
    "genus": "Crataegus",
    "species": "pubescens",
    "name": "Hoja peluda"
  },
  {
    "symbol": "CRRE",
    "genus": "Croton",
    "species": "reflexifolius Kunth",
    "name": "Kok che"
  },
  {
    "symbol": "CRST",
    "genus": "Cryosophila",
    "species": "stauracantha",
    "name": "Huano k'uum"
  },
  {
    "symbol": "CRSU",
    "genus": "Croton",
    "species": "sutup Lundell",
    "name": "Sutup"
  },
  {
    "symbol": "CUAC",
    "genus": "Myrospermum",
    "species": "frutescens",
    "name": "Cuachepil"
  },
  {
    "symbol": "CUGL",
    "genus": "Cupania",
    "species": "glabra Sw.",
    "name": "Cox che"
  },
  {
    "symbol": "CUIL",
    "genus": "Inga",
    "species": "spuria",
    "name": "Cuil"
  },
  {
    "symbol": "CULI",
    "genus": "Cupressus",
    "species": "lindleyi",
    "name": "Cedro blanco"
  },
  {
    "symbol": "CULU",
    "genus": "Cupressus",
    "species": "lusitanica",
    "name": "Cedro Blanco"
  },
  {
    "symbol": "CUSE",
    "genus": "Cupania",
    "species": "sp. (pos. Cupania glabra)",
    "name": "Kox che'"
  },
  {
    "symbol": "CUSP",
    "genus": "Cupresus",
    "species": "sp",
    "name": "Cedro Blanco, Cipres mexicano o teotlate"
  },
  {
    "symbol": "CYFU",
    "genus": "Cyathea",
    "species": "fulva",
    "name": "helecho arborescente"
  },
  {
    "symbol": "CYPR",
    "genus": "Cyrtocarpa",
    "species": "procera",
    "name": "Coco de cerro"
  },
  {
    "symbol": "DAAC",
    "genus": "Dasylirion",
    "species": "acrotrichum",
    "name": "Sotol"
  },
  {
    "symbol": "DAPA",
    "genus": "dasylirion",
    "species": "parrayanum",
    "name": "Sotol"
  },
  {
    "symbol": "DASP",
    "genus": "Daphnopsis",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "DELE",
    "genus": "Dendropanax",
    "species": "Leptopodus",
    "name": "Hoja venosa"
  },
  {
    "symbol": "DESP",
    "genus": "Dendropanax",
    "species": "sp.",
    "name": "Hoja venosa"
  },
  {
    "symbol": "DIAM",
    "genus": "Diphysa",
    "species": "americana",
    "name": "Huachepil"
  },
  {
    "symbol": "DIAN",
    "genus": "Diospyros",
    "species": "anisandra S.F. Blake",
    "name": "Sak silil"
  },
  {
    "symbol": "DIAS",
    "genus": "Dicliptera",
    "species": "assurgens",
    "name": "Poklan pix"
  },
  {
    "symbol": "DICA",
    "genus": "Diphysa",
    "species": "carthaginensis",
    "name": "Ruda"
  },
  {
    "symbol": "DICR",
    "genus": "Diphysa",
    "species": "carthaginensis",
    "name": "Tsutsuk"
  },
  {
    "symbol": "DIDI",
    "genus": "Diospyros",
    "species": "digyna",
    "name": "Tusik che"
  },
  {
    "symbol": "DINI",
    "genus": "Diospyros",
    "species": "Nigra",
    "name": "Zapote negro"
  },
  {
    "symbol": "DISA",
    "genus": "Diospyros",
    "species": "salicifolianameHumb. & Bonpl. ex Willd",
    "name": "Siliil"
  },
  {
    "symbol": "DISP",
    "genus": "Diospyros",
    "species": "spp",
    "name": "Boxbec"
  },
  {
    "symbol": "DISU",
    "genus": "Diphysa",
    "species": "suberosa",
    "name": "Palo Santo"
  },
  {
    "symbol": "DIVE",
    "genus": "Diospyros",
    "species": "Verae-crucis",
    "name": "Silil"
  },
  {
    "symbol": "DIYA",
    "genus": "Diospyros",
    "species": "yatesiana Stand",
    "name": "Box siliil"
  },
  {
    "symbol": "DIYU",
    "genus": "Diospyros",
    "species": "yucatanensisnameLundell",
    "name": "Pisiit"
  },
  {
    "symbol": "DOVI",
    "genus": "Dodonaea",
    "species": "viscosa",
    "name": "Chapulixtre"
  },
  {
    "symbol": "DRLA",
    "genus": "Drypetes",
    "species": "lateriflora",
    "name": "Ek hulub"
  },
  {
    "symbol": "DRSP",
    "genus": "Drypetes",
    "species": "sp.",
    "name": "Knameel che'"
  },
  {
    "symbol": "EBEB",
    "genus": "Ebenopsis",
    "species": "ebano (Berland.) Barneby & J.W. Grimes",
    "name": "K'aan che"
  },
  {
    "symbol": "EHTI",
    "genus": "Ehretia",
    "species": "tinifolia",
    "name": "Beek"
  },
  {
    "symbol": "ELAR",
    "genus": "Cyathea",
    "species": "alsophila",
    "name": "Helecho arborecente"
  },
  {
    "symbol": "ENCI",
    "genus": "Quercus",
    "species": "sp.",
    "name": "Encino"
  },
  {
    "symbol": "ENCY",
    "genus": "Enterolobium",
    "species": "cyclocarpum (Jacq.) Griseb.",
    "name": "Piche, Pitche"
  },
  {
    "symbol": "ERAM",
    "genus": "Erythrina",
    "species": "americana",
    "name": "Colorin"
  },
  {
    "symbol": "EROA",
    "genus": "Erythrina",
    "species": "oaxacana",
    "name": ""
  },
  {
    "symbol": "ERRO",
    "genus": "Erythroxylum",
    "species": "rotundifolium",
    "name": "Baak Soots"
  },
  {
    "symbol": "ERST",
    "genus": "Erythrina",
    "species": "standleyananameKrukoff",
    "name": "Chak moolche"
  },
  {
    "symbol": "ESBE",
    "genus": "Esenbeckia",
    "species": "berlandieri",
    "name": "Tankas che'"
  },
  {
    "symbol": "ESCO",
    "genus": "Baccharis",
    "species": "conferta",
    "name": "Escobilla"
  },
  {
    "symbol": "ESPE",
    "genus": "Esenbeckia",
    "species": "pentaphylla (Macfad.) Griseb.",
    "name": "Naranjillo"
  },
  {
    "symbol": "EUAX",
    "genus": "Eugenia",
    "species": "axillaris (Sw.) Willd.",
    "name": "Kiis yuuk"
  },
  {
    "symbol": "EUCA",
    "genus": "Eucaliptus",
    "species": "camaldulensis",
    "name": "Eucalipto rojo"
  },
  {
    "symbol": "EUCI",
    "genus": "Eucaliptus",
    "species": "cinerea",
    "name": "Eucalipto dnamelar"
  },
  {
    "symbol": "EUFO",
    "genus": "Eugenia",
    "species": "foetida Pers.",
    "name": "Sak loob"
  },
  {
    "symbol": "EUGE",
    "genus": "Eugenia",
    "species": "spname",
    "name": "Zapotilloname"
  },
  {
    "symbol": "EUGL",
    "genus": "Eucalyptus",
    "species": "globolus",
    "name": "Palo dulce"
  },
  {
    "symbol": "EUIB",
    "genus": "Eugenia",
    "species": "ibarrae",
    "name": "Guayabillo"
  },
  {
    "symbol": "EULA",
    "genus": "Eugenia",
    "species": "laevis",
    "name": "Wirich che'"
  },
  {
    "symbol": "EUMA",
    "genus": "Eugenia",
    "species": "mayana Standley.",
    "name": "Xir mirich"
  },
  {
    "symbol": "EUPA",
    "genus": "Eugenia",
    "species": "pachychlamys",
    "name": ""
  },
  {
    "symbol": "EUSP",
    "genus": "Eupatorium",
    "species": "sp.",
    "name": "Vara Blanca"
  },
  {
    "symbol": "EUWI",
    "genus": "Eugenia",
    "species": "winzerlingiinameStandl.name",
    "name": "Canelillo"
  },
  {
    "symbol": "EXDI",
    "genus": "Exothea",
    "species": "diphylla",
    "name": "Guayancox"
  },
  {
    "symbol": "EXME",
    "genus": "Exostema",
    "species": "mexicanum",
    "name": "Sabak che"
  },
  {
    "symbol": "EYAM",
    "genus": "Eysenhardtia",
    "species": "amorphoides",
    "name": "Palo azul"
  },
  {
    "symbol": "EYPO",
    "genus": "Eysenhardtia",
    "species": "polystachya",
    "name": "Palo Dulce"
  },
  {
    "symbol": "FIBE",
    "genus": "Ficus",
    "species": "benjamina",
    "name": "Ficus"
  },
  {
    "symbol": "FICA",
    "genus": "Ficus",
    "species": "carica L.",
    "name": "Higo"
  },
  {
    "symbol": "FICO",
    "genus": "Ficus",
    "species": "cotinifolia Kunth",
    "name": "Alamo"
  },
  {
    "symbol": "FICR",
    "genus": "Ficus",
    "species": "crocata (Posible Ficus cotinifolia)",
    "name": "Enredado"
  },
  {
    "symbol": "FICT",
    "genus": "Ficus",
    "species": "cotinifolia",
    "name": "Alamo"
  },
  {
    "symbol": "FIIN",
    "genus": "Ficus",
    "species": "insipida",
    "name": "Matapalo"
  },
  {
    "symbol": "FIMA",
    "genus": "Ficus",
    "species": "maxima",
    "name": "Ficus"
  },
  {
    "symbol": "FIOB",
    "genus": "Ficus",
    "species": "obtusifolia Kunth",
    "name": "Higuerilla"
  },
  {
    "symbol": "FIOV",
    "genus": "Ficus",
    "species": "ovalis",
    "name": "Higo"
  },
  {
    "symbol": "FIPA",
    "genus": "Ficus",
    "species": "padifolia",
    "name": "Higo burro"
  },
  {
    "symbol": "FIYU",
    "genus": "Ficus",
    "species": "yucatanensis",
    "name": "Alamo"
  },
  {
    "symbol": "FOPA",
    "genus": "Forchhammeria",
    "species": "pallida",
    "name": "Pinameoncillo"
  },
  {
    "symbol": "FOSP",
    "genus": "Fouquieria",
    "species": "splendens",
    "name": "Ocotillo"
  },
  {
    "symbol": "FOTR",
    "genus": "Forchhammeria",
    "species": "trifoliata",
    "name": "pak'aal che'"
  },
  {
    "symbol": "FRAM",
    "genus": "Fraxinus",
    "species": "americana",
    "name": "Fresno americana"
  },
  {
    "symbol": "FRPU",
    "genus": "Fraxinus",
    "species": "purpusii",
    "name": "Fresno"
  },
  {
    "symbol": "FRUH",
    "genus": "Fraxinus",
    "species": "uhdei",
    "name": "Fresno"
  },
  {
    "symbol": "FUSP",
    "genus": "Fuchsia",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "GAIN",
    "genus": "Garcinia",
    "species": "intermedia",
    "name": ""
  },
  {
    "symbol": "GALA",
    "genus": "Garrya",
    "species": "laurifolia",
    "name": "Amargoso"
  },
  {
    "symbol": "GALO",
    "genus": "Garrya",
    "species": "Longifolia",
    "name": ""
  },
  {
    "symbol": "GENE",
    "genus": "Generic",
    "species": "Generic",
    "name": "Generic"
  },
  {
    "symbol": "GIBI",
    "genus": "Ginkgo",
    "species": "biloba",
    "name": "Ginkgo"
  },
  {
    "symbol": "GLSE",
    "genus": "Gliricidia",
    "species": "sepium",
    "name": "Cocoite, Yaite"
  },
  {
    "symbol": "GOHY",
    "genus": "Gochnatia",
    "species": "hypoleuca",
    "name": "Hoja blanca"
  },
  {
    "symbol": "GRRO",
    "genus": "Grevillea",
    "species": "robusta",
    "name": "Grevilea"
  },
  {
    "symbol": "GUCO",
    "genus": "Guettarda",
    "species": "combsii",
    "name": "Tastab, Popistle"
  },
  {
    "symbol": "GUEL",
    "genus": "Guettarda",
    "species": "elliptica",
    "name": "Kibche'"
  },
  {
    "symbol": "GUGA",
    "genus": "Gutterda",
    "species": "gaumeri Standl.",
    "name": "Manzanillo"
  },
  {
    "symbol": "GUGL",
    "genus": "Guarea",
    "species": "glabra",
    "name": ""
  },
  {
    "symbol": "GUGR",
    "genus": "Guatteria",
    "species": "grandiflora",
    "name": "Palo de zope"
  },
  {
    "symbol": "GUSA",
    "genus": "Guaiacum",
    "species": "sanctun",
    "name": "guayacan negro"
  },
  {
    "symbol": "GUSP",
    "genus": "Guarea",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "GUUL",
    "genus": "Guazuma",
    "species": "ulmifolia",
    "name": "Gunamecima"
  },
  {
    "symbol": "GYFL",
    "genus": "Gymnopodium",
    "species": "floribundum",
    "name": "Dzidzilchname"
  },
  {
    "symbol": "GYJA",
    "genus": "Gyrocarpus",
    "species": "jatrophifoliusnameDomin",
    "name": "Kiis che"
  },
  {
    "symbol": "GYLU",
    "genus": "Gymnanthes",
    "species": "lucida",
    "name": "Yaiyi"
  },
  {
    "symbol": "HAAL",
    "genus": "Havardia",
    "species": "albicans",
    "name": "Chukum"
  },
  {
    "symbol": "HABR",
    "genus": "Haematoxylum",
    "species": "brasiletto",
    "name": "Azulillo"
  },
  {
    "symbol": "HACA",
    "genus": "Haematoxylum",
    "species": "campechianum L.",
    "name": "Tinto"
  },
  {
    "symbol": "HALO",
    "genus": "Hamelia",
    "species": "longipes",
    "name": ""
  },
  {
    "symbol": "HAME",
    "genus": "Hampea",
    "species": "mexicana",
    "name": "Ix kan hool"
  },
  {
    "symbol": "HAPA",
    "genus": "Hamelia",
    "species": "patens Jacq.",
    "name": "K'aanan"
  },
  {
    "symbol": "HATO",
    "genus": "Hampea",
    "species": "tomentosa",
    "name": "Majagua"
  },
  {
    "symbol": "HATR",
    "genus": "Hampea",
    "species": "trilobata",
    "name": "Majahua"
  },
  {
    "symbol": "HEAM",
    "genus": "Heliocarpus",
    "species": "americanus",
    "name": "cajete/bats/pozol"
  },
  {
    "symbol": "HEAP",
    "genus": "Heliocarpus",
    "species": "apendicularisname",
    "name": "Jonotename"
  },
  {
    "symbol": "HECR",
    "genus": "Herissantia",
    "species": "crispa (L.) Brizicky",
    "name": "Sak kix"
  },
  {
    "symbol": "HEMX",
    "genus": "Heliocarpus",
    "species": "mexicanus",
    "name": "Joolol"
  },
  {
    "symbol": "HEOC",
    "genus": "Heliocarpus",
    "species": "occidentalis",
    "name": "Majahua"
  },
  {
    "symbol": "HIAR",
    "genus": "Hibiscus",
    "species": "arboreus Cav.",
    "name": "Tulipan"
  },
  {
    "symbol": "HICE",
    "genus": "Hippocratea",
    "species": "celastroides Kunth",
    "name": "Taatsi"
  },
  {
    "symbol": "HIEX",
    "genus": "Hippocratea",
    "species": "excelsa Kunth.",
    "name": "Chumloob"
  },
  {
    "symbol": "HIGO",
    "genus": "Ficus",
    "species": "sp",
    "name": "Higo"
  },
  {
    "symbol": "HITI",
    "genus": "Hibiscus",
    "species": "tiliaceus L.",
    "name": "NL"
  },
  {
    "symbol": "HOCA",
    "genus": "Hoffmannia",
    "species": "cauliflora",
    "name": "limoncillo"
  },
  {
    "symbol": "HOCO",
    "genus": "Hoffmannia",
    "species": "conzattii",
    "name": ""
  },
  {
    "symbol": "HONI",
    "genus": "Hoffmannia",
    "species": "nicotianifolia",
    "name": "Corteza negra"
  },
  {
    "symbol": "HOSP",
    "genus": "Hoffmannia",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "HYCO",
    "genus": "Hymenaea",
    "species": "courbaril",
    "name": "guapinol"
  },
  {
    "symbol": "HYME",
    "genus": "Hyperbaena",
    "species": "mexicana Miers.",
    "name": "Keken che"
  },
  {
    "symbol": "HYPE",
    "genus": "Hyptis",
    "species": "pectinata (podrnamea ser Hyptis mutabilis)",
    "name": "xolte'xnuk"
  },
  {
    "symbol": "HYSP",
    "genus": "Hymenolobium",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "HYSU",
    "genus": "Hyptis",
    "species": "suaveolensname(L.) Poit.name",
    "name": "Xoolte xnuuk"
  },
  {
    "symbol": "HYWI",
    "genus": "Hyperbaena",
    "species": "winzerlingii Standl.",
    "name": "Chooch kitam"
  },
  {
    "symbol": "HYYU",
    "genus": "Hybanthus",
    "species": "yucatanensis",
    "name": "Sak bake"
  },
  {
    "symbol": "INMI",
    "genus": "Inga",
    "species": "micheliana",
    "name": "chalum"
  },
  {
    "symbol": "IPPA",
    "genus": "Ipomoea",
    "species": "pauciflora",
    "name": "Cazahuate"
  },
  {
    "symbol": "JAFL",
    "genus": "Jacquinia",
    "species": "flammea Millspaugh ex Mez.",
    "name": "Chak siik"
  },
  {
    "symbol": "JAGA",
    "genus": "Jatropha",
    "species": "gaumeri",
    "name": "Pomulchname"
  },
  {
    "symbol": "JAMA",
    "genus": "Jacquinia",
    "species": "macrocarpa",
    "name": "Amole"
  },
  {
    "symbol": "JAME",
    "genus": "Jacaratia",
    "species": "mexicananameA. DC",
    "name": "k'umche"
  },
  {
    "symbol": "JAMI",
    "genus": "Jacaranda",
    "species": "mimosifolia",
    "name": "Jacaranda"
  },
  {
    "symbol": "JARI",
    "genus": "Larrea",
    "species": "sp",
    "name": "Jarilla"
  },
  {
    "symbol": "JUAN",
    "genus": "Juniperus",
    "species": "angostura",
    "name": "Enebro chino"
  },
  {
    "symbol": "JUFL",
    "genus": "Juniperus",
    "species": "flaccida",
    "name": "Tlaxcal, Enebro"
  },
  {
    "symbol": "JUPY",
    "genus": "Juglans",
    "species": "pyriformisname",
    "name": "Nogal"
  },
  {
    "symbol": "JUSP",
    "genus": "Juniperus",
    "species": "sp",
    "name": "Tasacate, Junipero"
  },
  {
    "symbol": "KAHU",
    "genus": "Karwinskia",
    "species": "humboldtiana",
    "name": "Lu'um che"
  },
  {
    "symbol": "KOAL",
    "genus": "Koanophyllon",
    "species": "albicaulisname(Sch. Bip. ex Klatt) R.M. King & H. Rob.",
    "name": "Tok'aban"
  },
  {
    "symbol": "KRFE",
    "genus": "Krugiodendron",
    "species": "ferreum",
    "name": "ch'iin took'"
  },
  {
    "symbol": "LAIN",
    "genus": "Lawsonia",
    "species": "inermis L.",
    "name": "Rodisan"
  },
  {
    "symbol": "LARA",
    "genus": "Laguncularia",
    "species": "racemosaname",
    "name": "Mangle Blanco"
  },
  {
    "symbol": "LASI",
    "genus": "Lagenaria",
    "species": "sicerana",
    "name": "Chuuj"
  },
  {
    "symbol": "LATH",
    "genus": "Laetia",
    "species": "thamnia",
    "name": "Xi'in che"
  },
  {
    "symbol": "LAUR",
    "genus": "Laurus",
    "species": "sp",
    "name": "Laurel"
  },
  {
    "symbol": "LELE",
    "genus": "Leucaena",
    "species": "leucocephala",
    "name": "Huaxim"
  },
  {
    "symbol": "LICA",
    "genus": "Licaria",
    "species": "campechiana (Standl.) Kosterm.",
    "name": "Tuzik che"
  },
  {
    "symbol": "LIDI",
    "genus": "Liabum",
    "species": "discolor",
    "name": "Palo de sal"
  },
  {
    "symbol": "LIEX",
    "genus": "Licaria",
    "species": "excelsa",
    "name": ""
  },
  {
    "symbol": "LIGL",
    "genus": "Litsea",
    "species": "glauscescens",
    "name": "Laurel"
  },
  {
    "symbol": "LILU",
    "genus": "Ligustrum",
    "species": "lucidum",
    "name": "Trueno"
  },
  {
    "symbol": "LISC",
    "genus": "Licania",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "LISE",
    "genus": "Licaria",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "LISP",
    "genus": "Litsea",
    "species": "sp.",
    "name": "Mentilla"
  },
  {
    "symbol": "LOCA",
    "genus": "Lonchocarpus",
    "species": "castilloi",
    "name": "Machiche"
  },
  {
    "symbol": "LOEN",
    "genus": "Lozanella",
    "species": "enantiophylla",
    "name": ""
  },
  {
    "symbol": "LOGU",
    "genus": "Lonchocarpus",
    "species": "guatemalensis",
    "name": "Tamarindo, palo gusano"
  },
  {
    "symbol": "LOHO",
    "genus": "Lonchocarpus",
    "species": "hodurensis pittier",
    "name": "Yaax jaabin"
  },
  {
    "symbol": "LOLU",
    "genus": "Lonchocarpus",
    "species": "luteomaculatus",
    "name": "Palo Gusano"
  },
  {
    "symbol": "LOPA",
    "genus": "Lonchocarpus",
    "species": "parviflorusnameBenth.",
    "name": "Sak xuul"
  },
  {
    "symbol": "LOPU",
    "genus": "Lonchocarpus",
    "species": "punctatus",
    "name": "Baal che'"
  },
  {
    "symbol": "LORU",
    "genus": "Lonchocarpus",
    "species": "rugosus Benth.",
    "name": "K'anasin"
  },
  {
    "symbol": "LOSP",
    "genus": "Lonchocarpus",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "LOXU",
    "genus": "Lonchocarpus",
    "species": "xuul",
    "name": "K'an xu'ul"
  },
  {
    "symbol": "LOYU",
    "genus": "Lonchocarpus",
    "species": "yucatanensis",
    "name": "Xuul"
  },
  {
    "symbol": "LUME",
    "genus": "Lunania",
    "species": "mexicana",
    "name": "Hoja vena curva"
  },
  {
    "symbol": "LUOC",
    "genus": "Ludwigia",
    "species": "octovalvis",
    "name": "Puts mukuy"
  },
  {
    "symbol": "LUSP",
    "genus": "Luehea",
    "species": "speciosa",
    "name": "K'asknameat"
  },
  {
    "symbol": "LYBA",
    "genus": "Lysiloma",
    "species": "bahamensis",
    "name": "Tzalam"
  },
  {
    "symbol": "LYMI",
    "genus": "Lysiloma",
    "species": "microphyllum",
    "name": "Palo Blanco"
  },
  {
    "symbol": "LYTE",
    "genus": "Lysiloma",
    "species": "tergeminum",
    "name": "Unknown"
  },
  {
    "symbol": "MAAR",
    "genus": "Malvaviscus",
    "species": "arboreus",
    "name": "gusanito"
  },
  {
    "symbol": "MADE",
    "genus": "Malmea",
    "species": "depressa",
    "name": "Elemuy"
  },
  {
    "symbol": "MADR",
    "genus": "Arbutus",
    "species": "xalapensis",
    "name": "Madronameo"
  },
  {
    "symbol": "MAEM",
    "genus": "Malpighia",
    "species": "emarginata",
    "name": "Guayacte"
  },
  {
    "symbol": "MAGL",
    "genus": "Malpighia",
    "species": "glabra",
    "name": "Bnameek che'"
  },
  {
    "symbol": "MALI",
    "genus": "Machaonia",
    "species": "lindeniana",
    "name": "Kuchel"
  },
  {
    "symbol": "MALU",
    "genus": "Malpighia",
    "species": "lundellii C.V. Morton",
    "name": "Wayactname"
  },
  {
    "symbol": "MAMI",
    "genus": "Margaritopsis",
    "species": "microdon",
    "name": "Xpay luuch"
  },
  {
    "symbol": "MAMY",
    "genus": "Clethra",
    "species": "mexicana",
    "name": "Mameyito/ Pahuilla / Mamojuaxtle o cucharillo/ Pakata"
  },
  {
    "symbol": "MANO",
    "genus": "Margaritaria",
    "species": "nobilis",
    "name": "Naap che'"
  },
  {
    "symbol": "MASE",
    "genus": "Maytenus",
    "species": "sp.",
    "name": "Peciolo curvo"
  },
  {
    "symbol": "MASP",
    "genus": "Magnolia",
    "species": "splendens",
    "name": ""
  },
  {
    "symbol": "MATI",
    "genus": "Maclura",
    "species": "tintoria",
    "name": "Mora"
  },
  {
    "symbol": "MEBR",
    "genus": "Metopium",
    "species": "brownei",
    "name": "Cheechem"
  },
  {
    "symbol": "MEDE",
    "genus": "Meliosma",
    "species": "dentata",
    "name": "SNC"
  },
  {
    "symbol": "MEMA",
    "genus": "Meriania",
    "species": "macrophylla",
    "name": "chichica"
  },
  {
    "symbol": "MIBA",
    "genus": "Mimosa",
    "species": "bahamensis",
    "name": "Sak Kaatsim"
  },
  {
    "symbol": "MIME",
    "genus": "Micropholis",
    "species": "melinoniana",
    "name": "albaricoco/baricoco"
  },
  {
    "symbol": "MOAL",
    "genus": "Moraceae",
    "species": "alba",
    "name": "Morera asinametica"
  },
  {
    "symbol": "MOAT",
    "genus": "Montanoa",
    "species": "atriplicifolia",
    "name": "Sak taj"
  },
  {
    "symbol": "MYCO",
    "genus": "Myrsine",
    "species": "coriacea",
    "name": "Chicuabilname(ratoncillo)"
  },
  {
    "symbol": "MYDI",
    "genus": "Myrtus",
    "species": "dioica",
    "name": "Nukuch pool"
  },
  {
    "symbol": "MYFL",
    "genus": "Myrciaria",
    "species": "floribunda (H. West ex Willd.) O. Berg",
    "name": "Bolocontname"
  },
  {
    "symbol": "MYJU",
    "genus": "Myrsine",
    "species": "juergensenii",
    "name": "Naranjillo"
  },
  {
    "symbol": "MYMY",
    "genus": "Myrsine",
    "species": "myricoidesname",
    "name": "Pimientoname"
  },
  {
    "symbol": "MYSE",
    "genus": "Myroxylon",
    "species": "sp.",
    "name": "Mil hojas"
  },
  {
    "symbol": "MYSP",
    "genus": "Myrcianthes",
    "species": "sp",
    "name": "Arraynamen"
  },
  {
    "symbol": "NECO",
    "genus": "Nectandra",
    "species": "coriacea",
    "name": "Laurelillo"
  },
  {
    "symbol": "NEEM",
    "genus": "Neomillspaughia",
    "species": "emarginata",
    "name": "Sak itsa"
  },
  {
    "symbol": "NEPS",
    "genus": "Neea",
    "species": "psychotrioides",
    "name": "Ta'tsi'"
  },
  {
    "symbol": "NESA",
    "genus": "Nectandra",
    "species": "salicifolia",
    "name": "Capulincillo"
  },
  {
    "symbol": "NESP",
    "genus": "Nectandra",
    "species": "sp.",
    "name": "Frutilla"
  },
  {
    "symbol": "NIGL",
    "genus": "Nicotiana",
    "species": "glauca",
    "name": "Tabaco silvestre"
  },
  {
    "symbol": "NOGA",
    "genus": "Nopalea",
    "species": "gaumeri",
    "name": "Nopal"
  },
  {
    "symbol": "NOSC",
    "genus": "Notoptera",
    "species": "scabridula",
    "name": "Soj bak che"
  },
  {
    "symbol": "ORAR",
    "genus": "Oreopanax",
    "species": "arcanus",
    "name": "chicharro"
  },
  {
    "symbol": "OREC",
    "genus": "Oreopanax",
    "species": "echinops",
    "name": "Guarumbo"
  },
  {
    "symbol": "OROB",
    "genus": "Oreopanax",
    "species": "obtusifoliosname",
    "name": "Choconame"
  },
  {
    "symbol": "ORSP",
    "genus": "Oreopanax",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "ORXA",
    "genus": "Oreopanax",
    "species": "xalapensis",
    "name": "Macuilillo o mano de tigre/Mazorco"
  },
  {
    "symbol": "OTPA",
    "genus": "Ottoschulzia",
    "species": "pallida",
    "name": "Uvilla"
  },
  {
    "symbol": "OULU",
    "genus": "Ouratea",
    "species": "lucens (Kunth) Engl.",
    "name": "Chilillo"
  },
  {
    "symbol": "PAAC",
    "genus": "Parmentiera",
    "species": "aculeataname",
    "name": "Kat kuuk"
  },
  {
    "symbol": "PAAG",
    "genus": "Laurus",
    "species": "nobilis",
    "name": "Palo de Agua"
  },
  {
    "symbol": "PAAQ",
    "genus": "Pachira",
    "species": "aquatica",
    "name": "zapotnamen"
  },
  {
    "symbol": "PABL",
    "genus": "Dendropanax",
    "species": "arboreus",
    "name": "Palo Blanco, Chaca blanco, sac-chaca"
  },
  {
    "symbol": "PABO",
    "genus": "Morinda",
    "species": "citrifolia",
    "name": "Palo de Bola"
  },
  {
    "symbol": "PACH",
    "genus": "Trichilia",
    "species": "havanensis",
    "name": "Palo de Chachalaca"
  },
  {
    "symbol": "PACO",
    "genus": "Siparuna",
    "species": "thecaphora",
    "name": "Palo Conchuda"
  },
  {
    "symbol": "PACU",
    "genus": "Parathesis",
    "species": "cubana",
    "name": "Chamal che"
  },
  {
    "symbol": "PAHU",
    "genus": "Cecropia",
    "species": "obtusifolia",
    "name": "Palo Guarumbo"
  },
  {
    "symbol": "PAHY",
    "genus": "Eugenia",
    "species": "capuli",
    "name": "Palo Yagalan"
  },
  {
    "symbol": "PALI",
    "genus": "Zanthoxylum",
    "species": "fagara?",
    "name": "Palo limoncillo"
  },
  {
    "symbol": "PAMA",
    "genus": "Chiranthodendron",
    "species": "pentadactylon",
    "name": "Palo de la manita"
  },
  {
    "symbol": "PAMI",
    "genus": "Parmentiera",
    "species": "millspaughiananame",
    "name": "Kat kuuk"
  },
  {
    "symbol": "PAMO",
    "genus": "Maclura",
    "species": "tinctoria",
    "name": "Palo Mora"
  },
  {
    "symbol": "PAPA",
    "genus": "Lindleya",
    "species": "mespiloides?",
    "name": "Palo Pajarito"
  },
  {
    "symbol": "PAPI",
    "genus": "Myroxylon",
    "species": "balsamum",
    "name": "Palo Pichon"
  },
  {
    "symbol": "PAQU",
    "genus": "Torva",
    "species": "donianum",
    "name": "Palo Quitamanteca"
  },
  {
    "symbol": "PASE",
    "genus": "Quercus",
    "species": "sp",
    "name": "Palo Cerezo"
  },
  {
    "symbol": "PASL",
    "genus": "Palicourea",
    "species": "seleri",
    "name": "Flor morada"
  },
  {
    "symbol": "PASP",
    "genus": "Parathesis",
    "species": "sp.",
    "name": "Flor verde"
  },
  {
    "symbol": "PATI",
    "genus": "Tilia",
    "species": "sp",
    "name": "Palo tila"
  },
  {
    "symbol": "PAVE",
    "genus": "Parkinsonia",
    "species": "florida",
    "name": "Palo Verde"
  },
  {
    "symbol": "PAYA",
    "genus": "Pseudobombax",
    "species": "ellipticum",
    "name": "Palo Yaco"
  },
  {
    "symbol": "PAZA",
    "genus": "Manilkara",
    "species": "zapota",
    "name": "Palo Zapote"
  },
  {
    "symbol": "PAZO",
    "genus": "Roupala",
    "species": "montana",
    "name": "Palo Zorrillo"
  },
  {
    "symbol": "PEAM",
    "genus": "Persea",
    "species": "americana",
    "name": "Aguacate"
  },
  {
    "symbol": "PEGR",
    "genus": "Perymenium",
    "species": "grande",
    "name": "malacate"
  },
  {
    "symbol": "PELI",
    "genus": "Persea",
    "species": "Liebmanii",
    "name": "Aguacate"
  },
  {
    "symbol": "PHBR",
    "genus": "Phyllostylon",
    "species": "brasiliense",
    "name": "K'aan che"
  },
  {
    "symbol": "PHCA",
    "genus": "Phoenix",
    "species": "canariensis",
    "name": "Palma canaria"
  },
  {
    "symbol": "PHGR",
    "genus": "Phyllanthus",
    "species": "grandifolius",
    "name": "Pixtoon"
  },
  {
    "symbol": "PHLA",
    "genus": "Phyllonoma",
    "species": "laticuspis",
    "name": ""
  },
  {
    "symbol": "PHNO",
    "genus": "Phyllanthus",
    "species": "nobilis",
    "name": "Abalche"
  },
  {
    "symbol": "PIAC",
    "genus": "Pisonia",
    "species": "aculeata L.",
    "name": "Unamea de gato"
  },
  {
    "symbol": "PIAL",
    "genus": "Pithecellobium",
    "species": "albicans",
    "name": "Chukum"
  },
  {
    "symbol": "PIAM",
    "genus": "Piper",
    "species": "amalago",
    "name": "Ke' che'"
  },
  {
    "symbol": "PIAU",
    "genus": "Piper",
    "species": "auritum",
    "name": "hoja santa"
  },
  {
    "symbol": "PIAY",
    "genus": "Pinus",
    "species": "ayacahiute",
    "name": "Pino Ayacahuite"
  },
  {
    "symbol": "PICE",
    "genus": "Pinus",
    "species": "cembroides",
    "name": "Pino pinameonero"
  },
  {
    "symbol": "PICH",
    "genus": "Pinus",
    "species": "chiapensis",
    "name": "Pino Chiapensis"
  },
  {
    "symbol": "PICO",
    "genus": "Pinus",
    "species": "cooperi",
    "name": "Pino de Arizona"
  },
  {
    "symbol": "PIDE",
    "genus": "Pinus",
    "species": "devoniana",
    "name": "Pino escobetnamen"
  },
  {
    "symbol": "PIDL",
    "genus": "Pithecellobium",
    "species": "Dulce",
    "name": "Tucuy"
  },
  {
    "symbol": "PIDO",
    "genus": "Pinus",
    "species": "douglasiana",
    "name": "Pino douglasiana"
  },
  {
    "symbol": "PIDU",
    "genus": "Pinus",
    "species": "durangensis",
    "name": "Pino blanco"
  },
  {
    "symbol": "PIGR",
    "genus": "Pinus",
    "species": "greggii",
    "name": "Pino Blanco"
  },
  {
    "symbol": "PIHA",
    "genus": "Pinus",
    "species": "hartwegii",
    "name": "Ocote blanco, pino de montanamea, pino de las alturas"
  },
  {
    "symbol": "PIHE",
    "genus": "Pinus",
    "species": "herrerae",
    "name": "Ocote chino"
  },
  {
    "symbol": "PILA",
    "genus": "Pithecellobium",
    "species": "lanceolatum (Humb. & Bonpl. ex Willd.) Benth.",
    "name": "Tucuy,Tucui"
  },
  {
    "symbol": "PILC",
    "genus": "Pithecellobium",
    "species": "leucospermum",
    "name": "Kantemo"
  },
  {
    "symbol": "PILE",
    "genus": "Pinus",
    "species": "leiophylla",
    "name": "Ocote"
  },
  {
    "symbol": "PILU",
    "genus": "Pinus",
    "species": "lumholtzii",
    "name": "Pino triste"
  },
  {
    "symbol": "PILW",
    "genus": "Pinus",
    "species": "lawsonii",
    "name": "Pino hortiguillo"
  },
  {
    "symbol": "PIMA",
    "genus": "Pithecellobium",
    "species": "mangense",
    "name": "Ya'ax ek"
  },
  {
    "symbol": "PIMI",
    "genus": "Pinus",
    "species": "Michoacana o devonania",
    "name": "Pino Michoacana"
  },
  {
    "symbol": "PIMO",
    "genus": "Pinus",
    "species": "montezumae",
    "name": "Pino Montezumae"
  },
  {
    "symbol": "PIMR",
    "genus": "Piper",
    "species": "marginatum Jacq.",
    "name": "Cordoncillo"
  },
  {
    "symbol": "PIOA",
    "genus": "Pinus",
    "species": "Oaxacana",
    "name": "Pino Oaxacana"
  },
  {
    "symbol": "PIOO",
    "genus": "Pinus",
    "species": "oocarpa",
    "name": "Ocote"
  },
  {
    "symbol": "PIPA",
    "genus": "Pinus",
    "species": "patula",
    "name": "Pino Patula"
  },
  {
    "symbol": "PIPI",
    "genus": "Piscidia",
    "species": "piscipula (podrnamea ser Erythrina piscipula)",
    "name": "Ja'abin"
  },
  {
    "symbol": "PIPO",
    "genus": "Pinus",
    "species": "ponderosa",
    "name": "Pino ponderosa"
  },
  {
    "symbol": "PIPR",
    "genus": "Pittocaulon",
    "species": "praecox",
    "name": "Palo loco"
  },
  {
    "symbol": "PIPS",
    "genus": "Pinus",
    "species": "pseudostrobus",
    "name": "Pino lacio, pacingo y chamite"
  },
  {
    "symbol": "PIRA",
    "genus": "Pinus",
    "species": "radiata",
    "name": "Pino de Monterrey"
  },
  {
    "symbol": "PIRU",
    "genus": "Pinus",
    "species": "rudis",
    "name": "Pino enano"
  },
  {
    "symbol": "PISP",
    "genus": "Piper",
    "species": "sp",
    "name": "Kej che"
  },
  {
    "symbol": "PISR",
    "genus": "Pithecellobium",
    "species": "stevensonii",
    "name": "Cho'ok che'"
  },
  {
    "symbol": "PIST",
    "genus": "Pinus",
    "species": "strobiformis",
    "name": "Pino huiyoco"
  },
  {
    "symbol": "PITE",
    "genus": "Pinus",
    "species": "teocote",
    "name": "Pino teocote"
  },
  {
    "symbol": "PIXA",
    "genus": "Piper",
    "species": "xanthostachyum",
    "name": "SNC"
  },
  {
    "symbol": "PLAL",
    "genus": "Plumeria",
    "species": "alba L.",
    "name": "Sak nikte"
  },
  {
    "symbol": "PLLI",
    "genus": "Pleuranthodendron",
    "species": "lindenii",
    "name": "Hoja redondeada"
  },
  {
    "symbol": "PLME",
    "genus": "Platanus",
    "species": "mexicana",
    "name": "Sicomoro"
  },
  {
    "symbol": "PLOB",
    "genus": "Plumeria",
    "species": "obtusa",
    "name": "Sak nikte'"
  },
  {
    "symbol": "PLRU",
    "genus": "Plumeria",
    "species": "rubra",
    "name": "Cacalosuchil"
  },
  {
    "symbol": "PLSE",
    "genus": "Plumeria",
    "species": "sercifolia Wright.",
    "name": "Nikte ch'oom"
  },
  {
    "symbol": "PLYU",
    "genus": "Platymiscium",
    "species": "yucatanum",
    "name": "Granadillo"
  },
  {
    "symbol": "POCA",
    "genus": "Pouteria",
    "species": "campechiana",
    "name": "K'aniste'"
  },
  {
    "symbol": "POIZ",
    "genus": "Pouteria",
    "species": "izabalensis",
    "name": "Cilillon"
  },
  {
    "symbol": "POMA",
    "genus": "Podocarpus",
    "species": "matudae",
    "name": ""
  },
  {
    "symbol": "PORE",
    "genus": "Pouteria",
    "species": "reticulata",
    "name": "Zapotillo"
  },
  {
    "symbol": "POSA",
    "genus": "Pouteria",
    "species": "sapota",
    "name": "Mamey"
  },
  {
    "symbol": "POSE",
    "genus": "Podocarpus",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "POSI",
    "genus": "Populus",
    "species": "simaroa",
    "name": "Alamo"
  },
  {
    "symbol": "POSP",
    "genus": "Populus",
    "species": "sp",
    "name": "Alamo"
  },
  {
    "symbol": "POUN",
    "genus": "Pouteria",
    "species": "unilocularis",
    "name": "Zapotillo"
  },
  {
    "symbol": "PRBR",
    "genus": "Prunus",
    "species": "brachybotrya",
    "name": "Barranco"
  },
  {
    "symbol": "PRCN",
    "genus": "Protium",
    "species": "confusum (Rose) Pittier",
    "name": "Pom"
  },
  {
    "symbol": "PRCO",
    "genus": "Protium",
    "species": "copal",
    "name": "Chak pom"
  },
  {
    "symbol": "PRLA",
    "genus": "Prosopis",
    "species": "laevigata",
    "name": "Mezquite"
  },
  {
    "symbol": "PRSA",
    "genus": "Prunus",
    "species": "salicifolia",
    "name": "Capulnamen de cerro"
  },
  {
    "symbol": "PRSE",
    "genus": "Prunus",
    "species": "serotina",
    "name": "Capulin"
  },
  {
    "symbol": "PRSP",
    "genus": "Prunus",
    "species": "sp.",
    "name": "Capulin"
  },
  {
    "symbol": "PSCO",
    "genus": "Psychotria",
    "species": "costivenia",
    "name": ""
  },
  {
    "symbol": "PSES",
    "genus": "Pseudotsuga",
    "species": "sp",
    "name": "Abeto de Douglas, Ayarnamen"
  },
  {
    "symbol": "PSFL",
    "genus": "Psychotria",
    "species": "flava",
    "name": "Zapotusco"
  },
  {
    "symbol": "PSGU",
    "genus": "Psidium",
    "species": "guajava",
    "name": "guayabo"
  },
  {
    "symbol": "PSPA",
    "genus": "Psychotria",
    "species": "panamensis",
    "name": ""
  },
  {
    "symbol": "PSSA",
    "genus": "Psidium",
    "species": "sartorianum",
    "name": "Pichi che'"
  },
  {
    "symbol": "PSSE",
    "genus": "Psychotria",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "PSSP",
    "genus": "Psidium",
    "species": "sp.",
    "name": "Lentejilla"
  },
  {
    "symbol": "PSSU",
    "genus": "Pseudolmedia",
    "species": "spuria",
    "name": ""
  },
  {
    "symbol": "PSVR",
    "genus": "Psychotria",
    "species": "viridis",
    "name": ""
  },
  {
    "symbol": "PTGA",
    "genus": "Pterocereus",
    "species": "gaumeri",
    "name": "Cactacea columnar"
  },
  {
    "symbol": "QUAC",
    "genus": "Quercus",
    "species": "acutifolia",
    "name": "Encino"
  },
  {
    "symbol": "QUAF",
    "genus": "Quercus",
    "species": "affinis",
    "name": "Laurelillo"
  },
  {
    "symbol": "QUAL",
    "genus": "Quercus",
    "species": "albocincta",
    "name": "Roble"
  },
  {
    "symbol": "QUCA",
    "genus": "Quercus",
    "species": "candicans",
    "name": "Encino"
  },
  {
    "symbol": "QUCI",
    "genus": "Quercus",
    "species": "crispifolia",
    "name": "Encino"
  },
  {
    "symbol": "QUCN",
    "genus": "Quercus",
    "species": "conspersa",
    "name": "Encino"
  },
  {
    "symbol": "QUCO",
    "genus": "Quercus",
    "species": "conzatii",
    "name": "Encino"
  },
  {
    "symbol": "QUCP",
    "genus": "Quercus",
    "species": "crassipes",
    "name": "Encino Blanco"
  },
  {
    "symbol": "QUCR",
    "genus": "Quercus",
    "species": "crassifolia",
    "name": "Encino"
  },
  {
    "symbol": "QUCS",
    "genus": "Quercus",
    "species": "castanea",
    "name": "Encino"
  },
  {
    "symbol": "QUCU",
    "genus": "Quercus",
    "species": "corrugata",
    "name": "Encino"
  },
  {
    "symbol": "QUDE",
    "genus": "Quercus",
    "species": "depressa",
    "name": "SNC"
  },
  {
    "symbol": "QUED",
    "genus": "Quercus",
    "species": "eduardii",
    "name": "Encino Blanco"
  },
  {
    "symbol": "QUEL",
    "genus": "Quercus",
    "species": "elliptica",
    "name": "Encino"
  },
  {
    "symbol": "QUEU",
    "genus": "Quercus",
    "species": "eugeniifolia",
    "name": "Encino"
  },
  {
    "symbol": "QUGA",
    "genus": "Quercus",
    "species": "glaucescens",
    "name": ""
  },
  {
    "symbol": "QUGB",
    "genus": "Quercus",
    "species": "glabrescens",
    "name": "Encino"
  },
  {
    "symbol": "QUGL",
    "genus": "Quercus",
    "species": "glaucoides",
    "name": "Encino"
  },
  {
    "symbol": "QUIN",
    "genus": "Quercus",
    "species": "insignisname",
    "name": "Chicalabaname"
  },
  {
    "symbol": "QULA",
    "genus": "Quercus",
    "species": "laurina",
    "name": "Laurina"
  },
  {
    "symbol": "QULE",
    "genus": "Quercus",
    "species": "laetaname",
    "name": "Encino"
  },
  {
    "symbol": "QULF",
    "genus": "Quercus",
    "species": "laurifolia",
    "name": "Laurelillo"
  },
  {
    "symbol": "QULI",
    "genus": "Quercus",
    "species": "Liebmanii",
    "name": ""
  },
  {
    "symbol": "QULN",
    "genus": "Quercus",
    "species": "lancifolianame",
    "name": "Roblename"
  },
  {
    "symbol": "QULT",
    "genus": "Quercus",
    "species": "laeta",
    "name": "Encino"
  },
  {
    "symbol": "QUMA",
    "genus": "Quercus",
    "species": "magnoliifolia",
    "name": "Encino"
  },
  {
    "symbol": "QUMC",
    "genus": "Quercus",
    "species": "Macdougalii",
    "name": ""
  },
  {
    "symbol": "QUME",
    "genus": "Quercus",
    "species": "mexicana",
    "name": "Encino"
  },
  {
    "symbol": "QUMI",
    "genus": "Quercus",
    "species": "microphylla",
    "name": "Encino"
  },
  {
    "symbol": "QUMR",
    "genus": "Quercus",
    "species": "Martinezii",
    "name": ""
  },
  {
    "symbol": "QUOB",
    "genus": "Quercus",
    "species": "Obtusata",
    "name": "Encino, Roble"
  },
  {
    "symbol": "QUOC",
    "genus": "Quercus",
    "species": "ocoteifolia",
    "name": ""
  },
  {
    "symbol": "QUOL",
    "genus": "Quercus",
    "species": "oleoides",
    "name": "Encino barcino"
  },
  {
    "symbol": "QUPA",
    "genus": "Quercus",
    "species": "paxtalensisname",
    "name": "Barrilitoname"
  },
  {
    "symbol": "QUPE",
    "genus": "Quercus",
    "species": "peduncularis",
    "name": "Encino"
  },
  {
    "symbol": "QUPI",
    "genus": "Quercus",
    "species": "pinnativenulosa",
    "name": "Encino"
  },
  {
    "symbol": "QUPO",
    "genus": "Quercus",
    "species": "polymorpha",
    "name": "Encino"
  },
  {
    "symbol": "QURE",
    "genus": "Quercus",
    "species": "resinosa",
    "name": "Roble"
  },
  {
    "symbol": "QURU",
    "genus": "Quercus",
    "species": "rugosa",
    "name": "Encino"
  },
  {
    "symbol": "QUSA",
    "genus": "Quercus",
    "species": "sapotifolianame",
    "name": "Encino hojanamedelgadaname"
  },
  {
    "symbol": "QUSC",
    "genus": "Quercus",
    "species": "scytophylla",
    "name": "Encino Blanco, Encino prieto"
  },
  {
    "symbol": "QUSF",
    "genus": "Quercus",
    "species": "salicifolia",
    "name": ""
  },
  {
    "symbol": "QUSG",
    "genus": "Quercus",
    "species": "Segoviensis",
    "name": ""
  },
  {
    "symbol": "QUSI",
    "genus": "Quercus",
    "species": "sideroxyla",
    "name": "Encino Rojo"
  },
  {
    "symbol": "QUSK",
    "genus": "Quercus",
    "species": "skinneri",
    "name": "Chicharro"
  },
  {
    "symbol": "QUSL",
    "genus": "Quercus",
    "species": "splendens",
    "name": "Encino colorado, Encino roble"
  },
  {
    "symbol": "QUSP",
    "genus": "Quercus",
    "species": "sp.",
    "name": "Encino"
  },
  {
    "symbol": "QUSR",
    "genus": "Quercus",
    "species": "serotina",
    "name": ""
  },
  {
    "symbol": "QUUR",
    "genus": "Quercus",
    "species": "urbanii",
    "name": "Cucharillo"
  },
  {
    "symbol": "QUVI",
    "genus": "Quercus",
    "species": "viminea",
    "name": "Encino rojo"
  },
  {
    "symbol": "QUXA",
    "genus": "Quercus",
    "species": "xalapensisname",
    "name": "Encino hojanameagrianame"
  },
  {
    "symbol": "RAAC",
    "genus": "Randia",
    "species": "aculeata L.",
    "name": "Jicarillo"
  },
  {
    "symbol": "RAAL",
    "genus": "Randia",
    "species": "albonervia",
    "name": "Puts kiix"
  },
  {
    "symbol": "RAJU",
    "genus": "Rapanea",
    "species": "juergensenii",
    "name": "Naranjo/Naranjillo"
  },
  {
    "symbol": "RALO",
    "genus": "Randia",
    "species": "longiloba",
    "name": "K'aax"
  },
  {
    "symbol": "RAMN",
    "genus": "Randia",
    "species": "monantha Benth.",
    "name": "Puts kiix"
  },
  {
    "symbol": "RAMO",
    "genus": "Arbutus",
    "species": "sp",
    "name": "Madrnamen"
  },
  {
    "symbol": "RAOB",
    "genus": "Randia",
    "species": "obcordata",
    "name": "Cruz k'iix"
  },
  {
    "symbol": "RASI",
    "genus": "Razisea",
    "species": "spicata",
    "name": ""
  },
  {
    "symbol": "RASP",
    "genus": "Randia",
    "species": "sp. (pos. Randia longiloba, R. obcordata o R. truncata",
    "name": "K'aax"
  },
  {
    "symbol": "RAST",
    "genus": "Randia",
    "species": "standleyana",
    "name": "Limonche"
  },
  {
    "symbol": "RATR",
    "genus": "Randia",
    "species": "truncata Greenm. & Thompson",
    "name": "Cruz che"
  },
  {
    "symbol": "RETR",
    "genus": "Rehdera",
    "species": "trinervis (S.F. Blake) Moldenke",
    "name": "Sak witsiche"
  },
  {
    "symbol": "RHHA",
    "genus": "Rhizophora",
    "species": "harrisoniname",
    "name": "Mangle caballero"
  },
  {
    "symbol": "RHMA",
    "genus": "Rhizophora",
    "species": "manglename",
    "name": "Mangle rojo"
  },
  {
    "symbol": "RHPO",
    "genus": "Rhamnus",
    "species": "popana",
    "name": "Cafeto"
  },
  {
    "symbol": "RHRA",
    "genus": "Rhus",
    "species": "radicans L.",
    "name": "Sak cheechem"
  },
  {
    "symbol": "RHSP",
    "genus": "Rhynchosia",
    "species": "sp.",
    "name": "Chooch"
  },
  {
    "symbol": "RHVI",
    "genus": "Rhus",
    "species": "virens",
    "name": "Chasni"
  },
  {
    "symbol": "RIAF",
    "genus": "Ribes",
    "species": "affine",
    "name": "Corriosilla o Clavo Japones"
  },
  {
    "symbol": "RICI",
    "genus": "Ribes",
    "species": "ciliatum",
    "name": "Hierba de Estrella"
  },
  {
    "symbol": "RICO",
    "genus": "Ricinus",
    "species": "communis",
    "name": "Ricino"
  },
  {
    "symbol": "RIGR",
    "genus": "Richeria",
    "species": "Grandis",
    "name": ""
  },
  {
    "symbol": "ROLU",
    "genus": "Rochefortia",
    "species": "lundellii",
    "name": "Taray"
  },
  {
    "symbol": "ROPS",
    "genus": "Robinia",
    "species": "pseudoacacia",
    "name": "Falsa acacia"
  },
  {
    "symbol": "SAAN",
    "genus": "Saurauia",
    "species": "angustifolia",
    "name": "Mameyito"
  },
  {
    "symbol": "SACA",
    "genus": "Sapranthus",
    "species": "campechianus (Kunth) Standl.",
    "name": "Sak elemuy"
  },
  {
    "symbol": "SAKE",
    "genus": "Saurauia",
    "species": "kegeliana",
    "name": ""
  },
  {
    "symbol": "SALE",
    "genus": "Saurauia",
    "species": "leucocarpaname",
    "name": "Islavaname"
  },
  {
    "symbol": "SAME",
    "genus": "Sabal",
    "species": "mexicana",
    "name": "Palma"
  },
  {
    "symbol": "SAPA",
    "genus": "Salix",
    "species": "paradoxa",
    "name": "Borreguito"
  },
  {
    "symbol": "SASA",
    "genus": "Samanea",
    "species": "saman (Jacq.) Merr.",
    "name": "Samnamen"
  },
  {
    "symbol": "SASC",
    "genus": "Saurauia",
    "species": "Scabrida",
    "name": "Palo uva"
  },
  {
    "symbol": "SASE",
    "genus": "Saurauia",
    "species": "sp.",
    "name": "moquillo"
  },
  {
    "symbol": "SASP",
    "genus": "Salix",
    "species": "sp,",
    "name": "Sauce, Huejote/huajote"
  },
  {
    "symbol": "SAYA",
    "genus": "Sabal",
    "species": "yapa",
    "name": "Huano"
  },
  {
    "symbol": "SAYS",
    "genus": "Saurauia",
    "species": "yasicae",
    "name": "siquinai"
  },
  {
    "symbol": "SCLI",
    "genus": "Scheelea",
    "species": "liebmannii Becc.",
    "name": "Corozo"
  },
  {
    "symbol": "SCMO",
    "genus": "Schinus",
    "species": "molle",
    "name": "pirul"
  },
  {
    "symbol": "SCMR",
    "genus": "Schefflera",
    "species": "morototoni",
    "name": "Candelero"
  },
  {
    "symbol": "SCPA",
    "genus": "Schizolobium",
    "species": "parahyba",
    "name": "Plumillo"
  },
  {
    "symbol": "SCSC",
    "genus": "Schoepfia",
    "species": "schreberi J.F. Gmel.",
    "name": "Limoncillo"
  },
  {
    "symbol": "SEAD",
    "genus": "Sebastiana",
    "species": "adenophora",
    "name": "Checem blanco"
  },
  {
    "symbol": "SEBI",
    "genus": "Senna",
    "species": "bicapsularis",
    "name": "Tuhache"
  },
  {
    "symbol": "SEGA",
    "genus": "Senegalia",
    "species": "gaumeri",
    "name": "Catzim"
  },
  {
    "symbol": "SEMO",
    "genus": "Senna",
    "species": "mollissima (Humb. & Bonpl. ex Willd.) H.S. Irwin & Barneby.",
    "name": "Tu'ja' abin"
  },
  {
    "symbol": "SEPE",
    "genus": "Senna",
    "species": "peralteana (Kunth) H.S. Irwin & Barneby.",
    "name": "Xtu jabche"
  },
  {
    "symbol": "SERA",
    "genus": "Senna",
    "species": "racemosaname",
    "name": "Yaxjabin"
  },
  {
    "symbol": "SERI",
    "genus": "Senegalia",
    "species": "riparia (Kunth) Britton",
    "name": "Kaatsim"
  },
  {
    "symbol": "SESE",
    "genus": "Senna",
    "species": "sp.",
    "name": "mundano"
  },
  {
    "symbol": "SESP",
    "genus": "Senecio",
    "species": "Sp",
    "name": "Senecio"
  },
  {
    "symbol": "SEVI",
    "genus": "Senna",
    "species": "villosa (Mill.) H.S. Irwin & Barneby",
    "name": "Box jabin"
  },
  {
    "symbol": "SEWI",
    "genus": "Senna",
    "species": "wislizeni",
    "name": "Hueso"
  },
  {
    "symbol": "SICA",
    "genus": "Sideroxylon",
    "species": "capiri",
    "name": "Tempizque"
  },
  {
    "symbol": "SIFO",
    "genus": "Sideroxylon",
    "species": "foetidissimum(Pittier) T.D. Penn.",
    "name": "Caracolillo"
  },
  {
    "symbol": "SIGA",
    "genus": "Sideroxylon",
    "species": "gaumeri",
    "name": "Sibul"
  },
  {
    "symbol": "SIGL",
    "genus": "Simarouba",
    "species": "glauca",
    "name": "Pa'sak"
  },
  {
    "symbol": "SIOB",
    "genus": "Sideroxylon",
    "species": "obtusifoliumname(Humb. ex Roem. & Schult.)",
    "name": "Puts mukuy"
  },
  {
    "symbol": "SISA",
    "genus": "Sickingia",
    "species": "salvadorensis",
    "name": "Chakte kok"
  },
  {
    "symbol": "SISI",
    "genus": "Sideroxylon",
    "species": "salicifolium (L.) Lam.",
    "name": "Tsiitsil yah"
  },
  {
    "symbol": "SISL",
    "genus": "Simira",
    "species": "salvadorensis",
    "name": "Chacaguante"
  },
  {
    "symbol": "SLME",
    "genus": "Sloanea",
    "species": "medusula",
    "name": ""
  },
  {
    "symbol": "SOAL",
    "genus": "Solanum",
    "species": "aligerum",
    "name": ""
  },
  {
    "symbol": "SOCE",
    "genus": "Solanum",
    "species": "cervantesii",
    "name": "Capulincillo"
  },
  {
    "symbol": "SOER",
    "genus": "Solanum",
    "species": "erianthum D. Don",
    "name": "Chalche"
  },
  {
    "symbol": "SOSP",
    "genus": "Solanum",
    "species": "spname",
    "name": "Zorrillilloname"
  },
  {
    "symbol": "SOTU",
    "genus": "Solanum",
    "species": "tuerckheimii",
    "name": ""
  },
  {
    "symbol": "SPAN",
    "genus": "Sphaeralcea",
    "species": "angustifolia",
    "name": ""
  },
  {
    "symbol": "SPMO",
    "genus": "Spondias",
    "species": "mombin",
    "name": "Jobo"
  },
  {
    "symbol": "SPPU",
    "genus": "Spondias",
    "species": "purpurea",
    "name": "jocote"
  },
  {
    "symbol": "SPRA",
    "genus": "Spondias",
    "species": "radlkoferi",
    "name": "Abal tu'ut"
  },
  {
    "symbol": "STGL",
    "genus": "Styrax",
    "species": "glabrecensname",
    "name": "Zajarilloname"
  },
  {
    "symbol": "STRA",
    "genus": "Styrax",
    "species": "ramirezii",
    "name": "Mamuyo"
  },
  {
    "symbol": "STSP",
    "genus": "Stenanona",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "STTO",
    "genus": "Stemmadenia",
    "species": "tomentosa",
    "name": "Cabrito"
  },
  {
    "symbol": "SWCU",
    "genus": "Swartzia",
    "species": "cubensis",
    "name": "K'aatal oox"
  },
  {
    "symbol": "SWHU",
    "genus": "Swietenia",
    "species": "humilis",
    "name": "Caoba del Pacifico"
  },
  {
    "symbol": "SWMA",
    "genus": "Swietenia",
    "species": "macrophylla",
    "name": "Caoba"
  },
  {
    "symbol": "SYBR",
    "genus": "Symplocos",
    "species": "breedlovei",
    "name": ""
  },
  {
    "symbol": "SYCI",
    "genus": "Symplocos",
    "species": "citrea",
    "name": "Chico"
  },
  {
    "symbol": "SYCO",
    "genus": "Symplocos",
    "species": "coccinea",
    "name": "Flor Rosa"
  },
  {
    "symbol": "SYCU",
    "genus": "Syzygium",
    "species": "Cumini",
    "name": "Jambolan"
  },
  {
    "symbol": "SYFL",
    "genus": "Symplococarpon",
    "species": "flavifolium",
    "name": "Corteza morada"
  },
  {
    "symbol": "SYSP",
    "genus": "Symplocos",
    "species": "sp.",
    "name": "Terminal curva"
  },
  {
    "symbol": "TAAL",
    "genus": "Tabernaemontana",
    "species": "alba",
    "name": "Utsum pek"
  },
  {
    "symbol": "TAAM",
    "genus": "Tabernaemontana",
    "species": "amygdalifolia",
    "name": "Udz'u'u peek'"
  },
  {
    "symbol": "TACH",
    "genus": "Tabebuia",
    "species": "chrysantha",
    "name": "Primavera"
  },
  {
    "symbol": "TADO",
    "genus": "Tabebuia",
    "species": "donnell-smithii",
    "name": "primavera"
  },
  {
    "symbol": "TAFL",
    "genus": "Talisia",
    "species": "floresii",
    "name": "K'oolok"
  },
  {
    "symbol": "TAGL",
    "genus": "Taxus",
    "species": "globosa",
    "name": "Tejo"
  },
  {
    "symbol": "TAME",
    "genus": "Talauma",
    "species": "mexicana",
    "name": "Anonillo"
  },
  {
    "symbol": "TAMU",
    "genus": "Taxodium",
    "species": "mucronatum",
    "name": "Ahuehuete"
  },
  {
    "symbol": "TAMX",
    "genus": "Tapirira",
    "species": "mexicana",
    "name": ""
  },
  {
    "symbol": "TAOL",
    "genus": "Talisia",
    "species": "oliviformis",
    "name": "Huaya"
  },
  {
    "symbol": "TARO",
    "genus": "Tabebuia",
    "species": "rosea",
    "name": "Rosa Morada"
  },
  {
    "symbol": "TASE",
    "genus": "Tabebuia",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "TASP",
    "genus": "Tapirira",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "TEAM",
    "genus": "Terminalia",
    "species": "amazonica",
    "name": "amarillnamen"
  },
  {
    "symbol": "TEBU",
    "genus": "Terminalia",
    "species": "buceras",
    "name": "Pucte"
  },
  {
    "symbol": "TEGR",
    "genus": "Telanthophora",
    "species": "grandifolia",
    "name": ""
  },
  {
    "symbol": "TELI",
    "genus": "Ternstroemia",
    "species": "lineata",
    "name": "Flor de Tila"
  },
  {
    "symbol": "TEMA",
    "genus": "Terminalia",
    "species": "macrostachya",
    "name": "palo de cacho"
  },
  {
    "symbol": "TEPR",
    "genus": "Ternstroemia",
    "species": "pringlei",
    "name": "Cucharillo"
  },
  {
    "symbol": "TESE",
    "genus": "Tecoma",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "TESP",
    "genus": "Terminalia",
    "species": "sp.",
    "name": "palo volador"
  },
  {
    "symbol": "TEST",
    "genus": "Tecoma",
    "species": "stans",
    "name": "Canlol, Xknameanlol"
  },
  {
    "symbol": "THAH",
    "genus": "Thevetia",
    "species": "ahouai",
    "name": "Huevo de perro"
  },
  {
    "symbol": "THGA",
    "genus": "Thevetia",
    "species": "gaumeri",
    "name": "Akitz"
  },
  {
    "symbol": "THRA",
    "genus": "Thrinax",
    "species": "radiata",
    "name": "Chi'it"
  },
  {
    "symbol": "TIME",
    "genus": "Tilia",
    "species": "mexicana",
    "name": "Tila, Palo Conejo"
  },
  {
    "symbol": "TOAC",
    "genus": "Thouinia",
    "species": "acuminata",
    "name": "Palo Fierro"
  },
  {
    "symbol": "TOPA",
    "genus": "Tohuinia",
    "species": "paucidentata",
    "name": "K'an chuunup, Huesillo"
  },
  {
    "symbol": "TOPO",
    "genus": "Buddleja",
    "species": "cordata",
    "name": "Buddleja"
  },
  {
    "symbol": "TRGL",
    "genus": "Trichilia",
    "species": "glabra L.",
    "name": "Chobenche"
  },
  {
    "symbol": "TRHI",
    "genus": "Trichilia",
    "species": "hirta",
    "name": "Ko ben che'"
  },
  {
    "symbol": "TRME",
    "genus": "Trophis",
    "species": "mexicana",
    "name": ""
  },
  {
    "symbol": "TRMI",
    "genus": "Trichilia",
    "species": "minutiflora",
    "name": "Limonaria"
  },
  {
    "symbol": "TRPA",
    "genus": "Trichilia",
    "species": "pallida",
    "name": ""
  },
  {
    "symbol": "TRRA",
    "genus": "Trophis",
    "species": "racemosaname",
    "name": "Chacox, ramnamen rojo, ramoncillo"
  },
  {
    "symbol": "TRSE",
    "genus": "Trichilia",
    "species": "sp",
    "name": "Chili chejun"
  },
  {
    "symbol": "TRSP",
    "genus": "Trophis",
    "species": "sp.",
    "name": "palo de agua"
  },
  {
    "symbol": "URCA",
    "genus": "Urera",
    "species": "caracasana",
    "name": "chichicaste"
  },
  {
    "symbol": "URSP",
    "genus": "Urtica",
    "species": "sp.",
    "name": "ortiga"
  },
  {
    "symbol": "VACO",
    "genus": "Vachellia",
    "species": "collinsi",
    "name": "Subin che'"
  },
  {
    "symbol": "VALU",
    "genus": "Vatairea",
    "species": "lundellii",
    "name": "Tzimin che'"
  },
  {
    "symbol": "VAPE",
    "genus": "Vachellia",
    "species": "pennatula",
    "name": "Tepame"
  },
  {
    "symbol": "VASP",
    "genus": "Vatairea",
    "species": "sp.",
    "name": "canelillo"
  },
  {
    "symbol": "VEAR",
    "genus": "Vernonia",
    "species": "arborescens",
    "name": "siquinai"
  },
  {
    "symbol": "VEMY",
    "genus": "Verbesina",
    "species": "myriocephala",
    "name": "Clave morse"
  },
  {
    "symbol": "VEPA",
    "genus": "Vernonia",
    "species": "patens",
    "name": "palo de agua"
  },
  {
    "symbol": "VESE",
    "genus": "Vernonia",
    "species": "sp.",
    "name": ""
  },
  {
    "symbol": "VESP",
    "genus": "Vernonanthura",
    "species": "spname",
    "name": "Chiquitename"
  },
  {
    "symbol": "VIGA",
    "genus": "Vitex",
    "species": "gaumeri",
    "name": "Ya'ax niik"
  },
  {
    "symbol": "VISP",
    "genus": "Salvia",
    "species": "Sp",
    "name": "Yierba sagrada"
  },
  {
    "symbol": "WARO",
    "genus": "Washingtonia",
    "species": "robusta",
    "name": "Palma abanico"
  },
  {
    "symbol": "WEAC",
    "genus": "Wedelia",
    "species": "acapulcensis Kunth.",
    "name": "Sak taj"
  },
  {
    "symbol": "WIUR",
    "genus": "Wigandia",
    "species": "urens",
    "name": "Ortiga de tierra caliente"
  },
  {
    "symbol": "XYFL",
    "genus": "Xylosma",
    "species": "flexuosa",
    "name": "Putsnamemukuy"
  },
  {
    "symbol": "YUCA",
    "genus": "Yucca",
    "species": "carnerosa",
    "name": "Yuca"
  },
  {
    "symbol": "ZAAF",
    "genus": "Zanthoxylum",
    "species": "affine",
    "name": "Unamea de gato"
  },
  {
    "symbol": "ZAAR",
    "genus": "Zanthoxylum",
    "species": "arborescens",
    "name": ""
  },
  {
    "symbol": "ZACA",
    "genus": "Zanthoxylum",
    "species": "caribaeum",
    "name": "si nan'che'"
  },
  {
    "symbol": "ZAFA",
    "genus": "Zanthoxylum",
    "species": "fagara",
    "name": "Sinanche"
  },
  {
    "symbol": "ZARH",
    "genus": "Zanthoxylum",
    "species": "rhoifolium",
    "name": ""
  },
  {
    "symbol": "ZARI",
    "genus": "Zanthoxylum",
    "species": "riedelianum var kellermani",
    "name": "Lomo lagarto"
  },
  {
    "symbol": "ZAUC",
    "genus": "Sambucus",
    "species": "sp",
    "name": "Zauco"
  },
  {
    "symbol": "ZIME",
    "genus": "Ziziphus",
    "species": "mexicana",
    "name": "Amole"
  },
  {
    "symbol": "ZUGU",
    "genus": "Zuelania",
    "species": "guidonia",
    "name": "Tamay"
  },
  {
    "symbol": "ZYST",
    "genus": "Zygia",
    "species": "stevensonii (Standl.) Record",
    "name": "Xchook che"
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Get all tree types
    const treeTypes = await queryInterface.sequelize.query(
      `SELECT id, name FROM tree_type;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // 2. Map genus (tree type name) to ID
    const genusToIdMap = {};
    treeTypes.forEach(treeType => {
      genusToIdMap[treeType.name] = treeType.id;
    });

    // 3. Prepare species data with tree_type_id
    const timestamp = new Date();

    const speciesWithIds = speciesData.map(species => ({
      symbol: species.symbol,
      species: species.species,
      name: species.name,
      tree_type_id: genusToIdMap[species.genus],
      createdAt: timestamp,
      updatedAt: timestamp
    }));

    // 4. Insert into TreeSpecies
    await queryInterface.bulkInsert('tree_species', speciesWithIds, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tree_species', null, {});
  }
};
