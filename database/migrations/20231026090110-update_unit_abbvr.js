"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "g" },
      { name: "Gram" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg" },
      { name: "Kilogram" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "lb" },
      { name: "Pound" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "L/ha" },
      { name: "Liter-Per-Hectar" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "mL/m²" },
      { name: "Milliliters per Square Meter" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/ac" },
      { name: "Kilogram per Acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/ha" },
      { name: "Kilogram per Hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "ac" },
      { name: "Acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "ha" },
      { name: "Hectares" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "mm" },
      { name: "Millimetres" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "ha" },
      { name: "Hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "mL" },
      { name: "Millileter" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "L" },
      { name: "Liter" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "ha" },
      { name: "Hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "lb" },
      { name: "Pounds" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg" },
      { name: "Kilograms" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "t/ha" },
      { name: "Tonnes per Hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "t/ha" },
      { name: "Tonne per hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "bu/ha" },
      { name: "Bushels per Hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "bu/ac" },
      { name: "Bushels per Acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "bags/ha" },
      { name: "Bags per Hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "bags/ac" },
      { name: "Bags per Acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "t" },
      { name: "Tonnes" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/ac" },
      { name: "Kilogram per Acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/ac" },
      { name: "Kg per acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/ha" },
      { name: "Kilogram per Hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/ha" },
      { name: "Kg per hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "t/ac" },
      { name: "Tonnes per Acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "t/ac" },
      { name: "Tonne per acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "L/ha" },
      { name: "Litres/hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "oz/ha" },
      { name: "Ounces/hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "mg/ha" },
      { name: "mg/hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "g/ha" },
      { name: "g/hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "L" },
      { name: "Litres" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "oz" },
      { name: "Ounces" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "gal/ac" },
      { name: "Gallons/acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "gal/ha" },
      { name: "Gallons/hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "L/ha" },
      { name: "Liters/hectare" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "L/ac" },
      { name: "Liters/acre" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "cm" },
      { name: "Centimeter" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "m" },
      { name: "Meter" }
    );
    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "mg/l (N)" },
      { name: "Milligrams (N)/Liter" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg (N)/ha" },
      { name: "Kg (N)/hectare" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "parts (N)/million" },
      { name: "parts (N)/million" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "mg/l (P2O5)" },
      { name: "Milligrams (P2O5)/Liter" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg (P2O5)/ha" },
      { name: "Kg (P2O5)/hectare" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "parts (P2O5)/million" },
      { name: "parts (P2O5)/million" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "mg/l (K2O)" },
      { name: "Milligrams (K2O)/Liter" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg (K2O)/ha" },
      { name: "Kg (K2O)/hectare" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "parts (K2O)/million" },
      { name: "parts (K2O)/million" }
    );


    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/Tree" },
      { name: "Kilogram per Tree" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/cm³" },
      { name: "kg per centimetre cube" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "lb/cm³" },
      { name: "pound/cm3" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "lb/m³" },
      { name: "pound/m3" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/cm³" },
      { name: "kg/cm3" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "g/m³" },
      { name: "gr/m3" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "Manzana" },
      { name: "Manzana" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/Manzana" },
      { name: "Kilogram per Manzana" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "T/Manzana" },
      { name: "Tonne per Manzana" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "bu/Manzana" },
      { name: "Bushels per Manzana" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "kg/Manzana" },
      { name: "Kilogram per Manzana" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "T/Manzana" },
      { name: "Tonne per Manzana" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "bu/Manzana" },
      { name: "Bushels per Manzana" }
    );

    await queryInterface.bulkUpdate(
      "units_list",
      { abbvr: "bags/Manzana" },
      { name: "Bags per Manzana" }
    );
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
