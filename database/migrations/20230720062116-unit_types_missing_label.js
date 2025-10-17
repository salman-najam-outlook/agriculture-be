'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        name: "Weight",
        label: "Weight",
      },
      {
        name: "Length",
        label: "Length",
      },
      {
        name: "Volume-Area",
        label: "Volume Area",
      },
      {
        name: "Weight-Area",
        label: "Weight Area",
      },
      {
        name: "Area",
        label: "Area",
      },
      {
        name: "Perimeter",
        label: "Perimeter",
      },
      {
        name: "Irrigation-Area",
        label: "Irrigation Area",
      },
      {
        name: "Irrigation-Volume",
        label: "Irrigation Volume",
      },
      {
        name: "Storage-Area",
        label: "Storage Area",
      },
      {
        name: "Storage-Yield",
        label: "Storage Yield",
      },
      {
        name: "harvesting-fresh-yield",
        label: "Harvesting Fresh Yield",
      },
      {
        name: "harvesting-yield-household-consumption",
        label: "Harvesting Yield Household Consumption",
      },
      {
        name: "herbicide-dose-rate",
        label: "Herbicide Dose Rate",
      },
      {
        name: "herbicide-used",
        label: "Herbicide Used",
      },
      {
        name: "Energy-consumption",
        label: "Energy Consumption",
      },
      {
        name: "Thickness",
        label: "Thickness",
      },
      {
        name: "PotassiumUnit",
        label: "Potassium Unit",
      },
      {
        name: "LimingRateWeightAreaUnit",
        label: "Liming Rate Weight Area Unit",
      },
      {
        name: "TotalLimeWeightUnit",
        label: "Total Lime Weight Unit",
      },
      {
        name: "SyntheticFertilizerApplicationRateWeightAreaUnit",
        label: "Synthetic Fertilizer Application Rate Weight Area Unit",
      },
      {
        name: "TotalSyntheticFertilizerUsedWeightUnit",
        label: "Total Synthetic Fertilizer Used Weight Unit",
      },
      {
        name: "OrganicInputApplicationRateWeightAreaUnit",
        label: "Organic Input Application Rate Weight Area Unit",
      },
      {
        name: "TotalOrganicInputAppliedWeightUnit",
        label: "Total Organic Input Applied Weight Unit",
      },
      {
        name: "PhosphorusUnit",
        label: "Phosphorus Unit",
      },
      {
        name: "BulkDensity",
        label: "Bulk Density",
      },
      {
        name: "NitrogenUnit",
        label: "Nitrogen Unit",
      },
      {
        name: "SulphurUnit",
        label: "Sulphur Unit",
      },
      {
        name: "SynthenticFertilizerNitrogenUnit",
        label: "Synthentic Fertilizer Nitrogen Unit",
      },
      {
        name: "SynthenticFertilizerPhosphorousUnit",
        label: "Synthentic Fertilizer Phosphorous Unit",
      },
      {
        name: "SynthenticFertilizerPotassiumUnit",
        label: "Synthentic Fertilizer Potassium Unit",
      },
    ]

    for (const row of data) {
      let sql =
        "SELECT * FROM unit_types WHERE name = :name";
      const unit_type = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { name: row.name },
      });

      // update case
      if (unit_type && unit_type.length > 0) {
        await queryInterface.bulkUpdate("unit_types", row, {
          id: unit_type[0].id
        });
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
