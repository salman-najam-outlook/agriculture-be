const analyticsData = [
    {
      cf: 100,
      data: {
        "0-30cm": {
          uncertainty: "-",
          value: "-",
        },
        "0-5cm": {
          uncertainty: 0.08,
          value: 1.17,
        },
        "15-30cm": {
          uncertainty: 0.06,
          value: 1.43,
        },
        "5-15cm": {
          uncertainty: 0.06,
          value: 1.4,
        },
      },
      description: "Bulk density of the fine earth fraction",
      name: "bdod",
      unit: "kg/dm³",
    },
    {
      cf: 10,
      data: {
        "0-30cm": {
          uncertainty: "-",
          value: "-",
        },
        "0-5cm": {
          uncertainty: 4.3,
          value: 18.7,
        },
        "15-30cm": {
          uncertainty: 2.4,
          value: 17.3,
        },
        "5-15cm": {
          uncertainty: 3.2,
          value: 15.4,
        },
      },
      description: "Cation Exchange Capacity of the soil",
      name: "cec",
      unit: "cmol(c)/kg",
    },
    {
      cf: 10,
      data: {
        "0-30cm": {
          uncertainty: "-",
          value: "-",
        },
        "0-5cm": {
          uncertainty: 7,
          value: 5,
        },
        "15-30cm": {
          uncertainty: 6.4,
          value: 5,
        },
        "5-15cm": {
          uncertainty: 10,
          value: 5,
        },
      },
      description: "Volumetric fraction of coarse fragments (> 2 mm)",
      name: "cfvo",
      unit: "cm3/100cm3 (vol%)",
    },
    {
      cf: 10,
      data: {
        "0-30cm": {
          uncertainty: "-",
          value: "-",
        },
        "0-5cm": {
          uncertainty: 2.7,
          value: 19.2,
        },
        "15-30cm": {
          uncertainty: 2.4,
          value: 23.3,
        },
        "5-15cm": {
          uncertainty: 2.7,
          value: 19.3,
        },
      },
      description:
        "Proportion of clay particles (< 0.002 mm) in the fine earth fraction",
      name: "clay",
      unit: "g/100g (%)",
    },
  ];
  
  module.exports = analyticsData;