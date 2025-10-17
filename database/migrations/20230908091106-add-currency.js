'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const currencies = [
      {
        symbol: 'KES',
        abbreviation: 'KES',
        name: 'Kenyan shilling',
      },
    ];

    for (const currency of currencies) {
      const sql = 'SELECT * FROM Currencies WHERE abbreviation = :abbreviation';
      const result = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { abbreviation: currency.abbreviation}
      });
      if(result && result.length > 0) {
        continue;
      }
      await queryInterface.insert(null, 'Currencies', currency);
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
