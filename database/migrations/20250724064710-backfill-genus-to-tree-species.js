'use strict';

const speciesData = [
  {
    "symbol": "ABHI",
    "genus": "Abies"
  },
  {
    "symbol": "ABRE",
    "genus": "Abies"
  },
  {
    "symbol": "ACAN",
    "genus": "Acacia"
  },
  {
    "symbol": "ACCO",
    "genus": "Acacia"
  },
  {
    "symbol": "ACDO",
    "genus": "Acacia"
  },
  {
    "symbol": "ACFA",
    "genus": "Acacia"
  },
  {
    "symbol": "ACGA",
    "genus": "Acacia"
  },
  {
    "symbol": "ACGL",
    "genus": "Acacia"
  },
  {
    "symbol": "ACME",
    "genus": "Acrocomia"
  },
  {
    "symbol": "ACPA",
    "genus": "Acosmium"
  },
  {
    "symbol": "ACPE",
    "genus": "Acacia"
  },
  {
    "symbol": "ACRE",
    "genus": "Acacia"
  },
  {
    "symbol": "ACSK",
    "genus": "Acalypha"
  },
  {
    "symbol": "ACSP",
    "genus": "Acacia"
  },
  {
    "symbol": "ACWR",
    "genus": "Acoelorrhapne"
  },
  {
    "symbol": "ADBE",
    "genus": "Adelia"
  },
  {
    "symbol": "AEAM",
    "genus": "Aeschynomene"
  },
  {
    "symbol": "AGMA",
    "genus": "Agonandra"
  },
  {
    "symbol": "AGRA",
    "genus": "Agonandra"
  },
  {
    "symbol": "AGUC",
    "genus": "Cinnamomum"
  },
  {
    "symbol": "AILE",
    "genus": "Alnus"
  },
  {
    "symbol": "ALAM",
    "genus": "Alvaradoa"
  },
  {
    "symbol": "ALAR",
    "genus": "Alnus"
  },
  {
    "symbol": "ALCO",
    "genus": "Allophylus"
  },
  {
    "symbol": "ALFI",
    "genus": "Alnus"
  },
  {
    "symbol": "ALGU",
    "genus": "Albizia "
  },
  {
    "symbol": "ALJO",
    "genus": "Alnus"
  },
  {
    "symbol": "ALLA",
    "genus": "Alchornea"
  },
  {
    "symbol": "ALNI",
    "genus": "Albizia "
  },
  {
    "symbol": "ALTO",
    "genus": "Albizia "
  },
  {
    "symbol": "ALYU",
    "genus": "Alseis"
  },
  {
    "symbol": "AMAD",
    "genus": "Amphipterygium"
  },
  {
    "symbol": "AMDE",
    "genus": "Amelanchier"
  },
  {
    "symbol": "AMEL",
    "genus": "Amyris"
  },
  {
    "symbol": "AMSP",
    "genus": "Amelanchier"
  },
  {
    "symbol": "AMSY",
    "genus": "Amyris"
  },
  {
    "symbol": "ANGL",
    "genus": "Annona"
  },
  {
    "symbol": "ANLO",
    "genus": "Annona"
  },
  {
    "symbol": "ANPR",
    "genus": "Annona"
  },
  {
    "symbol": "ANSP",
    "genus": "Annona"
  },
  {
    "symbol": "APMO",
    "genus": "Aphananthe"
  },
  {
    "symbol": "APPA",
    "genus": "Apoplanesia"
  },
  {
    "symbol": "APSP",
    "genus": "Aphelandra"
  },
  {
    "symbol": "ARCO",
    "genus": "Ardisia"
  },
  {
    "symbol": "ARGL",
    "genus": "Arbutus"
  },
  {
    "symbol": "ARMA",
    "genus": "Arbutus"
  },
  {
    "symbol": "ARMO",
    "genus": "Arbutus"
  },
  {
    "symbol": "ARNE",
    "genus": "Arce"
  },
  {
    "symbol": "ARPU",
    "genus": "Arctostaphylos"
  },
  {
    "symbol": "ARSI",
    "genus": "Arnica"
  },
  {
    "symbol": "ARSP",
    "genus": "Ardisia"
  },
  {
    "symbol": "ARTE",
    "genus": "Arbutus"
  },
  {
    "symbol": "ASGR",
    "genus": "Astronium "
  },
  {
    "symbol": "ASME",
    "genus": "Aspidosperma"
  },
  {
    "symbol": "ASSP",
    "genus": "Aspidosperma"
  },
  {
    "symbol": "ASTR",
    "genus": "Astrocasia "
  },
  {
    "symbol": "ATBU",
    "genus": "Attalea"
  },
  {
    "symbol": "AVBI",
    "genus": "Avicennia"
  },
  {
    "symbol": "AVGE",
    "genus": "Avicennia"
  },
  {
    "symbol": "BADI",
    "genus": "Bauhinia"
  },
  {
    "symbol": "BAER",
    "genus": "Bauhinia"
  },
  {
    "symbol": "BAHE",
    "genus": "Bauhinia"
  },
  {
    "symbol": "BAJE",
    "genus": "Bauhinia"
  },
  {
    "symbol": "BARE",
    "genus": "Bauhinia"
  },
  {
    "symbol": "BASP",
    "genus": "Baccharis"
  },
  {
    "symbol": "BAUN",
    "genus": "Bauhinia"
  },
  {
    "symbol": "BAWU",
    "genus": "Bauhinia"
  },
  {
    "symbol": "BEGU",
    "genus": "Bertiera"
  },
  {
    "symbol": "BEME",
    "genus": "Beilschmiedia"
  },
  {
    "symbol": "BEPL",
    "genus": "Beaucarnea"
  },
  {
    "symbol": "BIOR",
    "genus": "Bixa"
  },
  {
    "symbol": "BLCU",
    "genus": "Blomia"
  },
  {
    "symbol": "BOMA",
    "genus": "Bonellia"
  },
  {
    "symbol": "BOMO",
    "genus": "Bourreria "
  },
  {
    "symbol": "BOPU",
    "genus": "Bourreria"
  },
  {
    "symbol": "BRAL",
    "genus": "Brosimum"
  },
  {
    "symbol": "BRDU",
    "genus": "Brahea"
  },
  {
    "symbol": "BRIN",
    "genus": "Bravaisia"
  },
  {
    "symbol": "BRME",
    "genus": "Brunellia"
  },
  {
    "symbol": "BRSE",
    "genus": "Brosimum"
  },
  {
    "symbol": "BRSP",
    "genus": "Bursera"
  },
  {
    "symbol": "BUAR",
    "genus": "Bursera"
  },
  {
    "symbol": "BUBC",
    "genus": "Bucida "
  },
  {
    "symbol": "BUBI",
    "genus": "Bursera"
  },
  {
    "symbol": "BUBU",
    "genus": "Wiwilisca"
  },
  {
    "symbol": "BUCO",
    "genus": "Buddleja"
  },
  {
    "symbol": "BUEX",
    "genus": "Bursera"
  },
  {
    "symbol": "BUFA",
    "genus": "Bursera"
  },
  {
    "symbol": "BUGR",
    "genus": "Bunchosia"
  },
  {
    "symbol": "BUGU",
    "genus": "Bunchosia"
  },
  {
    "symbol": "BUMU",
    "genus": "Bursera"
  },
  {
    "symbol": "BUPA",
    "genus": "Buddleja"
  },
  {
    "symbol": "BUPE",
    "genus": "Bursera"
  },
  {
    "symbol": "BUSC",
    "genus": "Bursera "
  },
  {
    "symbol": "BUSI",
    "genus": "Bursera"
  },
  {
    "symbol": "BUSP",
    "genus": "Bunchosia"
  },
  {
    "symbol": "BUSW",
    "genus": "Bunchosia"
  },
  {
    "symbol": "BYBU",
    "genus": "Byrsonima"
  },
  {
    "symbol": "BYCR",
    "genus": "Byrsonima"
  },
  {
    "symbol": "CABE",
    "genus": "Calliandra"
  },
  {
    "symbol": "CABO",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CABR",
    "genus": "Calophyllum"
  },
  {
    "symbol": "CACO",
    "genus": "Casearia "
  },
  {
    "symbol": "CAEL",
    "genus": "Castilla"
  },
  {
    "symbol": "CAEM",
    "genus": "Casearia "
  },
  {
    "symbol": "CAEQ",
    "genus": "Casuarina"
  },
  {
    "symbol": "CAER",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CAFL",
    "genus": "Capparis "
  },
  {
    "symbol": "CAGA",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CAGR",
    "genus": "Cassia"
  },
  {
    "symbol": "CAIN",
    "genus": "Capparis"
  },
  {
    "symbol": "CALA",
    "genus": "Cameraria"
  },
  {
    "symbol": "CAMA",
    "genus": "Calycophyllum"
  },
  {
    "symbol": "CAMO",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CAPA",
    "genus": "Calyptranthes"
  },
  {
    "symbol": "CAPC",
    "genus": "Capparis"
  },
  {
    "symbol": "CAPL",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CAPU",
    "genus": "Prunus"
  },
  {
    "symbol": "CAQU",
    "genus": "Capparis "
  },
  {
    "symbol": "CASE",
    "genus": "Calia"
  },
  {
    "symbol": "CASP",
    "genus": "Calyptranthes"
  },
  {
    "symbol": "CATE",
    "genus": "Casimiroa"
  },
  {
    "symbol": "CAVE",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CAVI",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CAYA",
    "genus": "Casearia "
  },
  {
    "symbol": "CAYU",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CEAE",
    "genus": "Ceiba "
  },
  {
    "symbol": "CEMA",
    "genus": "Cercocarpus"
  },
  {
    "symbol": "CENO",
    "genus": "Cestrum"
  },
  {
    "symbol": "CEOD",
    "genus": "Cedrela"
  },
  {
    "symbol": "CEPE",
    "genus": "Ceiba "
  },
  {
    "symbol": "CEPL",
    "genus": "Cecropia"
  },
  {
    "symbol": "CESC",
    "genus": "Ceiba "
  },
  {
    "symbol": "CHAL",
    "genus": "Chamissoa"
  },
  {
    "symbol": "CHAM",
    "genus": "Atriplex"
  },
  {
    "symbol": "CHIC",
    "genus": "Cnidoscolus"
  },
  {
    "symbol": "CHME",
    "genus": "Chrysophyllum"
  },
  {
    "symbol": "CHOC",
    "genus": "Acacia"
  },
  {
    "symbol": "CHSP",
    "genus": "Chamaedorea"
  },
  {
    "symbol": "CHTE",
    "genus": "Chamaedorea"
  },
  {
    "symbol": "CIEF",
    "genus": "Cinnamomum"
  },
  {
    "symbol": "CIEH",
    "genus": "Cinnamomum"
  },
  {
    "symbol": "CINE",
    "genus": "Lantana"
  },
  {
    "symbol": "CISA",
    "genus": "Cinnamomum"
  },
  {
    "symbol": "CISI",
    "genus": "Citrus"
  },
  {
    "symbol": "CISP",
    "genus": "Cinnamomum"
  },
  {
    "symbol": "CLIN",
    "genus": "Cleyera"
  },
  {
    "symbol": "CLSP",
    "genus": "Clethra"
  },
  {
    "symbol": "CNSP",
    "genus": "Cnidoscolus"
  },
  {
    "symbol": "COAB",
    "genus": "Colubrina"
  },
  {
    "symbol": "COAC",
    "genus": "Coccoloba"
  },
  {
    "symbol": "COAL",
    "genus": "Cordia"
  },
  {
    "symbol": "COAR",
    "genus": "Coffea"
  },
  {
    "symbol": "COAU",
    "genus": "Comarostaphylis"
  },
  {
    "symbol": "COBA",
    "genus": "Coccoloba "
  },
  {
    "symbol": "COCO",
    "genus": "Cordia"
  },
  {
    "symbol": "COCZ",
    "genus": "Coccoloba"
  },
  {
    "symbol": "CODI",
    "genus": "Cornus"
  },
  {
    "symbol": "CODO",
    "genus": "Cordia"
  },
  {
    "symbol": "CODS",
    "genus": "Comarostaphylis "
  },
  {
    "symbol": "CODV",
    "genus": "Coccoloba "
  },
  {
    "symbol": "COEL",
    "genus": "Colubrina"
  },
  {
    "symbol": "COER",
    "genus": "Conocarpus"
  },
  {
    "symbol": "COES",
    "genus": "Coccoloba"
  },
  {
    "symbol": "COFE",
    "genus": "Cordia"
  },
  {
    "symbol": "COFR",
    "genus": "Cotoneaster"
  },
  {
    "symbol": "COGE",
    "genus": "Cordia"
  },
  {
    "symbol": "COGL",
    "genus": "Cordia"
  },
  {
    "symbol": "COGR",
    "genus": "Colubrina"
  },
  {
    "symbol": "COHE",
    "genus": "Coutarea"
  },
  {
    "symbol": "COIC",
    "genus": "Conostegia"
  },
  {
    "symbol": "COME",
    "genus": "Condalia "
  },
  {
    "symbol": "COMU",
    "genus": "Conzattia"
  },
  {
    "symbol": "CONU ",
    "genus": "Cocos"
  },
  {
    "symbol": "COPO",
    "genus": "Couepia"
  },
  {
    "symbol": "COSC",
    "genus": "Coccoloba"
  },
  {
    "symbol": "COSE",
    "genus": "Cosmocalyx"
  },
  {
    "symbol": "COSI",
    "genus": "Cordia"
  },
  {
    "symbol": "COSP",
    "genus": "Coccoloba "
  },
  {
    "symbol": "COSS",
    "genus": "Coccoloba"
  },
  {
    "symbol": "COVI",
    "genus": "Cochlospermum"
  },
  {
    "symbol": "CPUL",
    "genus": "Caesalpinia"
  },
  {
    "symbol": "CRAR",
    "genus": "Croton "
  },
  {
    "symbol": "CRCA",
    "genus": "Croton "
  },
  {
    "symbol": "CRCH",
    "genus": "Croton "
  },
  {
    "symbol": "CRCO",
    "genus": "Croton "
  },
  {
    "symbol": "CRCU",
    "genus": "Crescentia "
  },
  {
    "symbol": "CRDR",
    "genus": "Croton"
  },
  {
    "symbol": "CRGA",
    "genus": "Croton "
  },
  {
    "symbol": "CRGL",
    "genus": "Croton"
  },
  {
    "symbol": "CRMA",
    "genus": "Crossopetalum"
  },
  {
    "symbol": "CRME",
    "genus": "Crataegus"
  },
  {
    "symbol": "CRNI",
    "genus": "Croton "
  },
  {
    "symbol": "CROE",
    "genus": "Croton "
  },
  {
    "symbol": "CRPU",
    "genus": "Crataegus"
  },
  {
    "symbol": "CRRE",
    "genus": "Croton "
  },
  {
    "symbol": "CRST",
    "genus": "Cryosophila"
  },
  {
    "symbol": "CRSU",
    "genus": "Croton "
  },
  {
    "symbol": "CUAC",
    "genus": "Myrospermum"
  },
  {
    "symbol": "CUGL",
    "genus": "Cupania"
  },
  {
    "symbol": "CUIL",
    "genus": "Inga"
  },
  {
    "symbol": "CULI",
    "genus": "Cupressus"
  },
  {
    "symbol": "CULU",
    "genus": "Cupressus"
  },
  {
    "symbol": "CUSE",
    "genus": "Cupania"
  },
  {
    "symbol": "CUSP",
    "genus": "Cupresus"
  },
  {
    "symbol": "CYFU",
    "genus": "Cyathea"
  },
  {
    "symbol": "CYPR",
    "genus": "Cyrtocarpa"
  },
  {
    "symbol": "DAAC",
    "genus": "Dasylirion"
  },
  {
    "symbol": "DAPA",
    "genus": "dasylirion"
  },
  {
    "symbol": "DASP",
    "genus": "Daphnopsis"
  },
  {
    "symbol": "DEGR",
    "genus": "Deppea"
  },
  {
    "symbol": "DELE",
    "genus": "Dendropanax"
  },
  {
    "symbol": "DESP",
    "genus": "Dendropanax"
  },
  {
    "symbol": "DIAM",
    "genus": "Diphysa"
  },
  {
    "symbol": "DIAN",
    "genus": "Diospyros"
  },
  {
    "symbol": "DIAS",
    "genus": "Dicliptera"
  },
  {
    "symbol": "DICA",
    "genus": "Diphysa"
  },
  {
    "symbol": "DICR",
    "genus": "Diphysa"
  },
  {
    "symbol": "DIDI",
    "genus": "Diospyros"
  },
  {
    "symbol": "DINI",
    "genus": "Diospyros"
  },
  {
    "symbol": "DISA",
    "genus": "Diospyros"
  },
  {
    "symbol": "DISP",
    "genus": "Diospyros"
  },
  {
    "symbol": "DISU",
    "genus": "Diphysa"
  },
  {
    "symbol": "DIVE",
    "genus": "Diospyros"
  },
  {
    "symbol": "DIYA",
    "genus": "Diospyros"
  },
  {
    "symbol": "DIYU",
    "genus": "Diospyros"
  },
  {
    "symbol": "DOVI",
    "genus": "Dodonaea"
  },
  {
    "symbol": "DRLA",
    "genus": "Drypetes"
  },
  {
    "symbol": "DRSP",
    "genus": "Drypetes"
  },
  {
    "symbol": "EBEB",
    "genus": "Ebenopsis "
  },
  {
    "symbol": "EHTI",
    "genus": "Ehretia"
  },
  {
    "symbol": "ELAR",
    "genus": "Cyathea"
  },
  {
    "symbol": "ENCI",
    "genus": "Quercus"
  },
  {
    "symbol": "ENCY",
    "genus": "Enterolobium "
  },
  {
    "symbol": "ERAM",
    "genus": "Erythrina "
  },
  {
    "symbol": "EROA",
    "genus": "Erythrina "
  },
  {
    "symbol": "ERRO",
    "genus": "Erythroxylum"
  },
  {
    "symbol": "ERST",
    "genus": "Erythrina "
  },
  {
    "symbol": "ESBE",
    "genus": "Esenbeckia"
  },
  {
    "symbol": "ESCO",
    "genus": "Baccharis"
  },
  {
    "symbol": "ESPE",
    "genus": "Esenbeckia"
  },
  {
    "symbol": "EUAX",
    "genus": "Eugenia "
  },
  {
    "symbol": "EUCA",
    "genus": "Eucaliptus"
  },
  {
    "symbol": "EUCI",
    "genus": "Eucaliptus"
  },
  {
    "symbol": "EUFO",
    "genus": "Eugenia "
  },
  {
    "symbol": "EUGE",
    "genus": "Eugenia"
  },
  {
    "symbol": "EUGL",
    "genus": "Eucalyptus"
  },
  {
    "symbol": "EUIB",
    "genus": "Eugenia"
  },
  {
    "symbol": "EULA",
    "genus": "Eugenia"
  },
  {
    "symbol": "EUMA",
    "genus": "Eugenia "
  },
  {
    "symbol": "EUPA",
    "genus": "Eugenia"
  },
  {
    "symbol": "EUSP",
    "genus": "Eupatorium"
  },
  {
    "symbol": "EUWI",
    "genus": "Eugenia "
  },
  {
    "symbol": "EXDI",
    "genus": "Exothea"
  },
  {
    "symbol": "EXME",
    "genus": "Exostema"
  },
  {
    "symbol": "EYAM",
    "genus": "Eysenhardtia"
  },
  {
    "symbol": "EYPO",
    "genus": "Eysenhardtia"
  },
  {
    "symbol": "FIBE",
    "genus": "Ficus"
  },
  {
    "symbol": "FICA",
    "genus": "Ficus"
  },
  {
    "symbol": "FICO",
    "genus": "Ficus"
  },
  {
    "symbol": "FICR",
    "genus": "Ficus"
  },
  {
    "symbol": "FICT",
    "genus": "Ficus "
  },
  {
    "symbol": "FIIN",
    "genus": "Ficus"
  },
  {
    "symbol": "FIMA",
    "genus": "Ficus"
  },
  {
    "symbol": "FIOB",
    "genus": "Ficus"
  },
  {
    "symbol": "FIOV",
    "genus": "Ficus "
  },
  {
    "symbol": "FIPA",
    "genus": "Ficus"
  },
  {
    "symbol": "FIYU",
    "genus": "Ficus"
  },
  {
    "symbol": "FOPA",
    "genus": "Forchhammeria"
  },
  {
    "symbol": "FOSP",
    "genus": "Fouquieria"
  },
  {
    "symbol": "FOTR",
    "genus": "Forchhammeria"
  },
  {
    "symbol": "FRAM",
    "genus": "Fraxinus"
  },
  {
    "symbol": "FRCA",
    "genus": "Frangula"
  },
  {
    "symbol": "FRPU",
    "genus": "Fraxinus"
  },
  {
    "symbol": "FRUH",
    "genus": "Fraxinus"
  },
  {
    "symbol": "FUSP",
    "genus": "Fuchsia"
  },
  {
    "symbol": "GAIN",
    "genus": "Garcinia"
  },
  {
    "symbol": "GALA",
    "genus": "Garrya"
  },
  {
    "symbol": "GALO",
    "genus": "Garrya"
  },
  {
    "symbol": "GENE",
    "genus": "Generic"
  },
  {
    "symbol": "GIBI",
    "genus": "Ginkgo"
  },
  {
    "symbol": "GLSE",
    "genus": "Gliricidia"
  },
  {
    "symbol": "GOHY",
    "genus": "Gochnatia"
  },
  {
    "symbol": "GRRO",
    "genus": "Grevillea"
  },
  {
    "symbol": "GUCO",
    "genus": "Guettarda"
  },
  {
    "symbol": "GUEL",
    "genus": "Guettarda"
  },
  {
    "symbol": "GUGA",
    "genus": "Gutterda"
  },
  {
    "symbol": "GUGL",
    "genus": "Guarea"
  },
  {
    "symbol": "GUGR",
    "genus": "Guatteria"
  },
  {
    "symbol": "GUSA",
    "genus": "Guaiacum"
  },
  {
    "symbol": "GUSP",
    "genus": "Guarea"
  },
  {
    "symbol": "GUUL",
    "genus": "Guazuma"
  },
  {
    "symbol": "GYFL",
    "genus": "Gymnopodium"
  },
  {
    "symbol": "GYJA",
    "genus": "Gyrocarpus "
  },
  {
    "symbol": "GYLU",
    "genus": "Gymnanthes"
  },
  {
    "symbol": "HAAL",
    "genus": "Havardia"
  },
  {
    "symbol": "HABR",
    "genus": "Haematoxylum"
  },
  {
    "symbol": "HACA",
    "genus": "Haematoxylum"
  },
  {
    "symbol": "HALO",
    "genus": "Hamelia"
  },
  {
    "symbol": "HAME",
    "genus": "Hampea"
  },
  {
    "symbol": "HAPA",
    "genus": "Hamelia"
  },
  {
    "symbol": "HATO",
    "genus": "Hampea"
  },
  {
    "symbol": "HATR",
    "genus": "Hampea"
  },
  {
    "symbol": "HEAM",
    "genus": "Heliocarpus"
  },
  {
    "symbol": "HEAP",
    "genus": "Heliocarpus"
  },
  {
    "symbol": "HECR",
    "genus": "Herissantia "
  },
  {
    "symbol": "HEME",
    "genus": "Hedyosmum"
  },
  {
    "symbol": "HEMX",
    "genus": "Heliocarpus"
  },
  {
    "symbol": "HEOC",
    "genus": "Heliocarpus"
  },
  {
    "symbol": "HIAR",
    "genus": "Hibiscus"
  },
  {
    "symbol": "HICE",
    "genus": "Hippocratea "
  },
  {
    "symbol": "HIEX",
    "genus": "Hippocratea "
  },
  {
    "symbol": "HIGO",
    "genus": "Ficus"
  },
  {
    "symbol": "HITI",
    "genus": "Hibiscus"
  },
  {
    "symbol": "HOCA",
    "genus": "Hoffmannia"
  },
  {
    "symbol": "HOCO",
    "genus": "Hoffmannia"
  },
  {
    "symbol": "HONI",
    "genus": "Hoffmannia"
  },
  {
    "symbol": "HOSP",
    "genus": "Hoffmannia"
  },
  {
    "symbol": "HYCO",
    "genus": "Hymenaea"
  },
  {
    "symbol": "HYME",
    "genus": "Hyperbaena"
  },
  {
    "symbol": "HYPE",
    "genus": "Hyptis"
  },
  {
    "symbol": "HYSP",
    "genus": "Hymenolobium"
  },
  {
    "symbol": "HYSU",
    "genus": "Hyptis"
  },
  {
    "symbol": "HYWI",
    "genus": "Hyperbaena"
  },
  {
    "symbol": "HYYU",
    "genus": "Hybanthus"
  },
  {
    "symbol": "INMI",
    "genus": "Inga"
  },
  {
    "symbol": "IPPA",
    "genus": "Ipomoea"
  },
  {
    "symbol": "JAFL",
    "genus": "Jacquinia"
  },
  {
    "symbol": "JAGA",
    "genus": "Jatropha"
  },
  {
    "symbol": "JAMA",
    "genus": "Jacquinia"
  },
  {
    "symbol": "JAME",
    "genus": "Jacaratia"
  },
  {
    "symbol": "JAMI",
    "genus": "Jacaranda"
  },
  {
    "symbol": "JARI ",
    "genus": "Larrea"
  },
  {
    "symbol": "JUAN",
    "genus": "Juniperus"
  },
  {
    "symbol": "JUFL",
    "genus": "Juniperus"
  },
  {
    "symbol": "JUPY",
    "genus": "Juglans"
  },
  {
    "symbol": "JUSP",
    "genus": "Juniperus"
  },
  {
    "symbol": "KAHU",
    "genus": "Karwinskia"
  },
  {
    "symbol": "KOAL",
    "genus": "Koanophyllon"
  },
  {
    "symbol": "KRFE",
    "genus": "Krugiodendron"
  },
  {
    "symbol": "LAIN",
    "genus": "Lawsonia"
  },
  {
    "symbol": "LARA",
    "genus": "Laguncularia"
  },
  {
    "symbol": "LASI",
    "genus": "Lagenaria"
  },
  {
    "symbol": "LATH",
    "genus": "Laetia"
  },
  {
    "symbol": "LAUR",
    "genus": "Laurus"
  },
  {
    "symbol": "LELE",
    "genus": "Leucaena"
  },
  {
    "symbol": "LICA",
    "genus": "Licaria"
  },
  {
    "symbol": "LIDI",
    "genus": "Liabum"
  },
  {
    "symbol": "LIEX",
    "genus": "Licaria"
  },
  {
    "symbol": "LIGL",
    "genus": "Litsea"
  },
  {
    "symbol": "LILU",
    "genus": "Ligustrum"
  },
  {
    "symbol": "LIMY",
    "genus": "Lippia"
  },
  {
    "symbol": "LISC",
    "genus": "Licania"
  },
  {
    "symbol": "LISE",
    "genus": "Licaria"
  },
  {
    "symbol": "LISP",
    "genus": "Litsea"
  },
  {
    "symbol": "LIST",
    "genus": "Liquidambar"
  },
  {
    "symbol": "LOCA",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LOEN",
    "genus": "Lozanella"
  },
  {
    "symbol": "LOGU",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LOHO",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LOLU",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LOPA",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LOPU",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LORU",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LOSP",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LOXU",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LOYU",
    "genus": "Lonchocarpus"
  },
  {
    "symbol": "LUME",
    "genus": "Lunania"
  },
  {
    "symbol": "LUOC",
    "genus": "Ludwigia"
  },
  {
    "symbol": "LUSP",
    "genus": "Luehea"
  },
  {
    "symbol": "LYBA",
    "genus": "Lysiloma"
  },
  {
    "symbol": "LYMI",
    "genus": "Lysiloma"
  },
  {
    "symbol": "LYTE",
    "genus": "Lysiloma"
  },
  {
    "symbol": "MAAR",
    "genus": "Malvaviscus"
  },
  {
    "symbol": "MADE",
    "genus": "Malmea"
  },
  {
    "symbol": "MADR",
    "genus": "Arbutus"
  },
  {
    "symbol": "MAEM",
    "genus": "Malpighia"
  },
  {
    "symbol": "MAGL",
    "genus": "Malpighia"
  },
  {
    "symbol": "MALI",
    "genus": "Machaonia"
  },
  {
    "symbol": "MALU",
    "genus": "Malpighia"
  },
  {
    "symbol": "MAMI",
    "genus": "Margaritopsis "
  },
  {
    "symbol": "MAMY",
    "genus": "Clethra"
  },
  {
    "symbol": "MANO",
    "genus": "Margaritaria"
  },
  {
    "symbol": "MASE",
    "genus": "Maytenus"
  },
  {
    "symbol": "MASP",
    "genus": "Magnolia"
  },
  {
    "symbol": "MATI",
    "genus": "Maclura"
  },
  {
    "symbol": "MEBR",
    "genus": "Metopium"
  },
  {
    "symbol": "MEDE",
    "genus": "Meliosma "
  },
  {
    "symbol": "MEMA",
    "genus": "Meriania"
  },
  {
    "symbol": "MIAF",
    "genus": "Miconia"
  },
  {
    "symbol": "MIAR",
    "genus": "Miconia"
  },
  {
    "symbol": "MIBA",
    "genus": "Mimosa"
  },
  {
    "symbol": "MIGL",
    "genus": "Miconia"
  },
  {
    "symbol": "MIME",
    "genus": "Micropholis"
  },
  {
    "symbol": "MISP",
    "genus": "Miconia"
  },
  {
    "symbol": "MITA",
    "genus": "Miconia"
  },
  {
    "symbol": "MOAL",
    "genus": "Moraceae"
  },
  {
    "symbol": "MOAT",
    "genus": "Montanoa"
  },
  {
    "symbol": "MYCO",
    "genus": "Myrsine"
  },
  {
    "symbol": "MYDI",
    "genus": "Myrtus"
  },
  {
    "symbol": "MYFL",
    "genus": "Myrciaria "
  },
  {
    "symbol": "MYJU",
    "genus": "Myrsine"
  },
  {
    "symbol": "MYMY",
    "genus": "Myrsine"
  },
  {
    "symbol": "MYSE",
    "genus": "Myroxylon"
  },
  {
    "symbol": "MYSP",
    "genus": "Myrcianthes"
  },
  {
    "symbol": "NECO",
    "genus": "Nectandra"
  },
  {
    "symbol": "NEEM",
    "genus": "Neomillspaughia "
  },
  {
    "symbol": "NEPS",
    "genus": "Neea"
  },
  {
    "symbol": "NESA",
    "genus": "Nectandra"
  },
  {
    "symbol": "NESP",
    "genus": "Nectandra"
  },
  {
    "symbol": "NIGL",
    "genus": "Nicotiana"
  },
  {
    "symbol": "NOGA",
    "genus": "Nopalea"
  },
  {
    "symbol": "NOSC",
    "genus": "Notoptera"
  },
  {
    "symbol": "OCBE",
    "genus": "Ocotea"
  },
  {
    "symbol": "OCPS",
    "genus": "Ocotea"
  },
  {
    "symbol": "ORAR",
    "genus": "Oreopanax"
  },
  {
    "symbol": "OREC",
    "genus": "Oreopanax"
  },
  {
    "symbol": "OROB",
    "genus": "Oreopanax"
  },
  {
    "symbol": "ORSP",
    "genus": "Oreopanax"
  },
  {
    "symbol": "ORXA",
    "genus": "Oreopanax"
  },
  {
    "symbol": "OTPA",
    "genus": "Ottoschulzia"
  },
  {
    "symbol": "OULU",
    "genus": "Ouratea"
  },
  {
    "symbol": "PAAC",
    "genus": "Parmentiera"
  },
  {
    "symbol": "PAAG",
    "genus": "Laurus"
  },
  {
    "symbol": "PAAQ",
    "genus": "Pachira"
  },
  {
    "symbol": "PABL",
    "genus": "Dendropanax"
  },
  {
    "symbol": "PABO",
    "genus": "Morinda"
  },
  {
    "symbol": "PACA",
    "genus": ""
  },
  {
    "symbol": "PACH",
    "genus": "Trichilia"
  },
  {
    "symbol": "PACO",
    "genus": "Siparuna"
  },
  {
    "symbol": "PACU",
    "genus": "Parathesis "
  },
  {
    "symbol": "PAHU",
    "genus": "Cecropia"
  },
  {
    "symbol": "PAHY",
    "genus": "Eugenia"
  },
  {
    "symbol": "PALE",
    "genus": ""
  },
  {
    "symbol": "PALI",
    "genus": "Zanthoxylum"
  },
  {
    "symbol": "PAMA",
    "genus": "Chiranthodendron"
  },
  {
    "symbol": "PAMI",
    "genus": "Parmentiera"
  },
  {
    "symbol": "PAMO",
    "genus": "Maclura"
  },
  {
    "symbol": "PAPA",
    "genus": "Lindleya"
  },
  {
    "symbol": "PAPI",
    "genus": "Myroxylon"
  },
  {
    "symbol": "PAQU",
    "genus": "Torva"
  },
  {
    "symbol": "PASE",
    "genus": "Quercus"
  },
  {
    "symbol": "PASI",
    "genus": ""
  },
  {
    "symbol": "PASL",
    "genus": "Palicourea"
  },
  {
    "symbol": "PASP",
    "genus": "Parathesis"
  },
  {
    "symbol": "PASR",
    "genus": "Parathesis"
  },
  {
    "symbol": "PATI",
    "genus": "Tilia"
  },
  {
    "symbol": "PAUV",
    "genus": ""
  },
  {
    "symbol": "PAVE",
    "genus": "Parkinsonia"
  },
  {
    "symbol": "PAYA",
    "genus": "Pseudobombax"
  },
  {
    "symbol": "PAZA",
    "genus": "Manilkara"
  },
  {
    "symbol": "PAZO",
    "genus": "Roupala"
  },
  {
    "symbol": "PAZP",
    "genus": ""
  },
  {
    "symbol": "PEAM",
    "genus": "Persea"
  },
  {
    "symbol": "PEGR",
    "genus": "Perymenium"
  },
  {
    "symbol": "PELI",
    "genus": "Persea"
  },
  {
    "symbol": "PHBR",
    "genus": "Phyllostylon"
  },
  {
    "symbol": "PHCA",
    "genus": "Phoenix"
  },
  {
    "symbol": "PHGR",
    "genus": "Phyllanthus "
  },
  {
    "symbol": "PHLA",
    "genus": "Phyllonoma"
  },
  {
    "symbol": "PHNO",
    "genus": "Phyllanthus "
  },
  {
    "symbol": "PIAC",
    "genus": "Pisonia"
  },
  {
    "symbol": "PIAL",
    "genus": "Pithecellobium"
  },
  {
    "symbol": "PIAM",
    "genus": "Piper"
  },
  {
    "symbol": "PIAU",
    "genus": "Piper"
  },
  {
    "symbol": "PIAY",
    "genus": "Pinus"
  },
  {
    "symbol": "PICE",
    "genus": "Pinus"
  },
  {
    "symbol": "PICH",
    "genus": "Pinus"
  },
  {
    "symbol": "PICO",
    "genus": "Pinus"
  },
  {
    "symbol": "PIDE",
    "genus": "Pinus"
  },
  {
    "symbol": "PIDL",
    "genus": "Pithecellobium"
  },
  {
    "symbol": "PIDO",
    "genus": "Pinus"
  },
  {
    "symbol": "PIDU",
    "genus": "Pinus"
  },
  {
    "symbol": "PIGR",
    "genus": "Pinus"
  },
  {
    "symbol": "PIHA",
    "genus": "Pinus"
  },
  {
    "symbol": "PIHE",
    "genus": "Pinus"
  },
  {
    "symbol": "PILA",
    "genus": "Pithecellobium"
  },
  {
    "symbol": "PILC",
    "genus": "Pithecellobium"
  },
  {
    "symbol": "PILE",
    "genus": "Pinus"
  },
  {
    "symbol": "PILU",
    "genus": "Pinus"
  },
  {
    "symbol": "PILW",
    "genus": "Pinus"
  },
  {
    "symbol": "PIMA",
    "genus": "Pithecellobium"
  },
  {
    "symbol": "PIME",
    "genus": "Pistacia"
  },
  {
    "symbol": "PIMI",
    "genus": "Pinus"
  },
  {
    "symbol": "PIMO",
    "genus": "Pinus"
  },
  {
    "symbol": "PIMR",
    "genus": "Piper"
  },
  {
    "symbol": "PIOA",
    "genus": "Pinus"
  },
  {
    "symbol": "PIOO",
    "genus": "Pinus"
  },
  {
    "symbol": "PIPA",
    "genus": "Pinus"
  },
  {
    "symbol": "PIPI",
    "genus": "Piscidia"
  },
  {
    "symbol": "PIPO",
    "genus": "Pinus"
  },
  {
    "symbol": "PIPR",
    "genus": "Pittocaulon"
  },
  {
    "symbol": "PIPS",
    "genus": "Pinus"
  },
  {
    "symbol": "PIRA",
    "genus": "Pinus"
  },
  {
    "symbol": "PIRU",
    "genus": "Pinus"
  },
  {
    "symbol": "PISP",
    "genus": "Piper"
  },
  {
    "symbol": "PISR",
    "genus": "Pithecellobium"
  },
  {
    "symbol": "PIST",
    "genus": "Pinus"
  },
  {
    "symbol": "PITE",
    "genus": "Pinus"
  },
  {
    "symbol": "PIXA",
    "genus": "Piper"
  },
  {
    "symbol": "PLAL",
    "genus": "Plumeria"
  },
  {
    "symbol": "PLLI",
    "genus": "Pleuranthodendron"
  },
  {
    "symbol": "PLME",
    "genus": "Platanus"
  },
  {
    "symbol": "PLOB",
    "genus": "Plumeria"
  },
  {
    "symbol": "PLRU",
    "genus": "Plumeria"
  },
  {
    "symbol": "PLSE",
    "genus": "Plumeria"
  },
  {
    "symbol": "PLYU",
    "genus": "Platymiscium"
  },
  {
    "symbol": "POCA",
    "genus": "Pouteria"
  },
  {
    "symbol": "POIZ",
    "genus": "Pouteria"
  },
  {
    "symbol": "POMA",
    "genus": "Podocarpus"
  },
  {
    "symbol": "PORE",
    "genus": "Pouteria"
  },
  {
    "symbol": "POSA",
    "genus": "Pouteria"
  },
  {
    "symbol": "POSE",
    "genus": "Podocarpus"
  },
  {
    "symbol": "POSI",
    "genus": "Populus"
  },
  {
    "symbol": "POSP",
    "genus": "Populus"
  },
  {
    "symbol": "POUN",
    "genus": "Pouteria"
  },
  {
    "symbol": "PRBR",
    "genus": "Prunus"
  },
  {
    "symbol": "PRCN",
    "genus": "Protium "
  },
  {
    "symbol": "PRCO",
    "genus": "Protium "
  },
  {
    "symbol": "PRLA",
    "genus": "Prosopis"
  },
  {
    "symbol": "PRSA",
    "genus": "Prunus"
  },
  {
    "symbol": "PRSE",
    "genus": "Prunus"
  },
  {
    "symbol": "PRSP",
    "genus": "Prunus"
  },
  {
    "symbol": "PSCO",
    "genus": "Psychotria"
  },
  {
    "symbol": "PSES",
    "genus": "Pseudotsuga"
  },
  {
    "symbol": "PSFL",
    "genus": "Psychotria"
  },
  {
    "symbol": "PSGU",
    "genus": "Psidium"
  },
  {
    "symbol": "PSJL",
    "genus": ""
  },
  {
    "symbol": "PSPA",
    "genus": "Psychotria"
  },
  {
    "symbol": "PSSA",
    "genus": "Psidium"
  },
  {
    "symbol": "PSSE",
    "genus": "Psychotria"
  },
  {
    "symbol": "PSSP",
    "genus": "Psidium"
  },
  {
    "symbol": "PSSU",
    "genus": "Pseudolmedia"
  },
  {
    "symbol": "PSVI",
    "genus": "Pseudosmodingium"
  },
  {
    "symbol": "PSVR",
    "genus": "Psychotria"
  },
  {
    "symbol": "PTGA",
    "genus": "Pterocereus"
  },
  {
    "symbol": "QUAC",
    "genus": "Quercus"
  },
  {
    "symbol": "QUAF",
    "genus": "Quercus"
  },
  {
    "symbol": "QUAL",
    "genus": "Quercus"
  },
  {
    "symbol": "QUCA",
    "genus": "Quercus"
  },
  {
    "symbol": "QUCI",
    "genus": "Quercus"
  },
  {
    "symbol": "QUCN",
    "genus": "Quercus"
  },
  {
    "symbol": "QUCO",
    "genus": "Quercus"
  },
  {
    "symbol": "QUCP",
    "genus": "Quercus"
  },
  {
    "symbol": "QUCR",
    "genus": "Quercus"
  },
  {
    "symbol": "QUCS",
    "genus": "Quercus"
  },
  {
    "symbol": "QUCU",
    "genus": "Quercus"
  },
  {
    "symbol": "QUDE",
    "genus": "Quercus"
  },
  {
    "symbol": "QUED",
    "genus": "Quercus"
  },
  {
    "symbol": "QUEL",
    "genus": "Quercus"
  },
  {
    "symbol": "QUEU",
    "genus": "Quercus"
  },
  {
    "symbol": "QUGA",
    "genus": "Quercus"
  },
  {
    "symbol": "QUGB",
    "genus": "Quercus"
  },
  {
    "symbol": "QUGL",
    "genus": "Quercus"
  },
  {
    "symbol": "QUIN",
    "genus": "Quercus"
  },
  {
    "symbol": "QULA",
    "genus": "Quercus"
  },
  {
    "symbol": "QULE",
    "genus": "Quercus"
  },
  {
    "symbol": "QULF",
    "genus": "Quercus"
  },
  {
    "symbol": "QULI",
    "genus": "Quercus"
  },
  {
    "symbol": "QULN",
    "genus": "Quercus"
  },
  {
    "symbol": "QULT",
    "genus": "Quercus"
  },
  {
    "symbol": "QUMA",
    "genus": "Quercus"
  },
  {
    "symbol": "QUMC",
    "genus": "Quercus"
  },
  {
    "symbol": "QUME",
    "genus": "Quercus"
  },
  {
    "symbol": "QUMI",
    "genus": "Quercus"
  },
  {
    "symbol": "QUMR",
    "genus": "Quercus"
  },
  {
    "symbol": "QUOB",
    "genus": "Quercus"
  },
  {
    "symbol": "QUOC",
    "genus": "Quercus"
  },
  {
    "symbol": "QUOL",
    "genus": "Quercus"
  },
  {
    "symbol": "QUPA",
    "genus": "Quercus"
  },
  {
    "symbol": "QUPE",
    "genus": "Quercus"
  },
  {
    "symbol": "QUPI",
    "genus": "Quercus"
  },
  {
    "symbol": "QUPO",
    "genus": "Quercus"
  },
  {
    "symbol": "QURE",
    "genus": "Quercus"
  },
  {
    "symbol": "QURU",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSA",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSC",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSF",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSG",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSI",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSK",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSL",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSP",
    "genus": "Quercus"
  },
  {
    "symbol": "QUSR",
    "genus": "Quercus"
  },
  {
    "symbol": "QUUR",
    "genus": "Quercus"
  },
  {
    "symbol": "QUVI",
    "genus": "Quercus"
  },
  {
    "symbol": "QUXA",
    "genus": "Quercus"
  },
  {
    "symbol": "RAAC",
    "genus": "Randia"
  },
  {
    "symbol": "RAAL",
    "genus": "Randia "
  },
  {
    "symbol": "RAJU",
    "genus": "Rapanea"
  },
  {
    "symbol": "RALO",
    "genus": "Randia"
  },
  {
    "symbol": "RAMN",
    "genus": "Randia"
  },
  {
    "symbol": "RAMO",
    "genus": "Arbutus"
  },
  {
    "symbol": "RAOB",
    "genus": "Randia "
  },
  {
    "symbol": "RASI",
    "genus": "Razisea"
  },
  {
    "symbol": "RASP",
    "genus": "Randia"
  },
  {
    "symbol": "RAST",
    "genus": "Randia "
  },
  {
    "symbol": "RATR",
    "genus": "Randia"
  },
  {
    "symbol": "RETR",
    "genus": "Rehdera"
  },
  {
    "symbol": "RHHA",
    "genus": "Rhizophora"
  },
  {
    "symbol": "RHMA ",
    "genus": "Rhizophora"
  },
  {
    "symbol": "RHMU",
    "genus": "Rhamnus"
  },
  {
    "symbol": "RHPO",
    "genus": "Rhamnus"
  },
  {
    "symbol": "RHRA",
    "genus": "Rhus"
  },
  {
    "symbol": "RHSP",
    "genus": "Rhynchosia"
  },
  {
    "symbol": "RHVI",
    "genus": "Rhus"
  },
  {
    "symbol": "RIAF",
    "genus": "Ribes"
  },
  {
    "symbol": "RICI",
    "genus": "Ribes"
  },
  {
    "symbol": "RICO",
    "genus": "Ricinus "
  },
  {
    "symbol": "RIGR",
    "genus": "Richeria"
  },
  {
    "symbol": "ROLU",
    "genus": "Rochefortia"
  },
  {
    "symbol": "ROPS",
    "genus": "Robinia "
  },
  {
    "symbol": "SAAN",
    "genus": "Saurauia"
  },
  {
    "symbol": "SACA",
    "genus": "Sapranthus "
  },
  {
    "symbol": "SAKE",
    "genus": "Saurauia"
  },
  {
    "symbol": "SALE",
    "genus": "Saurauia"
  },
  {
    "symbol": "SAME",
    "genus": "Sabal"
  },
  {
    "symbol": "SAPA",
    "genus": "Salix"
  },
  {
    "symbol": "SASA",
    "genus": "Samanea "
  },
  {
    "symbol": "SASC",
    "genus": "Saurauia"
  },
  {
    "symbol": "SASE",
    "genus": "Saurauia"
  },
  {
    "symbol": "SASP",
    "genus": "Salix"
  },
  {
    "symbol": "SAYA",
    "genus": "Sabal"
  },
  {
    "symbol": "SAYS",
    "genus": "Saurauia"
  },
  {
    "symbol": "SCLI",
    "genus": "Scheelea"
  },
  {
    "symbol": "SCMO",
    "genus": "Schinus"
  },
  {
    "symbol": "SCMR",
    "genus": "Schefflera"
  },
  {
    "symbol": "SCPA",
    "genus": "Schizolobium"
  },
  {
    "symbol": "SCSC",
    "genus": "Schoepfia "
  },
  {
    "symbol": "SEAD",
    "genus": "Sebastiana"
  },
  {
    "symbol": "SEBI",
    "genus": "Senna"
  },
  {
    "symbol": "SEGA",
    "genus": "Senegalia"
  },
  {
    "symbol": "SEMO",
    "genus": "Senna "
  },
  {
    "symbol": "SEPE",
    "genus": "Senna "
  },
  {
    "symbol": "SERA",
    "genus": "Senna"
  },
  {
    "symbol": "SERI",
    "genus": "Senegalia"
  },
  {
    "symbol": "SESE",
    "genus": "Senna"
  },
  {
    "symbol": "SESP",
    "genus": "Senecio"
  },
  {
    "symbol": "SEVI",
    "genus": "Senna "
  },
  {
    "symbol": "SEWI",
    "genus": "Senna"
  },
  {
    "symbol": "SICA",
    "genus": "Sideroxylon"
  },
  {
    "symbol": "SIFO",
    "genus": "Sideroxylon"
  },
  {
    "symbol": "SIGA",
    "genus": "Sideroxylon"
  },
  {
    "symbol": "SIGL",
    "genus": "Simarouba"
  },
  {
    "symbol": "SIOB",
    "genus": "Sideroxylon"
  },
  {
    "symbol": "SISA",
    "genus": "Sickingia"
  },
  {
    "symbol": "SISI",
    "genus": "Sideroxylon"
  },
  {
    "symbol": "SISL",
    "genus": "Simira"
  },
  {
    "symbol": "SLME",
    "genus": "Sloanea"
  },
  {
    "symbol": "SOAL",
    "genus": "Solanum "
  },
  {
    "symbol": "SOCE",
    "genus": "Solanum "
  },
  {
    "symbol": "SOER",
    "genus": "Solanum"
  },
  {
    "symbol": "SOSP",
    "genus": "Solanum "
  },
  {
    "symbol": "SOTU",
    "genus": "Solanum"
  },
  {
    "symbol": "SPAN",
    "genus": "Sphaeralcea"
  },
  {
    "symbol": "SPMO",
    "genus": "Spondias"
  },
  {
    "symbol": "SPPU",
    "genus": "Spondias"
  },
  {
    "symbol": "SPRA",
    "genus": "Spondias"
  },
  {
    "symbol": "STGL",
    "genus": "Styrax"
  },
  {
    "symbol": "STRA",
    "genus": "Styrax"
  },
  {
    "symbol": "STSP",
    "genus": "Stenanona"
  },
  {
    "symbol": "STTO",
    "genus": "Stemmadenia"
  },
  {
    "symbol": "SWCU",
    "genus": "Swartzia"
  },
  {
    "symbol": "SWHU",
    "genus": "Swietenia"
  },
  {
    "symbol": "SWMA",
    "genus": "Swietenia"
  },
  {
    "symbol": "SYBR",
    "genus": "Symplocos"
  },
  {
    "symbol": "SYCI",
    "genus": "Symplocos"
  },
  {
    "symbol": "SYCO",
    "genus": "Symplocos"
  },
  {
    "symbol": "SYCU",
    "genus": "Syzygium"
  },
  {
    "symbol": "SYFL",
    "genus": "Symplococarpon"
  },
  {
    "symbol": "SYMI",
    "genus": "Symphoricarpos"
  },
  {
    "symbol": "SYSP",
    "genus": "Symplocos"
  },
  {
    "symbol": "TAAL",
    "genus": "Tabernaemontana "
  },
  {
    "symbol": "TAAM",
    "genus": "Tabernaemontana"
  },
  {
    "symbol": "TACH",
    "genus": "Tabebuia"
  },
  {
    "symbol": "TADO",
    "genus": "Tabebuia"
  },
  {
    "symbol": "TAFL",
    "genus": "Talisia"
  },
  {
    "symbol": "TAGL",
    "genus": "Taxus"
  },
  {
    "symbol": "TAME",
    "genus": "Talauma "
  },
  {
    "symbol": "TAMU",
    "genus": "Taxodium "
  },
  {
    "symbol": "TAMX",
    "genus": "Tapirira"
  },
  {
    "symbol": "TAOL",
    "genus": "Talisia"
  },
  {
    "symbol": "TARO",
    "genus": "Tabebuia"
  },
  {
    "symbol": "TASE",
    "genus": "Tabebuia"
  },
  {
    "symbol": "TASP",
    "genus": "Tapirira"
  },
  {
    "symbol": "TEAM",
    "genus": "Terminalia"
  },
  {
    "symbol": "TEBU",
    "genus": "Terminalia"
  },
  {
    "symbol": "TEGR",
    "genus": "Telanthophora"
  },
  {
    "symbol": "TELI",
    "genus": "Ternstroemia"
  },
  {
    "symbol": "TEMA",
    "genus": "Terminalia"
  },
  {
    "symbol": "TEPR",
    "genus": "Ternstroemia "
  },
  {
    "symbol": "TESE",
    "genus": "Tecoma"
  },
  {
    "symbol": "TESP",
    "genus": "Terminalia"
  },
  {
    "symbol": "TEST",
    "genus": "Tecoma"
  },
  {
    "symbol": "THAH",
    "genus": "Thevetia"
  },
  {
    "symbol": "THGA",
    "genus": "Thevetia"
  },
  {
    "symbol": "THRA",
    "genus": "Thrinax"
  },
  {
    "symbol": "TIME",
    "genus": "Tilia "
  },
  {
    "symbol": "TOAC",
    "genus": "Thouinia"
  },
  {
    "symbol": "TOPA",
    "genus": "Tohuinia"
  },
  {
    "symbol": "TOPO",
    "genus": "Buddleja"
  },
  {
    "symbol": "TRGL",
    "genus": "Trichilia"
  },
  {
    "symbol": "TRHI",
    "genus": "Trichilia"
  },
  {
    "symbol": "TRMC",
    "genus": "Trema"
  },
  {
    "symbol": "TRME",
    "genus": "Trophis"
  },
  {
    "symbol": "TRMI",
    "genus": "Trichilia"
  },
  {
    "symbol": "TRPA",
    "genus": "Trichilia"
  },
  {
    "symbol": "TRRA",
    "genus": "Trophis"
  },
  {
    "symbol": "TRSE",
    "genus": "Trichilia"
  },
  {
    "symbol": "TRSP",
    "genus": "Trophis"
  },
  {
    "symbol": "TUOC",
    "genus": "Turpinia"
  },
  {
    "symbol": "TUSP",
    "genus": "Turpinia"
  },
  {
    "symbol": "URCA",
    "genus": "Urera"
  },
  {
    "symbol": "URSP",
    "genus": "Urtica"
  },
  {
    "symbol": "VACO",
    "genus": "Vachellia"
  },
  {
    "symbol": "VALU",
    "genus": "Vatairea"
  },
  {
    "symbol": "VAPE",
    "genus": "Vachellia"
  },
  {
    "symbol": "VASP",
    "genus": "Vatairea"
  },
  {
    "symbol": "VEAR",
    "genus": "Vernonia"
  },
  {
    "symbol": "VEMY",
    "genus": "Verbesina"
  },
  {
    "symbol": "VEPA",
    "genus": "Vernonia"
  },
  {
    "symbol": "VESE",
    "genus": "Vernonia"
  },
  {
    "symbol": "VESP",
    "genus": "Vernonanthura"
  },
  {
    "symbol": "VIGA",
    "genus": "Vitex"
  },
  {
    "symbol": "VISM",
    "genus": "Vismia"
  },
  {
    "symbol": "VISP",
    "genus": "Salvia"
  },
  {
    "symbol": "WARO",
    "genus": "Washingtonia"
  },
  {
    "symbol": "WEAC",
    "genus": "Wedelia "
  },
  {
    "symbol": "WEIN",
    "genus": "Weinmannia"
  },
  {
    "symbol": "WEPI",
    "genus": "Weinmannia"
  },
  {
    "symbol": "WIUR",
    "genus": "Wigandia "
  },
  {
    "symbol": "XYFL",
    "genus": "Xylosma"
  },
  {
    "symbol": "YUCA",
    "genus": "Yucca"
  },
  {
    "symbol": "ZAAF",
    "genus": "Zanthoxylum"
  },
  {
    "symbol": "ZAAR",
    "genus": "Zanthoxylum"
  },
  {
    "symbol": "ZACA",
    "genus": "Zanthoxylum"
  },
  {
    "symbol": "ZAFA",
    "genus": "Zanthoxylum"
  },
  {
    "symbol": "ZARH",
    "genus": "Zanthoxylum"
  },
  {
    "symbol": "ZARI",
    "genus": "Zanthoxylum"
  },
  {
    "symbol": "ZASP",
    "genus": "Zanthoxylon"
  },
  {
    "symbol": "ZAUC",
    "genus": "Sambucus"
  },
  {
    "symbol": "ZIME",
    "genus": "Ziziphus"
  },
  {
    "symbol": "ZUGU",
    "genus": "Zuelania"
  },
  {
    "symbol": "ZYST",
    "genus": "Zygia "
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const existingRows = await queryInterface.sequelize.query(
      `SELECT symbol FROM tree_species`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingSymbols = new Set(
      existingRows.map(row => row.symbol.trim().toUpperCase())
    );

    for (const entry of speciesData) {
      const symbol = entry.symbol?.trim().toUpperCase();
      const genus = entry.genus?.trim();

      if (!symbol || !genus || !existingSymbols.has(symbol)) {
        console.warn(`Skipping: '${symbol}' not in DB or invalid genus.`);
        continue;
      }

      await queryInterface.sequelize.query(
        `UPDATE tree_species SET genus = :genus WHERE TRIM(UPPER(symbol)) = :symbol`,
        {
          replacements: { genus, symbol },
          type: Sequelize.QueryTypes.UPDATE
        }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`UPDATE tree_species SET genus = NULL`);
  }
};