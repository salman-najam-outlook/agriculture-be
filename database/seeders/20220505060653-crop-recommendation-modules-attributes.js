'use strict';

const cropRecommendationModuleAttr = {
  'Land Preparation Report': [
    {
      type: 'info',
      name: 'Land Prepration Window',
      ddName: 'Land preparation window',
    },
    {
      type: 'info',
      name: 'Soil/Land Prepration Activities',
      ddName: 'Soil/Land preparation activities',
    },
  ],
  'Sowing/Planting Report': [
    {
      type: 'info',
      name: 'Planting/Sowing Window',
      ddName: 'Planting/Sowing windows',
    },
    { type: 'info', name: 'Planting Materials', ddName: 'Planting material' },
    {
      type: 'info',
      name: 'Planting Rate Per Hactare',
      ddName: 'Planting rate per hectare',
    },
    {
      type: 'info',
      name: 'Plant Row Spacing(cm)',
      ddName: 'Plant row spacing (cm)',
    },
    {
      type: 'info',
      name: 'In-row Plant Spacing(cm)',
      ddName: 'In-row plant spacing (cm)',
    },
    {
      type: 'info',
      name: 'Plant Population/Density per Hectare',
      ddName: 'Plant population density per ha',
    },
    { type: 'info', name: 'Planting Depth(cm)', ddName: 'Planting depth (cm)' },
  ],
  'Soil Management Report': [
    {
      type: 'info',
      name: 'Soil Type',
      ddName: 'Soil type',
      category: 'soil_information',
    },
    {
      type: 'info',
      name: 'Soil Health Status)',
      ddName: 'Soil health status',
      category: 'soil_information',
    },
    {
      type: 'scale',
      ddName: 'pH',
      name: 'Soil (PH)',
      category: 'soil_information',
    },
    {
      type: 'scale',
      ddName: 'Soil Organic Carbon (%)',
      name: 'Soil Organic Carbon (%)',
      category: 'soil_information',
    },
    {
      type: 'scale',
      ddName: 'Nitrogen (mg/kg, ppm, Kg/ha)',
      name: 'Nitrogen (mg/kg,ppm,kg/ha)',
      category: 'soil_information',
    },
    {
      type: 'scale',
      ddName: 'Phosphorus (mg/kg, ppm, Kg/ha)',
      name: 'Phosphorus (mg/kg,ppm,kg/ha)',
      category: 'soil_information',
    },
    {
      type: 'scale',
      ddName: 'Potassium (mg/kg, ppm, Kg/ha)',
      name: 'Potassium (mg/kg,ppm,kg/ha)',
      category: 'soil_information',
    },
    {
      type: 'scale',
      ddName: 'Other nutrients (ppm)',
      name: 'Sulfur (mg/kg)(ppm)',
      category: 'soil_information',
    },
    {
      type: 'info',
      name: 'Nitrogen Fertilizer Rate(kg N/ha)',
      ddName: 'Nitrogen fertilizer rate (kg N/ha)',
      category: 'nutrient_inputs',
    },
    {
      type: 'info',
      name: 'Phosphorus Fertilizer Rate(kg P2O5/ha)',
      ddName: 'Phosphorus fertilizer rate (kg P2O5/ha)',
      category: 'nutrient_inputs',
    },
    {
      type: 'info',
      name: 'Potassium Fertilizer Rate(kg K2O/ha)',
      ddName: 'Potassium fertilizer rate (kg K2O/ha)',
      category: 'nutrient_inputs',
    },
  ],
  'Irrigation Report': [
    {
      type: 'info',
      name: 'Irrigation Schedule',
      ddName: 'Irrigation schedule/frequency',
    },
    { type: 'info', name: 'Type of Irrigation', ddName: 'Type of irrigation' },
    {
      type: 'info',
      name: 'Water Volume per Irrigation Stage',
      ddName: 'Quantity of water used for irrigation (litres)',
    },
  ],
  'Weeding Report': [
    {
      type: 'info',
      name: 'Weeding Date',
      ddName: 'Date of weeding (> 1)',
    },
    {
      type: 'info',
      name: 'Weeding Stage',
      ddName: 'Weeding stages (>1)',
    },
    {
      type: 'info',
      name: 'Herbicide Used',
      ddName: 'Herbicide used',
      category: 'chemical weeding',
    },
    {
      type: 'info',
      name: 'Herbicide Dose/Rate',
      ddName: 'Herbicide dose/rate (litres/kg per ha)',
      category: 'chemical weeding',
    },
    {
      type: 'info',
      name: 'Herbicide Application Method',
      ddName: 'Herbicide application method',
      category: 'chemical weeding',
    },
    {
      type: 'info',
      name: 'Method of Cultural/Manual/Mechanical Weeding',
      ddName: 'Cultural/ Mechanical/ Manual/ Biological',
      category:
        'Method of Cultural/Mechanical/Manual/Biological Weed Control Method',
    },
  ],
  'Pest Management Report': [
    {
      type: 'info',
      name: 'Pest Symptoms',
    },
    {
      type: 'info',
      name: 'Pest Prevention',
    },
    {
      type: 'info',
      name: 'Pest Treatment',
    },
  ],
  'Disease Management Report': [
    {
      type: 'info',
      name: 'Disease Symptoms',
    },
    {
      type: 'info',
      name: 'Disease Prevention',
    },
    {
      type: 'info',
      name: 'Disease Treatment',
    },
  ],
  'Harvesting Report': [
    {
      type: 'info',
      name: 'Days After Sowing',
      ddName: 'Days after sowing (number of days it takes for crop to mature)',
    },
    {
      type: 'info',
      name: 'Yield Per Hectare',
      ddName: 'Yield per hectare (tonnes/ha).',
    },
    { type: 'info', name: 'Method of Harvesting', ddName: 'Harvesting method' },
    { type: 'info', name: 'Yield Losses', ddName: 'Yield loss (%)' },
    {
      type: 'info',
      name: 'Crop Residue Retention(%)',
      ddName: 'Crop residue retention (%)',
    },
  ],
  'Storage Report': [
    {
      type: 'info',
      name: 'Number of Days after Harvesting that the crop is stored',
      ddName: 'Number of days after harvesting',
    },
    {
      type: 'info',
      name: 'Number of Days in Storage',
      ddName: 'Number of days in storage',
    },
    {
      type: 'info',
      name: 'Storage Process/Method',
      ddName: 'Storage process/method',
    },
    { type: 'info', name: 'Type of Storage', ddName: 'Type of storage' },
  ],
  'General Information Report': [],
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let attributes = [];

      // const data = await queryInterface.sequelize.query(
      //   'select * from options',
      //   {
      //     type: Sequelize.QueryTypes.SELECT,
      //   }
      // );

      // console.log(data);

      // const moduleId = await queryInterface.insert(
      //   null,
      //   'CropRecommendationModules',
      //   { name: 'santosh11' }
      // );

      // const dummy = await queryInterface.rawSelect(
      //   'CropRecommendationModules',
      //   { where: { name: 'santosh11' } },
      //   'id'
      // );
      // console.log({ dummy });
      // return;
      for (const key in cropRecommendationModuleAttr) {
        let moduleId = await queryInterface.rawSelect(
          'CropRecommendationModules',
          { where: { name: key } },
          ['id']
        );

        if (moduleId == null) {
          moduleId = await queryInterface.insert(
            null,
            'CropRecommendationModules',
            { name: key },
            { transaction }
          );
          moduleId = moduleId[0];
        }

        const set = cropRecommendationModuleAttr[key]?.map((obj) => {
          return { moduleId, ...obj };
        });
        attributes = [...attributes, ...set];
      }

      await queryInterface.bulkDelete('CropRecommendations', null, {
        transaction,
      });
      await queryInterface.bulkDelete('PestAndDiseaseRecommendations', null, {
        transaction,
      });
      await queryInterface.bulkDelete('ScaleRecommendations', null, {
        transaction,
      });
      await queryInterface.bulkDelete(
        'CropRecommendationModuleAttributes',
        null,
        { transaction }
      );
      const savedAttributes = await queryInterface.bulkInsert(
        'CropRecommendationModuleAttributes',
        attributes,
        { transaction }
      );

      await transaction.commit();
      console.log(savedAttributes);
    } catch (err) {
      await transaction?.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('CropRecommendations', null, {
        transaction,
        truncate: true,
        cascade: true,
      });
      await queryInterface.bulkDelete('PestAndDiseaseRecommendations', null, {
        transaction,
        truncate: true,
        cascade: true,
      });
      await queryInterface.bulkDelete('ScaleRecommendations', null, {
        transaction,
        truncate: true,
        cascade: true,
      });
      await queryInterface.bulkDelete(
        'CropRecommendationModuleAttributes',
        null,
        { transaction }
      );
      await queryInterface.bulkDelete('CropRecommendationModules', null, {
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction?.rollback();
      console.log(err, '=============================');
      throw err;
    }
  },
};
