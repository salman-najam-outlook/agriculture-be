"use strict";

let equipSpanishTranslation = {
  "Hand hoe": "azada de mano",
  "Ox drawn plough": "Arado tirado por bueyes",
  "Mould board plough": "Arado de vertedera",
  "Ridge plough": "Arado de cumbrera",
  Harrow: "Grada",
  Tractor: "Tractor",
  Drill: "Perforar",
  Subsoiler: "Subsolador",
  Cultipacker: "empacadora de cultivos",
  "Chisel plow": "arado de cincel",
  Wheelbarrow: "Carretilla",
  Rake: "Rastrillo",
  Slasher: "slasher",
  Lorry: "Camión",
  Pickup: "Levantar",
  Truck: "Camión",
  Car: "Auto",
  Tuktuk: "Tuktuk",
  Bags: "Bolsas",
  "Freezers/Fridges": "Congeladores/Frigoríficos",
  Incubators: "Incubadoras",
  "Storage containers": "Contenedores de almacenamiento",
  Pasteurizers: "Pasteurizadores",
  "Milking machine": "Ordeñadora",
  "Watering can": "Regadera",
  "Ear tags applicator": "Aplicador de crotales",
  Dehorner: "Descornador",
  Disbudder: "Descorazonador",
  Burdizzo: "Burdizzo",
  "Ring applicator": "aplicador de anillos",
  Hammer: "Martillo",
  "Spade fork": "tenedor de pala",
  "Tractor (M)": "Tractocamión (M)",
  "Hammer (S)": "Martillo (P)",
  Wheelbarrow: "Carretilla",
  "Hoof trimming mashine": "Máquina para cortar pezuñas",
  "Hoof cutter": "Cortapezuñas",
  "Semen freezing tank": "Tanque de congelación de semen",
  "Drying machines": "Secadoras",
  "Branding iron": "Hierro de marcar",
  Scale: "Escala",
  Sickle: "Hoz",
  Hoe: "Azada",
  "Self-propelled sprayer": "Pulverizador autopropulsado",
  "Knapsack sprayer": "Pulverizador de mochila",
  "Trailer sprayer": "Pulverizador de remolque",
  "Combine harvestor": "Cosechadora",
  Muttock: "Pato",
  Seeder: "Sembradora",
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let transArr = [];

      for (let k in equipSpanishTranslation) {
        transArr.push({
          english: k,
          spanish: equipSpanishTranslation[k],
        });
      }

      let equipmentBulkRes = await queryInterface.bulkInsert(
        "global_translation_metadata",
        transArr,
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction?.rollback();
      console.log(error, "=============================");
    }
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Currencies', null, {});
  },
};
