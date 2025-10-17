"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove old fields if they exist
    await Promise.all([
      queryInterface.removeColumn("user_crop_reports", "cropTypes").catch(() => {}),
      queryInterface.removeColumn("user_crop_reports", "comprehensiveCropTypes").catch(() => {}),
      queryInterface.removeColumn("user_crop_reports", "comparisonCropTypes").catch(() => {}),
    ]);
    // Add new fields
    await queryInterface.addColumn("user_crop_reports", "comprehensiveCropTypeIds", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
      comment: "Array of crop type IDs used for comprehensive analysis",
    });
    await queryInterface.addColumn("user_crop_reports", "comparisonCropTypeIds", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
      comment: "Array of crop type IDs used for comparison/recommendation",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_crop_reports", "comprehensiveCropTypeIds");
    await queryInterface.removeColumn("user_crop_reports", "comparisonCropTypeIds");
    // Optionally, add back the old fields (not needed for this migration)
  },
}; 