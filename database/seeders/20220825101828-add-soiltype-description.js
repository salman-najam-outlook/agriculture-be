'use strict';

const soil_types = [
  [
    'Sandy soil',
    'Sandy soils are generally light, coarse textured and retain few nutrients and have a low water holding capacity s well as a low percentage of organic matter. They tend to be acidic in nature and easy to work with.',
  ],
  [
    'Clay soil',
    'These soils are made of over 25 percent clay, and tend to hold a high amount of water than most of the other soil types.They swell when wetted and shrink when dried. They are normally fairly rich in potash but deficient in phosphorus   ',
  ],
  [
    'Loam soil',
    'Loam is mainly composed of sand, silt and clay. These soils are generally fertile, high in moisture, high in humus, easy to work with and provide good drainage. Depending on their predominant composition they can be either sandy or clay loam or silt loam.',
  ],
  [
    'Peat soil',
    'Peat soil is high in organic matter and retains a large amount of moisture. It consists partially of decomposed organic matter mainly from plant material and accumulates mostly in wetland ecosystems. ',
  ],
  [
    'Silt soil',
    'Silt Soil is a light and moisture retentive soil type with a high fertility rating. It comprises of medium sized particles and are well drained and have a good moisture retention capacity. Due to its fine particles, it can be easily compacted and washed away due to rain. ',
  ],
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let [name, description] of soil_types) {
      let soilType = await queryInterface.sequelize.query(
        'select * from soil_types WHERE name=?',
        {
          plain: true,
          replacements: [name],
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );
      if (soilType === null) continue;

      await queryInterface.bulkUpdate(
        'soil_types',
        { description },
        { id: soilType.id }
      );
    }
  },

  async down(queryInterface, Sequelize) {},
};
