"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const plots = [
      {
        "plot_no": "ANTM010",
        "radius": 5.64
      },
      {
        "plot_no": "ANTM012",
        "radius": 11.28
      },
      {
        "plot_no": "ANTM013",
        "radius": 11.28
      },
      {
        "plot_no": "ANTM014",
        "radius": 11.28
      },
      {
        "plot_no": "ANTM015",
        "radius": 11.28
      },
      {
        "plot_no": "ANTM016",
        "radius": 11.28
      },
      {
        "plot_no": "ANTM021",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA017",
        "radius": 5.64
      },
      {
        "plot_no": "ESTA022",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA053",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA023",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA024",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA055",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA029",
        "radius": 5.64
      },
      {
        "plot_no": "ESTA056",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA057",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA058",
        "radius": 11.28
      },
      {
        "plot_no": "ESTA078",
        "radius": 11.28
      },
      {
        "plot_no": "FEDR018",
        "radius": 11.28
      },
      {
        "plot_no": "FEDR019",
        "radius": 11.28
      },
      {
        "plot_no": "FEDR020",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR001",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR002",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR003",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR009",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR010",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR060",
        "radius": 5.64
      },
      {
        "plot_no": "HIGR061",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR062",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR063",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR064",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR065",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR066",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR067",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR068",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR069",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR070",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR071",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR072",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR073",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR074",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR075",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR076",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR077",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR079",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR080",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR103",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR104",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR105",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR106",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR107",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR108",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR109",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR110",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR111",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR112",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR113",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR114",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR115",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR116",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR117",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR118",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR119",
        "radius": 11.28
      },
      {
        "plot_no": "HIGR120",
        "radius": 11.28
      },
      {
        "plot_no": "ILCH006",
        "radius": 11.28
      },
      {
        "plot_no": "ILCH007",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL033",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL034",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL035",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL036",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL037",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL038",
        "radius": 5.64
      },
      {
        "plot_no": "ROBL039",
        "radius": 5.64
      },
      {
        "plot_no": "ROBL040",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL041",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL042",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL043",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL044",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL045",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL046",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL047",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL048",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL049",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL050",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL051",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL052",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL053",
        "radius": 5.64
      },
      {
        "plot_no": "ROBL054",
        "radius": 5.64
      },
      {
        "plot_no": "ROBL059",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL091",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL092",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL093",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL094",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL095",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL096",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL097",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL098",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL099",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL100",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL101",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL102",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL103",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL104",
        "radius": 11.28
      },
      {
        "plot_no": "ROBL105",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC026",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC027",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC028",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC030",
        "radius": 5.64
      },
      {
        "plot_no": "SAUC031",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC032",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC081",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC082",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC083",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC084",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC085",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC086",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC087",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC088",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC089",
        "radius": 11.28
      },
      {
        "plot_no": "SAUC090",
        "radius": 11.28
      }
    ].map((plot) => {
      const { plot_no, radius } = plot;
      const radius_in_cm = radius * 100;

      return {
        plot_no,
        radius: radius_in_cm,
        slope: null,
        aspect: null
      }
    });


    for await (const plot of plots) {
      const { plot_no, ...payload } = plot;
      await queryInterface.bulkUpdate(
        'tree_mapping_plots',
        payload,
        {
          plot_no
        }
      );
    }
  },

  async down(queryInterface, Sequelize) {},
};
