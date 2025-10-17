"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const farmNames = [
      "TrailFarm2", 
      "TrailFarm3", 
      "TrailFarm4", 
      "TrailFarm5", 
      "TrailFarm8", 
      "TrailFarm9", 
      "TrailFarm7", 
      "TrailFarm10", 
      "TrailFarm11", 
      "TrailFarm12", 
      "TrailFarm13", 
      "TrailFarm14", 
      "TrailFarm15", 
      "TrailFarm16", 
      "TrailFarm17", 
      "TrailFarm18", 
      "TrailFarm19", 
      "TrailFarm20", 
      "TrailFarm21", 
      "TrailFarm22", 
      "TrailFarm23", 
      "TrailFarm24", 
      "TrailFarm25", 
      "TrailFarm26", 
      "TrailFarm27", 
      "TrailFarm28", 
      "TrailFarm29", 
      "TrailFarm30", 
      "TrailFarm31", 
      "TrailFarm32", 
      "TrailFarm33", 
      "TrailFarm34", 
      "TrailFarm35", 
      "TrailFarm36", 
      "TrailFarm37", 
      "TrailFarm38", 
      "TrailFarm39", 
      "TrailFarm40", 
      "TrailFarm41", 
      "TrailFarm42", 
      "TrailFarm43", 
      "TrailFarm44", 
      "TrailFarm45", 
      "TrailFarm46", 
      "TrailFarm47", 
      "TrailFarm48", 
      "TrailFarm49", 
      "TrailFarm50", 
      "TrailFarm51", 
      "TrailFarm52", 
      "TrailFarm53", 
      "TrailFarm54", 
      "TrailFarm55", 
      "TrailFarm56", 
      "TrailFarm57", 
      "TrailFarm58", 
      "TrailFarm59", 
      "TrailFarm60", 
      "TrailFarm61", 
      "TrailFarm62", 
      "TrailFarm63", 
      "TrailFarm64", 
      "TrailFarm65", 
      "TrailFarm66", 
      "TrailFarm67", 
      "TrailFarm68", 
      "TrailFarm69", 
      "TrailFarm70", 
      "TrailFarm71", 
      "TrailFarm72", 
      "TrailFarm73", 
      "TrailFarm74", 
      "TrailFarm75", 
      "TrailFarm76", 
      "TrailFarm77", 
      "TrailFarm78", 
      "TrailFarm79", 
      "TrailFarm80", 
      "TrailFarm81", 
      "TrailFarm82", 
      "TrailFarm83", 
      "TrailFarm84", 
      "TrailFarm85", 
      "TrailFarm86", 
      "TrailFarm87", 
      "TrailFarm88", 
      "TrailFarm89", 
      "TrailFarm90", 
      "TrailFarm91", 
      "TrailFarm92", 
      "TrailFarm93", 
      "TrailFarm94", 
      "TrailFarm95", 
      "TrailFarm96", 
      "TrailFarm97", 
      "TrailFarm98", 
      "TrailFarm99", 
      "TrailFarm100", 
      "TrailFarm101", 
      "TrailFarm102", 
      "TrailFarm103", 
      "TrailFarm104", 
      "TrailFarm105", 
      "TrailFarm106", 
      "TrailFarm107", 
      "TrailFarm108", 
      "TrailFarm109", 
      "TrailFarm110", 
      "TrailFarm111", 
      "TrailFarm112", 
      "TrailFarm113", 
      "TrailFarm114"
    ];

    const plots = [
      {
        "farm_id": "TrailFarm2",
        "plot_no": "ANTM010",
        "latitude": 21.6669583333,
        "longitude": -104.4247416667,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm2",
        "plot_no": "ANTM012",
        "latitude": 21.6648694444,
        "longitude": -104.4165361111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm3",
        "plot_no": "ANTM013",
        "latitude": 21.6534361111,
        "longitude": -104.4226888889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm3",
        "plot_no": "ANTM014",
        "latitude": 21.6424972222,
        "longitude": -104.4262388889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm3",
        "plot_no": "ANTM015",
        "latitude": 21.6434055556,
        "longitude": -104.4352416667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm4",
        "plot_no": "ANTM016",
        "latitude": 21.6336111111,
        "longitude": -104.4350888889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm4",
        "plot_no": "ANTM021",
        "latitude": 21.6601805556,
        "longitude": -104.4116527778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm4",
        "plot_no": "ESTA017",
        "latitude": 21.6232805556,
        "longitude": -104.4395333333,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm5",
        "plot_no": "ESTA022",
        "latitude": 21.6279916667,
        "longitude": -104.4323861111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm7",
        "plot_no": "ESTA053",
        "latitude": 21.584925,
        "longitude": -104.4124305556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm8",
        "plot_no": "ESTA023",
        "latitude": 21.6174555556,
        "longitude": -104.4318361111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm8",
        "plot_no": "ESTA024",
        "latitude": 21.6162277778,
        "longitude": -104.4242944444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm8",
        "plot_no": "ESTA055",
        "latitude": 21.584925,
        "longitude": -104.4124305556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm9",
        "plot_no": "ESTA029",
        "latitude": 21.5901472222,
        "longitude": -104.415,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm9",
        "plot_no": "ESTA056",
        "latitude": 21.5956305556,
        "longitude": -104.4171111111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm10",
        "plot_no": "ESTA057",
        "latitude": 21.6038111111,
        "longitude": -104.4182194444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm11",
        "plot_no": "ESTA058",
        "latitude": 21.605625,
        "longitude": -104.4331861111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm12",
        "plot_no": "ESTA078",
        "latitude": 21.6243277778,
        "longitude": -104.4330027778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm13",
        "plot_no": "FEDR018",
        "latitude": 21.680675,
        "longitude": -104.4186722222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm14",
        "plot_no": "FEDR019",
        "latitude": 21.6783055556,
        "longitude": -104.4129138889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm15",
        "plot_no": "FEDR020",
        "latitude": 21.6747666667,
        "longitude": -104.4097861111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm16",
        "plot_no": "HIGR001",
        "latitude": 21.6895972222,
        "longitude": -104.5237361111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm17",
        "plot_no": "HIGR002",
        "latitude": 21.6834722222,
        "longitude": -104.533375,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm18",
        "plot_no": "HIGR003",
        "latitude": 21.676875,
        "longitude": -104.5325638889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm19",
        "plot_no": "HIGR009",
        "latitude": 21.6720833333,
        "longitude": -104.5387166667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm20",
        "plot_no": "HIGR010",
        "latitude": 21.6659083333,
        "longitude": -104.5467583333,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm21",
        "plot_no": "HIGR060",
        "latitude": 21.6919,
        "longitude": -104.452275,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm22",
        "plot_no": "HIGR061",
        "latitude": 21.6897888889,
        "longitude": -104.5119916667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm23",
        "plot_no": "HIGR062",
        "latitude": 21.6922083333,
        "longitude": -104.50275,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm24",
        "plot_no": "HIGR063",
        "latitude": 21.6952472222,
        "longitude": -104.4882694444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm25",
        "plot_no": "HIGR064",
        "latitude": 21.6933888889,
        "longitude": -104.4775055556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm26",
        "plot_no": "HIGR065",
        "latitude": 21.6796055556,
        "longitude": -104.5212166667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm27",
        "plot_no": "HIGR066",
        "latitude": 21.6775805556,
        "longitude": -104.5143916667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm28",
        "plot_no": "HIGR067",
        "latitude": 21.6692055556,
        "longitude": -104.5020166667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm29",
        "plot_no": "HIGR068",
        "latitude": 21.6676,
        "longitude": -104.5214416667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm30",
        "plot_no": "HIGR069",
        "latitude": 21.6967944444,
        "longitude": -104.52905,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm31",
        "plot_no": "HIGR070",
        "latitude": 21.696875,
        "longitude": -104.5227638889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm32",
        "plot_no": "HIGR071",
        "latitude": 21.6988277778,
        "longitude": -104.5133805556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm33",
        "plot_no": "HIGR072",
        "latitude": 21.6817833333,
        "longitude": -104.4939416667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm34",
        "plot_no": "HIGR073",
        "latitude": 21.6764888889,
        "longitude": -104.5030277778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm35",
        "plot_no": "HIGR074",
        "latitude": 21.7073388889,
        "longitude": -104.5293138889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm36",
        "plot_no": "HIGR075",
        "latitude": 21.7033666667,
        "longitude": -104.5209055556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm37",
        "plot_no": "HIGR076",
        "latitude": 21.7098111111,
        "longitude": -104.5127944444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm38",
        "plot_no": "HIGR077",
        "latitude": 21.6966527778,
        "longitude": -104.5400888889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm39",
        "plot_no": "HIGR079",
        "latitude": 21.6763972222,
        "longitude": -104.54285,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm40",
        "plot_no": "HIGR080",
        "latitude": 21.6785527778,
        "longitude": -104.5479777778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm41",
        "plot_no": "HIGR103",
        "latitude": 21.6643416667,
        "longitude": -104.4925055556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm42",
        "plot_no": "HIGR104",
        "latitude": 21.6572583333,
        "longitude": -104.4924138889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm43",
        "plot_no": "HIGR105",
        "latitude": 21.6479,
        "longitude": -104.489875,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm44",
        "plot_no": "HIGR106",
        "latitude": 21.6585166667,
        "longitude": -104.484425,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm45",
        "plot_no": "HIGR107",
        "latitude": 21.6644388889,
        "longitude": -104.4822972222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm46",
        "plot_no": "HIGR108",
        "latitude": 21.6782694444,
        "longitude": -104.4795888889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm47",
        "plot_no": "HIGR109",
        "latitude": 21.6762472222,
        "longitude": -104.4713805556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm48",
        "plot_no": "HIGR110",
        "latitude": 21.6465527778,
        "longitude": -104.4634694444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm49",
        "plot_no": "HIGR111",
        "latitude": 21.6633333333,
        "longitude": -104.53345,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm50",
        "plot_no": "HIGR112",
        "latitude": 21.6700583333,
        "longitude": -104.5127916667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm51",
        "plot_no": "HIGR113",
        "latitude": 21.6779694444,
        "longitude": -104.4932777778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm52",
        "plot_no": "HIGR114",
        "latitude": 21.6899333333,
        "longitude": -104.4819166667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm53",
        "plot_no": "HIGR115",
        "latitude": 21.6465388889,
        "longitude": -104.4730555556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm54",
        "plot_no": "HIGR116",
        "latitude": 21.6590333333,
        "longitude": -104.50875,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm55",
        "plot_no": "HIGR117",
        "latitude": 21.6537305556,
        "longitude": -104.5306972222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm56",
        "plot_no": "HIGR118",
        "latitude": 21.6660388889,
        "longitude": -104.5431555556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm57",
        "plot_no": "HIGR119",
        "latitude": 21.6521472222,
        "longitude": -104.5203611111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm58",
        "plot_no": "HIGR120",
        "latitude": 21.6454861111,
        "longitude": -104.5223638889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm59",
        "plot_no": "ILCH006",
        "latitude": 21.6778277778,
        "longitude": -104.4460416667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm60",
        "plot_no": "ILCH007",
        "latitude": 21.6766638889,
        "longitude": -104.4306972222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm61",
        "plot_no": "ROBL033",
        "latitude": 21.5381666667,
        "longitude": -104.5023222222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm62",
        "plot_no": "ROBL034",
        "latitude": 21.5261083333,
        "longitude": -104.4919722222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm63",
        "plot_no": "ROBL035",
        "latitude": 21.5169166667,
        "longitude": -104.4931055556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm64",
        "plot_no": "ROBL036",
        "latitude": 21.5038111111,
        "longitude": -104.4855527778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm65",
        "plot_no": "ROBL037",
        "latitude": 21.5082388889,
        "longitude": -104.4807083333,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm66",
        "plot_no": "ROBL038",
        "latitude": 21.5117638889,
        "longitude": -104.4720083333,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm67",
        "plot_no": "ROBL039",
        "latitude": 21.5111388889,
        "longitude": -104.4493972222,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm68",
        "plot_no": "ROBL040",
        "latitude": 21.5209055556,
        "longitude": -104.471375,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm69",
        "plot_no": "ROBL041",
        "latitude": 21.5270666667,
        "longitude": -104.4631277778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm70",
        "plot_no": "ROBL042",
        "latitude": 21.5299888889,
        "longitude": -104.4505916667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm71",
        "plot_no": "ROBL043",
        "latitude": 21.5272194444,
        "longitude": -104.4431277778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm72",
        "plot_no": "ROBL044",
        "latitude": 21.5218055556,
        "longitude": -104.4424722222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm73",
        "plot_no": "ROBL045",
        "latitude": 21.521325,
        "longitude": -104.4369916667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm74",
        "plot_no": "ROBL046",
        "latitude": 21.5257361111,
        "longitude": -104.4347333333,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm75",
        "plot_no": "ROBL047",
        "latitude": 21.5203833333,
        "longitude": -104.4312,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm76",
        "plot_no": "ROBL048",
        "latitude": 21.5053555556,
        "longitude": -104.4944083333,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm77",
        "plot_no": "ROBL049",
        "latitude": 21.5050166667,
        "longitude": -104.5023555556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm78",
        "plot_no": "ROBL050",
        "latitude": 21.5057111111,
        "longitude": -104.5144027778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm79",
        "plot_no": "ROBL051",
        "latitude": 21.5059555556,
        "longitude": -104.5201555556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm80",
        "plot_no": "ROBL052",
        "latitude": 21.5127416667,
        "longitude": -104.514825,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm81",
        "plot_no": "ROBL053",
        "latitude": 21.5176611111,
        "longitude": -104.5253333333,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm82",
        "plot_no": "ROBL054",
        "latitude": 21.5242527778,
        "longitude": -104.4996361111,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm83",
        "plot_no": "ROBL059",
        "latitude": 21.4882027778,
        "longitude": -104.4639055556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm84",
        "plot_no": "ROBL091",
        "latitude": 21.5300638889,
        "longitude": -104.4734472222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm85",
        "plot_no": "ROBL092",
        "latitude": 21.5244361111,
        "longitude": -104.4794055556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm86",
        "plot_no": "ROBL093",
        "latitude": 21.5146027778,
        "longitude": -104.484125,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm87",
        "plot_no": "ROBL094",
        "latitude": 21.5202888889,
        "longitude": -104.4648888889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm88",
        "plot_no": "ROBL095",
        "latitude": 21.5268194444,
        "longitude": -104.4538472222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm89",
        "plot_no": "ROBL096",
        "latitude": 21.5172805556,
        "longitude": -104.45395,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm90",
        "plot_no": "ROBL097",
        "latitude": 21.4963138889,
        "longitude": -104.5102527778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm91",
        "plot_no": "ROBL098",
        "latitude": 21.4983444444,
        "longitude": -104.5009111111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm92",
        "plot_no": "ROBL099",
        "latitude": 21.4854222222,
        "longitude": -104.4999527778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm93",
        "plot_no": "ROBL100",
        "latitude": 21.4836194444,
        "longitude": -104.4926111111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm94",
        "plot_no": "ROBL101",
        "latitude": 21.48615,
        "longitude": -104.4750527778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm95",
        "plot_no": "ROBL102",
        "latitude": 21.5030805556,
        "longitude": -104.4554333333,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm96",
        "plot_no": "ROBL103",
        "latitude": 21.7121527778,
        "longitude": -104.4074194444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm97",
        "plot_no": "ROBL104",
        "latitude": 21.7047888889,
        "longitude": -104.4099833333,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm98",
        "plot_no": "ROBL105",
        "latitude": 21.5967805556,
        "longitude": -104.5652527778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm99",
        "plot_no": "SAUC026",
        "latitude": 21.5893833333,
        "longitude": -104.5601944444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm100",
        "plot_no": "SAUC027",
        "latitude": 21.5871138889,
        "longitude": -104.5525611111,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm101",
        "plot_no": "SAUC028",
        "latitude": 21.5816972222,
        "longitude": -104.5475055556,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm102",
        "plot_no": "SAUC030",
        "latitude": 21.5755166667,
        "longitude": -104.5341361111,
        "radius": 5.64
      },
      {
        "farm_id": "TrailFarm103",
        "plot_no": "SAUC031",
        "latitude": 21.5488416667,
        "longitude": -104.5106194444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm104",
        "plot_no": "SAUC032",
        "latitude": 21.5483055556,
        "longitude": -104.5028166667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm105",
        "plot_no": "SAUC081",
        "latitude": 21.5685583333,
        "longitude": -104.4903083333,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm106",
        "plot_no": "SAUC082",
        "latitude": 21.5721555556,
        "longitude": -104.4848388889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm107",
        "plot_no": "SAUC083",
        "latitude": 21.5569138889,
        "longitude": -104.485075,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm108",
        "plot_no": "SAUC084",
        "latitude": 21.5794138889,
        "longitude": -104.4769388889,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm109",
        "plot_no": "SAUC085",
        "latitude": 21.5775,
        "longitude": -104.4895916667,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm110",
        "plot_no": "SAUC086",
        "latitude": 21.5867361111,
        "longitude": -104.4929694444,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm111",
        "plot_no": "SAUC087",
        "latitude": 21.5647861111,
        "longitude": -104.4800722222,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm112",
        "plot_no": "SAUC088",
        "latitude": 21.5698222222,
        "longitude": -104.4750027778,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm113",
        "plot_no": "SAUC089",
        "latitude": 21.5544833333,
        "longitude": -104.4728583333,
        "radius": 11.28
      },
      {
        "farm_id": "TrailFarm114",
        "plot_no": "SAUC090",
        "latitude": 21.5448638889,
        "longitude": -104.4881805556,
        "radius": 11.28
      }
    ];

    const farms = farmNames.map((farmName) => ({
      farmName: farmName,
      userId: 164650,
      farmOwnershipType: "personal",
      communityName: null,
      address: null,
      district: null,
      zipCode: null,
      registrationNo: null,
      ownerName: null,
      lat: null,
      log: null,
      farmingGoalOptId: null,
      farmingActivity: null,
      parameter: null,
      area: null,
      areaUomId: null,
      isPrimaryFarm: false,
      isFarmRegistered: false,
      isDeleted: null,
      createdAt: null,
      updatedAt: null,
      region: null,
      farmType: null,
      productionSystem: null,
      farmOwner: null,
      country: null,
      state: null,
      city: null,
      govRegistrationNum: null,
      contractMating: null,
      cooperativeId: null,
      licenceNum: null,
      licenceExpiryDate: null,
      regulatorName: null,
      regulatorRepresentiveName: null,
      houseNum: null,
      street: null,
      recordId: null,
      inviteLink: null,
      farmerFirstName: null,
      farmerId: null,
      isTechnician: null,
      farmerLastName: null,
      farmerMiddleName: null,
      technicianId: null,
      farmGeofenceName: null,
      farmGeofenceCategory: null,
      productionType: null,
      status: "approved",
      reject_msg: null,
      dimitraFarmId: null,
      farmTitleDocument: null,
      farmerRegistrationId: null,
      farmRegistrationId: null,
      oldUserId: null,
      adminTechnicianId: null,
      source: null,
      farm_created_from: null,
    }));

    const farmIdMap = {};

    for await (const farm of farms) {
      const [farmId, ] = await queryInterface.insert(null, 'user_farms', farm);
      farmIdMap[farm.farmName] = farmId;
    }

    const requests = plots.map((plot) => {
      const {farm_id, plot_no} = plot;
      const request_id = `RE-${plot_no}`;

      return {
        request_id,
        farmer_id: 185796,
        farm_id,
        start_date: "2025-07-25",
        due_date: "2025-08-04",
        notes: "",
        status: "in_progress",
        recordId: null,
        farm_location_address: "",
        country: "Mexico",
      }
    });

    const requestIdMap = {};

    for await (const request of requests) {
      request.farm_id = farmIdMap[request.farm_id];
      const [requestId, ] = await queryInterface.insert(null, 'tree_mapping_requests', request);
      requestIdMap[request.request_id] = requestId;
    }

    const assignees = requests.map((request) => ({
        assignee_role: "technician",
        assignee_id: 185796,
        tree_mapping_request_id: request.request_id,
    }));

    for await (const assignee of assignees) {
      assignee.tree_mapping_request_id = requestIdMap[assignee.tree_mapping_request_id];
      await queryInterface.insert(null, 'tree_mapping_request_assignees', assignee)
    }

    const plotPayloads = plots.map((plot) => {
      const {farm_id, plot_no, radius, ...plotData} = plot;

      const request_id = `RE-${plot_no}`;
      const radius_in_cm = radius * 100;

      console.log({
        ...plotData,
        plot_no,
        radius: radius_in_cm,
        notes: "",
        slope: null,
        aspect: null,
        no_of_trees: 0,
        recordId: null,
        created_by: 185796,
        request_id
      });

      return {
        ...plotData,
        plot_no,
        radius: radius_in_cm,
        notes: "",
        slope: null,
        aspect: null,
        no_of_trees: 0,
        recordId: null,
        created_by: 185796,
        request_id
      }
    });


    for await (const plot of plotPayloads) {
      const { request_id, ...plotData } = plot;
      const true_request_id = requestIdMap[request_id];
      const [plotId, ] = await queryInterface.insert(null, 'tree_mapping_plots', plotData);

      await queryInterface.insert(null, 'tree_mapping_request_plots', {
        tree_mapping_plot_id: plotId,
        tree_mapping_request_id: true_request_id,
        status: 'pending'
      });
    }
  },

  async down(queryInterface, Sequelize) {},
};
