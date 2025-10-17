'use strict';
const moment = require('moment');

const storageMethods = [
  'Barn',
  'Cellar',
  'Silo',
  'Granary',
  'Refrigerator',
  'Clamp storage',
  'Farm shed',
  'Jute bags',
  'Metal containers',
  'Pit storage',
  'Underground storage',
];
/**
 * @description up function will insert above value if it doesn't exist
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const name of storageMethods) {
        let exist = await queryInterface.rawSelect(
          'crop_storage_type',
          { where: { name } },
          ['id']
        );

        if (exist == null) {
          await queryInterface.insert(null, 'crop_storage_type', {
            name,
            createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
          });
        }
      }
    } catch (err) {
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {},
};
