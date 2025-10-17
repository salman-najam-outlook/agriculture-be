'use strict';

/** @type {import('sequelize-cli').Migration} */

const moment = require('moment')

module.exports = {
  async up (queryInterface, Sequelize) {
    const shade_trees = [
      {
        "name": "Pink cedar",
        "scientific_names": "Acrocarpus fraxinifolius"
      },
      {
        "name": "Sau tree",
        "scientific_names": "Albizia chinensis"
      },
      {
        "name": "Persian silk tree",
        "scientific_names": "Albizia kallora"
      },
      {
        "name": "Black board tree",
        "scientific_names": "Alstonia scholaris"
      },
      {
        "name": "Kabau",
        "scientific_names": "Archidendron microcarpum"
      },
      {
        "name": "Jengkol",
        "scientific_names": "Archidendron pauciflorum"
      },
      {
        "name": "Breadfruit",
        "scientific_names": "Artocarpus altilis"
      },
      {
        "name": "Jackfruit",
        "scientific_names": "Artocarpus heterophyllus"
      },
      {
        "name": "Java cedar",
        "scientific_names": "Betula alnoides"
      },
      {
        "name": "Java cedar",
        "scientific_names": "Bischofia javanica"
      },
      {
        "name": "Plum mango",
        "scientific_names": "Bouea macrophylla"
      },
      {
        "name": "Chinakapin",
        "scientific_names": "Castanopsis"
      },
      {
        "name": "Himalayan wild cherry",
        "scientific_names": "Cerasus cerasoides"
      },
      {
        "name": "Camphor tree",
        "scientific_names": "Cinnamomum camphora"
      },
      {
        "name": "Lime",
        "scientific_names": "Citrus aurantiifolia"
      },
      {
        "name": "Bitter orange",
        "scientific_names": "Citrus aurantium"
      },
      {
        "name": "Black rosewood",
        "scientific_names": "Dalbergia latifolia"
      },
      {
        "name": "Gulmohar",
        "scientific_names": "Delonix regia"
      },
      {
        "name": "Longan",
        "scientific_names": "Dimocarpus longan"
      },
      {
        "name": "Asian persimmon",
        "scientific_names": "Diospyros kaki var."
      },
      {
        "name": "Durian",
        "scientific_names": "Durio zibethinus"
      },
      {
        "name": "African oil palm",
        "scientific_names": "Elaeis guineensis"
      },
      {
        "name": "Erythrina",
        "scientific_names": "Erythrina subumbrans"
      },
      {
        "name": "Indian coral tree",
        "scientific_names": "Erythrina variegata"
      },
      {
        "name": "White albizia",
        "scientific_names": "Falcataria falcata"
      },
      {
        "name": "Ficus oppositifolia",
        "scientific_names": "Ficus hispida"
      },
      {
        "name": "Large leaf flemingia",
        "scientific_names": "Flemingia macrophylla"
      },
      {
        "name": "Gliricidia",
        "scientific_names": "Gliricidia sepium"
      },
      {
        "name": "Buko",
        "scientific_names": "Gnetum gnemon"
      },
      {
        "name": "River Tamarind",
        "scientific_names": "Leucaena cultivars (diversifolia, leucocephala, and hybrids)"
      },
      {
        "name": "Subabul",
        "scientific_names": "Leucaena leucocephala"
      },
      {
        "name": "Litchi",
        "scientific_names": "Litchi chinensis"
      },
      {
        "name": "Soft bollygum",
        "scientific_names": "Litsea sp."
      },
      {
        "name": "Queensland nut",
        "scientific_names": "Macadamia integrifolia"
      },
      {
        "name": "Hairy Mahang",
        "scientific_names": "Macaranga tanarius"
      },
      {
        "name": "Champak",
        "scientific_names": "Magnolia champaca"
      },
      {
        "name": "Rusty kamala",
        "scientific_names": "Mallotus tetracoccus"
      },
      {
        "name": "Mango",
        "scientific_names": "Mangifera indica"
      },
      {
        "name": "Chinaberry tree",
        "scientific_names": "Melia azedarach"
      },
      {
        "name": "Gagnepain",
        "scientific_names": "Michelia baillonii"
      },
      {
        "name": "Noni",
        "scientific_names": "Morinda citrifolia"
      },
      {
        "name": "Moringa tree",
        "scientific_names": "Moringa oleifera"
      },
      {
        "name": "Banana",
        "scientific_names": "Musa sp."
      },
      {
        "name": "Common burflower",
        "scientific_names": "Neolamarckia cadamba"
      },
      {
        "name": "Rambutan",
        "scientific_names": "Nephelium lappaceum"
      },
      {
        "name": "Crested wattle",
        "scientific_names": "Paraserianthes lophantha"
      },
      {
        "name": "Bitter bean",
        "scientific_names": "Parkia speciosa"
      },
      {
        "name": "Avocado",
        "scientific_names": "Persea americana"
      },
      {
        "name": "Indian gooseberry",
        "scientific_names": "Phyllanthus emblica"
      },
      {
        "name": "Guava",
        "scientific_names": "Psidium guajava"
      },
      {
        "name": "Kechapi",
        "scientific_names": "Sandoricum koetjape"
      },
      {
        "name": "Needlewood",
        "scientific_names": "Schima wallichii"
      },
      {
        "name": "White meranti",
        "scientific_names": "Shorea javanica"
      },
      {
        "name": "Scots pine",
        "scientific_names": "silvestris"
      },
      {
        "name": "Gum benjamin",
        "scientific_names": "Styrax benzoin"
      },
      {
        "name": "Mahogany",
        "scientific_names": "Swietenia macrophylla"
      },
      {
        "name": "Water apple",
        "scientific_names": "Syzygium aqueum"
      },
      {
        "name": "Malay apple",
        "scientific_names": "Syzygium malaccense"
      },
      {
        "name": "Red cedar",
        "scientific_names": "Toona ciliata"
      },
      {
        "name": "Chinese cedar",
        "scientific_names": "Toona sinensis"
      }
    ]
    const windbreak_tree = [
      {
        "name": "Silky oak",
        "scientific_name": "Grevillea robusta"
      },
      {
        "name": "Ironwood tree",
        "scientific_name": "Casuarina spp"
      },
      {
        "name": "Coral tree",
        "scientific_name": "Erythrina"
      },
      {
        "name": "Mexican weeping pine",
        "scientific_name": "Pinus patula"
      },
      {
        "name": "White leadtree",
        "scientific_name": "Leucaena leucocephala"
      },
      {
        "name": "Pigeon pea",
        "scientific_name": "Cajanus cajan"
      },
      {
        "name": "Rattle beans",
        "scientific_name": "Crotalaria spp"
      },
      {
        "name": "Large leaf flemingia",
        "scientific_name": "Flemingia macrophylla"
      },
      {
        "name": "Daincha",
        "scientific_name": "Sesbania"
      },
      {
        "name": "wild indigo",
        "scientific_name": "Tephrosia."
      },
      {
        "name": "Acacia, black",
        "scientific_name": "Acacia mearnsii"
      },
      {
        "name": "Acacia, silver",
        "scientific_name": "Acacia dealbata"
      },
      {
        "name": "Alder, red",
        "scientific_name": "Alnus rubra"
      },
      {
        "name": "Alder, white",
        "scientific_name": "Alnus rhombifolia"
      },
      {
        "name": "Arbutus, strawberry tree",
        "scientific_name": "Arbutus unedo"
      },
      {
        "name": "Ash, black",
        "scientific_name": "Fraxinus nigra"
      },
      {
        "name": "Ash, green",
        "scientific_name": "Fraxinus pennsylvanica"
      },
      {
        "name": "Ash, white",
        "scientific_name": "Fraxinus americana"
      },
      {
        "name": "Aspen, bigtooth",
        "scientific_name": "Populus grandidentata"
      },
      {
        "name": "Aspen, quaking",
        "scientific_name": "Populus tremuloides"
      },
      {
        "name": "Birch, yellow",
        "scientific_name": "Betula alleghaniensis"
      },
      {
        "name": "Cedar, eastern redcedar",
        "scientific_name": "Juniperus virginiana"
      },
      {
        "name": "Cherry, black",
        "scientific_name": "Prunus serotina"
      },
      {
        "name": "Cherry, chokecherry",
        "scientific_name": "Prunus virginiana var. melanocarpa"
      },
      {
        "name": "Cypress, Arizona",
        "scientific_name": "Cupressus arizonica"
      },
      {
        "name": "Dogwood, flowering",
        "scientific_name": "Cornus florida"
      },
      {
        "name": "Elm, American",
        "scientific_name": "Ulmus americana"
      },
      {
        "name": "Fir, Douglas",
        "scientific_name": "Pseudotsuga menziesii"
      },
      {
        "name": "Fir, white",
        "scientific_name": "Abies concolor"
      },
      {
        "name": "Hawthorn",
        "scientific_name": "Crataegus spp."
      },
      {
        "name": "Hemlock, eastern",
        "scientific_name": "Tsuga canadensis"
      },
      {
        "name": "Hickory, shagbark",
        "scientific_name": "Carya ovata"
      },
      {
        "name": "Holly, American",
        "scientific_name": "Ilex opaca"
      },
      {
        "name": "Honey locust",
        "scientific_name": "Gleditsia triacanthos"
      },
      {
        "name": "Hornbeam, American",
        "scientific_name": "Carpinus caroliniana"
      },
      {
        "name": "Larch, eastern",
        "scientific_name": "Larix laricina"
      },
      {
        "name": "Linden, American",
        "scientific_name": "Tilia americana"
      },
      {
        "name": "Maple, red",
        "scientific_name": "Acer rubrum"
      },
      {
        "name": "Maple, sugar",
        "scientific_name": "Acer saccharum"
      },
      {
        "name": "Oak, black",
        "scientific_name": "Quercus velutina"
      },
      {
        "name": "Oak, chestnut",
        "scientific_name": "Quercus prinus"
      },
      {
        "name": "Oak, northern red",
        "scientific_name": "Quercus rubra"
      },
      {
        "name": "Oak, white",
        "scientific_name": "Quercus alba"
      },
      {
        "name": "Pine, Austrian",
        "scientific_name": "Pinus nigra"
      },
      {
        "name": "Pine, eastern white",
        "scientific_name": "Pinus strobus"
      },
      {
        "name": "Pine, red",
        "scientific_name": "Pinus resinosa"
      },
      {
        "name": "Pine, Scots",
        "scientific_name": "Pinus sylvestris"
      },
      {
        "name": "Poplar, Carolina",
        "scientific_name": "Populus deltoides"
      },
      {
        "name": "Poplar, Lombardy",
        "scientific_name": "Populus nigra 'Italica'"
      },
      {
        "name": "Red cedar, eastern",
        "scientific_name": "Juniperus virginiana"
      },
      {
        "name": "Spruce, black",
        "scientific_name": "Picea mariana"
      },
      {
        "name": "Spruce, white",
        "scientific_name": "Picea glauca"
      },
      {
        "name": "Sycamore, American",
        "scientific_name": "Platanus occidentalis"
      },
      {
        "name": "Tamarack",
        "scientific_name": "Larix laricina"
      },
      {
        "name": "Tupelo, black",
        "scientific_name": "Nyssa sylvatica"
      },
      {
        "name": "Walnut, black",
        "scientific_name": "Juglans nigra"
      },
      {
        "name": "Willow, black",
        "scientific_name": "Salix nigra"
      },
      {
        "name": "Willow, white",
        "scientific_name": "Salix alba"
      }
    ]

    await queryInterface.changeColumn('wind_breaker_tree', 'created_by', {
      type:Sequelize.INTEGER,
      allowNull:true
    })

    await queryInterface.changeColumn('shade_tree', 'created_by', {
      type:Sequelize.INTEGER,
      allowNull:true
    })

    const w_insert_data = []
    const s_insert_data = []


    for(const rw of windbreak_tree){
      w_insert_data.push({
        name: rw.name,
        created_by: null,
        isDeleted: 0,
        status:null,
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt:moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }

    for(const rw of shade_trees){
      s_insert_data.push({
        name: rw.name,
        created_by: null,
        isDeleted: 0,
        status:null,
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt:moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }


    for (let rwi of w_insert_data) {
      let sql =
        "SELECT * FROM wind_breaker_tree WHERE name = :name";
      const tw_e = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { name: rwi.name },
      });

      // update case
      if (tw_e && tw_e.length > 0) {
        let item = {};
        for (let key in rwi) {
          const lg = key.toLocaleLowerCase().trim();
          item[lg] = rwi[key];
        }
        await queryInterface.bulkUpdate("wind_breaker_tree", item, {
          id: tw_e?.map((item) => item.id),
        });
      } else {
        // Insert Case
        let item = {};
        for (let key in rwi) {
          const lgc = key.toLocaleLowerCase().trim();
          item[lgc] = rwi[key];
        }
        await queryInterface.insert(null, "wind_breaker_tree", item);
      }

    }


    for (let rwi of s_insert_data) {
      let sql =
        "SELECT * FROM shade_tree WHERE name = :name";
      const tw_e = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { name: rwi.name },
      });

      // update case
      if (tw_e && tw_e.length > 0) {
        let item = {};
        for (let key in rwi) {
          const lg = key.toLocaleLowerCase().trim();
          item[lg] = rwi[key];
        }
        await queryInterface.bulkUpdate("shade_tree", item, {
          id: tw_e?.map((item) => item.id),
        });
      } else {
        // Insert Case
        let item = {};
        for (let key in rwi) {
          const lgc = key.toLocaleLowerCase().trim();
          item[lgc] = rwi[key];
        }
        await queryInterface.insert(null, "shade_tree", item);
      }

    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
