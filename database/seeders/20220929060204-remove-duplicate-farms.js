'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try{
     const distinctFarms = await queryInterface.sequelize.query('SELECT distinct farmName, id FROM dbdimitra.user_farms', { type: Sequelize.QueryTypes.SELECT });
     const setData = distinctFarms.map((obj) => {
        return obj.id;
      });
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('user_farms', {id: {[Op.notIn]: setData}}, {})
  } catch (err) {
    console.log(err);
  }
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
