'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Insert provided data
      const soilAnalysisData = [
        {
          cf: 10,
          description: "Soil organic carbon content in the fine earth fraction",
          name: "soc",
          unit: "g/kg",
          ranges: [
            { depth: "0-30cm", uncertainty: null, value: null },
            { depth: "0-5cm", uncertainty: 3.1, value: 32.8 },
            { depth: "15-30cm", uncertainty: 2.5, value: 9 },
            { depth: "5-15cm", uncertainty: 5, value: 11.5 },
          ],
        },
        {
          cf: 10,
          description: "Organic carbon density",
          name: "ocd",
          unit: "kg/m³",
          ranges: [
            { depth: "0-30cm", uncertainty: null, value: null },
            { depth: "0-5cm", uncertainty: 2, value: 47.3 },
            { depth: "15-30cm", uncertainty: 3.2, value: 17.8 },
            { depth: "5-15cm", uncertainty: 2.2, value: 31.8 },
          ],
        },
        {
          cf: 10,
          description: "Organic carbon stocks",
          name: "ocs",
          unit: "kg/m²",
          ranges: [
            { depth: "0-30cm", uncertainty: 2, value: 6.6 },
            { depth: "0-5cm", uncertainty: null, value: null },
            { depth: "15-30cm", uncertainty: null, value: null },
            { depth: "5-15cm", uncertainty: null, value: null },
          ],
        },
        {
          cf: 1,
          description: "Total potassium (K)",
          name: "potassium",
          unit: "g/kg",
          ranges: [
            { depth: "0-30cm", uncertainty: null, value: null },
            { depth: "0-5cm", uncertainty: null, value: null },
            { depth: "15-30cm", uncertainty: null, value: null },
            { depth: "5-15cm", uncertainty: null, value: null },
          ],
        },
        {
          cf: 1,
          description: "Total phosphorous (P)",
          name: "phosphorous",
          unit: "g/kg",
          ranges: [
            { depth: "0-30cm", uncertainty: null, value: 8.9 },
            { depth: "0-5cm", uncertainty: null, value: null },
            { depth: "15-30cm", uncertainty: null, value: null },
            { depth: "5-15cm", uncertainty: null, value: null },
          ],
        },
      ];

      for (const parameter of soilAnalysisData) {
        const { ranges, ...parameterData } = parameter;
        const [parameterRecord] = await queryInterface.bulkInsert('soil_analysis', [parameterData], { transaction, returning: true });
        const rangeData = ranges.map(range => ({ ...range, parameterId: parameterRecord.id }));
        await queryInterface.bulkInsert('soil_analysis_parameter_ranges', rangeData, { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('soil_analysis_parameter_ranges', null, { transaction });
      await queryInterface.bulkDelete('soil_analysis', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};