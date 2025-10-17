"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert("nutrient_management_fertilizer_inputs", [
      { fertilizerName: "Ammonium phosphate sulphate(20-20-0)" },
      { fertilizerName: "Ammonium sulphate(20-0-0)" },
      { fertilizerName: "Borax" },
      { fertilizerName: "Calcium ammonium nitrate(20-0-0)" },
      { fertilizerName: "Chelated iron" },
      { fertilizerName: "Chelated Zinc" },
      { fertilizerName: "Manganese sulphate" },
      { fertilizerName: "NPK (10-26-26)" },
      { fertilizerName: "NPK(12-32-16)" },
      { fertilizerName: "NPK (20-20-10)" },
      { fertilizerName: "Potassium chloride (0-0-60)" },
      { fertilizerName: "Potassium sulphate" },
      { fertilizerName: "SSP" },
      { fertilizerName: "TSP" },
      { fertilizerName: "Urea" },
      { fertilizerName: "Urea ammonium phosphate(28-28-0)" },
      { fertilizerName: "DAP(18-46-0)" },
      { fertilizerName: "Ferrous sulphate" },
      { fertilizerName: "Manganese sulphate" },
      { fertilizerName: "Neem coated urea" },
      { fertilizerName: "NPK(15-15-15)" },
      { fertilizerName: "NPK (19-19-19)(water soluble)" },
      { fertilizerName: "Potassium nitrate(13-0-45)(water soluble)" },
      { fertilizerName: "Rock phosphate" },
      { fertilizerName: "Sulphur" },
      { fertilizerName: "Zincated urea" },
      { fertilizerName: "Nano urea" },
      { fertilizerName: "NPK mixed fertilizer with boron(10-20-10:0.3)" },
      { fertilizerName: "Mixed fertilizer fortified with Zinc(20-20-0:1.0)" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
