'use strict';

const treeTypeNames = [
  {
    "name": "Abies"
  },
  {
    "name": "Acacia"
  },
  {
    "name": "Acalypha"
  },
  {
    "name": "Acoelorrhapne"
  },
  {
    "name": "Acosmium"
  },
  {
    "name": "Acrocomia"
  },
  {
    "name": "Adelia"
  },
  {
    "name": "Aeschynomene"
  },
  {
    "name": "Agonandra"
  },
  {
    "name": "Albizia"
  },
  {
    "name": "Alchornea"
  },
  {
    "name": "Allophylus"
  },
  {
    "name": "Alnus"
  },
  {
    "name": "Alseis"
  },
  {
    "name": "Alvaradoa"
  },
  {
    "name": "Amelanchier"
  },
  {
    "name": "Amphipterygium"
  },
  {
    "name": "Amyris"
  },
  {
    "name": "Annona"
  },
  {
    "name": "Aphananthe"
  },
  {
    "name": "Aphelandra"
  },
  {
    "name": "Apoplanesia"
  },
  {
    "name": "Arbutus"
  },
  {
    "name": "Arce"
  },
  {
    "name": "Arctostaphylos"
  },
  {
    "name": "Ardisia"
  },
  {
    "name": "Arnica"
  },
  {
    "name": "Aspidosperma"
  },
  {
    "name": "Aspidospermaname"
  },
  {
    "name": "Astrocasia"
  },
  {
    "name": "Astronium"
  },
  {
    "name": "Atriplex"
  },
  {
    "name": "Attalea"
  },
  {
    "name": "Avicennia"
  },
  {
    "name": "Baccharis"
  },
  {
    "name": "Baccharisname"
  },
  {
    "name": "Bauhinianame"
  },
  {
    "name": "Beaucarneaname"
  },
  {
    "name": "Beilschmiedianame"
  },
  {
    "name": "Bertiera"
  },
  {
    "name": "Bixa"
  },
  {
    "name": "Blomia"
  },
  {
    "name": "Bonellia"
  },
  {
    "name": "Bourreria"
  },
  {
    "name": "Brahea"
  },
  {
    "name": "Bravaisia"
  },
  {
    "name": "Brosimum"
  },
  {
    "name": "Brunellia"
  },
  {
    "name": "Bucida"
  },
  {
    "name": "Buddleja"
  },
  {
    "name": "Bunchosia"
  },
  {
    "name": "Bursera"
  },
  {
    "name": "Byrsonima"
  },
  {
    "name": "Caesalpinia"
  },
  {
    "name": "Calianame"
  },
  {
    "name": "Calliandra"
  },
  {
    "name": "Calophyllum"
  },
  {
    "name": "Calycophyllum"
  },
  {
    "name": "Calyptranthes"
  },
  {
    "name": "Cameraria"
  },
  {
    "name": "Capparis"
  },
  {
    "name": "Casearia"
  },
  {
    "name": "Casimiroa"
  },
  {
    "name": "Cassia"
  },
  {
    "name": "Castilla"
  },
  {
    "name": "Casuarina"
  },
  {
    "name": "Cecropia"
  },
  {
    "name": "Cedrela"
  },
  {
    "name": "Ceiba"
  },
  {
    "name": "Cercocarpus"
  },
  {
    "name": "Cestrum"
  },
  {
    "name": "Chamaedorea"
  },
  {
    "name": "Chamissoa"
  },
  {
    "name": "Chiranthodendron"
  },
  {
    "name": "Chrysophyllum"
  },
  {
    "name": "Cinnamomum"
  },
  {
    "name": "Citrus"
  },
  {
    "name": "Clethra"
  },
  {
    "name": "Cleyera"
  },
  {
    "name": "Cnidoscolus"
  },
  {
    "name": "Coccoloba"
  },
  {
    "name": "Cochlospermum"
  },
  {
    "name": "Cocos"
  },
  {
    "name": "Coffea"
  },
  {
    "name": "Colubrina"
  },
  {
    "name": "Comarostaphylis"
  },
  {
    "name": "Condalia"
  },
  {
    "name": "Conocarpus"
  },
  {
    "name": "Conostegia"
  },
  {
    "name": "Conzattia"
  },
  {
    "name": "Cordia"
  },
  {
    "name": "Cornus"
  },
  {
    "name": "Cosmocalyx"
  },
  {
    "name": "Cotoneaster"
  },
  {
    "name": "Couepia"
  },
  {
    "name": "Coutarea"
  },
  {
    "name": "Crataegus"
  },
  {
    "name": "Crescentia"
  },
  {
    "name": "Crossopetalum"
  },
  {
    "name": "Croton"
  },
  {
    "name": "Cryosophila"
  },
  {
    "name": "Cupania"
  },
  {
    "name": "Cupressus"
  },
  {
    "name": "Cupresus"
  },
  {
    "name": "Cyathea"
  },
  {
    "name": "Cyrtocarpa"
  },
  {
    "name": "Daphnopsis"
  },
  {
    "name": "Dasylirion"
  },
  {
    "name": "Dendropanax"
  },
  {
    "name": "Deppeaname"
  },
  {
    "name": "Dicliptera"
  },
  {
    "name": "Diospyros"
  },
  {
    "name": "Diphysa"
  },
  {
    "name": "Dodonaea"
  },
  {
    "name": "Drypetes"
  },
  {
    "name": "Ebenopsis"
  },
  {
    "name": "Ehretia"
  },
  {
    "name": "Enterolobium"
  },
  {
    "name": "Erythrina"
  },
  {
    "name": "Erythroxylum"
  },
  {
    "name": "Esenbeckia"
  },
  {
    "name": "Eucaliptus"
  },
  {
    "name": "Eucalyptus"
  },
  {
    "name": "Eugenia"
  },
  {
    "name": "Eupatorium"
  },
  {
    "name": "Exostema"
  },
  {
    "name": "Exothea"
  },
  {
    "name": "Eysenhardtia"
  },
  {
    "name": "Ficus"
  },
  {
    "name": "Forchhammeria"
  },
  {
    "name": "Fouquieria"
  },
  {
    "name": "Frangulaname"
  },
  {
    "name": "Fraxinus"
  },
  {
    "name": "Fuchsia"
  },
  {
    "name": "Garcinia"
  },
  {
    "name": "Garrya"
  },
  {
    "name": "Generic"
  },
  {
    "name": "Ginkgo"
  },
  {
    "name": "Gliricidia"
  },
  {
    "name": "Gochnatia"
  },
  {
    "name": "Grevillea"
  },
  {
    "name": "Guaiacum"
  },
  {
    "name": "Guarea"
  },
  {
    "name": "Guatteria"
  },
  {
    "name": "Guazuma"
  },
  {
    "name": "Guettarda"
  },
  {
    "name": "Gutterda"
  },
  {
    "name": "Gymnanthes"
  },
  {
    "name": "Gymnopodium"
  },
  {
    "name": "Gyrocarpus"
  },
  {
    "name": "Haematoxylum"
  },
  {
    "name": "Hamelia"
  },
  {
    "name": "Hampea"
  },
  {
    "name": "Havardia"
  },
  {
    "name": "Hedyosmumname"
  },
  {
    "name": "Heliocarpus"
  },
  {
    "name": "Herissantia"
  },
  {
    "name": "Hibiscus"
  },
  {
    "name": "Hippocratea"
  },
  {
    "name": "Hoffmannia"
  },
  {
    "name": "Hybanthus"
  },
  {
    "name": "Hymenaea"
  },
  {
    "name": "Hymenolobium"
  },
  {
    "name": "Hyperbaena"
  },
  {
    "name": "Hyptis"
  },
  {
    "name": "Inga"
  },
  {
    "name": "Ipomoea"
  },
  {
    "name": "Jacaranda"
  },
  {
    "name": "Jacaratia"
  },
  {
    "name": "Jacquinia"
  },
  {
    "name": "Jatropha"
  },
  {
    "name": "Juglans"
  },
  {
    "name": "Juniperus"
  },
  {
    "name": "Karwinskia"
  },
  {
    "name": "Koanophyllon"
  },
  {
    "name": "Krugiodendron"
  },
  {
    "name": "Laetia"
  },
  {
    "name": "Lagenaria"
  },
  {
    "name": "Laguncularia"
  },
  {
    "name": "Lantana"
  },
  {
    "name": "Larrea"
  },
  {
    "name": "Laurus"
  },
  {
    "name": "Lawsonia"
  },
  {
    "name": "Leucaena"
  },
  {
    "name": "Liabum"
  },
  {
    "name": "Licania"
  },
  {
    "name": "Licaria"
  },
  {
    "name": "Ligustrum"
  },
  {
    "name": "Lindleya"
  },
  {
    "name": "Lippianame"
  },
  {
    "name": "Liquidambarname"
  },
  {
    "name": "Litsea"
  },
  {
    "name": "Lonchocarpus"
  },
  {
    "name": "Lozanella"
  },
  {
    "name": "Ludwigia"
  },
  {
    "name": "Luehea"
  },
  {
    "name": "Lunania"
  },
  {
    "name": "Lysiloma"
  },
  {
    "name": "Machaonia"
  },
  {
    "name": "Maclura"
  },
  {
    "name": "Magnolia"
  },
  {
    "name": "Malmea"
  },
  {
    "name": "Malpighia"
  },
  {
    "name": "Malvaviscus"
  },
  {
    "name": "Manilkara"
  },
  {
    "name": "Margaritaria"
  },
  {
    "name": "Margaritopsis"
  },
  {
    "name": "Maytenus"
  },
  {
    "name": "Meliosma"
  },
  {
    "name": "Meriania"
  },
  {
    "name": "Metopium"
  },
  {
    "name": "Miconianame"
  },
  {
    "name": "Micropholis"
  },
  {
    "name": "Mimosa"
  },
  {
    "name": "Montanoa"
  },
  {
    "name": "Moraceae"
  },
  {
    "name": "Morinda"
  },
  {
    "name": "Myrcianthes"
  },
  {
    "name": "Myrciaria"
  },
  {
    "name": "Myrospermum"
  },
  {
    "name": "Myroxylon"
  },
  {
    "name": "Myrsine"
  },
  {
    "name": "Myrtus"
  },
  {
    "name": "Nectandra"
  },
  {
    "name": "Neea"
  },
  {
    "name": "Neomillspaughia"
  },
  {
    "name": "Nicotiana"
  },
  {
    "name": "Nopalea"
  },
  {
    "name": "Notoptera"
  },
  {
    "name": "Ocoteanamename"
  },
  {
    "name": "Oreopanax"
  },
  {
    "name": "Ottoschulzia"
  },
  {
    "name": "Ouratea"
  },
  {
    "name": "Pachira"
  },
  {
    "name": "Palicourea"
  },
  {
    "name": "Parathesis"
  },
  {
    "name": "Parathesisname"
  },
  {
    "name": "Parkinsonia"
  },
  {
    "name": "Parmentiera"
  },
  {
    "name": "Persea"
  },
  {
    "name": "Perymenium"
  },
  {
    "name": "Phoenix"
  },
  {
    "name": "Phyllanthus"
  },
  {
    "name": "Phyllonoma"
  },
  {
    "name": "Phyllostylon"
  },
  {
    "name": "Pinus"
  },
  {
    "name": "Piper"
  },
  {
    "name": "Piscidia"
  },
  {
    "name": "Pisonia"
  },
  {
    "name": "Pistacianame"
  },
  {
    "name": "Pithecellobium"
  },
  {
    "name": "Pittocaulon"
  },
  {
    "name": "Platanus"
  },
  {
    "name": "Platymiscium"
  },
  {
    "name": "Pleuranthodendron"
  },
  {
    "name": "Plumeria"
  },
  {
    "name": "Podocarpus"
  },
  {
    "name": "Populus"
  },
  {
    "name": "Pouteria"
  },
  {
    "name": "Prosopis"
  },
  {
    "name": "Protium"
  },
  {
    "name": "Prunus"
  },
  {
    "name": "Pseudobombax"
  },
  {
    "name": "Pseudolmedia"
  },
  {
    "name": "Pseudosmodingiumname"
  },
  {
    "name": "Pseudotsuga"
  },
  {
    "name": "Psidium"
  },
  {
    "name": "Psychotria"
  },
  {
    "name": "Pterocereus"
  },
  {
    "name": "Quercus"
  },
  {
    "name": "Randia"
  },
  {
    "name": "Rapanea"
  },
  {
    "name": "Razisea"
  },
  {
    "name": "Rehdera"
  },
  {
    "name": "Rhamnus"
  },
  {
    "name": "Rhamnusname"
  },
  {
    "name": "Rhizophora"
  },
  {
    "name": "Rhus"
  },
  {
    "name": "Rhynchosia"
  },
  {
    "name": "Ribes"
  },
  {
    "name": "Richeria"
  },
  {
    "name": "Ricinus"
  },
  {
    "name": "Robinia"
  },
  {
    "name": "Rochefortia"
  },
  {
    "name": "Roupala"
  },
  {
    "name": "Sabal"
  },
  {
    "name": "Salix"
  },
  {
    "name": "Salvia"
  },
  {
    "name": "Samanea"
  },
  {
    "name": "Sambucus"
  },
  {
    "name": "Sapranthus"
  },
  {
    "name": "Saurauia"
  },
  {
    "name": "Scheelea"
  },
  {
    "name": "Schefflera"
  },
  {
    "name": "Schinus"
  },
  {
    "name": "Schizolobium"
  },
  {
    "name": "Schoepfia"
  },
  {
    "name": "Sebastiana"
  },
  {
    "name": "Senecio"
  },
  {
    "name": "Senegalia"
  },
  {
    "name": "Senna"
  },
  {
    "name": "Sickingia"
  },
  {
    "name": "Sideroxylon"
  },
  {
    "name": "Simarouba"
  },
  {
    "name": "Simira"
  },
  {
    "name": "Siparuna"
  },
  {
    "name": "Sloanea"
  },
  {
    "name": "Solanum"
  },
  {
    "name": "Sphaeralcea"
  },
  {
    "name": "Spondias"
  },
  {
    "name": "Stemmadenia"
  },
  {
    "name": "Stenanona"
  },
  {
    "name": "Styrax"
  },
  {
    "name": "Swartzia"
  },
  {
    "name": "Swietenia"
  },
  {
    "name": "Symphoricarposname"
  },
  {
    "name": "Symplococarpon"
  },
  {
    "name": "Symplocos"
  },
  {
    "name": "Syzygium"
  },
  {
    "name": "Tabebuia"
  },
  {
    "name": "Tabernaemontana"
  },
  {
    "name": "Talauma"
  },
  {
    "name": "Talisia"
  },
  {
    "name": "Tapirira"
  },
  {
    "name": "Taxodium"
  },
  {
    "name": "Taxus"
  },
  {
    "name": "Tecoma"
  },
  {
    "name": "Telanthophora"
  },
  {
    "name": "Terminalia"
  },
  {
    "name": "Ternstroemia"
  },
  {
    "name": "Thevetia"
  },
  {
    "name": "Thouinia"
  },
  {
    "name": "Thrinax"
  },
  {
    "name": "Tilia"
  },
  {
    "name": "Tohuinia"
  },
  {
    "name": "Torva"
  },
  {
    "name": "Tremaname"
  },
  {
    "name": "Trichilia"
  },
  {
    "name": "Trophis"
  },
  {
    "name": "Turpinianame"
  },
  {
    "name": "Urera"
  },
  {
    "name": "Urtica"
  },
  {
    "name": "Vachellia"
  },
  {
    "name": "Vatairea"
  },
  {
    "name": "Verbesina"
  },
  {
    "name": "Vernonanthura"
  },
  {
    "name": "Vernonia"
  },
  {
    "name": "Vismianame"
  },
  {
    "name": "Vitex"
  },
  {
    "name": "Washingtonia"
  },
  {
    "name": "Wedelia"
  },
  {
    "name": "Weinmannianame"
  },
  {
    "name": "Wigandia"
  },
  {
    "name": "Wiwilisca"
  },
  {
    "name": "Xylosma"
  },
  {
    "name": "Yucca"
  },
  {
    "name": "Zanthoxylonnamename"
  },
  {
    "name": "Zanthoxylum"
  },
  {
    "name": "Ziziphus"
  },
  {
    "name": "Zuelania"
  },
  {
    "name": "Zygia"
  },
  {
    "name": "dasylirion"
  }
];


const timestamp = new Date();

const treeTypesWithTimestamps = treeTypeNames.map(tree => ({
  ...tree,
  createdAt: timestamp,
  updatedAt: timestamp
}));


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tree_type', treeTypesWithTimestamps, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tree_type', null, {});
  }
};
