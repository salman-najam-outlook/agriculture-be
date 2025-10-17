"use strict";
let jsonData = [
  {
    english: "Start date",
    nepali: "सुरू मिति",
  },
  {
    english: "End date",
    nepali: "अन्त्य मिति",
  },
  {
    english: "Our recommendation",
    nepali: "हाम्रो सुझाव",
  },
  {
    english: "Your soil pH",
    nepali: "तपाईको माटोको pH",
  },
  {
    english: "Your soil organic carbon",
    nepali: "तपाईको माटोको जैविक कार्बन",
  },
  {
    english: "Your soil nitrogen",
    nepali: "तपाईंको माटोको नाइट्रोजन",
  },
  {
    english: "Your soil phosphorus",
    nepali: "तपाईको माटोको फस्फोरस",
  },
  {
    english: "Your soil potassium",
    nepali: "तपाईको माटोको पोटासियम",
  },
  {
    english: "Your soil sulfur",
    nepali: "तपाईंको माटोको सल्फर",
  },
  {
    english: "Your date of irrigation",
    nepali: "तपाईंको सिंचाई मिति",
  },
  {
    english: "Your water volume",
    nepali: "तपाईंको पानीको मात्रा",
  },
  {
    english: "days",
    nepali: "दिन",
  },
  {
    english: "Date",
    nepali: "मिति",
  },
];
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      let langaugeObjects = jsonData.map((el) => {
        el.createdAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        el.updatedAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");

        return el;
      });

      await queryInterface.bulkInsert(
        "global_translation_metadata",
        langaugeObjects,
        {},
        {}
      );
    } catch (error) {
      console.log(error);
    }
  },
  down: async (queryInterface, Sequelize) => {},
};
