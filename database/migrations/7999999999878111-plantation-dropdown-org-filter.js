"use strict";
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    let newCoffeeSpecies = {
      Arabica: 16,
      Robusta: 17,
      Liberica: 18,
      Typica: 19,
      Bourbon: 20,
      Pacamara: 21,
      Hybrid: 22,
    };
    try {
      let shadeTreeData = await queryInterface.sequelize.query(
        "SELECT * FROM shade_tree",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      let windBreakerTreeData = await queryInterface.sequelize.query(
        "SELECT * FROM wind_breaker_tree Where created_by = 273",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      let coffeeSpeciesData = await queryInterface.sequelize.query(
        "SELECT * FROM coffee_species Where created_by = 273",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      let coffeeVarietyData = await queryInterface.sequelize.query(
        "SELECT * FROM coffee_variety Where created_by = 273",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      let shadeInput = [],
        windInput = [],
        coffeeSpeciesInput = [],
        coffeeVarietyInput = [],
        oldIdtoNewId = {};

      shadeTreeData.forEach((el) => {
        el.created_by = null;
        delete el.id;
        shadeInput.push(el);
      });

      windBreakerTreeData.forEach((el) => {
        el.created_by = null;
        delete el.id;
        windInput.push(el);
      });

      for (let key in newCoffeeSpecies) {
        coffeeSpeciesInput.push({
          id: newCoffeeSpecies[key],
          name: key,
          created_by: null,
          status: 1,
          isDeleted: 0,
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        });
      }

      let shadeOut = await queryInterface.bulkInsert("shade_tree", shadeInput, {
        transaction,
      });
      let windOut = await queryInterface.bulkInsert(
        "wind_breaker_tree",
        windInput,
        { transaction }
      );
      let coffeeSpeciesOut = await queryInterface.bulkInsert(
        "coffee_species",
        coffeeSpeciesInput,
        { transaction }
      );

      coffeeSpeciesData.forEach((el) => {
        oldIdtoNewId[el.id] = newCoffeeSpecies[el.name];
      });

      coffeeVarietyData.forEach((el) => {
        el.created_by = null;
        el.coffee_species = oldIdtoNewId[el.coffee_species];
        delete el.id;
        coffeeVarietyInput.push(el);
      });

      let coffeeVarietyOut = await queryInterface.bulkInsert(
        "coffee_variety",
        coffeeVarietyInput,
        { transaction }
      );
      await transaction.commit();
      console.log("done");
    } catch (error) {
      console.log(error);
      await transaction?.rollback();
    }
  },
  down: async (queryInterface, Sequelize) => {},
};
