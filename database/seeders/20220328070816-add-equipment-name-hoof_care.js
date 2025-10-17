'use strict';
const moment = require('moment');
const type = 'Hoof care';
const options = ['Hoof trimming mashine', 'Hoof cutter'];

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const activity = await queryInterface.sequelize.query(
        'SELECT * FROM equipment_activity WHERE name = ? ',
        {
          replacements: [type],
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      if (activity.length <= 0) throw new Error('activity not found_______');

      await Promise.all(
        activity.map(async ({ id: activity }) => {
          const set = options.map((name) => {
            return {
              name,
              activity,
              createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
            };
          });
          return queryInterface.bulkInsert('equipment_name', set, null, {
            transaction,
          });
        })
      );
      await transaction.commit();
    } catch (error) {
      console.log(error, '============');
      await transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      const activity = await queryInterface.sequelize.query(
        'SELECT * FROM equipment_activity WHERE name = ? ',
        {
          replacements: [type],
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      if (activity.length <= 0) throw new Error('activity not found_______');

      await Promise.all(
        activity.map(async ({ id: activity }) => {
          return await queryInterface.bulkDelete('equipment_name', {
            activity,
            userId: null,
          });
        })
      );
    } catch (error) {
      console.log(error, '============');
    }
  },
};
