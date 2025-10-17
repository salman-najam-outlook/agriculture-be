'use strict';

/** @type {import('sequelize-cli').Migration} */
const moment = require('moment');
module.exports = {
  async up (queryInterface, Sequelize) {
    const createdAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    const updatedAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    // src: https://docs.tizen.org/development/sample/web/UI/TAU_Globalization/lib/cldr-data/main/en/currencies.json
    const currencies = [
      {
        symbol: 'USh',
        abbreviation: 'UGX',
        name: 'Ugandan shilling',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: '₹',
        abbreviation: 'INR',
        name: 'Indian rupee',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: '$',
        abbreviation: 'USD',
        name: 'United States dollar',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: 'Rp',
        abbreviation: 'IDR',
        name: 'Indonesian Rupiah',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: '€',
        abbreviation: 'EUR',
        name: 'Euro',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: '$',
        abbreviation: 'SGD',
        name: 'Singapore Dollar',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: 'R$',
        abbreviation: 'BRL',
        name: 'Brazilian Real',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: '$',
        abbreviation: 'CAD',
        name: 'Canadian Dollar',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: 'CFPF',
        abbreviation: 'XPF',
        name: 'CFP Franc',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: 'FRF',
        abbreviation: 'FRF',
        name: 'French Franc',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: 'ITL',
        abbreviation: 'ITL',
        name: 'Italian Lira',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: 'KWD',
        abbreviation: 'KWD',
        name: 'Kuwaiti Dinar',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: '$',
        abbreviation: 'MXN',
        name: 'Mexican Peso',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: 'Rs',
        abbreviation: 'NPR',
        name: 'Nepalese Rupee',
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        symbol: 'AED',
        abbreviation: 'AED',
        name: 'United Arab Emirates Dirham',
        createdAt: createdAt,
        updatedAt: updatedAt
      }
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
