'use strict';

let equipment_name = [
	{
		"id" : 2,
		"name" : "Muttock",
		"userID" : 17,
		"activity" : 2,
		"recordId" : "ena100",
		"createdAt" : "2021-12-06 16:46:08",
		"updatedAt" : "2021-12-06 16:46:08"
	},
	{
		"id" : 3,
		"name" : "Hammer",
		"userID" : 17,
		"activity" : 1,
		"recordId" : "ena101",
		"createdAt" : "2021-12-06 16:46:18",
		"updatedAt" : "2021-12-06 16:46:18"
	},
	// {
	// 	"id" : 38,
	// 	"name" : "Hand hoe",
	// 	"userID" : null,
	// 	"activity" : 2,
	// 	"recordId" : "ena136",
	// 	"createdAt" : "2022-02-08 06:08:50",
	// 	"updatedAt" : "2022-02-08 06:08:50"
	// },
	// {
	// 	"id" : 39,
	// 	"name" : "Ox drawn plough",
	// 	"userID" : null,
	// 	"activity" : 2,
	// 	"recordId" : "ena137",
	// 	"createdAt" : "2022-02-08 06:08:50",
	// 	"updatedAt" : "2022-02-08 06:08:50"
	// },
	{
		"id" : 40,
		"name" : "Mould board plough",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena138",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 41,
		"name" : "Ridge plough",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena139",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 42,
		"name" : "Harrow",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena140",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 43,
		"name" : "Tractor",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena141",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 44,
		"name" : "Drill",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena142",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 45,
		"name" : "Ox drawn plough",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena143",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 46,
		"name" : "Subsoiler",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena144",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 47,
		"name" : "Cultipacker",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena145",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 48,
		"name" : "Chisel plow",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena146",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 49,
		"name" : "Wheelbarrow",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena147",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 50,
		"name" : "Rake",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena148",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 51,
		"name" : "Slasher",
		"userID" : null,
		"activity" : 2,
		"recordId" : "ena149",
		"createdAt" : "2022-02-08 06:08:50",
		"updatedAt" : "2022-02-08 06:08:50"
	},
	{
		"id" : 79,
		"name" : "Lorry",
		"userID" : null,
		"activity" : 3,
		"recordId" : "ena177",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 80,
		"name" : "Pickup",
		"userID" : null,
		"activity" : 3,
		"recordId" : "ena178",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 81,
		"name" : "Truck",
		"userID" : null,
		"activity" : 3,
		"recordId" : "ena179",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 82,
		"name" : "Car",
		"userID" : null,
		"activity" : 3,
		"recordId" : "ena180",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 83,
		"name" : "Tuktuk",
		"userID" : null,
		"activity" : 3,
		"recordId" : "ena181",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 84,
		"name" : "Lorry",
		"userID" : null,
		"activity" : 18,
		"recordId" : "ena182",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 85,
		"name" : "Pickup",
		"userID" : null,
		"activity" : 18,
		"recordId" : "ena183",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 86,
		"name" : "Truck",
		"userID" : null,
		"activity" : 18,
		"recordId" : "ena184",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 87,
		"name" : "Car",
		"userID" : null,
		"activity" : 18,
		"recordId" : "ena185",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 88,
		"name" : "Tuktuk",
		"userID" : null,
		"activity" : 18,
		"recordId" : "ena186",
		"createdAt" : "2022-03-28 11:30:50",
		"updatedAt" : "2022-03-28 11:30:50"
	},
	{
		"id" : 89,
		"name" : "Bags",
		"userID" : null,
		"activity" : 5,
		"recordId" : "ena187",
		"createdAt" : "2022-03-28 11:30:52",
		"updatedAt" : "2022-03-28 11:30:52"
	},
	{
		"id" : 90,
		"name" : "Freezers\/Fridges",
		"userID" : null,
		"activity" : 5,
		"recordId" : "ena188",
		"createdAt" : "2022-03-28 11:30:52",
		"updatedAt" : "2022-03-28 11:30:52"
	},
	{
		"id" : 91,
		"name" : "Incubators",
		"userID" : null,
		"activity" : 5,
		"recordId" : "ena189",
		"createdAt" : "2022-03-28 11:30:52",
		"updatedAt" : "2022-03-28 11:30:52"
	},
	{
		"id" : 92,
		"name" : "Storage containers",
		"userID" : null,
		"activity" : 5,
		"recordId" : "ena190",
		"createdAt" : "2022-03-28 11:30:52",
		"updatedAt" : "2022-03-28 11:30:52"
	},
	{
		"id" : 93,
		"name" : "Pasteurizers",
		"userID" : null,
		"activity" : 9,
		"recordId" : "ena191",
		"createdAt" : "2022-03-28 11:30:55",
		"updatedAt" : "2022-03-28 11:30:55"
	},
	{
		"id" : 94,
		"name" : "Milking machine ",
		"userID" : null,
		"activity" : 9,
		"recordId" : "ena192",
		"createdAt" : "2022-03-28 11:30:55",
		"updatedAt" : "2022-03-28 11:30:55"
	},
	{
		"id" : 95,
		"name" : "Watering can",
		"userID" : null,
		"activity" : 4,
		"recordId" : "ena193",
		"createdAt" : "2022-03-28 11:30:57",
		"updatedAt" : "2022-03-28 11:30:57"
	},
	{
		"id" : 96,
		"name" : "Ear tags applicator",
		"userID" : null,
		"activity" : 8,
		"recordId" : "ena194",
		"createdAt" : "2022-03-28 11:30:59",
		"updatedAt" : "2022-03-28 11:30:59"
	},
	{
		"id" : 97,
		"name" : "Dehorner",
		"userID" : null,
		"activity" : 7,
		"recordId" : "ena195",
		"createdAt" : "2022-03-28 11:31:00",
		"updatedAt" : "2022-03-28 11:31:00"
	},
	{
		"id" : 98,
		"name" : "Disbudder",
		"userID" : null,
		"activity" : 7,
		"recordId" : "ena196",
		"createdAt" : "2022-03-28 11:31:00",
		"updatedAt" : "2022-03-28 11:31:00"
	},
	{
		"id" : 99,
		"name" : "Burdizzo",
		"userID" : null,
		"activity" : 6,
		"recordId" : "ena197",
		"createdAt" : "2022-03-28 11:31:02",
		"updatedAt" : "2022-03-28 11:31:02"
	},
	{
		"id" : 100,
		"name" : "Ring applicator",
		"userID" : null,
		"activity" : 6,
		"recordId" : "ena198",
		"createdAt" : "2022-03-28 11:31:02",
		"updatedAt" : "2022-03-28 11:31:02"
	},
	{
		"id" : 102,
		"name" : "Hammer",
		"userID" : null,
		"activity" : 1,
		"recordId" : "ena200",
		"createdAt" : "2022-04-05 11:47:02",
		"updatedAt" : "2022-04-05 11:47:02"
	},
	{
		"id" : 103,
		"name" : "Spade fork",
		"userID" : null,
		"activity" : 1,
		"recordId" : "ena201",
		"createdAt" : "2022-04-05 11:47:02",
		"updatedAt" : "2022-04-05 11:47:02"
	},
	{
		"id" : 104,
		"name" : "Tractor (M)",
		"userID" : null,
		"activity" : 1,
		"recordId" : "ena202",
		"createdAt" : "2022-04-05 11:47:02",
		"updatedAt" : "2022-04-05 11:47:02"
	},
	{
		"id" : 105,
		"name" : "Hammer (S)",
		"userID" : null,
		"activity" : 1,
		"recordId" : "ena203",
		"createdAt" : "2022-04-05 11:47:02",
		"updatedAt" : "2022-04-05 11:47:02"
	},
	{
		"id" : 106,
		"name" : "Wheelbarrow",
		"userID" : null,
		"activity" : 1,
		"recordId" : "ena204",
		"createdAt" : "2022-04-05 11:47:02",
		"updatedAt" : "2022-04-05 11:47:02"
	},
	{
		"id" : 107,
		"name" : "Semen freezing tank",
		"userID" : null,
		"activity" : 26,
		"recordId" : "ena205",
		"createdAt" : "2022-04-06 11:24:26",
		"updatedAt" : "2022-04-06 11:24:26"
	},
	{
		"id" : 108,
		"name" : "Branding iron",
		"userID" : null,
		"activity" : 24,
		"recordId" : "ena206",
		"createdAt" : "2022-04-06 11:24:29",
		"updatedAt" : "2022-04-06 11:24:29"
	},
	{
		"id" : 109,
		"name" : "Drying machines",
		"userID" : null,
		"activity" : 25,
		"recordId" : "ena207",
		"createdAt" : "2022-04-06 11:24:30",
		"updatedAt" : "2022-04-06 11:24:30"
	},
	{
		"id" : 110,
		"name" : "Sickle",
		"userID" : null,
		"activity" : 20,
		"recordId" : "ena208",
		"createdAt" : "2022-04-06 11:24:33",
		"updatedAt" : "2022-04-06 11:24:33"
	},
	{
		"id" : 111,
		"name" : "Combine harvestor",
		"userID" : null,
		"activity" : 20,
		"recordId" : "ena209",
		"createdAt" : "2022-04-06 11:24:33",
		"updatedAt" : "2022-04-06 11:24:33"
	},
	{
		"id" : 112,
		"name" : "Hoof trimming mashine",
		"userID" : null,
		"activity" : 27,
		"recordId" : "ena210",
		"createdAt" : "2022-04-06 11:24:35",
		"updatedAt" : "2022-04-06 11:24:35"
	},
	{
		"id" : 113,
		"name" : "Hoof cutter",
		"userID" : null,
		"activity" : 27,
		"recordId" : "ena211",
		"createdAt" : "2022-04-06 11:24:35",
		"updatedAt" : "2022-04-06 11:24:35"
	},
	{
		"id" : 114,
		"name" : "Muttock",
		"userID" : null,
		"activity" : 19,
		"recordId" : "ena212",
		"createdAt" : "2022-04-06 11:24:36",
		"updatedAt" : "2022-04-06 11:24:36"
	},
	{
		"id" : 115,
		"name" : "Hoe",
		"userID" : null,
		"activity" : 19,
		"recordId" : "ena213",
		"createdAt" : "2022-04-06 11:24:36",
		"updatedAt" : "2022-04-06 11:24:36"
	},
	{
		"id" : 116,
		"name" : "Seeder",
		"userID" : null,
		"activity" : 19,
		"recordId" : "ena214",
		"createdAt" : "2022-04-06 11:24:36",
		"updatedAt" : "2022-04-06 11:24:36"
	},
	{
		"id" : 123,
		"name" : "Sickle",
		"userID" : null,
		"activity" : 22,
		"recordId" : "ena215",
		"createdAt" : "2022-04-06 11:24:41",
		"updatedAt" : "2022-04-06 11:24:41"
	},
	{
		"id" : 124,
		"name" : "Hoe",
		"userID" : null,
		"activity" : 22,
		"recordId" : "ena216",
		"createdAt" : "2022-04-06 11:24:41",
		"updatedAt" : "2022-04-06 11:24:41"
	},
	{
		"id" : 125,
		"name" : "Scale",
		"userID" : null,
		"activity" : 23,
		"recordId" : "ena217",
		"createdAt" : "2022-04-06 11:24:44",
		"updatedAt" : "2022-04-06 11:24:44"
	},
	{
		"id" : 126,
		"name" : "Self-propelled sprayer",
		"userID" : null,
		"activity" : 21,
		"recordId" : "ena218",
		"createdAt" : "2022-04-06 11:28:51",
		"updatedAt" : "2022-04-06 11:28:51"
	},
	{
		"id" : 127,
		"name" : "Knapsack sprayer",
		"userID" : null,
		"activity" : 21,
		"recordId" : "ena219",
		"createdAt" : "2022-04-06 11:28:51",
		"updatedAt" : "2022-04-06 11:28:51"
	},
	{
		"id" : 128,
		"name" : "Trailer sprayer",
		"userID" : null,
		"activity" : 21,
		"recordId" : "ena220",
		"createdAt" : "2022-04-06 11:28:51",
		"updatedAt" : "2022-04-06 11:28:51"
	},
	{
		"id" : 137,
		"name" : "test",
		"userID" : 1101,
		"activity" : 26,
		"recordId" : null,
		"createdAt" : "2022-09-23 19:27:34",
		"updatedAt" : "2022-09-23 19:27:34"
	}
]


let insertArr = []

equipment_name.forEach(el => {
    insertArr.push({
        equipmentNameId: el.id,
        equipmentActivityId: el.activity,
        createdAt: new Date(),
        updatedAt: new Date()
    })
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('equipment_name_equipment_activity', insertArr);
  },

  async down(queryInterface, Sequelize) {},
};
